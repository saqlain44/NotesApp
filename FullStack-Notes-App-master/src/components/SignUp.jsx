import React from 'react';
import { useFormik } from "formik"
import { Button, Card, TextField, Typography } from '@material-ui/core';
import * as yup from "yup"
import { Link } from 'react-router-dom';
import { signup } from "../redux/actions/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const schema = yup.object({
    firstName: yup.string("First Name must be in string").required("First Name is required").min(3, "First Name must be 3 characters long"),
    lastName: yup.string("Last Name must be in string").required("Last Name is required").min(3, "Last Name must be 3 characters long"),
    email: yup.string().required("Email is required").email("invalid Email Address"),
    password: yup.string().required("Password is required").min(8, "Password should be at least 8 characters long"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            const { email, password, firstName, lastName } = values;
            dispatch(signup(firstName, lastName, email, password, navigate))

        }
    });

    return (
        <div className='flex justify-center'>
            <Card
                className="flex w-96 justify-center pt-8 pb-24 my-8 flex-col items-center  border-1 rounded-xl mr-40"
                elevation={3}
            >
                <div>
                    <Typography
                        className='font-myFont'
                        variant="h5"
                        align="center"
                    >
                        Sign up to Continue
                    </Typography>
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                    <TextField
                        size="small"
                        className="mt-4 w-64"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        id="firstName"
                        label="First Name"
                        variant="outlined"
                        type="text"
                        onBlur={formik.handleBlur}
                        firstName='firstName'
                        error={formik.touched.firstName && formik.errors.firstName}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        size="small"
                        className="w-64"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        id="lastName"
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        onBlur={formik.handleBlur}
                        lastName='lastName'
                        error={formik.touched.lastName && formik.errors.lastName}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />

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

                    <TextField
                        size="small"
                        className="w-64"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        id="confirmPassword"
                        label="Confirm Password"
                        variant="outlined"
                        name='confirmPassword'
                        type="password"
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}

                    />
                    <Button
                        className="w-64 bg-CreateNewAccount normal-case py-2 mt-2 tracking-wider font-myFont px-8 text-base "
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Create New Account
                    </Button>
                </form>
                <div className='flex gap-2 mt-3 font-myFont'>
                    <Typography>
                        Already registered?
                    </Typography>
                    <Link className='text-blue-400 font-myFont' to="/login">Log In</Link>
                </div>
            </Card>
        </div>
    )
};

export default SignUp;
