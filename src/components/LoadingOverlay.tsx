import LoadingSpinner from "./LoadingSpinner";

export default function LoadingOverlay() {
    return (
        <dialog className="w-screen h-screen bg-black/70 fixed top-0 right-0 flex items-center justify-center">
            <LoadingSpinner />
        </dialog>
    )
}
