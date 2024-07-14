import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <div className="flex flex-1 w-full">
                    <Sidebar />
                    {children}
                </div>
            </main>
        </>
    );
}