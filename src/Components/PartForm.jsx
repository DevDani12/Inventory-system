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
      className="space-y-2 p-4 bg-white shadow rounded"
    >
      <select
        className="border p-2 w-full"
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
        className="border p-2 w-full"
        placeholder="የእቃው አይነት"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        type="number"
        placeholder="ብዛት"
        value={form.quantity}
        onChange={(e) =>
          setForm({ ...form, quantity: e.target.value })
        }
      />

      <input
        className="border p-2 w-full"
        type="ዋጋ"
        placeholder="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <button className="bg-green-600 text-white p-2 w-full">
        {editId ? "Update Part" : "Save Part"}
      </button>
    </form>
  );
}

export default PartForm;