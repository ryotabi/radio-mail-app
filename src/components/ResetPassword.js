import React, { useState } from 'react';
import Header from './Header';
import firebase from 'firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import '../css/resetPassword.css';

const ResetPassword = (props) => {
    const [email, setEmail] = useState('');
    const sendEmail = () => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            alert('メールを送信しました。ご確認ください。');
            props.history.push('/login');
        }).catch(() => {
            alert('メールが送信できませんでした。')
        });
    }

    return (
        <>
            <Header />
            <div className="bg_img"></div>
            <Container maxWidth="sm">
                <h1 className="password_title">パスワードを忘れた方</h1>
                <p className="password_text">再設定用メールをお送りするので、メールアドレスをご入力下さい。</p>
                <form className="password_form">
                    <Box m={4}>
                        <TextField 
                            id="email"
                            type={email}
                            label="メールアドレス"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Box>
                    <Box m={4}>
                        <Button variant="contained"className="password_btn" onClick={sendEmail}>送信</Button>
                    </Box>
                </form>
            </Container>
        </>
    )
}

export default ResetPassword;