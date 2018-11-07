<?php

namespace KDM\Entity;

class Gearset extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'gearset_id';
	protected $table = 'gearsets';
	public $timestamps = false;
	private $container;

    public function __construct($container = false) 
	{
        $this->container = $container;
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
	
	
}