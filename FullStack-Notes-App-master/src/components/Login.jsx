import React from 'react';
import { useFormik } from "formik"
import { Button, Card, TextField, Typography } from '@material-ui/core';


import * as yup from "yup"
import { Link } from 'react-router-dom';
import { login } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const schema = yup.object({
    email: yup.string().required("Email is required").email("invalid Email Address"),
    password: yup.string().required("Password is required")
});


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            // authenticate(values);
            const { email, password } = values;
            dispatch(login(email, password, navigate));
        }
    })

    return (

        <div className='flex justify-center'>
            <Card
                className="flex w-96 justify-center pt-8 pb-24 my-8 flex-col items-center border-1 rounded-xl mr-40"
                elevation={3}
            >
                <div>
                    <Typography
                        className='font-newFont mb-3 font-semibold'
                        variant="h5"
                        align="center"
                    >
                        Log in
                    </Typography>
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                    <TextField
                        size="small"
                        className="w-64"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        id="email"
                        label="Email"
                        variant="outlined"
                        name='email'
                        onBlur={formik.handleBlur}
                        type="email"
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}

                    />
                    <TextField
                        size="small"
                        className="w-64"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        id="password"
                        label="Password"
                        variant="outlined"
                        name='password'
                        type="password"
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        className="w-64 bg-CreateNewAccount normal-case py-2 mt-2 tracking-wider font-myFont px-8 text-base "
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
                <div className='flex gap-2 mt-3 font-myFont'>
                    <Typography>
                        Don't have an account?
                    </Typography>
                    <Link className='text-blue-400 font' to="/signup">Sign Up</Link>
                </div>
            </Card>
        </div>
    )
};

export default Login;
