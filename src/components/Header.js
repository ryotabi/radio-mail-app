import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';
import Box from '@material-ui/core/Box';

import '../css/reset.css';
import '../css/common.css';
import '../css/header.css';

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const OpenHumMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <div className="header_wrap">
                <Container maxWidth="sm">
                    <Grid container justify="space-between" alignItems="center">
                        <Grid item xs={6}>
                            <Link to="/" className="header_title">ラジオメーラー</Link>
                        </Grid>
                        <Grid item xs={3} className="text-right">
                            <MenuIcon fontSize="large" onClick={OpenHumMenu}/>
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
                    <MenuItem><Link to="/">トップ</Link></MenuItem>
                    <MenuItem><Link to="/mail">メールを送る</Link></MenuItem>
                    <MenuItem><Link to="/save">未送信のメール</Link></MenuItem>
                    <MenuItem><Link to="/list">過去の投稿</Link></MenuItem>
                    <MenuItem><Link to="/program">番組表</Link></MenuItem>
                    <MenuItem><Link to="/setting">設定</Link></MenuItem>
                </Box>
            </Menu>
        </>
    )
}

export default Header;