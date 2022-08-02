import React, { useContext } from 'react'
import { DbContext } from '../context/DbContext'
import Chart from "react-apexcharts";
import  Paper  from '@mui/material/Paper';

const PieChart = () => {
    const { employees } = useContext(DbContext)

        const data = {}
        employees.map((emp) => data[emp.company] ? data[emp.company]++ : data[emp.company] = 1)
        const chartData = {
            series: [...Object.values(data)],
            labels: [...Object.keys(data)]
        }
 
    return (
        <Paper sx={{width:'100%', maxWidth:'600', padding:'1rem'}} elevation={20}>
            <Chart
                type="pie"
                width={'100%'}
                height={400}
                series={chartData?.series}
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
        </Paper>
    )
}

export default PieChart