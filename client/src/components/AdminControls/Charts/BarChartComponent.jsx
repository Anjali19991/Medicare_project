import { BarChart } from '@tremor/react';

const chartdata = [
    {
        name: 'Total Pending Registrations',
        'Count': 25,
    },
    {
        name: 'Pending Doctor Registrations',
        'Count': 10,
    },
    {
        name: 'Pending Hospital Registrations',
        'Count': 15,
    },
    {
        name: 'Approved Hospitals',
        'Count': 5,
    },
    {
        name: 'Approved Doctors',
        'Count': 15,
    },
    {
        name: 'Medicine Buying Engagement',
        'Count': 50,
    },
    
];


const dataFormatter = (number) =>
    Intl.NumberFormat('us').format(number).toString();

export const BarChartComponent = () => (
    <BarChart
        data={chartdata}
        index="name"
        categories={['Count']}
        colors={['teal']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        onValueChange={(v) => console.log(v)}
    />
);
