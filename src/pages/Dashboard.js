import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import  Grid  from '@mui/material/Grid'
import PieChart from '../components/PieChart'
import BarChart from '../components/BarChart'

const Dashboard = () => {
  const {user} = useContext(AuthContext)

  return (
    <main>{
      user && <Grid container sx={{ paddingInline: '2rem', marginBottom:'2rem' }} spacing={4}>
        <Grid item xs={12} lg={6} >
          <PieChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <BarChart />
        </Grid>
      </Grid>
    }</main>
  )
}

export default Dashboard