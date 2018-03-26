<?php 

namespace KDM\Entity;

class Settlement extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'settlement_id';
	protected $table = 'settlements';
	public $timestamps = false;
    private $container;
	private $_pepper;
	
    public function __construct($container = false) 
	{
        $this->container = $container;
    }
	
	public function users()
	{
		return $this->belongsToMany('\KDM\Entity\User','user_settlements','settlement_id','user_id');
	}
	
	public function survivors()
	{
		return $this->hasMany('\KDM\Entity\Survivor','settlement_id');
	}
}