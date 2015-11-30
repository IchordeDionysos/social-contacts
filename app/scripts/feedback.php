<?php
	//$url = 'https://api.github.com/repos/IchordeDionysos/social-contacts/issues?access_token=...';
	$url = 'http://requestb.in/1d08ik11?access_token=sdfkjhsjfkjnfjksj34df34dfcsd3'
	$method = 'POST';
	$contentType = 'application/json';
	$handleAs = 'json';

	$title = $_POST['title'];
	$email = $_POST['email'];
	$body = $_POST['body'];
	$assignee = 'IchordeDionysos';
	$labels = $_POST['labels'];

	console_log($title);
	console_log($body);
	console_log($assignee);
	console_log($labels);

	$data = array('title' => $title, 
				  'body' => $body, 
				  'assignee' => $assignee, 
				  'labels' => $labels);

	$options = array(
		'http' => array(
			'header' => 'Content-type: '.$contentType,
			'method' => $method,
			'content' => http_build_query($data), 
		),
	);

	$context = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	echo $result;

	function console_log( $data ){
	  echo '<script>';
	  echo 'console.log('. json_encode( $data ) .')';
	  echo '</script>';
	}
?>