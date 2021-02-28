import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import Header from './Header';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import '../css/reset.css'
import '../css/common.css'
import '../css/login.css'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            user && props.history.push('/');
        })
        return () => unSub();
    },[])

    const handleLogin = async() => {
        try{
            await auth.signInWithEmailAndPassword(email,password)
            props.history.push('/');
        }catch(error){
            alert(error.message);
        }
    }

    return (
        <> 
            <Header />
            <div className="bg_img">
                <Container maxWidth="sm">
                    <h1 className="login_title">Sign In</h1>
                    <form className="login_form">
                        <Box m={4}>
                            <TextField 
                                id="email"
                                label="メールアドレス"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                />
                        </Box>
                        <Box m={4}>
                            <TextField
                                id="password"
                                label="パスワード"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                />
                        </Box>
                        <Box m={6} className="text-center login_btn_wrap">
                            <Button variant="contained"className="login_btn" onClick={handleLogin}>Sign in<ArrowForwardIcon /></Button>
                        </Box>
                        <Box m={2}>
                            <p className="text-center"><Link to="/register">Sign Up</Link></p>
                        </Box>
                    </form>
                </Container>
            </div>
        </>
    )
}

export default Login;