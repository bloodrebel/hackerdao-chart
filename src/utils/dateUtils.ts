import { format } from "date-fns";

export function createDate(days?: number) {
  const date = new Date();
  if (days) {
    date.setDate(date.getDate() + days);
  }
  return date;
}
