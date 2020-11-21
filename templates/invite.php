<style>
	html,body {
		font-family: 'Open Sans', serif;
		font-size: 14px;
		font-weight: 300;
	}
	.hero.is-success {
		background: #F2F6FA;
	}
	.hero .nav, .hero.is-success .nav {
		-webkit-box-shadow: none;
		box-shadow: none;
	}
	.box {
		margin-top: 5rem;
	}
	.avatar {
		margin-top: -70px;
		padding-bottom: 20px;
	}
	.avatar img {
		padding: 5px;
		height: 128px;
		background: #fff;
		border-radius: 50%;
		-webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
		box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
	}
	input {
		font-weight: 300;
	}
	p {
		font-weight: 700;
	}
	p.subtitle {
		padding-top: 1rem;
	}
</style>
<?php $settlement = \KDM\Entity\Settlement::findOrFail($_SESSION['active_settlement']) ?>
<?php $userLimit = 6 //testing ?>
<section class="hero is-success is-fullheight">
	<div class="hero-body">
		<div class="container has-text-centered">
			<?php if(array_key_exists('message',$_SESSION) && $_SESSION['message'] != ''): ?>
			<div class="notification is-danger"><?php echo $_SESSION['message'] ?></div>
			<?php unset($_SESSION['message']) ?>
			<?php endif ?>
			<div class="column is-4 is-offset-4">
				<h3 class="title has-text-grey">Kingdom Death Management</h3>
				<p class="subtitle has-text-grey">Invite users to settlement: <?= $settlement->name ?>.</p>
				<p class="subtitle" style="color: blue"><a href="/">Return to Management App</a></p>
				<div class="box">
					<figure class="avatar">
						<img src="/images/lantern.png">
					</figure>
					<form action="/invite" method="POST" id="userform">
						<input type="hidden" name="settlement_id" value="<?= $settlement->settlement_id ?>"/>
						<div class="field">
							<p>Current Users</p>
							<ul>
						<?php foreach($settlement->users as $_u): ?>
								<li><?= $_u->username ?></li>
						<?php endforeach ?>
							</ul>
						</div>
						<?php if(count($settlement->users) < $userLimit): ?>
							<?php for($i = count($settlement->users); $i < $userLimit; $i++): ?>
							<div class="field">
								<div class="control">
									<input class="input is-large" name="email[]" type="text" placeholder="New User Email"/>
								</div>
							</div>
							<?php endfor ?>
						<button class="button is-block is-info is-large is-fullwidth">Invite Users</button>
						<?php else: ?>
						<div class="notice">
							A settlement can only have <?= $userLimit ?> users.
						</div>
						<?php endif ?>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>