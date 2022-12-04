import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from "@material-ui/core/Modal";
import {
    Column,
    ModalBox,
    ModalDescription,
    ModalTitle,
    FormInput,
    ErrorSpan,
    Container,
    FormBox,
    Button,
    InputTitle
} from './styles';

function RegistrationScreen() {
    const navigate = useNavigate();
    const [ openModal, setOpenModal ] = useState(false);
    const [ requestResponse, setRequestResponse ] = useState();
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            fullName: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Insira um endereço de email válido').required('Campo obrigatório'),
            username: Yup.string().required('Campo obrigatório'),                    
            password: Yup.string().min(6, 'Insira uma senha com 6 ou mais caracteres').required('Campo obrigatório'),                    
            fullName: Yup.string().required('Campo obrigatório'),     
        }),
        onSubmit: function (values) {
            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                setRequestResponse(data);
                handle_open();
            });
        }
    })

    const handle_open = () => {
        setOpenModal(true);
    };
    
    const handle_close = () => {
        setOpenModal(false);
        navigate("/");
    };

    function get_modal_description() {
        if(requestResponse !== undefined ) {
            const res = JSON.parse(requestResponse);
            if(res.name === 'error') return "Erro ao cadastrar usuário";
            if(res.statusCode === 200) return "Usuário cadastrado com sucesso";
            else if(res.detail.includes("already exists")) {
                if (res.detail.includes("email")) return "Email já está em uso. Por favor insira outro";
                else if (res.detail.includes("username")) return "Nome de usuário já está em uso. Por favor insira outro";
            }
        } 
    }

    return (
        <Container>
            <FormBox>
                <form onSubmit={formik.handleSubmit}>
                    <Column>
                        <InputTitle>Email</InputTitle>
                        <FormInput
                            type="email" name="email" id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            showError={formik.touched.email && formik.errors.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <ErrorSpan>{formik.errors.email}</ErrorSpan>
                        )}
                    </Column>

                    <Column>
                        <InputTitle>Nome de usuário</InputTitle>
                        <FormInput
                            type="text" name="username" id="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            showError={formik.touched.username && formik.errors.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <ErrorSpan>{formik.errors.username}</ErrorSpan>
                        )}
                    </Column>
                    
                    <Column>
                        <InputTitle>Senha</InputTitle>
                        <FormInput
                            type="text" name="password" id="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            showError={formik.touched.password && formik.errors.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <ErrorSpan>{formik.errors.password}</ErrorSpan>
                        )}
                    </Column>
                    
                    <Column>
                        <InputTitle>Nome Completo</InputTitle>
                        <FormInput
                            type="text" name="fullName" id="fullName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            showError={formik.touched.fullName && formik.errors.fullName}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <ErrorSpan>{formik.errors.fullName}</ErrorSpan>
                        )}
                    </Column>

                    <Button type='submit' isModalButton={false} >CADASTRAR</Button>
                </form>
            </FormBox>            
            <Modal
                open={openModal}
                onClose={handle_close}
            >
                <ModalBox>
                    <ModalTitle id="parent-modal-title">ALERTA</ModalTitle>
                    <ModalDescription id="parent-modal-description">
                        {get_modal_description()}
                    </ModalDescription>
                    <Button isModalButton={true} id='modal-button' onClick={handle_close}>OK</Button>
                </ModalBox>
            </Modal>
        </Container>
    );
}

export default RegistrationScreen;
