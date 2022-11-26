import React, {useState, useEffect, useCallback} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import {
    Column
} from './styles';

function RegistrationScreen() {
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
                alert(data);
            });
        }
    })

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
        </>
    );
}

export default RegistrationScreen;
