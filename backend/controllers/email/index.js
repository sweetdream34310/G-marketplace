const { Sender } = require("node-mailjet");
const { EMAIL_API_KEY, EMAIL_SECRET_KEY, SENDER_EMAIL, BASECLIENTURL } = require("../../constants");

const mailjet = require("node-mailjet").apiConnect(
  EMAIL_API_KEY,
  EMAIL_SECRET_KEY
);

const {outstandingAcitivity, outstandingAcitivityFunction} = require('./outstandingActivityEmail')

const sendEmail = async (req, res) => {

  const { senderName, senderEmail, targetEmail, password } = req.body;

  try {

    const request = await mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": SENDER_EMAIL,
              "Name": senderName
            },
            "To": [
              {
                "Email": targetEmail,
              }
            ],
            "Subject": senderName + " invited you on Amazon Pricing.",
            "HTMLPart":
              `<html>
                <head>
                  <title></title>
                </head>
                <body>
                  <div class="container" style="height:500px;width:450px;border:1px solid silver;margin:0 auto">
                    <header style="height:200px;background-image: url('https://i.imgur.com/a1ItuWs.jpg');">
                        <center>
                          <br>
                          <span style="font-size:55px;color:white;font-weight: bold;font-family: arial;margin-top:20px">Hello</span>
                          <br>
                          <span style="font-size: 35px;color: white">user</span>
                        </center>
                    </header>
                    <section style="height: 280px;background: #ecfaff">
                      <center>
                        <br>
                        <span style="font-size: 30px;font-family: arial;">Your password is ${password}</span>
                        <br><br>
                        <span style="font-size: 20px;font-family: arial;">After login, please change the account with your username and password</span>
                        <br><br>
                        <span style="font-size: 20px;font-family: arial;">If you have any question, contact to ${senderEmail}</span>
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
              </html>`
          }
        ]
      })

    res.json(request.response.status);
    // res.json(200)
  } catch (error) {
    res.json('Error occured.');
  }
};


function randomCharacterGenerator(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const sendNewPassword = async (email) => {

  let newPassword = randomCharacterGenerator(10);

  try {
    const request = await mailjet
      .post("send", { 'version': 'v3.1' })
      .request({
        "Messages": [
          {
            "From": {
              "Email": SENDER_EMAIL,
              "Name": 'Ridgewood Global Tool Suite'
            },
            "To": [
              {
                "Email": email,
              }
            ],
            "Subject": 'Ridgewood Global Tool Suite sent you a new password.',
            "TextPart": `New password : ${newPassword}`
          }
        ]
      })

    return newPassword;
  } catch (error) {
    return false;
  }
}

module.exports = {
  sendEmail,
  sendNewPassword,
  outstandingAcitivity,
  outstandingAcitivityFunction
};
