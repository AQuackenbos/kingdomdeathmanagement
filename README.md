# Kingdom Death Management
Multi-user Campaign manager for Kingdom Death Monster.

## Install
Copy `config.php.sample` to `config.php` and configure necessary fields.
````
mysql -u username -p database_name < install.sql
mysql -u username -p database_name < reference-data.sql
composer install
npm install
webpack -p
````
Then run a server out of /public.
