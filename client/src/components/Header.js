import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Typography, Tab, Tabs } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Header = () => {
    //Global State
    const isLogin = useSelector(state => state.isLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Normal State
    const [value, setValue] = useState()

    //Logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            alert('Logout Successfully')
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant='h4'>My Blog App</Typography>
                    {isLogin && (
                        <Box display={'flex'} marginLeft="auto" marginRight={'auto'}>
                            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue}>
                                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                                <Tab label="Create Blogs" LinkComponent={Link} to="/create-blog" />
                            </Tabs>
                        </Box>
                    )}
                    <Box display={'flex'} marginLeft={"auto"}>
                        {!isLogin && (
                            <>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">Register</Button>
                            </>
                        )}
                        {isLogin && (<Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>LogOut</Button>)}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header