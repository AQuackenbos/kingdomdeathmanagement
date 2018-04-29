<?php 

namespace KDM\Entity;

class Item extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'item_id';
	protected $table = 'reference_items';
	public $timestamps = false;
	private $_container;
	
    public function __construct($container = null) 
	{
        $this->_container = $container;
	}
	
	
	public function add($request)
	{
		$params = $request->getParams();
		
		$finalStructure = [
			'metatype' => $params['metatype'],
			'name'	=> trim($params['name']),
			'description' => trim($params['description']),
			'types' => [],
			'image' => '',
		];
		
		$keywords =  array_filter(array_map('trim', explode(',',$params['keywords'])),function($v){ return $v !== ''; });
		if(count($keywords))
			$finalStructure['keywords'] = $keywords;
		
		$types =  array_filter(array_map('trim', explode(',',$params['types'])),function($v){ return $v !== ''; });
		if(count($types))
			$finalStructure['types'] = $types;
		
		$stats = json_decode($params['stats_json'],true);
		if($params['stats_type'] != 'none')
			$finalStructure[$params['stats_type']] = $params[$params['stats_type']];
		
		$bonuses = json_decode($params['bonuses_json'],true);
		if($bonuses != null)
			$finalStructure['bonuses'] = $bonuses;
		
		$connections = array_filter($params['connections'],function($v){ return $v !== ''; });
		
		if($params['resource_type'] != '')
			$finalStructure['resource_type'] = $params['resource_type'];
		
		$recipe = [];
		if(trim($params['recipe']['requires']) != '') {
			$recipe['requires'] = array_filter(array_map('trim', explode(',',$params['recipe']['requires'])),function($v){ return $v !== ''; });
		}
		
		if(trim($params['recipe']['materials']) != '') {
			$mats = array_filter(array_map('trim', explode(',',$params['recipe']['materials'])),function($v){ return $v !== ''; });
			if(count($mats)) {
				$recipe['materials'] = [];
				foreach($mats as $_m) {
					$pieces = explode(':',$_m);
					
					$recipe['materials'][] = [
						'name' => trim($pieces[0]),
						'amount' => intval(trim($pieces[1]))
					];
				}
			}
		}
		
		if(count($recipe))
			$finalStructure['recipe'] = $recipe;
		
		if(count($connections))
			$finalStructure['connections'] = $connections;
		
		
		$location = \KDM\Entity\Location::findOrFail($params['location']);
		$item = new \KDM\Entity\Item($this->_container);
		$item->location()->associate($location);
		$item->document = json_encode($finalStructure);
		$item->push();
		
		return;
	}
	
	public function location()
	{
		return $this->belongsTo('\KDM\Entity\Location','location_id');
	}
	
	public function getType()
	{
		$doc = json_decode($this->document);
		
		if($doc->resource_type)
			return $doc->resource_type;
		
		return $doc->metatype;
	}
	
	public function getDescriptionHtml()
	{
		//@todo
		$doc = json_decode($this->document);
		return $doc->description;
	}
	
	function getAllItems()
	{
		$allItems = self::all();
		
		$output = [];
		foreach($allItems as $_item)
		{
			$document = json_decode($_item->document,true);
			$document['item_id'] = $_item->item_id;
			$document['location'] = $_item->location->getName();
			$output[] = $document;
		}
		
		return ['items' => $output];
	}
}

