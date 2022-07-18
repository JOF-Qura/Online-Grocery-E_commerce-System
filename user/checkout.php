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
<title>Grocery | Checkout </title>
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
			<form action="checkout.php" method="post" class="last">
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
				<li><i class="fa fa-home" aria-hidden="true"></i><a href="index.php">Home</a><span>|</span></li>
				<li>Checkout</li>
			</ul>
		</div>
	</div>
<!-- //products-breadcrumb -->
<!-- banner -->

<!-- about -->
<div class="privacy about">
			<h3>Chec<span>kout</span></h3>
        <?php 
        foreach ($_POST as $key => $value) {
        $ProdInCart = (sizeof($_POST)-7)/6;
        $No = (int)$ProdInCart;
        }
        ?>

	      <div class="checkout-right">
					<h4>Your shopping cart contains: <span><?php echo $No ?> Products</span></h4>
					<p style="text-align: center;"> <span><strong>Reminder: </strong></span>If you want to change the Quantity of the Product or Remove it. Just click to <strong>View Your Cart</strong> on the Upper Right, change it there, then click again the <strong> Go To Check Out</strong>.</p>
					<br>
					<br>

				<table class="timetable_sub">
					<thead>
						<tr>
							<th>SL No.</th>	
							<th>Product</th>
                            <th>Quantity</th>
							<th>Product Name</th>	
							<th>Price</th>
						</tr>
					</thead>

					<tbody>
                    <?php 

					$total = 0;
					$Price = 0;

                    for ($i=1; $i <= $ProdInCart; $i++)
                    { 
                    ?>

                    <?php

                    $serverName = "JOSH"; //serverName\instanceName

                    // Since UID and PWD are not specified in the $connectionInfo array,
                    // The connection will be attempted using Windows Authentication.
                    $connectionInfo = array( "Database"=>"Online_Grocery");
                    $conn = sqlsrv_connect( $serverName, $connectionInfo);

                    $PID = $_POST['shipping_'.$i];
                    $get_image = "SP_IMAGE_PRODUCT '$PID'";
                    $get = sqlsrv_query($conn, $get_image);
            
                    if($rowProd = sqlsrv_fetch_array($get))//while look to fetch the result and store in a array $row.  
                    {  
                        $ImgID = $rowProd[0];
                        $ProductID = $rowProd[1];
                        $Product_name = $rowProd[2];
                        $Img_data = $rowProd[3];
                    }

                    ?>  
					<tr class="rem<?php echo $i ?>">
						<td class="invert"><?php echo $i ?></td>
						<td class="invert-image" style="width: 10%"><a href="single.php?id=<?php echo $ProductID ?>"><?php echo '<img src="data:image;base64, '.base64_encode($Img_data).'" width="50" height="50" >' ?></a></td>
						<td class="invert">
							 <div class="quantity"> 
								<div class="quantity-select">                           
									<div class="entry value"><span> <?php echo $_POST['quantity_'.$i] ?> </span></div>
								</div>
							</div>
						</td>
						<td class="invert"><?php echo $_POST['item_name_'.$i]  ?></td>
						<?php $Price = $_POST['amount_'.$i] * $_POST['quantity_'.$i] - $_POST['discount_amount_'.$i] ?>
						<td class="invert">₱<?php echo $Price ?></td>
						<td style="padding: 0; border: none; background: none;"><input type="hidden" value="<?php echo $ProductID ?>" name="ProductID" readonly/></td>
					</tr>
						<?php
							$total = $total + $Price;
						?>
					<?php } ?>
					</tbody>
				</table>
			</div>
			<div class="checkout-left">	
				<div class="col-md-4 checkout-left-basket">
					<h4>Your basket</h4>

					<table class="timetable_sub">
					<thead>
						<tr>
							<th>Product Name</th>
							<th>Price per Unit</th>
							<th>Qty</th>	
							<th>Total Price</th>
						</tr>
					</thead>
					<tbody>
					<tr>
					<?php
					for ($i=1; $i <= $ProdInCart; $i++)
					{ 
					?>
						
						<td style="text-align: left"><?php echo $_POST['item_name_'.$i] ?></td>
						<?php 
						$qty = $_POST['quantity_'.$i];
						$Price = $_POST['amount_'.$i] * $_POST['quantity_'.$i] - $_POST['discount_amount_'.$i];
						if ($qty > 1)
						{
						?>
							<td style="text-align: right"><?php echo $Price / $qty  ?></td>
						<?php } 
						else
						{
							?>
							<td style="text-align: right"><?php echo $_POST['amount_'.$i]  - $_POST['discount_amount_'.$i]?></td>
						<?php } ?>
						<td style="text-align: right"><?php echo $_POST['quantity_'.$i] ?></td>
						<td style="text-align: right"><span>₱<?php echo $Price ?></span></td>
					</tr>
					<?php } ?>
					<tr>	
						<td style="text-align: right"><strong>Total Service Charges</strong></td>	
						<td></td>
						<td></td> 					
						<td style="text-align: right"><span>₱0</span></td>
					</tr>
					<tr>
						<td style="text-align: right"><strong>Total</strong></td> 
						<td></td>
						<td></td> 
						<td style="text-align: right"><strong><span>₱<?php echo $total ?></span></strong></td>
					</tr>
					<tbody>
					</table>
				</div>

		<!-- Getting the Data -->
			<form method="post" action="payment.php">
					<?php
					for ($i=1; $i <= $ProdInCart; $i++)
					{ 
					?>			
						<input type="hidden" name='PID_<?php echo $i ?>' value="<?php echo $_POST['shipping_'.$i]?>" />			
						<input type="hidden" name="ProductName_<?php echo $i ?>" value="<?php echo $_POST['item_name_'.$i] ?>" />
						<?php 
							$qty = $_POST['quantity_'.$i];
							$Price = $_POST['amount_'.$i] * $_POST['quantity_'.$i] - $_POST['discount_amount_'.$i];
						if ($qty > 1)
						{
						?>
							<input type="hidden" name="UnitPrice_<?php echo $i ?>" value="<?php echo $Price / $qty  ?>" />
						<?php } 
						else
						{
							?>
						<input type="hidden" name="UnitPrice_<?php echo $i ?>" value = "<?php echo $_POST['amount_'.$i]  - $_POST['discount_amount_'.$i]?>" />
						<?php } ?>
						<input type="hidden" name="Qty_<?php echo $i ?>" value = "<?php echo $_POST['quantity_'.$i] ?>" />
						<input type="hidden" name="TotalPrice_<?php echo $i ?>" value="<?php echo $Price ?>" />
						<input type="hidden" name="discount_amount_<?php echo $i ?>" value = "<?php echo $_POST['discount_amount_'.$i] ?>" />
						<input type="hidden" name='Count' value="<?php echo $i ?>" />
				<?php } ?>

					<div class="col-md-8 address_form_agile">

							<a href="payment.php?UserID=<?php echo $_SESSION["UserID"] ?>"> <button type="submit" name="orderDetails" style="color; gray"> Confirm and Make a Payment <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> </button> </a> 

					</div>
			</form>

				<div class="clearfix"> </div>
			</div>

		</div>
<!-- //about -->
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
				<li><a href="events.php">Events</a></li>
				<li><a href="about.php">About Us</a></li>
				<li><a href="products.php">Best Deals</a></li>
				<li><a href="services.php">Services</a></li>
				<li><a href="short-codes.php">Short Codes</a></li>
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
							 <!--quantity-->
									<script>
									$('.value-plus').on('click', function(){
										var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)+1;
										divUpd.text(newVal);
									});

									$('.value-minus').on('click', function(){
										var divUpd = $(this).parent().find('.value'), newVal = parseInt(divUpd.text(), 10)-1;
										if(newVal>=1) divUpd.text(newVal);
									});
									</script>
								<!--quantity-->
							<script>$(document).ready(function(c) {
								$('.close1').on('click', function(c){
									$('.rem1').fadeOut('slow', function(c){
										$('.rem1').remove();
									});
									});	  
								});
						   </script>
							<script>$(document).ready(function(c) {
								$('.close2').on('click', function(c){
									$('.rem2').fadeOut('slow', function(c){
										$('.rem2').remove();
									});
									});	  
								});
						   </script>
						  	<script>$(document).ready(function(c) {
								$('.close3').on('click', function(c){
									$('.rem3').fadeOut('slow', function(c){
										$('.rem3').remove();
									});
									});	  
								});
						   </script>

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