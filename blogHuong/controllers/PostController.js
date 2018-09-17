import Post from "../models/Post";

// Tim tat ca bai viet
export const allPostsInDB = async params => {
  const {offset} = params;
 
  try {
    const findAllPosts = await Post.findAll({
      limit: 20,
      offset: offset ? offset * 20 : 0,
      order: [['id','DESC']],
      attributes: ['title','content','tags','author','createdAt','updatedAt'],
      required: true,
      include: [
        {
          model: User,
          attributes: ['username','avatar'], // Lay avatar cua username tu model User
          required: true
        }
      ]
    });
    return findAllPosts;
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
