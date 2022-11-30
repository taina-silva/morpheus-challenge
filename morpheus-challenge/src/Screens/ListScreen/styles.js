import styled from 'styled-components';
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 2rem 1.5rem;
    overflow-x: hidden;
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 425px) {
        flex-direction: column;
    }
`;

export const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.9rem;
    color: #fff;
    background-color: #405cf5;
    border-radius: 6px;
    border: 1px solid #405cf5;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    font-size: 0.9rem;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    &:hover {
        color: #405cf5;
        background: #fff;
    }

    @media (max-width: 425px) {
        width: 100%;
        justify-content: center;
        margin: 25px 0;
    }
`;

export const StyledSearchBar = styled(SearchBar)`
    width: 100%;
    margin-right: 10px;

    @media (max-width: 425px) {
        margin-right: 0px;
    }
`;

export const NoUsersInfo = styled.div`
    width: 100%;
    font-size: 1.5rem;
    text-decoration: underline;
    color: #063970;
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;