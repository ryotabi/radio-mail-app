import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Header from './Header';
import GetValidationMessage from '../helpers/ValidationMessage';
import { auth } from '../firebase';
import '../css/login.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationType, setValidationType] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(() => {
      props.history.push('/');
    });
    return () => unSub();
  }, []);

  const storeLoginInfo = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      props.history.push('/');
    } catch (error) {
      const validationInfo = GetValidationMessage(error.code);
      setValidationType(validationInfo.type);
      setValidationMessage(validationInfo.message);
    }
  };

  return (
    <>
      <Header />
      <div className="bg_img" />
      <Container maxWidth="lg">
        <h1 className="login_title">Sign In</h1>
        <form className="login_form">
          <Box m={4}>
            <p className="required">必須</p>
            <TextField
              id="email"
              type={email}
              required
              label="メールアドレス"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {(() => {
              if (validationType === 'email') {
                return (
                  <p className="error">{validationMessage}</p>
                );
              }
              return '';
            })()}
          </Box>
          <Box m={4}>
            <p className="required">必須</p>
            <TextField
              id="password"
              required
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {(() => {
              if (validationType === 'password') {
                return (
                  <p className="error">{validationMessage}</p>
                );
              }
              return '';
            })()}
          </Box>
          <Box m={4} className="text-center login_btn_wrap">
            <Button variant="contained" className="login_btn" onClick={storeLoginInfo}>
              Sign in
              <ArrowForwardIcon />
            </Button>
            {(() => {
              if (validationType === 'default') {
                return (
                  <p className="error">{validationMessage}</p>
                );
              }
              return '';
            })()}
          </Box>
          <Box m={2}>
            <p className="text-center"><Link to="/resetPassword">パスワードを忘れた方</Link></p>
          </Box>
          <Box m={2}>
            <p className="text-center"><Link to="/register">Sign Up</Link></p>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Login;
