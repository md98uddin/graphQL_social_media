const { UserInputError, AuthenticationError } = require("apollo-server")
const Post=require("../../models/Post")
const checkAuth = require("../../utils/check-auth")

module.exports={
    Mutation: {
        createComment:async (_, {postId, body}, context) => {
            const user=checkAuth(context)

            if(body.trim()===""){
                throw new UserInputError("empty comments", {
                    errors: {
                        body:"comment body must not be empty"
                    }
                })
            }

            const post=await Post.findById(postId)

            if(post){
                post.comments.unshift({
                    body,
                    username:user.username,
                    createdAt:new Date().toISOString()
                })

                await post.save();

                return post;
            } else {
                throw new UserInputError("post not found")
            }
        },

        async deleteComment(_, {postId, commentId}, context){
            const {username}=checkAuth(context)

            const post=await Post.findById(postId)

            if(post){
                const commentIndex=post.comments.findIndex(c => c.id!==commentId)

                if(post.comments[commentIndex].username===username){
                    post.comments.splice(commentIndex, 1)

                    await post.save()

                    return post;
                } else {
                    throw new AuthenticationError("action not allowed")
                }
            } else {
                throw new Error("post not found")
            }
        },

        async likePost(_, {postId}, context){
            const {username}=checkAuth(context)

            const post=await Post.findById(postId)

            if(post){
                if(post.likes.find(like => like.username===username)){
                    post.likes=post.likes.filter(like=> like.username!==username)
                } else {
                    post.likes.push({
                        username,
                        createdAt:new Date().toISOString()
                    })
                }

                await post.save()

                return post
            }

            throw new UserInputError("post not found")
        }
    }
}