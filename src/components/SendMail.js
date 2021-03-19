import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import { db } from '../firebase';
import '../css/mail.css';

const SendMail = (props) => {
    const [program, setProgram] = useState('');
    const [toPortalCode, setToPortalCode] = useState('');
    const [fromPortalCode, setFromPortalCode] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [toName, setToName] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [fromName, setFromName] = useState('');
    const [radioName, setRadioName] = useState('');
    const [age, setAge] = useState('');
    const [mail, setMail] = useState('');
    const [tel, setTel] = useState('');
    const [corner, setCorner] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const { currentUser } = firebase.auth();
    const splicFromPortalCode = [...fromPortalCode];
    const splicToPortalCode = [...toPortalCode];
    const [isBack, setIsBack] = useState(true);
    const [stateSubmitButton, setStateSubmitButton] = useState(true);

    // ログイン状態確認
    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            props.history.push('/login');
        }
    });

    useEffect(() => {
        if(location.state !== undefined) {
            if(location.state.isUsedMyProgram){
                firebase.auth().onAuthStateChanged((user) => {
                db.collection(`myProgram/${user.uid}/list`).where('name', '==', location.state.program).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setToName(doc.data().name);
                        setToAddress(doc.data().address);
                        setToPortalCode(doc.data().portalCode);
                        })
                    });
                });
            } else {
                db.collection(`programs/${location.state.program}/info`).onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        setToName(doc.data().name);
                        setToAddress(doc.data().address);
                        setToPortalCode(doc.data().portalCode);
                    });
                });
            }
            setProgram(location.state.program);
            setFromAddress(location.state.address);
            setFromName(location.state.name);
            setFromPortalCode(location.state.portalCode);
            setRadioName(location.state.radioName);
            setAge(location.state.age);
            setMail(location.state.mail);
            setTel(location.state.tel);
            setCorner(location.state.corner);
            setContent(location.state.content);
        }
    },[]);

    useEffect(() => {
        if(toName === "" || toAddress === "" || mail === ""){
            setStateSubmitButton(true);
        }else{
            setStateSubmitButton(false);
            }
    },[toAddress, toName, mail]);

    const returnPage = () => {
        const FrontPage = document.getElementById('FrontPage');
        const BackPage = document.getElementById('BackPage');
        if(isBack) {
            FrontPage.classList.remove('hidden');
            BackPage.classList.add('hidden');
            setIsBack(false);
        } else {
            FrontPage.classList.add('hidden');
            BackPage.classList.remove('hidden');
            setIsBack(true);
        }
    }

    const handleSubmit = async () => {
        const data = {
            "fromName": fromName,
            "fromAddress": fromAddress,
            "radioName": radioName,
            "age": age,
            "tel": tel,
            "mail": mail,
            "corner": corner,
            "content": content
        }
        await (await axios.post(`https://radiomailer.site`,data)
        .then((res) => {
            if(res.data.error){
                alert(' 送信に失敗しました');
            }else{
                alert('送信しました');
            }            
            db.collection(`mail/${currentUser.uid}/${program}`).add({
                program: toName,
                radioName,
                corner,
                content,
                date: new Date()
            });
            db.collection(`mail/${currentUser.uid}/programList`).add({
                program,
            });
            props.history.push('/');
        }));
    }

    return (
        <> 
            <Header />
            <div className="bg_color"></div>
            <div className="sendMail_wrap">
                <Container maxWidth="lg">
                    <Box className="text-center md_sendMail-btn-wrap" m={2}>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Button variant="contained"className="return_btn" onClick={returnPage}>
                                    裏返す
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained"className="send_btn" disabled={stateSubmitButton} onClick={handleSubmit}>
                                    送る
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained"className="return_btn">
                                    <Link to="/form">
                                        入力する
                                    </Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <div id="BackPage" className="postcard_wrap back_page">
                        <div className="to_postal_code_wrap">
                            <div className="to_postal_code to_postal_code1"><p>{splicToPortalCode[0]}</p></div>
                            <div className="to_postal_code to_postal_code2"><p>{splicToPortalCode[1]}</p></div>
                            <div className="to_postal_code to_postal_code3"><p>{splicToPortalCode[2]}</p></div>
                            <div className="to_postal_code_border"></div>
                            <div className="to_postal_code to_postal_code4"><p>{splicToPortalCode[3]}</p></div>
                            <div className="to_postal_code to_postal_code5"><p>{splicToPortalCode[4]}</p></div>
                            <div className="to_postal_code to_postal_code6"><p>{splicToPortalCode[5]}</p></div>
                            <div className="to_postal_code to_postal_code7"><p>{splicToPortalCode[6]}</p></div>
                        </div>
                        <div className="from_postal_code_wrap">
                            <div className="from_postal_code from_postal_code1"><p>{splicFromPortalCode[0]}</p></div>
                            <div className="from_postal_code from_postal_code1"><p>{splicFromPortalCode[1]}</p></div>
                            <div className="from_postal_code from_postal_code2"><p>{splicFromPortalCode[2]}</p></div>
                            <div className="from_postal_code_border"></div>
                            <div className="from_postal_code from_postal_code3"><p>{splicFromPortalCode[3]}</p></div>
                            <div className="from_postal_code from_postal_code5"><p>{splicFromPortalCode[4]}</p></div>
                            <div className="from_postal_code from_postal_code5"><p>{splicFromPortalCode[5]}</p></div>
                            <div className="from_postal_code from_postal_code6"><p>{splicFromPortalCode[6]}</p></div>
                        </div>
                        <div className="to_address">
                            <p>{toAddress}</p>
                        </div>
                        <div className="to_name">
                            <p>{toName}様</p>
                        </div>
                        <div className="from_address">
                            <p>{fromAddress}</p>
                        </div>
                        <div className="from_name">
                            <p>{fromName}</p>
                        </div>
                    </div>
                    <div id="FrontPage" className="postcard_wrap front_page hidden">
                        <div className="radioName">
                            <p>ラジオネーム：{radioName}</p>
                        </div>
                        <div className="cornar">
                            <p>コーナー：{corner}</p>
                        </div>
                        <div className="content">
                            <p>内容：<br/>{content}</p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default SendMail