import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { dateToString } from '../helpers/DateToString';
import Header from './Header';
import { db } from '../firebase';
import '../css/list.css';

const List = (props) => {
  const [programList, setProgramList] = useState([{ id: '', program: '' }]);
  const [lists, setLists] = useState([{
    id: '',
    program: '',
    corner: '',
    date: '',
    content: '',
    radioName: '',
  }]);
  const programnavLists = [];

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      const unSub = db.collection(`mail/${user.uid}/programList`).onSnapshot((snapshot) => {
        setProgramList(
          snapshot.docs.map((doc) => ({ id: doc.id, program: doc.data().program })),
        );
      });
      return () => unSub();
    });
  }, []);

  for (let i = 0; i < programList.length; i++) {
    if (programnavLists.indexOf(programList[i].program) === -1) {
      programnavLists.push(programList[i].program);
    }
  }

  const setList = async (program) => {
    const { currentUser } = firebase.auth();
    await db.collection(`mail/${currentUser.uid}/${program}`).orderBy('date', 'desc').onSnapshot((snapshot) => {
      setLists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          program: doc.data().program,
          corner: doc.data().corner,
          date: doc.data().date.toDate(),
          content: doc.data().content,
          radioName: doc.data().radioName,
        })),
      );
    });
  };

  return (
    <>
      <Header />
      <div className="bg_color" />
      <div className="program_listnav pt-85">
        <ul className="d-flex">
          {programnavLists.map((program) => {
            const key = Math.random();
            return <li key={key} onClick={() => setList(program)}>{program}</li>;
          })}
        </ul>
      </div>
      <ul>
        {lists.map((list) => {
          if (list.id) {
            return (
              <li key={list.id}>
                <Link to={{ pathname: `single/${list.id}`, state: { list } }} className="program_listitem">
                  <MailOutlineIcon fontSize="large" />
                  <div>
                    <p className="program_listdate">{dateToString(list.date)}</p>
                    <p className="program_listcorner">{list.corner}</p>
                  </div>
                  <ArrowForwardIcon fontSize="large" />
                </Link>
              </li>
            );
          }
          return <p key="00000000" className="program_nolist">番組を選択してください</p>;
        })}
      </ul>
    </>
  );
};

export default List;
