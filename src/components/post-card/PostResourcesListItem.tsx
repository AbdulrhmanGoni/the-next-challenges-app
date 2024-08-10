"use client"
import { postsResourcesTypesIcons } from "@/constants/postsResourcesTypesIcons"
import { ExternalLinkIcon } from "lucide-react"

export default function PostResourcesListItem({ resource }: { resource: PostResource }) {

    const ResourcesTypeIcon = postsResourcesTypesIcons[resource.type]

    return (
        <a
            href={resource.link} target="_blank"
            className="flex items-center gap-2 group hover:bg-card-hover px-1.5"
        >
            {ResourcesTypeIcon && <ResourcesTypeIcon size={18} />}
            <div className="space-y-1 p-2 flex-1">
                <h4 className="text-sm font-medium leading-none">{resource.title}</h4>
                <p className="text-sm text-muted-foreground">
                    {resource.type}
                </p>
            </div>
            <ExternalLinkIcon className="hidden group-hover:block" size={18} />
        </a>
    )
}
