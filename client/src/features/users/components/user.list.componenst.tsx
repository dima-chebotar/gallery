"use client"
import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {UserType} from "@/features/users/types/user.type";
import UserApi from "@/features/users/user.api";
import {LinearProgress} from "@mui/material";

export default function UserListComponenst() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const users = await UserApi.fetchUsers();
            setUsers(users);
            setIsLoading(false)
        })();
    }, [])
    if (isLoading) return <LinearProgress/>
    return (
        <div>

            <div>
                <TableContainer component={Paper} className={'mb-3'}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">City</TableCell>
                                <TableCell align="right">Image count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.name}
                                    </TableCell>
                                    <TableCell align="right">{user.city}</TableCell>
                                    <TableCell align="right">{user.images_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
