import React, { useState } from 'react';
import firebase from 'firebase';
import Header from './Header';
import { db } from '../firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import '../css/reset.css';
import '../css/common.css';
import '../css/myProgram.css';

const MyProgram = () => {
    const [programName, setProgramName] = useState('');
    const [email, setEmail] = useState('');
    const [portalCode, setPortalCode] = useState('');
    const [address, setAddress] = useState('');
    const storeMyProgram = () =>{
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`myProgram/${user.uid}/list`).add(
                {
                    address: address,
                    name: programName,
                    portalCode: portalCode,
                    email: email
                }
            )
            setProgramName('');
            setEmail('');
            setPortalCode('');
            setAddress('');
            alert('保存しました');
        })
    }
    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <Container maxWidth="sm">
                <div className="myProgram_wrap">
                    <h2 className="title text-center">マイ番組</h2>
                    <form className="myProgram_form">
                        <Box my={4} mx={2}>
                            <TextField
                                id="programName"
                                label="番組名"
                                value={programName}
                                onChange={(e) => {
                                    setProgramName(e.target.value);
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box my={4} mx={2}>
                            <TextField
                                id="email"
                                label="番組メールアドレス"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box my={4} mx={2}>
                            <TextField
                                id="portalCode"
                                label="郵便番号"
                                value={portalCode}
                                onChange={(e) => {
                                    setPortalCode(e.target.value);
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box my={4} mx={2}>
                            <TextField
                                id="address"
                                label="住所"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box m={6} className="text-center myProgram_set_btn_wrap">
                            <Button variant="contained" className="btn myProgram_set_btn" onClick={storeMyProgram}>保存する</Button>
                        </Box>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default MyProgram;