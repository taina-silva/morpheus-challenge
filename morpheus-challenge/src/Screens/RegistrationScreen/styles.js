import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;

    justify-content: center;
    align-items: center;
`;

export const ModalBox = styled.div`
    z-index: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 150px;
    width: 250px;
    transform: translate(-50%, -50%);
    background: white;
    border: 10px solid white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ModalDescription = styled.span`
    color: black;
    text-align: center;
    word-wrap:break-word;
`;