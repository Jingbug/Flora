import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState} from "react";



function DrawerAppBar(props) {
    const [isLogin, setisLogin] = useState(sessionStorage.getItem("user_id"));

    function onLogoutClick() {
        sessionStorage.clear();
        localStorage.clear();
    }

    function handleMypageClick() {
        if (isLogin === null) {
            alert("로그인 후 이용 가능합니다.");
            window.location.href = "/login"
        } else {
            // 마이페이지로 이동
            window.location.href = "/mypage";
        }
    }

    function handleBasketClick() {
        if (isLogin === null) {
            alert("로그인 후 이용 가능합니다.");
            window.location.href = "/login"
        } else {
            // 마이페이지로 이동
            window.location.href = "/basket";
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor:'#ca8a8b' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                            fontFamily: 'Gaegu',
                            fontSize:'40px'}}
                    >
                        Flora
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, color:'white'}}>
                        <Button href='/' sx={{color:'white'}}>Home</Button>
                        <Button href='/detail' sx={{color:'white'}}>Flower</Button>
                        <Button href='/list' sx={{color:'white'}}>List</Button>
                        <Button href='/search' sx={{color:'white'}}>Search</Button>
                        <Button onClick={handleBasketClick} sx={{color:'white'}}>Basket</Button>
                        <Button onClick={handleMypageClick} sx={{color:'white'}}>Mypage</Button>
                        {
                            isLogin === null ?
                            <Button href='/login' sx={{color:'white'}}>Login</Button>
                                : <Button sx={{color:'white'}} onClick={onLogoutClick} href='/'>Logout</Button>
                        }
                        <Box sx={{ flexGrow: 1 }} />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default DrawerAppBar;