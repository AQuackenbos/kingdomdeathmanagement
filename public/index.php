<?php 
session_start();
ini_set('display_errors',1);
$_CONFIG = require '../config.php';
require '../vendor/autoload.php';

$app = new \Slim\App($_CONFIG);

$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer('templates/');
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
	return $this->view->render($response, 'root.php', [
        'name' => 'base'
    ]);
})->setName('default');

$app->group('/survivor', function () {
	$this->get('', function($request, $response, $args) {
		return $this->view->render($response, 'root.php', [
			'name' => 'base'
		]);
	})->setName('survivor-info');
	$this->get('/{id}', function ($request, $response, $args) {
		return $this->view->render($response, 'root.php', [
			'name' => 'base'
		]);
	})->setName('single-survivor');
});

$app->group('/api', function() {
	$this->map(['GET','POST','DELETE'],'/survivor[/]', function($request, $response, $args) {
		$survivor = new \KDM\Entity\Survivor($this);
		if($request->isGet())
		{
			return $survivor->getSurvivors();
		}
		
		if($request->isPost())
		{
			return $survivor->saveSurvivor($request->getParam('data'));
		}
		
		if($request->isDelete())
		{
			return $survivor->deleteSurvivor($request->getParam('id'));
		}
	})->setName('survivor-api');
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
	$user = new \KDM\Auth\User($this);
	return $user->login($request, $response);
})->setName('login');

$app->post('/reset', function ($request, $response, $args) {
	$user = new \KDM\Auth\User($this);
	return $user->reset($request, $response);
})->setName('reset');

$app->post('/change', function ($request, $response, $args) {
	$user = new \KDM\Auth\User($this);
	return $user->change($request, $response);
})->setName('change');

$app->get('/reset/{token}[/]', function ($request, $response, $args) {
	$user = new \KDM\Auth\User($this);
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
	$user = new \KDM\Auth\User($this);
	return $user->logout($request, $response);
})->setName('logout');

$app->run();