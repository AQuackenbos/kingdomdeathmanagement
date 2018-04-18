<?php 

namespace KDM\Entity;

class Location extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'location_id';
	protected $table = 'reference_locations';
	public $timestamps = false;
	private $_container;
	
    public function __construct($container = null) 
	{
		$this->_container = $container;
	}
	
	public function getName()
	{
		$doc = json_decode($this->document);
		return $doc->name;
	}
	
	public function items()
	{
		return $this->hasMany('\KDM\Entity\Item','location_id');
	}
	
	function getAllLocations()
	{
		$allLocations = self::all();
		
		$output = [];
		foreach($allLocations as $_location)
		{
			$document = json_decode($_location->document,true);
			$document['location_id'] = $_location->location_id;
			$output[] = $document;
		}
		
		return ['locations' => $output];
	}
}