const Notification = require("../../models/Notification");
const User = require("../../models/User");
const Role = require("../../models/Role");

const getNotification = async (req, res) => {
  let count = 0;
  try {
    const { email } = req.body;
    const notification = await Notification.findOne({ email: email });
    if (!notification) {
      return res.json({
        message: "no",
      });
    } else {
      let data = [];
      notification.notificationList.map(async (item, idx) => {
        const user = await User.findOne({ email: item.fromEmail });

        const dataJson = {
          email: item.fromEmail,
          username: user.username,
          action: item.action,
          content: item.content,
          sku: item.sku,
          currentPrice: item.currentPrice,
          suggestedPrice: item.suggestedPrice,
        };

        data.push(dataJson);
        count++;
        if (count == notification.notificationList.length) {
          return res.json({
            message: "success",
            data: data,
          });
        }
      });
    }
  } catch (error) {
    res.json({
      message: "error",
      data: error,
    });
  }
};

const putNotification = async (req, res) => {
  try {
    const data = req.body;
    const users = await User.find();

    const roles = await Role.find();

    const roleNames = [];

    let count = 0;

    roles.map((item) => {
      if (item.permissions.includes(5)) roleNames.push(item.rolename);
    });

    const priceAuthPermittedUsers = users.filter((user) =>
      roleNames.includes(user.role)
    );

    priceAuthPermittedUsers.map(async (item, idx) => {
      const notification = await Notification.findOne({ email: item.email });

      if (!notification) {
        const newNotification = new Notification({
          email: item.email,
          notificationList: data,
        });

        await newNotification.save();

        return res.json({
          message: "success",
        });
      } else {
        await data.map((dataItem) => {
          const indexDB = notification.notificationList.findIndex(
            (e) =>
              e.content == dataItem.content &&
              e.fromEmail == dataItem.fromEmail &&
              e.sku == dataItem.sku &&
              e.action == dataItem.action
          );

          if (indexDB == -1) {
            notification.notificationList.push(dataItem);
          } else {
            notification.notificationList[indexDB].suggestedPrice =
              dataItem.suggestedPrice;
          }
        });

        await notification.save();
        count++;

        if (count == priceAuthPermittedUsers.length) {
          return res.json({
            message: "success",
          });
        }
      }
    });
  } catch (error) {
    return res.json({
      message: "error",
      data: error,
    });
  }
};

const putNotificationFunction = async (
  fromEmail,
  action,
  content,
  sku,
  currentPrice,
  suggestedPrice
) => {
  try {
    const users = await User.find();

    const roles = await Role.find();

    const roleNames = [];

    roles.map((item) => {
      if (item.permissions.includes(5)) roleNames.push(item.rolename);
    });

    const priceAuthPermittedUsers = users.filter((user) =>
      roleNames.includes(user.role)
    );

    priceAuthPermittedUsers.map(async (item) => {
      const notification = await Notification.findOne({ email: item.email });

      if (!notification) {
        const newNotification = new Notification({
          email: item.email,
          notificationList: [
            {
              fromEmail: fromEmail,
              action: action,
              content: content,
              sku: sku,
              currentPrice: currentPrice,
              suggestedPrice: suggestedPrice,
            },
          ],
        });

        await newNotification.save();
      } else {
        const index = notification.notificationList.findIndex(
          (e) =>
            e.action == action &&
            e.content == content &&
            e.fromEmail == fromEmail &&
            e.sku == sku
        );

        const notificationList = {
          fromEmail: fromEmail,
          action: action,
          content: content,
          sku: sku,
          currentPrice: currentPrice,
          suggestedPrice: suggestedPrice,
        };

        if (index == -1) {
          notification.notificationList.push(notificationList);
          await notification.save();
        } else {
          notification.notificationList[index] = notificationList;
          await notification.save();
        }
      }
    });

    return true;
  } catch (error) {
    return false;
  }
};

const putNotificationToUSer = async (
  email,
  fromEmail,
  action,
  content,
  sku,
  currentPrice,
  suggestedPrice
) => {
  try {
    const notification = await Notification.findOne({ email: email });

    console.log(email);
    if (!notification) {
      const newNotification = new Notification({
        email: email,
        notificationList: [
          {
            fromEmail: fromEmail,
            action: action,
            content: content,
            sku: sku,
            currentPrice: currentPrice,
            suggestedPrice: suggestedPrice,
          },
        ],
      });

      await newNotification.save();
    } else {
      const index = notification.notificationList.findIndex(
        (item) =>
          item.action == action &&
          item.content == content &&
          item.fromEmail == fromEmail &&
          item.sku == sku
      );

      const notificationList = {
        fromEmail: fromEmail,
        action: action,
        content: content,
        sku: sku,
        currentPrice: currentPrice,
        suggestedPrice: suggestedPrice,
      };

      if (index == -1) {
        notification.notificationList.push(notificationList);
        await notification.save();
      } else {
        notification.notificationList[index] = notificationList;
        await notification.save();
      }
    }
    // })

    return true;
  } catch (error) {
    return false;
  }
};

const deleteNotificationArray = async (req, res) => {
  try {
    const data = req.body;

    let count = 0;

    const reData = data.reduce(
      (prev, cur) => {
        prev.sku.push(cur.sku);
        prev.content.push(cur.content);
        return prev;
      },
      { sku: [], content: [] }
    );

    const condition = {
      "notificationList.sku": { $in: reData.sku },
      "notificationList.content": { $in: reData.content },
    };
    const notifications = await Notification.find(condition);

    await Promise.all(
      notifications.map((item) => {
        data.map((dataItem) => {
          const index = item.notificationList.findIndex(
            (listItem) =>
              listItem.sku == dataItem.sku &&
              listItem.content == dataItem.content
          );
          item.notificationList.splice(index, 1);
        });
        item.save();
      })
    );

    return res.json({
      message: "success",
    });
  } catch (error) {
    return res.json({
      message: "error",
      data: error,
    });
  }
};

const putNotificationArrayToUSer = async (data) => {
  data.map(async (item) => {
    const notification = await Notification.findOne({ email: item.email });

    if (!notification) {
      let temp = [];
      temp.push(item);
      const newNotification = new Notification({
        email: item,
        notificationList: temp,
      });

      await newNotification.save();
    } else {
      const index = notification.notificationList.findIndex(
        (dbItem) => dbItem.sku === item.sku && dbItem.content === item.content
      );

      console.log(index);
      if (index == -1) {
        notification.notificationList.push({
          action: item.action,
          fromEmail: item.fromEmail,
          content: item.content,
          sku: item.sku,
          currentPrice: item.currentPrice,
          suggestedPrice: item.suggestedPrice,
        });
      } else {
        notification.notificationList[index].action = item.action;
        notification.notificationList[index].fromEmail = item.fromEmail;
      }

      await notification.save();
    }

    return true;
  });
};

const deleteNotification = async (req, res) => {
  try {
    const {
      email,
      fromEmail,
      action,
      content,
      sku,
      currentPrice,
      suggestedPrice,
    } = req.body;

    const condition = {
      "notificationList.sku": { $eq: sku },
      "notificationList.content": { $eq: content },
    };

    const notifications = await Notification.find(condition);


    notifications.map(async (item) => {
      const index = item.notificationList.findIndex(
        (listItem) => listItem.sku == sku && listItem.content == content
      );
      item.notificationList.splice(index, 1);
      await item.save();
    });

    console.log(notifications, '--------------')

    return res.json({
      message: "success",
    });
    // }
  } catch (error) {
    return res.json({
      message: "error",
      data: error,
    });
  }
};

// const deleteAllnotification = async () => {
//   await Notification.remove();
// }

// deleteAllnotification()

module.exports = {
  getNotification,
  putNotification,
  deleteNotification,
  deleteNotificationArray,
  putNotificationFunction,
};
