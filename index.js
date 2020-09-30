const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const name = req.body.inputName;
  const email = req.body.inputEmail;

  const lisID = "d92e99e469";

  client.setConfig({
    apiKey: "f5db5f33468d5cf6bc375b01543967c1-us17",
    server: "us17",
  });

  const run = async () => {
    try {
      const response = await client.lists.addListMember(lisID, {
        email_address: email,
        status: "subscribed"
      });

      if (response.status !== 200) {
        // an error occured
        throw new Error(response.title);
      } else {
        // success
        res.sendFile(__dirname + "/sucess.html");
      }
    } catch (err) {
      // redirect to another page
      console.log(`Error : ${err.message}`);
      res.sendFile(__dirname + "/fail.html");
    }
  };

  run();
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is Running on 3000 and heroku");
});
