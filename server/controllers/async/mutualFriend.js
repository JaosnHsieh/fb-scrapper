import { db, sequelize } from "../../models";
import scrape from "../../../scrape";
const mutualFriends = async (req, res) => {
  try {
    const { userId, friendUserId } = req.params;
    if (!userId || !friendUserId) {
      return res.sendStatus(400).send("wrong data");
    }
    /*
      intend to generate sql as below :
        SELECT name,friendId,count(friendId)
        FROM fb.friend
        where UserId = "528580612" OR UserId = "625100033"
        group by friendId
        Having count(friendId) > 1
    */

    let mutualFriends = await db.Friend.findAll({
      group: ["friendId"],
      attributes: [
        "name",
        "friendId",
        [sequelize.fn("COUNT", "friendId"), "friendIdCount"]
      ],
      having: { friendIdCount: { $gt: 1 } },
      where: { $or: [{ userId: friendUserId }, { userId: userId }] }
    });
    mutualFriends = mutualFriends.map(ele => {
      return {
        name: ele.get("name"),
        id: ele.get("friendId")
      };
    });
    return res.json({
      count: mutualFriends.length,
      list: mutualFriends
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).send("error");
  }
};

export default mutualFriends;
