import { variantsColors, VariantsIcons } from "@/constants/feedbackVariants";
import { toast } from "sonner";

type SonnerToastProps = {
  title: string,
  description: string,
  variant: FeedbackVariants,
}

export default function useSonnerToast() {
  return ({ title, variant, description }: SonnerToastProps) => {
    const Icon = VariantsIcons[variant]
    toast(
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <Icon className="size-4" />
          <p className="text-md">{title}</p>
        </div>
        <p className="text-sm block">{description}</p>
      </div>,
      { className: variantsColors[variant].background }
    );
  }
}
