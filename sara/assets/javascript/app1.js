
    var config = {
        apiKey: "AIzaSyC80yUq1_n29oubnc_nisGuDUUzYKhuLO8",
        authDomain: "master-d1d42.firebaseapp.com",
        databaseURL: "https://master-d1d42.firebaseio.com",
        projectId: "master-d1d42",
        storageBucket: "master-d1d42.appspot.com",
        messagingSenderId: "1005294506678"
      };
  firebase.initializeApp(config);
  var database = firebase.database();
function checkEmail(emailStr){
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (filter.test(emailStr))
            testresults = true;
        else {
            alert("Please input a valid email address!");
            testresults = false;
        }
        return (testresults);
    }
   $(document).ready(function(){
    $("#SignUp").hide();
    firebase.auth().onAuthStateChanged(function(firebaseUser){
       
        
        if(firebaseUser){
           
            console.log(firebaseUser.email);
            
                $("#login").hide();
                $("#SignUp").hide();
                $("#showLogIn").hide();
               
                $("#userStatus").text("*****Sign in "+ firebaseUser.email );
                
        }
        else{
            console.log('not logged in');
            $("#userStatus").text("not sign in");
           // $("#showSignup").show();
                $("#login").show();
              ///  $("#showLogIn").show();
                $("#SignUp").show();
            
        }
    });
   });
  $("#login").on("click",function(){
    //$(this).disable = true;
    var email = $("#usernameLogin").val().trim(); 
    var pass1 = $("#passwordLogin").val().trim();
   // console.log(pass1);
    var pass = pass1.toString(); 
    
      firebase.auth().signInWithEmailAndPassword(email,pass).then(function(user){
        //   console.log(JSON.stringify(user));
        console.log(user.email);
      }).catch(function(error){
          if(error.code == "auth/invalid-email"){
            alert("wrong pass or username");
          }
          if(error.code == "auth/wrong-password"){
                alert("wrong pass or username");
          }
          
        //   console.log(error.code);
        //   console.log(error.message);
      });
  });
  $("#SignUp").on("click",function(){
    //$(this).disable = true;
   // var email =checkEmail($("#usernameLogin").val().trim());
    // console.log(email+":"+ checkEmail(email));
    if(checkEmail($("#usernameLogin").val().trim())) {
        var email =$("#usernameLogin").val().trim();
    }
    if($("#passwordLogin").val().trim().length >6){
        var password = $("#passwordLogin").val().trim();
        signUp(email,password);
    }
    if($("#passwordLogin").val().trim().length <=6){
    
    alert("You need to insert");
    
    }
    
  });
  $("#LogOut").on("click",function(){
    firebase.auth().signOut();
   // $(this).disable = true;
   // $("#showSignup").hide();
                $("#login").show();
                $("#SignUp").show();
  });
function signUp(email,password){
  firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
    useruid = user.uid;
    console.log(email, " ",password," ", useruid );
    firebase.database().ref('/Users/'+useruid).push({
       // username : username,
        email : email,
         password : password
        
    }).catch(function(error){
        if(error.code.toString() == "auth/weak-password"){
            alert("Your password is so weak. Please, select another password.");
        }
        if(error.code == "auth/email-already-in-use"){
            alert("this email is already in use by another user. Please, select another email.");
        }
        
        console.log("SALAM:" ,error.message);
        console.log(error.code);
    }).then(function(){
        location.reload();
    });
});
//location.reload();
}
