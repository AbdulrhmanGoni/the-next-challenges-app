const arabicIndicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export default function convertToArabic(number: number) {
  return number
    .toString()
    .split("")
    .map((digit: string) => arabicIndicDigits[+digit])
    .join("");
}
