<?php

/** Pass through and do nothing **/
$app->get('/', function ($request, $response, $args) {  
	return $this->view->render($response, 'vue.php');
})->setName('default');

$whitelist = [
	'settlement',
	'survivor',
	'item',
	'location'
];

foreach($whitelist as $p) {
	$app->get('/'.$p.'[/[{id}[/]]]', function($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName($p);
}
