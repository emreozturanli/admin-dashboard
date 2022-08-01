import React, { useContext } from 'react'
import { DbContext } from '../context/DbContext'
import Chart from "react-apexcharts";

const PieChart = () => {
    const { employees } = useContext(DbContext)

    // const createData = (employees) => {
        const data = {}
        employees.map((emp) => data[emp.company] ? data[emp.company]++ : data[emp.company] = 1)
        const chartData = {
            series: [...Object.values(data)],
            labels: [...Object.keys(data)]
        }
    //     console.log(chartData);
    //     return chartData
    // }

    return (
        <div style={{width:'100%', maxWidth:'600'}}>
            <Chart
                type="pie"
                width={'100%'}
                height={400}
                series={chartData?.series}
                // series={createData(employees)?.series}
                options={{
                    title: {
                        text: "Companies",
                        style: {
                            fontSize:  '20px',
                            fontWeight:  'bold',
                            color:  '#5189f3'
                          },
                    },
                    noData: { text: "Empty Data" },
                    labels: chartData?.labels,
                    // labels: createData(employees)?.labels,
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                title: {
                                    align: 'center'
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ]
                }}

            />
        </div>
    )
}

export default PieChart