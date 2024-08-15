import Avatar from '../Avatar'

export default function PostAuthor({ author }: { author: Post["author"] }) {
    return (
        <div className="flex items-center gap-2 py-2">
            <Avatar
                src={author.avatar?.src}
                fallback={author.firstName[0] + author.lastName[0]}
            />
            <div className="me-5">
                <p className="text-md">{author.firstName} {author.lastName}</p>
                <p className="text-ms text-muted-foreground">{author.headline}</p>
            </div>
        </div>
    )
}
