import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {styled} from '@mui/material/styles';
import {useForm} from "react-hook-form";
import {CreateUserType} from "@/features/users/types/create-user.type";
import {Box} from "@mui/material";
import UserApi from "@/features/users/user.api";


interface CreateUserComponentProps {
    open: boolean;
    handleClose: () => void;
    handleSetMessage: (message: string) => void;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function CreateUserComponent({open, handleClose, handleSetMessage}: CreateUserComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CreateUserType>()

    const onSubmit = async ({name, city, image}: CreateUserType,) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('city', city);
            formData.append('image', image[0]);
            await UserApi.create(formData)
                .then((data) => {
                    handleClose()
                    reset()
                    handleSetMessage(data.message)
                })
            ;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Create new user</DialogTitle>

                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register('name')}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                    />
                    <TextField
                        className={'mb-3'}
                        autoFocus
                        required
                        margin="dense"
                        id="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        {...register('city')}
                        error={!!errors.city}
                        helperText={errors?.city?.message}
                    />
                    <Button
                        className={'m-auto'}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file"
                                             {...register('image')}
                        />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
