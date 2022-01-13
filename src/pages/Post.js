import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { Grid } from 'semantic-ui-react'

const FETCH_POST_QUERY = gql`
    query ($postId: ID!) {
        getPost(postId: $postId) {
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
const Post = () => {
    const params = useParams()
    const postId = params.postId
    const {
        data: { getPost },
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    })
    let postMarkup
    if (!getPost) {
        postMarkup = <p>Loading post..</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost
        postMarkup = (
            <Grid>
                <Grid.Row></Grid.Row>
            </Grid>
        )
    }
}

export default Post
