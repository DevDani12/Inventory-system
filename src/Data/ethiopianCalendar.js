const ethMonths = [
  "መስከረም", "ጥቅምት", "ኅዳር", "ታህሳስ",
  "ጥር", "የካቲት", "መጋቢት", "ሚያዚያ",
  "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን",
];

const weekDays = [
  "እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ",
];

function gregToJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function ethNewYearJDN(ethYear) {
  const gYear = ethYear + 7;
  const day = gYear % 4 === 3 ? 12 : 11;
  return gregToJDN(gYear, 9, day);
}

export function toEthiopian(date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();

  const currentNewYearDay = gYear % 4 === 3 ? 12 : 11;

  let ethYear;
  if (gMonth < 9 || (gMonth === 9 && gDay < currentNewYearDay)) {
    ethYear = gYear - 8;
  } else {
    ethYear = gYear - 7;
  }

  const dateJDN = gregToJDN(gYear, gMonth, gDay);
  const newYearJDN = ethNewYearJDN(ethYear);
  const dayOfYear = dateJDN - newYearJDN + 1;

  let ethMonth, ethDay;
  if (dayOfYear <= 360) {
    ethMonth = Math.ceil(dayOfYear / 30);
    ethDay = dayOfYear - (ethMonth - 1) * 30;
  } else {
    ethMonth = 13;
    ethDay = dayOfYear - 360;
  }

  return { year: ethYear, month: ethMonth, day: ethDay };
}

export function formatEthiopian(date) {
  const eth = toEthiopian(date);
  const weekDay = weekDays[date.getDay()];
  return `${weekDay}, ${eth.day} ${ethMonths[eth.month - 1]} ${eth.year}`;
}

export function formatEthiopianWithTime(date) {
  const ethDate = formatEthiopian(date);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${ethDate} ${hours}:${minutes}`;
}

export function formatEthiopianCSV(date) {
  const eth = toEthiopian(date);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${eth.year}-${String(eth.month).padStart(2, "0")}-${String(eth.day).padStart(2, "0")} ${hours}:${minutes}`;
}
