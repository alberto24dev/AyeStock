"use client";

import { useEffect, useState } from "react";

type Item = { 
  _id: string; 
  name: string; 
  quantity: number; 
  price: number; 
  cost: number; 
  category: string; 
  description: string; 
  createdAt: string; 
  updatedAt: string; 
  active: boolean; };

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  async function fetchItems() {
    try {
      const response = await fetch(`${apiUrl}/items`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleCreate(event: React.FormEvent) {
    event.preventDefault();
    try {
      await fetch(`${apiUrl}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          quantity: Number(quantity),
          price: Number(price),
          cost: Number(cost),
          category,
          description,
          active
        }),
      });
      setName("");
      setQuantity(1);
      setPrice(0);
      setCost(0);
      setCategory("");
      setDescription("");
      setActive(true);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="container mx-auto px-4 py-5">
      <div className="flex justify-between items-center mb-5 border-b pb-3">
        <h1 className="text-2xl font-bold text-indigo-600">AyeStock <span className="text-sm text-gray-500">| Inventario</span></h1>
      </div>

      {/* Formulario en una Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow mb-5">
        <div className="p-6">
          <h5 className="text-gray-700 dark:text-slate-300 mb-4 font-semibold">Agregar Nuevo Producto</h5>
          <form onSubmit={handleCreate}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-1 lg:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
                <input id="name" className="w-full rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Teclado Mecánico" required />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Categoría</label>
                <input id="category" className="w-full rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Ej. Periféricos" required />
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Cantidad</label>
                <input id="quantity" type="number" className="w-full rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2 text-center" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} min={0} required />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Precio (Venta)</label>
                <div className="flex items-center">
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-l">$</span>
                  <input id="price" type="number" className="w-full rounded-r border border-l-0 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2" value={price} onChange={(event) => setPrice(Number(event.target.value))} min={0} step="0.01" required />
                </div>
              </div>

              <div>
                <label htmlFor="cost" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Costo (Compra)</label>
                <div className="flex items-center">
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 rounded-l">$</span>
                  <input id="cost" type="number" className="w-full rounded-r border border-l-0 border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2" value={cost} onChange={(event) => setCost(Number(event.target.value))} min={0} step="0.01" required />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                <textarea id="description" className="w-full rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm p-2" rows={2} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Detalles del producto..." />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <input id="active" className="form-checkbox h-5 w-5 text-indigo-600" type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
                  <label className="text-sm text-gray-700 dark:text-gray-300" htmlFor="active">Producto Activo</label>
                </div>
                <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Crear Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de Items usando Tailwind */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h5 className="mb-0 text-gray-800 dark:text-gray-200 font-semibold">Listado de Productos</h5>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">Costo</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                  <td className="px-6 py-4 align-top">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{item.name}</div>
                    {item.description && <div className="text-sm text-gray-500 dark:text-gray-400 truncate" style={{ maxWidth: '200px' }}>{item.description}</div>}
                  </td>
                  <td className="px-6 py-4"><span className="inline-block px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-sm text-gray-800 dark:text-gray-200">{item.category}</span></td>
                  <td className="px-6 py-4 text-center">{item.quantity}</td>
                  <td className="px-6 py-4 text-end text-green-600 font-semibold">${Number(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-end text-gray-500">${Number(item.cost).toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`${item.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'} inline-block px-2 py-1 rounded text-sm`}>{item.active ? 'Activo' : 'Inactivo'}</span>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">No hay items registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}