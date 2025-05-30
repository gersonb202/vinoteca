import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Users, Wine, Building, MapPin, Tag, ShoppingCart } from 'lucide-react';

// Tipos de datos
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Bodega {
  id: number;
  nombre: string;
  telefono: string;
  regionId: number;
  region?: string;
}

interface Region {
  id: number;
  nombre: string;
  pais: string;
}

interface Tipo {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Vino {
  id: number;
  nombre: string;
  precio: number;
  año: number;
  grado: number;
  bodegaId: number;
  tipoId: number;
  descripcion: string;
  bodega?: string;
  tipo?: string;
}

interface Compra {
  id: number;
  clienteId: number;
  vinoId: number;
  fecha: string;
  cliente?: string;
  vino?: string;
}

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('usuarios');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Estados para los datos
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@email.com' },
    { id: 2, nombre: 'María García', email: 'maria@email.com' }
  ]);

  const [regiones, setRegiones] = useState<Region[]>([
    { id: 1, nombre: 'La Rioja', pais: 'España' },
    { id: 2, nombre: 'Mendoza', pais: 'Argentina' }
  ]);

  const [bodegas, setBodegas] = useState<Bodega[]>([
    { id: 1, nombre: 'Bodega El Sol', telefono: '+34 123 456 789', regionId: 1, region: 'La Rioja' },
    { id: 2, nombre: 'Viñedos Luna', telefono: '+54 987 654 321', regionId: 2, region: 'Mendoza' }
  ]);

  const [tipos, setTipos] = useState<Tipo[]>([
    { id: 1, nombre: 'Tinto', descripcion: 'Vino tinto tradicional' },
    { id: 2, nombre: 'Blanco', descripcion: 'Vino blanco seco' }
  ]);

  const [vinos, setVinos] = useState<Vino[]>([
    { 
      id: 1, 
      nombre: 'Reserva 2018', 
      precio: 25.50, 
      año: 2018, 
      grado: 13.5, 
      bodegaId: 1, 
      tipoId: 1, 
      descripcion: 'Vino tinto con crianza en barrica',
      bodega: 'Bodega El Sol',
      tipo: 'Tinto'
    }
  ]);

  const [compras, setCompras] = useState<Compra[]>([
    { 
      id: 1, 
      clienteId: 1, 
      vinoId: 1, 
      fecha: '2024-01-15',
      cliente: 'Juan Pérez',
      vino: 'Reserva 2018'
    }
  ]);

  // Menú lateral
  const menuItems = [
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'vinos', label: 'Vinos', icon: Wine },
    { id: 'bodegas', label: 'Bodegas', icon: Building },
    { id: 'regiones', label: 'Regiones', icon: MapPin },
    { id: 'tipos', label: 'Tipos', icon: Tag },
    { id: 'compras', label: 'Compras Realizadas', icon: ShoppingCart }
  ];

  const getCurrentData = () => {
    switch (activeSection) {
      case 'usuarios': return usuarios;
      case 'vinos': return vinos;
      case 'bodegas': return bodegas;
      case 'regiones': return regiones;
      case 'tipos': return tipos;
      case 'compras': return compras;
      default: return [];
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      switch (activeSection) {
        case 'usuarios':
          setUsuarios(usuarios.filter(u => u.id !== id));
          break;
        case 'vinos':
          setVinos(vinos.filter(v => v.id !== id));
          break;
        case 'bodegas':
          setBodegas(bodegas.filter(b => b.id !== id));
          break;
        case 'regiones':
          setRegiones(regiones.filter(r => r.id !== id));
          break;
        case 'tipos':
          setTipos(tipos.filter(t => t.id !== id));
          break;
        case 'compras':
          setCompras(compras.filter(c => c.id !== id));
          break;
      }
    }
  };

  const renderTable = () => {
    const data = getCurrentData();
    
    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No hay datos disponibles
        </div>
      );
    }

    switch (activeSection) {
      case 'usuarios':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{usuario.nombre}</td>
                    <td className="px-6 py-4 border-b">{usuario.email}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(usuario)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(usuario.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'vinos':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Año</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Grado</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Bodega</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vinos.map((vino) => (
                  <tr key={vino.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{vino.nombre}</td>
                    <td className="px-6 py-4 border-b">€{vino.precio}</td>
                    <td className="px-6 py-4 border-b">{vino.año}</td>
                    <td className="px-6 py-4 border-b">{vino.grado}%</td>
                    <td className="px-6 py-4 border-b">{vino.bodega}</td>
                    <td className="px-6 py-4 border-b">{vino.tipo}</td>
                    <td className="px-6 py-4 border-b">{vino.descripcion}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(vino)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(vino.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'bodegas':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Región</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bodegas.map((bodega) => (
                  <tr key={bodega.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{bodega.nombre}</td>
                    <td className="px-6 py-4 border-b">{bodega.telefono}</td>
                    <td className="px-6 py-4 border-b">{bodega.region}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(bodega)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(bodega.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'regiones':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">País</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {regiones.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{region.nombre}</td>
                    <td className="px-6 py-4 border-b">{region.pais}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(region)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(region.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'tipos':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((tipo) => (
                  <tr key={tipo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{tipo.nombre}</td>
                    <td className="px-6 py-4 border-b">{tipo.descripcion}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(tipo)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(tipo.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'compras':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Vino</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{compra.cliente}</td>
                    <td className="px-6 py-4 border-b">{compra.vino}</td>
                    <td className="px-6 py-4 border-b">{compra.fecha}</td>
                    <td className="px-6 py-4 border-b">
                      <button onClick={() => handleEdit(compra)} className="text-blue-600 hover:text-blue-800 mr-3">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(compra.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  const FormModal = () => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
      if (editingItem) {
        setFormData(editingItem);
      } else {
        setFormData({});
      }
    }, [editingItem]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (editingItem) {
        // Editar elemento existente
        switch (activeSection) {
          case 'usuarios':
            setUsuarios(usuarios.map(u => u.id === editingItem.id ? { ...formData as Usuario } : u));
            break;
          case 'vinos':
            const vinoData = { 
              ...formData as Vino,
              bodega: bodegas.find(b => b.id === (formData as any).bodegaId)?.nombre,
              tipo: tipos.find(t => t.id === (formData as any).tipoId)?.nombre
            };
            setVinos(vinos.map(v => v.id === editingItem.id ? vinoData : v));
            break;
          case 'bodegas':
            const bodegaData = {
              ...formData as Bodega,
              region: regiones.find(r => r.id === (formData as any).regionId)?.nombre
            };
            setBodegas(bodegas.map(b => b.id === editingItem.id ? bodegaData : b));
            break;
          case 'regiones':
            setRegiones(regiones.map(r => r.id === editingItem.id ? { ...formData as Region } : r));
            break;
          case 'tipos':
            setTipos(tipos.map(t => t.id === editingItem.id ? { ...formData as Tipo } : t));
            break;
          case 'compras':
            const compraData = {
              ...formData as Compra,
              cliente: usuarios.find(u => u.id === (formData as any).clienteId)?.nombre,
              vino: vinos.find(v => v.id === (formData as any).vinoId)?.nombre
            };
            setCompras(compras.map(c => c.id === editingItem.id ? compraData : c));
            break;
        }
      } else {
        // Añadir nuevo elemento
        const newId = Math.max(...getCurrentData().map((item: any) => item.id)) + 1;
        switch (activeSection) {
          case 'usuarios':
            setUsuarios([...usuarios, { id: newId, ...formData as Omit<Usuario, 'id'> }]);
            break;
          case 'vinos':
            const newVino = { 
              id: newId, 
              ...formData as Omit<Vino, 'id'>,
              bodega: bodegas.find(b => b.id === (formData as any).bodegaId)?.nombre,
              tipo: tipos.find(t => t.id === (formData as any).tipoId)?.nombre
            };
            setVinos([...vinos, newVino]);
            break;
          case 'bodegas':
            const newBodega = {
              id: newId,
              ...formData as Omit<Bodega, 'id'>,
              region: regiones.find(r => r.id === (formData as any).regionId)?.nombre
            };
            setBodegas([...bodegas, newBodega]);
            break;
          case 'regiones':
            setRegiones([...regiones, { id: newId, ...formData as Omit<Region, 'id'> }]);
            break;
          case 'tipos':
            setTipos([...tipos, { id: newId, ...formData as Omit<Tipo, 'id'> }]);
            break;
          case 'compras':
            const newCompra = {
              id: newId,
              ...formData as Omit<Compra, 'id'>,
              cliente: usuarios.find(u => u.id === (formData as any).clienteId)?.nombre,
              vino: vinos.find(v => v.id === (formData as any).vinoId)?.nombre
            };
            setCompras([...compras, newCompra]);
            break;
        }
      }
      
      setShowForm(false);
      setEditingItem(null);
    };

    const renderFormFields = () => {
      switch (activeSection) {
        case 'usuarios':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={(formData as any).nombre || ''}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
                <input
                  type="text"
                  value={(formData as any).pais || ''}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          );

        case 'tipos':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                <input
                  type="text"
                  value={(formData as any).nombre || ''}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                <textarea
                  value={(formData as any).descripcion || ''}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>
            </>
          );

        case 'compras':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                <select
                  value={(formData as any).clienteId || ''}
                  onChange={(e) => setFormData({ ...formData, clienteId: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {usuarios.map(usuario => (
                    <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Vino</label>
                <select
                  value={(formData as any).vinoId || ''}
                  onChange={(e) => setFormData({ ...formData, vinoId: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona un vino</option>
                  {vinos.map(vino => (
                    <option key={vino.id} value={vino.id}>{vino.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                <input
                  type="date"
                  value={(formData as any).fecha || ''}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          );

        default:
          return null;
      }
    };

    if (!showForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">
            {editingItem ? 'Editar' : 'Añadir'} {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>
          <form onSubmit={handleSubmit}>
            {renderFormFields()}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {editingItem ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel Admin</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setShowForm(false);
                }}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeSection}
          </h2>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Añadir {activeSection.slice(0, -1)}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-lg shadow">
            {renderTable()}
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <FormModal />
    </div>
  );
};

export default AdminPanel;