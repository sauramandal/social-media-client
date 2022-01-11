import gql from 'graphql-tag'
import { useContext } from 'react'
import { Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks/useForm'

const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`

const PostForm = () => {
    const { formData, onChange, onSubmit } = useForm({ body: '' }, createPostCallback)
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: formData,
        update: (_, result) => {
            formData.body = ''
        },
        onError: (err) => {},
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input placeholder="" name="body" onChange={onChange} value={formData} />
            </Form.Field>
        </Form>
    )
}

export default PostForm
