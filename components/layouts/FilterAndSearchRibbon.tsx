import React from 'react'
import CreateNewJournalButton from '../ui/button/CreateNewJournalButton'
import { ListFilter } from 'lucide-react'

type PropsType = {
    from: Date,
    to: Date,
    setFrom: React.Dispatch<React.SetStateAction<Date>>,
    setTo: React.Dispatch<React.SetStateAction<Date>>,
}

const FilterAndSearchRibbon = (props: PropsType) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) {
        event.preventDefault();
        switch(event.target.name) {
            case 'to':
                props.setTo(new Date(event.target.value));
                break;
            case 'from':
                props.setFrom(new Date(event.target.value));
                break;
            default:
                break;
        }
    }
    return (
        <div className='flex gap-2 justify-between'>
            <div>
                <input type="text" className='px-4 py-2 border border-gray-500/30 outline-sky-400 rounded focus:ring-2 focus:ring-sky-300' placeholder='Search' />
            </div>
            <div className='flex gap-2'>
                <input
                    type="date"
                    name='from'
                    className='px-4 py-2 border border-gray-500/30 outline-sky-400 rounded focus:ring-2 focus:ring-sky-300'
                    value={props.from.toLocaleDateString('en-CA')}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name='to'
                    className='px-4 py-2 border border-gray-500/30 outline-sky-400 rounded focus:ring-2 focus:ring-sky-300'
                    value={props.to.toLocaleDateString('en-CA')}
                    onChange={handleChange}
                />
                <div className='p-2 hover:bg-gray-300/40 rounded'>
                    <ListFilter />
                </div>
                <CreateNewJournalButton />
            </div>
        </div>
    )
}

export default FilterAndSearchRibbon