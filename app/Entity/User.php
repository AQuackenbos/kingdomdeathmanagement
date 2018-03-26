<?php 

namespace KDM\Entity;

class User extends \Illuminate\Database\Eloquent\Model  
{
    protected $primaryKey = 'user_id';
	protected $table = 'users';
	public $timestamps = false;
    private $container;
	private $_pepper;
	
	const HMAC_ALGORITHM = 'sha256';
	
    public function __construct($container = false) 
	{
        $this->container = $container;
		@$this->_pepper = $this->container['settings']['auth']['pepper'];
    }
	
	public function settlements()
	{
		return $this->belongsToMany('\KDM\Entity\Settlement','user_settlements','user_id','settlement_id');
	}
	
	public function change($request, $response)
	{
		$token = $request->getParam('token');
		$password = $request->getParam('password');
		
		if($token == '' || $password == '')
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		$matches = $this->select('username')->where('reset_token',$token)->get();
		
		if(count($matches) == 0 || count($matches) > 1)
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		$this->where('reset_token',$token)
			->update(['password' => $this->_hash($password), 'reset_token' => '']);
			
			
		$_SESSION['message'] = 'Your password has been reset.';
		return $response->withRedirect('/login');
	}
	
	public function validateToken($token)
	{
		$matches = $this->select('username')->where('reset_token',$token)->get();
		if(count($matches) == 0 || count($matches) > 1 || $token == '')
		{
			return false;
		}
		return true;
	}
	
	public function logout($request, $response)
	{
		unset($_SESSION['logged_in']);
		return $response->withRedirect('/login');
	}
	
	public function reset($request, $response)
	{
		$email = $request->getParam('email');
		if($email == '')
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		$matches = $this->select('username','password')->where('username',$email)->get();
		
		if(count($matches) == 0 || count($matches) > 1)
		{
			$_SESSION['message'] = 'The user at this email will receive a reset link.';
			return $response->withRedirect('/login');
		}
		
		$token = md5(uniqid());
		
		$this->where('username',$email)->update(['reset_token' => $token]);
		
		$headers = 'From: webmaster@kingdomdeathmanagement.com' . "\r\n" .
			'Reply-To: webmaster@kingdomdeathmanagement.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
		mail($email, 'Reset Password for KDM', 'Reset password link: https://kingdomdeathmanagement.com/reset/'.$token, $headers);
		
		$_SESSION['message'] = 'The user at this email will receive a reset link.';
		return $response->withRedirect('/login');
	}
	
	public function login($request, $response) 
	{
		$email = $request->getParam('email');
		$password = $request->getParam('password');
		
		if($email == '' || $password == '')
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		$matches = $this->select('user_id','username','password')->where('username','=',$email)->get();
		
		if(count($matches) == 0 || count($matches) > 1)
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		if($matches[0]['password'] == '')
		{
			$_SESSION['message'] = 'Bad login info.';
			return $response->withRedirect('/login');
		}
		
		if($this->_verifyPassword($password, $matches[0]['password']))
		{
			$_SESSION['logged_in'] = $matches[0]['user_id'];
			return $response->withRedirect('/');
		}
		
		$_SESSION['message'] = 'Bad login info.';
		return $response->withRedirect('/login');
	}
	
	protected function _hash($password)
	{
		return password_hash($this->_hmac($password), PASSWORD_DEFAULT);
	}
	
	protected function _verifyPassword($password, $passwordHash)
	{
		return password_verify($this->_hmac($password), $passwordHash);
	}
	
	private function _hmac($password) 
	{
		return hash_hmac(self::HMAC_ALGORITHM, $password, $this->_pepper, true);
	}
}