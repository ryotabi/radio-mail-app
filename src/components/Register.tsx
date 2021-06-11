import React, { useState } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import GoogleButton from 'react-google-button';
import { auth, db } from '../firebase';
import Header from './Header';
import GetValidationMessage from '../helpers/ValidationMessage';
import '../css/register.css';

type PropsType = {
  history: H.History
}

const Register = (props: PropsType) => {
  const [radioName, setRadioName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [addressForRadio, setAddressForRadio] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [portalCode, setPortalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const provider = new firebase.auth.GoogleAuthProvider();

  const goToNextPage2 = () => {
    setNowPage(2);
  };
  const goToNextPage3 = () => {
    setNowPage(3);
  };
  const goBackPage1 = () => {
    setNowPage(1);
  };
  const goBackPage2 = () => {
    setNowPage(2);
  };

  const storeRegisterInfo = () => {
    try {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              db.collection(`users/${user.uid}/info`).add({
                radioName,
                email,
                addressForRadio,
                name,
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

  const registerWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        db.collection(`users/${user.uid}/info`).add({
          radioName,
          email: user.email,
          addressForRadio,
          name,
          age,
          tel,
          portalCode,
          address,
        });
        props.history.push('/');
      }
    }).catch(() => {
      alert('ログインに失敗しました');
    })
  }

  return (
    <>
      <Header />
      <div className="bg_img" />
      <Container maxWidth="lg">
        <h1 className="register_title">Sign Up</h1>
        <form className="register_form mb-30">
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
                    <Box m={4} className="register_btn_google_wrap">
                      <GoogleButton
                        className="register_btn_google"
                        type="light"
                        label="Googleでログインする"
                        onClick={registerWithGoogle}
                      />
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
                      id="addressForRadio"
                      label="住所（読まれる用）"
                      value={addressForRadio}
                      className="md_w-100 w_90"
                      onChange={(e) => {
                        setAddressForRadio(e.target.value);
                      }}
                    />
                  </Box>
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
                    <Box m={4} className="register_btn_google_wrap">
                      <GoogleButton
                        className="register_btn_google"
                        type="light"
                        label="Googleでログインする"
                        onClick={registerWithGoogle}
                      />
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
                      label="住所（本住所）"
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
                  <Box m={4} className="register_btn_google_wrap">
                      <GoogleButton
                        className="register_btn_google"
                        type="light"
                        label="Googleでログインする"
                        onClick={registerWithGoogle}
                      />
                    </Box>
                  <Box m={2}>
                    <p className="text-center"><Link to="/login">Sign In</Link></p>
                  </Box>
                </div>
              );
            }
          )()}
        </form>
      </Container>
    </>
  );
};

export default Register;
