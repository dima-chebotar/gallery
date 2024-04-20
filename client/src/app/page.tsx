"use client"
import UserListComponenst from "@/features/users/components/user.list.componenst";
import {Alert, Button, Snackbar} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateUserComponent from "@/features/users/components/create.user.component";
import * as React from 'react';
import {useState} from 'react';

export default function Home() {
    const [open, setOpen] = useState<boolean>(false);
    const [openSnackbars, setOpenSnackbars] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSnackbars = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbars(false);
    };

    const handleSetMessage = (message: string) => {
        setMessage(message)
        setOpenSnackbars(true);
    }
    return (
        <main className={'max-w-3xl mx-auto mt-2'}>
            <div>
                <Snackbar anchorOrigin={{'vertical': 'top', 'horizontal': 'right'}}
                          open={openSnackbars}
                          autoHideDuration={4000}
                          onClose={handleCloseSnackbars}>
                    <Alert
                        onClose={handleCloseSnackbars}
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </div>
            <h1 className={'text-4xl flex justify-center mb-5'}>Gallery</h1>
            <div className={'mb-5 flex justify-center'}>
                <Button className={'mb-3 m-auto'} variant="contained" endIcon={<AddIcon/>}
                        onClick={handleClickOpen}
                >
                    create
                </Button>
                <CreateUserComponent open={open} handleClose={handleClose} handleSetMessage={handleSetMessage}/>
            </div>
            <UserListComponenst/>
        </main>
    );
}
