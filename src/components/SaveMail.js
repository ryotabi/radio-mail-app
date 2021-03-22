import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { db } from '../firebase';
import dateToString from '../helpers/DateToString';
import Header from './Header';
import '../css/save.css';

const SaveMail = (props) => {
  const [hasLists, setHasLists] = useState(false);
  const [lists, setLists] = useState([{
    id: '',
    name: '',
    portalCode: '',
    address: '',
    tel: '',
    mail: '',
    radioName: '',
    age: '',
    program: '',
    corner: '',
    content: '',
    date: '',
  }]);

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const unSub = db.collection(`mail/${user.uid}/saveMail`).onSnapshot((snapshot) => {
        setLists(
          snapshot.docs.map((doc) => {
            if (doc.data().name !== '') {
              setHasLists(true);
            }
            return {
              id: doc.id,
              name: doc.data().name,
              portalCode: doc.data().portalCode,
              address: doc.data().address,
              tel: doc.data().tel,
              mail: doc.data().mail,
              radioName: doc.data().radioName,
              age: doc.data().age,
              program: doc.data().program,
              corner: doc.data().corner,
              content: doc.data().content,
              date: doc.data().date.toDate(),
            };
          }),
        );
      });
      return () => unSub();
    });
  }, []);

  const deleteSaveMail = (id) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        db.collection(`mail/${user.uid}/saveMail`).doc(id).delete();
      }
    });
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <div className="pt-100">
        <ul>
          {lists.map((list) => {
            if (list.name !== '') {
              return (
                <>
                  <li key={list.id}>
                    <div className="save_listitem">
                      <BookmarkBorderIcon fontSize="large" />
                      <div>
                        <p className="save_listdate">{dateToString(list.date)}</p>
                        <p className="save_listprogram">{list.program}</p>
                        <p className="save_listcorner">{list.corner}</p>
                      </div>
                      <Link to={{ pathname: '/form', state: { saveMailList: list } }}>
                        <EditIcon fontSize="large" className="edit_icon" />
                      </Link>
                      <DeleteForeverIcon fontSize="large" onClick={() => { deleteSaveMail(list.id); }} />
                    </div>
                  </li>
                </>
              );
            }
            return '';
          })}
          {hasLists ? '' : (<p className="save_nolist">保存しているメールはありません</p>)}
        </ul>
      </div>
    </>
  );
};

export default SaveMail;
