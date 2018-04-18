<?php 



/** Special Route **/
$app->get('/additem',function($request, $response, $args) {
	if($_SESSION['logged_in'] != 1)
	{
		return $notFoundHandler($request, $response);
	}
	return $this->view->render($response, 'root.php', [
		'name' => 'additem'
	]);
});

$app->post('/submititem',function($request, $response, $args) {
	if($_SESSION['logged_in'] != 1)
	{
		return $notFoundHandler($request, $response);
	}
	$item = new \KDM\Entity\Item($this);
	$item->add($request);
	return $response->withRedirect('/additem');
});

$app->map(['GET','POST'], '/invite', function ($request, $response, $args) {
	if($request->isGet())
	{
		return $this->view->render($response, 'root.php', [
			'name' => 'invite'
		]);
	}
	
	foreach($request->getParam('email') as $_email)
	{
		$user = new \KDM\Entity\User($this);
		$user->createUser(trim($_email), $_SESSION['active_settlement']);
	}
	return $response->withRedirect('/invite');
})->setName('invite');

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

$app->get('/switch[/]', function($request, $response, $args) {
	$settlementId = $request->getParam('id');
	$settlementObj = new \KDM\Entity\Settlement($container);
	$settlement = $settlementObj->findOrFail($settlementId);
	if(!$settlement->users->contains($this->user->user_id))
	{
		throw new Exception('Invalid settlement access.');
		return null;
	}
	
	$_SESSION['active_settlement'] = $settlement->settlement_id;
	return $response->withRedirect('/');
})->setName('switch-campaign');

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
