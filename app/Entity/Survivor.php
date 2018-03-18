<?php 

namespace KDM\Entity;

class Survivor extends \Illuminate\Database\Eloquent\Model  
{
	protected $table = 'survivors';
	public $timestamps = false;
    private $_container;
	private $_campaignId;
	
    public function __construct($container) 
	{
        $this->_container = $container;
		$this->_campaignId = $this->_getCampaignId();
    }
	
	protected function _getCampaignId()
	{
		$user = $_SESSION['logged_in'];
		if(!$user)
		{
			//dafuq
			return 0;
		}
		
		$m = new \KDM\Auth\User($this->_container);
		return $m->getCampaignId($user);
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
		$data = json_decode($survivorJsonData,true);
		$survivorId = $data['id'];
		unset($data['id']);
		$new = true;
		if($survivorId != -1)
		{
			if($this->where([['id',intval($survivorId)],['campaign_id',$this->_campaignId]])->exists())
			{
				$new = false;
			}
		}
		
		if($new)
		{
			$lastId = $this->insertGetId(['document' => json_encode($data), 'campaign_id' => $this->_campaignId]);
			
			$data['id'] = $lastId;
			return json_encode(['newSurvivor' => $data]);
		}
		
		$this->where([['id', $survivorId],['campaign_id',$this->_campaignId]])->update(['document' => json_encode($data)]);
		return json_encode(['update' => true]);
	}
	
	public function getSurvivors()
	{		
		$survivors = [];
		foreach($this->get() as $s)
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
		$this->where([['id',intval($delId)],['campaign_id',$this->_campaignId]])->delete();
		return json_encode(['deleted' => true]);
	}
}