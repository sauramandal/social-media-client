import React, { Fragment, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const onChange = ({ target: { name, value } }) => {
        setFormData({ ...formData, [name]: value })
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
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: formData,
    })
    const onSubmit = (event) => {
        event.preventDefault()
        addUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input label="Username" placeholder="Username.." name="username" value={formData.username} onChange={onChange} />
                <Form.Input label="Email" placeholder="Email.." name="email" value={formData.email} onChange={onChange} />
                <Form.Input type="password" label="Password" placeholder="Password.." name="password" value={formData.password} onChange={onChange} />
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password.."
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register
