<?php
    session_start();

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
                    <li class="active"><a href="index.php"> &nbsp; &nbsp; &nbsp; Home</a></li>
					<li><a data-toggle="modal" data-target="#uploadModal"> &nbsp; &nbsp; &nbsp; Upload Product</a></li>
					<li><a href="items.php"> &nbsp; &nbsp; &nbsp; Product Management</a></li>
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

   <div id="my-carousel" class="carousel slide hero-slide hidden-xs" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators">
        <li data-target="#my-carousel" data-slide-to="0" class="active"></li>
        <li data-target="#my-carousel" data-slide-to="1"></li>
        <li data-target="#my-carousel" data-slide-to="2"></li>
		<li data-target="#my-carousel" data-slide-to="3"></li>
        <li data-target="#my-carousel" data-slide-to="4"></li>
		<li data-target="#my-carousel" data-slide-to="5"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
        <div class="item active">
		
            <img src="../images/1.jpg" alt="Hero Slide" style="width:100%;height:500px;">

            <div class="carousel-caption">
                <h1 style="font-family:Century Gothic"><b></b></h1>

                <h2></h2>
            </div>
        </div>
        <div class="item">
            <img src="../images/2.jpg" alt="..." style="width:100%;height:500px;">

            <div class="carousel-caption">
               
            </div>
        </div>
        <div class="item">
            <img src="../images/3.jpg" alt="..." style="width:100%;height:500px;">

            <div class="carousel-caption">
		

                <p></p>
            </div>
        </div>
		
		<div class="item">
            <img src="../images/4.jpg" alt="..." style="width:100%;height:500px;">

            <div class="carousel-caption">
		

                <p></p>
            </div>
        </div>
		
		<div class="item">
            <img src="../images/5.jpg" alt="..." style="width:100%;height:500px;">

            <div class="carousel-caption">
		

                <p></p>
            </div>
        </div>
		
		<div class="item">
            <img src="../images/6.jpg" alt="..." style="width:100%;height:500px;">

            <div class="carousel-caption">
    

                <p></p>
            </div>
        </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#my-carousel" role="button" data-slide="prev">
	
      <span class="icon-prev"></span>
       
    </a>
    <a class="right carousel-control" href="#my-carousel" role="button" data-slide="next">
       
       <span class="icon-next"></span>
    </a>

<!-- #my-carousel-->
			
			</div>

			
			
		<br />	
			 <div class="alert alert-danger">
                        
                        &nbsp; &nbsp; Kami ang mga Pabebe boys. Walang makakapigil sa amin. hehe :) 
                        Kami ang mga Pabebe boys. Walang makakapigil sa amin. hehe :) 
                        Kami ang mga Pabebe boys. Walang makakapigil sa amin. hehe :) 
                        Kami ang mga Pabebe boys. Walang makakapigil sa amin. hehe :)
                    </div>
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
				 <form enctype="multipart/form-data" method="post" action="addItems.php">
                   <fieldset>				
                            <p>Name of Product:</p>
                            <div class="form-group">
                                <input class="form-control" placeholder="Name of Product" name="PName" type="text" required>
							</div>
                            
                            <!-- Comment: Fetch Nalang from Database Category Table -->
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
                                <input id="qtyinput" class="form-control" placeholder="Quantity" name="Quantity" type="text" required>
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
                                <input id="discountinput" class="form-control" placeholder="Discount" name="Discount" type="text" required>
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
	  	  <script>
   
    $(document).ready(function() {
        $('#priceinput').keypress(function (event) {
            return isNumber(event, this)
        });
    });

    $(document).ready(function() {
        $('#qtyinput').keypress(function (event) {
            return isNumber(event, this)
        });
    });

    $(document).ready(function() {
        $('#discountinput').keypress(function (event) {
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
