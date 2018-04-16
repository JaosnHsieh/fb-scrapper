import { db } from "../../models";
import scrape from "../../../scrape";
const user = async (req, res) => {
  try {
    if (!req.params.username) {
      return res.sendStatus(301).send("/api/user/:username");
    }
    let user = await db.User.findOne({
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
    });
    if (user) {
      return res.json(user);
    }

    let { id, name, userName, firendList } = await scrape(req.params.username);

    await db.User.create(
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
    return res.json({ id, name, userName, firendList });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).send("error");
  }
};

export default user;
