<?php
 
if(isset($_POST['email'])) {
 
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "contact@ingson.net";
 
    $email_subject = "Ingson.net Contact Form";
 
     
 
     
 
    function died($error) {
 
        // your error code can go here
 
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
 
        echo "These errors appear below.<br /><br />";
 
        echo $error."<br /><br />";
 
        echo "Please go back and fix these errors.<br /><br />";
 
        die();
 
    }
 
     
 
    // validation expected data exists
 
    if(!isset($_POST['first_name']) ||
 
        !isset($_POST['last_name']) ||
 
        !isset($_POST['email']) ||
 
        !isset($_POST['telephone']) ||
 
        !isset($_POST['comments'])) {
 
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
 
    }
 
     
 
    $first_name = $_POST['first_name']; // required
 
    $last_name = $_POST['last_name']; // required
 
    $email_from = $_POST['email']; // required
 
    $telephone = $_POST['telephone']; // not required
 
    $comments = $_POST['comments']; // required
 
     
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
 
    $error_message .= 'The First Name you entered does not appear to be valid.<br />';
 
  }
 
  if(!preg_match($string_exp,$last_name)) {
 
    $error_message .= 'The Last Name you entered does not appear to be valid.<br />';
 
  }
 
  if(strlen($comments) < 2) {
 
    $error_message .= 'The Comments you entered do not appear to be valid.<br />';
 
  }
 
  if(strlen($error_message) > 0) {
 
    died($error_message);
 
  }
 
    $email_message = "Form details below.\n\n";
 
     
 
    function clean_string($string) {
 
      $bad = array("content-type","bcc:","to:","cc:","href");
 
      return str_replace($bad,"",$string);
 
    }
 
     
 
    $email_message .= "First Name: ".clean_string($first_name)."\n";
 
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
 
    $email_message .= "Email: ".clean_string($email_from)."\n";
 
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
 
    $email_message .= "Comments: ".clean_string($comments)."\n";
 
     
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
 
'Reply-To: '.$email_from."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
@mail($email_to, $email_subject, $email_message, $headers);  

}

 
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Contact</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<script src="https://use.fonticons.com/84c9f035.js"></script>
    <link href="http://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="/resources/style1.css" rel="stylesheet" />
    <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/resources/favicon.ico" />
    <link rel='shortcut icon' href='/resources/favicon.ico' type='image/x-icon'/ >
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
</head>
<body id="top">

<!-- Navbar -->
<nav style="width: 100%;" class="navbar navbar-inverse navbar-fixed-top" data-spy="affix" data-offset-top="0">
  <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="home.html">INGSON.NET</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar" >
      <ul class="nav navbar-nav navbar-right">
        <li><a href="/home.html">HOME</a></li>
        <li><a href="/news.html">SOCIAL</a></li>
        <li><a href="/contact.php">CONTACT</a></li>
		<li><a href="/about/about.html">ABOUT</a></li>
		<li><a href="/more.html">MORE</a></li>
		<li><a href="http://games.ingson.net/">GAMES</a></li>
      </ul>
    </div>
  </div>
</nav>


<div class="container-fluid bg-1 text-center">
<br />
<br />
  <h3 class="margin">YOU CAN CONTACT US BY FILLING OUT THE FORM BELOW</h3>
</div>

<div class="container-fluid bg-2 text-center">
<center>
<form name="contactform" method="post" action="contact.php">

  <div class="form-group">
  <label for="first_name" style="letter-spacing: 1.5px;">First Name</label>
  <input  type="text" name="first_name" class="form-control">
  </div>
  <div class="form-group">
  <label for="last_name" style="letter-spacing: 1.5px;">Last Name</label>
  <input  type="text" name="last_name" class="form-control">
  </div>
  <div class="form-group">
  <label for="email" style="letter-spacing: 1.5px;">Email Address</label>
  <input  type="text" name="email" class="form-control">
  </div>
  <div class="form-group">
  <label for="telephone" style="letter-spacing: 1.5px;">Telephone Number</label>
  <input  type="text" name="telephone" class="form-control">
  </div>
  <div class="form-group">
  <label for="comments" style="letter-spacing: 1.5px;">Comments</label>
  <textarea  name="comments" class="form-control" rows="5"></textarea>
  </div>
  <input type="submit" value="Submit"> 

</form>

</center>

</div>

<footer class="container-fluid bg-4 text-center">
  <p>
  © Content copyright 2016. ingson.net. All rights reserved. <a href="mailto:contact@ingson.net"><i class="fa fa-envelope fa-lg"></i></a> <a href="https://twitter.com/DevChair"><i class="fa fa-twitter fa-lg"></i></a> <a href="" onclick="window.print()"><i class="fa fa-print fa-lg"></i></a> <a href="#top"><i class="fa fa-chevron-up fa-lg"></i></a>
  </p> 
</footer>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-76848038-1', 'auto');
  ga('send', 'pageview');

</script>

</body>
</html>