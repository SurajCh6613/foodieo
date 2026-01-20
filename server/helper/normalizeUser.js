const normalizeUser = (user) => {
  user = user.toObject();
  delete user?.updatedAt;
  delete user?.createdAt;
  delete user?.isEmailVerified;
  delete user?.password;
  delete user?._id;
  delete user?.__v;
  return user;
};

export default normalizeUser;
