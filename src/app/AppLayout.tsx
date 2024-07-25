import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex flex-1 flex-col items-center justify-between">
                <div className="flex flex-1 w-full">
                    <Sidebar />
                    <div className='w-full flex flex-col'>
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
}