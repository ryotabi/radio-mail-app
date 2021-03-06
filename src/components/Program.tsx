import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import * as H from 'history';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from './Header';
import '../css/program.css';

type PropsType = {
  history: H.History
}

type RadioProgramType = {
  name: string,
  progs: {
    date: string,
    // ここの配列の型どうにかするradikoAPIの型を定義する
    prog: []
  }
}

type RadioProgType = {
  attributes: {
    id: string,
    ftl: string,
    tol: string
  },
  title: string,
  url: string
}

const Program = (props: PropsType) => {
  const [nowDate, setNowDate] = useState<string>('');
  const [nowStation, setNowStation] = useState<string>('');
  const [radioStationLists, setRadioStationLists] = useState<RadioProgramType[]>([]);
  const [programLists, setRadioProgram] = useState<RadioProgramType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ログイン状態確認
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      props.history.push('/login');
    }
  });

  useEffect(() => {
    axios.get('https://s-ryota.sakura.ne.jp/GetRadikoProgramApi/')
      .then((res) => {
        setNowDate((res.data.stations.station[0].progs.date).substr(4, 4));
        setRadioStationLists(res.data.stations.station);
        setIsLoading(false);
      });
  }, []);

  const setList = (program: RadioProgramType) => {
    setNowStation(program.name);
    setRadioProgram(program.progs.prog);
  };

  const dateToFormat = (str: string, idx: number, val: string, val2: string = '') => {
    const date = str.slice(0, idx) + val + str.slice(idx) + val2;
    return date;
  };

  return (
    <>
      {(() => {
        if (isLoading) {
          return (
            <div className="loading_wrap">
              <CircularProgress className="loading_icon" size={60} disableShrink />
            </div>
          );
        }
        return '';
      })()}
      <Header />
      <div className="bg_color" />
      <div className="program_listnav pt-85">
        <ul className="d-flex">
          {radioStationLists.map((station: RadioProgramType) => {
            const key = Math.random();
            return <li key={key} onClick={() => setList(station)}>{station.name}</li>;
          })}
        </ul>
      </div>
      <Container maxWidth="lg">
        <Box my={2}>
          <h2 className="text-center program_title">{dateToFormat(nowDate, 2, '月', '日')}</h2>
          <h2 className="text-center program_title">{nowStation}</h2>
        </Box>
        <Box my={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="programTable_date">時間</TableCell>
                  <TableCell className="programTable_title">番組</TableCell>
                  <TableCell className="programTable_url">公式ＨＰ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programLists.map((program: any) => (
                  <TableRow key={program['@attributes'].id}>
                    <TableCell className="programTable_date">
                      {dateToFormat(program['@attributes'].ftl, 2, ':')}
                      ～
                      {dateToFormat(program['@attributes'].tol, 2, ':')}
                    </TableCell>
                    <TableCell className="programTable_title">{program.title}</TableCell>
                    <TableCell><a href={program.url} target="_blank" rel="noreferrer">公式ＨＰへ</a></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default Program;
