import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import EmployeeDetails from '../components/EmployeeDetails';
import EmployeeTable from '../components/EmployeeTable';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const {user} = useContext(AuthContext)
console.log(user)



    return (
    <main>
        {
          user  && <Grid container sx={{ paddingInline: '2rem' }} spacing={4}>
          <Grid item xs={12} lg={6} >
            <EmployeeTable sx={{ margin: 'auto' }} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <EmployeeDetails />
          </Grid>
        </Grid>
        }
        

    </main>
  )
  }
  
export default Dashboard