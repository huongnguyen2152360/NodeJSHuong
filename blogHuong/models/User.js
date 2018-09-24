import Sequelize from "sequelize";
import { sequelize } from "../databases/database";
import Post from "../models/Post";

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    },
    key:{
      type:Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);

User.hasMany(Post, { foreignKey: "author", sourceKey: "email" });
Post.belongsTo(User, { foreignKey: "author", targetKey: "email" });
export default User;
