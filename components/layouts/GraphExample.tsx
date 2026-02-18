'use client';
import React from 'react'
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
        hour: '0-1',
        amt: 0
    },
    {
        hour: '1-2',
        amt: 0
    },
    {
        hour: '2-3',
        amt: 0
    },
    {
        hour: '3-4',
        amt: 0
    },
    {
        hour: '4-5',
        amt: 0
    },
    {
        hour: '5-6',
        amt: 2
    },
    {
        hour: '6-7',
        amt: 2
    },
    {
        hour: '7-8',
        amt: 2
    },
    {
        hour: '8-9',
        amt: 2
    },
    {
        hour: '9-10',
        amt: 6
    },
    {
        hour: '10-11',
        amt: 6
    },
    {
        hour: '11-12',
        amt: 7
    },
    {
        hour: '12-13',
        amt: 6
    },
    {
        hour: '13-14',
        amt: 6
    },
    {
        hour: '14-15',
        amt: 4
    },
    {
        hour: '15-16',
        amt: 0
    },
    {
        hour: '16-17',
        amt: 0
    },
    {
        hour: '17-18',
        amt: 0
    },
    {
        hour: '18-19',
        amt: 0
    },
    {
        hour: '19-20',
        amt: 0
    },
    {
        hour: '20-21',
        amt: 0
    },
    {
        hour: '21-22',
        amt: 0
    },
    {
        hour: '22-23',
        amt: 0
    },
    {
        hour: '23-24',
        amt: 0
    },
];

const GraphExample = () => {
    return (
        <div>
            <AreaChart style={{ width: '100%', aspectRatio: 2.5 , maxHeight: 400}} responsive data={data}
            margin={{
                top: 40,
                left: 60
            }}
            >
                <Tooltip />
                <Area type="monotone" dataKey="amt" stroke="#107faa" fill="#77daf3" />
                <XAxis dataKey="hour" padding={{left: 40}} minTickGap={1}/>
                <YAxis width='auto' domain={[0, 'dataMax']}/>
            </AreaChart>
        </div>
    )
}

export default GraphExample