import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    const [ isLoading, setIsLoading ] = useState(false);
    const [ modalDescription, setModalDescription ] = useState('');
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
            setIsLoading(true);
            fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                getModalDescription(response).then(() => setIsLoading(false));
                handleOpenModal();
            });
        }
    })

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
        navigate('/');
    };

    async function getModalDescription(response) {
        var result = 'Resultado inesperado';
        if(response !== undefined ) {
            const body = await response.clone().text();
            const bodyAsJson = JSON.parse(body);
            if(response.status > 299) {
                if(bodyAsJson.detail.includes('already exists')) {
                    if (bodyAsJson.detail.includes('email')) result = 'Email já está em uso. Por favor insira outro';
                    else if (bodyAsJson.detail.includes('username')) result = 'Nome de usuário já está em uso. Por favor insira outro';
                } else result = 'Erro ao cadastrar usuário';
            }
            if(response.status >= 200 && response.status <= 299) result = 'Usuário cadastrado com sucesso';
        } 
        setModalDescription(result);
    }

    return (
        <Container>
            <FormBox>
                <form onSubmit={formik.handleSubmit}>
                    <Column>
                        <InputTitle>Email</InputTitle>
                        <FormInput
                            type='email' name='email' id='email'
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
                            type='text' name='username' id='username'
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
                            type='text' name='password' id='password'
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
                            type='text' name='fullName' id='fullName'
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
                onClose={handleCloseModal}
            >
                <ModalBox>
                    <ModalTitle>ALERTA</ModalTitle>
                    {isLoading ? (
                        <ThreeDots 
                        height="40" 
                        width="80" 
                        radius="9"
                        color="blue" 
                        ariaLabel="three-dots-loading"
                        visible={true}
                         />
                    ) : (<ModalDescription>{modalDescription}</ModalDescription>)}
                    <Button isModalButton={true} id='modal-button' onClick={handleCloseModal}>OK</Button>
                </ModalBox>
            </Modal>   
        </Container>
    );
}

export default RegistrationScreen;
