import { AreaChart } from '@tremor/react';

const areaChartData = [
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

const areaDataFormatter = (number) =>
    Intl.NumberFormat('us').format(number).toString();

export function AreaChartComponent() {
    return (
        <AreaChart
            className="h-80"
            data={areaChartData}
            index="name"
            categories={['Count']}
            colors={['teal']}
            valueFormatter={areaDataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}
