<?php
session_start();
?>

    <?php  
    $serverName = "JOSH"; //serverName\instanceName

    // Since UID and PWD are not specified in the $connectionInfo array,
    // The connection will be attempted using Windows Authentication.
    $connectionInfo = array( "Database"=>"Online_Grocery");
    $conn = sqlsrv_connect( $serverName, $connectionInfo); 

    $view_all_customers_query = "SELECT * FROM V_LIST_User_Customer";//select query for viewing products.
    $params = array();
    $options =  array( "Scrollable" => SQLSRV_CURSOR_KEYSET );

    $run_query_view_customer = sqlsrv_query($conn, $view_all_customers_query, $params, $options);

    while($row=sqlsrv_fetch_array($run_query_view_customer))//while look to fetch the result and store in a array $row.  
    {   
        $UserID = $row[0];
        $CustomerID = $row[1];
        $CustomerPhone = $row[2];
        $CustomerEmail = $row[3];
        $CustomerName = $row[4];
        $CustomerAddress = $row[5];
    }
    ?>  