// Lista de Usuarios (Admin)
export function UserList() {
  const users = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com' },
    { id: 2, nombre: 'María García', correo: 'maria@example.com' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos@example.com' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>
      <ul className="space-y-3">
        {users.map(user => (
          <li key={user.id} className="p-4 bg-white rounded shadow hover:bg-gray-50">
            <a href={`/admin/users/${user.id}`} className="text-blue-600 hover:underline">
              {user.nombre} - {user.correo}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}