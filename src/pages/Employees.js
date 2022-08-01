// import Grid from '@mui/material/Grid';
import { useContext } from 'react';
import EmployeeDetails from '../components/EmployeeDetails';
import { AuthContext } from '../context/AuthContext';
import EmployeeTable from '../components/EmployeeTable'

const Employees = () => {
  const { user } = useContext(AuthContext)

  return (
    <main>
      {
        user &&
        <>
          <EmployeeTable />
          <EmployeeDetails />
        </>
      }
    </main>
  )
}

export default Employees