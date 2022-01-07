import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PostCard = ({ post: { id, body, createdAt, username, likeCount, commentCount, likes } }) => {
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
                <Button as="div" labelPosition="right">
                    <Button color="teal" basic>
                        <Icon name="heart" />
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
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
