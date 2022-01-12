import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

const PostCard = ({ post: { id, body, createdAt, username, likeCount, commentCount, likes } }) => {
    const { user } = useContext(AuthContext)
    return (
        <Card>
            <Card.Content>
                <Image floated="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
                    <Button color="blue" basic>
                        <Icon name="comment" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button as="div" color="red" floated="right" onClick={() => console.log('Delete Post')}>
                        <Icon name="trash" style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}
PostCard.propTypes = {
    post: PropTypes.object.isRequired,
}
PostCard.defaultProps = {
    post: {},
}
export default PostCard
