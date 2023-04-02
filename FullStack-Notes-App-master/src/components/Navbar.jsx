import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar, Button, Typography } from '@material-ui/core';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { signout } from "../redux/actions/auth"
import { useNavigate, useLocation } from "react-router-dom"
import { auth } from "../firebase"
import { getNotes } from "../redux/actions/notes"



const drawerWidth = 240;
const useStyle = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appbar: {
        backgroundColor: "#ffff",
        width: `calc(100% - ${drawerWidth}px)`
    },
    typo: {
        marginTop: "20px"
    },
    date: {
        flexGrow: 1
    },
    avatar: {
        margin: "10px"
    }
}));

const Navbar = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data')));

    const navigate = useNavigate();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("data")));
    }, [location]);

    const logout = () => {
        dispatch(signout(navigate))
        setUser(null)

    }

    return (
        <AppBar
            className={classes.appbar}
            color="transparent"
            elevation={0}
        >
            <Toolbar>
                <Typography
                    className={classes.date}
                    variant="h6"
                >
                    Today is {format(new Date(), 'do MMMM Y')}
                </Typography>
                {
                    user ?
                        (
                            <div className="flex items-center">
                                <Typography
                                    className="mr-4"
                                    variant="subtitle1"
                                >
                                    {user.firstName + " " + user.lastName}
                                </Typography>

                                <Avatar
                                    className={classes.avatar}
                                    alt="MS"
                                >{user.initials}
                                </Avatar>
                                <Button
                                    variant="contained"
                                    className="ml-5"
                                    onClick={logout}
                                    color="secondary"
                                >Logout
                                </Button>
                            </div>
                        ) : (
                            <Button
                                component={Link}
                                to="/login"
                                variant="contained"
                                color="primary"
                            >

                                Sign in
                            </Button>
                        )
                }
            </Toolbar>
        </AppBar>

    )
}

export default Navbar