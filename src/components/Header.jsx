import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';
import '../css/header.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const OpenHumMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pageReload = () => {
    document.location.reload();
  };
  return (
    <>
      <div className="header_wrap">
        <Container maxWidth="lg">
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Link to="/" className="header_title">ラジオメーラー</Link>
            </Grid>
            <Grid item xs={3} className="text-right">
              <MenuIcon fontSize="large" onClick={OpenHumMenu} />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <CancelIcon onClick={handleClose} fontSize="large" className="close_btn" />
        <Box m={2}>
          <MenuItem><Link className="w-100" to="/">トップ</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/mail">メールを送る</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/save">未送信のメール</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/list">過去の投稿</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/program">番組表</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/howToUse">使い方</Link></MenuItem>
          <MenuItem><Link className="w-100" to="/setting">設定</Link></MenuItem>
          <MenuItem><p className="w-100" onClick={pageReload}>ページリロード</p></MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default Header;
