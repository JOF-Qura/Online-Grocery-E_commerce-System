<?php

if(isset($_POST['OrderID']))
{
    $output = '';
    $serverName = "JOSH"; //serverName\instanceName

    // Since UID and PWD are not specified in the $connectionInfo array,
    // The connection will be attempted using Windows Authentication.
    $connectionInfo = array( "Database"=>"Online_Grocery");
    $conn = sqlsrv_connect( $serverName, $connectionInfo);

// DI PA 'TO TAPOSSSSSS... ORDER ID DAPAT MAKUHA PAG PININDOT YUNG MODAL BUTTON
    $OrderId = $_POST['OrderID'];											
    $get_ordered_items = "SP_SHOW_ORDERED_ITEMS $OrderId";
    $get = sqlsrv_query($conn, $get_ordered_items);
    
    $output .= '
        <table class="timetable_sub">
            <thead>
            <tr>
                <th>Product Name</th>
                <th>Price per Unit</th>
                <th>Qty</th>	
                <th>Total Price</th>
            </tr>
        </thead>
        <tbody>';

        $TotalPrice = 0;
														
        while($rowProd = sqlsrv_fetch_array($get))//while look to fetch the result and store in a array $row.  
        {  
            $ProductName = $rowProd[0];
            $Discount = $rowProd[1];
            $UnitPrice = $rowProd[2];
            $UnitPrice_int = $UnitPrice + 0;
            $Qty = $rowProd[3];
            $Total = $rowProd[4];
            $Total_int = $Total + 0;

            $output .= '
                    <tr>
						<td style="text-align: left">'. $ProductName .'</td>
						<td style="text-align: right">₱'. $UnitPrice_int .'</td>
						<td style="text-align: right"><span>'. $Qty .'</span></td>
						<td style="text-align: right"><span>₱'. $Total_int .' </span></td>
					</tr>';
            $TotalPrice += $Total;
        }
        $output .='
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
						<td style="text-align: right"><strong><span>₱'. (float)$TotalPrice .'</span></strong></td>
					</tr>
					<tbody>
                </table>
                ';
        echo $output;
    }
?> 