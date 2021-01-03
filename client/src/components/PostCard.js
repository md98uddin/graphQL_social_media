import React from "react";
import { Card, Icon, Label, Image,Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard(props) {
  const {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
  } = props.post;

  function likePost(){
      console.log("liked post")
  }

  function commentPost(){
      console.log("commented")
  }

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button as='div' labelPosition='right' onClick={likePost}>
      <Button  icon basic>
        <Icon name='heart' color="teal"/>
      </Button>
      <Label as='a' basic pointing='left' color="teal">
        {likeCount}
      </Label>
    </Button>
    <Button as='div' labelPosition='right' onClick={commentPost}>
      <Button  icon basic>
        <Icon name='comment' color="blue" />
      </Button>
      <Label as='a' basic pointing='left' color="blue">
        {commentCount}
      </Label>
    </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
