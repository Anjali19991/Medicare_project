import { useState, useEffect } from 'react';
import { AreaChart } from '@tremor/react';
import { useAuth } from "../../../AuthContext";

export function AreaChartComponent() {
    const [areaChartData, setAreaChartData] = useState([]);
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
                // Similarly, fetch data for other categories

                // Get the current timestamp
                const timestamp = Date.now();

                // Update areaChartData with timestamp and count data
                setAreaChartData(prevData => [
                    ...prevData,
                    {
                        time: timestamp,
                        name: 'Medicine Orders',
                        Count: medicineOrdersCount,
                    },
                    // Repeat the above pattern for other data categories
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data initially
        fetchData();

        // Set up an interval to fetch data every 2-3 hours
        const intervalId = setInterval(fetchData, 2 *5*5 * 1000); 

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [token, API_ENDPOINT]);

    const areaDataFormatter = (number) => Intl.NumberFormat('us').format(number).toString();

    return (
        <AreaChart
            className="h-80"
            data={areaChartData}
            index="time"
            categories={['Count']}
            colors={['teal']}
            valueFormatter={areaDataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
        />
    );
}
