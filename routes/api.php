<?php 

function validateSettlement($container)
{
	$settlementId = $_SESSION['active_settlement'];
	$settlement = \KDM\Entity\Settlement::findOrFail($settlementId);
	if(!$settlement->users->contains($container->user->user_id))
	{
		throw new Exception('Invalid settlement access.');
		return null;
	}
	
	return $settlement;
}

$app->group('/events', function() {
	$this->get('/send[/]', function($request, $response, $args) {
		header('Cache-Control: no-cache');
		header("Content-Type: text/event-stream\n\n");
		$counter = 0;
		while(true) {
			echo 'event: message'."\n";
			echo 'data: '.$counter."\n\n";
			ob_end_flush();
			flush();
			$counter++;
			sleep(1);
		}
	});
});

$app->group('/api', function() {
	$this->get('/settlement[/]', function($request, $response, $args) {
		$settlement = validateSettlement($this);
		return json_encode(['settlement' => $settlement->getCombinedDocument()]);
	})->setName('get-settlement');
	
	$this->post('/settlement/{key}[/]', function($request, $response, $args) {
		$settlement = validateSettlement($this);
		$field = $args['key'];
		$whitelist = [
			'name',
			'description',
			'year',
			'resources',
			'timeline',
			'locations',
			'quarries'
		];
		
		$jsonFields = [
			'resources',
			'timeline',
			'locations',
			'quarries'
		];
		
		if(in_array($field, $whitelist))
		{
			return $settlement->saveData($field, $request->getParam('data'), in_array($field, $jsonFields));
		}
		
		
		throw new Exception('Invalid settlement save request.');
		
	})->setName('save-settlement');
	
	$this->get('/items[/]', function($request, $response, $args) {
		$item = new \KDM\Entity\Item($this);
		return json_encode($item->getAllItems());
	})->setName('items');
	
	$this->get('/locations[/]', function($request, $response, $args) {
		$item = new \KDM\Entity\Location($this);
		return json_encode($item->getAllLocations());
	})->setName('locations');
	
	$this->get('/keywords[/]', function($request, $response, $args) {
		$item = new \KDM\Entity\Keyword($this);
		return json_encode($item->getAllKeywords());
	})->setName('keywords');
	
	$this->map(['GET','POST','DELETE'],'/survivor[/]', function($request, $response, $args) {
		$survivor = new \KDM\Entity\Survivor($this);
		$settlement = validateSettlement($this);
		
		if($request->isGet())
		{
			return $survivor->getSurvivors($settlement);
		}
		
		if($request->isPost())
		{
			return $survivor->saveSurvivor($request->getParam('data'),$settlement);
		}
		
		if($request->isDelete())
		{
			return $survivor->deleteSurvivor($request->getParam('id'));
		}
	})->setName('survivor-api');
});