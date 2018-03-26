<?php 

namespace KDM\Entity;

class Item extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'item_id';
	protected $table = 'reference_items';
	public $timestamps = false;
	private $_container;
	
    public function __construct($container) 
	{
        $this->_container = $container;
	}
	
	public function add($request)
	{
		
	}
}

