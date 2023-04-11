import connectMongo from '../../database/connection'
import CommentModel from '../../database/models/Comment'
import PostModel from '../../database/models/Post'

export const createComment = async (data: {
  text: string
  postId: string
  userId: string
}) => {
  try {
    const { text, postId, userId } = data
    await connectMongo()
    const relatedPost = await PostModel.findById(postId)
    const comment = await CommentModel.create({
      text,
      owner: userId,
      relatedPost: postId,
    }).then((comment) => comment.populate('owner', '-passwordHash'))
    relatedPost?.comments.push(comment._id)
    relatedPost?.save()
    return { comment }
  } catch (error) {
    return { error: { status: 500, message: 'Failed to create comment' } }
  }
}

export const deleteComment = async (data: {
  commentId: string
  userId: string
}) => {
  try {
    const { commentId, userId } = data
    await connectMongo()
    const comment = await CommentModel.findById(commentId).populate(
      `relatedPost`
    )
    if (!comment)
      return { error: { status: 404, message: 'Comment not found' } }
    //@ts-ignore
    const canDelete = comment.owner.toString() === userId || comment.relatedPost.owner._id.toString() === userId

    if (!canDelete) {
      return { error: { status: 401, message: 'No access' } }
    }
    await PostModel.findOneAndUpdate(
      { _id: comment.relatedPost },
      {
        $pull: { comments: commentId },
      },
      {
        new: true,
      }
    )

    await comment.remove()
    return { success: true }
  } catch (error) {
    console.log(error)
    return { error: { status: 500, message: 'Failed to delete comment' } }
  }
}
