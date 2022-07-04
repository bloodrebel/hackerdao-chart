import { format } from "date-fns";

export function formatChartDate(dateString: any) {
  const date = format(new Date(dateString), "yyyy-MMM-dd");
  return `${date}`;
}
