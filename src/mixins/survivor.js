import { db } from '@/firebase'
import { survivor as emptySurvivor } from '@/kdm'

export default {
  data() {
    return {
      survivor: emptySurvivor
    }
  },
  computed: {
    statKeys() {
      return [
        'movement',
        'accuracy',
        'strength',
        'evasion',
        'luck',
        'speed'
      ]
    },
    
    survivalAbilities() {
      return Object.keys(this.survivor.survival.abilities)  
    },
    
    tooltips() {
      return {
        xp: {
          1: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          5: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          9: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          14: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Age</span>',
          15: 'Retired'
        },
        
        wp: {
          2: 'Specialist',
          7: 'Master'
        },
        
        courage: {
          2: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Bold</span>',
          8: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">See the Truth</span>'
        },
        
        understanding: {
          2: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">Insight</span>',
          8: '<span class="bl-story-event mr-1"></span><span class="has-text-weight-bold">White Secret</span>'
        }
      }
    },
    
    genderIcon() {
      if(this.survivor.lifetime.gender === 'M') return 'mars'
      if(this.survivor.lifetime.gender === 'F') return 'venus'
      
      return 'transgender'
    },
    
    injuries() {
      if(!this.survivor) return []
      
      let d = this.survivor.defenses
      
      return [].concat(d.arms.severe, d.body.severe, d.head.severe, d.waist.severe, d.legs.severe)
    },
    
    dead() {
      if(!this.survivor) return false
      
      return (
        this.survivor.lifetime.died !== null &&
        this.survivor.lifetime.died !== ''
      )
    }
  },
  methods: {    
    _setBoxValue(object, field, amount, fullname, ref) {
      if(object[field] === amount) amount -= 1
      object[field] = amount
      this.saveField(fullname, ref)
    },
    
    setWeaponProficiency(wp) {
      this._setBoxValue(this.survivor.weapon, 'proficiency', wp, "weapon.proficiency", "wp")
    },
    
    setUnderstandingLevel(ul) {
      this._setBoxValue(this.survivor.mentality.understanding, 'level', ul, "mentality.understanding.level", "understanding")
    },
    
    setCourageLevel(cl) {
      this._setBoxValue(this.survivor.mentality.courage, 'level', cl, "mentality.courage.level", "courage")
    },
    
    setExperience(xp) {
      this._setBoxValue(this.survivor.lifetime, 'experience', xp, "lifetime.experience", "xp")
    },
    
    toggleAbility(type, ability) {
      this.survivor.mentality[type].abilities[ability].granted = !this.survivor.mentality[type].abilities[ability].granted
      this.saveField(`mentality.${type}.abilities.${ability}.granted`, "courage")
    },
    
    saveField(field, refName) {
      if(!this.survivor) return
      
      let currVal = field.split('.').reduce((o,i) => o[i], this.survivor)
      
      let updateObj = {}
      
      updateObj[field] = currVal
      
      let loading = this.$buefy.loading.open({ container: this.$refs[refName].$el })
      db.collection(`campaigns/${this.campaign.id}/survivors`).doc(this.survivor.id).update(updateObj)
        .then(() => loading.close())
    }
  }
}