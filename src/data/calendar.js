export const calendarStorageKey = "benefit-hub-calendar-entries";

const monthNumbers = {
  januar: 0,
  februar: 1,
  märz: 2,
  maerz: 2,
  april: 3,
  mai: 4,
  juni: 5,
  juli: 6,
  august: 7,
  september: 8,
  oktober: 9,
  november: 10,
  dezember: 11
};

const weekdayNumbers = {
  mo: 1,
  montag: 1,
  montags: 1,
  di: 2,
  dienstag: 2,
  dienstags: 2,
  mi: 3,
  mittwoch: 3,
  mittwochs: 3,
  do: 4,
  donnerstag: 4,
  donnerstags: 4,
  fr: 5,
  freitag: 5,
  freitags: 5,
  sa: 6,
  samstag: 6,
  samstags: 6,
  so: 0,
  sonntag: 0,
  sonntags: 0
};

function getTodayDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function getDateKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  ].join("-");
}

function getDateFromExplicitSlot(slot, fallbackYear) {
  const match = slot.match(/(\d{1,2})\.\s*([A-Za-zÄÖÜäöüß]+)/);
  if (!match) return null;

  const day = Number(match[1]);
  const month = monthNumbers[match[2].toLowerCase()];
  if (Number.isNaN(day) || month === undefined) return null;

  return new Date(fallbackYear, month, day);
}

function getNextWeekdayDate(weekday, offsetWeeks = 0) {
  const today = getTodayDate();
  const currentWeekday = today.getDay();
  const daysUntilTarget = (weekday - currentWeekday + 7) % 7 || 7;
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysUntilTarget + offsetWeeks * 7);
}

function getDateFromWeekdaySlot(slot, index) {
  const weekdayKey = slot.split(/\s+/)[0]?.replace(".", "").toLowerCase();
  const weekday = weekdayNumbers[weekdayKey];
  if (weekday === undefined) return null;

  return getNextWeekdayDate(weekday, Math.floor(index / 2));
}

function getFallbackDate(index) {
  const today = getTodayDate();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + index + 3);
}

function getSlotTime(slot) {
  const match = slot.match(/(\d{1,2}):(\d{2})/);
  if (!match) return "09:00";
  return `${String(Number(match[1])).padStart(2, "0")}:${match[2]}`;
}

export function addMinutesToTime(startTime, durationMinutes) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} Min.`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} Std. ${rest} Min.` : `${hours} Std.`;
}

export function buildOfferSlotOptions(offer) {
  const fallbackYear = getTodayDate().getFullYear();
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "short"
  });

  return offer.slots.map((slot, index) => {
    const date =
      getDateFromExplicitSlot(slot, fallbackYear) ??
      getDateFromWeekdaySlot(slot, index) ??
      getFallbackDate(index);
    const startTime = getSlotTime(slot);
    const durationMinutes = offer.durationMinutes ?? 45;

    return {
      id: `${offer.slug}-${index}`,
      original: slot,
      date,
      dateKey: getDateKey(date),
      startTime,
      durationMinutes,
      endTime: addMinutesToTime(startTime, durationMinutes),
      label: `${dateFormatter.format(date)} · ${startTime}`,
      summary: `${startTime} - ${addMinutesToTime(startTime, durationMinutes)} · ${formatDuration(durationMinutes)}`
    };
  });
}

export function loadStoredCalendarEntries() {
  if (typeof window === "undefined") return [];

  try {
    const storedEntries = JSON.parse(window.localStorage.getItem(calendarStorageKey) ?? "[]");
    return Array.isArray(storedEntries) ? storedEntries : [];
  } catch {
    return [];
  }
}

export function saveStoredCalendarEntries(entries) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(calendarStorageKey, JSON.stringify(entries));
}

export function upsertStoredCalendarEntry(entry) {
  const currentEntries = loadStoredCalendarEntries();
  const nextEntries = [
    ...currentEntries.filter((currentEntry) => currentEntry.id !== entry.id),
    entry
  ];
  saveStoredCalendarEntries(nextEntries);
  return nextEntries;
}

export function removeStoredCalendarEntry(entryId) {
  const nextEntries = loadStoredCalendarEntries().filter((entry) => entry.id !== entryId);
  saveStoredCalendarEntries(nextEntries);
  return nextEntries;
}
