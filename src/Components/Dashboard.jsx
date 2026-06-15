import { categories } from "../Data/categories";

function Dashboard({ parts }) {
  const totalParts = parts.length;
  const totalQty = parts.reduce((s, p) => s + (Number(p.quantity) || 0), 0);
  const uniqueSenders = [...new Set(parts.map((p) => p.sender).filter(Boolean))];

  const catStats = categories.map((cat) => {
    const items = parts.filter((p) => p.category === cat);
    return {
      category: cat,
      count: items.length,
      qty: items.reduce((s, p) => s + (Number(p.quantity) || 0), 0),
    };
  }).filter((c) => c.count > 0);

  const recent = [...parts].reverse().slice(0, 5);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="bg-white p-3 sm:p-4 rounded shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalParts}</p>
          <p className="text-xs sm:text-sm text-gray-500">Total Parts</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-green-600">{totalQty}</p>
          <p className="text-xs sm:text-sm text-gray-500">Total Qty</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">{categories.length}</p>
          <p className="text-xs sm:text-sm text-gray-500">Categories</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded shadow text-center">
          <p className="text-2xl sm:text-3xl font-bold text-orange-600">{uniqueSenders.length}</p>
          <p className="text-xs sm:text-sm text-gray-500">Senders</p>
        </div>
      </div>

      {catStats.length > 0 && (
        <div className="bg-white p-3 sm:p-4 rounded shadow">
          <h3 className="font-bold text-sm sm:text-base mb-2">By Category</h3>
          <div className="space-y-1.5">
            {catStats.map((c) => (
              <div key={c.category} className="flex items-center gap-2">
                <span className="text-xs sm:text-sm w-28 sm:w-36 truncate">{c.category}</span>
                <div className="flex-1 h-4 sm:h-5 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded text-[10px] text-white text-right pr-1 leading-4 sm:leading-5"
                    style={{ width: `${Math.min((c.count / Math.max(...catStats.map((x) => x.count))) * 100, 100)}%` }}
                  >
                    {c.count > 0 && c.count}
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{c.qty}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div className="bg-white p-3 sm:p-4 rounded shadow">
          <h3 className="font-bold text-sm sm:text-base mb-2">Recent Additions</h3>
          <div className="space-y-1">
            {recent.map((p) => (
              <div key={p.id} className="text-xs sm:text-sm flex justify-between border-b last:border-0 pb-1">
                <span className="truncate">{p.name}</span>
                <span className="text-gray-400 shrink-0 ml-2">x{p.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalParts === 0 && (
        <p className="text-center text-gray-400 text-sm py-4">No parts registered yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
