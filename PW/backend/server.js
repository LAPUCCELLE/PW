const express = require('express');
const bodyParser = require('body-parser');
const { Producto, Usuario, Order, OrderItem} = require('./models');
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
app.post("/api/orders", async (req,res) => {
    const { userId,productos,total,fecha,estado } = req.body;
    
    try {
        //Orden principal
        const nuevaOrden = await Order.create({ userId, monto: total,fecha,estado })

        //Crear los items de la orden
        const items = await Promise.all(productos.map(async (prod) => {
            return await OrderItem.create({
                orderId: nuevaOrden.id,
                productoId: prod.id,
                cantidad: prod.cantidad,
                precioUnit: prod.precio,
                talla: prod.talla || null
            });
        }));

        res.status(201).json({ orden: nuevaOrden, items });
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear la orden", detalle: error.message });
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
app.get("/api/orders/:id", async (req,res) => {
    try {
        const orden = await Order.findByPk(req.params.id, {
            include: [
                { model: OrderItem, as: "items", include: [{ model: Producto, as: "producto" }]},
                { model: Usuario, as: "usuario" }
            ]
        });

        if (!orden) return res.status(404).json({ error: "Orden no encontrada "});
        res.json(orden);
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
            detalle: error.mensaje
        });
    }
}); 


//Iniciar el servidor
app.listen( PORT, () => {
    console.log(`Servidor iniciado en ${PORT}`)
})