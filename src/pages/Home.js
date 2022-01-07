import React, { Fragment } from 'react'
import { useQuery, gql } from '@apollo/client'

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
    const { loading, data } = useQuery(FETCH_POSTS_QUERY)
    if (data) {
        console.log(data)
    }
    return <Fragment>Home</Fragment>
}

export default Home
