import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image } from "semantic-ui-react";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";
import '../css/Home.css'
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

import {FETCH_POSTS_QUERY} from '../utils/queries'

const Home = () => {
  const {user}=useContext(AuthContext)
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
      {user && (
          <Grid.Column>
            <PostForm/>
          </Grid.Column>
        )}
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

export default Home;
