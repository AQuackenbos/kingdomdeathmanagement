<!doctype html>
<html>
	<head>
		<title>Kingom Death Management</title>
		<script src="https://cdn.jsdelivr.net/npm/vue"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"/>
		<link rel="stylesheet" href="css/styles.css"/>
	</head>
	<body>
		<div id="app" class="container">
			<div class="columns">
				<survivor-list></survivor-list>
				<survivor></survivor>
			</div>
		</div>
		<?php include 'templates/survivor.html'; ?>
		<?php include 'templates/survivor-list.html'; ?>
		<script type="text/javascript" src="js/app.js"></script>
	</body>
</html>