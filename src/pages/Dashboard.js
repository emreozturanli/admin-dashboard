import React, { useContext } from 'react'
import { DbContext } from '../context/DbContext'
import { AuthContext } from '../context/AuthContext'
import  Grid  from '@mui/material/Grid'
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  const {employees, companies} = useContext(DbContext) 

  return (
    <main>{
      user && <Grid container sx={{ paddingInline: '2rem' }} spacing={4}>
        <Grid item xs={12} lg={6} >
          <PieChart sx={{ margin: 'auto' }} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <BarChart />
        </Grid>
      </Grid>
    }</main>
  )
}

export default Dashboard