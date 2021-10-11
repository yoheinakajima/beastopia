<?php
	$wallet_id = $_POST['wallet_id'];
	$token_id = $_POST['token_id'];
	$event_name = urlencode($_POST['event_name']);
	$event_url = urlencode($_POST['event_url']);
	$event_date = $_POST['event_date'];
	$event_starttime = $_POST['event_starttime'];
	$event_description = urlencode($_POST['event_description']);

	mysql_connect("localhost", "xxxxxx", "xxxxxx") or die(mysql_error());
	mysql_select_db("beastopia") or die(mysql_error());
	$query = "INSERT INTO `events` (`wallet_id`, `token_id`, `name`,`url`, `date`, `starttime`, `description`) VALUES ('".$wallet_id."','".$token_id."','".$event_name."','".$event_url."','".$event_date."','".$event_starttime."','".$event_description."');";
	$result = mysql_query($query);
	$response = mysql_insert_id($result);
	echo $response;
	mysql_close();
?>