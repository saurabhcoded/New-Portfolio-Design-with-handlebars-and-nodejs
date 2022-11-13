const sib = require("sib-api-v3-sdk");
const client = sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;
module.exports.sendEmailService = async function sendSibEmail(
  receiverEmail,
  subject,
  text
) {
  const tranEmailApi = new sib.TransactionalEmailsApi();
  const sender = {
    email: process.env.DEFAULT_EMAIL_SENDER || "saurabhcoded@gmail.com",
    name: process.env.DEFAULT_EMAIL_NAME || "saurabh coded",
  };
  const reciever = {
    email: receiverEmail,
  };
  return await tranEmailApi
    .sendTransacEmail({
      sender,
      to: [reciever],
      subject: subject,
      textContent: text,
      params: {
        role: "frontend",
      },
    })
    .then((res) => {
      console.log({
        message: `Email sent successfully with message ID ${res.messageId}`,
        Email: reciever,
        subject: subject,
        textContent: text,
      });
      return true;
    })
    .catch((err) => {
      console.log({ message: "Email Sending Error", error: err });
      return false;
    });
};
