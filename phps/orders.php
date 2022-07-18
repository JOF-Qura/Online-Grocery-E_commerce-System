<?php


$serverName = "JOSH"; //serverName\instanceName
				
// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo); 

session_start();

//ORDER TABLE
	                            if(isset($_POST['deliver']))
		                            {
										$FirstName = $_POST['Fname'];
										$LastName = $_POST['Lname']; 
										$Address = $_POST['Address'];
										$City = $_POST['City'];
										$Postal = $_POST['Postal'];
										$Phone = $_POST['ContactNo'];
										$Phone_int = (int)$Phone;
										$Email = $_POST['Email'];
										$CustomerID = $_SESSION['UserID'];
                                        $OrderType = 'COD';


                                        $inser_profile_query = "SP_INSERT_PROFILE '$FirstName', '$LastName', '$Address', '$City', '$Postal', $Phone_int, '$Email', $CustomerID";                       
										$result = sqlsrv_query($conn, $inser_profile_query);  

										$insert_order_query = "SP_CREATE_ORDER $CustomerID, '$OrderType'";                       
										$result1 = sqlsrv_query($conn, $insert_order_query);  

										if($result1)
										{
											echo "<script>alert('Order Place successfully!')</script>";	
											// echo "<script>window.open('profile.php','_self')</script>";
										}
										else
										{
											echo "<script>alert('Sorry Data Could Not Updated !')</script>";				
										}
									}
?>

<?php
//ORDER Details TABLE
if(isset($_POST['deliver']))
{
    $Count = $_POST['Count'];

    $get_orderID_query = "SELECT MAX(OrderID) FROM Orders";
    $result = sqlsrv_query($conn, $get_orderID_query);  

    while($row = sqlsrv_fetch_array($result))  
    {   
        $OrderID = $row[0];
        $OrderID_int = $OrderID;
    }
    for ($i=1; $i <= $Count; $i++)
    { 
            if(isset($_POST['deliver']))
                {
                    $PID = $_POST['PID_'.$i];
                    $PID_int = (int)$PID;
                    $ProductName = $_POST['ProductName_'.$i];
                    $UnitPrice = $_POST['UnitPrice_'.$i];
                    $UnitPrice_int = (int)$UnitPrice; 
                    $Qty = $_POST['Qty_'.$i];
                    $Qty_int = (int)$Qty;
                    $TotalPrice = $_POST['TotalPrice_'.$i];
                    $TotalPrice_int = (int)$TotalPrice;
                    $discount = $_POST['discount_amount_'.$i];
                    $discount_int = (int)$discount;
										// echo "Product ID:__"; var_dump($PID_int); echo "<br>";
										// echo "Product Name:__"; var_dump($ProductName); echo "<br>";
										// echo "Unit Price:__"; var_dump($UnitPrice_int); echo "<br>";
										// echo "Qty:__"; var_dump($Qty_int); echo "<br>";
										// echo "TotalPrice:__"; var_dump($TotalPrice_int); echo "<br>";
                                        // echo "Discount:__"; var_dump($discount_int); echo "<br>";
                }
                $insert_order_details_query = "SP_INSERT_Order_OrderDetails $OrderID_int, $PID_int, $UnitPrice_int, $Qty_int, $TotalPrice_int, $discount_int";                       
                $result = sqlsrv_query($conn, $insert_order_details_query);  

                var_dump($result);

                if($result)
                {
                    echo "<script>alert('Order Details successfully add!')</script>";
                    echo "<script>window.open('../user/index.php','_self')</script>";

                }
                else
                {
                    echo "<script>alert('Sorry Data Could Not Updated !')</script>";				
                }
    }
}

?>
