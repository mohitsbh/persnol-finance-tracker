import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

function AddExpenseModal({ isExpenseModalVisible, handleExpenseCancel, onFinish }) {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    onFinish(data, "expense");
    reset(); // Reset the form after submission
  };

  return (
    <Dialog open={isExpenseModalVisible} onClose={handleExpenseCancel} fullWidth>
      <DialogTitle style={{ fontWeight: 600 }}>Add Expense</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Please input the name of the transaction!" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Controller
              name="amount"
              control={control}
              rules={{ required: "Please input the expense amount!" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Amount"
                  type="number"
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Controller
              name="date"
              control={control}
              rules={{ required: "Please select the expense date!" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  fullWidth
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="tag-label">Tag</InputLabel>
            <Controller
              name="tag"
              control={control}
              rules={{ required: "Please select a tag!" }}
              render={({ field, fieldState: { error } }) => (
                <Select
                  {...field}
                  labelId="tag-label"
                  label="Tag"
                  error={!!error}
                  fullWidth
                >
                  <MenuItem value="education">Education</MenuItem>
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  {/* Add more tags here */}
                </Select>
              )}
            />
          </FormControl>

          <DialogActions>
            <Button onClick={handleExpenseCancel} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Add Expense
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddExpenseModal;