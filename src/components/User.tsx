import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import { db } from '../firebase';
import Header from './Header';
import '../css/user.css';

type PropsType = {
  history: H.History
}

const User = (props: PropsType) => {
  const [id, setId] = useState<string>('');
  const [radioName, setRadioName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [hurigana, setHurigana] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [tel, setTel] = useState<string>('');
  const [portalCode, setPortalCode] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);

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

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
            return '';
          });
        });
      } else {
        props.history.push('/login');
      }
    });
  }, []);

  const changeUserInfo = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      db.collection(`users/${user.uid}/info`).doc(id).update({
        address,
        age,
        hurigana,
        name,
        portalCode,
        radioName,
        tel,
      }).then(() => {
        alert('ユーザー情報を変更しました');
        props.history.push('/');
      }).catch(() => {
        alert('テンプレートの保存に失敗しました。もう一度お試しください');
      });
    };
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <div className="user_info_wrap">
        <Container maxWidth="sm">
          <h1 className="title text-center">ユーザー情報</h1>
          <form className="user_info_form">
            {(
              () => {
                if (nowPage === 1) {
                  return (
                    <div>
                      <Box m={4}>
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
                      <Box m={4}>
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
                      <Box m={6} className="text-center user_info_btn_wrap">
                        <Button variant="contained" className="user_info_btn" onClick={goToNextPage2}><ArrowForwardIcon /></Button>
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
                          className="md_w-100 w_90"
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
                          className="md_w-100 w_90"
                          value={hurigana}
                          onChange={(e) => {
                            setHurigana(e.target.value);
                          }}
                        />
                      </Box>
                      <Box m={6} className="text-center user_info_btn_wrap">
                        <Grid container justify="space-around">
                          <Grid item xs={3}>
                            <Button variant="contained" className="user_info_btn" onClick={goBackPage1}><ArrowBackIcon /></Button>
                          </Grid>
                          <Grid item xs={3}>
                            <Button variant="contained" className="user_info_btn" onClick={goToNextPage3}><ArrowForwardIcon /></Button>
                          </Grid>
                        </Grid>
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
                        className="md_w-100 w_90"
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
                        className="md_w-100 w_90"
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
                        className="md_w-100 w_90"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </Box>
                    <Box m={6} className="text-center user_info_btn_wrap">
                      <Grid container alignItems="center">
                        <Grid item xs={12}>
                          <Button variant="contained" className="user_info_btn" onClick={goBackPage2}><ArrowBackIcon fontSize="small" /></Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box m={4} className="text-center user_info_btn_wrap">
                      <Grid container>
                        <Grid item xs={12}>
                          <Button variant="contained" className="user_info_btn" onClick={changeUserInfo}>変更</Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                );
              }
            )()}
          </form>
        </Container>
      </div>
    </>
  );
};

export default User;
