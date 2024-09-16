

import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ text, onClick, blue }) {
    return (
        <MuiButton
            variant="contained"
            onClick={onClick}
            sx={{
                backgroundColor: blue ? 'blue' : 'gray',
                color: '#fff',
                '&:hover': {
                    backgroundColor: blue ? 'darkblue' : 'darkgray',
                },
            }}
        >
            {text}
        </MuiButton>
    );
}

export default Button;