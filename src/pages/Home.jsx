import { useState } from "react";
import Header from "../Components/Header";
import PartForm from "../Components/PartForm";
import PartList from "../Components/PartList";
import DataIO from "../Components/DataIO";

function Home() {
  const [parts, setParts] = useState([]);
  const [editId, setEditId] = useState(null);

  const addPart = (part) => {
    if (editId) {
      setParts(
        parts.map((item) =>
          item.id === editId ? { ...item, ...part } : item
        )
      );
      setEditId(null);
    } else {
      setParts([...parts, { ...part, createdAt: Date.now() }]);
    }
  };

  const importParts = (imported) => {
    setParts((prev) => [...prev, ...imported]);
  };

  const deletePart = (id) => {
    setParts(parts.filter((p) => p.id !== id));
  };

  const editPart = (part) => {
    setEditId(part.id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <DataIO parts={parts} onImport={importParts} />
        <PartForm addPart={addPart} editId={editId} parts={parts} />
        <PartList parts={parts} deletePart={deletePart} editPart={editPart} />
      </main>
    </div>
  );
}

export default Home;
