<?php 

namespace KDM\Entity;

class Keyword extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'keyword_id';
	protected $table = 'reference_keywords';
	public $timestamps = false;
	private $_container;
	
    public function __construct($container = null) 
	{
		$this->_container = $container;
	}
	
	public function getKeyword()
	{
		$doc = json_decode($this->document);
		return $doc->keyword;
	}
	
	function getAllKeywords()
	{
		$allKeywords = self::all();
		
		$output = [];
		foreach($allKeywords as $_keyword)
		{
			$document = json_decode($_keyword->document,true);
			$document['keyword_id'] = $_keyword->keyword_id;
			$output[] = $document;
		}
		
		return ['keywords' => $output];
	}
}