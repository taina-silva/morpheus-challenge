import React, {useState, useEffect, useCallback} from 'react';
import SearchBar from "material-ui-search-bar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
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
    const [ filter, setFilter ] = useState("");

    const do_search = (filter_value) => {
        if(filter_value === "") setUsers(originalUsers);
        else {
            const filtered_rows = users.filter((row) => {
                return row.username.toLowerCase().includes(filter_value.toLowerCase());
            });
            setUsers(filtered_rows);
        }
    };

    const cancel_search = () => {
        setFilter("");
        do_search(filter)
    };

    const get_all_users = useCallback(() => {
        fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            if(data.error) {
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
        get_all_users();
    }, [get_all_users]);

    function get_created_at_time(created_at) {
        const date_time = new Date(created_at);
        return date_time.getDate() + "/" + date_time.getMonth() + "/" + date_time.getFullYear();
    }

    function get_created_at_date(created_at) {
        const date_time = new Date(created_at);
        return date_time.getHours() + ":" + date_time.getMinutes() + ":" + date_time.getSeconds();
    }

    return (
        <Container>
            <Row>
                <StyledSearchBar
                    value={filter}
                    onChange={(filter_value) => do_search(filter_value)}
                    onCancelSearch={() => cancel_search()}
                />
                <NavLink to="/registration">CADASTRAR NOVO USUÁRIO</NavLink>
            </Row>
            {users.length === 0 ? (
                <NoUsersInfo>SEM USUÁRIOS CADASTRADOS</NoUsersInfo>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableCell>USUÁRIO</TableCell>
                                <TableCell align="right">EMAIL</TableCell>
                                <TableCell align="right">NOME COMPLETO</TableCell>
                                <TableCell align="right">CRIADO EM</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">{row.username}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.full_name}</TableCell>
                                        <TableCell align="right">{get_created_at_time(row.created_at) + " às " + get_created_at_date(row.created_at)}</TableCell>
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
