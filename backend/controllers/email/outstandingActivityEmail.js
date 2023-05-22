const { Sender } = require("node-mailjet");
const {
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY,
  SENDER_EMAIL,
  BASECLIENTURL,
} = require("../../constants");

const mailjet = require("node-mailjet").apiConnect(
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
);

const User = require("../../models/User");
const Role = require("../../models/Role");

const outstandingAcitivity = async (req, res) => {
  const data = req.body;
  const roleNames = [];
  if (data.length == 0) {
    console.log("no data");
  } else {
    const fromEmail = data[0].fromEmail;

    let stringData = "";
    let count = 0;

    data.map((item) => {
      let temp = "";
      if (item.action == "price") temp = "retail price";
      else if (item.action == "business") temp = "business price";
      const stringItem = `<div style="font-size: 20px;font-family: arial;">
        ${temp} of ${item.sku} on ${item.content} : from ${item.currentPrice} to ${item.suggestedPrice}
        </div>`;
      stringData += stringItem;
    });

    const roles = await Role.find();
    const users = await User.find();

    roles.map((item) => {
      if (item.permissions.includes(5)) roleNames.push(item.rolename);
    });

    const priceAuthPermittedUsers = users.filter((user) =>
      roleNames.includes(user.role)
    );

    priceAuthPermittedUsers.map(async (item) => {
      try {
        const request = await mailjet
          .post("send", { version: "v3.1" })
          .request({
            Messages: [
              {
                From: {
                  Email: SENDER_EMAIL,
                  Name: fromEmail,
                },
                To: [
                  {
                    Email: item.email,
                  },
                ],
                Subject: `Outstanding Price Activity from ${fromEmail}`,
                HTMLPart: `<html>
                  <head>
                    <title></title>
                  </head>
                  <body>
                    <div class="container" style="height:auto;width:900px;border:1px solid silver;margin:0 auto">
                      <header style="height:150px;background-image: url('https://i.imgur.com/a1ItuWs.jpg');">
                          <center>
                            <br>
                            <span style="font-size:35px;color:white;font-weight: bold;font-family: arial;margin-top:20px">Outstanding Price Activity</span>
                            <br>
                            <span style="font-size: 25px;color: white">from ${fromEmail}</span>
                          </center>
                      </header>
                      <section style="height: auto;background: #ecfaff">
                        <center>
                          ${stringData}
                        </center>
                      </section>
                      <footer style="height:100px;background: #ecfaff;text-align: center;font-family: arial;">
                        <center>
                          <br>
                          <div style="height: 40px; width: 150px; background-color: SlateBlue;">
                            <div style="height: 10px"/>  
                            <a style="font-size: 15px; font-family: arial; color: white" href = ${BASECLIENTURL}>Amazon Pricing</a>
                          </div>
                        </center>
                      </footer>
                    </div>
                  </body>
                </html>`,
              },
            ],
          });

        count++;
        if (count == priceAuthPermittedUsers.length) {
          res.json(request.response.status);
        }
        // res.json(200)
      } catch (error) {
        console.log(error);
      }
    });
  }
};

const outstandingAcitivityFunction = async (fromEmail, data) => {
  const roleNames = [];

  let stringData = "";

  let count = 0;

  data.map((item) => {
    let temp = "";
    if (item.message == "check") {
      if (item.action == "retail") {
        temp = "retail price";
      } else if (item.action == "business") {
        temp = "business price";
      }
    }
    const stringItem = `<div style="font-size: 20px;font-family: arial;">
      ${temp} of ${item.sku} on ${item.Marketplace}
      </div>`;
    stringData += stringItem;
  });

  const roles = await Role.find();
  const users = await User.find();

  roles.map((item) => {
    if (item.permissions.includes(5)) roleNames.push(item.rolename);
  });

  const priceAuthPermittedUsers = users.filter((user) =>
    roleNames.includes(user.role)
  );

  priceAuthPermittedUsers.map(async (item) => {
    try {
      const request = await mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: SENDER_EMAIL,
              Name: fromEmail,
            },
            To: [
              {
                Email: item.email,
              },
            ],
            Subject: `Outstanding Price Activity from ${fromEmail}`,
            HTMLPart: `<html>
                <head>
                  <title></title>
                </head>
                <body>
                  <div class="container" style="height:auto;width:900px;border:1px solid silver;margin:0 auto">
                    <header style="height:150px;background-image: url('https://i.imgur.com/a1ItuWs.jpg');">
                        <center>
                          <br>
                          <span style="font-size:35px;color:white;font-weight: bold;font-family: arial;margin-top:20px">Outstanding Price Activity</span>
                          <br>
                          <span style="font-size: 25px;color: white">from ${fromEmail}</span>
                        </center>
                    </header>
                    <section style="height: auto;background: #ecfaff">
                      <center>
                        ${stringData}
                      </center>
                    </section>
                    <footer style="height:100px;background: #ecfaff;text-align: center;font-family: arial;">
                      <center>
                        <br>
                        <div style="height: 40px; width: 150px; background-color: SlateBlue;">
                          <div style="height: 10px"/>  
                          <a style="font-size: 15px; font-family: arial; color: white" href = ${BASECLIENTURL}>Amazon Pricing</a>
                        </div>
                      </center>
                    </footer>
                  </div>
                </body>
              </html>`,
          },
        ],
      });

      // res.json(200)
    } catch (error) {
      console.log(error);
      return false;
    }
    count++;
    if (count == priceAuthPermittedUsers.length) {
      return true;
    }
  });
};

module.exports = {
  outstandingAcitivity,
  outstandingAcitivityFunction,
};
