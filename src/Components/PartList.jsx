import { formatEthiopianWithTime } from "../Data/ethiopianCalendar";

function PartList({ parts, deletePart, editPart }) {
  return (
    <div className="space-y-2">
      {parts.map((part) => (
        <div
          key={part.id}
          className="border p-3 rounded bg-gray-50"
        >
          <h3 className="font-bold">{part.name}</h3>
          <p>Category: {part.category}</p>
          <p>Qty: {part.quantity}</p>
          <p>Price: {part.price}</p>
          <p className="text-xs text-gray-500 mt-1">
            {part.createdAt != null ? formatEthiopianWithTime(new Date(part.createdAt)) : ""}
          </p>

          <div className="flex gap-2 mt-2">
         <button onClick={() => editPart(part)}>
         Edit
          </button>

            <button
              onClick={() => deletePart(part.id)}
              className="bg-red-500 text-white px-3 py-1"
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