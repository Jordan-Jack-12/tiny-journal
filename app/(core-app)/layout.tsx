import Sidebar from "@/components/ui/sidebar/Sidebar"
import TopNavBar from "@/components/ui/topnavbar/TopNavBar"

export default function CoreAppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex min-h-screen justify-around bg-sky-50/50">
            <div className="">
                <Sidebar />
            </div>
            <div className="w-full">
                <TopNavBar />
                <div className="w-full">
                    {children}
                </div>
            </div>
        </section>
    )
}