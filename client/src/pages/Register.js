import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate()

    //state
    const [inputs, setInputs] = useState({
        name: '',
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
            const { data } = await axios.post('/api/v1/user/register', {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password
            })
            if (data.success) {
                alert('USer Register Successfully');
                navigate('/login');
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
                        Register
                    </Typography>

                    <TextField
                        placeholder='Name'
                        value={inputs.name}
                        onChange={handleChange}
                        name="name"
                        margin='normal'
                        type={"text"}
                        required
                    />
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
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        type='submit'
                        color='primary'>
                        Already Registered? Please Login
                    </Button>

                </Box>
            </form>
        </>
    )
}

export default Register
