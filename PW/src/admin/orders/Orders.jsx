// Listado de Ordenes (Admin)
export function OrderList() {
  const orders = [
    { id: 101, cliente: 'Juan Pérez', total: '$120.00' },
    { id: 102, cliente: 'María García', total: '$85.50' },
    { id: 103, cliente: 'Carlos López', total: '$42.75' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Listado de Órdenes</h2>
      <ul className="space-y-3">
        {orders.map(order => (
          <li key={order.id} className="p-4 bg-white rounded shadow hover:bg-gray-50">
            <a href={`/admin/orders/${order.id}`} className="text-green-600 hover:underline">
              Orden #{order.id} - {order.cliente} - {order.total}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
