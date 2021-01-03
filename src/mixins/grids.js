import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      grid: {
        items: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'armorSets'
    ]),
    
    gridItems: {
      get() {
        return this.grid.items.map(i => {
          if(
            i === null ||
            (typeof i === 'object' && !i.id) 
          ) return {}
          
          return this.gear.find(g => g.id === i)
        })
      },
      set(v) {
        this.grid.items = v.map(i => {
          if(
            i === null ||
            (typeof i === 'object' && !i.id)
          ) return {}
          
          if(typeof i === 'string') return i
          return i.id
        })
        
        this.updatePreviews()
      }
    },
  },
  methods: {
    extendedGridItems() {
      this.grid.boxes = {
        red: [],
        blue: [],
        green: []
      }
      
      return this.gridItems.map((i,idx) => this.attachGridValues(i,idx)) 
    },
    
    attachGridValues(item, slot) {
      if(!item.id) return item
      item.calculated = {
        connections: {
          red: 0,
          blue: 0,
          green: 0
        }
      }
      
      let neighbors = { top: {}, left: {}, right: {}, bottom: {} }
      
      const dir = ['top', 'left', 'right', 'bottom']
      const revDir = Object.assign([],dir).reverse()
      const slotOffset = [-3, -1, 1, 3]
      
      //console.log('slot '+slot)
      for(const d in [...Array(4).keys()]) {
        neighbors[dir[d]] = this.gridItems[slot + slotOffset[d]]
        if(!neighbors[dir[d]]) continue
        
        //console.log(dir[d]+' neighbor '+neighbors[dir[d]].name)
        
        if(item.connections.[dir[d]] === neighbors[dir[d]]?.connections?.[revDir[d]]) {
          if(item.connections[dir[d]] === null) continue
          item.calculated.connections[item.connections[dir[d]]]++
          
          
          let identifier = Math.min(slot, (slot + slotOffset[d])) + '_' + Math.max(slot, (slot + slotOffset[d]))
          this.grid.boxes[item.connections[dir[d]]].push(identifier)
          
          //console.log('slot '+slot+' added '+item.connections[dir[d]]+' from '+dir[d]+' ident ' + identifier)
        }
      }
      
      return item
    },
    
    // ---------------------------
    
    bonuses() {
      let stats = {
        movement: 0,
        accuracy: 0,
        strength: 0,
        evasion: 0,
        luck: 0,
        speed: 0
      }
      let text = []
      let affinities = this.affinities()
      
      let items = this.extendedGridItems()
      items.forEach(i => {
        if(i.description?.length) {
            i.description.split("\n").map(d => d.trim()).forEach(d => {
              if(d.charAt(0) === '+' || d.charAt(0) === '-') {
                let [bonus,stat] = d.split(' ')
                stats[stat.replaceAll('.','')] += parseInt(bonus)
              } else {
                text.push(d)
              }
            })
        }
        if(i.action?.length) text.push('[A]:' + i.action)
        
        if(i.unlock?.requires?.length) {
          let requirements = {
            connection: { red: 0, blue: 0, green: 0 },
            affinity: { red: 0, blue: 0, green: 0 }
          }
          
          i.unlock.requires.map(r => r.toLowerCase().trim()).forEach(r => {
            let [color, type] = r.split(' ')
            requirements[type][color]++
          })
          
          if(
            affinities.red >= requirements.affinity.red &&
            affinities.blue >= requirements.affinity.blue &&
            affinities.green >= requirements.affinity.green &&
            i.calculated.connections.red >= requirements.connection.red &&
            i.calculated.connections.blue >= requirements.connection.blue &&
            i.calculated.connections.green >= requirements.connection.green
          ) {
            if(i.unlock.description.charAt(0) === '+' || i.unlock.description.charAt(0) === '-') {
                let [bonus,stat] = i.unlock.description.split(' ')
                stats[stat.replaceAll('.','')] += parseInt(bonus)
            } else {
              text.push(i.unlock.description)
            }
          }
        }
      })
      
      let asp = this.armorSetProgress()
      asp.forEach(as => {
        if(as.progress >= as.piecesRequired) {
          as.bonuses.forEach(b => {
            if(b.type === 'ability') {
              text.push('<strong>'+b.name+'</strong>: '+b.description)
            } else if(b.type === 'general') {
              text.push(b.description)
            }
          })
        }
      })
      
      return {
        stats: stats,
        text: text.sort().map(this.parseBlock)
      }
    },
    
    armors() {
      let retObj = { head: 0, body: 0, arms: 0, waist: 0, legs: 0 }
      
      let items = this.extendedGridItems()
      items.forEach(i => {
        if(!i.id) return
        
        if(i.type === 'armor' || i.grants.armor) {
          i.armor.locations.forEach(l => retObj[l] += parseInt(i.armor.amount))
        }
      })
      
      let asp = this.armorSetProgress()
      asp.forEach(as => {
        if(as.progress >= as.piecesRequired) {
          as.bonuses.forEach(b => {
            if(b.type === 'armor') {
              Object.keys(retObj).forEach(k => {
                retObj[k] += b.amount  
              })
            } 
          })
        }
      })
      
      return retObj
    },
    
    affinities() {
      let retObj = { red: 0, blue: 0, green: 0 }
      if(!this.grid.boxes) {
        this.grid.boxes = {
          red: [],
          blue: [],
          green: []
        }
      }
      let items = this.extendedGridItems();
      ['red','blue','green'].forEach(c => {
        retObj[c] = this.grid.boxes[c].filter((v,i,s) => s.indexOf(v) === i && v !== null).length
        retObj[c] += items.map(gi => gi?.affinities?.filter(a => a.trim().toLowerCase() === c) || []).map(f => f.length).reduce((a,b) => a + b, 0)
      })
      
      
      return retObj
    },
  
    armorSetProgress() {
      let names = this.gridItems.map(i => i.id ? i.name.trim() : '__NULL')
      return this.armorSets.map(a => {
        let matches = names.filter(n => a.pieces.includes(n))
        a.progress = matches.length
        return a
      })
    },
    
    updatePreviews() {
      this.grid.previews = this.gridItems.map(i => {
        if(
          i === null ||
          (typeof i === 'object' && !i.id)
        ) return ''
        
        if(typeof i === 'string') return i
        
        if(i.type === 'armor') {
          return i.armor.locations[0]
        }
        
        return i.type
      })
    }
  }
}