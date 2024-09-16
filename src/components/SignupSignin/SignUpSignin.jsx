import React, { useState } from 'react';
import { Box, Typography, TextField, Button as MuiButton, CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignUpSignin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false);
    const [logging, setLogging] = useState(false);
    const navigate = useNavigate();

    // Function to sign up with email and password
    function signupWithEmail() {
        setLoading(true);
        if (name !== "" && email !== "" && password !== "" && confirm !== "") {
            if (password === confirm) {
                createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    const user = userCredential.user;
                    toast.success("User created");
                    setLoading(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setConfirm('');
                    createDoc(user);
                    navigate('/dashboard');
                })
                    .catch((error) => {
                        toast.error(error.message);
                        setLoading(false);
                    });
            } else {
                toast.error('Passwords do not match');
                setLoading(false);
            }
        } else {
            toast.error('All fields are required');
            setLoading(false);
        }
    }

    // Function to log in with email and password
    function LoginUsingEmail() {
        setLoading(true);
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                toast.success("User logged in");
                setLoading(false);
                navigate('/dashboard');
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
        } else {
            toast.error('All fields are required');
            setLoading(false);
        }
    }

    // Function to create user document in Firestore
    async function createDoc(user) {
        setLoading(true);
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);
        if (!userData.exists()) {
            try {
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName || name,
                    email: user.email,
                    photoURL: user.photoURL || "",
                    createdAt: new Date(),
                });
                toast.success("User document created");
            } catch (e) {
                toast.error(e.message);
            }
        } else {
            toast.error('User document already exists');
        }
        setLoading(false);
    }

    // Function for Google sign-in
    function googleAuth() {
        setLoading(true);
        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            createDoc(user);
            toast.success('User authenticated');
            navigate('/dashboard');
        }).catch((error) => {
            toast.error(error.message);
            setLoading(false);
        });
    }

    return (
        <>
            {logging ? (
                <Box sx={{ width: '100%', maxWidth: '450px', padding: '1rem 1.5rem', boxShadow: 6, borderRadius: '1rem' }}>
                    <Typography variant="h5" align="center">
                        Log in on <span className="p-f">Personal Finance</span>
                    </Typography>
                    <form>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <MuiButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={LoginUsingEmail}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Log in using Email and Password'}
                        </MuiButton>
                        <Typography align="center" className="p-login">or</Typography>
                        <MuiButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={googleAuth}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Log in using Google'}
                        </MuiButton>
                        <Typography align="center" sx={{ cursor: "pointer" }} className="p-login" onClick={() => setLogging(!logging)}>
                            Don't have an account? Click here
                        </Typography>
                    </form>
                </Box>
            ) : (
                <Box sx={{ width: '100%', maxWidth: '450px', padding: '1rem 1.5rem', boxShadow: 6, borderRadius: '1rem' }}>
                    <Typography variant="h5" align="center">
                        Sign up on <span className="p-f">Personal Finance</span>
                    </Typography>
                    <form>
                        <TextField
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <MuiButton
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={signupWithEmail}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign up using Email and Password'}
                        </MuiButton>
                        <Typography align="center" className="p-login">or</Typography>
                        <MuiButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={googleAuth}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign up using Google'}
                        </MuiButton>
                        <Typography align="center" sx={{ cursor: "pointer" }} className="p-login" onClick={() => setLogging(!logging)}>
                            Already have an account? Click here
                        </Typography>
                    </form>
                </Box>
            )}
        </>
    );
}

export default SignUpSignin;