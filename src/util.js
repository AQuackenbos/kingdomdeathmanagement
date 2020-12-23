const defaultGearItem = { 
  type: null,
  name: null,
  action: null,
  description: null,
  classifications: [],
  keywords: [],
  affinities: [],
  grants: {
    attack: false,
    armor: false
  },
  armor: {
    locations: [],
    amount: 0
  },
  weapon: {
    speed: 0,
    accuracy: 0,
    strength: 0
  },
  connections: {
    top: null,
    left: null,
    right: null,
    bottom: null
  },
  unlock: {
    sizing: 0,
    requires: [],
    description: null
  }
}

export {
  defaultGearItem
}