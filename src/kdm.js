const quarries = [
    'white_lion'
]

const innovations = [
    {
        reference: "language",
        deck: true,
        innovated: false,
        year: null
    }
]

const locations = [
    'lantern_hoard'
]

const events = [
    {
        name: "Returning Survivors",
        year: 1
    },
    {
        name: "Endless Screams",
        year: 2
    },
    {
        name: "Hands of Heat",
        year: 5
    },
    {
        name: "Armored Strangers",
        year: 6
    },
    {
        name: "Phoenix Feather",
        year: 7
    },
    {
        name: "Regal Visit",
        year: 11
    },
    {
        name: "Principle: Conviction",
        year: 12
    },
    {
        name: "Watched",
        year: 20
    }
]

const showdowns = [
    {
        name: "Butcher",
        level: 1,
        year: 4
    },
    {
        name: "King's Man",
        level: 1,
        year: 9
    },
    {
        name: "The Hand",
        level: 1,
        year: 13
    },
    {
        name: "Butcher",
        level: 2,
        year: 16
    },
    {
        name: "King's Man",
        level: 2,
        year: 19
    },
    {
        name: "Butcher",
        level: 3,
        year: 23
    },
    {
        name: "Watcher",
        level: 0,
        year: 25
    },
    {
        name: "King's Man",
        level: 3,
        year: 28
    },
    {
        name: "Gold Smoke Knight",
        level: 0,
        year: 30
    }
]

const survivor = {
    stats: {
        movement: {
            base: 5,
            items: 0,
            tokens: 0
        },
        accuracy: {
            base: 0,
            items: 0,
            tokens: 0
        },
        strength: {
            base: 0,
            items: 0,
            tokens: 0
        },
        evasion: {
            base: 0,
            items: 0,
            tokens: 0
        },
        luck: {
            base: 0,
            items: 0,
            tokens: 0
        },
        speed: {
            base: 0,
            items: 0,
            tokens: 0
        }
    },
    survival: {
        amount: 0,
        abilities: {
            dodge: false,
            encourage: false,
            surge: false,
            dash: false,
            endure: false
        },
        skipHunt: null
    },
    lifetime: {
        name: null,
        gender: null,
        experience: 0,
        born: null,
        father: null,
        mother: null,
        died: null,
        cause: null,
        cannot: {
            fightingArts: false,
            survival: false,
            hunt: false
        },
        reroll: {
            available: false,
            used: false
        },
        notes: null
    },
    defenses: {
        arms: {
            value: 0,
            light: false,
            heavy: false,
            severe: []
        },
        body: {
            value: 0,
            light: false,
            heavy: false,
            severe: []
        },
        brain: {
            value: 0,
            light: false
        },
        head: {
            value: 0,
            heavy: false,
            severe: []
        },
        legs: {
            value: 0,
            light: false,
            heavy: false,
            severe: []
        },
        waist: {
            value: 0,
            light: false,
            heavy: false,
            severe: []
        }
    },
    abilities: {
        abilities: [],
        disorders: [],
        fightingArts: [],
        impairments: []
    },
    mentality: {
        courage: {
            level: 0,
            abilities: {
                stalwart: {
                    name: "Stalwart",
                    granted: false,
                    description: "Can't be knocked down by brain trauma or intimidate."
                },
                prepared: {
                    name: "Prepared",
                    granted: false,
                    description: "Add Hunt XP to your roll when determining a straggler."
                },
                matchmaker: {
                    name: "Matchmaker",
                    granted: false,
                    description: "Spend 1 endeavor to trigger intimacy story event."
                }
            }
        },
        understanding: {
            level: 0,
            abilities: {
                analyze: {
                    name: "Analyze",
                    granted: false,
                    description: "Look at the top AI card and return it to the top of the deck."
                },
                explore: {
                    name: "Explore",
                    granted: false,
                    description: "Add +2 to your investigate roll results."
                },
                tinker: {
                    name: "Tinker",
                    granted: false,
                    description: "+1 endeavor when you are a returning survivor."
                }
            }
        }
    },
    weapon: {
        selected: null,
        proficiency: 0
    }
}

export {
    quarries,
    innovations,
    locations,
    events,
    showdowns,
    survivor
}