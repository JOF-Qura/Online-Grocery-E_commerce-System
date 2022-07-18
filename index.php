<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);


?>

<!DOCTYPE html>
<html>
<head>
<title>Grocery Store | Home </title>
<!-- for-mobile-apps -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Grocery Store Responsive web template, Bootstrap Web Templates, Flat Web Templates, Android Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);
		function hideURLbar(){ window.scrollTo(0,1); } </script>
<!-- //for-mobile-apps -->
<link href="css/bootstrap.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<!-- font-awesome icons -->
<link href="css/font-awesome.css" rel="stylesheet" type="text/css" media="all" /> 
<!-- //font-awesome icons -->

</head>
	
<body>
<!-- header -->
	<div class="agileits_header">
		<div class="w3l_offers">
			<a href="guest/products.php">Today's special Offers !</a>
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
                    <a href="phps/account.php"> <input type="button" name="submit" value="View your cart" class="button" /> </a>
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
								<li><a href="phps/account.php">Login</a></li> 
								<li><a href="phps/account.php">Sign Up</a></li>
							</ul>
						</div>                  
					</div>	
				</li>
			</ul>
		</div>
		<div class="w3l_header_right1">
			<h2><a href="guest/mail.php">Contact Us</a></h2>
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
					<li><a href="guest/about.php">About Us</a><i>/</i></li>
					<li><a href="guest/services.php">Services</a></li>
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
						<li><a href="guest/products.php">Today's Special Offer!</a></li>
						<li><a href="guest/household.php">Households</a></li>
						<li><a href="guest/vegetables.php">Veggies & Fruits</a></li>
						<li><a href="guest/drinks.php">Beverages</a></li>
						<li><a href="guest/pet.php">Pet Food</a></li>
						<li><a href="guest/frozen.php">Frozen Foods</a></li>
						<li><a href="guest/bread.php">Bread & Bakery</a></li>
					</ul>
				 </div><!-- /.navbar-collapse -->
			</nav>
		</div>
		<div class="w3l_banner_nav_right">
			<!-- flexSlider -->
				<link rel="stylesheet" href="css/flexslider.css" type="text/css" media="screen" property="" />
				<script defer src="js/jquery.flexslider.js"></script>
				<script type="text/javascript">
				$(window).load(function(){
				  $('.flexslider').flexslider({
					animation: "slide",
					start: function(slider){
					  $('body').removeClass('loading');
					}
				  });
				});
			  </script>
			<!-- //flexSlider -->
		</div>
		<!-- <div class="clearfix"></div> -->
	</div>
<!-- banner -->

			<div class="wthree_banner_bottom_left_grid_sub"></div>
			<div class="wthree_banner_bottom_left_grid_sub1">
				<div class="col-md-4 wthree_banner_bottom_left">
					<div class="wthree_banner_bottom_left_grid">
						<img src="images/4.jpg" alt=" " class="img-responsive" />
						<div class="wthree_banner_bottom_left_grid_pos">
							<h4>Discount Offer <span>25%</span></h4>
						</div>
					</div>
				</div>
				<div class="col-md-4 wthree_banner_bottom_left">
					<div class="wthree_banner_bottom_left_grid">
						<img src="images/5.jpg" alt=" " class="img-responsive" />
						<div class="wthree_banner_btm_pos">
							<h3>introducing <span>best store</span> for <i>groceries</i></h3>
						</div>
					</div>
				</div>
				<div class="col-md-4 wthree_banner_bottom_left">
					<div class="wthree_banner_bottom_left_grid">
						<img src="images/6.jpg" alt=" " class="img-responsive" />
						<div class="wthree_banner_btm_pos1">
							<h3>Save <span>Upto</span> ₱10</h3>
						</div>
					</div>
				</div>
				<div class="clearfix"> </div>
			</div>
		<div class="clearfix"> </div>

<!-- top-brands -->
	<div class="top-brands">
		<div class="container">
			<div class="agile_top_brands_grids">
			<h3>BEST SELL | HOT OFFERS</h3>
			<br>
			<?php
					$serverName = "JOSH"; //serverName\instanceName

					// Since UID and PWD are not specified in the $connectionInfo array,
					// The connection will be attempted using Windows Authentication.
					$connectionInfo = array( "Database"=>"Online_Grocery");
					$conn = sqlsrv_connect( $serverName, $connectionInfo);

					// if( $conn ) {
					// 	echo "Connection established. <br />";
					// }else{
					// 	echo "Connection could not be established.<br />";
					// 	die( print_r( sqlsrv_errors(), true));
					// }

					$view_prod_query = "SELECT * FROM V_LIST_BEST_PRODUCT";//select query for viewing users.  
					$run = sqlsrv_query($conn, $view_prod_query);//here run the sql query.  

					while($row=sqlsrv_fetch_array($run))//while look to fetch the result and store in a array $row.  
					{   
						$Prod_ID = $row[0];
						$Prod_name = $row[1];  
						$Prod_unitprice = $row[2];
						$Prod_description = $row[3];
						$Prod_discount = $row[4];
						$Prod_quantity = $row[5];
						$Img_data = $row[6];
						$Amount = $Prod_unitprice - $Prod_discount;
					?> 
				<div class="col-md-3 top_brand_left">
					<div class="hover14 column">
						<div class="agile_top_brand_left_grid">
							<div class="agile_top_brand_left_grid_pos">
								<img src="images/offer.png" alt=" " class="img-responsive" />
							</div>
							<div class="agile_top_brand_left_grid1">
								<figure>
									<div class="snipcart-item block">
										<div class="snipcart-thumb">
										<a href="guest/single.php?id=<?php echo $Prod_ID ?>"><?php echo '<img src="data:image;base64, '.base64_encode($Img_data).'" class="img-responsive" >' ?></a>
											<p><?php echo $Prod_name ?></p>
											<h4>₱<?php echo $Amount ?> <span><?php echo $Prod_unitprice ?></span></h4>
										</div>
										<div class="snipcart-details top_brand_home_details">
											<form action="#" method="post">
												<fieldset>
													<input type="hidden" name="cmd" value="_cart" />
													<input type="hidden" name="add" value="1" />
													<input type="hidden" name="business" value=" " />
													<input type="hidden" name="item_name" value="<?php echo $Prod_name ?><" />
													<input type="hidden" name="amount" value="<?php echo $Prod_unitprice ?><" />
													<input type="hidden" name="discount_amount" value="<?php echo $Prod_discount ?><" />
													<input type="hidden" name="currency_code" value="USD" />
													<input type="hidden" name="return" value=" " />
													<input type="hidden" name="cancel_return" value=" " />
													<a href="phps/account.php"> <input type="button" name="submit" value="Add to cart" class="button" /></a>
												</fieldset>
											</form>
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<?php } ?>
				<div class="clearfix"> </div>
			</div>
		</div>
	</div>
<!-- //top-brands -->

<!-- footer -->
	<div class="footer">
		<div class="container">
			<div class="col-md-3 w3_footer_grid">
				<h3>information</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="guest/about.php">About Us</a></li>
					<li><a href="guest/products.php">Best Deals</a></li>
					<li><a href="guest/services.php">Services</a></li>
				</ul>
			</div>
			<div class="col-md-3 w3_footer_grid">
				<h3>policy info</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="guest/faqs.php">FAQ</a></li>
					<li><a href="guest/privacy.php">privacy policy</a></li>
					<li><a href="guest/privacy.php">terms of use</a></li>
				</ul>
			</div>
			<div class="col-md-3 w3_footer_grid">
				<h3>what in stores</h3>
				<ul class="w3_footer_grid_list">
					<li><a href="guest/pet.php">Pet Food</a></li>
					<li><a href="guest/frozen.php">Frozen Snacks</a></li>
					<li><a href="guest/vegetables.php">Veggies & Fruits</a></li>
					<li><a href="guest/drinks.php">Beverages</a></li>
					<li><a href="guest/household.php">Households</a></li>
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
<script src="js/jquery-1.11.1.min.js"></script>
<!-- //js -->
<link href='//fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
<!-- start-smoth-scrolling -->
<script type="text/javascript" src="js/move-top.js"></script>
<script type="text/javascript" src="js/easing.js"></script>
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
<script src="js/bootstrap.min.js"></script>
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
<script src="js/minicart.js"></script>
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

	</script>
</body>
</html>
