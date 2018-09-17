import Sequelize from "sequelize";
import { sequelize } from "../databases/database";

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  tags: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  // Timestamps
  createdAt: {
    type: Sequelize.DATE,
    field: "createdat"
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: "updatedat"
  }
});

export default Post;
