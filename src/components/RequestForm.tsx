import React, { useState } from 'react';
import axios from 'axios';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Header from './Header';
import GetValidationMessage from '../helpers/ValidationMessage';
import '../css/requestForm.css';

type PropsType = {
    history: H.History
}  

const RequestForm = (props: PropsType) => {
    const [specification, setSpecification] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [validationType, setValidationType] = useState<string>('');
    const [validationMessage, setValidationMessage] = useState<string>('');

    const sendMail = async() => {
        if (specification === '') {
            const validationInfo = GetValidationMessage('requestForm/invalid-specification');
            setValidationType(validationInfo.type);
            setValidationMessage(validationInfo.message);
            return;
        }
        if (content === '') {
            const validationInfo = GetValidationMessage('requestForm/invalid-content');
            setValidationType(validationInfo.type);
            setValidationMessage(validationInfo.message);
            return;
        }
        const data = {
            specification,
            age,
            content,
            password: process.env.REACT_APP_RADIOMAILAPI_PASSWORD,
        };
        await axios.post('https://radiomailerdev.site/contact/', data)
        .then((res) => {
            if (res.data.error) {
                alert('送信に失敗しました');
            } else {
                alert('送信しました');
                props.history.push('/');
            }
        })
        .catch(() => {
            alert('送信に失敗しました');
        })
    }

    return (
        <>
            <Header />
            <div className="bg_color" />
            <Container maxWidth="sm">
                <div className="requestForm_wrap">
                    <h1 className="title text-center">お問い合わせ・要望フォーム</h1>
                    <p className="requestForm_subtitle text-center">ラジオメーラーに関するお問い合わせ・<br />要望は、以下フォームよりご連絡ください</p>
                    <form className="requestForm_form">
                    <Box my={4} mx={2}>
                    <p className="required">必須</p>
                    <InputLabel id="specification">機能</InputLabel>
                    <Select
                        labelId="specification"
                        id="specification"
                        required
                        className="selectbox md_w-100 w_90"
                        value={specification}
                        onChange={(e: React.ChangeEvent<{ value: unknown}>) => {
                            setSpecification(e.target.value as string);
                        }}
                    >
                        <MenuItem value="メールフォーム">メールフォーム</MenuItem>
                        <MenuItem value="メール送信">メール送信</MenuItem>
                        <MenuItem value="未送信のメール一覧">未送信のメール一覧</MenuItem>
                        <MenuItem value="送信済のメール一覧">送信済のメール一覧</MenuItem>
                        <MenuItem value="番組表">番組表</MenuItem>
                        <MenuItem value="ユーザー情報変更">ユーザー情報変更</MenuItem>
                        <MenuItem value="パスワード変更">パスワード変更</MenuItem>
                        <MenuItem value="テンプレートフォーム">テンプレートフォーム</MenuItem>
                        <MenuItem value="マイ番組フォーム">マイ番組フォーム</MenuItem>
                        <MenuItem value="ログアウト">ログアウト</MenuItem>
                        <MenuItem value="ログイン">ログイン</MenuItem>
                        <MenuItem value="新規登録">新規登録</MenuItem>
                        <MenuItem value="その他">その他</MenuItem>
                    </Select>
                        {(() => {
                            if (validationType === 'specification') {
                            return <p className="error">{validationMessage}</p>;
                            }
                            return '';
                        })()}
                    </Box>
                    <Box my={4} mx={2}>
                        <TextField
                            id="age"
                            label="年齢"
                            className="textarea md_w-100 w_90"
                            rows={4}
                            value={age}
                            onChange={(e) => {
                            setAge(e.target.value);
                            }}
                        />
                    </Box>
                    <Box my={4} mx={2}>
                        <p className="required">必須</p>
                        <TextField
                            id="content"
                            label="お問い合わせ・要望"
                            className="textarea md_w-100 w_90"
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => {
                            setContent(e.target.value);
                            }}
                        />
                        {(() => {
                            if (validationType === 'content') {
                            return <p className="error">{validationMessage}</p>;
                            }
                            return '';
                        })()}
                    </Box>
                    <Box m={6} className="text-center requestForm_btn_wrap">
                        <Button variant="contained" className="btn requestForm_btn" onClick={sendMail}>保存する</Button>
                    </Box>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default RequestForm;