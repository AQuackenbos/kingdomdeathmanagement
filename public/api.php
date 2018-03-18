<?php 

require_once('../vendor/autoload.php');

require('../dbconfig.php');

class Survivors {
	
	protected function _connect()
	{
		global $_DBCONFIG;
		$db = new PDO('mysql:host='.$_DBCONFIG['host'].';dbname='.$_DBCONFIG['db'], $_DBCONFIG['user'], $_DBCONFIG['pass']);
		return $db;
	}
	
	protected function _sort($a, $b)
	{
		@$aAlive = ($a['survival']['died'] == null || $a['survival']['died'] == '');
		@$bAlive = ($b['survival']['died'] == null || $b['survival']['died'] == '');
		
		if($aAlive && !$bAlive)
		{
			return -1;
		}
		
		if(!$aAlive && $bAlive)
		{
			return +1;
		}
		
		if($aAlive && $bAlive)
		{
			$aRetired = ($a['xp']['box16'] == true);
			$bRetired = ($b['xp']['box16'] == true);
			
			if($aRetired && !$bRetired)
			{
				return +1;
			}
			if(!$aRetired && $bRetired)
			{
				return -1;
			}
			
			
		}
		
		$al = strtolower($a['name']);
		$bl = strtolower($b['name']);
		if ($al == $bl) {
			return 0;
		}
		return ($al > $bl) ? +1 : -1;
	}
	
	public function saveSurvivor($survivorJsonData)
	{
		$db = $this->_connect();
		$data = json_decode($survivorJsonData,true);
		$survivorId = $data['id'];
		unset($data['id']);
		$new = true;
		if($survivorId != -1)
		{
			$query = 'SELECT COUNT(*) FROM survivors WHERE id = '.intval($survivorId);
			$r = $db->query($query);
			if($r->rowCount() > 0)
			{
				$new = false;
			}
		}
		
		if($new)
		{
			$q = 'INSERT INTO survivors (document) VALUES (:doc)';
			$p = $db->prepare($q);
			$p->execute([':doc' => json_encode($data)]);
			
			//echo 'ERR: '.$db->errorCode().' : '.var_export($db->errorInfo(),true);
			
			$lastId = $db->lastInsertId();
			$data['id'] = $lastId;
			return json_encode(['newSurvivor' => $data]);
		}
		
		$q = 'UPDATE survivors SET document = :doc WHERE id = :id';
		$p = $db->prepare($q);
		$p->execute([':doc' => json_encode($data), ':id' => $survivorId]);
		return json_encode(['update' => true]);
	}
	
	public function getSurvivors()
	{
		$db = $this->_connect();
		
		$query = 'SELECT * FROM survivors';
		
		$survivors = [];
		foreach($db->query($query) as $s)
		{
			$_s = json_decode($s['document'],true);
			$_s['id'] = $s['id'];
			$_s['alive'] = false;
			if(@$_s['survival']['died'] == '' || $_s['survival']['died'] == null)
			{
				$_s['alive'] = true;
			}
			$survivors[] = $_s;
		}
		
		usort($survivors, [$this, '_sort']);
		
		return json_encode(['survivors' => $survivors]);
	}
	
	public function deleteSurvivor($delId)
	{
		$db = $this->_connect();
		
		$query = 'DELETE FROM survivors WHERE id = :id';
		$p = $db->prepare($query);
		$p->execute([':id' => intval($delId)]);
		
		return json_encode(['deleted' => true]);
	}
	
}



$survivors = new Survivors();

if($_GET['load'] == 1)
{
	echo $survivors->getSurvivors();
	exit;
}

if($_POST['save'] == 1)
{
	echo $survivors->saveSurvivor($_POST['sdata']);
	exit;
}

if($_POST['delete'] == 1)
{
	echo $survivors->deleteSurvivor($_POST['ddata']);
	exit;
}

/**

use Sse\Event;
use Sse\SSE;
	
//create the event handler
class RetrieveUpdates implements Event {
	protected $_sCache = null;
	
	public function update(){
		global $survivors;
		$this->_sCache = $survivors->getSurvivors();
		return $this->_sCache;
	}
	
	public function check(){
		$new = $survivors->getSurvivors();
		//return ($new != $this->_sCache);
		return true;
	}
}

$sse = new SSE(); //create a libSSE instance
$sse->exec_limit = 15; //the execution time of the loop in seconds. Default: 600. Set to 0 to allow the script to run as long as possible.
$sse->sleep_time = 15; //The time to sleep after the data has been sent in seconds. Default: 0.5.
$sse->client_reconnect = 1; //the time for the client to reconnect after the connection has lost in seconds. Default: 1.

$sse->addEventListener('get_survivor_updates', new RetrieveUpdates());//register your event handler
$sse->start();//start the event loop
**/