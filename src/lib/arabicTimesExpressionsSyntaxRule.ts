import convertToArabic from "./convertToArabic";

type Time = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";
type SyntaxRule = "one" | "two" | "few" | "many";

export function getTimeSyntaxRule(time: Time, value: number) {
  const pluralRule = new Intl.PluralRules("ar-EG").select(value);
  const timeExpression =
    timeExpressionsSyntaxRules[time][
      new Intl.PluralRules("ar-EG").select(value) as SyntaxRule
    ];

  if (pluralRule === "one" || pluralRule === "two") {
    return timeExpression;
  }

  return `${convertToArabic(value)} ${timeExpression}`;
}

export const timeExpressionsSyntaxRules = {
  second: {
    one: "ثانية واحدة",
    two: "ثانيتين",
    few: "ثواني",
    many: "ثانية",
  },
  minute: {
    one: "دقيقة واحدة",
    two: "دقيقتين",
    few: "دقائق",
    many: "دقيقة",
  },
  hour: {
    one: "ساعة واحدة",
    two: "ساعتين",
    few: "ساعات",
    many: "ساعة",
  },
  day: {
    one: "يوم واحد",
    two: "يومين",
    few: "أيام",
    many: "يوم",
  },
  week: {
    one: "أسبوع واحد",
    two: "اسبوعين",
    few: "أسابيع",
    many: "أسبوع",
  },
  month: {
    one: "شهر واحد",
    two: "شهرين",
    few: "شهور",
    many: "شهر",
  },
  year: {
    one: "سنة واحدة",
    two: "سنتين",
    few: "سنوات",
    many: "سنة",
  },
};
