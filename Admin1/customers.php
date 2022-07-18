<?php
session_start();

?>
<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
	
    if(isset($_GET['delete_id']))
    {
  
      $delete_id = $_GET['delete_id'];
      $delete_id_int = (int)$delete_id;
      $delete_image_query = "SP_DELETE_Customer $delete_id_int";//delete query
      $runDelete = sqlsrv_query($conn, $delete_image_query);

        if($runDelete)
          {  
              //javascript function to open in the same window  
              echo "<script>alert('Data successfully deleted!')</script>"; 
              echo "<script>window.open('customers.php?deleted=user has been deleted','_self')</script>"; 
          }
	}

?>

<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

	if(isset($_GET['order_id']))
	{
        $user_ID = $_GET['order_id'];
        $user_id_int = (int)$user_ID;
        $accept_order = "UPDATE Orders SET OrderStatus = 'Accepted / Wait for Delivery' WHERE O_CustomerID = $user_ID";//delete query
        $runAccept = sqlsrv_query($conn, $accept_order); 
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
    <link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css" />

   
  <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script src="js/datatables.min.js"></script>

   
    
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php">Online_Grocery - Admin Panel</a>
            </div>
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
                        <a href="#"><i class="fa fa-calendar"></i>  <?php
                            $Today=date('y:m:d');
                            $new=date('l, F d, Y',strtotime($Today));
                            echo $new; ?></a>
                        
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
          <center> <h3><strong>Customer Management</strong> </h3></center>
        </div>
						  
						  <br />
						  
					<div class="table-responsive">
          <table class="display table table-bordered" id="table_id" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Customer Name</th>
				  <th>Contact No.</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
    <tbody>
    <?php  
    $serverName = "JOSH"; //serverName\instanceName

    // Since UID and PWD are not specified in the $connectionInfo array,
    // The connection will be attempted using Windows Authentication.
    $connectionInfo = array( "Database"=>"Online_Grocery");
    $conn = sqlsrv_connect( $serverName, $connectionInfo); 


    
    $view_all_customers_query = "SELECT * FROM V_LIST_User_Customer";//select query for viewing products.
    $params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
    $run_query_view_customer = sqlsrv_query($conn, $view_all_customers_query, $params, $options);
 
    $count_query = "SELECT * FROM Customer";
    $run_count_query = sqlsrv_query($conn, $count_query, $params, $options);
    $count = sqlsrv_num_rows($run_count_query);

    var_dump($count);

if(sqlsrv_num_rows($run_count_query) > 0) 
{  
    while($row=sqlsrv_fetch_array($run_query_view_customer))//while look to fetch the result and store in a array $row.  
    {   
        $UserID = $row[0];
        $CustomerID = $row[1];
        $CustomerPhone = $row[2];
        $CustomerEmail = $row[3];
        $CustomerName = $row[4];
        $CustomerAddress = $row[5];
    ?>  
        <tr>  
          <td> <?php echo $CustomerID; ?> </td>
          <td> <div style="overflow: auto; height: 60px; width: 200px;">  <?php echo $CustomerName; ?> </div> </td>
          <td> <?php echo $CustomerPhone; ?> </td>
          <td> <?php echo $CustomerEmail; ?> </td>
          <td> <?php echo $CustomerAddress; ?> </td>
          <td>
            <a class="btn btn-success" href="view_orders.php?view_id=<?php echo $UserID; ?>"><span class='glyphicon glyphicon-shopping-cart'></span> View Orders</a> 
            <a class="btn btn-danger" href="?delete_id=<?php echo $UserID; ?>" title="click for delete" onclick="return confirm('Are you sure to remove this customer?')">
            <span class='glyphicon glyphicon-trash'></span>
            Remove Account</a>
          </td>
        </tr>
               
    <?php
		}
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
             	<span class="glyphicon glyphicon-info-sign"></span> &nbsp; No Data Found ...
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
    $('#table_id').DataTable();
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
