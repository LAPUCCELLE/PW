// Detalle de Usuario (Admin)
export function UserDetail({ userId = 1 }) {
  const user = {
    id: userId,
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    telefono: '987654321',
    direccion: 'Av. Siempre Viva 742',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Detalle del Usuario</h2>
      <div className="space-y-2">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Correo:</strong> {user.correo}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Dirección:</strong> {user.direccion}</p>
      </div>
    </div>
  );
}