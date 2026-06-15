import { useState } from "react";

function UserProfile({ profile, onSave, onClose }) {
  const [form, setForm] = useState({ ...profile });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow-xl p-4 sm:p-6 w-full max-w-sm space-y-3"
      >
        <h2 className="font-bold text-lg">User Profile</h2>

        <input
          className="border p-2.5 w-full rounded text-sm"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          className="border p-2.5 w-full rounded text-sm"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Store Keeper">Store Keeper</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex-1 active:scale-[0.99]"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium active:scale-[0.99]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
