import { useState } from "react";
import { categories, subCategories } from "../Data/categories";

function PartFormInner({ addPart, editId, initial }) {
  const [form, setForm] = useState({ ...initial });
  const itemTypes = form.category ? subCategories[form.category] || [] : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    addPart({
      id: editId || Date.now(),
      category: form.category,
      name: form.name,
      quantity: form.quantity,
      sender: form.sender,
      createdAt: editId ? undefined : Date.now(),
    });
    setForm({ category: "", name: "", quantity: "", sender: "" });
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
          setForm({ ...form, category: e.target.value, name: "" })
        }
      >
        <option value="">ምድብ ይምረጡ</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="border p-2.5 sm:p-3 w-full rounded text-sm sm:text-base"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        disabled={!form.category}
      >
        <option value="">የእቃው አይነት ይምረጡ</option>
        {itemTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

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
        placeholder="የላኪው ስም"
        value={form.sender}
        onChange={(e) =>
          setForm({ ...form, sender: e.target.value })
        }
      />

      <button className="bg-green-600 text-white p-2.5 sm:p-3 w-full rounded font-semibold text-sm sm:text-base active:scale-[0.99] transition-transform">
        {editId ? "Update Part" : "Save Part"}
      </button>
    </form>
  );
}

function PartForm({ addPart, editId, parts }) {
  const initial = editId
    ? parts.find((p) => p.id === editId) || { category: "", name: "", quantity: "", sender: "" }
    : { category: "", name: "", quantity: "", sender: "" };

  return (
    <PartFormInner
      key={editId || "new"}
      addPart={addPart}
      editId={editId}
      initial={initial}
    />
  );
}

export default PartForm;
