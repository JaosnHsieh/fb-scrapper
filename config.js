export default {
  fb: {
    username: "YOURFBACCOUNT@xxx.xx",
    password: "PASSWORD"
  },
  db: {
    username: "root",
    password: "00000000",
    database: "fb",
    options: {
      host: "127.0.0.1",
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 10000
      },
      define: {
        paranoid: true,
        freezeTableName: true,
        charset: "utf8",
        collate: "utf8_unicode_ci"
      },
      dialect: "mysql",
      logging: console.log,
      timezone: "+08:00"
    },
    resetDB: false
  }
};
