const express = require('express');
const bodyParser = require('body-parser');
const { Carrito, Producto, Usuario, Order, OrderItem, OrderShipping} = require('./models');
const cors = require('cors');

//Instanciar el motor
const app = express();
const PORT = 3000;

//Middleware
app.use( bodyParser.json() );
app.use( express.urlencoded() );
app.use( cors());

//Rutas 
app.get('/api/productos', async (req,res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos', detalle: error.message });
    }
})

app.get('/api/usuarios', async (req,res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios", detalle: error.message})
    }
})

// DETALLE DE USUARIO POR ID
app.get('/api/usuarios/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuario", detalle: error.message });
    }
});

//CREAR UNA NUEVA CUENTA
app.post("/api/usuarios", async (req, res) => {
    const { nombre,correo,password, rol = "usuario", genero} = req.body;
    try {
        const yaExiste = await Usuario.findOne({ where: { correo }});
        if (yaExiste) {
            return res.status(409).json({ error: "El usuario ya está registrado" });
        }

        const nuevo = await Usuario.create({
            nombre,
            correo,
            password,
            rol,
            genero,
            fechaRegistro: new Date()
        })

        res.status(201).json({
            id: nuevo.id,
            nombre: nuevo.nombre,
            correo: nuevo.correo,
            rol: nuevo.rol
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar usuario", detalle: error.message});
    }
})

//LOGIN
app.post("/api/usuarios/login", async (req,res) => {
    const { correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({
            where: {correo}
        });

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ error: "Credenciales incorrectas"});
        }
    
        // NO MOSTRAR LA CONTRASEÑA 
        const usuarioData = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };
        
        res.json(usuarioData);
    } catch (error) {
        res.status(500).json({ error: "Error interno", detalle: error.message });
    }
});

//CAMBIAR CONTRASEÑA
app.put("/api/usuarios/:id/cambiar-password", async (req,res) => {
    const {id} = req.params;    
    const {nuevoPassword} = req.body;

    if (!nuevoPassword) {
        return res.status(400).json({error: "La nueva contraseña es requerida" });
    } 
    
    try {
        const usuario = await Usuario.findByPk(id);
        if(!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado"});
        }

        usuario.password = nuevoPassword;
        await usuario.save();

        res.json({ mensaje: "Contraseña actualizada correctamente" });        
    } catch (error) {
        res.status(500).json({ error: "Error al cambiar la contraseña", detalle: error.message });
    }
});

//CREAR UNA NUEVA ORDEN
// En el backend (POST /api/orders)
app.post("/api/orders", async (req, res) => {
    const { userId, total, direccion, metodoPago, metodoEnvio } = req.body;

    const carrito = await Carrito.findAll({
        where: { usuarioId: userId },
        include: [{ model: Producto, as: "producto" }]
    });

    if (!carrito || carrito.length === 0) {
        return res.status(400).json({ error: "El carrito está vacío" });
    }

    try {
        let subtotal = 0;
        for (const item of carrito) {
            subtotal += item.cantidad * item.producto.precio;
        }

        const costoEnvio = metodoEnvio === "express" ? 15 : 5;

        const totalCalculado = subtotal + costoEnvio;

        const nuevaOrden = await Order.create({
            userId,
            monto: totalCalculado,
            fecha: new Date().toISOString(),
            estado: "pendiente", 
        });

        // Crear los items de la orden
        await Promise.all(
            carrito.map(async (item) => {
                await OrderItem.create({
                    orderId: nuevaOrden.id,
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    precioUnit: item.producto.precio, // si lo quieres usar del producto
                    talla: item.talla || null
                });
            })
        );

        // Crear la dirección de envío
        const direccionEnvio = await OrderShipping.create({
            orderId: nuevaOrden.id,
            departamento: direccion?.departamento || "No especificado",
            provincia: direccion?.provincia || "No especificado",
            distrito: direccion?.distrito || "No especificado",
            direccion: direccion?.direccion || "No especificado",
            metodoEnvio: direccion?.metodoEnvio || metodoEnvio || "normal",
        });

        await Carrito.destroy({ where: { usuarioId: userId } });

        // Devolver el ID de la orden creada
        res.status(201).json({ id: nuevaOrden.id, direccionEnvio });
    } catch (error) {
        res.status(500).json({  
            error: 'Error al crear la orden',
            detalle: error.message,
            stack: error.stack});
    }
});


// OBTENER TODAS LAS ORDENES CON SUS PRODUCTOS
app.get("/api/orders", async (req,res) => {
    try {
        const ordenes = await Order.findAll({
            include: [
                { model: OrderItem, as: "items", include: [{ model: Producto, as: "producto"}] },
                { model: Usuario, as: "usuario" }
            ],
            order: [["fecha", "DESC"]]
        });
        
        res.json(ordenes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener órdenes", detalle: error.message });  
    }
});

// VER UNA ORDEN ESPECIFICA
app.get("/api/orders/:id", async (req, res) => {
    try {
        const orden = await Order.findByPk(req.params.id, {
            include: [
                { model: OrderItem, as: "items", include: [{ model: Producto, as: "producto" }] },
                { model: Usuario, as: "usuario" },
                { model: OrderShipping, as: "shipping" }
            ]
        });

        if (!orden) {
            return res.status(404).json({ error: "Orden no encontrada" });
        }

        res.json(orden); // Esta línea debe devolver los datos en formato JSON
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la orden", detalle: error.message });
    }
});

// VER EL HISTORIAL DE ORDENES POR USUARIO 
app.get("/api/usuarios/:id/orders", async (req,res) => {
    const {id} = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const ordenes = await Order.findAll({
            where: { userId: id},
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: [{ model: Producto, as: "producto"}]
                }
            ],
            order: [["fecha", "DESC"]]
        });

        res.json(ordenes);
    } catch (error) {
        res.status(500).json({
            error: "Error al obtener órdenes del usuario",
            detalle: error.message
        });
    }
}); 

/// ********************** CARRITO RUTAS *****************************

// Obtener el carrito de un usuario
app.get('/api/carrito/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    try {
        // Encontrar todos los carritos asociados con el usuario
        const carrito = await Carrito.findAll({
            where: { usuarioId },
            include: [
                {
                    model: Producto,
                    as: 'producto',  // Alias definido en el modelo
                    required: false,
                }
            ]
        });

        console.log("📦 Carrito encontrado:", carrito);

        if (!carrito || carrito.length === 0) {
            return res.status(200).json([]); // <- responde con array vacío y status 200
        }

        res.json(carrito);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al crear la orden',
            detalle: error.message,
            stack: error.stack });
    }
});

// Agregar producto al carrito
app.post('/api/carrito/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const { productoId, cantidad, talla } = req.body;

    try {
        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = await Carrito.findOne({
        where: { usuarioId, productoId, talla }
        });

        if (productoEnCarrito) {
        // Si el producto ya existe en el carrito, actualizamos la cantidad
        productoEnCarrito.cantidad += cantidad;
        await productoEnCarrito.save();
        return res.json({ mensaje: 'Producto actualizado en el carrito' });
        }

        // Si no está en el carrito, agregamos el producto
        await Carrito.create({
        usuarioId,
        productoId,
        cantidad,
        talla,
        });

        res.status(201).json({ mensaje: 'Producto agregado al carrito' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al obtener el carrito',
            detalle: error.message,
            stack: error.stack });
    }
});


// Actualizar cantidad de un producto en el carrito
app.put('/api/carrito/:usuarioId', async (req, res) => {
    const { usuarioId } = req.params;
    const { productos } = req.body;
    try {
        // Eliminar todo el carrito del usuario antes de actualizar
        await Carrito.destroy({ where: { usuarioId } });

        // Agregar los nuevos productos
        for (const prod of productos) {
            await Carrito.create({
                usuarioId,
                productoId: prod.id,
                cantidad: prod.cantidad,
                talla: prod.tallaSeleccionada || null
            });
        }
        res.json({ mensaje: 'Carrito actualizado correctamente' });
    }   catch (error) {
        res.status(500).json({ 
            error: 'Error al guardar el carrito',
            detalle: error.message,
            stack: error.stack });
    }
});


// Eliminar producto del carrito
app.delete('/api/carrito/:usuarioId/:productoId', async (req, res) => {
    const { usuarioId, productoId } = req.params;
    const { talla } = req.body;

    try {
        const productoEnCarrito = await Carrito.findOne({
            where: { usuarioId, productoId, talla }
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ error: 'El producto no está en el carrito' });
        }

        // Eliminar el producto del carrito
        await productoEnCarrito.destroy();

        res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al crear la orden',
            detalle: error.message,
            stack: error.stack });
    }
});


//***************************************************************************************************** */


//Iniciar el servidor
app.listen( PORT, () => {
    console.log(`Servidor iniciado en ${PORT}`)
})