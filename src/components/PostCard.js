import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import MyPopup from '../utils/MyPopup'

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
                <MyPopup content="Comment on post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
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
