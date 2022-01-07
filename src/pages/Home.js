import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'
import { Grid } from 'semantic-ui-react'
import PostCard from '../components/PostCard'

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
    const {
        loading,
        data: { getPosts: posts },
    } = useQuery(FETCH_POSTS_QUERY)
    return (
        <Fragment>
            <Grid columns={3}>
                <Grid.Row>
                    <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (
                        <h1>Loading posts...</h1>
                    ) : (
                        posts &&
                        posts.map((post) => (
                            <Grid.Column key={post.id}>
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
