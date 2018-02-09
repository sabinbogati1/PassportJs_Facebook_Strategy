var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
var axios = require("axios");


app.use(bodyParser.json());
app.use(session({
secret:"helloworld",
resave:true,
saveUninitialized:true
}));


var FACEBOOK_APP_ID="";//Required
var FACEBOOK_APP_SECRET="";//Required
var PROFILE;
var ACCESSTOKEN;
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://1b027788.ngrok.io/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {

    //console.log("Profile is: ", profile );
   // console.log("Access Token: ",accessToken );
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {

    //   return cb(err, user);
    // });
    // this.ACCESSTOKEN=accessToken;
    // this.PROFILE= profile.id


console.log(" Hi I am Above Axios...");
    axios.get(`https://graph.facebook.com/v2.8/${profile.id}/accounts?access_token=${accessToken}`)
    .then(fbRes=>{
        console.log(" I am inside axios then");
        console.log("facebook response is ##############################################33: ",fbRes);
        console.log("Paging is: ", fbRes.data);
    })
    .catch(err=>{
        console.log("###############################################################################################3");
        console.log("Error in facebook response ",err );
    })

  }
));

// app.get('/hello', (req, res) => {
//    console.log("################### ", req.user);
// });

app.get("/", passport.authenticate("facebook", {scope:["email",'publish_actions'," publish_pages", "manage_pages"]}));

app.get("/", function(req,res){
    res.send("hello world");
});



app.get("/auth/facebook/callback", passport.authenticate("facebook", function(req,res){

  // console.log("User is ######################################################################## :", req );

  //console.log("Hi I am in callback function");


}));


app.listen(5000);