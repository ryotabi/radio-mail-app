import React, { useState } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import { auth, db } from '../firebase';
import Header from './Header';
import GetValidationMessage from '../helpers/ValidationMessage';
import '../css/register.css';

const Register = (props) => {
  const [radioName, setRadioName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hurigana, setHurigana] = useState('');
  const [age, setAge] = useState('');
  const [tel, setTel] = useState('');
  const [portalCode, setPortalCode] = useState('');
  const [address, setAddress] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const [isInput2, setIsInput2] = useState(false);
  const [isInput3, setIsInput3] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const goToNextPage2 = () => {
    setIsInput2(true);
    setNowPage(2);
  };
  const goToNextPage3 = () => {
    setIsInput3(true);
    setNowPage(3);
  };
  const goBackPage1 = () => {
    setIsInput2(false);
    setNowPage(1);
  };
  const goBackPage2 = () => {
    setIsInput3(false);
    setIsInput2(true);
    setNowPage(2);
  };

  const storeRegisterInfo = async () => {
    try {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              db.collection(`users/${user.uid}/info`).add({
                radioName,
                email,
                name,
                hurigana,
                age,
                tel,
                portalCode,
                address,
              });
              props.history.push('/');
            }
          });
        }).catch((error) => {
          const validationInfo = GetValidationMessage(error.code);
          setValidationMessage(validationInfo.message);
        });
    } catch (error) {
      return '';
    }
    return '';
  };

  return (
    <>
      <Header />
      <div className="bg_img" />
      <Container maxWidth="lg">
        <h1 className="register_title">Sign Up</h1>
        <form className="register_form">
          {(
            () => {
              if (nowPage === 1) {
                return (
                  <div>
                    <Box m={4}>
                      <TextField
                        id="radioName"
                        label="ラジオネーム"
                        value={radioName}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setRadioName(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={4}>
                      <p className="required">必須</p>
                      <TextField
                        id="email"
                        required
                        label="メールアドレス"
                        value={email}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={4}>
                      <p className="required">必須</p>
                      <TextField
                        id="password"
                        required
                        label="パスワード"
                        type="password"
                        value={password}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={6} className="text-center register_btn_wrap">
                      <Button variant="contained" className="register_btn" onClick={goToNextPage2}><ArrowForwardIcon /></Button>
                    </Box>
                    <Box m={2}>
                      <p className="text-center"><Link to="/login">Sign In</Link></p>
                    </Box>
                  </div>
                );
              }
              if (nowPage === 2) {
                return (
                  <div>
                    <Box m={4}>
                      <TextField
                        id="name"
                        label="本名"
                        value={name}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={4}>
                      <TextField
                        id="hurigana"
                        label="ふりがな"
                        value={hurigana}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setHurigana(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={4}>
                      <TextField
                        id="age"
                        label="年齢"
                        value={age}
                        className="md_w-100 w_90"
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={6} className="text-center register_btn_wrap">
                      <Grid container justify="space-around">
                        <Grid item xs={3}>
                          <Button variant="contained" className="register_btn" onClick={goBackPage1}><ArrowBackIcon /></Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="contained" className="register_btn" onClick={goToNextPage3}><ArrowForwardIcon /></Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={2}>
                      <p className="text-center"><Link to="/login">Sign In</Link></p>
                    </Box>
                  </div>
                );
              }
              return (
                <div>
                  <Box m={4}>
                    <TextField
                      id="tel"
                      label="電話番号"
                      type="tel"
                      value={tel}
                      className="md_w-100 w_90"
                      onChange={(e) => {
                        setTel(e.target.value);
                      }}
                    />
                  </Box>
                  <Box m={4}>
                    <TextField
                      id="portalCode"
                      label="郵便番号（ハイフン無し）"
                      value={portalCode}
                      className="md_w-100 w_90"
                      onChange={(e) => {
                        setPortalCode(e.target.value);
                      }}
                    />
                  </Box>
                  <Box m={4}>
                    <TextField
                      id="address"
                      label="住所"
                      value={address}
                      className="md_w-100 w_90"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Box>
                  <Box m={6} className="text-center register_btn_wrap">
                    <Grid container justify="space-around" alignItems="center">
                      <Grid item xs={5}>
                        <Button variant="contained" className="register_btn" onClick={goBackPage2}><ArrowBackIcon fontSize="small" /></Button>
                      </Grid>
                      <Grid item xs={7}>
                        <Button variant="contained" className="register_btn" onClick={storeRegisterInfo}>
                          Sign Up
                          <ArrowForwardIcon fontSize="small" />
                        </Button>
                      </Grid>
                      <p className="error">{validationMessage}</p>
                    </Grid>
                  </Box>
                  <Box m={2}>
                    <p className="text-center"><Link to="/login">Sign In</Link></p>
                  </Box>
                </div>
              );
            }
          )()}
        </form>
        <Box m={5}>
          <Grid container justify="space-around">
            <Grid item xs={3}>
              <div className="circle input" />
            </Grid>
            <Grid item xs={3}>
              {isInput2 ? (
                <div className="circle input" />
              ) : (
                <div className="circle" />
              )}
            </Grid>
            <Grid item xs={3}>
              {isInput3 ? (
                <div className="circle input" />
              ) : (
                <div className="circle" />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Register;
