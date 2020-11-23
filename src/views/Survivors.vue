<template>
    <div class="column" v-if="!loading && user && campaign">
        <div class="columns">
            <div class="column is-2 survivor-list">
                <div class="field">
                    <b-switch :value="hideDead" type="is-info">Hide Dead</b-switch>
                </div>
                <b-menu>
                    <b-menu-list label="Survivors">
                        <b-menu-item v-for="s in shownSurvivors" :key="s.id">
                            <template slot="label">
                                {{ s.name }}
                            </template>
                        </b-menu-item>
                    </b-menu-list>
                    <b-menu-list label="">
                        <b-menu-item>
                            <template slot="label">
                                <b-button type="is-success is-light" icon-left="user-plus" @click.prevent="addSurvivor" expanded>New Survivor</b-button>
                            </template>
                        </b-menu-item>
                    </b-menu-list>
                </b-menu>
            </div>
            <div class="column is-10">
                <div class="columns is-multiline" v-if="currentSurvivor">
                    <div class="column is-half">
                        <div class="columns is-multiline">
                            <div class="column is-8">
                                <!-- Name -->
                                <label class="label big" for="name">Name</label>
                                <input class="name" type="text" id="name" placeholder="Name" v-model="currentSurvivor.name"/>
                            </div>
                            <div class="column is-4" style="margin-top:8px;padding-right:0">
                                <!-- Gender -->
                                <label class="label">Gender</label>
                                <label class="radio">
                                    <input type="radio" value="M" v-model="currentSurvivor.gender"/><span class="chkbx"></span>
                                    M
                                </label>
                                <label class="radio">
                                    <input type="radio" value="F" v-model="currentSurvivor.gender"/><span class="chkbx"></span>
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
                                        <input class="father" type="text" id="father" placeholder="Father" v-model="currentSurvivor.father"/>
                                    </div>
                                    <div class="column is-half">
                                        <label class="label" for="mother">Mother</label>
                                        <input class="mother" type="text" id="mother" placeholder="Mother" v-model="currentSurvivor.mother"/>
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
                                <span class="xp">
                                    <label v-for="(n,i) in createRange(16)" :key="i">
                                        <input type="checkbox" :checked="experience >= (i+1)" @click.prevent="setExperience(i+1)"/>
                                        <span class="chkbx" :class="{ heavy: i === 1 || i === 5 || i === 9 || i === 14, retired: i === 15 }"></span>
                                    </label>
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
                        </div>
                    </div>
                </div>
                <div class="columns sheet">
                    <div class="column is-half">
                        <div class="columns bordered">
                            <div class="column is-one-quarter is-vcentered">
                                <input type="number" id="survival" placeholder="0" class="bordered big" v-model="currentSurvivor.survival.value"/>
                            </div>
                            <div class="column is-half">
                                <label for="survival" class="big">Survival</label>
                                <br />							
                                <!-- Alive -->
                                <label class="label" for="born" style="float:left;width:50%;text-align:center">Born</label>
                                <label class="label" for="born" style="float:left;width:50%;text-align:center">Died</label>
                                <input type="number" id="born" class="bordered" style="width:40%;float:left;margin:0 5%" v-model="currentSurvivor.survival.born"/>
                                <input type="number" id="died" class="bordered" style="width:40%;float:left;margin:0 5%" v-model="currentSurvivor.survival.died"/>
                                <div class="cause-of-death" v-if="currentSurvivor.survival.died !== '' && currentSurvivor.survival.died !== undefined">
                                    <label for="cod" class="label">Cause of Death</label>
                                    <input type="text" id="cod" class="name" v-model="currentSurvivor.survival.cod"/>
                                </div>
                                <label style="clear:both;margin-top:0.25rem;"><input type="checkbox" id="survival-cannot" v-model="currentSurvivor.survival.cannot"/><span class="chkbx"></span>
                                    Cannot spend survival
                                </label>
                            </div>
                            <div class="column is-one-quarter" style="padding-left:0">
                                <label for="dodge"><input type="checkbox" id="dodge" v-model="currentSurvivor.survival.dodge"/><span class="chkbx"></span>&nbsp;Dodge</label><br />
                                <label for="encourage"><input type="checkbox" id="encourage" v-model="currentSurvivor.survival.encourage"/><span class="chkbx"></span>&nbsp;Encourage</label><br />
                                <label for="surge"><input type="checkbox" id="surge" v-model="currentSurvivor.survival.surge"/><span class="chkbx"></span>&nbsp;Surge</label><br />
                                <label for="dash"><input type="checkbox" id="dash" v-model="currentSurvivor.survival.dash"/><span class="chkbx"></span>&nbsp;Dash</label><br />
                                <label for="endure"><input type="checkbox" id="endure" v-model="currentSurvivor.survival.endure"/><span class="chkbx"></span>&nbsp;Endure</label>
                            </div>
                        </div>
                        <div class="columns bordered">
                            <div class="column bordered is-2">
                                <input type="number" id="movement" placeholder="5" class="big" v-model="currentSurvivor.movement"/>
                                <br />
                                <label for="movement">Movement</label>
                            </div>
                            <div class="column bordered is-2">
                                <input type="number" id="accuracy" placeholder="0" class="bordered" v-model="currentSurvivor.accuracy"/>
                                <br />
                                <label for="accuracy">Accuracy</label>
                            </div>
                            <div class="column bordered is-2">
                                <input type="number" id="strength" placeholder="0" class="bordered" v-model="currentSurvivor.strength"/>
                                <br />
                                <label for="strength">Strength</label>
                            </div>
                            <div class="column bordered is-2">
                                <input type="number" id="evasion" placeholder="0" class="bordered" v-model="currentSurvivor.evasion"/>
                                <br />
                                <label for="evasion">Evasion</label>
                            </div>
                            <div class="column bordered is-2">
                                <input type="number" id="luck" placeholder="0" class="bordered" v-model="currentSurvivor.luck"/>
                                <br />
                                <label for="luck">Luck</label>
                            </div>
                            <div class="column bordered is-2" style="border:none">
                                <input type="number" id="speed" placeholder="0" class="bordered" v-model="currentSurvivor.speed"/>
                                <br />
                                <label for="speed">Speed</label>
                            </div>
                        </div>
                        <div class="columns bordered">
                            <div class="column bordered is-2">
                                <input type="number" id="insanity" placeholder="0" class="shield" v-model="currentSurvivor.defenses.brain.insanity"/>
                                <br />
                                <label for="insanity">Insanity</label>
                            </div>
                            <div class="column is-8">
                                <label class="big">Brain</label>
                                <br /><br />
                                <p>If your insanity is 3+, you are <strong>insane</strong></p>
                            </div>
                            <div class="column is-2" style="text-align:right">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.brain.light_injury"/><span class="chkbx big"></span></label>
                            </div>
                        </div>
                        <div class="columns">
                            <div class="column is-2">
                                <input type="number" id="head" placeholder="0" class="shield" v-model="currentSurvivor.defenses.head.armor"/>
                            </div>
                            <div class="column is-7">
                                <label class="big"><i class="head"></i>Head</label>
                                <br /><br />
                                <span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
                            </div>
                            <div class="column is-3">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.head.heavy_injury"/><span class="chkbx heavy big"></span></label>
                            </div>
                        </div>
                        <hr />
                        <div class="columns">
                            <div class="column is-2">
                                <input type="number" id="arms" placeholder="0" class="shield" v-model="currentSurvivor.defenses.arms.armor"/>
                            </div>
                            <div class="column is-7">
                                <label class="big"><i class="arms"></i>Arms</label>
                                <br /><br />
                                <span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
                            </div>
                            <div class="column is-3">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.arms.light_injury"/><span class="chkbx big"></span></label>
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.arms.heavy_injury"/><span class="chkbx heavy big"></span></label>
                            </div>
                        </div>
                        <hr />
                        <div class="columns">
                            <div class="column is-2">
                                <input type="number" id="body" placeholder="0" class="shield" v-model="currentSurvivor.defenses.body.armor"/>
                            </div>
                            <div class="column is-7">
                                <label class="big"><i class="body"></i>Body</label>
                                <br /><br />
                                <span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
                            </div>
                            <div class="column is-3">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.body.light_injury"/><span class="chkbx big"></span></label>
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.body.heavy_injury"/><span class="chkbx heavy big"></span></label>
                            </div>
                        </div>
                        <hr />
                        <div class="columns">
                            <div class="column is-2">
                                <input type="number" id="waist" placeholder="0" class="shield" v-model="currentSurvivor.defenses.waist.armor"/>
                            </div>
                            <div class="column is-7">
                                <label class="big"><i class="waist"></i>Waist</label>
                                <br/><br/>
                                <span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
                            </div>
                            <div class="column is-3">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.waist.light_injury"/><span class="chkbx big"></span></label>
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.waist.heavy_injury"/><span class="chkbx heavy big"></span></label>
                            </div>
                        </div>
                        <hr/>
                        <div class="columns">
                            <div class="column is-2">
                                <input type="number" id="legs" placeholder="0" class="shield" v-model="currentSurvivor.defenses.legs.armor"/>
                            </div>
                            <div class="column is-7">
                                <label class="big"><i class="legs"></i>Legs</label>
                                <br /><br />
                                <span><span class="chkbx filled"></span> Heavy Injury: Knocked Down</span>
                            </div>
                            <div class="column is-3">
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.legs.light_injury"/><span class="chkbx big"></span></label>
                                <label><input type="checkbox" v-model="currentSurvivor.defenses.legs.heavy_injury"/><span class="chkbx heavy big"></span></label>
                            </div>
                        </div>
                    </div>
                    <div class="column is-half">
                        <div class="columns bordered">
                            <div class="column is-7">
                                <label class="big">Weapon Proficiency</label><br />
                                <label for="type" class="label"><strong>Type:</strong></label>
                                <input type="text" placeholder="Weapon Type" v-model="currentSurvivor.weapon_proficiency.type" style="width:70%;font-size:1rem;height:1.5rem;"/><br />
                                &nbsp;&nbsp;&nbsp;&nbsp;Select Before Hunt
                            </div>
                            <div class="column is-5" style="padding-left:0">
                                <span>
                                    <label v-for="(n,i) in createRange(8)" :key="i">
                                        <input type="checkbox" :checked="weaponProficiency >= (i+1)" @click.prevent="setWeaponProficiency(i+1)"/>
                                        <span class="chkbx" :class="{ heavy: i === 2 || i === 7 }"></span>
                                    </label>
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
                                <span>
                                    <label v-for="(n,i) in createRange(9)" :key="i">
                                        <input type="checkbox" :checked="courage >= (i+1)" @click.prevent="setCourage(i+1)"/>
                                        <span class="chkbx" :class="{ heavy: i === 2 || i === 8 }"></span>
                                    </label>
                                </span>
                                <br />
                                <span class="chkbx filled"></span>Bold
                                <span class="chkbx filled"></span><span class="chkbx filled"></span>See the Truth
                            </div>
                            <div class="column is-half bordered" style="border-right:none">
                                <label class="label">Understanding</label>
                                <br />
                                <span>
                                    <label v-for="(n,i) in createRange(9)" :key="i">
                                        <input type="checkbox" :checked="understanding >= (i+1)" @click.prevent="setUnderstanding(i+1)"/>
                                        <span class="chkbx" :class="{ heavy: i === 2 || i === 8 }"></span>
                                    </label>
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
                                        <label><input id="stalwart" type="checkbox" v-model="currentSurvivor.courage.stalwart"/><span class="chkbx big circle"></span></label>
                                    </div>
                                    <div class="column small-text">
                                        <label for="stalwart"><strong>Stalwart:</strong> can't be knocked down by brain trauma or intimidate.</label>
                                        <hr />
                                    </div>
                                </div>
                                <div class="columns text-addon">
                                    <div class="column is-one-quarter">
                                        <label><input id="prepared" type="checkbox" v-model="currentSurvivor.courage.prepared"/><span class="chkbx big circle"></span></label>
                                    </div>
                                    <div class="column small-text">
                                        <label for="prepared"><strong>Prepared:</strong> Add Hunt XP to your roll when determining a straggler.</label>
                                        <hr />
                                    </div>
                                </div>
                                <div class="columns text-addon">
                                    <div class="column is-one-quarter">
                                        <label><input id="matchmaker" type="checkbox" v-model="currentSurvivor.courage.matchmaker"/><span class="chkbx big circle"></span></label>
                                    </div>
                                    <div class="column small-text">
                                        <label for="matchmaker"><strong>Matchmaker:</strong> Spend 1 endeavor to trigger intimacy story event.</label>
                                    </div>
                                </div>
                            </div>
                            <div class="column is-half bordered" style="border:none">
                                <div class="columns text-addon">
                                    <div class="column is-one-quarter">
                                        <label><input id="analyze" type="checkbox" v-model="currentSurvivor.understanding.analyze"/><span class="chkbx big circle"></span></label>
                                    </div>
                                    <div class="column small-text">
                                        <label for="analyze"><strong>Analyze:</strong> Look at top AI card and return it to the top of the deck.</label>
                                        <hr />
                                    </div>
                                </div>
                                <div class="columns text-addon">
                                    <div class="column is-one-quarter">
                                        <label><input id="explore" type="checkbox" v-model="currentSurvivor.understanding.explore"/><span class="chkbx big circle"></span></label>
                                    </div>
                                    <div class="column small-text">
                                        <label for="explore"><strong>Explore:</strong> Add +2 to your <strong>investigate</strong> roll results.<br /></label><br />
                                        <hr />
                                    </div>
                                </div>
                                <div class="columns text-addon">
                                    <div class="column is-one-quarter">
                                        <label><input id="tinker" type="checkbox" v-model="currentSurvivor.understanding.tinker"/><span class="chkbx big circle"></span></label>
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
                                <label><input type="checkbox" id="facn" v-model="currentSurvivor.fighting_arts.cannot"/><span class="chkbx small"></span></label>
                                <label for="facn">Cannot use Fighting Arts</label>
                            </div>
                            <div class="column is-12">
                                <input type="text" class="lined" id="fa1" v-model="currentSurvivor.fighting_arts.art_1"/>
                                <input type="text" class="lined" id="fa2" v-model="currentSurvivor.fighting_arts.art_2"/>
                                <input type="text" class="lined" id="fa3" v-model="currentSurvivor.fighting_arts.art_3"/>
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
                                <input type="text" class="lined" id="d1" v-model="currentSurvivor.disorders.disorder_1"/>
                                <input type="text" class="lined" id="d2" v-model="currentSurvivor.disorders.disorder_2"/>
                                <input type="text" class="lined" id="d3" v-model="currentSurvivor.disorders.disorder_3"/>
                            </div>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-9">
                                <label class="big">Abilities &amp; Impairments</label>
                            </div>
                            <div class="column is-3 small-text" style="padding-right:0; margin-top: 11px">
                                <label><input type="checkbox" id="skipnext" v-model="currentSurvivor.ability_impair.skip_hunt"/><span class="chkbx small"></span></label>
                                <label for="skipnext">Skip Next Hunt</label>
                            </div>
                            <div class="column is-12">
                                <textarea class="lined" v-model="currentSurvivor.ability_impair.text"></textarea>
                            </div>
                        </div>
                        <div class="columns is-multiline">
                            <div class="column is-9">
                                <label class="big">Once Per Lifetime</label>
                            </div>
                            <div class="column is-3 small-text" style="padding-right:0; margin-top: 11px">
                                <label><input type="checkbox" id="skipnext" v-model="currentSurvivor.per_lifetime.used"/><span class="chkbx small"></span></label>
                                <label for="skipnext">Reroll Used</label>
                            </div>
                            <div class="column is-12">
                                <input type="text" class="lined" id="opl" v-model="currentSurvivor.per_lifetime.text"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field" v-if="currentSurvivor.id !== -1">
                    <div class="notification is-danger">
                        <span class="">Deleting a survivor is PERMANENT and cannot be undone.</span>
                        <a class="button is-danger is-inverted" style="float:right; margin-left: 20px;" @click.prevent="deleteSurvivor"><span class="delete"></span>&nbsp;Delete Survivor</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.survivor-list {
    text-align: left;
}

.container {
	margin-bottom: 2rem;
}

.columns { 
	margin: 0;
}

.column.chart-info {
	text-align: center;
}

.menu-list .router-link-exact-active, .menu-list .router-link-exact-active:hover {
	background: #DDD;
}

.menu-list .new-survivor, .menu-list .new-survivor.router-link-exact-active {
	background: #23d160;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="text"],input[type="number"] {
	background: transparent;-moz-appearance: none;
    -moz-appearance:textfield;
	-webkit-appearance: none;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border: 1px solid transparent;
	border-radius: 3px;
	-webkit-box-shadow: none;
	box-shadow: none;
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	font-size: 1rem;
	height: 2.25em;
	-webkit-box-pack: start;
	-ms-flex-pack: start;
	justify-content: flex-start;
	line-height: 1.5;
	padding-bottom: calc(.375em - 1px);
	padding-left: calc(.625em - 1px);
	padding-right: calc(.625em - 1px);
	padding-top: calc(.375em - 1px);
	position: relative;
	vertical-align: top;
	color: #363636;
	max-width: 100%;
	border: none;
	width: 100%;
}

input:focus {
	outline: none;
}

input.name {
	width: 75%;
}

.bar div {
	padding: 0;
	height: 100%;
	float: left;
	color: #FFF;
	text-align: center;
	align-content: center;
}

.bar div.male {
	background: #6b6bde;
}

.bar div.female {
	background: #f15f5f;
}

input.father, input.mother {
	width: 55%;
	font-size: 1rem;
	height:1.5rem;
}

input.lined {
	border-bottom: 1px solid black;
	border-radius: 0;
	font-size: 1.1rem;
	color: #555;
}

#app label {
	display: inline;
}

label.big {
	font-size: 1.5rem;
}

.bordered {
	border: 1px solid black;
}

.bordered div.bordered {
	border-top: none;
	border-left: none;
	border-bottom: none;
}

input.bordered {
	border: 1px solid black;
	font-size: 2rem;
	text-align: center;
}

input.big, input.bordered.big {
	font-size: 2.75rem;
}

input.shield {
	background: url(/images/shield.svg) no-repeat;
	background-position: center;
	font-size: 2rem;
	text-align: center;
}

.columns .is-2 input {
	text-align: center;
	font-size: 2rem;
	padding: 0;
}

.columns .is-2 label {
	font-size: 0.75rem;
}

.columns .is-3 {
	text-align: right;
}

input.heavy {
	border: 3px solid black;
}

input[type="checkbox"], input[type="radio"] {
	display: none;
}

span.chkbx {
	border: 1px solid black;
	width: 15px;
	height: 15px;
	display: inline-block;
}

span.chkbx.circle {
	border-radius: 7.5px;
}

span.chkbx.circle.big {
	border-radius: 15px;
}

span.chkbx.big {
	width: 30px;
	height: 30px;
}

span.chkbx.small {
	width: 8px;
	height: 8px;
}

span.chkbx.heavy {
	border: 4px solid black;
}

input[type="checkbox"] + span.chkbx, input[type="radio"] + span.chkbx {
	cursor: pointer;
}

input[type="checkbox"]:checked + span.chkbx, input[type="radio"]:checked + span.chkbx {
	background: #666;
}

span.chkbx.filled {
	background: #666;
	border: 4px solid black;
}

hr {
	margin: 0;
}

.columns.text-addon hr {
	margin-top: 5px;
}

.sheet .is-half .is-half .chkbx, .sheet .is-half .is-5 .chkbx {
	margin-right: 3px;
}

.column.small-text {
	font-size: 0.75rem;
}

.columns.text-addon .column {
	padding: 0;
}

.columns.is-multiline .column {
	padding-top: 0;
	padding-bottom: 0;
}

.chkbx.retired, span.chkbx.retired.filled {
	border: 6px solid black;
}

textarea.lined {
	width: 100%;
	max-width: 100%;
	font-size: 1.1rem;
	border: none;
	background-attachment: local;
	background-image:
	linear-gradient(to right, #FFF, #FFF 0px, transparent 0px),
	linear-gradient(to left, #FFF, #FFF 0px, transparent 0px),
	repeating-linear-gradient(
	#FFF,
	#FFF 2.05rem,
	#000 2.1rem,
	#000 2.15rem
	);
	line-height: 2.2rem;
	padding: 0.3rem 10px;
	resize: none;
	height: 7rem;
}
</style>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/firebase'

export default {
    name: 'Survivors',
    data() {
        return {
            campaign: null,
            survivors: [],
            currentSurvivor: { survival: {}, defenses: { brain: {}, head: {}, arms: {}, body: {}, waist: {}, legs: {} }, weapon_proficiency: {}, courage: {}, understanding: {}, fighting_arts: {}, disorders: {}, ability_impair: {}, per_lifetime: {} },
            hideDead: true
        }
    },
    computed: {
        ...mapGetters({
            loading: 'loading',
            user: 'user',
            currentCampaign: 'currentCampaign'
        }),
        
        shownSurvivors() {
            return this.survivors
        },
        
        weaponProficiency() {
            return 0
        },
        
        experience() {
            return 0
        },
        
        courage() {
            return 0
        },
        
        understanding() {
            return 0
        }
    },
    created() {
        this.$bind('campaign', db.collection('campaigns').doc(this.currentCampaign))
        this.$bind('survivors', db.collection(`campaigns/${this.currentCampaign}/survivors`))
    },
    methods: {
        addSurvivor() {
            console.log('add');
        },
        
        createRange(size) {
            return [...Array(size).keys()]
        },
        
        deleteSurvivor() {
        
        },
        
        setExperience(xp) {
            console.log(xp)
        },
        
        setWeaponProficiency(wp) {
            console.log(wp)
        },
        
        setCourage(c) {
            console.log(c)
        },
        
        setUnderstanding(u) {
            console.log(u)
        }
    }
}
</script>