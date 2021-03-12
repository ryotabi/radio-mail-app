import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Header from './Header';

import '../css/reset.css';
import '../css/common.css';
import '../css/form.css';

const Form = (props) => {
    const [name, setName] = useState('');
    const [portalCode, setPortalCode] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [radioName, setRadioName] = useState('');
    const [age, setAge] = useState('');
    const [mail, setMail] = useState('');
    const [program, setProgram] = useState('');
    const [corner, setCorner] = useState('');
    const [cornerLists, setCornerLists] = useState([{id: '', corner: ''}]);
    const [content, setContent] = useState('');

    const [nowFormInput, setNowFormInput] = useState(1);
    const [isInput2, setIsInput2] = useState(false);
    const [isInput3, setIsInput3] = useState(false);
    const [programList, setProgramList] = useState([{id: '',program: '', name: '',}]);

    const [isUsedMyProgram, setisUsedMyProgram] = useState(false);
    const [myProgramList, setMyProgramList] = useState([{id: '', program: '', name: ''}])

    const [template, setTemplate] = useState('');
    const [isUsedtemplate, setIsUsedTemplate] = useState(false);
    const [templateList, setTemplateList] = useState([{id: '', name: ''}]);

    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            props.history.push('/login');
        }
    })

    useEffect(() => {
        if(props.location.state){
            const { saveMailList } = props.location.state;
            setName(saveMailList.name);
            setPortalCode(saveMailList.portalCode);
            setAddress(saveMailList.address);
            setTel(saveMailList.tel);
            setMail(saveMailList.mail);
            setRadioName(saveMailList.radioName);
            setAge(saveMailList.age);
            setProgram(saveMailList.program);
            setCorner(saveMailList.corner);
            setContent(saveMailList.content);
        }
        const unSub = db.collection(`programList`).onSnapshot((snapshot) => {
            setProgramList(
                snapshot.docs.map((doc) => {
                    return {id:doc.id, program: doc.data().program, name: doc.data().name}
                })
            )
        })
        return () => unSub();
    },[]);
    useEffect(() => {
        const unSub = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                if(program !== '') {
                    db.collection(`programs/${program}/corner`).onSnapshot((snapshot) => {
                        setCornerLists(
                            snapshot.docs.map((doc) => {
                                return {id: doc.id, corner: doc.data().corner}
                            })
                        )
                    })
                }
            } else {
                props.history.push('/login');
            }
        })
        return unSub();
    },[program])

    const goToForm2 = () => {
        setIsInput2(true);
        setNowFormInput(2);
    }
    const goToForm3 = () => {
        setIsInput3(true);
        setNowFormInput(3);
    }
    const goBackForm1 = () => {
        setIsInput2(false);
        setNowFormInput(1);
    }
    const goBackForm2 = () => {
        setIsInput3(false);
        setNowFormInput(2);
    }

    const setUserInfo = () => {
        const unSub = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                db.collection(`users/${user.uid}/info`).onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        setName(doc.data().name);
                        setPortalCode(doc.data().portalCode);
                        setAddress(doc.data().address);
                        setTel(doc.data().tel);
                    })
                })
            }else{
                props.history.push('/login');
            } 
            unSub();
        })
    }

    const setRadioInfo = () => {
        const unSub = firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                db.collection(`users/${user.uid}/info`).onSnapshot((snapshot) => {
                    snapshot.docs.map((doc) => {
                        setRadioName(doc.data().radioName);
                        setAge(doc.data().age);
                        setMail(doc.data().email);
                    })
                })
            }else{
                props.history.push('/login');
            } 
            unSub();
        })
    }

    const setMyProgram = () => {
        setisUsedMyProgram(true);
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`myProgram/${user.uid}/list`).onSnapshot((snapshot) => {
                setMyProgramList(
                    snapshot.docs.map((doc) => {
                        return {id: doc.id, program: doc.data().name, name: doc.data().name}
                    })
                )
            })
        })
    }

    const submitMailInfo = () => {
        props.history.push(
            {
                pathname: '/mail',
                state: {
                    name,
                    portalCode,
                    address,
                    tel,
                    radioName,
                    age,
                    mail,
                    program,
                    corner,
                    content,
                    isUsedMyProgram
                }
            }
        );
    }

    const saveMail = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                db.collection(`mail/${user.uid}/saveMail`).add(({
                    name,
                    portalCode,
                    address,
                    tel,
                    mail,
                    radioName,
                    age,
                    program,
                    corner,
                    content,
                }));
                props.history.push('/');
            }
        })
    }

    const useContentTemplate = () => {
        setIsUsedTemplate(true);
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`template/${user.uid}/data`).onSnapshot((snapshot) => {
                setTemplateList(
                    snapshot.docs.map((doc) => {
                        return {id: doc.id, name: doc.data().name}
                    })
                )
            })
        })
    }

    const getTemplateContent = (templateName) => {
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`template/${user.uid}/data`).where('name', '==', templateName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setContent(doc.data().content);
                })
            })
        })
    }

    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <Container maxWidth="sm">
                <form className="form_wrap m-0 pt-100">
                    {(() => {
                        if(nowFormInput === 1) {
                            return (
                            <div className="user_info">
                                <Box m={2}>
                                    <p className="form_title text-center">ユーザー個人情報</p>
                                </Box>
                                <Box my={4} mx={2}>
                                    <TextField
                                        id="name"
                                        label="氏名"
                                        className="md_w-100 w_90"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        />
                                </Box>
                                <Box my={4} mx={2}>
                                    <TextField
                                        id="portalCode"
                                        label="郵便番号"
                                        className="md_w-100 w_90"
                                        value={portalCode}
                                        onChange={(e) => {
                                            setPortalCode(e.target.value);
                                        }}
                                        />
                                </Box>
                                <Box my={4} mx={2}>
                                    <TextField
                                        id="address"
                                        label="住所"
                                        className="md_w-100 w_90"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        />
                                </Box>
                                <Box my={4} mx={2}>
                                    <TextField
                                        id="tel"
                                        label="電話番号"
                                        className="md_w-100 w_90"
                                        value={tel}
                                        onChange={(e) => {
                                            setTel(e.target.value);
                                        }}
                                        />
                                </Box>
                                <Box m={6} className="text-center form_btn_wrap">
                                    <Button variant="contained"className="btn set_info_btn" onClick={setUserInfo}>ユーザー情報をセットする</Button>
                                </Box>
                                <Box m={2} className="text-center form_btn_wrap">
                                    <Button variant="contained"className="btn next_btn" onClick={goToForm2}><ArrowForwardIcon /></Button>
                                </Box>
                            </div>
                        )
                        } else {
                            if(nowFormInput ===2 ) {
                                return (
                                <div className="radio_info">
                                    <Box m={2}>
                                        <p className="form_title text-center">投稿情報</p>
                                    </Box>
                                    <Box my={4} mx={2}>
                                        <TextField
                                            id="mail"
                                            label="メールアドレス"
                                            className="md_w-100 w_90"
                                            value={mail}
                                            onChange={(e) => {
                                                setMail(e.target.value);
                                            }}
                                            />
                                    </Box>
                                    <Box my={4} mx={2}>
                                        <TextField
                                            id="radioName"
                                            label="ラジオネーム"
                                            className="md_w-100 w_90"
                                            value={radioName}
                                            onChange={(e) => {
                                                setRadioName(e.target.value);
                                            }}
                                            />
                                    </Box>
                                    <Box my={4} mx={2}>
                                        <TextField
                                            id="age"
                                            label="年齢"
                                            className="md_w-100 w_90"
                                            value={age}
                                            onChange={(e) => {
                                                setAge(e.target.value);
                                            }}
                                            />
                                    </Box>
                                    {(() => {
                                        if(isUsedMyProgram) {
                                            return (
                                                <Box my={4} mx={2}>
                                                    <InputLabel id="program">マイ番組</InputLabel>
                                                    <Select
                                                        labelId="program"
                                                        id="program"
                                                        className="selectbox md_w-100 w_90"
                                                        value={program}
                                                        onChange={(e) => {
                                                            setProgram(e.target.value);
                                                        }}
                                                    >
                                                        {myProgramList.map((program) => {
                                                            return (
                                                                    <MenuItem key={program.id} value={program.name}>{program.name}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box my={4} mx={2}>
                                                    <InputLabel id="program">番組</InputLabel>
                                                    <Select
                                                        labelId="program"
                                                        id="program"
                                                        className="selectbox md_w-100 w_90"
                                                        value={program}
                                                        onChange={(e) => {
                                                            setProgram(e.target.value);
                                                        }}
                                                    >
                                                        {programList.map((program) => {
                                                            return (
                                                                    <MenuItem key={program.id} value={program.program}>{program.name}</MenuItem>
                                                            )
                                                        })}
                                                    </Select>
                                                </Box>
                                            )
                                        }
                                    })()}
                                    <Box m={6} className="text-center form_btn_wrap">
                                        <Button variant="contained"className="btn set_info_btn" onClick={setRadioInfo}>ユーザー情報をセットする</Button>
                                    </Box>
                                    <Box m={6} className="text-center form_btn_wrap">
                                        <Button variant="contained"className="btn set_info_btn" onClick={setMyProgram}>マイ番組をセットする</Button>
                                    </Box>
                                    <Box m={2} className="text-center form_btn_wrap">
                                        <Grid container justify="space-around">
                                            <Grid item xs={3}>
                                                <Button variant="contained"className="btn" onClick={goBackForm1}><ArrowBackIcon /></Button>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Button variant="contained"className="btn" onClick={goToForm3}><ArrowForwardIcon /></Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </div>
                                )
                            } else {
                                return (
                                <div className="radio_info">
                                    <Box m={2}>
                                        <p className="form_title text-center">投稿内容</p>
                                    </Box>
                                    {(() => {
                                        if(isUsedMyProgram) {
                                            return (
                                                <Box my={4} mx={2}>
                                                    <TextField
                                                    id="corner"
                                                    label="コーナー（件名）"
                                                    className="md_w-100 w_90"
                                                    value={corner}
                                                    onChange={(e) => {
                                                        setCorner(e.target.value);
                                                    }}
                                                    />
                                                </Box>
                                            )
                                        } else {
                                            return (
                                                <Box my={4} mx={2}>
                                                    <InputLabel id="corner">コーナー</InputLabel>
                                                    <Select
                                                        labelId="corner"
                                                        id="corner"
                                                        className="selectbox md_w-100 w_90"
                                                        value={corner}
                                                        onChange={(e) => {
                                                            setCorner(e.target.value);
                                                        }}
                                                    >
                                                    {cornerLists.map((corner) => 
                                                        <MenuItem key={corner.id} value={corner.corner}>{corner.corner}</MenuItem>
                                                    )}
                                                    </Select>
                                                </Box>
                                            )
                                        }
                                    })()}
                                    {(() => {
                                        if(isUsedtemplate) {
                                            return (
                                                <Box my={4} mx={2}>
                                                    <InputLabel id="template">テンプレート</InputLabel>
                                                    <Select
                                                        labelId="template"
                                                        id="template"
                                                        className="selectbox md_w-100 w_90"
                                                        value={template}
                                                        onChange={(e) => {
                                                            setTemplate(e.target.value);
                                                            getTemplateContent(e.target.value);
                                                        }}
                                                    >
                                                    {templateList.map((template) => 
                                                        <MenuItem key={template.id} value={template.name}>{template.name}</MenuItem>
                                                    )}
                                                    </Select>
                                                </Box>
                                            )
                                        }
                                    })()}
                                    <Box my={4} mx={2}>
                                    <TextField
                                        id="content"
                                        label="投稿内容"
                                        className="textarea md_w-100 w_90"
                                        multiline
                                        rows={4}
                                        value={content}
                                        onChange={(e) => {
                                            setContent(e.target.value);
                                        }}
                                    />
                                    </Box>
                                    <Box m={6} className="text-center form_btn_wrap">
                                        <Button variant="contained"className="btn set_info_btn" onClick={submitMailInfo}>情報を送信</Button>
                                    </Box>
                                    <Box m={2} className="text-center form_btn_wrap">
                                        <Grid container justify="space-between">
                                            <Grid item>
                                                <Button variant="contained"className="btn save_info_btn" onClick={saveMail}>途中保存</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained"className="btn template_info_btn" onClick={useContentTemplate}>テンプレを使用</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box m={2} className="text-center form_btn_wrap">
                                        <Button variant="contained"className="btn" onClick={goBackForm2}><ArrowBackIcon /></Button>
                                    </Box>
                                </div>
                                )
                            }
                        }
                    })()}
                </form>
                <Box m={5}>
                        <Grid container justify="space-around">
                            <Grid item xs={3}>
                                <div className="circle input"></div>
                            </Grid>
                            <Grid item xs={3}>
                                {isInput2 ? (
                                    <div className="circle input"></div>
                                ) : (
                                    <div className="circle"></div>
                                )}
                            </Grid>
                            <Grid item xs={3}>
                                {isInput3 ? (
                                    <div className="circle input"></div>
                                ) : (
                                    <div className="circle"></div>
                                )}
                            </Grid>
                        </Grid>
                    </Box>
            </Container>
        </>
    )
}

export default Form;