import React from 'react'
import Header from '../components/Header/Header'
import SignUpSignin from '../components/SignupSignin/SignUpSignin'
import { Box } from '@mui/material'

function Signup() {
    return (
        <Box>
            {/* <Header /> */}
            <Box className="wrapper">
                <SignUpSignin />
            </Box>
        </Box>
    )
}

export default Signup