<html>
<body>

Thank you <?php echo $_POST["firstname"]; ?><br>
an email has been sent to <?php echo $_POST["email"]; ?>
<form action="MAILTO:<?php echo $_POST["email"]; ?>" method="post" enctype="text/plain">
SWEGITY SWODDITY
</form>
</body>
</html>