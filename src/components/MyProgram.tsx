import React, { useState } from 'react';
import firebase from 'firebase';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Header from './Header';
import { db } from '../firebase';
import GetValidationMessage from '../helpers/ValidationMessage';
import '../css/myProgram.css';

type PropsType = {
  history: H.History
}

const MyProgram = (props: PropsType) => {
  const [programName, setProgramName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [portalCode, setPortalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [validationType, setValidationType] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  const storeMyProgram = () => {
    if (programName === '') {
      const validationInfo = GetValidationMessage('program/invalid-myProgram');
      setValidationType(validationInfo.type);
      setValidationMessage(validationInfo.message);
      return;
    }
    const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (email === '' || regexp.test(email) === false) {
      const validationInfo = GetValidationMessage('program/invalid-email');
      setValidationType(validationInfo.type);
      setValidationMessage(validationInfo.message);
      return;
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`myProgram/${user.uid}/list`).add(
          {
            address,
            name: programName,
            portalCode,
            email,
          },
        );
      }
      setProgramName('');
      setEmail('');
      setPortalCode('');
      setAddress('');
      alert('保存しました');
    });
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <Container maxWidth="sm">
        <div className="myProgram_wrap">
          <h2 className="title text-center">マイ番組</h2>
          <form className="myProgram_form">
            <Box my={4} mx={2}>
              <p className="required">必須</p>
              <TextField
                id="programName"
                required
                label="番組名"
                value={programName}
                className="md_w-100 w_90"
                onChange={(e) => {
                  setProgramName(e.target.value);
                }}
              />
              {(() => {
                if (validationType === 'myProgram') {
                  return <p className="error">{validationMessage}</p>;
                }
                return '';
              })()}
            </Box>
            <Box my={4} mx={2}>
              <p className="required">必須</p>
              <TextField
                id="email"
                required
                label="番組メールアドレス"
                value={email}
                className="md_w-100 w_90"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {(() => {
                if (validationType === 'email') {
                  return <p className="error">{validationMessage}</p>;
                }
                return '';
              })()}
            </Box>
            <Box my={4} mx={2}>
              <TextField
                id="portalCode"
                label="郵便番号"
                value={portalCode}
                className="md_w-100 w_90"
                onChange={(e) => {
                  setPortalCode(e.target.value);
                }}
              />
            </Box>
            <Box my={4} mx={2}>
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
            <Box m={6} className="text-center myProgram_set_btn_wrap">
              <Button variant="contained" className="btn myProgram_set_btn" onClick={storeMyProgram}>保存する</Button>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};

export default MyProgram;
