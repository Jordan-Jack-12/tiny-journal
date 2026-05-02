import React from 'react'
import GridHeatMap from './GridHeatMap';
import { notFound } from 'next/navigation';
import { endOfWeek, startOfWeek } from 'date-fns';
import prisma from '@/lib/prisma';
import { getLoggedInUserProfileId } from '@/actions/session';

const ProductiveData = async () => {
    const userId = await getLoggedInUserProfileId();
    if (!userId) return (
        <h1>Not found Anything</h1>
    )
    const data = await prisma.productive_hour.findMany({
        where: {
            AND: [
                {
                    date: {
                        lte: endOfWeek(new Date()),
                        gte: startOfWeek(new Date()),
                    }
                },
                { user_id: userId }
            ],

        },
        select: {
            date: true,
            day: true,
            hours: true,
            id: true,
        },
    });

    if (!data) notFound();

    return (
        <div className="py-2">
            <GridHeatMap data={data} />
        </div>
    );
}

export default ProductiveData