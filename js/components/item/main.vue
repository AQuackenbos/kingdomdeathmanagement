<template>
	<div class="column item-panel is-centered">
		<div :class="['item', item.metatype]" id="activeItem" v-if="item && item.id !== -1">
			<div class="stats" v-html="getStatsHtml(item)"></div>
			<div class="name">{{ item.name }}</div>
			<div class="types">{{ (item.types && item.types.length) ? item.types.join(', ') : '' }}</div>
			<div class="image">
				<img src="/images/question-mark.png"/>
			</div>
			<div class="keywords" v-html="getKeywordsHtml(item)"></div>
			<div class="description" v-html="getDescriptionHtml(item)"></div>
			<div class="bonuses" v-html="getBonusesHtml(item)"></div>
			<div class="connections" v-html="getConnectionsHtml(item)"></div>
			{{ applyTippyTips() }}
		</div>
	</div>
</template>

<script>
import tippy from 'tippy.js';

export default {
	name: 'item-info',
	data() {
		return {}
	},
	beforeRouteUpdate (to, from, next) {
		let itemId = to.params.id;
		this.$store.commit('setActiveItem',itemId);
		next();
	},
	updated: function() {
		let self = this;
		setTimeout(self.applyTippyTips,300);
	},
	computed: {
		item() {
			return this.$store.state.kdm.activeItem;
		}
	},
	methods: {
		applyTippyTips() {
			tippy('.tippy-target',{
				arrow: true
			});
		},
		parseDescHtml(desc) {
			let retHtml = desc;
			
			let kwRgx = /\{\{(.*?)\}\}/g
			let boldRgx = /\[\[(.*?)\]\]/g
			let iconRgx = /\{\|(.*?)\|\}/g
			
			let token;
			
			while(token = kwRgx.exec(desc)) {
				let ppEl = document.createElement('strong');
				ppEl.classList.add('tippy-target');
				ppEl.title = 'No data found for this keyword.';
				ppEl.innerHTML = token[1];
				
				let kw = this.$store.getters.getKeyword(token[1]);
				if(kw) {
					ppEl.title = this.parseDescHtml(kw.description);
				}
				
				retHtml = retHtml.replace(new RegExp(token[0],'g'),ppEl.outerHTML);
			}
			
			while(token = boldRgx.exec(desc)) {
				retHtml = retHtml.replace(new RegExp(token[0].replace(/\[/g,'\\[').replace(/\]/g,'\\]'),'g'),'<b>'+token[1]+'</b>');
			}
			
			while(token = iconRgx.exec(desc)) {
				retHtml = retHtml.replace(new RegExp(token[0].replace(/\|/g,'\\|'),'g'),'<img src="/images/'+token[1].toLowerCase()+'.svg" style="width:14px"/>');
			}
			
			//@todo
			return retHtml;
		},
		getStatsHtml(item) {
			if(!item.weapon_stats && !item.armor_stats) return '';
			
			let retHtml = '';
			let el = document.createElement('div');
			el.classList.add('stats-area');
			
			if(item.weapon_stats) {
				el.id = "weapon-stats";
				el.classList.add('weapon');
				
				let actImg = document.createElement('img');
				actImg.src = '/images/action.svg';
				
				let brk = document.createElement('hr');
				let brk2 = document.createElement('hr');
				
				let spd = document.createElement('span');
				spd.classList.add('speed');
				spd.innerHTML = item.weapon_stats.speed;
				
				let hitarea = document.createElement('div');
				hitarea.classList.add('hitarea');
				
				let tohit = document.createElement('span');
				tohit.classList.add('hit');
				tohit.innerHTML = item.weapon_stats.hit;
				
				let str = document.createElement('span');
				str.classList.add('strength');
				str.innerHTML = item.weapon_stats.strength;
				
				let plus = document.createElement('span');
				plus.classList.add('plus');
				plus.innerHTML = '+';
				
				hitarea.appendChild(tohit);
				hitarea.appendChild(brk2);
				hitarea.appendChild(str);
				hitarea.appendChild(plus);
				
				el.appendChild(actImg);
				el.appendChild(brk);
				el.appendChild(spd);
				el.appendChild(hitarea);
				
			}
			
			if(item.armor_stats) {
				el.id = "armor-stats";
				el.classList.add('armor');
				
				let armArea = document.createElement('div');
				armArea.classList.add('armor-block');
				armArea.innerHTML = item.armor_stats.defense;
				
				let locImg = document.createElement('span'); // should be img
				locImg.innerHTML = item.armor_stats.location;
				
				el.appendChild(armArea);
				el.appendChild(locImg);
			}
			retHtml += el.outerHTML;
			
			return retHtml;
		},
		getKeywordsHtml(item) {
			if(!item.keywords || item.keywords.length === 0) return '';
			
			let kwHtml = [];
			item.keywords.forEach((keyword, idx) => {
				kwHtml.push(this.parseDescHtml('{{'+keyword+'}}'));
			});
			
			return kwHtml.join(', ');
		},
		getDescriptionHtml(item) {
			return this.parseDescHtml(item.description);
		},
		getBonusesHtml(item) {
			if(!item.bonuses || item.bonuses.length === 0) return '';
			
			let retHtml = '';
			item.bonuses.forEach((bonus, idx) => {
				let el = document.createElement('div');
				el.classList.add('bonus');
				if(bonus.hasOwnProperty('requires')) {
					//Restricted bonus
					el.classList.add('tags');
					el.classList.add('has-addons');
					
					let req = document.createElement('span');
					req.classList.add('tag');
					req.classList.add('is-rounded');
					req.classList.add('is-white');
					if(bonus.hasOwnProperty('long_desc')) {
						req.classList.add('short');
					}
					
					if(bonus.requires.hasOwnProperty('boxes')) {
						for(let color in bonus.requires.boxes) {
							for(let bn = 0; bn < bonus.requires.boxes[color]; bn++) {
								let bEl = document.createElement('div');
								bEl.classList.add('bonus-square');
								bEl.classList.add('color-'+color);
								req.appendChild(bEl);
							}
						}
					}
					
					if(bonus.requires.hasOwnProperty('connections')) {
						for(let color in bonus.requires.connections) {
							for(let bn = 0; bn < bonus.requires.connections[color]; bn++) {
								let bEl = document.createElement('img');
								bEl.classList.add('bonus-puzzle');
								bEl.classList.add('color-'+color);
								bEl.src = '/images/puzzle-'+color+'.svg';
								req.appendChild(bEl);
							}
						}
					}
					
					el.appendChild(req);
					
					let desc = document.createElement('span');
					desc.classList.add('tag');
					desc.classList.add('is-rounded');
					desc.classList.add('is-light');
					if(bonus.hasOwnProperty('long_desc')) {
						desc.classList.add('long');
					}
					
					if(bonus.hasOwnProperty('stats')) {
						let statBonuses = [];
						for(let stat in bonus.stats) {
							let phrasing = '';
							if(bonus.stats[stat] > 0) {
								phrasing = '+';
							}
							statBonuses.push(phrasing+bonus.stats[stat]+' '+stat);
						}
						desc.innerHTML = statBonuses.join('<br />');
					}
					
					if(bonus.hasOwnProperty('desc')) {
						desc.innerHTML = '<p>'+this.parseDescHtml(bonus.desc)+'</p>';
					}
					
					el.appendChild(desc);
				} else {
					//Regular bonus
					let desc = document.createElement('p');
					
					if(bonus.hasOwnProperty('stats')) {
						let statBonuses = [];
						for(let stat in bonus.stats) {
							let phrasing = '';
							if(bonus.stats[stat] > 0) {
								phrasing = 'Gain +';
							} else {
								phrasing = 'Lose ';
							}
							
							statBonuses.push(phrasing+bonus.stats[stat]+' '+stat+'.');
						}
						
						desc.innerHTML = statBonuses.join('<br />');
					}
					
					if(bonus.hasOwnProperty('desc')) {
						desc.innerHTML = this.parseDescHtml(bonus.desc);
					}
					
					el.appendChild(desc);
				}
				
				retHtml += el.outerHTML;
			});
			
			return retHtml;
		},
		getConnectionsHtml(item) {
			let retHtml = '';
			for(let side in item.connections) {
				let el = document.createElement('div');
				el.id = "connection-"+side;
				el.classList.add('connection');
				el.classList.add('c-'+side);
				if(side === 'left' || side === 'right') {
					el.classList.add('lr');
				} else {
					el.classList.add('tb');
				}
				
				el.classList.add('color-'+item.connections[side]);
				
				retHtml += el.outerHTML;
			}
			
			return retHtml;
		}
	}
}
</script>