import User from "../models/User";
import { isRegExp } from "util";
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const GithubStrategy = require("passport-github").Strategy;
import bcrypt from "bcrypt";
const keys = require("./keys");
import * as Configs from "../configs/config";
import Init from "../Utils/Init";
// Tim tat ca user
export const listAllUserInDB = async params => {
  const allUsersInDB = await User.findAll({
    order: ["id"]
  });
  try {
    return allUsersInDB;
  } catch (error) {
    throw error;
  }
};

// REGISTER
export const createNewUser = async params => {
  const { email, password, avatar } = params;
  try {
    const hash = await bcrypt.hash(password, Configs.saltRounds);
    const newUser = await User.create(
      {
        email,
        password: hash,
        avatar
      },
      {
        fields: ["email", "password", "avatar"]
      }
    );
    return newUser;
  } catch (error) {
    throw error;
  }
};

//LOGIN
export const userLogin = async params => {
  const { email, password } = params;
  try {
    const userInDB = await User.findOne({
      where: {
        email
      }
    });
    if (!email) {
      return;
    } else {
      const compare = await bcrypt.compareSync(
				password,
				userInDB.password
      );
      if (compare) {
        return userInDB;
      } else {
        return;
      }
    }
  } catch (error) {
    throw error;
  }
};

//              CONNECT WITH FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      // optins for fb strategy
      clientID: keys.facebook.clientID,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: keys.facebook.callbackURLLocal,
      profileFields: keys.facebook.profileFields
    },
    async function(accessToken, refreshToken, profile, done) {
      const email = profile.emails[0] ? profile.emails[0].value : profile.id;
      const password = `${profile.id}password`;
      const avatar = profile.photos[0]
        ? profile.photos[0].value
        : "https://i.redd.it/qh713wbo4r8y.jpg";

      try {
        const findUserInDB = await User.findOne({
          where: {
            email
          }
        });
        if (findUserInDB) {
          done(null, findUserInDB);
        } else {
          const newUserFromFB = await User.create(
            {
              email,
              password,
              avatar
            },
            {
              fields: ["email", "password", "avatar"]
            }
          );
          done(null, newUserFromFB);
        }
      } catch (error) {
        throw error;
      }
      // console.log(profile);
      // console.log(email);
    }
  )
);

//              CONNECT WITH GOOGLE
passport.use(
  new GoogleStrategy(
    {
      // options for gg strategy
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/users/google/redirect"
    },
    async function(accessToken, refreshToken, profile, done) {
      const email = profile.emails[0] ? profile.emails[0].value : profile.id;
      const password = `${profile.id}password`;
      const avatar = profile.photos[0]
        ? profile.photos[0].value
        : "https://i.redd.it/qh713wbo4r8y.jpg";

      try {
        const findUserInDB = await User.findOne({
          where: {
            email
          }
        });
        if (findUserInDB) {
          //  console.log('findUserInDB :', findUserInDB);
          done(null, findUserInDB);
        } else {
          const createNewUser = await User.create(
            {
              email,
              password,
              avatar
            },
            {
              fields: ["email", "password", "avatar"]
            }
          );
          // console.log('createNewUser :', createNewUser);
          done(null, createNewUser);
        }
      } catch (error) {
        throw error;
      }
      // passport callback function
      // console.log("passport callback function fired");
      // console.log(profile);
    }
  )
);

//           CONNECT WITH GITHUB
passport.use(
  new GithubStrategy(
    {
      //options for github strategy
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
      callbackURL: keys.github.callbackURLLocal,
      profileFields: keys.github.profileFields
    },
    async function(accessToken, refreshToken, profile, done) {
      const email = profile.email;
      const password = `${profile.id}password`;
      const avatar = profile.photos[0]
        ? profile.photos[0].value
        : "https://i.redd.it/qh713wbo4r8y.jpg";
      try {
        const findUserInDB = await User.findOne({
          where: {
            email
          }
        });
        if (findUserInDB) {
          done(null, findUserInDB);
        } else {
          const newUserFromGithub = await User.create(
            {
              email,
              password,
              avatar
            },
            {
              fields: ["email", "password", "avatar"]
            }
          );
          done(null, newUserFromGithub);
        }
      } catch (error) {
        throw error;
      }
    }
  )
);

Init();

//                EDIT PROFILE
export const editUserProfile = async params => {
  const { email, avatar, password } = params;
  // console.log('password :', password);
  try {
    // Tim info theo email
    const hash = await bcrypt.hash(password, Configs.saltRounds);
    const findUserInDB = await User.findOne({
      where: {
        email
      }
    });
    const compare = await bcrypt.compareSync(
      password,
      findUserInDB.password
    );
    if(!findUserInDB){
      return
    }
    if (!compare) {
      if (password && avatar) {
        const updateUserProfile = await User.update(
          {
            password: hash,
            avatar
          },
          {
            where: {
              email
            }
          }
        );
        return updateUserProfile;
      } else if (password && !avatar) {
        const updateUserProfile = await User.update(
          {
            password: hash
          },
          {
            where: {
              email
            }
          }
        );
        return updateUserProfile;
      }
      else if (!password && avatar) {
        //Neu k dien password thi chi update avatar thoi
        const updateUserProfile = await User.update(
          {
            avatar
          },
          {
            where: {
              email
            }
          }
        );
        return updateUserProfile;
      } else if (!password && !avatar) {
        return;
      }
    } 
    return;
  } catch (error) {
    throw error;
  }
};
