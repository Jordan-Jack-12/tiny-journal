import Link from 'next/link'
import React, { ReactNode } from 'react'

type ListItemType = {
    logo?: ReactNode,
    text: string,
    url: string,
}

const ListItem = (props: ListItemType) => {
    return (
        <Link href={props.url} className='flex w-full gap-2 px-4 py-2 rounded-full hover:bg-sky-100'>
            <div>{props.logo}</div>
            <div>{props.text}</div>
        </Link>
    )
}

export default ListItem