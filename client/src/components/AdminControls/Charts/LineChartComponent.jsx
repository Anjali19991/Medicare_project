import { useState, useEffect } from 'react';
import { LineChart } from '@tremor/react';
import { useAuth } from "../../../AuthContext";

export function LineChartComponent() {
    const [chartData, setChartData] = useState([]);
    const { token } = useAuth();
    const API_ENDPOINT = 'http://localhost:3000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const getResponseData = async (url) => {
                    const response = await fetch(url, { headers });
                    const data = await response.json();
                    return data;
                };

                // Fetch data for medicine orders
                const medicineOrdersResponse = await getResponseData(`${API_ENDPOINT}/admin/getAllOrders?deliveryStatus=true`);
                const medicineOrdersData = medicineOrdersResponse || [];

                medicineOrdersData
                const medicineOrdersCount = medicineOrdersData.length || 0;

                const currentDate = new Date();
                const currentMonthYear = `${currentDate.getMonth() }-${currentDate.getFullYear()}`;

                const currentMonthData = chartData.find(entry => entry.date === currentMonthYear);

                if (currentMonthData) {
                    // Update existing entry for the current month
                    currentMonthData['Medicine Orders'] = medicineOrdersCount;
                } else {
                    // Add a new entry for the current month
                    setChartData(prevData => [
                        ...prevData,
                        {
                            date: currentMonthYear,
                            'Medicine Orders': medicineOrdersCount,
                        },
                    ]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1 * 60 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [token, API_ENDPOINT, chartData]);

    const dataFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()} orders`;

    return (
        <LineChart
            className="h-80"
            data={chartData}
            index="date"
            categories={['Medicine Orders']}
            colors={['lime']}
            valueFormatter={dataFormatter}
            yAxisWidth={100}
            showXAxis={true}
            showYAxis={true}
            intervalType="month" // Assuming you want to show data for each month
            onValueChange={(v) => console.log(v)}
        />
    );
}
