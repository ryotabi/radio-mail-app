import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

import '../css/top.css';

const Top = (props) => {

    // ログイン状態確認
    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            props.history.push('/login');
        }
    });
    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <div className="top_wrap">
                <Container maxWidth="lg">
                    <Box p={4}>
                        <Grid container>
                            <Link to="/mail" className="top_btn_wrap">
                                <Grid item className="top_btn">
                                    <p className="top_btn_text text-center">投稿する</p>
                                </Grid>
                            </Link>
                        </Grid>
                    </Box>
                    <Box p={4}>
                        <Grid container>
                            <Link to="/save" className="top_btn_wrap">
                                <Grid item className="top_btn">
                                    <p className="top_btn_text text-center">未送信のメール</p>
                                </Grid>
                            </Link>
                        </Grid>
                    </Box>
                    <Box p={4}>
                        <Grid container>
                            <Link to="/list" className="top_btn_wrap">
                                <Grid item className="top_btn">
                                    <p className="top_btn_text text-center">過去の投稿</p>
                                </Grid>
                            </Link>
                        </Grid>
                    </Box>
                    <Box p={4}>
                        <Grid container justify="space-between">
                            <Link to="/program" xs={6} className="program_btn_wrap">
                                <Grid item className="program_btn">
                                    <p className="text-center">番組表</p>
                                </Grid>
                            </Link>
                            <Link to="/setting" className="setting_btn_wrap">
                                <Grid item className="setting_btn">
                                    <p className="text-center">設定</p>
                                </Grid>
                            </Link>
                        </Grid>
                    </Box>
                </Container>
            </div>
        </>
    )
}

export default Top;