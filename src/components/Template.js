import React, { useState } from 'react';
import Header from './Header';
import { db } from '../firebase';
import GetValidationMessage from '../helpers/ValidationMessage';
import firebase from 'firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import '../css/template.css';

const Template = (props) => {
    const [templateName, setTemplateName] = useState('');
    const [template, setTemplate] = useState('');
    const [validationType, setValidationType] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    firebase.auth().onAuthStateChanged((user) => {
        if(!user) {
            props.history.push('/login');
        }
    });

    const storeTemplate = () => {
        if(templateName === '') {
            const validationInfo = GetValidationMessage('template/invalid-templateName');
            setValidationType(validationInfo.type);
            setValidationMessage(validationInfo.message);
            return;
        }
        if(template === '') {
            const validationInfo = GetValidationMessage('template/invalid-template');
            setValidationType(validationInfo.type);
            setValidationMessage(validationInfo.message);
            return;
        }
        firebase.auth().onAuthStateChanged((user) => {
            db.collection(`template/${user.uid}/data`).add(
                {
                    name: templateName,
                    content: template
                }
            ).then(() => {
                setTemplateName('');
                setTemplate('');
                setValidationType('');
                setValidationMessage('');
                alert('テンプレートを保存しました');
            })
        })
    }
    console.log(validationType);
    return (
        <>
            <Header />
            <div className="bg_color"></div>
            <Container maxWidth="sm">
                <div className="template_wrap">
                    <h1 className="title text-center">メール本文テンプレート</h1>
                    <form className="template_form">
                        <Box my={4} mx={2}>
                            <p className="required">必須</p>
                            <TextField
                                id="templateName"
                                required={true}
                                label="テンプレート名"
                                value={templateName}
                                className="md_w-100 w_90"
                                onChange={(e) => {
                                    setTemplateName(e.target.value);
                                }}
                            />
                            {(() => {
                                if(validationType === 'templateName') {
                                    return <p className="error">{validationMessage}</p>
                                }
                            })()}
                        </Box>
                        <Box my={4} mx={2}>
                            <p className="required">必須</p>
                            <TextField
                                id="template"
                                required={true}
                                label="テンプレート内容"
                                className="textarea md_w-100"
                                multiline
                                rows={4}
                                value={template}
                                onChange={(e) => {
                                    setTemplate(e.target.value);
                                }}
                            />
                            {(() => {
                                if(validationType === 'template') {
                                    return <p className="error">{validationMessage}</p>
                                }
                            })()}
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