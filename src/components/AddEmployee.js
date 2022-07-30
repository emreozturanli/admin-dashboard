import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DbContext } from '../context/DbContext';
import { MenuItem } from '@mui/material';

export default function AddEmployee() {
  const { companies, dialogOpen, setDialogOpen, name, email, company, address, setName, setEmail, setCompany, setAddress, writeToDatabase } = useContext(DbContext)

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            required
            margin="normal"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please type a valid email address"
          />
          <TextField

            margin="normal"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            sx={{ minWidth: '120px' }}
            id="company"
            select
            color="grey"
            required
            focused
            type='text'
            margin="normal"
            name="company"
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            {companies.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={writeToDatabase}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}