import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards/Cards'; 
import AddExpenseModal from '../components/Modal/addExpense'; 
import AddIncomeModal from '../components/Modal/addIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify'; 
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress'; 
import TransactionTable from '../components/Tabletransaction/TransactionTable'; 
import Chart from '../components/Charts/Chart';
import NoTransactions from '../components/NoTransactions';
import CurrencyConverter from '../components/CurrencyConverter/CurrencyConverter';
import { Box } from '@mui/material';

function Dashboard() {
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [transactions, setTransactions] = useState([]); // To store transactions fetched from Firestore
    const [loading, setLoading] = useState(false); 
    const [user, loadingAuth] = useAuthState(auth); // Get current authenticated user
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false); // Expense modal visibility
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false); // Income modal visibility

    // Show the Expense Modal
    const showExpenseModal = () => setIsExpenseModalVisible(true);

    // Show the Income Modal
    const showIncomeModal = () => setIsIncomeModalVisible(true);

    // Close the Expense Modal
    const handleExpenseCancel = () => setIsExpenseModalVisible(false);

    // Close the Income Modal
    const handleIncomeCancel = () => setIsIncomeModalVisible(false);

    const resetBalance = () => {
        setTotalBalance(0);
        setIncome(0);
        setExpense(0);
    }

    // Handle form submission from modals (income or expense)
    const onFinish = (values, type) => {
        const newTransaction = {
            type,
            date: moment(values.date).format("YYYY-MM-DD"), // Format the date using moment
            amount: parseFloat(values.amount),
            tag: values.tag, 
            name: values.name, 
        };

        addTransaction(newTransaction); // Add the transaction to Firestore
    };

    // Add a new transaction to Firestore
    const addTransaction = async (transaction, many) => {
        try {
            if (user) {
                await addDoc(
                    collection(db, `users/${user.uid}/transactions`),
                    transaction
                );
                if (!many) toast.success("Transaction added successfully");
                fetchTransactions(); 
            } else {
                toast.error("User not authenticated");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            if (!many) toast.error("Couldn't add transaction");
        }
    };

    // Fetch transactions from Firestore
    const fetchTransactions = async () => {
        setLoading(true);
        try {
            if (user) {
                const q = query(collection(db, `users/${user.uid}/transactions`));
                const querySnapshot = await getDocs(q);
                const transactionsArray = querySnapshot.docs.map(doc => doc.data()); 
                setTransactions(transactionsArray);
                toast.success("Transactions fetched successfully");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error("Couldn't fetch transactions");
        }
        setLoading(false); 
    };

    // Calculate total balance from transactions
    const calculateBalance = () => {
        let incomeTotal = 0;
        let expenseTotal = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                incomeTotal += transaction.amount;
            } else {
                expenseTotal += transaction.amount;
            }
        });

        setIncome(incomeTotal);
        setExpense(expenseTotal);
        setTotalBalance(incomeTotal - expenseTotal);
    };

    // Fetch transactions when component mounts
    useEffect(() => {
        if (user) fetchTransactions();
    }, [user]);

    // Recalculate balance when transactions are updated
    useEffect(() => {
        calculateBalance();
    }, [transactions]);

    // Check if authentication is loading
    if (loadingAuth) {
        return <CircularProgress />; 
    }

    // If no user is logged in, show a message
    if (!user) {
        return <p>Please log in to view your dashboard.</p>;
    }

    let sortedTransactions = transactions.sort((a, b) => {

        return new Date(a.date) - new Date(b.date)

    })

    return (
        <Box>
                   {loading ? (
                // Show loading spinner while fetching transactions
                <CircularProgress />
            ) : (
                <>
                    {/* Cards component showing total income, expense, and balance */}
                    <Cards
                        income={income}
                        expense={expense}
                        totalBalance={totalBalance}
                        showExpenseModal={showExpenseModal}
                        showIncomeModal={showIncomeModal}
                        resetBalance={resetBalance}
                    />


                    {transactions != [] ? <Chart sortedTransactions={sortedTransactions} /> : <NoTransactions />}
                    {/* Expense Modal */}
                    <AddExpenseModal
                        isExpenseModalVisible={isExpenseModalVisible}
                        handleExpenseCancel={handleExpenseCancel}
                        onFinish={onFinish}
                    />

                    {/* Income Modal */}
                    <AddIncomeModal
                        isIncomeModalVisible={isIncomeModalVisible}
                        handleIncomeCancel={handleIncomeCancel}
                        onFinish={onFinish}
                        fetchTransactions={fetchTransactions}
                    />

                    {/* Transaction Table */}
                    <TransactionTable transactions={transactions} addTransaction={addTransaction} /> 
                    <CurrencyConverter />
                </>
            )}
        </Box>
    );
}

export default Dashboard;