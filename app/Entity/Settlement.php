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
	
	public function isUserAdmin($userId)
	{
		//@todo
		return true;
	}
	
	public function getCombinedDocument()
	{
		return [
			'name'			=> $this->name,
			'description'	=> $this->description,
			'lantern_year'	=> $this->year,
			'resources'		=> json_decode($this->resources,true),
			'timeline'		=> json_decode($this->timeline,true),
			'quarries'		=> json_decode($this->quarries,true),
			'locations'		=> json_decode($this->locations,true)
		];
	}
	
	public function saveData($field, $data, $isJson = false)
	{
		$this->$field = $data;
		$this->push();
		return json_encode(['saved' => true, 'settlement' => $this->getCombinedDocument()]);
	}
}