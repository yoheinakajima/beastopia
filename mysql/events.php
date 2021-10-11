<?php

mysqlconnect();
$events_array = get_events();
$numrows = count($events_array);

if ($numrows == 0){
    echo "<div class='row'><p class='poppins'>Looks like there aren't any events at the moment. If you know of any events the community would enjoy, or if you're organizing one yourself - add it here!</p></div>";
}

for( $i = 0; $i<$numrows; $i++ ) {


    $name = urldecode($events_array[$i]['name']);
    $url = urldecode($events_array[$i]['url']);
    if ($url == ""){
        $url = "";
        $url2 = "";
    } else {
        $url = "<a href=".$url." target='_blank'>";
        $url2 = "</a>";

    }
    $description = urldecode($events_array[$i]['description']);
    $date = $events_array[$i]['date'];
    $date = date_format(date_create($date),"M j");
    
    $starttime = $events_array[$i]['starttime'];
    if ($starttime != "00:00:00"){
        $starttime = date_format(date_create($starttime),"g:m a");
        $starttime = ", ".$starttime;
    } else {
        $starttime = "";
    }

    $token_id = $events_array[$i]['token_id'];
    if (intval($token_id)<1000) {
        $image_id = "%23".$token_id;
    } else {
        $image_id = $token_id;
    }


    $timestamp = $events_array[$i]['timestamp'];
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


    echo "<div class='row mb-2'><div class='col-2'><div class='rpgui-container framed-golden' style='padding:0;position:relative;width:78px'><img src='nobg/".$image_id.".png' width=48></div></div><div class='col-10'><p>".$url.$name.$url2."</a><br/><span class='poppins'>".$date.$starttime."</span></br/><span class='poppins'>".$description."</span></p></div></div>";

}


function mysqlconnect(){
  mysql_connect("localhost", "xxxxxx", "xxxxxx") or die(mysql_error());
  mysql_select_db("beastopia") or die(mysql_error());
}


function get_events(){
    $result=mysql_query("SELECT * FROM `events` WHERE `date` >= CURDATE() ORDER BY `date` ASC LIMIT 200");
    $numrows = mysql_num_rows($result);
    $events_array = array();
    while ($rows=mysql_fetch_array($result)){
        array_push($events_array,$rows);
    } 
    return $events_array;
}


?>