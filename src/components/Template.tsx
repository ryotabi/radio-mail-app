import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Header from './Header';
import { db } from '../firebase';
import GetValidationMessage from '../helpers/ValidationMessage';
import '../css/template.css';

type PropsType = {
  history: H.History
}

const Template = (props: PropsType) => {
  const [templateName, setTemplateName] = useState<string>('');
  const [template, setTemplate] = useState<string>('');
  const [isUsedTemplateName, setIsUsedTemplateName] = useState<boolean>(false);
  const [validationType, setValidationType] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  useEffect(() => {
    if (templateName || template) {
      setValidationType('');
    };
    checkTemplateName()
  },[templateName, template]);

  const checkTemplateName = () => {
    setIsUsedTemplateName(false);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`template/${user.uid}/data`).where('name', '==', templateName).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              setIsUsedTemplateName(true);
            }
          });
        });
      };
    });
  };

  const saveTemplate = () => {
    if  (isUsedTemplateName) {
      alert('テンプレート名がすでに使われています');
      return;
    }
    if (templateName === '') {
      const validationInfo = GetValidationMessage('template/invalid-templateName');
      setValidationType(validationInfo.type);
      setValidationMessage(validationInfo.message);
      return;
    }
    if (template === '') {
      const validationInfo = GetValidationMessage('template/invalid-template');
      setValidationType(validationInfo.type);
      setValidationMessage(validationInfo.message);
      return;
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`template/${user.uid}/data`).add(
          {
            name: templateName,
            content: template,
          },
        ).then(() => {
          setTemplateName('');
          setTemplate('');
          setValidationType('');
          setValidationMessage('');
          alert('テンプレートを保存しました');
          props.history.push('/login');
        }).catch(() => {
          alert('テンプレートの保存に失敗しました。もう一度お試しください');
        });
      }
    });
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <Container maxWidth="sm">
        <div className="template_wrap">
          <h1 className="title text-center">メール本文テンプレート</h1>
          <form className="template_form">
            <Box my={4} mx={2}>
              <p className="required">必須</p>
              <TextField
                id="templateName"
                required
                label="テンプレート名"
                value={templateName}
                className="md_w-100 w_90"
                onChange={(e) => {
                  setTemplateName(e.target.value);
                }}
              />
              {(() => {
                if (validationType === 'templateName') {
                  return <p className="error">{validationMessage}</p>;
                }
                return '';
              })()}
            </Box>
            <Box my={4} mx={2}>
              <p className="required">必須</p>
              <TextField
                id="template"
                required
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
                if (validationType === 'template') {
                  return <p className="error">{validationMessage}</p>;
                }
                return '';
              })()}
            </Box>
            <Box m={6} className="text-center template_set_btn_wrap">
              <Button variant="contained" className="btn template_set_btn" onClick={saveTemplate}>保存する</Button>
            </Box>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Template;
