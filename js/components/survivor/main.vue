<template>
	<div class="column survivor-panel" v-if="survivor.id === -1">
		<div class="columns is-multiline">
			<div class="column is-12">
				<h2 class="title is-2">New Survivor</h2>
				<h3 class="subtitle is-6" style="text-align:center">Enter a name for their Tombstone.</h3>
			</div>
			<div class="column is-12">
				<!-- Name -->
				<label class="label big" for="name">Name</label>
				<input class="name" type="text" id="name" placeholder="Name" v-model="survivor.name"/>
			</div>
		</div>
	</div>
	<div class="column survivor-panel" v-else>
		<div class="columns is-multiline">
			<div class="column is-half">
				<div class="columns is-multiline">
					<div class="column is-8">
						<!-- Name -->
						<label class="label big" for="name">Name</label>
						<input class="name" type="text" id="name" placeholder="Name" v-model="survivor.name"/>
					</div>
					<div class="column is-4" style="margin-top:8px;padding-right:0">
						<!-- Gender -->
						<label class="label">Gender</label>
						<label class="radio">
							<input type="radio" value="M" v-model="survivor.gender"/><span class="chkbx"></span>
							M
						</label>
						<label class="radio">
							<input type="radio" value="F" v-model="survivor.gender"/><span class="chkbx"></span>
							F
						</label>
					</div>
					<div class="column is-12">
						<hr />
						<p>When you name your survivor, gain +1 <strong>survival</strong></p>
					</div>
					<div class="column is-12">
						<hr />
						<div class="columns">
							<div class="column is-half">
								<label class="label" for="father">Father</label>
								<input class="father" type="text" id="father" placeholder="Father" v-model="survivor.father"/>
							</div>
							<div class="column is-half">
								<label class="label" for="mother">Mother</label>
								<input class="mother" type="text" id="mother" placeholder="Mother" v-model="survivor.mother"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div class="columns is-multiline">
					<div class="column is-3" style="padding-left:0">
						<!-- XP -->
						<label class="label big">Hunt XP</label>
					</div>
					<div class="column is-9" style="text-align:right;margin-top:8px">
						<span class="xp" @click="checkCorrectBoxes">
							<label><input type="checkbox" v-model="survivor.xp.box1"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box2"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box3"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box4"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box5"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box6"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box7"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box8"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box9"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box10"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box11"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box12"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box13"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box14"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box15"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.xp.box16"/><span class="chkbx retired"></span></label>
						</span>
					</div>
					<div class="column is-12">
						<hr />
						<span class="chkbx filled"></span>&nbsp;<i class="book"></i> Age
						<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<i class="book"></i> Age
						<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<i class="book"></i> Age
						<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<span class="chkbx filled"></span>&nbsp;<i class="book"></i> Age
						<span class="chkbx retired filled"></span><i class="book"></i> Retired
					</div>
					<div class="column is-12">
						<hr />
						<div class="columns">
							<div class="column is-12">
								<label for="party"><input type="checkbox" id="party" v-model="survivor.party"/><span class="chkbx"></span>&nbsp;Current Party Member</label><br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="columns sheet">
			<div class="column is-half">
				<div class="columns bordered">
					<div class="column is-one-quarter is-vcentered">
						<input type="number" id="survival" placeholder="0" class="bordered big" v-model="survivor.survival.value"/>
					</div>
					<div class="column is-half">
						<label for="survival" class="big">Survival</label>
						<br />							
						<!-- Alive -->
						<label class="label" for="born" style="float:left;width:50%;text-align:center">Born</label>
						<label class="label" for="born" style="float:left;width:50%;text-align:center">Died</label>
						<input type="number" id="born" class="bordered" style="width:40%;float:left;margin:0 5%" v-model="survivor.survival.born"/>
						<input type="number" id="died" class="bordered" style="width:40%;float:left;margin:0 5%" v-model="survivor.survival.died"/>
						<div class="cause-of-death" v-if="survivor.survival.died !== '' && survivor.survival.died !== undefined">
							<label for="cod" class="label">Cause of Death</label>
							<input type="text" id="cod" class="name" v-model="survivor.survival.cod"/>
						</div>
						<label style="clear:both;margin-top:0.25rem;"><input type="checkbox" id="survival-cannot" v-model="survivor.survival.cannot"/><span class="chkbx"></span>
							Cannot spend survival
						</label>
					</div>
					<div class="column is-one-quarter" style="padding-left:0">
						<label for="dodge"><input type="checkbox" id="dodge" v-model="survivor.survival.dodge"/><span class="chkbx"></span>&nbsp;Dodge</label><br />
						<label for="encourage"><input type="checkbox" id="encourage" v-model="survivor.survival.encourage"/><span class="chkbx"></span>&nbsp;Encourage</label><br />
						<label for="surge"><input type="checkbox" id="surge" v-model="survivor.survival.surge"/><span class="chkbx"></span>&nbsp;Surge</label><br />
						<label for="dash"><input type="checkbox" id="dash" v-model="survivor.survival.dash"/><span class="chkbx"></span>&nbsp;Dash</label><br />
						<label for="endure"><input type="checkbox" id="endure" v-model="survivor.survival.endure"/><span class="chkbx"></span>&nbsp;Endure</label>
					</div>
				</div>
				<div class="columns bordered">
					<div class="column bordered is-2">
						<input type="number" id="movement" placeholder="5" class="big" v-model="survivor.movement"/>
						<br />
						<label for="movement">Movement</label>
					</div>
					<div class="column bordered is-2">
						<input type="number" id="accuracy" placeholder="0" class="bordered" v-model="survivor.accuracy"/>
						<br />
						<label for="accuracy">Accuracy</label>
					</div>
					<div class="column bordered is-2">
						<input type="number" id="strength" placeholder="0" class="bordered" v-model="survivor.strength"/>
						<br />
						<label for="strength">Strength</label>
					</div>
					<div class="column bordered is-2">
						<input type="number" id="evasion" placeholder="0" class="bordered" v-model="survivor.evasion"/>
						<br />
						<label for="evasion">Evasion</label>
					</div>
					<div class="column bordered is-2">
						<input type="number" id="luck" placeholder="0" class="bordered" v-model="survivor.luck"/>
						<br />
						<label for="luck">Luck</label>
					</div>
					<div class="column bordered is-2" style="border:none">
						<input type="number" id="speed" placeholder="0" class="bordered" v-model="survivor.speed"/>
						<br />
						<label for="speed">Speed</label>
					</div>
				</div>
				<div class="columns bordered">
					<div class="column bordered is-2">
						<input type="number" id="insanity" placeholder="0" class="shield" v-model="survivor.brain.insanity"/>
						<br />
						<label for="insanity">Insanity</label>
					</div>
					<div class="column is-8">
						<label class="big">Brain</label>
						<br /><br />
						<p>If your insanity is 3+, you are <strong>insane</strong></p>
					</div>
					<div class="column is-2" style="text-align:right">
						<label><input type="checkbox" v-model="survivor.brain.light_injury"/><span class="chkbx big"></span></label>
					</div>
				</div>
				<div class="columns">
					<div class="column is-2">
						<input type="number" id="head" placeholder="0" class="shield" v-model="survivor.head.armor"/>
					</div>
					<div class="column is-7">
						<label class="big"><i class="head"></i>Head</label>
						<br /><br />
						<span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
					</div>
					<div class="column is-3">
						<label><input type="checkbox" v-model="survivor.head.heavy_injury"/><span class="chkbx heavy big"></span></label>
					</div>
				</div>
				<hr />
				<div class="columns">
					<div class="column is-2">
						<input type="number" id="arms" placeholder="0" class="shield" v-model="survivor.arms.armor"/>
					</div>
					<div class="column is-7">
						<label class="big"><i class="arms"></i>Arms</label>
						<br /><br />
						<span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
					</div>
					<div class="column is-3">
						<label><input type="checkbox" v-model="survivor.arms.light_injury"/><span class="chkbx big"></span></label>
						<label><input type="checkbox" v-model="survivor.arms.heavy_injury"/><span class="chkbx heavy big"></span></label>
					</div>
				</div>
				<hr />
				<div class="columns">
					<div class="column is-2">
						<input type="number" id="body" placeholder="0" class="shield" v-model="survivor.body.armor"/>
					</div>
					<div class="column is-7">
						<label class="big"><i class="body"></i>Body</label>
						<br /><br />
						<span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
					</div>
					<div class="column is-3">
						<label><input type="checkbox" v-model="survivor.body.light_injury"/><span class="chkbx big"></span></label>
						<label><input type="checkbox" v-model="survivor.body.heavy_injury"/><span class="chkbx heavy big"></span></label>
					</div>
				</div>
				<hr />
				<div class="columns">
					<div class="column is-2">
						<input type="number" id="waist" placeholder="0" class="shield" v-model="survivor.waist.armor"/>
					</div>
					<div class="column is-7">
						<label class="big"><i class="waist"></i>Waist</label>
						<br/><br/>
						<span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
					</div>
					<div class="column is-3">
						<label><input type="checkbox" v-model="survivor.waist.light_injury"/><span class="chkbx big"></span></label>
						<label><input type="checkbox" v-model="survivor.waist.heavy_injury"/><span class="chkbx heavy big"></span></label>
					</div>
				</div>
				<hr/>
				<div class="columns">
					<div class="column is-2">
						<input type="number" id="legs" placeholder="0" class="shield" v-model="survivor.legs.armor"/>
					</div>
					<div class="column is-7">
						<label class="big"><i class="legs"></i>Legs</label>
						<br /><br />
						<span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
					</div>
					<div class="column is-3">
						<label><input type="checkbox" v-model="survivor.legs.light_injury"/><span class="chkbx big"></span></label>
						<label><input type="checkbox" v-model="survivor.legs.heavy_injury"/><span class="chkbx heavy big"></span></label>
					</div>
				</div>
			</div>
			<div class="column is-half">
				<div class="columns bordered">
					<div class="column is-7">
						<label class="big">Weapon Proficiency</label><br />
						<label for="type" class="label"><strong>Type:</strong></label>
						<input type="text" placeholder="Weapon Type" v-model="survivor.weapon_proficiency.type" style="width:70%;font-size:1rem;height:1.5rem;"/><br />
						&nbsp;&nbsp;&nbsp;&nbsp;Select Before Hunt
					</div>
					<div class="column is-5" style="padding-left:0">
						<span @click="checkCorrectBoxes">
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box1"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box2"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box3"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box4"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box5"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box6"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box7"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.weapon_proficiency.box8"/><span class="chkbx heavy"></span></label>
						</span>
						<br /><br />
						<span class="chkbx filled"></span>Specialist
						<span class="chkbx filled"></span><span class="chkbx filled"></span>Master
					</div>
				</div>
				<div class="columns bordered">
					<div class="column is-half bordered">
						<label class="label">Courage</label>
						<br />
						<span @click="checkCorrectBoxes">
							<label><input type="checkbox" v-model="survivor.courage.box1"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box2"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box3"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box4"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box5"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box6"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box7"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box8"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.courage.box9"/><span class="chkbx heavy"></span></label>
						</span>
						<br />
						<span class="chkbx filled"></span>Bold
						<span class="chkbx filled"></span><span class="chkbx filled"></span>See the Truth
					</div>
					<div class="column is-half bordered" style="border-right:none">
						<label class="label">Understanding</label>
						<br />
						<span @click="checkCorrectBoxes">
							<label><input type="checkbox" v-model="survivor.understanding.box1"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box2"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box3"/><span class="chkbx heavy"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box4"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box5"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box6"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box7"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box8"/><span class="chkbx"></span></label>
							<label><input type="checkbox" v-model="survivor.understanding.box9"/><span class="chkbx heavy"></span></label>
						</span>
						<br />
						<span class="chkbx filled"></span>Insight
						<span class="chkbx filled"></span><span class="chkbx filled"></span>White Secret
					</div>
				</div>
				<div class="columns bordered" style="margin-top:-0.75rem;border-top:none">
					<div class="column is-half bordered">
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="stalwart" type="checkbox" v-model="survivor.courage.stalwart"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="stalwart"><strong>Stalwart:</strong> can't be knocked down by brain trauma or intimidate.</label>
								<hr />
							</div>
						</div>
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="prepared" type="checkbox" v-model="survivor.courage.prepared"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="prepared"><strong>Prepared:</strong> Add Hunt XP to your roll when determining a straggler.</label>
								<hr />
							</div>
						</div>
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="matchmaker" type="checkbox" v-model="survivor.courage.matchmaker"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="matchmaker"><strong>Matchmaker:</strong> Spend 1 endeavor to trigger intimacy story event.</label>
							</div>
						</div>
					</div>
					<div class="column is-half bordered" style="border:none">
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="analyze" type="checkbox" v-model="survivor.understanding.analyze"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="analyze"><strong>Analyze:</strong> Look at top AI card and return it to the top of the deck.</label>
								<hr />
							</div>
						</div>
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="explore" type="checkbox" v-model="survivor.understanding.explore"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="explore"><strong>Explore:</strong> Add +2 to your <strong>investigate</strong> roll results.<br /></label><br />
								<hr />
							</div>
						</div>
						<div class="columns text-addon">
							<div class="column is-one-quarter">
								<label><input id="tinker" type="checkbox" v-model="survivor.understanding.tinker"/><span class="chkbx big circle"></span></label>
							</div>
							<div class="column small-text">
								<label for="tinker"><strong>Tinker:</strong> +1 endeavor when a returning survivor.</label>
							</div>
						</div>
					</div>
				</div>
				<div class="columns is-multiline">
					<div class="column is-5">
						<label class="big">Fighting Arts</label>
					</div>
					<div class="column is-3" style="margin-top:7px">
						<label>Maximum 3</label>
					</div>
					<div class="column is-4 small-text" style="padding-right:0; margin-top: 11px;">
						<label><input type="checkbox" id="facn" v-model="survivor.fighting_arts.cannot"/><span class="chkbx small"></span></label>
						<label for="facn">Cannot use Fighting Arts</label>
					</div>
					<div class="column is-12">
						<input type="text" class="lined" id="fa1" v-model="survivor.fighting_arts.art_1"/>
						<input type="text" class="lined" id="fa2" v-model="survivor.fighting_arts.art_2"/>
						<input type="text" class="lined" id="fa3" v-model="survivor.fighting_arts.art_3"/>
					</div>
				</div>
				<div class="columns is-multiline">
					<div class="column is-5">
						<label class="big">Disorders</label>
					</div>
					<div class="column is-3" style="margin-top:7px">
						<label>Maximum 3</label>
					</div>
					<div class="column is-4 small-text" style="padding-right:0; margin-top: 11px;">
						&nbsp;
					</div>
					<div class="column is-12">
						<input type="text" class="lined" id="d1" v-model="survivor.disorders.disorder_1"/>
						<input type="text" class="lined" id="d2" v-model="survivor.disorders.disorder_2"/>
						<input type="text" class="lined" id="d3" v-model="survivor.disorders.disorder_3"/>
					</div>
				</div>
				<div class="columns is-multiline">
					<div class="column is-9">
						<label class="big">Abilities &amp; Impairments</label>
					</div>
					<div class="column is-3 small-text" style="padding-right:0; margin-top: 11px">
						<label><input type="checkbox" id="skipnext" v-model="survivor.ability_impair.skip_hunt"/><span class="chkbx small"></span></label>
						<label for="skipnext">Skip Next Hunt</label>
					</div>
					<div class="column is-12">
						<textarea class="lined" v-model="survivor.ability_impair.text"></textarea>
					</div>
				</div>
				<div class="columns is-multiline">
					<div class="column is-9">
						<label class="big">Once Per Lifetime</label>
					</div>
					<div class="column is-3 small-text" style="padding-right:0; margin-top: 11px">
						<label><input type="checkbox" id="skipnext" v-model="survivor.per_lifetime.used"/><span class="chkbx small"></span></label>
						<label for="skipnext">Reroll Used</label>
					</div>
					<div class="column is-12">
						<input type="text" class="lined" id="opl" v-model="survivor.per_lifetime.text"/>
					</div>
				</div>
			</div>
		</div>
		<div class="field" v-if="survivor.id !== -1">
			<div class="notification is-danger">
				<span class="">Deleting a survivor is PERMANENT and cannot be undone.</span>
				<a class="button is-danger is-inverted" style="float:right; margin-left: 20px;" @click="deleteSurvivor" ref="deleteButton"><span class="delete"></span>&nbsp;Delete Survivor</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'survivor',
	data () {
		return {
			savetimer: -1,
			delayevents: false
		}
	},
	computed: {
		survivor() {
			return this.$store.state.kdm.activeSurvivor;
		}
	},
	watch: {
		survivor: {
            handler: function(to, from) {
				if(to === undefined || from === undefined)
				{
					return;
				}
				if(from && to.id != from.id) {
					if(from.id === -1) {
						if(from.name === ''){
							return;
						}
					}
					
					let newPage = to.id;
					if(to.id == -1)
					{
						newPage = 'new';
					}
					
					this.$router.push({ name: 'survivor', params: { id: newPage }});
					return;
				}
					
				let jf = JSON.stringify(from);
				let jt = JSON.stringify(to);
				
				//fixes very odd bug with vue endless changes.
				if(to !== from && jf === jt)
					return;
					
				let self = this;
				clearTimeout(this.savetimer);
				this.savetimer = -1;
				this.savetimer = setTimeout(function() {
					self.saveSurvivor(to);
				},1000);
            },
            deep: true
        }
	},
	beforeRouteUpdate (to, from, next) {
		let survivorId = to.params.id;
		this.$store.commit('setActiveSurvivor',survivorId);
		next();
	},
	methods: {
		checkCorrectBoxes: function(e) {
			if(this.delayevents)
				return;
				
			if(e.target.tagName.toLowerCase() === 'span')
				return;
			
			let realTarget = e.target.nextElementSibling;
			
			if(realTarget.classList.contains('retired'))
				return;
				
			this.delayevents = true;
			let parent = realTarget.parentNode.parentNode; //box > label > container
			let list = Array.from(parent.querySelectorAll('span.chkbx'));
			let tIdx = list.indexOf(realTarget);
			
			let highestCheckedIdx = 0;
			list.forEach(function(el, idx) {
				if(el.previousElementSibling.checked && !el.classList.contains('retired'))
					highestCheckedIdx = idx;
			});
			
			if(tIdx < highestCheckedIdx && !e.target.checked)
				e.target.checked = true;
			
			list.forEach(function(el, idx) {
				if(el.classList.contains('retired'))
					return;
			
				if(tIdx >= highestCheckedIdx && idx < tIdx) {
					if(el.previousElementSibling.checked !== e.target.checked && idx < tIdx)
						el.click();
				}
				
				if(tIdx < highestCheckedIdx) {
					if(el.previousElementSibling.checked === (idx > tIdx))
						el.click();
				}
			});
			
			this.delayevents = false;
		},
		
		deleteSurvivor() {
			if(confirm('Are you sure you want to delete '+this.survivor.name+'?  This CANNOT be undone!'))
			{
				clearTimeout(this.savetimer);
				this.savetimer = -1;
				this.$store.dispatch('deleteSurvivor', this.survivor.id);
			}
		},
		
		saveSurvivor(target) {
			clearTimeout(this.savetimer);
			this.savetimer = -1;
			if(target === undefined) {
				target = this.survivor;
			}
			if(target.id === -1 && target.name === '') {
				return; //not ready yet
			}
			
			if(!target.id) {
				console.dir(target);
				return;
			}
			
			this.$store.dispatch('saveSurvivor', target);
		}
	}
}
</script>