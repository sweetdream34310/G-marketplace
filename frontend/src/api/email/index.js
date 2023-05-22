import axios from "axios";
import { outstandingActivitySendEmail } from "./outstandingAcitivity";

const sendEmail = async (senderName, senderEmail, targetEmail, password) => {
  // console.log(senderEmail)
  try {
    const res = await axios.post("api/email/send", {
      senderName: senderName,
      senderEmail: senderEmail,
      targetEmail: targetEmail,
      password: password,
    });
    return res.data;
  } catch (error) {
    return 500;
  }
};

export { sendEmail, outstandingActivitySendEmail };
