import React, { useContext, useEffect } from 'react'
import { DbContext } from '../context/DbContext'

const PieChart = () => {
    const { employees, companies } = useContext(DbContext)

    const createData = (employees) => {
        const data = {}
        employees.map((emp) => data[emp.company] ? data[emp.company]++ : data[emp.company] = 1)
        const chartData = {
            series: [...Object.values(data)],
            labels: [...Object.keys(data)]
        }
        console.log(chartData);
        return chartData
    }

    useEffect(() => {
        createData(employees)
    }, [])

    
    return (
        <div>PieChart</div>
    )
}

export default PieChart