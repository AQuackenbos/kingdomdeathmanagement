<?php 
session_start();
error_reporting(E_ALL);
ini_set('display_errors',1);
$_CONFIG = require '../config.php';
require '../vendor/autoload.php';

$app = new \Slim\App($_CONFIG);

$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer('../templates/');
};

// Service factory for the ORM
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);

$capsule->setAsGlobal();
$capsule->bootEloquent();


// Apply the middleware to every request.
$app->add(new KDM\Auth($container));

/** Get app running "as before" on slim **/
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

$app->group('/api', function() {
	$this->map(['GET','POST','DELETE'],'/survivor[/]', function($request, $response, $args) {
		$survivor = new \KDM\Entity\Survivor($this);
		$settlement = $this->user->settlements()->first();
		if($request->isGet())
		{
			return $survivor->getSurvivors($settlement->settlement_id);
		}
		
		if($request->isPost())
		{
			return $survivor->saveSurvivor($request->getParam('data'),$settlement->settlement_id);
		}
		
		if($request->isDelete())
		{
			return $survivor->deleteSurvivor($request->getParam('id'));
		}
	})->setName('survivor-api');
});

/** Special Route **/
$app->get('/additem',function($request, $response, $args) {
	if($_SESSION['logged_in'] != 1)
	{
		return $notFoundHandler($request, $response);
	}
	return $this->view->render($response, 'vue.php', [
		'name' => 'additem'
	]);
});

$app->post('/submititem',function($request, $response, $args) {
	if($_SESSION['logged_in'] != 'a.quackenbos@gmail.com')
	{
		return $notFoundHandler($request, $response);
	}
	$item = new \KDM\Entity\Item($this);
	$item->add($request);
	return $response->withRedirect('/additem');
});

/** Auth routes **/
$app->map(['GET','POST'], '/login', function ($request, $response, $args) {
	if($request->isGet())
	{	
		if(array_key_exists('logged_in',$_SESSION) && $_SESSION['logged_in'] != '')
		{
			return $response->withRedirect('/');
		}
		return $this->view->render($response, 'root.php', [
			'name' => 'login'
		]);
	}
	$user = new \KDM\Entity\User($this);
	return $user->login($request, $response);
})->setName('login');

$app->post('/reset', function ($request, $response, $args) {
	$user = new \KDM\Entity\User($this);
	return $user->reset($request, $response);
})->setName('reset');

$app->post('/change', function ($request, $response, $args) {
	$user = new \KDM\Entity\User($this);
	return $user->change($request, $response);
})->setName('change');

$app->get('/reset/{token}[/]', function ($request, $response, $args) {
	$user = new \KDM\Entity\User($this);
	$valid = $user->validateToken($args['token']);
	if(!$valid)
	{
		$_SESSION['message'] = 'Invalid reset token.';
		return $response->withRedirect('/login');
	}
	return $this->view->render($response, 'root.php', [
		'name' => 'change-password',
		'token' => $args['token']
	]);
})->setName('change-password');

$app->get('/logout', function ($request, $response, $args) {
	$user = new \KDM\Entity\User($this);
	return $user->logout($request, $response);
})->setName('logout');

$app->run();
