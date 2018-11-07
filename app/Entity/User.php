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
	
	public function canSaveForSettlement($settlementId)
	{
		return $this->settlements->contains($settlementId);
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
		$this->_sendReset($email, true);
		return $response->withRedirect('/login');
	}
	
	protected function _sendReset($email, $messages = true)
	{
		if($email == '')
		{
			if($messages)
				$_SESSION['message'] = 'Bad login info.';
			
			return;
		}
		
		$user = false;
		try {
			$user = \KDM\Entity\User::where('username','=',$email)->firstOrFail();
		} catch (Exception $e)
		{
			if(count($matches) == 0 || count($matches) > 1)
			{
				if($messages)
					$_SESSION['message'] = 'The user at this email will receive a reset link.';
				
				return;
			}
		}
		
		$token = md5(uniqid());
		
		$user->reset_token = $token;
		$user->save();
		
		$headers = 'From: webmaster@kingdomdeathmanagement.com' . "\r\n" .
			'Reply-To: webmaster@kingdomdeathmanagement.com' . "\r\n" .
			'X-Mailer: PHP/' . phpversion();
		mail($email, 'Reset Password for KDM', 'Reset password link: https://kingdomdeathmanagement.com/reset/'.$token, $headers);
		
		if($messages)
			$_SESSION['message'] = 'The user at this email will receive a reset link.';
		
		return;
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
			$user = $this->findOrFail($matches[0]['user_id']);
			$_SESSION['logged_in'] = $user->user_id;
			$_SESSION['active_settlement'] = $user->settlements()->first()->settlement_id;
			return $response->withRedirect('/');
		}
		
		$_SESSION['message'] = 'Bad login info.';
		return $response->withRedirect('/login');
	}
	
	public function createUser($email, $settlementId)
	{
		
		if(!array_key_exists('message',$_SESSION))
		{
			$_SESSION['message'] = '';
		}
		
		if($email == '')
		{
			return;
		}
		
		$settlement = \KDM\Entity\Settlement::findOrFail($settlementId);
		if(count($settlement->users) >= 4)
		{
			$_SESSION['message'] = $_SESSION['message'].'<br>Did not add user "'.$email.'": settlement already has max users (4).';
			return;
		}
		
		try {
			$existing = \KDM\Entity\User::where('username','=',$email)->firstOrFail();
			if($existing->settlements->contains($settlementId))
			{
				$_SESSION['message'] = $_SESSION['message'].'<br>User "'.$email.'" is already a part of this settlement.';
				return;
			}
			
			$existing->settlements()->attach($settlementId);
			$_SESSION['message'] = $_SESSION['message'].'<br>Existing User "'.$email.'" added to settlement.';
			return;
		} catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
			//nothing - normal
		}
		
		//new user 
		
		$newUser = new \KDM\Entity\User;
		$newUser->username = $email;
		$newUser->password = '';
		$newUser->save();
		$newUser->settlements()->attach($settlementId);
		$this->_sendReset($email,false);
		$_SESSION['message'] = $_SESSION['message'].'<br>New User "'.$email.'" added to settlement.';
		return;
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