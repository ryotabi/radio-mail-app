import React, { useState } from 'react';
import Header from './Header';
import { db } from '../firebase';
import firebase from 'firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import '../css/reset.css';
import '../css/common.css';
import '../css/template.css';

const Template = () => {
    const [templateName, setTemplateName] = useState('');
    const [template, setTemplate] = useState('');

    const storeTemplate = () => {
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`template/${user.uid}/data`).add(
                {
                    name: templateName,
                    content: template
                }
            ).then(() => {
                setTemplateName('');
                setTemplate('');
                alert('テンプレートを保存しました');
            })
        })
    }
    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <Container maxWidth="sm">
                <div className="template_wrap">
                    <h1 className="title text-center">メール本文テンプレート</h1>
                    <form className="template_form">
                        <Box my={4} mx={2}>
                            <TextField
                                id="templateName"
                                label="テンプレート名"
                                value={templateName}
                                onChange={(e) => {
                                    setTemplateName(e.target.value);
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box my={4} mx={2}>
                            <TextField
                                id="template"
                                label="テンプレート内容"
                                className="textarea md_w-100"
                                multiline
                                rows={4}
                                value={template}
                                onChange={(e) => {
                                    setTemplate(e.target.value);
                                }}
                            />
                        </Box>
                        <Box m={6} className="text-center template_set_btn_wrap">
                            <Button variant="contained" className="btn template_set_btn" onClick={storeTemplate}>保存する</Button>
                        </Box>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default Template;