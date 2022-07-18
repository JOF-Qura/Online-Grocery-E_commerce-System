<?php
    session_start();
?>

<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

// if( $conn ) {
//      echo "<script>alert('Connection established.')</script>";
// }else{
//      echo "Connection could not be established.<br />";
//      die( print_r( sqlsrv_errors(), true));
// }

	if(isset($_GET['delete_id']))
	{

            $delete_id = $_GET['delete_id'];
            $delete_id_int = (int)$delete_id;
            $delete_image_query = "SP_DELETE_IMAGE $delete_id_int";//delete query
            $delete_product_query = "SP_DELETE_PRODUCT $delete_id_int";//delete query
            $runimage = sqlsrv_query($conn, $delete_product_query);
            $runProd = sqlsrv_query($conn, $delete_product_query);

            var_dump($delete_id_int);

            if($runimage && $runProd)  
            {  
                    //javascript function to open in the same window  
                    echo "<script>alert('Data successfully deleted!')</script>"; 
                    echo "<script>window.open('items.php?deleted=product has been deleted','_self')</script>"; 
	        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Grocery</title>
	 <!-- <link rel="shortcut icon" href="../assets/img/logo.png" type="image/x-icon" /> -->
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/local.css" />

   
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
					<li class="active"><a href="items.php"> &nbsp; &nbsp; &nbsp; Product Management</a></li>
					<li><a href="customers.php"> &nbsp; &nbsp; &nbsp; Customer Management</a></li>
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
                 <center> <h3><strong>Product Management</strong> </h3></center>		  
			</div>
			<br />		  
			<div class="table-responsive">

            <table class="display table table-bordered" id="table_id" cellspacing="0" width="100%">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>ProductID</th>
				  <th>Product Name</th>
				  <th>CategoryID</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Description</th>
                  <th>Discount</th>
                  <th>Subcategory</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
        <?php  
        $serverName = "JOSH"; //serverName\instanceName

        // Since UID and PWD are not specified in the $connectionInfo array,
        // The connection will be attempted using Windows Authentication.
        $connectionInfo = array( "Database"=>"Online_Grocery");
        $conn = sqlsrv_connect( $serverName, $connectionInfo); 

        $view_prod_query = "SELECT * FROM V_LIST_ALL_PRODUCT_IMAGES";//select query for viewing products.
        $count_query = "SELECT * FROM Product";
        $params = array();
        $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );

        $run_query_product = sqlsrv_query($conn, $view_prod_query, $params, $options);
        $run_count_query = sqlsrv_query($conn, $count_query, $params, $options);

        $count = sqlsrv_num_rows($run_count_query);

        var_dump($count);

    if(sqlsrv_num_rows($run_count_query) > 0) 
    {  
        while($row=sqlsrv_fetch_array($run_query_product))//while look to fetch the result and store in a array $row.  
        {   
            $Prod_id = $row[0];
            $Prod_name = $row[1];
            $Prod_category = $row[2];
            $Prod_quantity = $row[3];
            $Prod_unitprice = $row[4];
            $Prod_description = $row[5];
            $Prod_discount = $row[6];
            $Prod_subcategory = $row[7];
            $Prod_image = $row[8];
        ?>  
            <tr>
                <td><center> <?php echo '<img src="data:image;base64, '.base64_encode($Prod_image).'" class="img img-rounded" width="50" height="50" >' ?> </center></td>
                <td><?php echo $Prod_id; ?></td>
                <td><?php echo $Prod_name; ?></td>
                <td><?php echo $Prod_category; ?></td>
                <td><?php echo $Prod_quantity; ?></td>
				<td>&#8369; <?php echo $Prod_unitprice; ?></td>
				<td><?php echo $Prod_description; ?></td> 
                <td><?php echo $Prod_discount; ?></td>
                <td><?php echo $Prod_subcategory; ?></td>
				<td> 
                    <a class="btn btn-info" href="edititem.php?edit_id=<?php echo $Prod_id; ?>" title="click for edit" onclick="return confirm('Are you sure edit this item?')"><span class='glyphicon glyphicon-pencil'></span> Edit Item</a> 
                    <a class="btn btn-danger" href="delete.php?delete_id=<?php echo $Prod_id; ?>" title="click for delete" onclick="return confirm('Are you sure to remove this item?')"><span class='glyphicon glyphicon-trash'></span> Remove Item</a>
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
