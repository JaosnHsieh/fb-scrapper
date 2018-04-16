import { db } from "../../models";
import scrape from "../../../scrape";
const user = (req, res) => {
  if (!req.params.username) {
    return res.sendStatus(400).send("wrong data");
  }
  db.User.findOne({
    where: {
      $or: [
        {
          userId: { $eq: req.params.username }
        },
        {
          userName: { $eq: req.params.username }
        }
      ]
    },
    include: [{ model: db.Friend }]
  })
    .then(user => {
      if (user) {
        res.json(user);
        return Promise.reject("promise chain stopped due to has user");
      }
      return scrape(req.params.username);
    })
    .then(({ id, name, userName, firendList }) => {
      return db.User.create(
        {
          UserId: id,
          UserName: userName,
          Name: name,
          Friends: firendList.map(ele => {
            return { friendId: ele.id, UserId: id, Name: ele.name };
          })
        },
        {
          include: [db.Friend]
        }
      );
    })
    .then(() => {
      return res.json({ id, name, userName, firendList });
    })
    .catch(err => {
      console.log(err);
    });
};

export default user;
