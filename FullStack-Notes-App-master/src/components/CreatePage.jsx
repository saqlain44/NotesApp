// rafce
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useDispatch } from "react-redux"
import { createNote } from "../redux/actions/notes"

const UseStyle = makeStyles({
    title: {
        marginTop: "10px",
        "font-family": 'Chakra Petch'
    },
    button: {
        "font-family": 'Chakra Petch'
    },
    titleTextField: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    detailTextField: {
        marginTop: "15px",
        marginBottom: "15px"
    }
});

const createPage = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(null);
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [title, setTitle] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [detail, setDetail] = useState("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [titleError, setTitleError] = useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [detailError, setDetailError] = useState(false);


    const onClickHandler = () => {
        if (title) {
            setDetailError(true);
            setTitleError(false);
        }
        if (detail) {
            setTitleError(true);
            setDetailError(false);
        }
        if (title && detail) {
            // dispatch createNote
            dispatch(createNote(title, detail, value))

            setTitleError(false);
            setDetailError(false);
            setTitle("")
            setDetail("")
        }
        if (title === "" && detail === "") {
            setTitleError(true);
            setDetailError(true);
        }
    }

    const classes = UseStyle();
    return (
        <Container>
            <Typography
                variant="h6"
                component="h2"
                className={classes.title}
            >
                Create a new Note
            </Typography>

            <TextField
                className={classes.titleTextField}
                label="Title"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                error={titleError}
                required
                fullWidth
            />
            <TextField
                className={classes.detailTextField}
                label="Details"
                variant="outlined"
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                error={detailError}
                required
                fullWidth
                multiline
                rows={3}
            />

            <FormControl component="fieldset">
                <FormLabel component="legend">Category</FormLabel>
                <RadioGroup aria-label="category" name="category"
                    value={value} onChange={handleChange}>
                    <FormControlLabel value="money" control={<Radio />} label="Money" />
                    <FormControlLabel value="work" control={<Radio />} label="Work" />
                    <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
                    <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                </RadioGroup>
                <Button
                    className="mb-8"
                    variant="contained"
                    color="secondary"
                    onClick={onClickHandler}
                    endIcon={<ArrowForwardIosIcon fontSize="small" />}
                >
                    Submit
                </Button>
            </FormControl>
        </Container >
    )
}

export default createPage
