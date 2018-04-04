<style>
	body,html {
		font-size: 1.5rem;
	}
	input {
		height: 1.5rem;
	}
	textarea {
		height: 150px;
		width: 30%;
		font-family: "Lucida Console", Monaco, monospace;
	}
</style>
<div style="text-align: center; margin: 0 auto">
<form action="/submititem" method="POST">
	<input name="name" placeholder="Item Name" autocomplete="off"/><br />
	<select name="metatype">
		<option>gear</option>
		<option>resource</option>
		<option>other</option>
	</select><br />
	<input name="resource_type" placeholder="Resource Type (if appl)" autocomplete="off"><br />
	<input name="description" placeholder="Description" autocomplete="off"><br />
	<input name="types" placeholder="Types (,)" autocomplete="off"><br />
	<select name="stats_type">
		<option>none</option>
		<option>weapon_stats</option>
		<option>armor_stats</option>
	</select><br />
	<textarea name="stats_json" placeholder="stats json"></textarea><br />
	<textarea name="connections_json" placeholder="connections json"></textarea><br />
	<textarea name="bonuses_json" placeholder="bonuses json"></textarea><br />
	<button type="submit">Add item</button>
</form>
</div>