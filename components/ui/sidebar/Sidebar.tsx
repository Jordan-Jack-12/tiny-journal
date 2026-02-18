import { Home, ListCheck, PenTool, Search, Settings } from 'lucide-react'
import ListItem from './ListItem'

const ListItemData = [
    {
        logo: <Home />,
        text: "Dashboard",
        url: "/dashboard"
    },
    {
        logo: <PenTool />,
        text: "Journal",
        url: "/journal"
    },
    {
        logo: <ListCheck />,
        text: "Routine",
        url: "/routine"
    },
    {
        logo: <Search />,
        text: "Analysis",
        url: "/analysis"
    },
    {
        logo: <Settings />,
        text: "Settings",
        url: "/settings"
    },
]

const Sidebar = () => {
    return (
        <div
            className='w-[15%] top-16 bg-(--color-sky-blue-50) h-[calc(100vh-4rem)]'
        >
            {ListItemData.map((item, index: number) => {
                return (
                    <ListItem key={index} logo={item.logo} text={item.text} url={item.url} />
                )
            })}
        </div>
    )
}

export default Sidebar