<?php 
namespace KDM\Auth;

use Zend\Permissions\Acl\Acl as ZendAcl;

class Acl extends ZendAcl
{
    public function __construct()
    {
        // APPLICATION ROLES
        $this->addRole('guest');
        $this->addRole('member', 'guest'); 

        // APPLICATION RESOURCES
        // Application resources == Slim route patterns
        $this->addResource('/');
        $this->addResource('/login');
        $this->addResource('/logout');
        $this->addResource('/member');
        $this->addResource('/admin');

        // APPLICATION PERMISSIONS
        $this->allow('guest', '/login', array('GET', 'POST'));
        $this->allow('guest', '/logout', 'GET');

		// ALLOW ALL ACCESS
        $this->allow('member');
    }
}