
<?php
	session_start();
	if(!isset($_SESSION['Username']))
	{
		header("Location: ../phps/account.php");//use for the redirection to some page  
	}
?>

<!DOCTYPE html>
<html>
<head>
<title>Grocery Store | Payment </title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Grocery Store Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- //for-mobile-apps -->
<link href="../css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<link href="../css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- font-awesome icons -->
<link href="../css/font-awesome.css" rel="stylesheet" type="text/css" media="all" /> 
<!-- //font-awesome icons -->

<link href='//fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>

</head>
	
<body>
<!-- header -->
<div class="agileits_header">
		<div class="w3l_offers">
			<a href="products.php">Today's special Offers !</a>
		</div>
		<div class="w3l_search">
			<form action="#" method="post">
				<input type="text" name="Product" value="Search a product..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Search a product...';}" required="">
				<input type="submit" value=" ">
			</form>
		</div>
		<div class="product_list_header">  
			<form action="#" method="post" class="last">
                <fieldset>
                    <input type="hidden" name="cmd" value="_cart" />
                    <input type="hidden" name="display" value="1" />
                    <input type="submit" name="submit" value="View your cart" class="button" />
                </fieldset>
            </form>
		</div>
		<div class="w3l_header_right">
			<ul>
				<li class="dropdown profile_details_drop">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user" aria-hidden="true"></i><span class="caret"></span></a>
					<div class="mega-dropdown-menu">
						<div class="w3ls_vegetables">
							<ul class="dropdown-menu drp-mnu">
								<li><a href="Profile.php">Profile</a></li> 
								<li><button onclick="resetCart()" style="padding: 0; border: none; background: none;"><a href="../phps/logout.php">Sign Out</a></button></li>
							</ul>
						</div>                  
					</div>	
				</li>
			</ul>
		</div>
		<div class="w3l_header_right1">
			<h2><a href="mail.php">Contact Us</a></h2>
		</div>
		<div class="clearfix"> </div>
	</div>
<!-- script-for sticky-nav -->
	<script>
	$(document).ready(function() {
		 var navoffeset=$(".agileits_header").offset().top;
		 $(window).scroll(function(){
			var scrollpos=$(window).scrollTop(); 
			if(scrollpos >=navoffeset){
				$(".agileits_header").addClass("fixed");
			}else{
				$(".agileits_header").removeClass("fixed");
			}
		 });
		 
	});
	</script>
<!-- //script-for sticky-nav -->
	<div class="logo_products">
		<div class="container">
			<div class="w3ls_logo_products_left">
				<h1><a href="index.php"><span>Grocery</span> Store</a></h1>
			</div>
			<div class="w3ls_logo_products_left1">
				<ul class="special_items">
					<li><a href="index.php">Home</a><i>/</i></li>
					<li><a href="about.php">About Us</a><i>/</i></li>
					<li><a href="services.php">Services</a></li>
				</ul>
			</div>
			<div class="w3ls_logo_products_left1">
				<ul class="phone_email">
					<li><i class="fa fa-phone" aria-hidden="true"></i>(+63)977 0919 259</li>
					<li><i class="fa fa-envelope-o" aria-hidden="true"></i><a href="facebook.com/ferrerjoshua304">OHYEAHOHYEAH@grocery.com</a></li>
				</ul>
			</div>
			<div class="clearfix"> </div>
		</div>
	</div>
<!-- //header -->
<!-- products-breadcrumb -->
	<div class="products-breadcrumb">
		<div class="container">
			<ul>
				<li>Payment</li>
			</ul>
		</div>
	</div>
<!-- //products-breadcrumb -->
<!-- banner -->
	<div class="banner">
		<div class="w3l_banner_nav_left">
			<nav class="navbar nav_bottom">
			 <!-- Brand and toggle get grouped for better mobile display -->
			  <div class="navbar-header nav_2">
				  <button type="button" class="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				  </button>
			   </div> 
			   <!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<h3>Categories</h3>
					<ul class="nav navbar-nav nav_1">
						<li><a href="products.php">Today's Special Offer!</a></li>
						<li><a href="household.php">Households</a></li>
						<li><a href="vegetables.php">Veggies & Fruits</a></li>
						<li><a href="drinks.php">Beverages</a></li>
						<li><a href="pet.php">Pet Food</a></li>
						<li><a href="frozen.php">Frozen Foods</a></li>
						<li><a href="bread.php">Bread & Bakery</a></li>
					</ul>
				 </div><!-- /.navbar-collapse -->
			</nav>
		</div>
<div class="w3l_banner_nav_right">
<!-- payment -->
		<div class="privacy about">
			<h3>Pay<span>ment</span></h3>
			
	         <div class="checkout-right">
		<!--Horizontal Tab-->
        <div id="parentHorizontalTab">
            <ul class="resp-tabs-list hor_1">
				<li>Cash on delivery (COD)</li>
                <li>Credit/Debit</li>
                <li>Paypal Account</li>
            </ul>
            <div class="resp-tabs-container hor_1"> <div>
			<div>
                <div class="vertical_post check_box_agile">
					<h2>COD</h2>
						<div class="checkbox">								
							<div class="check_box_one cashon_delivery">
								<label class="anim">
									<span> We also accept Credit/Debit card on delivery. Please Check with the agent.</span> </label> 
							</div>
						</div>
					</div>
                </div>
				<?php 	 
				if(isset($_POST['orderDetails']))
					{
						$Count = $_POST['Count'];

						for ($i=1; $i <= $Count; $i++)
						{ 
								if(isset($_POST['orderDetails']))
									{
										$PID = $_POST['PID_'.$i];
										$ProductName = $_POST['ProductName_'.$i];
										$UnitPrice = $_POST['UnitPrice_'.$i]; 
										$Qty = $_POST['Qty_'.$i];
										$discount = $_POST['discount_amount_'.$i];
										$TotalPrice = $_POST['TotalPrice_'.$i];

										// echo "Product ID:__"; var_dump($PID); echo "<br>";
										// echo "Product Name:__"; var_dump($ProductName); echo "<br>";
										// echo "Unit Price:__"; var_dump($UnitPrice); echo "<br>";
										// echo "Qty:__"; var_dump($Qty); echo "<br>";
										// echo "TotalPrice:__"; var_dump($TotalPrice); echo "<br>";
										
									}
						}
					}
				

					$serverName = "JOSH"; //serverName\instanceName
				
					// Since UID and PWD are not specified in the $connectionInfo array,
					// The connection will be attempted using Windows Authentication.
					$connectionInfo = array( "Database"=>"Online_Grocery");
					$conn = sqlsrv_connect( $serverName, $connectionInfo); 
				
						if(isset($_POST['btn_save_updates']))
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
				
							$Update_product_query = "SP_SAVE_PROFILE '$FirstName', '$LastName', '$Address', '$City', '$Postal', $Phone_int, '$Email', $CustomerID";                      
							$result = sqlsrv_query($conn, $Update_product_query);  
							if($result)
								{
									echo "<script>alert('Data Save successfully!')</script>";	
									echo "<script>window.open('profile.php','_self')</script>";
								}
							else
								{
									echo "<script>alert('Sorry Data Could Not Updated !')</script>";
									var_dump($result);
									var_dump($FirstName);
									var_dump($LastName);				
									var_dump($Address);
									var_dump($City);
									var_dump($Postal);
									var_dump($Phone_int);
									var_dump($Email);
									var_dump($CustomerID);
								}
						}
					$id = $_SESSION['UserID'];
					$get_users_id = "SELECT * FROM Customer WHERE CustomerID = $id";
					$params = array();
					$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
					$edit_profile_query = sqlsrv_query($conn, $get_users_id, $params, $options);
					// $count = sqlsrv_num_rows($edit_profile_query);
					// var_dump($count);

					if($rowCustomer = sqlsrv_fetch_array($edit_profile_query))//while look to fetch the result and store in a array $row.  
					{  
						$C_FirstName = $rowCustomer[0];
						$C_LastName = $rowCustomer[1];
						$C_Address = $rowCustomer[2];
						$C_City = $rowCustomer[3];
						$C_Postal = $rowCustomer[4];
						$C_Phone = $rowCustomer[5];
						$C_Email = $rowCustomer[6];
						$C_CustomerID = $rowCustomer[7];
					}
					if(sqlsrv_num_rows($edit_profile_query)>0)  
					{  
					?>
                                    <div class="vertical_post check_box_agile">
									</div>
									<br>
									<br>
									<h4>Your Details</h4>
									<form action="../phps/orders.php" method="post" class="creditly-card-form agileinfo_form">
									<section class="creditly-wrapper wthree, w3_agileits_wrapper">
										<div class="information-wrapper">
											<div class="first-row form-group">
												<div class="controls">
													<label class="control-label">First Name: </label>
													<input class="billing-address-name form-control" type="text" name="Fname" value="<?php echo $C_FirstName ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">Last Name: </label>
													<input class="billing-address-name form-control" type="text" name="Lname" value="<?php echo $C_LastName ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">Address: (No./Blk No, Street, Bangay) </label>
													<input class="billing-address-name form-control" type="text" name="Address" value="<?php echo $C_Address ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">City: </label>
													<input class="billing-address-name form-control" type="text" name="City" value="<?php echo $C_City ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">Postal Code: </label>
													<input class="billing-address-name form-control" type="text" name="Postal" value="<?php echo $C_Postal ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">Mobile Number: </label>
													<input class="billing-address-name form-control" type="text" name="ContactNo" value="<?php echo $C_Phone ?>" readonly>
												</div>
												<div class="controls">
													<label class="control-label">Email Address: </label>
													<input class="billing-address-name form-control" type="text" name="Email" value="<?php echo $C_Email ?>" readonly>
												</div>
												<div class="controls">
												<?php
																if(isset($_POST['orderDetails']))
																{
																	$Count = $_POST['Count'];
											
																	for ($i=1; $i <= $Count; $i++)
																	{ 
																			if(isset($_POST['orderDetails']))
																				{
																					$PID = $_POST['PID_'.$i];
																					$ProductName = $_POST['ProductName_'.$i];
																					$UnitPrice = $_POST['UnitPrice_'.$i]; 
																					$Qty = $_POST['Qty_'.$i];
																					$discount = $_POST['discount_amount_'.$i];
																					$TotalPrice = $_POST['TotalPrice_'.$i];
																				}
																	?>
														
													<input class="billing-address-name form-control" type="hidden" name="ProductName_<?php echo $i ?>" value="<?php echo $ProductName ?>" />
													<input class="billing-address-name form-control" type="hidden" name="UnitPrice_<?php echo $i ?>" value="<?php echo $UnitPrice  ?>" />
													<input class="billing-address-name form-control" type="hidden" name="Qty_<?php echo $i ?>" value = "<?php echo $Qty ?>" />
													<input class="billing-address-name form-control" type="hidden" name="TotalPrice_<?php echo $i ?>" value="<?php echo $TotalPrice ?>" />
													<input class="billing-address-name form-control" type="hidden" name='discount_amount_<?php echo $i ?>' value="<?php echo $discount ?>" />
													<input class="billing-address-name form-control" type="hidden" name='Count' value="<?php echo $i ?>" />
													<input class="billing-address-name form-control" type="hidden" name='PID_<?php echo $i ?>' value="<?php echo $PID ?>" />
																<?php } ?>
															<?php } ?>

												</div>																					
												<div class="controls">
												<div class="col-md-8 address_form_agile">
														<div class="checkout-right-basket">
															<button class="btn btn-success" type="submit" name="deliver" onclick="resetCart()"> Delivery to this Address
														</div>

													</div>
												</div>
											</div>	
										</div>
									</section>
								</form>
								<br>
							<?php }
								else
								{
									$serverName = "JOSH"; //serverName\instanceName

									// Since UID and PWD are not specified in the $connectionInfo array,
									// The connection will be attempted using Windows Authentication.
									$connectionInfo = array( "Database"=>"Online_Grocery");
									$conn = sqlsrv_connect( $serverName, $connectionInfo); 

									$id = $_SESSION['UserID'];
									$get_users_id = "SELECT * FROM Users WHERE UserID = $id";
									$params = array();
									$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
									$edit_profile_query = sqlsrv_query($conn, $get_users_id, $params, $options);
									// $count = sqlsrv_num_rows($edit_profile_query);
									// var_dump($count);
				
									if($rowCustomer = sqlsrv_fetch_array($edit_profile_query))//while look to fetch the result and store in a array $row.  
									{  
										$C_Email = $rowCustomer[3];
									}
								?>
                                    <div class="vertical_post check_box_agile">
									<h5>EDIT</h5>
									</div>
									<br>
									<br>
									<h4>Your Details</h4>
									<form action="../phps/orders.php" method="post" class="creditly-card-form agileinfo_form">
									<section class="creditly-wrapper wthree, w3_agileits_wrapper">
										<div class="information-wrapper">
											<div class="first-row form-group">
												<div class="controls">
													<label class="control-label">First Name: </label>
													<input class="billing-address-name form-control" type="text" name="Fname" placeholder="First Name" required>
												</div>
												<div class="controls">
													<label class="control-label">Last Name: </label>
													<input class="billing-address-name form-control" type="text" name="Lname" placeholder="Last Name" required>
												</div>
												<div class="controls">
													<label class="control-label">Address: (No./Blk No, Street, Bangay) </label>
													<input class="billing-address-name form-control" type="text" name="Address" placeholder="(No./Blk No, Street, Bangay)" required>
												</div>
												<div class="controls">
													<label class="control-label">City: </label>
													<input class="billing-address-name form-control" type="text" name="City" placeholder="City" required>
												</div>
												<div class="controls">
													<label class="control-label">Postal Code: </label>
													<input class="billing-address-name form-control" type="text" name="Postal" placeholder="Postal Code" required>
												</div>
												<div class="controls">
													<label class="control-label">Mobile Number: </label>
													<input class="billing-address-name form-control" type="text" name="ContactNo" placeholder="Mobile No." required>
												</div>
												<div class="controls">
													<label class="control-label">Email Address: </label>
													<input class="billing-address-name form-control" type="text" name="Email" value="<?php echo $C_Email ?>"  required>
												</div>
												<div class="controls">
												<?php
																if(isset($_POST['orderDetails']))
																{
																	$Count = $_POST['Count'];
											
																	for ($i=1; $i <= $Count; $i++)
																	{ 
																			if(isset($_POST['orderDetails']))
																				{
																					$PID = $_POST['PID_'.$i];
																					$ProductName = $_POST['ProductName_'.$i];
																					$UnitPrice = $_POST['UnitPrice_'.$i]; 
																					$Qty = $_POST['Qty_'.$i];
																					$discount = $_POST['discount_amount_'.$i];
																					$TotalPrice = $_POST['TotalPrice_'.$i];
																				}
																	?>
														
													<input class="billing-address-name form-control" type="hidden" name="ProductName_<?php echo $i ?>" value="<?php echo $ProductName ?>" />
													<input class="billing-address-name form-control" type="hidden" name="UnitPrice_<?php echo $i ?>" value="<?php echo $UnitPrice  ?>" />
													<input class="billing-address-name form-control" type="hidden" name="Qty_<?php echo $i ?>" value = "<?php echo $Qty ?>" />
													<input class="billing-address-name form-control" type="hidden" name="TotalPrice_<?php echo $i ?>" value="<?php echo $TotalPrice ?>" />
													<input class="billing-address-name form-control" type="hidden" name='discount_amount_<?php echo $i ?>' value="<?php echo $discount ?>" />
													<input class="billing-address-name form-control" type="hidden" name='Count' value="<?php echo $i ?>" />
													<input class="billing-address-name form-control" type="hidden" name='PID_<?php echo $i ?>' value="<?php echo $PID ?>" />
																<?php } ?>
															<?php } ?>

												</div>																					
												<div class="controls">
												<div class="col-md-8 address_form_agile">
														<div class="checkout-right-basket">
															<button class="btn btn-success" type="submit" name="deliver" onclick="resetCart()"> Delivery to this Address
														</div>
													</div>
												</div>
											</div>
										</div>
									</section>
								</form>
								<br>
								<?php } ?>
							</div>
							
							
                <div>
                    <form action="#" method="post" class="creditly-card-form agileinfo_form">
									<section class="creditly-wrapper wthree, w3_agileits_wrapper">
										<div class="credit-card-wrapper">
											<div class="first-row form-group">
												<div class="controls">
													<label class="control-label">Name on Card</label>
													<input class="billing-address-name form-control" type="text" name="name" placeholder="John Smith">
												</div>
												<div class="w3_agileits_card_number_grids">
													<div class="w3_agileits_card_number_grid_left">
														<div class="controls">
															<label class="control-label">Card Number</label>
															<input class="number credit-card-number form-control" type="text" name="number"
																		  inputmode="numeric" autocomplete="cc-number" autocompletetype="cc-number" x-autocompletetype="cc-number"
																		  placeholder="&#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149;">
														</div>
													</div>
													<div class="w3_agileits_card_number_grid_right">
														<div class="controls">
															<label class="control-label">CVV</label>
															<input class="security-code form-control"Â·
																		  inputmode="numeric"
																		  type="text" name="security-code"
																		  placeholder="&#149;&#149;&#149;">
														</div>
													</div>
													<div class="clear"> </div>
												</div>
												<div class="controls">
													<label class="control-label">Expiration Date</label>
													<input class="expiration-month-and-year form-control" type="text" name="expiration-month-and-year" placeholder="MM / YY">
												</div>
											</div>
											<button class="submit"><span>Make a payment </span></button>
										</div>
									</section>
								</form>

                </div>
                <div>
                    <div id="tab4" class="tab-grid" style="display: block;">
							<div class="row">
                        <div class="col-md-6">
                            <img class="pp-img" src="images/paypal.png" alt="Image Alternative text" title="Image Title">
                            <p>Important: You will be redirected to PayPal's website to securely complete your payment.</p><a class="btn btn-primary">Checkout via Paypal</a>	
                        </div>
                        <div class="col-md-6">
                            <form class="cc-form">
                                <div class="clearfix">
                                    <div class="form-group form-group-cc-number">
                                        <label>Card Number</label>
                                        <input class="form-control" placeholder="xxxx xxxx xxxx xxxx" type="text"><span class="cc-card-icon"></span>
                                    </div>
                                    <div class="form-group form-group-cc-cvc">
                                        <label>CVV</label>
                                        <input class="form-control" placeholder="xxxx" type="text">
                                    </div>
                                </div>
                                <div class="clearfix">
                                    <div class="form-group form-group-cc-name">
                                        <label>Card Holder Name</label>
                                        <input class="form-control" type="text">
                                    </div>
                                    <div class="form-group form-group-cc-date">
                                        <label>Valid Thru</label>
                                        <input class="form-control" placeholder="mm/yy" type="text">
                                    </div>
                                </div>
                                <div class="checkbox checkbox-small">
                                    <label>
                                        <input class="i-check" type="checkbox" checked="">Add to My Cards</label>
                                </div>
                                <input class="btn btn-primary submit" type="submit" class="submit" value="Proceed Payment">
                            </form>
                        </div>
                    </div>
                        
						</div>
                </div>
                
            </div>
        </div>
	
	<!--Plug-in Initialisation-->

	<!-- // Pay -->
	
			 </div>

		</div>
<!-- //payment -->
		</div>
		<div class="clearfix"></div>
	</div>
<!-- //banner -->


<!-- footer -->
<div class="footer">
		<div class="container">
			<div class="col-md-3 w3_footer_grid">
				<h3>information</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="about.php">About Us</a></li>
					<li><a href="products.php">Best Deals</a></li>
					<li><a href="services.php">Services</a></li>
				</ul>
			</div>
			<div class="col-md-3 w3_footer_grid">
				<h3>policy info</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="faqs.php">FAQ</a></li>
					<li><a href="privacy.php">privacy policy</a></li>
					<li><a href="privacy.php">terms of use</a></li>
				</ul>
			</div>
			<div class="col-md-3 w3_footer_grid">
				<h3>what in stores</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="pet.php">Pet Food</a></li>
					<li><a href="frozen.php">Frozen Snacks</a></li>
					<li><a href="vegetables.php">Veggies & Fruits</a></li>
					<li><a href="drinks.php">Beverages</a></li>
					<li><a href="household.php">Households</a></li>
				</ul>
			</div>
				<div class="col-md-3 w3_footer_grid agile_footer_grids_w3_footer">
					<div class="w3_footer_grid_bottom">
						<h5>connect with us</h5>
						<ul class="agileits_social_icons">
							<li><a href="#" class="facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
							<li><a href="#" class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
							<li><a href="#" class="google"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
							<li><a href="#" class="instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
							<li><a href="#" class="dribbble"><i class="fa fa-dribbble" aria-hidden="true"></i></a></li>
						</ul>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
			<div class="wthree_footer_copy">
				<p>© 2020 Grocery Store. All rights reserved </p>
			</div>
		</div>
	</div>
<!-- //footer -->
<!-- js -->
<script src="../js/jquery-1.11.1.min.js"></script>
<!-- easy-responsive-tabs -->    
<link rel="stylesheet" type="text/css" href="../css/easy-responsive-tabs.css " />
<script src="../js/easyResponsiveTabs.js"></script>
<!-- //easy-responsive-tabs --> 
	<script type="text/javascript">
    $(document).ready(function() {
        //Horizontal Tab
        $('#parentHorizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1', // The tab groups identifier
            activate: function(event) { // Callback function if tab is switched
                var $tab = $(this);
                var $info = $('#nested-tabInfo');
                var $name = $('span', $info);
                $name.text($tab.text());
                $info.show();
            }
        });
    });
</script>
<!-- credit-card -->
		<script type="text/javascript" src="../js/creditly.js"></script>
        <link rel="stylesheet" href="../css/creditly.css" type="text/css" media="all" />

		<script type="text/javascript">
			$(function() {
			  var creditly = Creditly.initialize(
				  '.creditly-wrapper .expiration-month-and-year',
				  '.creditly-wrapper .credit-card-number',
				  '.creditly-wrapper .security-code',
				  '.creditly-wrapper .card-type');

			  $(".creditly-card-form .submit").click(function(e) {
				e.preventDefault();
				var output = creditly.validate();
				if (output) {
				  // Your validated credit card output
				  console.log(output);
				}
			  });
			});
		</script>
	<!-- //credit-card -->

<!-- //js -->
<!-- script-for sticky-nav -->
	<script>
	$(document).ready(function() {
		 var navoffeset=$(".agileits_header").offset().top;
		 $(window).scroll(function(){
			var scrollpos=$(window).scrollTop(); 
			if(scrollpos >=navoffeset){
				$(".agileits_header").addClass("fixed");
			}else{
				$(".agileits_header").removeClass("fixed");
			}
		 });
		 
	});
	</script>
<!-- //script-for sticky-nav -->
<!-- start-smoth-scrolling -->
<script type="text/javascript" src="../js/move-top.js"></script>
<script type="text/javascript" src="../js/easing.js"></script>
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$(".scroll").click(function(event){		
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
		});
	});
</script>
<!-- start-smoth-scrolling -->
<!-- Bootstrap Core JavaScript -->
<script src="../js/bootstrap.min.js"></script>
<script>
$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});
</script>
<!-- here stars scrolling icon -->
	<script type="text/javascript">
		$(document).ready(function() {
			/*
				var defaults = {
				containerID: 'toTop', // fading element id
				containerHoverID: 'toTopHover', // fading element hover id
				scrollSpeed: 1200,
				easingType: 'linear' 
				};
			*/
								
			$().UItoTop({ easingType: 'easeOutQuart' });
								
			});
	</script>
<!-- //here ends scrolling icon -->
<script src="../js/minicarts.js"></script>
<script>
		paypal.minicart.render();

		paypal.minicart.cart.on('checkout', function (evt) {
			var items = this.items(),
				len = items.length,
				total = 0,
				i;

			// Count the number of each item in the cart
			for (i = 0; i < len; i++) {
				total += items[i].get('quantity');
			}

			if (total < 3) {
				alert('The minimum order quantity is 3. Please add more to your shopping cart before checking out');
				evt.preventDefault();
			}
		});
		function resetCart()
		{
			paypal.minicart.cart.destroy();
		}
	</script>
</body>
</html>