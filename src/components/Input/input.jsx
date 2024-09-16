
import React from 'react';
import { Box, TextField } from '@mui/material';

function Input({ label, state, setState, placeholder, type }) {
  return (
    <Box className="input-wrapper">
      <TextField
        label={label}
        variant="standard"
        type={type}
        fullWidth
        value={state}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
        InputProps={{ style: { opacity: 0.7 } }}
        InputLabelProps={{ style: { textTransform: 'capitalize', fontSize: '0.9rem' } }}
        sx={{
          margin: '1.5rem 0',
          '& .MuiInput-underline:before': {
            borderBottomWidth: '1px',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomWidth: '1px',
          },
          '& .MuiInputBase-root': {
            fontSize: '0.8rem',
            paddingBottom: '0.5rem',
          },
          '& .Mui-focused .MuiInputBase-input': {
            opacity: 1,
            transition: 'opacity 0.5s ease',
          },
        }}
      />
    </Box>
  );
}

export default Input;