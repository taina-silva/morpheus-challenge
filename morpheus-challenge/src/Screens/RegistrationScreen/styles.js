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
    height: 600px;
    width: 400px;
    background: white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
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
`;

export const FormButton = styled.button`
    margin: 1rem auto;
    display: flex;
    background-color: #405cf5;
    border-radius: 6px;
    border: none;
    box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    font-size: 100%;
    padding: 1.1rem;
    align-items: center;
`;

export const InputTitle = styled.div`
    width: 17.5rem;
    font-size: 1.5rem;
    color: #063970;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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