<?php
session_start();

?>
<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);
  
if (isset($_POST['SaveItems']) && isset($_FILES['ProductImage']))  
{
//GETTING VALUES FROM FORMS -- POST METHOD
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

    //Checking if the Product Name input is existing to the DB
	$check_product_query = "SP_CHECK_ITEM_EXIST '$Prod_name'";
	$params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET);
    $run_query_product = sqlsrv_query($conn, $check_product_query, $params, $options);  

	//here query check weather if product already registered so can't register again. 
    if(sqlsrv_num_rows($run_query_product)>0)  
    {  
		echo "<script>alert('Product $Prod_name already exist in our database, Please try another one!')</script>";  
		echo "<script>window.open('index.php','_self')</script>";  
		exit();
    }  

    //GETTING VALUES FROM FORMS Particularly images
	$imgFile = $_FILES['ProductImage']['name'];
	$tmp_dir = $_FILES['ProductImage']['tmp_name'];
	$imgSize = $_FILES['ProductImage']['size'];

    // MAKING THE CATEGORY INTO numeric / For Product Table
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
        $Prod_category = 6;
    }

//INSERTING PRODUCT/Image
		$insert_product_query = "SP_ADD_Product '$Prod_name', $Prod_category, $Prod_quantity_int, $Prod_unitprice_int, '$Prod_description', $Prod_discount_int, '$Prod_subcategory'";                       
		$result = sqlsrv_query($conn, $insert_product_query);

		$count_product_query = "SELECT MAX(ProductID) FROM Product";
		$params = array();
		$options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );
		$run_count_query = sqlsrv_query($conn, $count_product_query, $params, $options);
		
        while($row1=sqlsrv_fetch_array($run_count_query))//while look to fetch the result and store in a array $row1.  
        {
            $count = $row1[0];
            $count1 = (int)$count;
        }

        //Path of image
		$filePath = realpath($_FILES["ProductImage"]["tmp_name"]);

		$insert_image_query = "INSERT INTO ImageTable (ProductID, ImgName, ImgData) 
								SELECT $count1, 'ProdID_$count1', BulkColumn 
								FROM Openrowset( Bulk '$filePath', Single_Blob) as image";
		$resultImg = sqlsrv_query($conn, $insert_image_query);

			echo "<script>alert('Product successfully added!')</script>";				
			echo "<script>window.open('items.php','_self')</script>";
}
?>









