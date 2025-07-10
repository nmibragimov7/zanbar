import {DateTime} from "luxon";

export const formatDate = (date: string, format: string, locale = "ru") => {
  if (!date) return date;
  return DateTime.fromISO(date || "")
    .setLocale(locale)
    .toFormat(format);
};

export const toISO = (date: string) => {
  if (!date) return date;
  const [day, month, year] = date.split(".").map(Number);
  return <string>DateTime.fromObject({year, month, day}).toISO({includeOffset: false});
};

export const toLocalZone = (date: string): string => {
  if (!date) return date;
  return <string>DateTime.fromISO(date || "")
    .setZone("UTC+5")
    .toISO();
};

export const isToday = (date: string): boolean => {
  return (
    <string>DateTime.fromISO(new Date(date).toISOString()).toFormat("dd.MM.yyyy") ===
    <string>DateTime.fromISO(new Date().toISOString()).toFormat("dd.MM.yyyy")
  );
};

export const getTime = (date: string, plus = {}) => {
  return DateTime.fromISO(String(DateTime.fromISO(date).toISOTime())).plus({...plus});
};

export const getWeekday = (date: string) => {
  return DateTime.fromISO(date).setLocale("en").toLocaleString({weekday: "long"});
};

export const setTime = (date: string, values = {}): string => {
  if (!date) return date;
  return <string>DateTime.fromISO(date)
    .set({...values})
    .toISO();
};
