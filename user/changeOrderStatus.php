<?php
session_start();
// var_dump($_SESSION);
if(!isset($_SESSION['Username']))
{
	header("Location: ../phps/account.php");//use for the redirection to some page  
}
	$serverName = "JOSH"; //serverName\instanceName

	// Since UID and PWD are not specified in the $connectionInfo array,
	// The connection will be attempted using Windows Authentication.
	$connectionInfo = array( "Database"=>"Online_Grocery");
	$conn = sqlsrv_connect( $serverName, $connectionInfo); 


    if(isset($_GET['orderAccept_id']))
	{
            $id = explode(",", $_GET["orderAccept_id"]);

            $accept_customerID = $id[0];
            $accept_customerID_int = (int)$accept_customerID;

            $accept_Orderid = $id[1];
            $accept_Orderid_int = (int)$accept_Orderid;

            $check_query = "SELECT OrderStatus FROM Orders WHERE O_CustomerID = $accept_customerID_int AND OrderID = $accept_Orderid";
            $runCheck = sqlsrv_query($conn, $check_query);

            while($row = sqlsrv_fetch_array($runCheck))
            {
                $Status = $row[0];
            }

            if($Status == 'Pending')
            {
				echo "<script>alert('The item is not yet accepted please wait')</script>";
                echo "<script>window.open('Profile.php#parentHorizontalTab2 ','_self')</script>";
			}
			elseif($Status == 'Accepted / Pls. Wait for Delivery')
			{
				$accept_query = "UPDATE Orders SET OrderStatus='Delivered' WHERE O_CustomerID = $accept_customerID_int AND OrderID = $accept_Orderid"; //Accept Query
                $runAccept = sqlsrv_query($conn, $accept_query);
                echo "<script>window.open('Profile.php#parentHorizontalTab2 ','_self')</script>";
			}
            elseif($Status == 'Delivered')
			{
				echo "<script>alert('The order is already delivered, Thank you! Please Order Again =)')</script>";
                echo "<script>window.open('Profile.php#parentHorizontalTab2 ','_self')</script>";
            }
    }
?>