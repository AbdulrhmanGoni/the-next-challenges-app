const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

export default function convertToArabic(number: number) {
  const arabicNumber = number
    .toString()
    .split("")
    .map((digit: string) => arabicDigits[+digit])
    .join("");

  return number < 0 ? "-" + arabicNumber : arabicNumber;
}
