import React, { useState } from 'react';
import Header from './Header';
import GetValidationMessage from '../helpers/ValidationMessage';
import firebase from 'firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

import '../css/email.css';

const Email = (props) => {
    const [oldEmail, setOldEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [nowPage, setNowPage] = useState(1);
    const [isInput2, setIsInput2] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            props.history.push('/login');
        }
    });

    const [validationMessage, setValidationMessage] = useState('');
    const handleNextPage1 = () => {
        setIsInput2(true);
        setNowPage(2);
    }
    const handleBackPage1 = () => {
        setIsInput2(false);
        setNowPage(1);
    }

    const submitChangedEmailAndPassword = () => {
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(oldEmail, oldPassword);
        user.reauthenticateWithCredential(credential).then(() => {
            const regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
            if(newEmail === '' || regexp.test(newEmail) === false) {
                const validationInfo = GetValidationMessage('mail/invalid-email');
                setValidationMessage(validationInfo.message + '(新しいメールアドレス）');
                return;
            }
            if ( newPassword.length < 6 ) {
                const validationInfo = GetValidationMessage('auth/weak-password');
                setValidationMessage(validationInfo.message + '(新しいメールアドレス）');
                return;
            }
            user.updateEmail(newEmail).then(() => {
                user.updatePassword(newPassword).then(() => {
                    props.history.push('/login');
                }).catch((error) => {
                    const validationInfo = GetValidationMessage(error.code);
                    setValidationMessage(validationInfo.message + '(新しいパスワード)');
                });
            }).catch((error) => {
                const validationInfo = GetValidationMessage(error.code);
                setValidationMessage(validationInfo.message + '(新しいメールアドレス）');
            });
        }).catch((error) => {
            const validationInfo = GetValidationMessage(error.code);
            setValidationMessage(validationInfo.message + '(現在のメールアドレス・パスワード)');
        });
    }

    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <div className="email_wrap">
                <Container maxWidth="sm">
                    <h1 className="email_title text-center">メールアドレスとパスワード</h1>
                    <form className="email_form">
                    {(() => {
                        if(nowPage === 1) {
                            return (
                                <div>
                                    <Box m={4}>
                                        <TextField
                                            id="oldEmail"
                                            label="現在のメールアドレス"
                                            className="md_w-100 w_90"
                                            value={oldEmail}
                                            onChange={(e) => {
                                                setOldEmail(e.target.value);
                                            }}
                                        />
                                    </Box>
                                    <Box m={4}>
                                        <TextField
                                            id="oldPassword"
                                            label="現在のパスワード"
                                            className="md_w-100 w_90"
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => {
                                                setOldPassword(e.target.value);
                                            }}
                                        />
                                    </Box>
                                    <Box m={6} className="text-center email_btn_wrap">
                                        <Button variant="contained"className="email_btn" onClick={handleNextPage1}><ArrowForwardIcon /></Button>
                                    </Box>
                                </div>
                            )
                        }else{
                            if(nowPage === 2) {
                                return (
                                    <div>
                                        <Box m={4}>
                                            <TextField
                                                id="newEmail"
                                                label="新しいメールアドレス"
                                                className="md_w-100 w_90"
                                                value={newEmail}
                                                onChange={(e) => {
                                                    setNewEmail(e.target.value);
                                                }}
                                            />
                                        </Box>
                                        <Box m={4}>
                                            <TextField
                                                id="newPassword"
                                                label="新しいパスワード"
                                                className="md_w-100 w_90"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => {
                                                    setNewPassword(e.target.value);
                                                }}
                                            />
                                        </Box>
                                        <Box m={6} className="text-center email_btn_wrap">
                                            <Grid container justify="space-around">
                                                <Grid item xs={3}>
                                                    <Button variant="contained"className="email_btn" onClick={handleBackPage1}><ArrowBackIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box m={4} className="text-center email_btn_wrap">
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" className="email_btn" onClick={submitChangedEmailAndPassword}>変更</Button>
                                                    <p className="error">{validationMessage}</p>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </div>
                                )
                            }}
                        }
                    )()}
                    </form>
                </Container>
            </div>
        </>
    )
}

export default Email;