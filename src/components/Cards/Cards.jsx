import React from 'react';
import { Card, CardContent, CardHeader, Grid, Container } from '@mui/material';
import Button from '../Button/Button'; 

function Cards({ showExpenseModal, showIncomeModal, income, expense, totalBalance,resetBalance }) {
    const rupeesSign = '\u20B9';

    return (
        <Container>
            <Grid container spacing={3} sx={{ mt: 2 }}>
                {/* Current Balance */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 6 }}>
                        <CardHeader title="Current Balance" />
                        <CardContent sx={{ fontSize: 20, fontWeight: 'bold' }}>
                            {rupeesSign} {totalBalance}
                        </CardContent>
                        <CardContent>
                            <Button
                                text="Reset Balance"
                                blue={true} 
                                onClick={resetBalance} 
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Income */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 6 }}>
                        <CardHeader title="Total Income" />
                        <CardContent sx={{ fontSize: 20, fontWeight: 'bold' }}>
                            {rupeesSign} {income}
                        </CardContent>
                        <CardContent>
                            <Button
                                text="Add Income"
                                onClick={showIncomeModal} 
                                blue={true}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Total Expenses */}
                <Grid item xs={12} sm={4}>
                    <Card sx={{ boxShadow: 6 }}>
                        <CardHeader title="Total Expenses" />
                        <CardContent sx={{ fontSize: 20, fontWeight: 'bold' }}>
                            {rupeesSign} {expense}
                        </CardContent>
                        <CardContent>
                            <Button
                                text="Add Expense"
                                onClick={showExpenseModal} 
                                blue={true}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Cards;