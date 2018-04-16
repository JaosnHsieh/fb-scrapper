export default (sequelize, DataTypes) => {
  const Friend = sequelize.define(
    "Friend",
    {
      friendId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      UserId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: false,
      comment: "使用者的朋友"
    }
  );

  return Friend;
};
