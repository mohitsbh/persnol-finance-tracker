import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select,
    MenuItem, ToggleButtonGroup, ToggleButton, Box, Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

function TransactionTable({ transactions, addTransaction, fetchTransactions }) {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const columns = [
        { title: "Name", key: "name" },
        { title: "Amount", key: "amount" },
        { title: "Tag", key: "tag" },
        { title: "Type", key: "type" },
        { title: "Date", key: "date" }
    ];

    const filterTransactions = transactions.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
    );

    function exportCsv() {
        var csv = unparse({
            fields: ['name', "type", "tag", "date", "amount"],
            data: transactions,
        });

        var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importFromCsv(event) {
        event.preventDefault();
        try {
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {
                    for (const transaction of results.data) {
                        const newTransaction = {
                            ...transaction,
                            amount: parseFloat(transaction.amount, 10),
                        };
                        await addTransaction(newTransaction, true);
                    }
                    toast.success('All Transactions Added');
                    fetchTransactions();
                    event.target.files = null;
                },
            });
        } catch (e) {
            toast.error(e.message);
        }
    }

    const sortedTransactions = filterTransactions.sort((a, b) => {
        if (sortKey === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortKey === "amount") {
            return a.amount - b.amount;
        } else {
            return 0;
        }
    });

    return (
        <>
            <Box sx={{ padding: isMobile ? 2 : 5, alignItems: "center" }}>
                {/* Search bar */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 1, margin: isMobile ? 0 : "5px 60px" }}>
                    <TextField
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search By Name'
                        variant="outlined"
                        fullWidth
                        sx={{ width: isMobile ? "100%" : "75%" }}
                    />
                    {/* Type Filter Dropdown */}
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        displayEmpty
                        variant="outlined"
                        sx={{ width: isMobile ? '100%' : '25%' }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: "flex", justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row', gap: 1, margin: isMobile ? 0 : "5px 60px", alignItems: "center" }}>
                    {/* Sort Options */}
                    <ToggleButtonGroup
                        value={sortKey}
                        exclusive
                        onChange={(e, value) => setSortKey(value || '')}
                        sx={{
                            marginTop: 2,
                            width: isMobile ? '90%' : '50%',
                            display: 'flex',
                            padding: isMobile ? 0 : "10px",
                        }}
                    >
                        <ToggleButton value="date">Sort By Date</ToggleButton>
                        <ToggleButton value="amount">Sort By Amount</ToggleButton>
                        <ToggleButton value="">No Sort</ToggleButton>
                    </ToggleButtonGroup>

                    {/* Import/Export Buttons */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        gap: 2,
                        marginTop: 2
                    }}>
                        <Button variant="contained" color="primary" onClick={exportCsv}>Export to CSV</Button>
                        <Button variant="contained" component="label" color="secondary" >
                            Import from CSV
                            <input type="file" accept=".csv" hidden onChange={importFromCsv} />
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Table */}
            <TableContainer
                component={Paper}
                sx={{
                    marginTop: 2,
                    margin: isMobile ? '5px' : '10px auto',
                    padding: isMobile ? '8px' : '20px',
                    width: '98%',
                    maxWidth: "100vw"
                }}
            >
                <Table sx={{ minWidth: isMobile ? 300 : 600 }}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "rgba(128, 128, 128, 0.493)" }}>
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key}
                                    sx={{
                                        padding: isMobile ? '7px' : '14px',
                                        fontSize: isMobile ? '10px' : '14px',
                                    }}
                                >
                                    {col.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTransactions.length > 0 ? (
                            sortedTransactions.map((transaction, index) => (
                                <TableRow key={index}>
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            sx={{
                                                padding: isMobile ? '6px' : '16px',
                                                fontSize: isMobile ? '14px' : '14px',
                                            }}
                                        >
                                            {transaction[col.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No transactions found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TransactionTable;