// Detalle de Orden (Admin)
export function OrderDetail({ orderId = 101 }) {
  const order = {
    id: orderId,
    cliente: 'Juan Pérez',
    productos: [
      { nombre: 'Camisa', cantidad: 2, precio: '$25.00' },
      { nombre: 'Pantalón', cantidad: 1, precio: '$70.00' },
    ],
    total: '$120.00',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detalle de Orden #{order.id}</h2>
      <p className="mb-4"><strong>Cliente:</strong> {order.cliente}</p>
      <ul className="space-y-2 mb-4">
        {order.productos.map((p, i) => (
          <li key={i} className="bg-gray-100 p-2 rounded">
            {p.nombre} - Cantidad: {p.cantidad} - Precio: {p.precio}
          </li>
        ))}
      </ul>
      <p className="font-bold">Total: {order.total}</p>
    </div>
  );
}
