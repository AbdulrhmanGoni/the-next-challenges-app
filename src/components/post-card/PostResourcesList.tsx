import PostResourcesListItem from './PostResourcesListItem'

export default function PostResourcesList({ resources }: { resources: PostResource[] }) {
    return (
        <div className='flex flex-col divide-y'>
            {
                resources.map((resource) => (
                    <PostResourcesListItem
                        key={resource.link}
                        resource={resource}
                    />
                ))
            }
        </div>
    )
}
