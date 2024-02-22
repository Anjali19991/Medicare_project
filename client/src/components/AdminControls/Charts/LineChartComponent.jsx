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
                const medicineOrdersCount = medicineOrdersData.length || 0;

                const currentCount = (chartData.length > 0 ? chartData[chartData.length - 1]['Medicine Orders'] : 0);

                if (medicineOrdersCount !== currentCount) {
                    setChartData(prevData => [
                        ...prevData,
                        {
                            date: new Date().toISOString(),
                            'Medicine Orders': medicineOrdersCount,
                        },
                    ].slice(-10)); // Adjust this value based on your needs
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1 * 60 *60* 1000);

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
            xAxisLabel="Time"
            yAxisLabel="Number of Orders"  
            onValueChange={(v) => console.log(v)}
        />
    );
}
