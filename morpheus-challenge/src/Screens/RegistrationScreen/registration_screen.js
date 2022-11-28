import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import Modal from "@material-ui/core/Modal";
import {
    Column,
    ModalBox,
    ModalDescription
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
        <>
            <form onSubmit={formik.handleSubmit}>
                <Column>
                    <label>Email</label>
                    <Input
                        type="email" name="email" id="email"
                        placeholder='Email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <span>{formik.errors.email}</span>
                    )}
                </Column>

                <Column>
                    <label>Nome de usuário</label>
                    <Input
                        type="text" name="username" id="username"
                        placeholder='Usuário'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                     {formik.touched.username && formik.errors.username && (
                        <span>{formik.errors.username}</span>
                    )}
                </Column>
                
                <Column>
                    <label>Senha</label>
                    <Input
                        type="text" name="password" id="password"
                        placeholder='Senha'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                     {formik.touched.password && formik.errors.password && (
                        <span>{formik.errors.password}</span>
                    )}
                </Column>
                
                <Column>
                    <label>Nome Completo</label>
                    <Input
                        type="text" name="fullName" id="fullName"
                        placeholder='Nome Completo'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                     {formik.touched.fullName && formik.errors.fullName && (
                        <span>{formik.errors.fullName}</span>
                    )}
                </Column>

                <Button type='submit'>CADASTRAR</Button>
            </form>
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
        </>
    );
}

export default RegistrationScreen;
