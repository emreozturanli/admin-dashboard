import { Button, Divider, MenuItem, Paper, TextField, Typography } from "@mui/material"
import { useContext } from "react"
import { DbContext } from "../context/DbContext"

const EmployeeDetails = () => {
    const { updateInfo, setUpdateInfo, editEmployeeInfo, deleteEmployee, companies } = useContext(DbContext)

    const handleChange = (e) => {
        setUpdateInfo({
            ...updateInfo,
            [e.target.name]: e.target.value
        })
    }
  
    return (
        <Paper sx={{ padding: '1rem' }} elevation={24}>
            <Typography variant="h4">Employee Details</Typography>
            <form style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem' }}
              onSubmit={editEmployeeInfo}
            >
              
               <TextField
                    label="Name"
                    color="grey"
                    focused
                    margin="normal"
                    type='text'
                    required
                    name='name'
                    value={updateInfo.name}
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                        style: { width: 'max-width' },
                      }}
                />
                <TextField
                    label="Email"
                    color="grey"
                    focused
                    margin="normal"
                    type='email'
                    name="email"
                    required
                    value={updateInfo.email}
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                        style: { width: 'max-width' },
                      }}
                />
                <TextField
                    id="company"
                    select
                    color="grey"
                    focused
                    required
                    type='text'
                    margin="normal"
                    name="company"
                    label="Company"
                    value={updateInfo.company ? updateInfo.company : ''}
                    onChange={(e) => handleChange(e)}
                    InputProps={{
                        style: { minWidth: '200px' },
                      }}
                >
                    {companies.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Address"
                    color="grey"
                    focused margin="normal"
                    sx={{ maxWidth: '350px' }}
                    name="address"
                    type='text'
                    required
                    value={updateInfo.address}
                    onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" color="success"
                    type="submit"
                  
                >
                    Update
                </Button>
              
                <Button variant="contained" color="error"
                    onClick={() => deleteEmployee(updateInfo.id)}
                >
                    Delete
                </Button>
                </form>
            <Divider />
            <Typography variant="h4">{updateInfo.company}</Typography>

            {
                companies?.filter((e) => e.name === updateInfo.company)?.map((company, i) => {
                    return <Typography key={i} variant="body1">{company.information}</Typography>
                })

            }

        </Paper>
    )
}

export default EmployeeDetails