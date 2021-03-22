import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import SettingsIcon from '@material-ui/icons/Settings';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import '../css/setting.css';

const Setting = (props) => {
  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  const logout = () => {
    firebase.auth().onAuthStateChanged(() => {
      firebase.auth().signOut().then(() => {
        props.history.push('/login');
      });
    });
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <div className="setting_wrap">
        <h2 className="setting_title">
          <SettingsIcon />
          設定一覧
        </h2>
        <Box my={6} mx={4}>
          <Grid container>
            <Link to="/user" className="setting_user_btn_wrap">
              <Grid item className="setting_user_btn">
                <p className="setting_btn_text text-center">ユーザー情報を変更</p>
              </Grid>
            </Link>
          </Grid>
        </Box>
        <Box my={6} mx={4}>
          <Grid container>
            <Link to="/email" className="setting_user_btn_wrap">
              <Grid item className="setting_user_btn">
                <p className="setting_btn_text text-center">
                  メールアドレスと
                  <br />
                  パスワードを変更
                </p>
              </Grid>
            </Link>
          </Grid>
        </Box>
        <Box my={6} mx={4}>
          <Grid container justify="space-between">
            <Link to="/template" xs={6} className="template_btn_wrap">
              <Grid item className="template_btn">
                <p className="text-center">テンプレ</p>
              </Grid>
            </Link>
            <Link to="/myprogram" xs={6} className="myprogram_btn_wrap">
              <Grid item className="myprogram_btn">
                <p className="text-center">マイ番組</p>
              </Grid>
            </Link>
          </Grid>
        </Box>
        <Box my={6} mx={4}>
          {/* ログアウト後にリロードしないとログイン出来ない */}
          <Grid container>
            <div className="setting_logout_btn_wrap" onClick={logout}>
              <Grid item className="setting_logout_btn">
                <p className="setting_btn_text text-center">ログアウト</p>
              </Grid>
            </div>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Setting;
