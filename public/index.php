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
	$vars = [ 'container' => $container ];
    return new \Slim\Views\PhpRenderer('../templates/', $vars);
};

// Service factory for the ORM
$capsule = new \Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);

$capsule->setAsGlobal();
$capsule->bootEloquent();


// Apply the middleware to every request.
$app->add(new KDM\Auth($container));

include '../routes/vue.php';
include '../routes/api.php';
include '../routes/auth.php';

$app->run();
