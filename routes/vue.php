<?php

/** Pass through and do nothing **/
$app->get('/', function ($request, $response, $args) {  
	return $this->view->render($response, 'vue.php');
})->setName('default');

$app->group('/settlement', function() {
	$this->get('/', function($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('settlement-info');
	$this->get('/{page}', function ($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('settlement-page');
});

$app->group('/survivor', function () {
	$this->get('/', function($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('survivor-info');
	$this->get('/{id}', function ($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('single-survivor');
});

$app->group('/item', function () {
	$this->get('/', function($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('item-info');
	$this->get('/{id}', function ($request, $response, $args) {
		return $this->view->render($response, 'vue.php');
	})->setName('single-item');
});
