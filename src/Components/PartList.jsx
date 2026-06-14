import { formatEthiopianWithTime } from "../Data/ethiopianCalendar";

function PartList({ parts, deletePart, editPart }) {
  return (
    <div className="space-y-2">
      {parts.map((part) => (
        <div
          key={part.id}
          className="border p-3 sm:p-4 rounded bg-white shadow-sm"
        >
          <h3 className="font-bold text-base sm:text-lg">{part.name}</h3>
          <div className="text-xs sm:text-sm text-gray-600 mt-1 space-y-0.5">
            <p>Category: {part.category}</p>
            <p>Qty: {part.quantity}</p>
            <p>Sender: {part.sender}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">
            {part.createdAt != null ? formatEthiopianWithTime(new Date(part.createdAt)) : ""}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => editPart(part)}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded text-sm font-medium active:scale-95 transition-transform"
            >
              Edit
            </button>

            <button
              onClick={() => deletePart(part.id)}
              className="bg-red-500 text-white px-4 py-1.5 rounded text-sm font-medium active:scale-95 transition-transform"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PartList;