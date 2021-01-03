import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image } from "semantic-ui-react";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";
import '../css/Home.css'

const Home = () => {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );
  if (posts) {
    console.log(posts);
  }
  return (
    <Grid columns={3} className="ui container">
      <Grid.Row >Recent Post</Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likeCount
      likes {
        id
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
`;

export default Home;
