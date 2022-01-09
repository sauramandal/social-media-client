import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks/useForm'
import { AuthContext } from '../context/auth'

const defaultFormData = {
    username: '',
    password: '',
}

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`
const Login = () => {
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const { formData, onChange, onSubmit } = useForm(defaultFormData, loginUserCallback)
    const [errors, setErrors] = useState({})

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData)
            navigate('/')
        },
        onError(err) {
            if (err) {
                setErrors(err?.graphQLErrors[0]?.extensions?.errors)
            }
        },
        variables: formData,
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    value={formData.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    value={formData.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
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

export default Login
