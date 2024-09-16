import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function AddIncomeModal({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [formValues, setFormValues] = React.useState({
    name: "",
    amount: "",
    date: "",
    tag: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish(formValues, "income");
    setFormValues({
      name: "",
      amount: "",
      date: "",
      tag: "",
    });
  };

  return (
    <Dialog open={isIncomeModalVisible} onClose={handleIncomeCancel} fullWidth>
      <DialogTitle style={{ fontWeight: 600 }}>Add Income</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formValues.amount}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formValues.date}
            onChange={handleChange}
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tag</InputLabel>
            <Select
              name="tag"
              value={formValues.tag}
              onChange={handleChange}
              required
              label="Tag"
            >
              <MenuItem value="salary">Salary</MenuItem>
              <MenuItem value="freelance">Freelance</MenuItem>
              <MenuItem value="investment">Investment</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIncomeCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Income
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddIncomeModal;