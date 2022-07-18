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
<title>Grocery | Single </title>
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
 <script src='../js/okzoom.js'></script>
  <script>
    $(function(){
      $('#example').okzoom({
        width: 150,
        height: 150,
        border: "1px solid black",
        shadow: "0 0 5px #000"
      });
    });
  </script>
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
				<li>Product Details</li>
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
				 </div>
				 <!-- /.navbar-collapse -->
			</nav>
		</div>
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
					$getID = $_GET['id'];
					$getQuery = "SP_ALLProduct_JOIN_IMAGE $getID ";//select query for viewing users.  
					$run = sqlsrv_query($conn, $getQuery);//here run the sql query.  

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
		<div class="w3l_banner_nav_right">
			<div class="agileinfo_single">
				<h5><?php echo $Prod_name ?></h5>
				<div class="col-md-4 agileinfo_single_left">
					<?php echo '<img id="example" src="data:image;base64, '.base64_encode($Img_data).'" class="img-responsive" >' ?>
				</div>
				<div class="col-md-8 agileinfo_single_right">
					<div class="rating1">
						<span class="starRating">
							<input id="rating5" type="radio" name="rating" value="5">
							<label for="rating5">5</label>
							<input id="rating4" type="radio" name="rating" value="4">
							<label for="rating4">4</label>
							<input id="rating3" type="radio" name="rating" value="3" checked>
							<label for="rating3">3</label>
							<input id="rating2" type="radio" name="rating" value="2">
							<label for="rating2">2</label>
							<input id="rating1" type="radio" name="rating" value="1">
							<label for="rating1">1</label>
						</span>
					</div>
					<div class="w3agile_description">
						<h4>Description :</h4>	
						<p><?php echo $Prod_description ?>.</p>
					</div>
					<div class="snipcart-item block">
						<div class="snipcart-thumb agileinfo_single_right_snipcart">
						<h4>₱<?php echo $Amount ?> <span><?php echo $Prod_unitprice ?></span></h4>
						</div>
						<div class="snipcart-details agileinfo_single_right_details">
							<form action="#" method="post">
								<fieldset>
									<input type="hidden" name="cmd" value="_cart" />
									<input type="hidden" name="add" value="1" />
									<input type="hidden" name="business" value=" " />
									<input type="hidden" name="item_name" value="<?php echo $Prod_name ?>" />
									<input type="hidden" name="amount" value="<?php echo $Amount ?>" />
									<input type="hidden" name="discount_amount" value="<?php echo $Prod_discount ?>" />
									<input type="hidden" name="currency_code" value="PHP" />
									<input type="hidden" name="return" value=" " />
									<input type="hidden" name="shipping" value="<?php echo $Prod_ID ?>" />
									<input type="hidden" name="cancel_return" value=" " />
									<input type="submit" name="submit" value="Add to cart" class="button" />
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<?php } ?>
				<div class="clearfix"> </div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>

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