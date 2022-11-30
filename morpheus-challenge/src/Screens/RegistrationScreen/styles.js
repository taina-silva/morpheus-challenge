import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(#009FFD, #2A2A72);
`;

export const Column = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FormBox = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40rem;
    width: 25rem;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 425px) {
        height: 38rem;
        width: 18rem;
    }

    @media (min-width: 2560px) {
        height: 47rem;
        width: 35rem;
    }
`;

export const FormInput = styled.input`
    font-size: 1.25rem;
    color: black;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid ${props => (props.showError ? 'red' : '#76b5c5')};
    border-radius: 5px;
    &::placeholder {
        color: #76b5c5;
    }

    @media (max-width: 425px) {
        width: 15rem;
    }

    @media (min-width: 2560px) {
        width: 25rem;
    }
`;

export const Button = styled.button`
    margin: 1rem auto;
    width: 10rem;
    display: flex;
    justify-content: center;
    background-color: #405cf5;
    border-radius: 6px;
    border: none;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    font-weight: bold;
    padding: 1.1rem;
    align-items: center;

    @media (min-width: 2560px) {
        width: ${props => (props.isModalButton ? '10rem' : '20rem')};
        font-size: 1.5rem;
    }
`;

export const InputTitle = styled.div`
    width: 17.5rem;
    font-size: 1.5rem;
    color: #063970;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    @media (max-width: 425px) {
        width: 15rem;
    }

    @media (min-width: 2560px) {
        width: 25rem;
        font-size: 2.5rem;
    }
`;


export const ErrorSpan = styled.div`
width: 17.5rem;
    margin-bottom: 25px;
    margin-top: -10px;
    font-size: 0.75rem;
    color: grey;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    @media (max-width: 425px) {
        width: 15rem;
    }

    @media (min-width: 2560px) {
        width: 25rem;
        font-size: 1.25rem;
    }
`;

export const ModalBox = styled.div`
    z-index: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    height: 200px;
    width: 250px;
    transform: translate(-50%, -50%);
    background: white;
    border: 10px solid white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-align: center;

    @media (min-width: 2560px) {
        height: 250px;
        width: 350px;
        font-size: 1.5rem;
        padding: 0 10px;
    }
`;

export const ModalTitle = styled.h2`
    color: #405cf5;
    margin-bottom: 15px;
`;

export const ModalDescription = styled.span`
    color: black;
    word-wrap:break-word;
`;