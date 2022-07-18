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
<title>Grocery | Privacy Policy </title>
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
				<li>Privacy Policy & Terms of Use</li>
			</ul>
		</div>
	</div>
<!-- //products-breadcrumb -->
<!-- privacy -->
		<div class="privacy">
			<div class="privacy1">
				<h3>Privacy Policy</h3>
				<div class="banner-bottom-grid1 privacy1-grid">
					<ul>
						<li><i class="glyphicon glyphicon-user" aria-hidden="true"></i></li>
						<li>Profile <span>Where fraudulent or wrongful use of an Account is detected or suspected, we reserve the right to have the sole discretion, 
							without liability, and without prejudice to our other rights and remedies under this Agreement or at law, to immediately: 
							cancel any outstanding orders placed through such Account(s); cancel or invalidate any outstanding credits or discount 
							vouchers, rewards or codes awarded to or used by such Account(s); prohibit such Account(s) from participating in 
							any promotions, contests or surveys of Our store; and/or merge, suspend and/or terminate such Account(s).</span></li>
					</ul>
					<ul>
						<li><i class="glyphicon glyphicon-search" aria-hidden="true"></i></li>
						<li>Search <span>...................</span></li>
					</ul>
					<ul>
						<li><i class="glyphicon glyphicon-paste" aria-hidden="true"></i></li>
						<li>News Feed <span>.....................</span></li>
					</ul>
					<ul>
						<li><i class="glyphicon glyphicon-qrcode" aria-hidden="true"></i></li>
						<li>Applications <span>.................</span></li>
					</ul>
				</div>
			</div>
			<div class="privacy1">
				<h3>Terms of Use</h3>
				<div class="banner-bottom-grid1 privacy2-grid">
					<div class="privacy2-grid1">
						<h4>Terms and Condition</h4>
						<p>
							The following Terms of Use shall govern your use and access of the Platform and of the services therein. 
							The term “Platform” pertains to the web and mobile versions of the website jointly operated and/or owned 
							by MALALAKAS and the mobile applications made available by us.
							By accessing the Platform and/or using any of the services therein, you represent that you are at least 
							18 years old and agree, without limitation or qualification, to be bound by these Terms of Use.
						</p>
						<div class="privacy2-grid1-sub">
							<h5>1. Products, Pricing, Content and Specifications</h5>
							<p>
								<strong>In-store payments</strong>
								<br>
								Currently, we are accepting cash in-store for items ordered through this 
								Platform for pick-up at our designated pick-up counter in our physical stores.
								<br>
								<br>
								<br>
								<strong>Cash on Delivery</strong>
								<br>
								You may also pay cash on delivery through or delivery man or through our 3rd party logistics courier.
								<br>
								<br>
								The total price for items or goods, including delivery fees, processing fees, and/or other 
								charges, will be displayed on the Platform when you place your order. 
								<br>
								<br>
								The grocery items you selected and included in your cart shall be subject to the actual 
								availability of stocks in our physical stores. You will only be charged for the goods 
								picked-up or delivered. The total bill shall be adjusted accordingly if goods ordered are 
								unavailable.
							</p>
						</div>
						<div class="privacy2-grid1-sub">
							<h5>2. Invoicing </h5>
							<p>Upon pick-up or delivery of goods, we will provide you the Sales 
								Invoice from our cashier for the goods actually delivered or picked-up.</p>
						</div>
						<div class="privacy2-grid1-sub">
							<h5>3. Shipping, Delivery and Store Pickup Limitations</h5>
							<p>
								When an order is placed on the Platform, you have the following options:
								<br>
								<br>
								<b>Delivery</b>
								<br>
								In selected stores and for a minimal delivery fee, you may opt to have the goods you purchased delivered to 
								the delivery address you specified at checkout. The estimated delivery time you selected in the course of 
								ordering the items or goods through this Platform is a mere approximation which may still vary depending on 
								the availability of our delivery man or third-party logistics and delivery provider and road traffic.
								<br>
								<br>
								Products purchased for delivery are subject to the availability of the goods. You will be provided an order 
								confirmation and tracking number via email or SMS. An email 
								or SMS status update shall be sent to you once the goods are dispatched for delivery. To receive the goods 
								delivered, you must present the tracking number and a government-issued identification card as proof of your 
								identity. If the delivery shall be received by another person other than the person who placed the order, 
								the authorized representative must present a government-issued identification card as proof of his identity 
								and a letter of authorization from the one who placed the order online.
								<br>
								<br>
								If you fail to accept the items or goods delivered despite timely delivery by our store, or delivery man and third party 
								logistics provider are unable to effect a delivery 
								at the address you provided due to your failure to provide accurate and complete instructions and/or address, 
								then such items or goods shall be deemed delivered to you and all risks and responsibility in relation to 
								such items or goods shall be borne by you. Any storage, insurance, and other costs incurred as a result of 
								an unsuccessful delivery or your refusal to accept the delivery without valid reason, shall be your 
								responsibility and you shall indemnify our stores in full for such costs.
								<br>
								<br>
								<b>Store Pickup</b>
								<br>
								Product(s) may be picked up at the physical store.
								<br>
								<br>
								Products purchased for store pickup are subject to the availability of the goods at physical store.
								 You will receive an order confirmation and tracking number via SMS 
								or email. An email or SMS status update shall be sent to you when the item(s) are ready for pick-up. 
								When collecting the goods, customer or agent should be able to provide to our Personnel the 
								customer name under which the order was placed, a government-issued identification card as proof of 
								identity, the system-generated tracking number, their selected pick-up schedule, and an authorization 
								letter (as necessary).
								<br>
								<br>
								<b>Failure to Pay</b>
								<br>
								If a Customer fails to make any payment using the payment method selected on the Platform or payment is 
								cancelled for any reason whatsoever, Our store shall cancel the order and/or suspend delivery or deny 
								the collection of the Products from the participating store until payment is made in full.
							</p>
						</div>
						<div class="privacy2-grid1-sub">
							<h5>4. Use of the Platform</h5>
							<p>In using the Platform and the services therein, you agree to:
								<br>
								<br>
								&nbsp;&nbsp;&nbsp;1. do so only for lawful purposes;
								<br>
								&nbsp;&nbsp;&nbsp;2. ensure that all information or data you provide on the Platform at the time of 
										placement of the order are accurate and complete and take sole responsibility for such information and data;
								<br>
								&nbsp;&nbsp;&nbsp;3. be responsible for maintaining the confidentiality of your account information and password and for restricting 
										access to such information and to your computer.
								<br>
								<br>
								You agree to accept responsibility for all activities that occur under your account, whether such activity is authorized or 
								not. You should notify us immediately if you have knowledge or have reason for suspecting that the confidentiality of 
								your account has been compromised or if there has been any unauthorized use thereof.</p>
						</div>
						<div class="privacy2-grid1-sub">
							<h5>5. Wrongful Use</h5>
							<p>Where fraudulent or wrongful use of an Account is detected or suspected, we reserve the right to have the sole discretion, 
								without liability, and without prejudice to our other rights and remedies under this Agreement or at law, to immediately: 
								cancel any outstanding orders placed through such Account(s); cancel or invalidate any outstanding credits or discount 
								vouchers, rewards or codes awarded to or used by such Account(s); prohibit such Account(s) from participating in 
								any promotions, contests or surveys of Our store; and/or merge, suspend and/or terminate such Account(s).</p>
						</div>
					</div>
				</div>
			</div>
		</div>
<!-- //privacy -->
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