<?php
	$wallet_id = $_POST['wallet_id'];
	$token_id = $_POST['token_id'];
	$message = urlencode($_POST['message']);
	$room_id = $_POST['room_id'];

	mysql_connect("localhost", "xxxxxx", "xxxxxx") or die(mysql_error());
	mysql_select_db("beastopia") or die(mysql_error());
	$query = "INSERT INTO `msgs` (`wallet_id`, `token_id`, `msg`, `room_id`) VALUES ('".$wallet_id."','".$token_id."','".$message."','".$room_id."');";
	$result = mysql_query($query);
	$response = mysql_insert_id($result);
	echo $response;
	mysql_close();
?>