import { useState, useEffect } from "react";
import { categories } from "../Data/categories";

function PartForm({ addPart, editId, parts }) {
  const [form, setForm] = useState({
    category: "",
    name: "",
    quantity: "",
    price: "",
  });

  // LOAD DATA WHEN EDITING
  useEffect(() => {
    if (editId) {
      const item = parts.find((p) => p.id === editId);

      if (item) {
        setForm({
          category: item.category || "",
          name: item.name || "",
          quantity: item.quantity || "",
          price: item.price || "",
        });
      }
    } else {
      // RESET WHEN NOT EDITING
      setForm({
        category: "",
        name: "",
        quantity: "",
        price: "",
      });
    }
  }, [editId, parts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addPart({
      id: editId || Date.now(),
      ...form,
    });

    // RESET AFTER SAVE
    setForm({
      category: "",
      name: "",
      quantity: "",
      price: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 p-3 sm:p-4 bg-white shadow rounded"
    >
      <select
        className="border p-2.5 sm:p-3 w-full rounded text-sm sm:text-base"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option value="">ምድብ ይምረጡ</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <input
        className="border p-2.5 sm:p-3 w-full rounded text-sm sm:text-base"
        placeholder="የእቃው አይነት"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="border p-2.5 sm:p-3 w-full rounded text-sm sm:text-base"
        type="number"
        placeholder="ብዛት"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <input
        className="border p-2.5 sm:p-3 w-full rounded text-sm sm:text-base"
        type="number"
        placeholder="ዋጋ"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <button className="bg-green-600 text-white p-2.5 sm:p-3 w-full rounded font-semibold text-sm sm:text-base active:scale-[0.99] transition-transform">
        {editId ? "Update Part" : "Save Part"}
      </button>
    </form>
  );
}

export default PartForm;