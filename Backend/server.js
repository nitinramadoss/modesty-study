const http = require('http');
const util = require("util");

const dialogflow = require('@google-cloud/dialogflow');
const sessionClient = new dialogflow.SessionsClient();

const port = 8080;

const server = http.createServer((req, res) => {
 
  //let path = url.parse(req.url, true);

  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, "OK");

  executeQueries("vinay-ovis", "1234", ["What's your name?"], "en");

  res.write("The response\n\n");
  //res.write(util.inspect(path.query) + "\n\n");
 
  res.end("End of message.");  
  
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

async function detectIntent(projectID, sessionID, query, contexts, languageCode) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectID, sessionID);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  if (contexts && contexts.length > 0) {
    request.queryParams = {
      contexts: contexts,
    };
  }

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}

async function executeQueries(projectId, sessionId, queries, languageCode) {
  let context;
  let intentResponse;
  for (const query of queries) {
    try {
      console.log(`Sending Query: ${query}`);
      intentResponse = await detectIntent(
        projectId,
        sessionId,
        query,
        context,
        languageCode
      );
      console.log('Detected intent');
      console.log(
        `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
      );
      // Use the context from this response for next queries
      context = intentResponse.queryResult.outputContexts;
    } catch (error) {
      console.log(error);
    }
  }
}

