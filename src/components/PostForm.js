import gql from 'graphql-tag'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks/useForm'
import { FETCH_POSTS_QUERY } from '../utils/graphql/postQueries'
import { Fragment } from 'react/cjs/react.production.min'

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
        update(proxy, result) {
            // Read and write posts data to in-memory cache - Apollo Client cache
            const postsData = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...postsData.getPosts],
                },
            })
            formData.body = ''
        },
    })

    function createPostCallback() {
        createPost()
    }

    return (
        <Fragment>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post</h2>
                <Form.Field>
                    <Form.Input placeholder="" name="body" onChange={onChange} value={formData.body} error={error ? true : false} />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </Fragment>
    )
}

export default PostForm
