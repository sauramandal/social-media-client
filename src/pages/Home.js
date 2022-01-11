import React, { Fragment, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`
const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    return (
        <Fragment>
            <Grid columns={3}>
                <Grid.Row className="page-title">
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )}
                    {loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        data.getPosts &&
                        data.getPosts.map((post) => (
                            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
                </Grid.Row>
            </Grid>
        </Fragment>
    )
}

export default Home
