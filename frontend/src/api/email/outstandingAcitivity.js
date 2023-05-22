import axios from "axios";

const outstandingActivitySendEmail = async (
  groupForAuthorisation
) => {
    // console.log(senderEmail)
  try {
    const res = await axios.post("api/email/outstandingactivityemail", groupForAuthorisation);
    return res.data;
  } catch (error) {
    return 500;
  }
};

export { outstandingActivitySendEmail };
