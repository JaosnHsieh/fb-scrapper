export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: false,
      comment: "使用者"
    }
  );
  User.associate = models => {
    models.User.hasMany(models.Friend, {
      foreignKey: "UserId"
    });
  };

  return User;
};
