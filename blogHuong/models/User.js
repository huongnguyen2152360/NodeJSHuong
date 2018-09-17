import Sequelize from "sequelize";
import { sequelize } from "../databases/database";
import Post from '../models/Post';

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    avatar: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

User.hasMany(Post, {foreignKey: 'author', sourceKey: 'username'});
Post.belongsTo(User, {foreignKey: 'author', targetKey: 'username'});
export default User;
