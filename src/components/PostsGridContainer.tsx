import { ReactNode } from "react";

export default function PostsGridContainer({ children }: { children: ReactNode }) {
    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-3 md:p-4 h-fit'>
            {children}
        </div>
    )
}
