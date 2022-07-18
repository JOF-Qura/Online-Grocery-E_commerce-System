<?php
session_start();
?>

<?php
	 
     $serverName = "JOSH"; //serverName\instanceName

    // Since UID and PWD are not specified in the $connectionInfo array,
    // The connection will be attempted using Windows Authentication.
    $connectionInfo = array( "Database"=>"Online_Grocery");
    $conn = sqlsrv_connect( $serverName, $connectionInfo); 
	
	if(isset($_GET['edit_id']) && !empty($_GET['edit_id']))
	{
		$id = $_GET['edit_id'];
        $get_prod_id = "SP_Products_JOIN_IMAGE_ID $id";
        $edit_prod_query = sqlsrv_query($conn, $get_prod_id);

        if($rowProd = sqlsrv_fetch_array($edit_prod_query))//while look to fetch the result and store in a array $row.  
	    {  
            $Prod_id = $rowProd[0];
            $Prod_name = $rowProd[1];
            $Prod_category = $rowProd[2];
            $Prod_quantity = $rowProd[3];
            $Prod_unitprice = $rowProd[4];
            $Prod_description = $rowProd[5];
            $Prod_discount = $rowProd[6];
            $Prod_subcategory = $rowProd[7];
            $Prod_image = $rowProd[8];
        }
        if(isset($_POST['btn_save_updates']))
        {
            $Prod_name = $_POST['PName'];
            $Prod_category = $_POST['Category']; 
            $Prod_quantity = $_POST['Quantity'];
            $Prod_quantity_int = (int)$Prod_quantity;
            $Prod_unitprice = $_POST['UnitPrice'];
            $Prod_unitprice_int = (int)$Prod_unitprice;
            $Prod_description = $_POST['ProductDescription'];
            $Prod_discount = $_POST['Discount'];
            $Prod_discount_int = (int)$Prod_discount;
            $Prod_subcategory = $_POST['Subcategory'];

            if($Prod_category == 'Households')
            {
                $Prod_category = 1;
            }
            elseif ($Prod_category == 'Veggies & Fruits')
            {
                $Prod_category = 2;
            }
            elseif ($Prod_category == 'Beverages')
            {
                $Prod_category = 3;
            }
            elseif ($Prod_category == 'Pet Food')
            {
                $Prod_category = 4;
            }
            elseif ($Prod_category == 'Frozen Foods')
            {
                $Prod_category = 5;
            }
            elseif ($Prod_category == 'Bread & Bakery')
            {
                $Prod_category = 6	;
            }


            if (!empty($_FILES))
            {
            
                $imgFile = $_FILES['ProductImageEdit']['name'];
                $tmp_dir = $_FILES['ProductImageEdit']['tmp_name'];
                $imgSize = $_FILES['ProductImageEdit']['size'];

            $Update_product_query = "SP_EDIT_Product $id, '$Prod_name', '$Prod_category', $Prod_quantity_int, $Prod_unitprice_int, '$Prod_description', $Prod_discount_int, '$Prod_subcategory'";                       
		    $result = sqlsrv_query($conn, $Update_product_query);  

            //Delete first the Image
            $delete_product_query = "DELETE FROM ImageTable WHERE ProductID = $id";
            $run_delete_query = sqlsrv_query($conn, $delete_product_query);

            $count = $id;

            // $path = pathinfo($imgFile,PATHINFO_BASENAME);
            $filePath = realpath($_FILES["ProductImage"]["tmp_name"]);

            $insert_image_query = "INSERT INTO ImageTable (ProductID, ImgName, ImgData) 
                                    SELECT $count, 'ProdID_$count', BulkColumn 
                                    FROM Openrowset( Bulk '$filePath', Single_Blob) as image";
            $resultImg = sqlsrv_query($conn, $insert_image_query);
                if($result)
                {
                    echo "<script>alert('Data updated successfully!')</script>";				
                    echo "<script>window.open('items.php','_self')</script>";
                    ?>
                    <?php
                }
                else
                {
                    echo "<script>alert('Sorry Data Could Not Updated !')</script>";				
                }
            }
            else
            {

                $Update_product_query = "SP_EDIT_Product $id, '$Prod_name', '$Prod_category', $Prod_quantity_int, $Prod_unitprice_int, '$Prod_description', $Prod_discount_int, '$Prod_subcategory'";                       
                $result = sqlsrv_query($conn, $Update_product_query);  
                if($result)
                {
                    echo "<script>alert('Data updated successfully!')</script>";				
                    // echo "<script>window.open('items.php','_self')</script>";

                    ?>
                    <?php
                }
                else
                {
                    echo "<script>alert('Sorry Data Could Not Updated !')</script>";				
                }
            }

			
        }     
    }
	else
	{
		header("Location: items.php");
	}	
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online_Grocery</title>
	 <link rel="shortcut icon" href="../assets/img/logo.png" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

   
    
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
			
		<div class="clearfix"></div>

<form method="post"  class="form-horizontal">
	
			 <div class="alert alert-info">
                        
                          <center> <h3><strong>Update Item</strong> </h3></center>
						  
						  </div>
						  
						 <table class="table table-bordered table-responsive">
     
    <tr>
    	<td><label class="control-label">Name of Product.</label></td>
        <td><input class="form-control" type="text" name="PName" value="<?php echo $Prod_name; ?>" required /></td>
    </tr>

    <tr>
        <td><label class="control-label">Category.</label></td>
        <td>
        <select class="form-control" name="Category" id="Category" required>
            <option value="none" selected disabled hidden> Select Category </option>
            <option value="Households">Households</option>
            <option value="Veggies & Fruits">Veggies & Fruits</option>
            <option value="Beverages">Beverages</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Frozen Foods">Frozen Foods</option>
            <option value="Bread & Bakery">Bread & Bakery</option>
        </select>
        </td>
    </tr>

    <tr>
        <td><label class="control-label">Quantity.</label></td>
        <td><input id="priceinput" class="form-control" value="<?php echo $Prod_quantity; ?>"  name="Quantity" type="text" required></td>
    </tr>
	
	 <tr>
    	<td><label class="control-label">Unit Price.</label></td>
        <td><input id="inputprice" class="form-control" type="text" name="UnitPrice" value="<?php echo $Prod_unitprice; ?>" required /></td>
    </tr>

    <tr>
        <td><label class="control-label">Product Description.</label></td>
        <td><input class="form-control" value="<?php echo $Prod_description; ?>" name="ProductDescription" type="text" required></td>
    </tr>

    <tr>
        <td><label class="control-label">Discount.</label></td>
        <td><input id="priceinput" class="form-control" value="<?php echo $Prod_discount; ?>" name="Discount" type="text" required></td>
    </tr>

    <tr>
        <td><label class="control-label">Subcategory.</label></td>
        <td><input class="form-control" value="<?php echo $Prod_subcategory; ?>" name="Subcategory" type="text" required></td>
    </tr>	
	
    <tr>
    	<td><label class="control-label">Image.</label></td> 
        <td>
            <p><?php echo '<img class="img img-thumbnail" src="data:image;base64, '.base64_encode($Prod_image).'" height="150" width="150" >' ?></p>
        	<input class="input-group" type="file" name="ProductImageEdit" />
        </td>
    </tr>
    
    <tr>
        <td colspan="2"><button type="submit" name="btn_save_updates" class="btn btn-primary">
        <span class="glyphicon glyphicon-save"></span> Update
        </button>
        
        <a class="btn btn-danger" href="items.php"> <span class="glyphicon glyphicon-backward"></span> Cancel </a>
        
        </td>
    </tr>
    
    </table>
    
</form>
						  
						
				<br />
	 
                <div class="alert alert-default" style="background-color:#333;">
                       <p style="color:white;text-align:center;">
                            © 2020 Grocery Store. All rights reserved

						</p>
                        
                    </div>		  
						  
						  
			
			
            
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
				 <form method="post" action="addItems.php">
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
                                <input class="form-control"  type="file" name="ProductImage" required/>
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
