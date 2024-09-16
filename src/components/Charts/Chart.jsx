import React from 'react';
import { Box, Typography, Paper, Grid, useMediaQuery, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function Chart({ sortedTransactions = [] }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Filter and format data for PieChart (expenses only)
    const spendingData = sortedTransactions
        .filter((transaction) => transaction.type === "expense")
        .map((transaction) => ({
            tag: transaction.tag,
            amount: transaction.amount ? transaction.amount : 0,
        }));

    // Aggregate spending data
    const finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag;
        if (!acc[key]) {
            acc[key] = { tag: obj.tag, amount: obj.amount };
        } else {
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    // Prepare new spendings data for Pie Chart
    const newSpendings = [
        
        { tag: "education", amount: finalSpendings["education"] ? finalSpendings["education"].amount : 0 },
        { tag: "entertainment", amount: finalSpendings["entertainment"] ? finalSpendings["entertainment"].amount : 0 },
        { tag: "office", amount: finalSpendings["office"] ? finalSpendings["office"].amount : 0 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const chartHeight = isMobile ? 200 : 300;

    return (
        <Box sx={{ padding: 2, margin: 6 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Transaction Chart
            </Typography>

            <Grid container spacing={3}>
                {/* Line Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Transaction History
                        </Typography>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <LineChart data={sortedTransactions} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Spending Breakdown
                        </Typography>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <PieChart>
                                <Pie
                                    data={newSpendings}
                                    dataKey="amount"
                                    nameKey="tag"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={isMobile ? 80 : 100}
                                    fill="#8884d8"
                                    label
                                >
                                    {newSpendings.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Chart;