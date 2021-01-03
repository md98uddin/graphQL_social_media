import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useState} from 'react';
import {Form, FormInput} from "semantic-ui-react"
import {useForm} from '../utils/hooks'
import '../css/Register.css'

const Register = (props) => {
    const [errors, setErrors]=useState({})

    const initialState={
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    const {onChange, onSubmit, values}=useForm(registerUser, initialState)
    
    const [addUser, {loading}]=useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result)
            props.history.push("/")
        },
        onError(error){
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    })

    function registerUser(){
        addUser()
    }

    return ( 
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading":""}>
            <Form.Input name="username" error={errors.username ? true:false} label='Username' type='text' placeholder="enter username" values={values.username} onChange={onChange}/>
            <Form.Input name="email" error={errors.email ? true:false} label='Email' type='email' placeholder="enter email" values={values.email} onChange={onChange}/>
            <Form.Input name="password" error={errors.password ? true:false} label='Password' type='password' placeholder="enter password" values={values.password} onChange={onChange}/>
            <Form.Input name="confirmPassword"  error={errors.confirmPassword ? true:false} label='Confirm Password' type='password' placeholder="confirm password" values={values.confirmPassword} onChange={onChange}/>
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

const REGISTER_USER=gql`
    mutation register( 
        $username:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
        ) {
        register(
            registerInput:{
                username:$username
                email:$email
                password:$password
                confirmPassword:$confirmPassword
            }
        ){
            id
            email
            username
            createdAt
            token
        }
    }
`
 
export default Register;