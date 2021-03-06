import Post from "../models/Post";
import User from "../models/User";

// Tim tat ca bai viet
export const allPostsInDB = async params => {
  const { offset } = params;
  try {
    const findAllPosts = await Post.findAll({
      limit: 20,
      offset: offset ? offset * 20 : 0,
      order: [["id", "DESC"]],
      // attributes: ['title','content','tags','author','createdAt','updatedAt'],
      required: true,
      include: [
        {
          model: User,
          attributes: ["email", "avatar"], // Lay avatar cua username tu model User
          required: true
        }
      ]
    });
    return findAllPosts;
  } catch (error) {
    throw error;
  }
};

// All posts by username
export const allPostsByUsername = async (query, session) => {
  // console.log(session)
  const { offset } = query;
  const { email } = session;
  try {
    const findPostByUsername = await Post.findAll({
      limit: 20,
      offset: offset ? offset * 20 : 0,
      where: {
        author: email
      },
      order: [["id", "DESC"]]
    });
    return findPostByUsername;
  } catch (error) {
    throw error;
  }
};

// GET POST BY ID
export const getPostByID = async params => {
  const { id } = params;
  try {
    const findPostByID = await Post.findOne({
      where: {
        id
      },
      include: [
        {
          model: User,
          attributes: ['email','avatar'], // Lay avatar cua username tu model User
          required: true
        }
      ]
    },
    );
    return findPostByID;
  } catch (error) {
    throw error;
  }
};

// CREATE NEW POST
export const createNewPost = async params => {
  const { title, content, tags, author } = params;
  try {
    const newPost = await Post.create(
      {
        title,
        content,
        tags,
        author
      },
      {
        fields: ["title", "content", "tags", "author"]
      }
    );
    return newPost;
  } catch (error) {
    throw error;
  }
};

// EDIT POST
export const editPost = async params => {
  const { id, title, content, tags, author } = params;
  try {
    const postEdited = await Post.update(
      {
        title,
        content,
        tags,
        author
      },
      {
        where: {
          id
        }
      }
    );
    return postEdited;
  } catch (error) {
    throw error;
  }
};

// DELETE POST
export const deletePost = async params => {
  const { id, title, content, tags, author } = params;
  console.log(`id :${id}`)
  try {
    const postDeleted = await Post.destroy({
      where: {
        id
      }
    });
    return postDeleted;
  } catch (error) {
    throw error;
  }
};
