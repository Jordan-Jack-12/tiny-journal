import Sidebar from "@/components/ui/sidebar/Sidebar"
import TopNavBar from "@/components/ui/topnavbar/TopNavBar"

export default function CoreAppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col h-screen overflow-hidden">
            <TopNavBar />
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    )
}