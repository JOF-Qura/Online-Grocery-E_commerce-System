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
<title>Grocery | Services </title>
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
<!-- js -->
<script src="../js/jquery-1.11.1.min.js"></script>
<!-- //js -->
<link href='//fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'>
<link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
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
				<li><i class="fa fa-home" aria-hidden="true"></i><a href="index.php">Home</a><span>|</span></li>
				<li>Services</li>
			</ul>
		</div>
	</div>
<!-- //products-breadcrumb -->

<!-- services -->
		<div class="services">
			<h3>Services</h3>
			<div class="w3ls_service_grids">
				<div class="col-md-5 w3ls_service_grid_left">
					<h4>Our Mission</h4>
					<p>We believe grocery shopping is more than an errand. 
						That’s why it’s our pledge to always go above and beyond. 
						Here, we think like the customer, not about the customer.
					<br>
					<br>
						"Because People Matter." 
					</p>
				</div>
				<div class="col-md-7 w3ls_service_grid_right">
					<div class="col-md-4 w3ls_service_grid_right_1">
						<img src="images/18.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="col-md-4 w3ls_service_grid_right_1">
						<img src="images/19.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="col-md-4 w3ls_service_grid_right_1">
						<img src="images/20.jpg" alt=" " class="img-responsive" />
					</div>
					<div class="clearfix"> </div>
				</div>
				<div class="clearfix"> </div>
			</div>
			<div class="w3ls_service_grids1">
				<div class="col-md-6 w3ls_service_grids1_left">
					<img src="images/4.jpg" alt=" " class="img-responsive" />
				</div>
				<div class="col-md-6 w3ls_service_grids1_right">
					<ul>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Honesty</li>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Integrity</li>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Respect</li>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Diversity</li>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Safety</li>
						<li><i class="fa fa-long-arrow-right" aria-hidden="true"></i>Inclusion</li>
					</ul>
					<a href="single.php">Shop Now</a>
				</div>
				<div class="clearfix"> </div>
			</div>
		</div>
<!-- //services -->
		</div>
		<div class="clearfix"></div>
	</div>
<!-- //banner -->
<!-- services-bottom -->
	<div class="services-bottom">
		<div class="container">
			<div class="col-md-3 about_counter_left">
				<i class="glyphicon glyphicon-user" aria-hidden="true"></i>
				<p class="counter">89,147</p> 
				<h3>Followers</h3>
			</div>
			<div class="col-md-3 about_counter_left">
				<i class="glyphicon glyphicon-piggy-bank" aria-hidden="true"></i>
				<p class="counter">54,598</p> 
				<h3>Savings</h3>
			</div>
			<div class="col-md-3 about_counter_left">
				<i class="glyphicon glyphicon-export" aria-hidden="true"></i>
				<p class="counter">83,983</p> 
				<h3>Support</h3>
			</div>
			<div class="col-md-3 about_counter_left">
				<i class="glyphicon glyphicon-bullhorn" aria-hidden="true"></i>
				<p class="counter">45,894</p> 
				<h3>Popularity</h3>
			</div>
			<div class="clearfix"> </div>
			<!-- Stats-Number-Scroller-Animation-JavaScript -->
				<script src="../js/waypoints.min.js"></script> 
				<script src="../js/counterup.min.js"></script> 
				<script>
					jQuery(document).ready(function( $ ) {
						$('.counter').counterUp({
							delay: 10,
							time: 1000
						});
					});
				</script>
			<!-- //Stats-Number-Scroller-Animation-JavaScript -->

		</div>
	</div>
<!-- //services-bottom -->
<!-- newsletter-top-serv-btm -->
	<div class="newsletter-top-serv-btm">
		<div class="container">
			<div class="col-md-4 wthree_news_top_serv_btm_grid">
				<div class="wthree_news_top_serv_btm_grid_icon">
					<i class="fa fa-shopping-cart" aria-hidden="true"></i>
				</div>
				<h3>Add to Cart</h3>
				<p>Go shopping on our sites</p>
			</div>
			<div class="col-md-4 wthree_news_top_serv_btm_grid">
				<div class="wthree_news_top_serv_btm_grid_icon">
					<i class="fa fa-bar-chart" aria-hidden="true"></i>
				</div>
				<h3>Check and Make Ratings</h3>
				<p>Our Services is good</p>
			</div>
			<div class="col-md-4 wthree_news_top_serv_btm_grid">
				<div class="wthree_news_top_serv_btm_grid_icon">
					<i class="fa fa-truck" aria-hidden="true"></i>
				</div>
				<h3>We Ship door to door</h3>
				<p>As long as you're in the vicinity of our places. We can ship your products to your door</p>
			</div>
			<div class="clearfix"> </div>
		</div>
	</div>
<!-- //newsletter-top-serv-btm -->
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
						<li><a href="https://facebook.com/JstQura" class="facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
						<li><a href="https://twitter.com/HappyGoLuuckky" class="twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
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