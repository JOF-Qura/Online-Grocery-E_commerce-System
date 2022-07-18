<?php
session_start();

?>

<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo); 
  
if(isset($_POST['login']))  
{  
    $Username = $_POST['Username'];  
    $Password = $_POST['Password'];
    
    if($Username == 'admin')
    {
        $admin_check = "SELECT * FROM Users WHERE Username = '$Username' AND UserPassword = '$Password'"; 
        $params = array();
        $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET);
        $run_query = sqlsrv_query($conn, $admin_check, $params, $options);  
      
        if(sqlsrv_num_rows($run_query))  
        {  
            echo "<script>window.open('../admin1/index.php','_self')</script>"; 
            $_SESSION['Username'] = $Username;
        }  
        else 
        {
            echo"<script>alert('Admin Details are incorrect..!')</script>";
            print_r(sqlsrv_errors(),true);
        }  
    }
    else
    {
        $check_user = "SELECT * FROM Users WHERE Username ='$Username'AND UserPassword='$Password'";  
        $params = array();
        $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET);
        $run = sqlsrv_query($conn, $check_user, $params, $options); 

        while($row=sqlsrv_fetch_array($run))//while look to fetch the result and store in a array $row.  
			{   
			    $UserID = $row[0];
                $UserID_int = (int)$UserID;
            }
		
        if(sqlsrv_num_rows($run))   
        {  
            echo "<script>window.open('../user/index.php','_self')</script>";  
            $_SESSION["UserID"] = $UserID_int;
            $_SESSION['Username'] = $Username;//here session is used and value of $Username store in $_SESSION.
        }  
        else  
        {  
        echo "<script>alert('Email or password is incorrect!')</script>";
        echo "<script>window.open('account.php','_self')</script>";
        }  
    }
}  

?>




