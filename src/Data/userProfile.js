import { useState, useEffect } from "react";

const STORAGE_KEY = "joni_user_profile";

function getDefaultProfile() {
  return { name: "", role: "Store Keeper" };
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : getDefaultProfile();
  } catch {
    return getDefaultProfile();
  }
}

export function useProfile() {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
}
