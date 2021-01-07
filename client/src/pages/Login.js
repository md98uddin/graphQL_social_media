import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useContext, useState} from 'react';
import {Form} from "semantic-ui-react"
import {useForm} from '../utils/hooks'
import '../css/Register.css'

import {AuthContext} from '../context/auth'

const Login = (props) => {
    const context=useContext(AuthContext)
    const [errors, setErrors]=useState({})

    const initialState={
        username:'',
        password:''
    }

    const {onChange, onSubmit, values}=useForm(loginUserCallBack, initialState)

    const [loginUser, {loading}]=useMutation(LOGIN_USER, {
        update(proxy, {data:{login:userData}}){
            context.login(userData)
            props.history.push("/")
        },
        onError(error){
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    })

    function loginUserCallBack(){
        loginUser()
    }


    return ( 
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading":""}>
            <Form.Input name="username" error={errors.username ? true:false} label='Username' type='text' placeholder="enter username" values={values.username} onChange={onChange}/>
            <Form.Input name="password" error={errors.password ? true:false} label='Password' type='password' placeholder="enter password" values={values.password} onChange={onChange}/>
            <Form.Button>Submit</Form.Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                 <div className="ui error message">
                 <ul className="list">
                     {Object.values(errors).map(value => (
                         <li key={value}>{value}</li>
                     ))}
                 </ul>
             </div>
            )}
        </div>
     );
}

const LOGIN_USER=gql`
    mutation loginUser( 
        $username:String!
        $password:String!
        ) {
        login(
                username:$username
                password:$password
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`
 
export default Login;