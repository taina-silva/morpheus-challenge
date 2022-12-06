import React, {useState, useEffect, useCallback} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
    Container,
    Row,
    NavLink,
    StyledSearchBar,
    NoUsersInfo
} from './styles';

function ListScreen() {
    const [ originalUsers, setOriginalUsers ] = useState([]);
    const [ users, setUsers ] = useState([]);
    const [ filter, setFilter ] = useState('');

    const doSearch = (filterValue) => {
        if(filterValue === '') setUsers(originalUsers);
        else {
            const filteredRows = users.filter((row) => {
                return row.username.toLowerCase().includes(filterValue.toLowerCase());
            });
            setUsers(filteredRows);
        }
    };

    const cancelSearch = () => {
        setFilter('');
        doSearch(filter)
    };

    const getAllUsers = useCallback(() => {
        fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            if(JSON.parse(data).code === 'ECONNREFUSED' || data.error) {
                console.log(data.error);
                setUsers([]);
                setOriginalUsers([]);
            } else {
                setUsers(JSON.parse(data));
                setOriginalUsers(JSON.parse(data));
            }
        });
    }, []);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    function getCreatedAtTime(createdAt) {
        const dateTime = new Date(createdAt);
        return dateTime.getDate() + '/' + dateTime.getMonth() + '/' + dateTime.getFullYear();
    }

    function getCreatedAtDate(createdAt) {
        const dateTime = new Date(createdAt);
        return dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
    }

    return (
        <Container>
            <Row>
                <StyledSearchBar
                    value={filter}
                    onChange={(filterValue) => doSearch(filterValue)}
                    onCancelSearch={() => cancelSearch()}
                />
                <NavLink to='/registration'>CADASTRAR NOVO USUÁRIO</NavLink>
            </Row>
            {users.length === 0 ? (
                <NoUsersInfo>SEM USUÁRIOS CADASTRADOS</NoUsersInfo>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead key='table-head'>
                                <TableRow key='titles'>
                                    <TableCell>USUÁRIO</TableCell>
                                    <TableCell align='right'>EMAIL</TableCell>
                                    <TableCell align='right'>NOME COMPLETO</TableCell>
                                    <TableCell align='right'>CRIADO EM</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody key='table-body'>
                                {users.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component='th' scope='row'>{row.username}</TableCell>
                                        <TableCell align='right'>{row.email}</TableCell>
                                        <TableCell align='right'>{row.full_name}</TableCell>
                                        <TableCell align='right'>{getCreatedAtTime(row.created_at) + ' às ' + getCreatedAtDate(row.created_at)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Container>
    );
}

export default ListScreen;
