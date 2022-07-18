
<?php
$serverName = "JOSH"; //serverName\instanceName

// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Online_Grocery");
$conn = sqlsrv_connect( $serverName, $connectionInfo);


            $delete_id = $_GET['delete_id'];
            $delete_id_int = (int)$delete_id;
            $delete_image_query = "SP_DELETE_IMAGE $delete_id_int";//delete query
            $delete_product_query = "SP_DELETE_PRODUCT $delete_id_int";//delete query
            $runimage = sqlsrv_query($conn, $delete_image_query);
            $runProd = sqlsrv_query($conn, $delete_product_query);

            // var_dump($delete_id_int);
            
            if($runimage)  
            {  
                if($runProd)
                {
                    //javascript function to open in the same window  
                    echo "<script>alert('Data successfully deleted!')</script>"; 
                    echo "<script>window.open('items.php?deleted=product has been deleted','_self')</script>"; 
                }
	        }

?>