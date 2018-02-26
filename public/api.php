<?php 

require('../dbconfig.php');

class Survivors {
	
	protected function _connect()
	{
		global $_DBCONFIG;
		$db = new PDO('mysql:host='.$_DBCONFIG['host'].';dbname='.$_DBCONFIG['db'], $_DBCONFIG['user'], $_DBCONFIG['pass']);
		return $db;
	}
	
	protected function _orderby()
	{
		$args = func_get_args();
		$data = array_shift($args);
		foreach ($args as $n => $field) {
			if (is_string($field)) {
				$tmp = array();
				foreach ($data as $key => $row)
					$tmp[$key] = $row[$field];
				$args[$n] = $tmp;
				}
		}
		$args[] = &$data;
		call_user_func_array('array_multisort', $args);
		return array_pop($args);
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
			if($_s['survival']['died'] == '' || $_s['survival']['died'] == null)
			{
				$_s['alive'] = true;
			}
			$survivors[] = $_s;
		}
		
		$sorted = $this->_orderby($survivors, 'alive', SORT_DESC, 'name', SORT_ASC);
		
		return json_encode(['survivors' => $sorted]);
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
}

if($_POST['save'] == 1)
{
	echo $survivors->saveSurvivor($_POST['sdata']);
}

if($_POST['delete'] == 1)
{
	echo $survivors->deleteSurvivor($_POST['ddata']);
}