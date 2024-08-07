import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CircleXIcon,
  InfoIcon,
  LucideIcon
} from "lucide-react";

export const VariantsIcons: Record<FeedbackVariants, LucideIcon> = {
  error: CircleXIcon,
  info: InfoIcon,
  warning: AlertTriangleIcon,
  success: CheckCircleIcon,
};

export type variantsColorsType = {
  border: string,
  background: string,
  text: string
}

export const variantsColors: Record<FeedbackVariants, variantsColorsType> = {
  error: {
    border: "border-red-700",
    background: "bg-red-700",
    text: "text-red-700"
  },
  info: {
    border: "border-blue-600",
    background: "bg-blue-600",
    text: "text-blue-600"
  },
  warning: {
    border: "border-yellow-700",
    background: "bg-yellow-700",
    text: "text-yellow-700"
  },
  success: {
    border: "border-green-600",
    background: "bg-green-600",
    text: "text-green-600"
  },
};
