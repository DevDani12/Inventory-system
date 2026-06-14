import { useState, useEffect } from "react";
import { formatEthiopianWithTime } from "../Data/ethiopianCalendar";

function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bg-blue-600 text-white px-4 py-3 sm:py-4 text-center">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">Vehicle Spare Parts System</h1>
      <p className="text-xs sm:text-sm mt-1 opacity-90">{formatEthiopianWithTime(now)}</p>
    </header>
  );
}

export default Header;