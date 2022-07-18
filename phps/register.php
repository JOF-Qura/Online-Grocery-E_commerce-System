<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);


if(isset($_POST['register']))  
{  
	$Username = $_POST['Username'];//here getting result from the post array after submitting the form.  
	$Password = $_POST['Password'];
	$Email = $_POST['Email'];
//until here
    if($Username == '')  
    {  
        //javascript use for input checking  
        echo"<script>alert('Please enter the Username')</script>";  
		echo "<script>window.open('account.php','_self')</script>";
		exit();//this use if first is not work then other will not show
    }  
  
    if($Password == '')  
    {  
        echo"<script>alert('Please enter the Password')</script>";   
		echo "<script>window.open('account.php','_self')</script>";
		exit();//this use if first is not work then other will not show
    }  
  
    if($Email == '')  
    {  
        echo"<script>alert('Please enter the Email')</script>";  
		echo "<script>window.open('account.php','_self')</script>";
		exit();   
    } 
 
    $check_email_query = "SELECT * FROM Users WHERE EmailAdd = '$Email'";
	$check_user_query = "SELECT * FROM Users WHERE Username = '$Username'";
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET);
    $run_query_email = sqlsrv_query($conn, $check_email_query, $params, $options);  
	$run_query_user = sqlsrv_query($conn, $check_user_query, $params, $options); 
	
	//here query check weather if user already registered so can't register again. 
    if(sqlsrv_num_rows($run_query_email)>0)  
    {  
		echo "<script>alert('Email $Email is already exist in our database, Please try another one!')</script>";  
		echo "<script>window.open('account.php','_self')</script>";  
		exit();
    }  
	else if(sqlsrv_num_rows($run_query_user)>0)  
    {  
		echo "<script>alert('Username $Username is already exist in our database, Please try another one!')</script>";  
		echo "<script>window.open('account.php','_self')</script>";  
		exit();
    }  

	//insert the user into the database.  
	$insert_user_query = "SP_INSERT_USER_USERS '$Username', '$Password', '$Email'";
	$result = sqlsrv_query($conn, $insert_user_query, $params1);

		sqlsrv_close($conn);
		echo "<script>alert('Success')</script>";
		echo "<script>window.open('account.php','_self')</script>";
		exit();
}	
	
?>