import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks/useForm'

const defaultFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
}
const REGISTER_USER = gql`
    mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        register(registerInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
            id
            email
            username
            createdAt
            token
        }
    }
`
const Register = () => {
    const navigate = useNavigate()
    const { formData, onChange, onSubmit } = useForm(defaultFormData, registerUser)
    const [errors, setErrors] = useState({})

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            // console.log(result)
            navigate('/')
        },
        onError(err) {
            // console.log('errors', err)
            if (err) {
                setErrors(err?.graphQLErrors[0]?.extensions?.errors)
            }
        },
        variables: formData,
    })

    function registerUser() {
        addUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    value={formData.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input label="Email" placeholder="Email.." name="email" value={formData.email} error={errors.email ? true : false} onChange={onChange} />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={formData.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Register
