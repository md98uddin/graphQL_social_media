const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth=require("../../utils/check-auth")


module.exports={
    Query: {
        async getPosts() {
            try{
                const posts=await Post.find().sort({createdAt:-1});
                return posts;
            } catch(error){
                throw new Error(err)
            }
        },
        async getPost(_,{postId}){
            try {
                const post=await Post.findById(postId)

                if(post){
                    return post;
                } else {
                    throw new Error("Post not found")
                }

            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation:{
        async createPost(_, {body}, context){
            const user=checkAuth(context)

            console.log(user)

            if(body.trim()==="")
                throw new Error("body must not be empty")

            const newPost= new Post({
                body,
                user:user.indexOf,
                username:user.username,
                createdAt:new Date().toISOString()
            })

            const post = await newPost.save()
            context.pubsub.publish('NEW_POST', {
                newPost:post
            })

            return post;
        },
        async deletePost(_, {postId}, context){
            const user=checkAuth(context)

            try {
                const post=await Post.findById(postId)

                if(user.username===post.username){
                    await post.delete();
                    return "Post deleted"
                } else {
                    throw new AuthenticationError("Action not allowed")
                }
            } catch (error) {
                
            }
        }
    },
    Subscription:{
        newPost:{
            subscribe(_,__, {pubsub}){
                return pubsub.asyncIterator('NEW_POST');
            }
        }
    }
 }