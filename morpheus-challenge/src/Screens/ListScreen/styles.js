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
`;

export const NavLink = styled(Link)`
    display: flex;
    background-color: #405cf5;
    border-radius: 6px;
    border: 2px solid #405cf5;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    text-decoration: none;
    padding: 0.9rem;
    align-items: center;
    &:hover {
        color: #405cf5;
        background: #fff;
    }
`;

export const StyledSearchBar = styled(SearchBar)`
    width: 70%;
`;
