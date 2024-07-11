import { Avatar as AvatarContainer, AvatarFallback, AvatarImage } from "@/components/shadcn-ui/avatar";

type AvatarProps = {
    src?: string;
    fallback?: string;
    imgClassName?: string;
    containerClassName?: string;
}

export default function Avatar({ src, fallback, containerClassName, imgClassName }: AvatarProps) {
    return (
        <AvatarContainer className={containerClassName}>
            <AvatarImage src={src} className={imgClassName} />
            <AvatarFallback>
                {fallback}
            </AvatarFallback>
        </AvatarContainer>
    )
}
