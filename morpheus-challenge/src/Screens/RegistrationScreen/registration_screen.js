import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from "@material-ui/core/Modal";
import {
    Column,
    ModalBox,
    ModalDescription,
    FormInput,
    ErrorSpan,
    Container,
    FormBox,
    FormButton
} from './styles';

function RegistrationScreen() {
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
                handleOpen();
            });
        }
    })

    const handleOpen = () => {
        setOpenModal(true);
    };
    
    const handleClose = () => {
        setOpenModal(false);
    };

    function get_modal_description() {
        if(requestResponse !== undefined ) {
            const res = JSON.parse(requestResponse);
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
                        <label>Email</label>
                        <FormInput
                            type="email" name="email" id="email"
                            placeholder='Email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <ErrorSpan>{formik.errors.email}</ErrorSpan>
                        )}
                    </Column>

                    <Column>
                        <label>Nome de usuário</label>
                        <FormInput
                            type="text" name="username" id="username"
                            placeholder='Usuário'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <ErrorSpan>{formik.errors.username}</ErrorSpan>
                        )}
                    </Column>
                    
                    <Column>
                        <label>Senha</label>
                        <FormInput
                            type="text" name="password" id="password"
                            placeholder='Senha'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <ErrorSpan>{formik.errors.password}</ErrorSpan>
                        )}
                    </Column>
                    
                    <Column>
                        <label>Nome Completo</label>
                        <FormInput
                            type="text" name="fullName" id="fullName"
                            placeholder='Nome Completo'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <ErrorSpan>{formik.errors.fullName}</ErrorSpan>
                        )}
                    </Column>

                    <FormButton type='submit'>CADASTRAR</FormButton>
                </form>
            </FormBox>            
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <ModalBox>
                    <h2 id="parent-modal-title">ALERTA</h2>
                    <ModalDescription id="parent-modal-description">
                        {get_modal_description()}
                    </ModalDescription>
                </ModalBox>
            </Modal>
        </Container>
    );
}

export default RegistrationScreen;
