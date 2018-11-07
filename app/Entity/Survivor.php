<?php 

namespace KDM\Entity;

class Survivor extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'survivor_id';
	protected $table = 'survivors';
	public $timestamps = false;
	private $container;

    public function __construct($container = false) 
	{
        $this->container = $container;
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
	
	public function settlement()
	{
		return $this->belongsTo('\KDM\Entity\Settlement','settlement_id');
	}
	
	protected function _canUserSaveForSettlement($settlement)
	{
		$user = $this->container->user;
		return $user->canSaveForSettlement($settlement->settlement_id);
	}
	
	public function saveSurvivor($survivorJsonData, $settlement = false)
	{
		$data = json_decode($survivorJsonData,true);
		$survivorId = $data['id'];
		unset($data['id']);
		$survivor = new Survivor($this->container);
		try {
			$survivor = $this->findOrFail($survivorId);
		} catch (\Illuminate\Database\Eloquent\ModelNotFoundException $mnfe) {
			//Expected - throw away
		} catch (Exception $e) {
			//Welp
		}
		
		if($survivor->settlement)
		{
			$settlement = $survivor->settlement;
		}
		
		if(!$this->_canUserSaveForSettlement($settlement))
		{
			return json_encode(['error' => true]);
		}
		
		if(!$survivor->settlement)
		{
			$survivor->settlement()->associate($settlement);
		}
		
		$survivor->document = json_encode($data);
		$survivor->push();
		
		return json_encode(['saved' => true, 'survivorId' => $survivor->survivor_id, 'newSurvivor' => json_decode($survivor->document,true)]);
	}
	
	public function getSurvivors($settlement)
	{		
		$survivors = [];
		foreach($settlement->survivors()->get() as $s)
		{
			$_s = json_decode($s->document,true);
			$_s['id'] = $s->survivor_id;
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
		try {
			$survivor = $this->findOrFail($delId);
			if(!$this->_canUserSaveForSettlement($survivor->settlement))
			{
				return json_encode(['error' => true]);
			}
			$survivor->delete();
			return json_encode(['deleted' => true]);	
		} catch (Exception $e) {
			return json_encode(['error' => true]);
		}
	}
}