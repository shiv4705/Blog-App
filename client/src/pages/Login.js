import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    //handle input change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    //form handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/user/login', {
                email: inputs.email,
                password: inputs.password
            })
            if (data.success) {
                localStorage.setItem('userID', data?.user._id);
                dispatch(authActions.login());
                alert('User Login Successfully');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    marginTop={5}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    borderRadius={5}
                >
                    <Typography
                        variant='h4'
                        sx={{ textTransform: "uppercase" }}
                        padding={3}
                        textAlign="center">
                        Login
                    </Typography>

                    <TextField
                        placeholder='Email'
                        value={inputs.email}
                        onChange={handleChange}
                        name="email"
                        margin='normal'
                        type={"email"}
                        required
                    />
                    <TextField
                        placeholder='Password'
                        value={inputs.password}
                        onChange={handleChange}
                        name="password"
                        margin='normal'
                        type={"password"}
                        required
                    />

                    <Button
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        variant='contained'
                        color='primary'>
                        Submit
                    </Button>
                    <Button
                        onClick={() => navigate("/register")}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        color='primary'>
                        Not a User? Please Register
                    </Button>

                </Box>
            </form>
        </>
    )
};

export default Login
