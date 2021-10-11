<?php

if(!empty($_REQUEST['room_id'])) {
    $room_id = $_REQUEST['room_id'];
} else {
    $room_id = "";
}

mysqlconnect();
$messages_array = get_messages($room_id);
$numrows = count($messages_array);

if ($numrows == 0){
    echo "<div class='row'><p class='poppins'>This is a unique room for holders of this specific NFT collection. We thought it'd be a fun way for you to connect with fellow beasties who are in other communities with you!</p><p class='poppins'>Looks like you're the first one here. Why don't ya leave a message for the next person and check back later?</p></div>";
}

for( $i = 0; $i<$numrows; $i++ ) {


    $message = urldecode($messages_array[$i]['msg']);
    $token_id = $messages_array[$i]['token_id'];

    if (intval($token_id)>=1000){
        $token_id = $token_id;
        $image_id = $token_id;
      } else if ($token_id>100 && $token_id<1000){
        $image_id = "%23".$token_id;
      } else if ($token_id>10 && $token_id<100){
        $image_id = "%23".$token_id;
      } else {
      }


    $timestamp = $messages_array[$i]['timestamp'];
    $today = new DateTime("today"); 
    $match_date = DateTime::createFromFormat( 'Y-m-d H:i:s', $timestamp );
    $diff = $today->diff( $match_date );
    $diffDays = (integer)$diff->format( "%R%a" ); // Extract days count in interval
    switch( $diffDays ) {
        case 0:
            $when = "Today";
            break;
        case -1:
            $when = "Yesterday";
            break;
            break;
        default:
            $when = -$diffDays." days ago";
    }


    echo "<div class='row' style='position:relative;margin-top:5px'><div class='col-2'><div class='rpgui-container framed-golden' style='padding:0;position:relative;width:78px'><img src='nobg/".$image_id.".png' width=48></div></div><div class='col-7'><p>".$token_id.": ".$message."</p></div><div class='col-3'><p style='font-size:10px'>".$when."</p></div></div>";

}

if ($numrows > 5){
    echo "<div style='height:100px'></div>";
}


function mysqlconnect(){
  mysql_connect("localhost", "xxxxxx", "xxxxxx") or die(mysql_error());
  mysql_select_db("beastopia") or die(mysql_error());
}


function get_messages($room_id){
    $result=mysql_query("SELECT * FROM `msgs` WHERE `room_id` = '".$room_id."' ORDER BY `timestamp` DESC LIMIT 200");
    $numrows = mysql_num_rows($result);
    $msgs_array = array();
    while ($rows=mysql_fetch_array($result)){
        array_push($msgs_array,$rows);
    } 
    return $msgs_array;
}


?>