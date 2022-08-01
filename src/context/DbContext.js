import { createContext, useState, useEffect } from 'react'
import { db } from '../firebase/firebase';
import { set, ref, push, onValue, remove, update } from 'firebase/database';
import toast from 'react-hot-toast';

export const DbContext = createContext()

const DbContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [updateInfo, setUpdateInfo] = useState({})
  const [companies, setCompanies] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [address, setAddress] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editEmployeeOpen,setEditEmployeeOpen] = useState(false)


  const writeToDatabase = (e) => {
    e.preventDefault()
    if (name && email && company && email) {
      const employeesRef = ref(db, 'employees');
      const newEmployeesRef = push(employeesRef)
      set(newEmployeesRef, {
        name: name,
        email: email,
        company: company,
        address: address,
      })
      setName('');
      setEmail('');
      setCompany('');
      setAddress('');
      setDialogOpen(false)
      toast.success('New Employee Successfully Added!')
    }
    else {
      toast.error('All fields must be filled')
    }
  };

  useEffect(() => {
    const employeeRef = ref(db, "employees");
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      const employeeArr = [];
      for (let id in data) {
        employeeArr.push({
          id,
          ...data[id]
        })
      }
      setEmployees(employeeArr);
    })
  }, [])

  const deleteEmployee = (id) => {
    remove(ref(db, 'employees/' + id))
    toast.success('Employee successfully removed')
    setUpdateInfo({})
    setEditEmployeeOpen(false)
  }


  const editEmployeeInfo = (e) => {
    e.preventDefault()
    update(ref(db, 'employees/' + updateInfo.id), {
      name: updateInfo.name,
      email: updateInfo.email,
      address: updateInfo.address,
      company: updateInfo.company
    })
    toast.success('Employee informations successfully updated.')
    setEditEmployeeOpen(false)
  }

  /* COMPANY DB */

  useEffect(() => {
    const companyRef = ref(db, "companies");
    onValue(companyRef, (snapshot) => {
      const data = snapshot.val();
      const companyArr = [];
      for (let id in data) {
        companyArr.push({
          id,
          ...data[id]
        })
      }
      setCompanies(companyArr);
    })
  }, [])

  return (
    <DbContext.Provider value={{
      employees,
      setEmployees,
      deleteEmployee,
      updateInfo,
      setUpdateInfo,
      editEmployeeInfo,
      companies,
      setCompanies,
      name,
      setName,
      email,
      setEmail,
      address,
      setAddress,
      company,
      setCompany,
      writeToDatabase,
      dialogOpen,
      setDialogOpen,
      editEmployeeOpen,
      setEditEmployeeOpen
    }}>
      {children}
    </DbContext.Provider>
  )
}

export default DbContextProvider