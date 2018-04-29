<style>
	body,html {
		font-size: 1.5rem;
	}
	input {
		height: 1.5rem;
		width: 500px !important;
	}
	textarea {
		height: 150px !important;
		width: 500px !important;
		font-family: "Lucida Console", Monaco, monospace;
	}
</style>
<?php $locations = \KDM\Entity\Location::all() ?>
<div style="text-align: center; margin: 0 auto">
<form action="/submititem" method="POST">
	<input type="text" name="name" placeholder="Item Name" autocomplete="off"/><br />
	<select name="location" autocomplete="off">
		<?php foreach ($locations as $l): ?>
		<option value="<?= $l->location_id ?>"><?= $l->getName() ?></option>
		<?php endforeach ?>
	</select>
	<select name="metatype" autocomplete="off">
		<option>gear</option>
		<option>resource</option>
		<option>other</option>
	</select><br />
	<input type="text" name="resource_type" placeholder="Resource Type (if appl)" autocomplete="off"><br />
	<textarea name="description" placeholder="Description" autocomplete="off"></textarea></br />
	<input type="text" name="types" placeholder="Types (,)" autocomplete="off"><br />
	<input type="text" name="keywords" placeholder="Keywords (,)" autocomplete="off"><br />
	Type <select name="stats_type">
		<option>none</option>
		<option>weapon_stats</option>
		<option>armor_stats</option>
	</select><br />
	Wpn
	<input name="weapon_stats[speed]" placeholder="Speed" autocomplete="off" style="width:50px !important"/>
	<input name="weapon_stats[hit]" placeholder="Hit" autocomplete="off" style="width:50px !important"/>
	<input name="weapon_stats[strength]" placeholder="Strength" autocomplete="off" style="width:50px !important"/><br />
	Arm
	<select name="armor_stats[location]" autocomplete="off">
		<option></option>
		<option>head</option>
		<option>body</option>
		<option>waist</option>
		<option>arms</option>
		<option>legs</option>
	</select>
	<input name="armor_stats[defense]" placeholder="Defense" autocomplete="off" style="width:50px !important"/><br />
	Conn <select name="connections[top]" autocomplete="off">
		<option value="">TOP</option>
		<option>red</option>
		<option>blue</option>
		<option>green</option>
	</select>
	<select name="connections[left]" autocomplete="off">
		<option value="">LEFT</option>
		<option>red</option>
		<option>blue</option>
		<option>green</option>
	</select>
	<select name="connections[bottom]" autocomplete="off">
		<option value="">BOTTOM</option>
		<option>red</option>
		<option>blue</option>
		<option>green</option>
	</select>
	<select name="connections[right]" autocomplete="off">
		<option value="">RIGHT</option>
		<option>red</option>
		<option>blue</option>
		<option>green</option>
	</select>
	<br />
	<textarea name="bonuses_json" placeholder="bonuses json" autocomplete="off"></textarea><br />
	Recipe <input type="text" name="recipe[requires]" placeholder="Requires tech/other (,)" autocomplete="off"/><br />
	<input type="text" name="recipe[materials]" placeholder="Materials (: ,)" autocomplete="off"/><br />
	<button type="submit">Add item</button>
</form>
</div>