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

export const FormInput = styled.input`
    font-size: 18px;
    color: black;
    placeholder: red;
    padding: 10px;
    margin: 10px;
    border: 1px solid #76b5c5;
    border-radius: 5px;
    &::placeholder {
        color: #76b5c5;
    }
`;

export const ErrorSpan = styled.span`
    color: red;
    text-align: center;
    word-wrap:break-word;
`;

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    background: linear-gradient(#e66465, #9198e5);
`;

export const FormBox = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 500px;
    width: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FormButton = styled.button`
    margin: auto;
    display: flex;
    background-color: #405cf5;
    border-radius: 6px;
    border: none;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    height: 44px;
    padding: 0 25px;
    align-items: center;
    transition: all .2s,box-shadow .08s ease-in;
`;