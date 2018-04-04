<?php
namespace KDM;

class Auth
{
    private $container;

    public function __construct($container) 
	{
        $this->container = $container;
    }

    /**
     * Example middleware invokable class
     *
     * @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
     * @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
     * @param  callable                                 $next     Next middleware
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function __invoke($request, $response, $next)
    {
		$route = $request->getAttribute('route');
		$routeName = $route->getName();
		$groups = $route->getGroups();
		$methods = $route->getMethods();
		$arguments = $route->getArguments();

		# Define routes that user does not have to be logged in with. All other routes, the user
		# needs to be logged in with.
		$publicRoutesArray = array(
			'login',
			'reset',
			'change-password',
			'logout',
			'change'
		);
		
		
		if ((!array_key_exists('logged_in',$_SESSION) || !isset($_SESSION['logged_in'])) && !in_array($routeName, $publicRoutesArray))
		{
			// redirect the user to the login page and do not proceed.
			$response = $response->withRedirect('/login');
		}
		else
		{
			// Proceed as normal...
			if(array_key_exists('logged_in',$_SESSION))
			{
				try {
					$user = new Entity\User($this->container);
					$user = $user->findOrFail($_SESSION['logged_in']);
					$this->container->user = $user;
				} catch (Exception $e) {
					//Don't really care actually
				}
			}
			$response = $next($request, $response);
		}

		return $response;
    }
}