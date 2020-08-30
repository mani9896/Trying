const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const client = require("@mailchimp/mailchimp_marketing");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const name=req.body.inputName;
    const email=req.body.inputEmail;
   
console.log(name);

const lisID="d92e99e469";

client.setConfig({
  apiKey: "f5db5f33468d5cf6bc375b01543967c1-us17",
  server: "us17",
});
const run = async (a) => {

  const response = await client.lists.addListMember(lisID, {
    email_address: email,
    
    status: "subscribed",
  }
  );
 
};

run();

});
app.listen(process.env.PORT||3000,function()
{
    console.log("server is Running on 3000 and heroku");
});

// d92e99e469

// f5db5f33468d5cf6bc375b01543967c1-us17