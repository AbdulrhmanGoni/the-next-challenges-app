"use client"
import useUserData from "@/hooks/useUserData"
import CantPublishPostMessage from "./CantPublishPostMessage"
import PublishPostForm from "./PublishPostForm"
import PublishPostPageLoading from "./PublishPostPageLoading";

export default function PublishPostPageContent() {

    const { userData, requestDone } = useUserData();

    return (
        <div className="p-3 flex flex-1 flex-col items-center">
            {
                userData ?
                    <>
                        <h1 className='text-2xl'>انشر افكارك للناس لتعم الفائدة</h1>
                        <PublishPostForm />
                    </>
                    : requestDone ? <CantPublishPostMessage />
                        : <PublishPostPageLoading />
            }
        </div>
    )
}
