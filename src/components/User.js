import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../firebase';
import Header from './Header';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

import '../css/reset.css';
import '../css/common.css';
import '../css/user.css';

const User = (props) => {
    const [id, setId] = useState('');
    const [radioName, setRadioName] = useState('');
    const [name, setName] = useState('');
    const [hurigana, setHurigana] = useState('');
    const [age, setAge] = useState('');
    const [tel, setTel] = useState('');
    const [portalCode, setPortalCode] = useState('');
    const [address, setAddress] = useState('');
    const [nowPage, setNowPage] = useState(1);
    const [isInput2, setIsInput2] = useState(false);
    const [isInput3, setIsInput3] = useState(false);
    const handleNextPage1 = () => {
        setIsInput2(true);
        setNowPage(2);
    }
    const handleNextPage2 = () => {
        setIsInput3(true);
        setNowPage(3);
    }
    const handleBackPage1 = () => {
        setIsInput2(false);
        setNowPage(1);
    }
    const handleBackPage2 = () => {
        setIsInput3(false);
        setIsInput2(true)
        setNowPage(2);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                db.collection(`users/${user.uid}/info`).onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        setId(doc.id);
                        setRadioName(doc.data().radioName);
                        setName(doc.data().name);
                        setHurigana(doc.data().hurigana);
                        setAge(doc.data().age);
                        setTel(doc.data().tel);
                        setPortalCode(doc.data().portalCode);
                        setAddress(doc.data().address);
                    })
                })
            } else {
                props.history.push('/login');
            }
        })
    },[])

    const submitChangedUserInfo = async() => {
        const user = firebase.auth().currentUser;
        await db.collection(`users/${user.uid}/info`).doc(id).update({
            address,
            age,
            hurigana,
            name,
            portalCode,
            radioName,
            tel
        })
        props.history.push('/');
        }

    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <div className="user_info_wrap">
                <Container maxWidth="sm">
                    <h1 className="user_info_title text-center">ユーザー情報</h1>
                    <form className="user_info_form">
                        {(
                            () => {
                                if(nowPage === 1) {
                                    return (
                                        <div>
                                            <Box m={4}>
                                                <TextField
                                                    id="radioName"
                                                    label="ラジオネーム"
                                                    className="md_w-100"
                                                    value={radioName}
                                                    onChange={(e) => {
                                                        setRadioName(e.target.value);
                                                    }}
                                                    />
                                            </Box>
                                            <Box m={4}>
                                                    <TextField
                                                        id="age"
                                                        label="年齢"
                                                        className="md_w-100"
                                                        value={age}
                                                        onChange={(e) => {
                                                            setAge(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                            <Box m={6} className="text-center user_info_btn_wrap">
                                                <Button variant="contained"className="user_info_btn" onClick={handleNextPage1}><ArrowForwardIcon /></Button>
                                            </Box>
                                        </div>
                                    )
                                }else{
                                    if(nowPage === 2) {
                                        return (
                                            <div>
                                                <Box m={4}>
                                                    <TextField
                                                        id="name"
                                                        label="本名"
                                                        className="md_w-100"
                                                        value={name}
                                                        onChange={(e) => {
                                                            setName(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                                <Box m={4}>
                                                    <TextField
                                                        id="hurigana"
                                                        label="ふりがな"
                                                        className="md_w-100"
                                                        value={hurigana}
                                                        onChange={(e) => {
                                                            setHurigana(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                                <Box m={6} className="text-center user_info_btn_wrap">
                                                    <Grid container justify="space-around">
                                                        <Grid item xs={3}>
                                                            <Button variant="contained"className="user_info_btn" onClick={handleBackPage1}><ArrowBackIcon /></Button>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Button variant="contained"className="user_info_btn" onClick={handleNextPage2}><ArrowForwardIcon /></Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div>
                                                <Box m={4}>
                                                    <TextField
                                                        id="tel"
                                                        label="電話番号"
                                                        className="md_w-100"
                                                        type="tel"
                                                        value={tel}
                                                        onChange={(e) => {
                                                            setTel(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                                <Box m={4}>
                                                    <TextField
                                                        id="portalCode"
                                                        label="郵便番号（ハイフン無し）"
                                                        className="md_w-100"
                                                        value={portalCode}
                                                        onChange={(e) => {
                                                            setPortalCode(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                                <Box m={4}>
                                                    <TextField
                                                        id="address"
                                                        label="住所"
                                                        className="md_w-100"
                                                        value={address}
                                                        onChange={(e) => {
                                                            setAddress(e.target.value);
                                                        }}
                                                        />
                                                </Box>
                                                <Box m={6} className="text-center user_info_btn_wrap">
                                                    <Grid container alignItems="center">
                                                        <Grid item xs={12}>
                                                            <Button variant="contained"className="user_info_btn" onClick={handleBackPage2}><ArrowBackIcon fontSize="small"/></Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box m={4} className="text-center user_info_btn_wrap">
                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            <Button variant="contained" className="user_info_btn" onClick={submitChangedUserInfo}>変更</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </div>
                                        )
                                    }
                                }
                            }
                        )()}
                    </form>
                </Container>
            </div>
        </>
    )
}

export default User;