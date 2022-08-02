import React, { useContext } from 'react'
import { DbContext } from '../context/DbContext'
import Chart from "react-apexcharts";
import  Paper  from '@mui/material/Paper';

const BarChart = () => {
  const { employees } = useContext(DbContext)

  const data = []

  const addresses = (employees?.map((e)=> e.address))
  const keys = [...new Set(addresses)]
  for(let i = 0; i< keys.length; i++){
   data.push({x:keys[i], y:addresses.filter((e)=> e === keys[i]).length})
  }
  
  console.log(data);

  return (
    <Paper sx={{width:'100%', maxWidth:'600', padding:'1rem'}} elevation={20}>
            <Chart
                type="bar"
                width={'100%'}
                height={400}
                series={
                  [{data: data && data }]
              }
                plotoptions= {{
                  bar: {
                    horizontal: true
                  }
                }}
                options={{
                    title: {
                        text: "Employees per State",
                        style: {
                            fontSize:  '20px',
                            fontWeight:  'bold',
                            color:  '#5189f3'
                          },
                    },
                    noData: { text: "Empty Data" },
                    labels: {},
                }}

            />
        </Paper>
  )
}

export default BarChart