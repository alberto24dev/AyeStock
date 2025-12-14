"use client";

import { useEffect, useState } from "react";

type Item = { _id: string; name: string; qty: number };

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  async function fetchItems() {
    try {
      const res = await fetch(`${API}/items`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`${API}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, qty: Number(qty) }),
      });
      setName("");
      setQty(1);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>AyeStock - Items</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
        <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min={0} required />
        <button type="submit">Crear</button>
      </form>

      <ul>
        {items.map((it) => (
          <li key={it._id}>
            {it.name} — {it.qty}
          </li>
        ))}
      </ul>
    </main>
  );
}
