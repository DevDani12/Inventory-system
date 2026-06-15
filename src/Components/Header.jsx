import { useState, useEffect } from "react";
import { formatEthiopianWithTime } from "../Data/ethiopianCalendar";

function Header({ profile, onProfileClick }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bg-blue-600 text-white px-4 py-3 sm:py-4">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">Vehicle Spare Parts System</h1>
          <p className="text-[10px] sm:text-sm mt-0.5 opacity-90">{formatEthiopianWithTime(now)}</p>
        </div>
        <button
          onClick={onProfileClick}
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-xs sm:text-sm transition-colors active:scale-95"
        >
          <span className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center text-[10px] font-bold">
            {(profile.name || "?").charAt(0).toUpperCase()}
          </span>
          <span className="hidden sm:inline max-w-[100px] truncate">
            {profile.name || "Profile"}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;