import Nexmo from "nexmo";


export default function sendMessage(from, to, text) {
const nexmo = new Nexmo({
    apiKey: process.env.MESSAGEAPIKEY || 'fa53dacf',
    apiSecret: process.env.MESSAGEAPISECRET || 'Ge1bFD1Trhb9S7PM',
  });
  nexmo.message.sendSms(from, to, text, { type:'unicode' },
  (err, responseData) => {
    if(err){
      throw(err);
    }
    console.log('success')
  });
    return { success: responseData };
}
