import { useState } from "react";
import Header from "../Components/Header";
import PartForm from "../Components/PartForm";
import PartList from "../Components/PartList";
import DataIO from "../Components/DataIO";
import Dashboard from "../Components/Dashboard";
import UserProfile from "../Components/UserProfile";
import { useProfile } from "../Data/userProfile";

function Home() {
  const [parts, setParts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useProfile();

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
      <Header
        profile={profile}
        onProfileClick={() => setShowProfile(true)}
      />
      <main className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
        <button
          onClick={() => setShowDashboard((v) => !v)}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-2.5 rounded font-semibold text-sm active:scale-[0.99] transition-all"
        >
          {showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        </button>

        {showDashboard && <Dashboard parts={parts} />}

        <DataIO parts={parts} onImport={importParts} />
        <PartForm addPart={addPart} editId={editId} parts={parts} />
        <PartList parts={parts} deletePart={deletePart} editPart={editPart} />
      </main>

      {showProfile && (
        <UserProfile
          profile={profile}
          onSave={setProfile}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

export default Home;
