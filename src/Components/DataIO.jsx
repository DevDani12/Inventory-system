import { useRef } from "react";
import * as XLSX from "xlsx";
import { toEthiopian } from "../Data/ethiopianCalendar";

const btnStyle = {
  background: "blue",
  color: "white",
  padding: "10px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  flex: "1 0 auto",
  minWidth: 0,
};

function download(url, name) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getDateStr(d) {
  const eth = toEthiopian(d);
  return `${eth.year}-${String(eth.month).padStart(2, "0")}-${String(eth.day).padStart(2, "0")}`;
}

function getTimeStr(d) {
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function serialToDate(serial) {
  const utcDays = Math.floor(serial - 25569);
  const utcValue = utcDays * 86400;
  return new Date(utcValue * 1000);
}

function DataIO({ parts = [], onImport }) {
  const fileRef = useRef(null);
  const date = new Date().toISOString().split("T")[0];

  const exportCSV = () => {
    if (parts.length === 0) return;
    const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const headers = ["Category", "Name", "Quantity", "Sender", "Date", "Time"];
    const rows = parts.map((p) => {
      let ds = "", ts = "";
      if (p.createdAt != null) {
        const d = new Date(p.createdAt);
        ds = getDateStr(d);
        ts = getTimeStr(d);
      }
      return [escape(p.category), escape(p.name), escape(p.quantity), escape(p.sender), escape(ds), escape(ts)];
    });
    const csv = ["\uFEFF" + headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    download(URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" })), `spare_parts_${date}.csv`);
  };

  const exportExcel = () => {
    if (parts.length === 0) return;
    const data = parts.map((p) => {
      let ds = "", ts = "";
      if (p.createdAt != null) {
        const d = new Date(p.createdAt);
        ds = getDateStr(d);
        ts = getTimeStr(d);
      }
      return { Category: p.category, Name: p.name, Quantity: p.quantity, Sender: p.sender, Date: ds, Time: ts };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parts");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    download(URL.createObjectURL(new Blob([buf])), `spare_parts_${date}.xlsx`);
  };

  const exportJSON = () => {
    if (parts.length === 0) return;
    const blob = new Blob([JSON.stringify(parts, null, 2)], { type: "application/json" });
    download(URL.createObjectURL(blob), `spare_parts_${date}.json`);
  };

  const exportWord = () => {
    if (parts.length === 0) return;

    const ethNow = toEthiopian(new Date());
    const nowStr = `${ethNow.year}-${String(ethNow.month).padStart(2, "0")}-${String(ethNow.day).padStart(2, "0")}`;

    const rows = parts.map((p) => {
      let ds = "", ts = "";
      if (p.createdAt != null) {
        const d = new Date(p.createdAt);
        ds = getDateStr(d);
        ts = getTimeStr(d);
      }
      return `<tr>
        <td>${p.category ?? ""}</td>
        <td>${p.name ?? ""}</td>
        <td>${p.quantity ?? ""}</td>
        <td>${p.sender ?? ""}</td>
        <td>${ds}</td>
        <td>${ts}</td>
      </tr>`;
    }).join("");

    const html = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8">
<title>Spare Parts</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; margin: 1in; }
h1 { color: #1e3a5f; font-size: 18pt; margin-bottom: 4px; }
.date { color: #666; font-size: 9pt; margin-bottom: 16px; }
table { border-collapse: collapse; width: 100%; font-size: 10pt; }
th { background: #1e3a5f; color: white; padding: 6px 8px; text-align: left; font-weight: bold; }
td { border: 1px solid #ccc; padding: 5px 8px; }
tr:nth-child(even) td { background: #f5f5f5; }
</style>
</head><body>
<h1>Vehicle Spare Parts System</h1>
<p class="date">Printed: ${nowStr}</p>
<table>
<thead><tr>
<th>Category</th><th>Name</th><th>Quantity</th><th>Sender</th><th>Date</th><th>Time</th>
</tr></thead>
<tbody>${rows}</tbody>
</table>
</body></html>`;

    const blob = new Blob([html], { type: "application/msword" });
    download(URL.createObjectURL(blob), `spare_parts_${date}.doc`);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    const name = file.name.toLowerCase();

    reader.onload = (ev) => {
      try {
        let imported = [];

        if (name.endsWith(".json")) {
          imported = JSON.parse(ev.target.result);
        } else if (name.endsWith(".csv")) {
          const lines = ev.target.result.split(/\r?\n/).filter(Boolean);
          if (lines.length < 2) return;
          const keys = lines[0].split(",").map((k) => k.replace(/^"|"$/g, "").trim().toLowerCase());
          for (let i = 1; i < lines.length; i++) {
            const vals = lines[i].split(",").map((v) => v.replace(/^"|"$/g, "").trim());
            const row = {};
            keys.forEach((k, idx) => {
              if (k === "category") row.category = vals[idx] ?? "";
              else if (k === "name") row.name = vals[idx] ?? "";
              else if (k === "quantity") row.quantity = vals[idx] ?? "";
              else if (k === "sender" || k === "price") row.sender = vals[idx] ?? "";
            });
            if (row.name) {
              row.id = Date.now() + Math.random();
              imported.push(row);
            }
          }
        } else if (name.endsWith(".xlsx")) {
          const data = new Uint8Array(ev.target.result);
          const wb = XLSX.read(data, { type: "array" });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(sheet);
          imported = rows.map((r) => ({
            id: Date.now() + Math.random(),
            category: String(r.Category ?? r.category ?? ""),
            name: String(r.Name ?? r.name ?? ""),
            quantity: String(r.Quantity ?? r.quantity ?? ""),
            sender: String(r.Sender ?? r.sender ?? r.Price ?? r.price ?? ""),
          })).filter((r) => r.name);
        }

        if (imported.length > 0 && onImport) onImport(imported);
      } catch (err) {
        console.error("Import failed:", err);
      }
    };

    if (name.endsWith(".xlsx")) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }

    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5 sm:gap-2 flex-wrap">
        <button onClick={exportCSV} style={btnStyle} className="text-xs sm:text-sm">CSV</button>
        <button onClick={exportExcel} style={{ ...btnStyle, background: "#16a34a" }} className="text-xs sm:text-sm">Excel</button>
        <button onClick={exportJSON} style={{ ...btnStyle, background: "#9333ea" }} className="text-xs sm:text-sm">JSON</button>
        <button onClick={exportWord} style={{ ...btnStyle, background: "#2563eb" }} className="text-xs sm:text-sm">Word</button>
        <label
          style={{ ...btnStyle, background: "#64748b", display: "inline-block", textAlign: "center" }}
          className="text-xs sm:text-sm"
        >
          Import
          <input ref={fileRef} type="file" accept=".json,.csv,.xlsx" onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>
      <p className="text-xs text-gray-400 text-center sm:text-left">Export / Import parts data</p>
    </div>
  );
}

export default DataIO;
