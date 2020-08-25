exports.handler = function(context, event, callback) {
 const client = context.getTwilioClient();
 
 const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
    response.appendHeader('Content-Type', 'application/json');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
 
 client.conferences(event.taskSid)
     .participants
     .create({
         to: event.workerIdentity,
         from : "+61409260337",
         muted: true
     })
     .then(participant => {
         response.setStatusCode(200);
            response.setBody({participant});
         callback(null, response);
     })
     .catch(err => {
         console.log(err);
         response.setStatusCode(500);
            response.setBody({err});
         callback(null, response);
     });
};