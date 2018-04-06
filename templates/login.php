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
<section class="hero is-success is-fullheight">
	<div class="hero-body">
		<div class="container has-text-centered">
			<?php if(array_key_exists('message',$_SESSION) && $_SESSION['message'] != ''): ?>
			<div class="notification is-danger"><?php echo $_SESSION['message'] ?></div>
			<?php unset($_SESSION['message']) ?>
			<?php endif ?>
			<div class="column is-4 is-offset-4">
				<h3 class="title has-text-grey">Kingdom Death Management</h3>
				<p class="subtitle has-text-grey">Please login to proceed.</p>
				<div class="box">
					<figure class="avatar">
						<img src="images/lantern.png">
					</figure>
					<form action="/login" method="POST" id="userform">
						<div id="notice" style="display: none;margin-bottom:10px;">
							Check your spam folder for the reset email, as this is an "unknown" AWS box and Gmail/etc don't like getting mail from them.
						</div>
						<div class="field">
							<div class="control">
								<input class="input is-large" name="email" type="email" placeholder="Your Email" autofocus="">
							</div>
						</div>
						<div class="field">
							<div class="control">
								<input class="input is-large" name="password" type="password" placeholder="Your Password">
							</div>
						</div>
						<button class="button is-block is-info is-large is-fullwidth">Login</button>
					</form>
				</div>
				<p class="has-text-grey">
					<a href="#" onclick="swapForms();">Reset Password</a>
				</p>
			</div>
		</div>
	</div>
</section>
<script type="text/javascript">
function swapForms()
{
	let form = document.querySelector('#userform');
	if(form.action.indexOf('login') != -1)
	{
		form.action = 'reset';
		form.querySelector('#notice').style.display = 'block';
		form.querySelector('input[type="password"]').style.display = 'none';
		form.querySelector('button').innerHTML = 'Reset Password';
		document.querySelector('a').innerHTML = 'Login';
	}
	else
	{
		form.action = 'login';
		form.querySelector('#notice').style.display = 'none';
		form.querySelector('input[type="password"]').style.display = '';
		form.querySelector('button').innerHTML = 'Login';
		document.querySelector('a').innerHTML = 'Reset Password';
	}
}
</script>