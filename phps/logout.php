
<?php  

// Logout button will destroy the session, and 
// will unset the session variables 
// User will be headed to 'login.php' 
// after loggin out 

session_start();//session is a way to store information (in variables) to be used across multiple pages.  
session_destroy();  
unset($_SESSION['Username']); 
header("Location: account.php");//use for the redirection to some page  

exit();
?>  
