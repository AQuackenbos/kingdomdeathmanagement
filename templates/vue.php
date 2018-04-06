<!doctype html>
<html>
	<head>
		<title>Kingom Death Management</title>
		<link rel="icon" type="image/png" href="/images/lantern.png" />
		<script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl" crossorigin="anonymous"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"/>
		<link rel="stylesheet" href="/css/styles.css"/>
	</head>
	<body>
		<div id="app" class="container">
			<router-view></router-view>
		</div>
		<script type="text/javascript" src="/js/kdm.js"></script>
		<script type="text/javascript">
			<?php if(count($container->user->settlements) > 1): ?>
			//Quick and easy campaign switcher for short notice -- replace with a vue method later...
			document.body.onload = function() {
				var switcher = document.createElement('form');
				switcher.action = '/switch/';
				switcher.id = 'switcher';
				switcher.className = 'navbar-item';
				var formHtml = '<label for="changesettlement">Active Settlement: <select id="changesettlement" name="id" onchange="switcher.submit()">';
				
				<?php foreach($container->user->settlements as $_s): ?>
				formHtml += '<option value="<?= $_s->settlement_id ?>" <?= ($_SESSION['active_settlement'] == $_s->settlement_id) ? 'selected="selected"' : '' ?>><?= $_s->name ?></option>';
				<?php endforeach ?>
				
				formHtml += '</select>';
				
				switcher.innerHTML = formHtml;
				
				document.querySelector('.navbar-end').insertBefore(switcher, document.getElementById('invite'));
			}
			<?php endif ?>
		</script>
	</body>
</html>
