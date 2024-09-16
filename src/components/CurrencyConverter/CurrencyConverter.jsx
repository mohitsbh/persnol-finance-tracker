import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, MenuItem, Grid, Container } from '@mui/material';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://api.exchangerate-api.com/v4/latest/';

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}USD`);
        setCurrencies(Object.keys(response.data.rates));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currency data", error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await axios.get(`${API_URL}${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Error converting currency", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ padding: '2rem', maxWidth: 'sm' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Currency Converter
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="From Currency"
              select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="To Currency"
              select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button onClick={handleConvert} variant="contained" color="primary" fullWidth>
          Convert
        </Button>
        {convertedAmount !== null && (
          <Typography variant="h6" align="center" sx={{ marginTop: '1rem' }}>
            Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CurrencyConverter;