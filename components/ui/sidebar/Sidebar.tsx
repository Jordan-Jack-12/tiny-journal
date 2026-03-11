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
        <div className='w-60 sticky top-0 bg-sky-50'>
            <div className='px-4 py-3 mb-4 bg-sky-300 h-16'>
                <h1 className='text-3xl text-white font-semibold'>Tiny Journal</h1>
            </div>
            <div className='p-2 rounded-2xl bg-white'>
                {ListItemData.map((item, index: number) => {
                    return (
                        <ListItem key={index} logo={item.logo} text={item.text} url={item.url} />
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar