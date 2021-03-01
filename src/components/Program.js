import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
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

import '../css/reset.css';
import '../css/common.css';
import '../css/program.css';

const Program = () => {
  const [nowDate, setNowDate] = useState('');
  const [radioStationLists, setRadioStationLists] = useState([]);
  const [programLists, setRadioProgram] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://s-ryota.sakura.ne.jp/GetRadikoProgramApi/`)
    .then((res) => {
      setNowDate((res.data.stations.station[0].progs.date).substr(4,4));
      setRadioStationLists(res.data.stations.station);
      setIsLoading(false);
    })
  },[])

  const handleList = (program) => {
    setRadioProgram(program.progs.prog);
  }

  const dateToFormat = (str, idx, val, val2 = '') => {
    let date = str.slice(0, idx) + val + str.slice(idx) + val2;
    return date;
  }

  return (
    <>
    {(() => {
      if(isLoading){
        return (
          <div className="loading_wrap">
            <CircularProgress className="loading_icon" size={60} disableShrink={true} />
          </div>
        )
      }
    })()}
      <Header />
      <div className="bg_color"></div>
      <div className="program_listnav pt-85">
          <ul className="d-flex">
            {radioStationLists.map((station) => {
              let key = Math.random();
              return <li key={key} onClick={() => handleList(station)}>{station.name}</li>
            })}
          </ul>
      </div>
      <Container maxWidth="lg">
        <Box my={2}>
          <h2 className="text-center program_title">{dateToFormat(nowDate, 2, "月", "日")}</h2>
        </Box>
        <Box my={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>時間</TableCell>
                  <TableCell>番組</TableCell>
                  <TableCell className="programTable_url">公式ＨＰ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {programLists.map((program) => {
                  return (
                    <TableRow key={program["@attributes"].id}>
                      <TableCell>{dateToFormat(program["@attributes"].ftl, 2, ":")}～{dateToFormat(program["@attributes"].tol, 2, ":")}</TableCell>
                      <TableCell>{program.title}</TableCell>
                      <TableCell><a href={program.url} target="_blank">公式ＨＰへ</a></TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  )
}

export default Program;