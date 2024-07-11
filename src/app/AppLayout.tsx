import Header from "@/components/header/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex min-h-screen flex-col items-center justify-between">
                <div className="flex flex-1 w-full">
                    {children}
                </div>
            </main>
        </>
    );
}