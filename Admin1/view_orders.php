<?php
session_start();
?>
<?php
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

            // echo "<script>alert('$accept_customerID_int')</script>";
            // echo "<script>alert('$accept_Orderid_int')</script>";
            // var_dump($accept_Orderid_int);
            // var_dump($accept_customerID_int);

            $check_query = "SELECT OrderStatus FROM Orders WHERE O_CustomerID = $accept_customerID_int AND OrderID = $accept_Orderid";
            $runCheck = sqlsrv_query($conn, $check_query);

            while($row = sqlsrv_fetch_array($runCheck))
            {
                $Status = $row[0];
            }

            if($Status == 'Pending')
            {
                $accept_query = "SP_UPDATE_ORDER_STATUS $accept_customerID_int, $accept_Orderid_int"; //Accept Query
                $runAccept = sqlsrv_query($conn, $accept_query);
                if($runAccept)
                {
                    $Ordered_Product_query = "SP_ACCEPT_ORDER_MINUS_QTY $accept_Orderid_int ";
                    $runOP = sqlsrv_query($conn, $Ordered_Product_query);

                    while($row = sqlsrv_fetch_array($runOP)) //itutuloyyyyyy: Puting Value into Variable para sa pag minus ng qty ng product...
                    {
                        $OD_OrderID = $row[0];
                        $OrderedProductID = $row[1];
                        $OrderedQty = $row[2];
                        $ProductID = $row[3];
                        $ProductName = $row[4];
                        $ProductQty = $row[5];

                        $QTYRemaining = $ProductQty - $OrderedQty;

                        $Ordered_diff_qty_query = "SP_GET_REMAINING_QTY $QTYRemaining, $OrderedProductID";
                        $runDiff = sqlsrv_query($conn, $Ordered_diff_qty_query);
                    }
                    echo "<script>window.open('view_orders.php?view_id=";echo "$accept_customerID_int ','_self')</script>";
                }            
            }
            else
            {
                echo "<script>alert('$Status')</script>";
                    $Ordered_Product_query = "SP_ACCEPT_ORDER_MINUS_QTY $accept_Orderid_int ";
                    $runOP = sqlsrv_query($conn, $Ordered_Product_query);
                    while($row = sqlsrv_fetch_array($runOP)) //itutuloyyyyyy: Puting Value into Variable para sa pag minus ng qty ng product...
                    {
                        $OD_OrderID = $row[0];
                        $OrderedProductID = $row[1];
                        $OrderedQty = $row[2];
                        $ProductID = $row[3];
                        $ProductName = $row[4];
                        $ProductQty = $row[5];

                        $QTYRemaining = $ProductQty - $OrderedQty;
                        echo "<script>alert('$QTYRemaining')</script>";
                    }
                echo "<script>alert('You already accepted this order, waiting for delivery')</script>";
                echo "<script>window.open('view_orders.php?view_id=";echo "$accept_customerID_int ','_self')</script>";
            }

            // if($Status != 'Pending')
            // {
            //     echo "<script>alert('You already accepted this order, waiting for delivery')</script>";
            //     echo "<script>window.open('view_orders.php?view_id=";echo "$accept_customerID_int ','_self')</script>";
            // } 
            // else
            // {
            //     $accept_query = "UPDATE Orders SET OrderStatus = 'Accepted / Pls. Wait for Delivery' WHERE O_CustomerID = $accept_customerID_int AND OrderID = $accept_Orderid_int = (int)"; //Accept Query
            //     // $minus_product_query = "S"
            //     $runAccept = sqlsrv_query($conn, $accept_query);
            //     if($runAccept) 
            //     {  
            //             //javascript function to open in the same window  
            //             echo "<script>alert('Accepted Succesfully!')</script>"; 
            //             echo "<script>window.open('view_orders.php?view_id=";echo "$accept_customerID_int ','_self')</script>"; 
            //     }
            // }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Grocery</title>
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/local.css" />

  <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
  <script src="js/datatables.min.js"></script>
	

   
    
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li><a href="index.php"> &nbsp; &nbsp; &nbsp; Home</a></li>
					<li><a data-toggle="modal" data-target="#uploadModal"> &nbsp; &nbsp; &nbsp; Upload Product</a></li>
					<li><a href="items.php"> &nbsp; &nbsp; &nbsp; Product Management</a></li>
					<li class="active"><a href="customers.php"> &nbsp; &nbsp; &nbsp; Customer Management</a></li>
					<li><a href="orderdetails.php"> &nbsp; &nbsp; &nbsp; Order Details</a></li>
					<li><a href="../phps/logout.php"> &nbsp; &nbsp; &nbsp; Logout</a></li>        
                </ul>

                <ul class="nav navbar-nav navbar-right navbar-user">
                    <li class="dropdown messages-dropdown">
                        <a href="#"><i class="fa fa-calendar"></i>  
                        <?php
                            $Today=date('y:m:d');
                            $new=date('l, F d, Y',strtotime($Today));
                            echo $new; 
                        ?>
                        </a>
                        
                    </li>
                     <li class="dropdown user-dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"></i> <?php   extract($_SESSION); echo $Username; ?><b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            
                            <li><a href="../phps/logout.php"><i class="fa fa-power-off"></i> Log Out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>

        <div id="page-wrapper">
            
			
	
			 <div class="alert alert-danger">
                        
                          <center> <h3><strong>Customer Order Details</strong> </h3></center>
						  
						  </div>
						  
						  <br />
						  
						  <div class="table-responsive">
                          <table class="display table table-bordered" id="myTable" cellspacing="0" width="100%">
												<thead>
													<th> OrderID </th>
													<th> OrderDate </th>
													<th> OrderType </th>
													<th> Status </th>
													<th> Action </th>
												</thead>
												<tbody>
												<?php  
													$serverName = "JOSH"; //serverName\instanceName

													// Since UID and PWD are not specified in the $connectionInfo array,
													// The connection will be attempted using Windows Authentication.
													$connectionInfo = array( "Database"=>"Online_Grocery");
													$conn = sqlsrv_connect( $serverName, $connectionInfo); 

                                                    $id = $_GET['view_id'];

													$view_order_query = "SELECT * FROM Orders WHERE O_CustomerID = $id";//select query for viewing products.
													$params = array();
													$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );

													$run_query_order = sqlsrv_query($conn, $view_order_query, $params, $options);

                                                    $count = sqlsrv_num_rows($run_query_order);
                                                
                                                    var_dump($count);
                                                
                                                if(sqlsrv_num_rows($run_query_order) > 0) 
                                                {  
													while($row=sqlsrv_fetch_array($run_query_order))//while look to fetch the result and store in a array $row.  
													{   
														$OrderID = $row[0];
														$CustomerID = $row[1];
														$OrderDate = $row[2];
														$OrderDate_str = $OrderDate->format('Y-m-d');
														$OrderType = $row[3];
														$Status = $row[4];
													?>  
													<tr>
														<td> <?php echo $OrderID ?> </td>
														<td> <?php echo $OrderDate_str ?> </td>
														<td> <?php echo $OrderType ?> </td>
														<td> <?php echo $Status ?> </td>
														<td> 
                                                            <a class="btn btn-info" href="?orderAccept_id=<?php echo $id; ?>,<?php echo $OrderID; ?>" title="click for edit" onclick="return confirm('Are you sure Accept this order?')"><span class='glyphicon glyphicon-pencil'></span>Accept Order</a>
                                                            <a class="btn btn-danger" href="?orderDecline_id=<?php echo $id; ?>" title="click for delete" onclick="return confirm('Are you sure to decline this order?')"><span class='glyphicon glyphicon-trash'></span> Decline Order</a>
                                                        </td>                                        
													</tr>                                             
				                        <?php } 

                echo "</tbody>";
                echo "</table>";
                echo "</div>";
                echo "<br />";
                echo '<div class="alert alert-default" style="background-color:#333;">
                            <p style="color:white;text-align:center;">
                                © 2020 Grocery Store. All rights reserved
                            </p>
                
                        </div>
                    </div>';
            echo "</div>";
	}
	else
	{
		?>
        
		
			
        <div class="col-xs-12">
        	<div class="alert alert-warning">
            	<span class="glyphicon glyphicon-info-sign"></span> &nbsp; No ordered items yet...
            </div>
        </div>
        <?php
	}
	
?>
		
	</div>
	</div>
	
	<br />
	<br />
           

           
        </div>
		
		
		
    </div>
    <!-- /#wrapper -->

	
	<!-- Mediul Modal -->
<div class="modal fade" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="myMediulModalLabel">
          <div class="modal-dialog modal-md">
            <div style="color:white;background-color:#84C639" class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h2 style="color:white" class="modal-title" id="myModalLabel">Upload Product</h2>
              </div>
              <div class="modal-body">
				 <form enctype="multipart/form-data" method="post" action="addItems.php">
                   <fieldset>				
                            <p>Name of Product:</p>
                            <div class="form-group">
                                <input class="form-control" placeholder="Name of Product" name="PName" type="text" required>
							</div>
                            
                            <p>Category:</p>
                            <div class="form-group">
                                <select class="form-control" name="Category" id="Category" requred>
                                    <option value="none" selected disabled hidden> Please Choose Category</option>
                                    <option value="Households">Households</option>
                                    <option value="Veggies & Fruits">Veggies & Fruits</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Pet Food">Pet Food</option>
                                    <option value="Frozen Foods">Frozen Foods</option>
                                    <option value="Bread & Bakery">Bread & Bakery</option>
                                </select>
							</div>

                            <p>Quantity:</p>
                            <div class="form-group">
                                <input id="priceinput" class="form-control" placeholder="Quantity" name="Quantity" type="text" required>
							</div>
				
							<p>Unit Price:</p>
                            <div class="form-group">
                                <input id="priceinput" class="form-control" placeholder="UnitPrice" name="UnitPrice" type="text" required>
							</div>

                            <p>Product Description:</p>
                            <div class="form-group">
                                <input class="form-control" placeholder="Product Description" name="ProductDescription" type="text" required>
							</div>

                            <p>Discount:</p>
                            <div class="form-group">
                                <input id="priceinput" class="form-control" placeholder="Discount" name="Discount" type="text" required>
							</div>

                            <p>Subcategory:</p>
                            <div class="form-group">
                                <input class="form-control" placeholder="Subcategory" name="Subcategory" type="text" required>
							</div>

							<p>Choose Image:</p>
							<div class="form-group">
                                <input class="form-control"  type="file" name="ProductImage" accept="C:\xampp-web\htdocs\Grocery\images" required/>
							</div>
					 </fieldset>
              </div>
              <div class="modal-footer">
               
                <button class="btn btn-success btn-md" name="SaveItems">Save</button>
				
				 <button type="button" class="btn btn-danger btn-md" data-dismiss="modal">Cancel</button>
				
				
				   </form>
              </div>
            </div>
          </div>
        </div>
		

        <script type="text/javascript" charset="utf-8">
	$(document).ready( function () {
    $('#myTable').DataTable();
    } );
  </script>
	
	  	  <script>
   
    $(document).ready(function() {
        $('#priceinput').keypress(function (event) {
            return isNumber(event, this)
        });
    });
  
    function isNumber(evt, element) {

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            (charCode != 45 || $(element).val().indexOf('-') != -1) &&      
            (charCode != 46 || $(element).val().indexOf('.') != -1) &&      
            (charCode < 48 || charCode > 57))
            return false;

        return true;
    }    
</script>
</body>
</html>
