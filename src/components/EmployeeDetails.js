import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useContext } from "react"
import { DbContext } from "../context/DbContext"
import { MenuItem } from '@mui/material';

const EmployeeDetails = () => {
    const { editEmployeeOpen, setEditEmployeeOpen, updateInfo, setUpdateInfo, editEmployeeInfo, deleteEmployee, companies } = useContext(DbContext)

    const handleClose = () => {
        setEditEmployeeOpen(false);
    };

    const handleChange = (e) => {
        setUpdateInfo({
            ...updateInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Dialog open={editEmployeeOpen} onClose={handleClose}>
            <DialogTitle>Edit Employee Informations</DialogTitle>
            <DialogContent>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingBottom: '1rem' }}
                >
                    <TextField
                        label="Name"
                        color="grey"
                        focused
                        margin="normal"
                        type='text'
                        required
                        name='name'
                        value={updateInfo.name ? updateInfo.name : ''}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Email"
                        color="grey"
                        focused
                        margin="normal"
                        type='email'
                        name="email"
                        required
                        value={updateInfo.email ? updateInfo.email : ''}
                        onChange={(e) => handleChange(e)}
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
                        value={updateInfo.address ? updateInfo.address : ''}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color='error' onClick={() => deleteEmployee(updateInfo.id)}>Delete</Button>
                <Button type='submit' onClick={editEmployeeInfo}>Update</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EmployeeDetails