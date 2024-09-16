import React from 'react';
import { Box, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import transactions from "../assets/transactions.svg"

function NoTransactions() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="90%"
      mb={4}
    >
      <CardMedia
        component="img"
        image={transactions}
        alt="No Transactions"
        sx={{ width: { xs: '60%', sm: '60%', md: '40%' }, m: 2 }}
      />
      <Typography
        variant="h6"
        align="center"
        sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
      >
        You Have No Transactions Currently
      </Typography>
    </Box>
  );
}

export default NoTransactions;