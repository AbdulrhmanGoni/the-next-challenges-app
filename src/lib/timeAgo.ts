import { getTimeSyntaxRule } from "./arabicTimesExpressionsSyntaxRule";

export default function timeAgo(dateParam: number | Date) {
  const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
  const now = new Date();

  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 10) {
    return "الآن";
  }

  if (seconds < 60) {
    return `منذ ${getTimeSyntaxRule("second", seconds)}`;
  }

  if (seconds < 120) {
    return "منذ أكثر من دقيقة";
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `منذ ${getTimeSyntaxRule("minute", minutes)}`;
  }

  if (minutes < 120) {
    return "منذ أكثر من ساعة";
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `منذ ${getTimeSyntaxRule("hour", hours)}`;
  }

  if (hours < 48) {
    return "منذ أكثر من يوم";
  }

  const days = Math.round(hours / 24);
  if (days < 7) {
    return `منذ ${getTimeSyntaxRule("day", days)}`;
  }

  if (days < 14) {
    return "منذ أكثر من اسبوع";
  }

  const weeks = Math.round(days / 7);
  if (weeks < 7) {
    return `منذ ${getTimeSyntaxRule("week", weeks)}`;
  }

  if (weeks < 8) {
    return "منذ أكثر من شهر";
  }

  const monthes = Math.round(weeks / 4);
  if (monthes < 12) {
    return `منذ ${getTimeSyntaxRule("month", monthes)}`;
  }

  if (monthes < 24) {
    return "منذ أكثر من سنة";
  }

  const years = Math.round(monthes / 12);
  return `منذ ${getTimeSyntaxRule("year", years)}`;
}
