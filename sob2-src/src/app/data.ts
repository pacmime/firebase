

export const Data = {

    CLASSES: [
        {
            "name":  "Gambler",
            "classId": "47aE4QTcdX3bs6J4YoZr",
            "keywords":  "Performer, Showman",
            "abilities": [
                {
                    "desc": "Starts with one Gambling Trick (draw 2, choose 1). Each trick may only be used 1x turn. Any time you Catch your Breath, you may also Recover D3 Fortune tokens.",
                    "name": "Lady Luck"
                },
                {
                    "desc": "Whenever you collect Gold from any Gambling in Town, you may collect an extra D6 x $50",
                    "name": "Poker Face"
                }
            ],
            "upgrades":  [
                {
                    "name": "Fancy Footwork",
                    "value": "You may roll and extra die for Move each turn and choose which to use. If doubles are rolled on your Move dice, also recover 1 Fortune token"
                },
                {
                    "name": "Side Bet",
                    "modifiers": [
                        {"affects": "Luck", "value": 1}
                    ],
                    "value": "+1 Luck. When making any Skill test, if you roll 3 of a kind, recover 1 Fortune token. However if you roll three 1s, lose D3 Fortune tokens instead"
                },
                {
                    "name": "High Roller",
                    "value": "Your To-Hit rolls of 6+ do +1 Damage. Whenever you recover a Grit, you may also recover 1 Fortune token."
                },
                {
                    "modifiers": [{"affects":"Agility","value":1}],
                    "name":  "Nimble Fingers",
                    "value":  "New Gambling Trick. +1 Agility"
                },
                {
                    "modifiers": [{"affects":"movement","value":1}],
                    "name":  "On a Roll",
                    "value":  "Whenever you kill an Enemy, you may recover 1 Fortune token. +1 Move"
                },
                {
                    "modifiers": [ { "affects":  "Lore", "value":  1 } ],
                    "name":  "Well, I Say!",
                    "value":  "1x per Adventure, you may recover Fortune tokens up to your max. +1 Lore"
                },
                {
                    "modifiers": [{ "affects":  "fortune", "value":  1 } ],
                    "name":  "Play to Win",
                    "value":  "Your Poker Face ability now gives a bonus D6+2 x $50 instead, but also gives you and extra Unwanted Attention marker. +1 Fortune"
                },
                {
                    "modifiers": [
                        { "affects":  "Fortune", "value":  1 }
                    ],
                    "name":  "Tell",
                    "value":  "For each To Hit roll of 1 an Enemy rolls when attacking you, you may cancel one of its other successful To Hit rolls on you. +1 Fortune",
                    "requires": "Nimble Fingers"
                },
                {
                    "modifiers": [
                        { "affects":  "init", "value":  1 }
                    ],
                    "name":  "Box Cars",
                    "value":  "Any time you roll a 6 for Willpower, Defense, or any skill test, you may change any other single die of that test into a 6 as well. +1 Initiative",
                    "requires": "On a Roll"
                },
                {
                    "name":  "Affectation",
                    "value":  "At the start of each Adventure, you may draw a random Personal Item to use until the end of that Adventure",
                    "requires": "Well, I Say!"
                },
                {
                    "modifiers": [
                        { "affects":  "grit", "value":  1 }
                    ],
                    "name":  "Cutthroat",
                    "value":  "You add +1 Shot and +1 Damage to any Light Gun you use. +1 Max Grit",
                    "requires": "Play to Win"
                },
                {
                    "modifiers": [
                        { "affects":  "Cunning", "value":  1 }
                    ],
                    "name":  "Old Hand",
                    "value":  "New Gambling Trick. +1 Cunning",
                    "requires": "Tell"
                },
                {
                    "modifiers":  [ { "affects":  "fortune", "value":  1 } ],
                    "name":  "Blow for Luck",
                    "value":  "1x turn, you may spend 1 Grit to recover 1 Fortune or vice versa. +1 Fortune",
                    "requires": "Box Cars"
                },
                {
                    "name":  "Fancy Pants",
                    "value":  "You are +1 Sanity and +1 Health for each of the following Clothing items you have equipped: Hat, Belt, Coat, Pants, Torso, Gloves, Boots. You may not stay at the Camp Site in Town.",
                    "requires": "Affectation"
                },
                {
                    "modifiers":  [
                        { "affects":  "Cunning", "value":  1 },
                        { "affects": "defense", "value": -1 }
                    ],
                    "name":  "Full House",
                    "value":  "+1 Cunning and Defense 3+",
                    "requires": "Cutthroat"
                },
                {
                    "modifiers": [
                        {"affects": "Luck", "value": 1}
                    ],
                    "name":  "Make Your Own Luck",
                    "value":  "You start every Adventure with a Revive token, usable only by you. Gain 25 XP any time you use it. +1 Luck",
                    "requires": "Old Hand"
                },
                {
                    "name":  "Let It Ride",
                    "value":  "Any time you roll 4 or more dice together, you may choose any number of those dice to re-roll once. These dice do not count as having been re-rolled.",
                    "requires": "Blow for Luck"
                },
                {
                    "modifiers": [
                        { "affects":  "fortune", "value":  1 }
                    ],
                    "name":  "Entourage",
                    "value":  "You only need to pay 50% of the base 'Cost to Hire' for any Allies. All Items and tokens in Town cost you 20% less (rounding up to nearest $5). +1 Fortune",
                    "requires": "Fancy Pants"
                },
                {
                    "name":  "Aces High",
                    "value":  "If your Cunning is higher than an Enemy's Initiative, you are +1 on To-Hit rolls assigned to that Enemy (6+ is a Critical Hit)",
                    "requires": "Full House"
                },
                {
                    "name": "Of Many Talents",
                    "roll": 2,
                    "value":  "At the start of each Adventure, choose one of the following keywords to have until the end of that Adventure: Traveler, Frontier, Outlaw, Soldier, Strange",
                    "multi": true
                },
                {
                    "name": "+1 Cunning",
                    "roll": 3,
                    "value":  "+1 Cunning",
                    "multi": true,
                    "modifiers": [ {"affects": "Cunning", "value": 1}]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 4,
                    "value":  "+1 Initiative",
                    "multi": true,
                    "modifiers": [ {"affects": "init", "value": 1}]
                },
                {
                    "name": "+1 Strength",
                    "roll": 5,
                    "value":  "+1 Strength, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [ {"affects": "Strength", "value": 1} ]
                },
                {
                    "name": "+1 Move or +1 Spirit",
                    "roll": 6,
                    "value":  "+1 Move or +1 Spirit, +D6 Health",
                    "multi": true,
                    "modifiers": [
                        {"affects": "movement", "value": 0},
                        {"affects": "Spirit", "value": 0}
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value":  "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Move or +1 Lore",
                    "roll": 8,
                    "value":  "+1 Move or +1 Lore, +D6 Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "movement", "value": 0},
                        {"affects": "Lore", "value": 0}
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value":  "+1 Side Bag Capacity and +D6 Health",
                    "multi": true,
                    "modifiers": [ {"affects": "sidebag", "value": 2}]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value":  "+1 Grit",
                    "multi": true,
                    "modifiers": [ {"affects": "grit", "value": 1}]
                },
                {
                    "name": "+1 Luck",
                    "roll": 11,
                    "value":  "+1 Luck",
                    "multi": true,
                    "modifiers": [ {"affects": "Luck", "value": 1}]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value":  "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [ {"affects": "corruption", "value": 2}]
                }
            ],
            "combat": 2,
            "melee":  5,
            "ranged":  4,
            "defense": 4,
            "willpower":  4,
            "movement":  0,
            "init":  5,
            "corruption":   { "current": 0, "max": 5 },
            "fortune":      { "current": 3, "max":  3 },
            "grit":         { "current": 1, "max":  2 },
            "health":       { "max":  10, "wounds":  0 },
            "sanity":       { "loss":  0, "max":  10 },
            "items":  [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                { "name":  "Gambling Trick" },
                { "name":  "Fortune's Favor" }
            ],
            "stats":  {
                "Agility":  3,
                "Cunning":  4,
                "Lore":  2,
                "Luck":  3,
                "Spirit":  1,
                "Strength":  2
            },
            "tricks":  [
                {
                    "desc":  "This is a description",
                    "name":  "Trick Name"
                }
            ],
            "sidebag": { "capacity":  5 },
            "level":  1,
            "wealth":  0,
            "darkstone": 0,
            "xp":  0
        },
        {
            "name":  "Wandering Samurai",
            "classId":  "M1qfgZTa78yjAmoEspsh",
            "keywords":  "Traveler, Showman, Samurai",
            "abilities": [
                {
                    "desc":  "Starts with 2 Random Wanderer Samurai Battle Tactics (draw 3, choose 2). Battle Tactics may each only be used 1x turn",
                    "name":  "Samurai Battle Tactics"
                },
                {
                    "desc":  "Any time you do 1 or more Wounds to an Enemy with a Combat Hit, gain 1 Fury token",
                    "name":  "Battle Fury"
                },
                {
                    "desc":  "May not use Guns or Explosives and may not voluntarily Flee from an Adventure (though the rest of the Posse may Flee without you)",
                    "name":  "Code of Honor"
                }
            ],
            "combat":  2,
            "melee":  3,
            "ranged":  4,
            "darkstone":  0,
            "defense":  3,
            "willpower":  4,
            "faith":  0,
            "fury": { "current":  0, "max":  5 },
            "grit": { "current":  1, "max":  2 },
            "health": {  "max":  10, "wounds":  0 },
            "sanity": { "loss":  0, "max":  10 },
            "corruption": { "current":  0, "max":  5 },
            "init":  5,
            "items": [
                {
                    "name":  "Wanderer's Katana",
                    "source":  "Starting Gear",
                    "desc": "+2 Max Fury. 1x Turn, you may spend 3 Fury to add +D3 Damage to one of your Combat Hits",
                    "cost": 400,
                    "hands": 2,
                    "keywords": "Gear, Blade, Hand Weapons",
                    "slots": 2,
                    "weight": 1,
                    "modifiers": [ {"affects": "fury", "value": 2} ]
                }
            ],
            "movement":  0,
            "sidebag": { "capacity":  5 },
            "stats": {
                "Agility":  3,
                "Cunning":  3,
                "Lore":  2,
                "Luck":  2,
                "Spirit":  2,
                "Strength":  3
            },
            "tactics":  [
                {
                    "desc":  "This is a description",
                    "name":  "Tactic Name"
                }
            ],
            "upgrades": [
                {
                    "name": "Ronin",
                    "modifiers": [
                        {"affects": "fury", "value": 1},
                        {"affects": "Strength", "value": 1}
                    ],
                    "value": "+1 Max Fury and +1 Strength. When drawing Loot cards, you may draw one extra and choose one to discard. May not use Samurai Battle Tactics that have the keyword Healing. Extra Starting Gear: Samurai Armor, Ronin's Helmet"
                },
                {
                    "name": "Quiet Traveler",
                    "value": "Gain D3+1 Fury at the start of every Fight. Your 2-H Hand Weapons only take up 1-H for you to use"
                },
                {
                    "name": "Sword Master",
                    "value": "Rapid Strike (Blade) - Any time you kill an Enemy with a Combat Hit using a Blad Hand Weapon, you immediately gain +1 Combat for that Attack (limit +3)"
                },
                {
                    "modifiers": [ { "affects":  "Agility", "value":  1 } ],
                    "name":  "Battle Ready",
                    "value":  "New Wanderer Samurai Tactic; +1 Agility"
                },
                {
                    "modifiers": [ { "affects":  "fury", "value":  1 } ],
                    "name":  "Battle Yell",
                    "value":  "Any time you kill an Enemy with a Combat Hit, gain +1 Fury"
                },
                {
                    "modifiers": [ { "affects":  "Cunning", "value":  1 } ],
                    "name":  "Control Discipline",
                    "value":  "While using a 2-H blade, you may use the D8 for your Combat Damage. +1 Cunning"
                },
                {
                    "modifiers": [
                        { "affects":  "Lore", "value":  1 },
                        { "affects":  "Move", "value":  1 }
                    ],
                    "name":  "On the Road",
                    "value":  "You may start every Adventure with a free Fire Sake token. +1 Lore and +1 Move"
                },
                {
                    "modifiers": [
                        { "affects":  "grit", "value":  1 }
                    ],
                    "name":  "Fighter's Training",
                    "value":  "New Wanderer Samurai Battle Tactic. +1 Max Grit.",
                    "requires": "Battle Ready"
                },
                {
                    "modifiers": [
                        { "affects":  "fury", "value":  1 }
                    ],
                    "name":  "Extra Effort",
                    "value":  "1x turn you may spend 2 Fury each to add extra dice to any Skill test you are making. +1 Max Fury",
                    "requires": "Battle Yell"
                },
                {
                    "modifiers": [
                        { "affects":  "Strength", "value":  1 }
                    ],
                    "name":  "Power Discipline",
                    "value":  "1x turn while using a Blade, you may spend 5 Fury to add D6 Damage to one of your Combat Hits. +1 Strength",
                    "requires": "Control Discipline"
                },
                {
                    "modifiers": [
                        { "affects":  "grit", "value":  1 }
                    ],
                    "name":  "Calm Exterior",
                    "value":  "1x turn, you may spend 2 Grit to gain Peril Die Fury. +1 Max Grit",
                    "requires": "On the Road"
                },
                {
                    "modifiers": [
                        { "affects":  "combat", "value":  1 }
                    ],
                    "name":  "Warrior's Resolve",
                    "value":  "New Wanderer Samurai Battle Tactic. +1 Combat",
                    "requires": "Fighter's Training"
                },
                {
                    "modifiers":  [
                        { "affects":  "grit", "value":  1 },
                        { "affects":  "fury", "value":  1 }
                    ],
                    "name":  "Unleashed",
                    "value":  "1x Adventure, gain Fury up to your Max Fury for free. +1 Max Grit and +1 Max Fury",
                    "requires": "Extra Effort"
                },
                {
                    "modifiers":  [
                        { "affects":  "Spirit", "value":  1 }
                    ],
                    "name":  "Mental Discipline",
                    "value":  "1x Fight, at the start of a turn, you may reduce your Init by any amount (min 1). Gain Fury equal to this amount. +1 Spirit",
                    "requires": "Power Discipline"
                },
                {
                    "modifiers": [
                        { "affects":  "combat", "value":  1 }
                    ],
                    "name":  "Don't Make Him Angry",
                    "value":  "1x Travel, you may spend 1 Grit to cancel a Travel Hazard (before any dice are rolled for it). +1 Combat",
                    "requires": "Calm Exterior"
                },
                {
                    "name":  "Master of War",
                    "value":  "At the start of each Adventure, draw a temporary Wanderer Samurai Battle Tactic. This is one use, only for this Adventure that may be played without spending Fury.",
                    "requires": "Warrior's Resolve"
                },
                {
                    "modifiers": [
                        { "affects":  "init", "value":  1 }
                    ],
                    "name":  "Master of Fury",
                    "value":  "Any time you spend Fury, add 1 extra Fury to the total spent for free. +1 Initiative",
                    "requires": "Unleashed"
                },
                {
                    "name":  "Flashing Steel",
                    "value":  "While you have a Blade equipped, you are +1 Damage on your Combat Hits, and 1x turn you may re-roll all of your failed Defense rolls just rolled",
                    "requires": "Mental Discipline"
                },
                {
                    "modifiers": [
                        { "affects":  "fury", "value":  2 },
                        { "affects":  "willpower", "value":  -1 }
                    ],
                    "name":  "Death Before Dishonor",
                    "value":  "+2 Max Fury and Willpower 3+",
                    "requires": "Don't Make Him Angry"
                },
                {
                    "name": "Honorable Vendetta",
                    "roll": 2,
                    "value":  "Choose an Enemy keyword. Any time you collect XP from those Enemies, collect an extra +10 XP",
                    "multi": true
                },
                {
                    "name": "+1 Max Fury",
                    "roll": 3,
                    "value":  "+1 Max Fury",
                    "multi": true,
                    "modifiers": [ {"affects": "fury", "value": 1}]
                },
                {
                    "name": "+1 Move",
                    "roll": 4,
                    "value":  "+1 Move",
                    "multi": true,
                    "modifiers": [ {"affects": "movement", "value": 1}]
                },
                {
                    "name": "+1 Str and +1 Lore",
                    "roll": 5,
                    "value":  "+1 Strength and +1 Lore, +D6 Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "Strength", "value": 1},
                        {"affects": "Lore", "value": 1}
                    ]
                },
                {
                    "name": "+1 Cunning or +1 Spirit",
                    "roll": 6,
                    "value":  "+1 Cunning or +1 Spirit, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "Cunning", "value": 0},
                        {"affects": "Spirit", "value": 0}
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value":  "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Agility or +1 Luck",
                    "roll": 8,
                    "value":  "+1 Agility or +1 Luck, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "Agility", "value": 0},
                        {"affects": "Luck", "value": 0}
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value":  "+1 Side Bag Capacity",
                    "multi": true,
                    "modifiers": [ {"affects": "sidebag", "value": 2}]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value":  "+1 Grit",
                    "multi": true,
                    "modifiers": [ {"affects": "grit", "value": 1}]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value":  "+1 Initiative",
                    "multi": true,
                    "modifiers": [ {"affects": "init", "value": 1}]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value":  "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [ {"affects": "corruption", "value": 2}]
                }
            ],
            "level":  1,
            "wealth":  0,
            "xp":  0
        },
        {
            "name":  "Dark Stone Shaman",
            "classId": "Rsyya36YjBhmfv4U1ICQ",
            "keywords":  "Tribal, Magik",
            "abilities": [
                {
                    "desc": "Starts with 1 Random Spirit Magik spell drawn from the Battle, Protection, or Shapeshifting spell decks (draw 2, choose 1). May not use Guns, Explosives, or Tech items.",
                    "name": "Tribal Shaman"
                },
                {
                    "desc": "You may discard Dark Stone when casting a spell (up to the spell's Power Level) to add 2 extra casting dice each, even after the roll to cast has been made.",
                    "name": "Dark Stone Enhancement"
                }
            ],
            "upgrades":  [
                {
                    "name": "Spirit Hunter",
                    "modifiers": [
                        {"affects": "init", "value": 1}
                    ],
                    "value": "+1 Initiative. When casting Battle spells, you may re-roll one of the casting dice. Extra Starting Gear: Dark Stone Hatchet, Warrior's Speed"
                },
                {
                    "name": "Spirit Guardian",
                    "modifiers": [
                        {"affects": "Strength", "value": 1}
                    ],
                    "value": "+1 Strength. When casting Spirit Magik Protection spells, you may re-roll one of the casting dice. Extra Starting Gear: Ancestral Shield"
                },
                {
                    "name": "Spirit Shaper",
                    "modifiers": [
                        {"affects": "grit", "value": 1}
                    ],
                    "value": "+1 Max Grit. When casting Spirit Magik Shapeshifting spells, you may re-roll one of the casting dice. Extra Starting Gear: Bear Form"
                },
                {
                    "name":  "War Shaman",
                    "value":  "New Spirit Magik Battle or Protection spell"
                },
                {
                    "name":  "Call of the Wild",
                    "value":  "New Spirit Magik Shapeshifting spell"
                },
                {
                    "modifiers": [ { "affects":  "grit", "value":  1 } ],
                    "name":  "Harmony",
                    "value":  "You no longer need to roll for Corruption from Darkstone at the end of each Adventure. +1 Max Grit"
                },
                {
                    "modifiers": [
                        { "affects":  "Lore", "value":  1 },
                        { "affects":  "magik", "value":  1 }
                    ],
                    "name":  "Storytelling",
                    "value":  "+1 Magik and +1 Lore"
                },
                {
                    "modifiers": [
                        { "affects":  "Agility", "value":  1 }
                    ],
                    "name":  "Spirit Sacrifice",
                    "value":  "1x turn when you kill an Enemy, you may use 2 Magik to recover a Grit. +1 Agility",
                    "requires": "War Shaman"
                },
                {
                    "modifiers": [
                        { "affects":  "init", "value":  1 }
                    ],
                    "name":  "Tribal Dance",
                    "value":  "While in Animal Form, you may re-roll 1 Defense or 1 To Hit roll per turn. +1 Initiative",
                    "requires": "Call of the Wild"
                },
                {
                    "name":  "Attuned",
                    "value":  "Dark Stone used to enhance your spells now add 3 extra casting dice each instead",
                    "requires": "Harmony"
                },
                {
                    "modifiers": [
                        { "affects":  "Cunning", "value":  1 }
                    ],
                    "name":  "Wisdom of Ages",
                    "value":  "New Spirit Magik Battle or Protection or Shapeshifting spell. +1 Cunning",
                    "requires": "Storytelling"
                },
                {
                    "modifiers": [
                        { "affects":  "magik", "value":  1 }
                    ],
                    "name":  "Battle Chant",
                    "value":  "New Spirit Magik Battle or Protection spell. +1 Magik",
                    "requires": "Spirit Sacrifice"
                },
                {
                    "modifiers":  [ { "affects":  "magik", "value":  1 } ],
                    "name":  "Animal Nature",
                    "value":  "New Spirit Magik Shapeshifting spell. +1 Magik",
                    "requires": "Tribal Dance"
                },
                {
                    "modifiers":  [
                        { "affects":  "Strength", "value":  1 }
                    ],
                    "name":  "Void Strength",
                    "value":  "You are +1 Health for each unique Item you carry that has a Dark Stone icon on it. +1 Strength",
                    "requires": "Attuned"
                },
                {
                    "name":  "Ancestral Guide",
                    "value":  "1x turn, you may use 2 Dark Stone to prevent the Darkness from moving on the Depth Track on a D6 roll of 3+",
                    "requires": "Wisdom of Ages"
                },
                {
                    "modifiers": [
                        {"affects": "grit", "value": 1},
                        {"affects": "defense", "value": -1}
                    ],
                    "name":  "Spirit Champion",
                    "value":  "+1 Max Grit and Defense 3+",
                    "requires": "Battle Chant"
                },
                {
                    "modifiers": [{"affects": "combat", "value": 1}],
                    "name":  "One With The Spirits",
                    "value":  "You may now cast other Spirit Magik, even while in Animal Form. +1 Combat",
                    "requires": "Animal Nature"
                },
                {
                    "modifiers": [
                        { "affects":  "move", "value":  1 }
                    ],
                    "name":  "Light As A Feather",
                    "value":  "Items you carry that have a Dark Stone icon count as having 1 less weight. +1 Move",
                    "requires": "Void Strength"
                },
                {
                    "modifiers": [ { "affects":  "magik", "value":  1 } ],
                    "name":  "Tribal Elder",
                    "value":  "1x turn, you may add an extra Power Level to a single spell you are casting",
                    "requires": "Ancestral Guide"
                },
                {
                    "name": "Ancient Rivals",
                    "roll": 2,
                    "value":  "You are +1 Damage on all Attacks against Void Enemies, and any time you collect XP from a Void Enemy, collect an extra +5 XP",
                    "multi": true
                },
                {
                    "name": "+1 Strength",
                    "roll": 3,
                    "value":  "+1 Strength",
                    "multi": true,
                    "modifiers": [ {"affects": "Strength", "value": 1}]
                },
                {
                    "name": "+1 Move",
                    "roll": 4,
                    "value":  "+1 Move",
                    "multi": true,
                    "modifiers": [ {"affects": "movement", "value": 1}]
                },
                {
                    "name": "+1 Agility",
                    "roll": 5,
                    "value":  "+1 Agility, +D6 Sanity",
                    "multi": true,
                    "modifiers": [ {"affects": "Agility", "value": 1} ]
                },
                {
                    "name": "+1 Lore or +1 Spirit",
                    "roll": 6,
                    "value":  "+1 Lore or +1 Spirit, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "Lore", "value": 0},
                        {"affects": "Spirit", "value": 0}
                    ]
                },
                {
                    "name": "Health and Sanity",
                    "roll": 7,
                    "value":  "+D6 Health and +D6 Sanity",
                    "multi": true,
                    "modifiers": []
                },
                {
                    "name": "+1 Cunning or +1 Luck",
                    "roll": 8,
                    "value":  "+1 Cunning or +1 Luck, +D6 Health/Sanity",
                    "multi": true,
                    "modifiers": [
                        {"affects": "Cunning", "value": 0},
                        {"affects": "Luck", "value": 0}
                    ]
                },
                {
                    "name": "+2 Side Bag Capacity",
                    "roll": 9,
                    "value":  "+1 Side Bag Capacity",
                    "multi": true,
                    "modifiers": [ {"affects": "sidebag", "value": 2}]
                },
                {
                    "name": "+1 Max Grit",
                    "roll": 10,
                    "value":  "+1 Grit",
                    "multi": true,
                    "modifiers": [ {"affects": "grit", "value": 1}]
                },
                {
                    "name": "+1 Initiative",
                    "roll": 11,
                    "value":  "+1 Initiative",
                    "multi": true,
                    "modifiers": [ {"affects": "init", "value": 1}]
                },
                {
                    "name": "Dark Stone Resistance",
                    "roll": 12,
                    "value":  "You can now hold 2 more Corruption Points before mutating",
                    "multi": true,
                    "modifiers": [ {"affects": "corruption", "value": 2}]
                }
            ],
            "combat": 2,
            "melee":  4,
            "ranged":  5,
            "defense": 4,
            "willpower":  4,
            "movement":  0,
            "init":  5,
            "magik":  3,
            "corruption":   { "current": 0, "max": 5 },
            "grit":         { "current": 1, "max":  2 },
            "health":       { "max":  10, "wounds":  0 },
            "sanity":       { "loss":  0, "max":  12 },
            "items":  [
                {
                    "cost": 450,
                    "description": "+1 Magik. 1x turn you may attempt to cancel a Darkness card. Roll D6, on 5 or 6 success; otherwise take Peril die Sanity damage ignoring Willpower",
                    "hands": 1,
                    "keywords": "Gear, Icon, Magik, Hand Weapon",
                    "name": "Shaman Staff",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1,
                    "modifiers": [ { "affects": "magik", "value": 1 } ]
                },
                {
                    "cost": 850,
                    "description": "Holds up to 5 Dark Stone. Any Dark Stone inside is Hidden and does not cause Corruption Hits. Gain D3 Dark Stone here at the start of each Adventure",
                    "hands": 1,
                    "keywords": "Gear, Container, Tribal",
                    "name": "Dark Stone Satchel",
                    "slots": 0,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 550,
                    "description": "Your Combat Hits are +1 Damage while the Darkness is in the bottom stage of the Depth Track, +2 in middle, or +3 in top stage",
                    "hands": 1,
                    "keywords": "Gear, Dark Stone, Tribal, Hand Weapon",
                    "name": "Dark Stone Hatchet",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "stats":  {
                "Agility":  2,
                "Cunning":  1,
                "Lore":  4,
                "Luck":  1,
                "Spirit":  4,
                "Strength":  2
            },
            "spells":  [],
            "level":  1,
            "wealth":  0,
            "darkstone": 0,
            "xp":  0
        },

        {
            "name": "Gunslinger",
            "abilities": [
                {
                    "desc": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets",
                    "name": "Quick and the Dead"
                }
            ],
            "classId": "1455a125-99a3-4aeb-bd6c-0d66bce4b87c",
            "combat": 1,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 5,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 6,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman",
            "level": 1,
            "melee": 5,
            "movement": 0,
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "requires": "Master of Killin'",
                    "value": "Ranged To Hit 2+",
                    "name": "Best Shot in the West"
                },
                {
                    "requires": "Showmanship",
                    "value": "Before rolling To Hit, choose a number. Any die that rolls the chosen number does an extra 1 Damage ignoring Defense even if the shot would normally miss.",
                    "name": "Call Your Shot"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        },
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "requires": "Hushed Whispers",
                    "value": "+1 Cunning and +1 Luck. Any time you win at Gambling in Town, you gain an extra D6 x $10.",
                    "name": "Card Shark"
                },
                {
                    "value": "Once per Adventure, you may say your Catch Phrase to immediately Heal 2D6 Wounds or to add D6 Damage to one of your Hits.",
                    "name": "Catch Phrase"
                },
                {
                    "requires": "Ricochet Shots",
                    "value": "Start with up to 2 Cerberus Shots in your Six-Shooter. (Blue markers)",
                    "name": "Cerberus Shots"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Call Your Shot",
                    "value": "You start every Adventure with a Revive Token, usable only by you. Gain 25 XP any time you use it. +1 Lore.",
                    "name": "Charmed Life"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "At the start of any Fight Turn, you may reduce your Initiative by 3 to gain +1 Shot with a 1-Handed Gun. +1 Max Grit.",
                    "name": "Cool Hand"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "multi": true,
                    "value": "+D6 Health.",
                    "name": "Health"
                },
                {
                    "multi": true,
                    "value": "+2 Health and +2 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Cerberus Shots",
                    "value": "Start with up to 2 Hellfire Shots in your Six-Shooter. (Red markers)",
                    "name": "Hellfire Shots"
                },
                {
                    "value": "You now start every Adventure and Town Stay with an extra 1 Grit.",
                    "name": "Hushed Whispers"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative. Also gain +D6 Sanity.",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Card Shark",
                    "value": "You may now use up to 2 Shots from your Six-Shooter on each Hit. +1 Max Grit.",
                    "name": "Killer"
                },
                {
                    "requires": "Killer",
                    "value": "Once per Fight, use 2 Grit to add extra Damage to one of your Hits, equal to your current Hero Level.",
                    "name": "Legend of the West"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Through Shot",
                    "value": "You may now use your Six-Shooter Shots with any Gun, not just Pistols. +1 Max Grit.",
                    "name": "Master of Killin'"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "Use 1 Grit to double the number of Shots you get with a 1-Handed Gun for one Attack (limit once per turn). To use this ability, you must have 1 Hand slot open.",
                    "name": "Pistol Fanning"
                },
                {
                    "value": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets",
                    "name": "Quick and the Dead"
                },
                {
                    "value": "Anytime a new group of Enemies is placed on the board, you may immediately make a free Attack outside of the normal turn sequence.  To use the ability, you must have 1 Hand slot open.",
                    "name": "Quickdraw"
                },
                {
                    "value": "Use 2 Grit to re-fill D6 Shots back into your Six Shooter Template",
                    "name": "Reload"
                },
                {
                    "value": "Start with up to 2 Ricochet Shots in your Six Shooter. (Green markers)",
                    "name": "Ricochet Shots"
                },
                {
                    "requires": "Catch Phrase",
                    "value": "Draw an additional Personal Item.",
                    "name": "Showmanship"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Sanity.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hellfire Shots",
                    "value": "You may start each Adventure with any mix of Shot Types in your Six-Shooter Template. +1 Max Grit.",
                    "name": "The Right Tool"
                },
                {
                    "requires": "Cool Hand",
                    "value": "Any time you kill and Enemy with a 1-Handed Gun, you may immediately do a free Hit with that Gun to another Enemy in one of the three spaces behind it.",
                    "name": "Through Shot"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                }
            ]
        },
        {
            "name": "Cowboy",
            "abilities": [
                {
                    "desc": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+.",
                    "name": "Rough Rider"
                },
                {
                    "desc": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard).",
                    "name": "Happy Trails"
                }
            ],
            "classId": "2e2e4022-35c0-498c-ad78-8b87f5664026",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 14,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "...",
                    "name": "Bandana",
                    "source": "Starting Gear"
                },
                {
                    "description": "...",
                    "name": "Lasso",
                    "source": "Starting Gear"
                },
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman, Frontier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 1,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        },
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "requires": "Take a Swing",
                    "value": "+1 Combat and +1 Strength and +1 Move.",
                    "name": "Bar Fight Vet"
                },
                {
                    "requires": "Living on the Edge",
                    "value": "Once per Fight, use 1 Grit to do D6 Wounds, ignoring Defense to both yourself and one adjacent Enemy. +3 Health.",
                    "name": "Brash Heroics"
                },
                {
                    "requires": "Frontier Rivals",
                    "value": "While you have a Trasnport Animal (it must be named), you are: Willpower 3+.",
                    "name": "Close Companion"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 2
                        }
                    ],
                    "value": "You are +2 Move.  All of your Attacks on adjacent Large size or bigger Enemies are +1 Damage",
                    "name": "Daredevil"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you Rope an Enemy with the Lasso, gain 10 XP, and Recover a Grit on the D6 roll of 4+. +1 Initiative.",
                    "name": "Fancy Roping"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Fancy Roping",
                    "value": "You may now use the Lasso up to twice per Fight, but only one Enemy may be Roped at a time. +1 Agility.",
                    "name": "Fast Return"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Living Off the Land",
                    "value": "You are now +1 Damage on all Attacks vs Tribal, Outlaw, or Beast Enemies, and gain +25 XP for each you kill. +1 Max Grit.",
                    "name": "Frontier Rivals"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Frontier Vendetta"
                },
                {
                    "requires": "Shake It Off",
                    "value": "Once per Fight, use 1 Grit to Mount an adjacent, Large or bigger Enemy (sharing its full base). While Mounted, you may not be targeted by that Enemy and the Enemy is -1 Defense. At the end of each turn, pass a Strength 6+ test (gaining 25 XP) or dismount to an adjacent empty space.",
                    "name": "Giddy-Up!"
                },
                {
                    "value": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard).",
                    "name": "Happy Trails"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "You gain double XP from Scavenge cards and may roll one extra die when Scavenging. Alos, for each Scavenge card drawn, Heal 1 Wound or Sanity.",
                    "name": "Living Off the Land"
                },
                {
                    "value": "While you are at half or less of either your Health or Sanity, your Rough Rider ability triggers on a 3+ instead (or 2+ if both).",
                    "name": "Living on the Edge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "requires": "Sucker Punch",
                    "value": "You may now use your Rought Rider ability to Recover Grit as long as you only have 0 or 1 Grit at the start of the turn, and it may be used even while KO'd.",
                    "name": "Pale Rider"
                },
                {
                    "value": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+.",
                    "name": "Rough Rider"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Fast Return",
                    "value": "At the end of any turn while KO'd, use 2 Grit to Recover without rolling for Injury/Madness. Heal 2D6 (any mix) as normal. +1 Strength.",
                    "name": "Shake It Off"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bar Fight Vet",
                    "value": "Once per turn, use 1 Grit to use your Strength value (instead of rolling) as Damage for a Combat Hit. +1 Max Grit.",
                    "name": "Sucker Punch"
                },
                {
                    "value": "Once per turn, use 1 Grit to make a Melee Attack using your Basic Combat (no Items), in addition to your normal Ranged Attack.",
                    "name": "Take a Swing"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "requires": "Brash Heroics",
                    "value": "+1 Max Grit and +1 Strength.",
                    "name": "The Deadlier the Better"
                },
                {
                    "value": "Use 1 Grit when you cause a Hit with a Gun to immediately cause an additional D3 other Enemies in a continuous chain, starting adjacent to the target, to also take a single Hit from that Gun",
                    "name": "Trick Shooting"
                },
                {
                    "value": "You always Activate before Enemies at your Initiative level.  Also all Heroes in your Posse gain +2 Initiative during the first turn of an Ambush Attack. Extra Starting Gear: Rider's Rifle (replaces Pistol)",
                    "name": "Watchman"
                },
                {
                    "requires": "The Deadlier the Better",
                    "value": "You gain +2 Shots with a 1-Handed Gun or +2 Combat (you choose), during you rActivation for every Horror Hit you took form Fear, Terror, or Unspeakable Terror this turn (max +3).",
                    "name": "Who Wants to Live Forever?"
                },
                {
                    "requires": "Close Companion",
                    "value": "While you have 4 or more Clothing Items Equipped (including a Hat), you are: Defense 3+",
                    "name": "Wilderness Mastered"
                }
            ]
        },
        {
            "name": "Drifter",
            "abilities": [
                {
                    "desc": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit.",
                    "name": "Drifter's Secret"
                },
                {
                    "desc": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards",
                    "name": "Danger Magnet"
                },
                {
                    "desc": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit.",
                    "name": "Long Years Experience"
                },
                {
                    "desc": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)",
                    "name": "Distrustful"
                }
            ],
            "classId": "30d35552-bd40-444d-9558-df917fbc4398",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "darkstone": 0,
                    "description": "Shots equal to agility. Range 6.",
                    "hands": 1,
                    "name": "Trusty Pistol",
                    "slots": 2,
                    "weight": 1
                }
            ],
            "keywords": "Traveler, Frontier, Strange",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 3,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 3,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 3,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility.",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Squint",
                    "value": "Once per turn, use 2 Grit to make an extra Attack. +1 Initiative",
                    "name": "Bad Ass"
                },
                {
                    "value": "Choose one (Undead, Demon, Mutant, or Beast). Your Hits are now +2 Damage vs those Enemies and when gaining XP from them, gain an extra 10 XP.",
                    "name": "Bitter Enemies"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "value": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards",
                    "name": "Danger Magnet"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)",
                    "name": "Distrustful"
                },
                {
                    "value": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit.",
                    "name": "Drifter's Secret"
                },
                {
                    "requires": "Skilled Fighter",
                    "value": "At the start of each turn during a Fight, choose an Enemy on your Map Tile. It immediately takes D3 Wounds.",
                    "name": "Feared by Evil"
                },
                {
                    "multi": true,
                    "value": "At the end of every successful Mission, roll a D6. On the roll of 5+, you gain +1 Health.",
                    "name": "Grizzled by Time"
                },
                {
                    "value": "For ever 6+ you roll To Hit with a Pistol Ranged Attack, you gain +1 Shot with that Gun (max +3 Shots per turn)",
                    "name": "Gunslinger"
                },
                {
                    "multi": true,
                    "value": "+3 Health.",
                    "name": "Health"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Jaded",
                    "value": "All XP you gain while Traveling, in Town, or from Mission Rewards, is doubled. +1 Initiative.",
                    "name": "Infamous"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "You gain the Keyword Outlaw and may roll an extra die for movement each turn, and choose which to use. +2 Max Grit.",
                    "name": "Jaded"
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "requires": "Unimpressed",
                    "value": "Range To Hit 2+",
                    "name": "Long Stare"
                },
                {
                    "value": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit.",
                    "name": "Long Years Experience"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Infamous",
                    "value": "Once per turn, use 1 Grit to add Damage to one of your Hits equal to your current Sanity Damage (max +5). +1 Max Grit.",
                    "name": "Loose Cannon"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "The Hero has no name. Instead, the rest of the posse may decide on a nickname for the Hero. +1 Agility. Start every Adventure with Max Grit.",
                    "name": "No Name"
                },
                {
                    "value": "Any time you draw one or more Loot, Scavenge, Darkness, or Encounter cards, you may draw one extra card, then choose one of those to discard. If used for an Encounter draw, the Hero must be on the Map Tile that the Encounter is drawn for.",
                    "name": "Resourceful"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sage Advice",
                    "value": "At the start of every Fight, you may Heal 3 Wounds / Sanity (any mix) from each other Hero. +1 Max Grit.",
                    "name": "Restraint"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "Each other Hero that Activates before you during the turn may Re-roll one of their dice just rolled, of your choice. +1 Agility.",
                    "name": "Sage Advice"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +2 Sanity.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "requires": "Sneer",
                    "value": "+1 Combat and +1 Agility.",
                    "name": "Skilled Fighter"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bitter Enemies",
                    "value": "You are Immune to Horror Hits caused by Enemies. +1 Max Grit.",
                    "name": "Sneer"
                },
                {
                    "requires": "Loose Cannon",
                    "value": "Use 2 Grit to immediately do D6 Wounds to every adjacent Enemy, ignoring Defense.",
                    "name": "Spinning Guns"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health",
                    "name": "Spirit"
                },
                {
                    "value": "While there are no other Heroes adjacent to you, you are Defense 3+",
                    "name": "Squint"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        },
                        {
                            "affects": "sanity",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain +2 Sanity.",
                    "name": "Strength"
                },
                {
                    "requires": "Weapon of Choice",
                    "value": "Once per Fight, use 3 Grit to immediately Recover a KO'd Hero on your Map Tile. +2 Max Grit.",
                    "name": "True Hero"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Bad Ass",
                    "value": "Any time a Growing Dread card is drawn, roll a D6. On the roll of 4+, cancel it. +1 Max Grit.",
                    "name": "Unimpressed"
                },
                {
                    "requires": "Restraint",
                    "value": "Choose one (Hand Weapon, Pistol, Shotgun, or Rifle). You now add +1 Combat/ +1 Shot to any Weapon you are using with that Keyword.",
                    "name": "Weapon of Choice"
                }
            ]
        },
        {
            "name": "Rancher",
            "abilities": [
                {
                    "desc": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun.",
                    "name": "Rapid Shot"
                },
                {
                    "desc": "You may roll 2 dice for Escape tests and pick the highest roll.",
                    "name": "Evasion"
                }
            ],
            "classId": "3ec81ec0-56da-4e53-b9b6-cb71af815dbf",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 14,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "description": "...",
                    "name": "Hunting Rifle",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 2,
                "Lore": 4,
                "Luck": 1,
                "Spirit": 3,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "requires": "Refinement",
                    "value": "Use 2 Grit to drop a Dark Stone in an adjacent space during your Move. As an Attack, detonate it doing 2D6 Damage to all models in the same and adjacent spaces.",
                    "name": "Dark Stone Trap"
                },
                {
                    "requires": "Sharpshooter",
                    "value": "Your Critical Hits with a Gun are +3 Damage",
                    "name": "Deadly Shot"
                },
                {
                    "value": "You gain +2 Health for each Clothing Item you wear. Clothing Items do not count weight against your Carrying limit.",
                    "name": "Dressed for Adventure"
                },
                {
                    "value": "You may roll 2 dice for Escape tests and pick the highest roll.",
                    "name": "Evasion"
                },
                {
                    "value": "If there are no Enemies adjacent to you, you may Re-roll one missed To Hit roll per turn.",
                    "name": "Farmstead Defender"
                },
                {
                    "requires": "Is That All You've Got?",
                    "value": "Once per Fight, you may add +1 Damage to all your Combat Hits.",
                    "name": "Fisticuffs"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Void Enhancement",
                    "value": "While at the Blacksmith in Town, you may pay $500 less for any Upgrades purchased at the Dark Stone Forge. +1 Strength.",
                    "name": "Forge Works"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "Use 1 Grit to Heal D6 Wounds from yourself or another adjacent Hero (gain 5 XP for every Wound healed from another Hero this way).",
                    "name": "Home Remedies"
                },
                {
                    "requires": "Life Goes On",
                    "value": "Use 2 Grit whie KO'd to Heal D6+2 Wounds/Sanity (any mix) and place your model back on the board.",
                    "name": "I've Seen Worse!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Once per turn, you may Re-roll a single damage roll for one of your Gun Hits.",
                    "name": "Iron Concentration"
                },
                {
                    "modifiers": [
                        {
                            "affects": "willpower",
                            "value": -1
                        }
                    ],
                    "requires": "Ready for Action",
                    "value": "Willpower 3+",
                    "name": "Is That All You've Got?"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Dressed for Adventure",
                    "value": "You are now +1 Initiative for each Mutation you have (max +3). +1 Max Grit.",
                    "name": "Life Goes On"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Iron Concentration",
                    "value": "You get +1 Shot with any 2-Handed Gun.",
                    "name": "Rapid Reload"
                },
                {
                    "value": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun.",
                    "name": "Rapid Shot"
                },
                {
                    "value": "You may now carry twice as many Tokens in your Side Bag",
                    "name": "Ready for Action"
                },
                {
                    "requires": "Forge Works",
                    "value": "You may use 12 Dark Stone to fill an Upgrade Slot on a Gun or Hand Weapon. That Item is now +1 Damage and has 1 Dark Stone.",
                    "name": "Refinement"
                },
                {
                    "requires": "Rapid Reload",
                    "value": "Any time you kill an Enemy with a Gun, you may immediately do D6 Damage to anoter Enemy in one of the three spaces behind it.",
                    "name": "Sharpshooter"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        },
                        {
                            "affects": "defense",
                            "value": -1
                        }
                    ],
                    "requires": "Fisticuffs",
                    "value": "Defense 3+. +1 Max Grit.",
                    "name": "Shrug It Off"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "value": "Use 1 Grit during your Activation to do 1 automatic Combat Hit to every adjacent Enemy. This does not count as your Attack. Use only while equipped with a 2-Handed Gun.",
                    "name": "Swinging Rifle"
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "requires": "I've Seen Worse!",
                    "value": "Melee To Hit 3+",
                    "name": "Up Close and Personal"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may use a Dark Stone to add +D6 Damage to one of your Hits. +1 Max Grit.",
                    "name": "Void Enhancement"
                }
            ]
        },
        {
            "name": "US Marshal",
            "abilities": [
                {
                    "desc": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun",
                    "name": "Double Shot"
                }
            ],
            "classId": "45b3ac67-15f6-4654-bba1-3c73493aa821",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "darkstone": 0,
                    "description": "Range 5; Shots: 1; D8 To Hit and Damage (Crit on 6/7/8)",
                    "hands": 2,
                    "name": "Shotgun",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "description": "1x per adventure, give all heroes choice of +2 combat or +2 shot during next activation",
                    "name": "US Marshal Badge",
                    "source": "Starting Gear",
                    "usage": "Adventure"
                }
            ],
            "keywords": "Law, Traveler",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 4,
                "Lore": 1,
                "Luck": 3,
                "Spirit": 2,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "value": "You gain extra Movement each turn equal to your Lore. +1 Lore.",
                    "name": "A Story to Tell"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Look Out!",
                    "value": "Use 2 Grit to ready your Marshal Badge. Limit once per Adventure. +1 Max Grit.",
                    "name": "Above the Law"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "A Story to Tell",
                    "value": "You may now Recover a Grit on a Move roll of 6 as well as the normal 1.",
                    "name": "Back Up Plan"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Saddle Bags",
                    "value": "Any time you would take 1 or more Sanity Damage, take 1 fewer. +1 Lore.",
                    "name": "Been Around"
                },
                {
                    "value": "Any time you kill an Enemy, you may Heal 1 Wound and 1 Sanity and gain 10 XP.",
                    "name": "Cleaning up the West"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hunter",
                    "value": "Use 2 Grit to cancel a Darkness or Growing Dread card. +1 Max Grit.",
                    "name": "Dead or Alive"
                },
                {
                    "value": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun",
                    "name": "Double Shot"
                },
                {
                    "requires": "Dead or Alive",
                    "value": "Once per turn, use 3 Grit to do one automatic Hit to every Enemy on y our Map Tile. These Hits use the D8 for Damage.",
                    "name": "End of the Line"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You no longer need to target adjacent Enemies first with Ranged Attacks. +1 Max Grit.",
                    "name": "Focus"
                },
                {
                    "value": "Use 1 Grit to Heal 3 Wounds or 3 Sanity from yourself or another Hero on you Map Tile (gain 5 XP for ever Wound/Sanity healed from another Hero this way). You are +2 Sanity.",
                    "name": "Hardened Resolve"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Focus",
                    "value": "At the start of each Adventure, choose a specific Enemy Type. You are +1 Damage against that Enemy and gain $10 for each you kill.",
                    "name": "Hunter"
                },
                {
                    "requires": "No Nonsense",
                    "value": "Once per turn, you may take 1 Corruption Hit to force an Enemy on your Map Tile to Re-roll a single die just rolled",
                    "name": "I Don't Think So!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to transfer all Hits just taken by an adjacent Hero to yourself (before Defense rolls). Gain 10 XP for each Hit transferred.",
                    "name": "Look Out!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "No Shame In It",
                    "value": "Add +1 Shot to any Shotgun you are using. Rolling the same Mutation twice on the chart has no effect on you.",
                    "name": "No Nonsense"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may take 1 Corruption Hit to use a Dark Stone in place of a Grit. +1 Strength.",
                    "name": "No Shame In It"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Whirling Strike",
                    "value": "While you are the only Hero on your Map Tile, you gain +1 Combat or +1 Shot with a Gun. +1 Max Grit.",
                    "name": "One Man Army"
                },
                {
                    "value": "Anytime you kill an Enemy, you may Recover a Grit on the D6 roll of 4, 5, or 6.",
                    "name": "Rolling Thunder"
                },
                {
                    "requires": "Back Up Plan",
                    "value": "You may now carry an extra 3 Tokens in your Side Bag.",
                    "name": "Saddle Bags"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "I Don't Think So!",
                    "value": "Your Hits are +1 Damage for each Mutation you have (max +3). +1 Strength.",
                    "name": "That Does It!"
                },
                {
                    "multi": true,
                    "value": "Choose a specific Enemy Type. From now on, any time you collect XP from that Enemy Type, collect an addition +10 XP.",
                    "name": "Vendetta"
                },
                {
                    "requires": "Above the Law",
                    "value": "Use 2 Grit as an Attack to roll your full Combat against every adjacent Enemy.",
                    "name": "Whirling Strike"
                }
            ]
        },
        {
            "name": "Jargono Native",
            "abilities": [
                {
                    "desc": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono.",
                    "name": "Other World Native (Jargono)"
                },
                {
                    "desc": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack",
                    "name": "Hunter's Reflexes"
                },
                {
                    "desc": "You may not use Guns, Books, or Tech items",
                    "name": "Primitive"
                }
            ],
            "classId": "48bdac8c-01a4-4284-ba73-775a79dda210",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 11,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "darkstone": 1,
                    "description": "Crit on combat rolls of 5 or 6",
                    "hands": 1,
                    "source": "Jargono",
                    "weight": 1
                },
                {
                    "description": "...",
                    "name": "Tribal Shield",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Other World (Jargono), Tribal",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 11
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 2,
                "Lore": 1,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Tribal Warrior",
                    "value": "Whenever you kill a Large or bigger Enemy, you may move the Darkness back one space on the Depth Track (does not trigger special spaces moved back through). +1 Spirit.",
                    "name": "Ancestor's Favor"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Whenever one or more Enemy groups are placed in Ambush, Recover 1 Grit. +1 Strength.",
                    "name": "Battle Stance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": 2
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Quick Shot",
                    "value": "You may double the Endurance value of any Enemy while Attacking it. +1 Strength.",
                    "name": "Deep Cuts"
                },
                {
                    "value": "Once per Adventure, use 1 Grit to switch Attack (or Ambush) on an Exploration Token into 2x Encounters instead. The rest of the Token remains the same.",
                    "name": "Enemy Tracks"
                },
                {
                    "multi": true,
                    "value": "Choose a specific Enemy Type. From now on you take 1 less Damage from any Attack made by an Enemy of that Type (minimum 1).",
                    "name": "Fighting Style"
                },
                {
                    "requires": "Stealth Strike",
                    "value": "You gain 1 Swamp Fungus Side Bag Token at the start of each Adventure.",
                    "name": "Fungus Grower"
                },
                {
                    "requires": "Mighty Swing",
                    "value": "Once per Fight, use 2 Grit to make an extra Attack this Activation. +2 Max Grit.",
                    "name": "Fury of Jargono"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "melee",
                            "value": -1
                        }
                    ],
                    "requires": "Shield Charge",
                    "value": "Melee To Hit 3+",
                    "name": "Honored Champion"
                },
                {
                    "value": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack",
                    "name": "Hunter's Reflexes"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Once per Fight, you may spend un-used movement points from your Move to add Damge to one of your Combat Hits. Ever 2 Move = +1 Damage.",
                    "name": "Jumping Attack"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain D6 Health/Sanity (any mix).",
                    "name": "Lore (Health or Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore (Health)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "requires": "Deep Cuts",
                    "value": "You gain +2 Combat and +2 Shots with any Bow you are using, while there are one or more Extra Large (or bigger) Enemies on the board.",
                    "name": "Master of the Hunt"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": 1
                        },
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "requires": "Spinning Slash",
                    "value": "+1 Combat and +1 Strength.",
                    "name": "Mighty Swing"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono.",
                    "name": "Other World Native (Jargono)"
                },
                {
                    "value": "If you start your Activation adjacent to one or more Enemies, Recover a Grit on the D6 roll of 5+. Also, once per turn, while you have a Shield equipped, you may force one Enemy Hit just rolled against you to be Re-rolled.",
                    "name": "Pit Fighter"
                },
                {
                    "value": "You may not use Guns, Books, or Tech items",
                    "name": "Primitive"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Enemy Tracks",
                    "value": "You may add +1 Shot to any Bow you are using. +1 Initiative and +1 Agility.",
                    "name": "Quick Shot"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "value": "You are +1 Move and may move through other models. You are also immune to Poison markers. Extra Starting Gear: Dark Stone Daggers (replaces Tribal Shield and Dark Stone Blade)",
                    "name": "Serpent Slayer"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Battle Stance",
                    "value": "While you have a Shield equipped, you are +1 Combat. +1 Max Grit.",
                    "name": "Shield Bash"
                },
                {
                    "requires": "Shield Bash",
                    "value": "Use 1 Grit, while you have  Shield equipped, to move through other models this turn. Each model moved through takes 2 Wounds, ignoring Defense (limit once per model).",
                    "name": "Shield Charge"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Jumping Attack",
                    "value": "While you have a 2-Handed Item Hand Weapon equipped, you are +1 Damage with Combat Hits. +1 Initiative.",
                    "name": "Spinning Slash"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "Your Critical Hits are +1 Damage and you are +1 to all Escape rolls. +1 Agility.",
                    "name": "Stealth Strike"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": 1
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "ranged",
                            "value": -1
                        }
                    ],
                    "value": "Ranged To Hit: 4+.  Double-shot (Bow) - Once per turn, when you kill an enemy with a Bow, you gain +1 Shot with that Bow. Extra Starting Gear: Jargono Bow (replaces Tribal Shield)",
                    "name": "Treetop Hunter"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Fungus Grower",
                    "value": "You are +2 Health for each Tribal Item you have (max +10). +1 Strength.",
                    "name": "Tribal Warrior"
                }
            ]
        },
        {
            "name": "Indian Scout",
            "abilities": [
                {
                    "desc": "+1 Move",
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Fast"
                },
                {
                    "desc": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed.",
                    "name": "Tracker"
                }
            ],
            "classId": "651350a6-d930-4372-9bce-1d200149362a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 10,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "description": "...",
                    "name": "Carbine",
                    "source": "Starting Gear"
                },
                {
                    "description": "+1 Damage. Upgrade: Mark of the Void.",
                    "name": "Indian Hatchet",
                    "slots": 2,
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Scout, Tribal",
            "level": 1,
            "melee": 4,
            "movement": 1,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 3,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        },
                        {
                            "affects": "sanity",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain 2 Health and +2 Sanity.",
                    "name": "Agility"
                },
                {
                    "value": "Once per Adventure, give all other Heroes +2 Initiative unti the end of the turn. You may Recover 1 Grit.",
                    "name": "Battle Scout"
                },
                {
                    "value": "You may roll 2 dice for Move each turn and choose which to use.",
                    "name": "Cavalry Scout"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Guardian Spirit",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself or an adjacent Hero. +1 Max Grit.",
                    "name": "Cleansing Ritual"
                },
                {
                    "requires": "Warrior's Heart",
                    "value": "Once per Adventure, you may Heal Sanity Damage equal to the number of Enemies you have killed during this Mission. This may be Healed from any mix of Heroes.",
                    "name": "Counting Trophies"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        },
                        {
                            "affects": "sanity",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +2 Health and +2 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Moves in the Shadows",
                    "value": "Use 2 Grit to ignore all damage just done to you by a single source. +1 Max Grit.",
                    "name": "Duck and Roll"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Know Your Prey",
                    "value": "When you successfully Scavenge, you may draw one extra card, then choose one to discard. +1 Cunning.",
                    "name": "Eye for Detail"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Move",
                    "name": "Fast"
                },
                {
                    "requires": "Voices of the Ancestors",
                    "value": "Once per Adventure, you may cancel a Growing Dread or Darkness card on the D6 roll of 3+.",
                    "name": "Guardian Spirit"
                },
                {
                    "multi": true,
                    "value": "+3 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "Once per turn you may Re-roll a single To Hit roll or Defense roll.",
                    "name": "Heightened Senses"
                },
                {
                    "requires": "Eye for Detail",
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Threat card just drawn. Gain 25 XP.",
                    "name": "I Smell Death Here!"
                },
                {
                    "requires": "This Way",
                    "value": "Once per turn, you may Re-roll a Damage roll for one of your Hits.",
                    "name": "Know Your Prey"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +2 Health and +2 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +2 Health and +2 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Pass Through",
                    "value": "You are now Defense 3+ during the first turn of the Fight.",
                    "name": "Moves in the Shadows"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "You may now roll 2 dice for Escape tests and choose which roll to use. +1 Agility.",
                    "name": "Pass Through"
                },
                {
                    "value": "Use 1 Grit to gain +2 Combat until the end of your turn (Limit once per turn).",
                    "name": "Savage Attack"
                },
                {
                    "requires": "Duck and Roll",
                    "value": "Once per Adventure, transfer 2D6 Wounds from yourself to an adjacent Enemy, ignoring Defense.",
                    "name": "Shadow Strike"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +2 Health and +2 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain 2 Health and +2 Sanity.",
                    "name": "Strength"
                },
                {
                    "value": "Once per turn, use 1 Grit to discard and re-draw a Map card just drawn.",
                    "name": "This Way"
                },
                {
                    "value": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed.",
                    "name": "Tracker"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "requires": "Cleansing Ritual",
                    "value": "Once per Fight, use 2 Grit to do one automatic Hit to ever Enemy on your Map Tile. Heal 1 Sanity Damage for each Hit done.",
                    "name": "Vengeful Spirits"
                },
                {
                    "value": "You may take 4 Sanity Damage, ignoring Willpower to Recover a Grit",
                    "name": "Voices of the Ancestors"
                },
                {
                    "requires": "Warrior's Spirit",
                    "value": "Spirit Armor 5+",
                    "name": "Warrior's Heart"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Battle Scout",
                    "value": "You may now Activate before Enemies at your Initiative level. +1 Spirit.",
                    "name": "Warrior's Spirit"
                }
            ]
        },
        {
            "name": "Frontier Doc",
            "abilities": [
                {
                    "desc": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)",
                    "name": "Medical Training"
                },
                {
                    "desc": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight.",
                    "name": "Field Surgery"
                }
            ],
            "classId": "6bc4fc3a-4af5-4cf9-b6ad-8615501aca26",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "description": "...",
                    "name": "Doc's Bag",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier, Medical",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 4,
                "Lore": 3,
                "Luck": 1,
                "Spirit": 2,
                "Strength": 2
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Careful Study",
                    "value": "You get Critical Hits on To Hit rolls of 5+ against Enemy Types you have encountered before. +1 Lore.",
                    "name": "Anatomy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "value": "Use 1 Grit to let every Hero on your Map Tile choose: Discard all Poison Markers or Discard 1 Corruption Point on D6 roll of 4+. +1 Lore.",
                    "name": "Antidote"
                },
                {
                    "value": "You may move through other models during your movement and you automatically pass all Escape tests. At the start of every Fight, Recover 1 Grit",
                    "name": "Battlefield Experience"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Dissection",
                    "value": "You are +1 on Defense rolls against HIts from your Enemy Types you have encountered before. +1 Agility.",
                    "name": "Careful Study"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Ingenuity",
                    "value": "Use 1 Grit and discard any 2 different Side Bag Tokens to create a dynamite token. +1 Max Grit.",
                    "name": "Chemistry"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        },
                        {
                            "affects": "defense",
                            "value": "4"
                        }
                    ],
                    "requires": "Anatomy",
                    "value": "+1 Cunning and +1 Initiative and Defense 4+.",
                    "name": "Conclusions"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "requires": "Treatment",
                    "value": "You are immune to the Enemy abilities Fear and Terror. +1 Combat.",
                    "name": "Dispassionate"
                },
                {
                    "value": "Once per turn, when you kill an Enemy with a Combat Hit, Recover a Grit on the D6 roll of 4+. +3 Sanity.",
                    "name": "Dissection"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "requires": "Hold Them Down",
                    "value": "There is no longer a penalty for a 1 result when using Field Surgery. +1 Luck.",
                    "name": "Do No Harm"
                },
                {
                    "multi": true,
                    "value": "Choose another Hero class. From now on, any time you Heal Wounds from a Hero of that Class, Heal an extra +1 Wound and +1 Sanity Damage from them.",
                    "name": "Doc's Speciality"
                },
                {
                    "value": "When using your Field Surgery ability, the Injury/Mutation is Healed on the D6 roll of 4+ now. Extra Starting Gear: Surgeon's Saw.",
                    "name": "Expert Surgeon"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Do No Harm",
                    "value": "While in an Other World, you roll 1 extr die on all Skill tests and, at the start of your Acctivation each turn, you Recover a Grit on the D6 roll of 4+. +1 Max Grit.",
                    "name": "Explorer"
                },
                {
                    "multi": true,
                    "value": "Choose an Other World. From now on, any time you collect XP in that world, collect an extra +5 XP.",
                    "name": "Explorer's Notes"
                },
                {
                    "value": "The first time you encounter a new specific Enemy Type, gain 50 XP (variations count as a new type). Your Attacks are +1 Damage against all Enemy Types you have ever encountered in previous Fights. Extra Starting Gear: Collection Jar.",
                    "name": "Field Research"
                },
                {
                    "value": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight.",
                    "name": "Field Surgery"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Tinkerer",
                    "value": "Once per Fight, you may add a number of Damage to one of your Hits equal to the number of Tech Items you currently carry (max +10). +1 Cunning.",
                    "name": "Gadgeteer"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Dispassionate",
                    "value": "You automatically Heal 2 Wounds at the start of every turn. You may also use Field Surgery on yourself now. +1 Strength.",
                    "name": "Heal Thy Self"
                },
                {
                    "multi": true,
                    "value": "+2D6 Health/Sanity (any mix).",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Antidote",
                    "value": "+1 Combat and +1 Strength.",
                    "name": "Hold Them Down"
                },
                {
                    "value": "Once per turn, when you use the effect of a Side Bag Token, you may use 1 Grit to roll a D6. On the roll of 4+, do not discard the Side Bag Token.",
                    "name": "Ingenuity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)",
                    "name": "Medical Training"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move. Also gain +D8 Sanity.",
                    "name": "Move"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D8 Health.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength.",
                    "name": "Strength"
                },
                {
                    "requires": "Chemistry",
                    "value": "Use 2 Grit to add the following UPgrade to an Item you are carrying: Gadget (1 Upgrade Slot). The Item gains the Keyword Tech and grants +1 Health (or +1 Damage if a Hand Weapon or Gun).",
                    "name": "Tinkerer"
                },
                {
                    "requires": "Triage",
                    "value": "You now gain 10 XP for each Wound Healed from another Hero. Also once per turn, you may remove 1 status effect marker from yourself or an adjacent Hero.",
                    "name": "Treatment"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Whenever you Heal Wounds from another Hero, Reocver a Grit on the D6 roll of 4+. +1 Max Grit.",
                    "name": "Triage"
                }
            ]
        },
        {
            "name": "Prospector",
            "abilities": [
                {
                    "desc": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls",
                    "name": "Death Blow"
                },
                {
                    "desc": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected.",
                    "name": "Expert Miner"
                },
                {
                    "desc": "May not use Guns or Tech items",
                    "name": "Crotchety"
                }
            ],
            "classId": "6d198a74-1b2a-4f60-bf51-2c1e2d0ec2e1",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 16,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "cost": 650,
                    "description": "Melee Attacks D8 and Crit on 6,7,8  +1 Damage",
                    "hands": 2,
                    "name": "Heavy Pick Axe",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "cost": 350,
                    "description": "Once per Adventure Heal 2d8 Wounds or 2d6 Sanity",
                    "name": "Miner's Canteen",
                    "source": "Starting Gear",
                    "usage": "Adventure",
                    "weight": 1
                }
            ],
            "keywords": "Frontier, Law",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 14
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 1,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 3,
                "Spirit": 2,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 5,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility.  Also gain +D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "It's Mine!",
                    "value": "While carrying 4 or more weight worth of Items, you are Defense 3+.",
                    "name": "All Mine!"
                },
                {
                    "value": "Start every Adventure with 1 free Dynamite Token in your sidebag. You also gain: Free Attack (once per Fight) - Throw Dynamite",
                    "name": "Blast Miner"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Impressive Facial Hair",
                    "value": "While at half or less Sanity, your Attacks are +1 Damage. +1 Max Grit.",
                    "name": "Crazed"
                },
                {
                    "value": "May not use Guns or Tech items",
                    "name": "Crotchety"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Gold Fever",
                    "value": "Your Attacks are +1 Damage for every Mutation you have (max +3). +1 Max Grit.",
                    "name": "Dark Stone Life"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls",
                    "name": "Death Blow"
                },
                {
                    "value": "You may Scavenge a Map Tile even if it already has a Scavenged marker on it (Limit one extra Scavenge per Map Tile). Roll one extra die when Scavenging.",
                    "name": "Eagle Eye"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "You may now Scavenge End Caps as though they were full Map Tiles (not including Gates). +1 Move.",
                    "name": "Every Rock"
                },
                {
                    "value": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected.",
                    "name": "Expert Miner"
                },
                {
                    "requires": "Crazed",
                    "value": "During an Adventure, once per turn, when collecting Gold, you may Recover 1 Grit.",
                    "name": "Gold Fever"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "After any Hero in the Posse collects Gold from a Loot or Scavenge card, they may collect an extra $25. +1 Max Grit.",
                    "name": "Good Find!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Wheeler Dealer",
                    "value": "When drawing Loot cards, you may spend 1 Grit to discard and Re-draw any number of them. +1 Max Grit.",
                    "name": "Greedy"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Staking Claims",
                    "value": "+1 Combat and +1 Agility",
                    "name": "Hearty Swing"
                },
                {
                    "value": "Once per adventure, you may tug at your facial hair to Recover Grit up to your Max Grit",
                    "name": "Impressive Facial Hair"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Greedy",
                    "value": "You gain the Keyword Outlaw and may now use Shotgun Ranged Weapons. +1 Initiative.",
                    "name": "It's Mine!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "requires": "Every Rock",
                    "value": "When using your Expert Miner ability, you may make a Luck 6+ test. If passed, Triple the amount collected. +1 Luck",
                    "name": "Lucky Bugger"
                },
                {
                    "requires": "Squint Eye",
                    "value": "After Scavenging, you may spend 1 Grit to set aside a Scavenge card drawn. That card is removed from the deck until the end of the Adventure (Limit 4 cards).",
                    "name": "Master Scavenger"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Miner's Vendetta"
                },
                {
                    "requires": "Hearty Swing",
                    "value": "Once per turn, while holding the Lantern, you may spend 1 Grit to Re-roll one of the dice for the Hold Back the Darkness roll.",
                    "name": "Mining Guide"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity. Also gain +D6 Health",
                    "name": "Side Bag Capacity"
                },
                {
                    "value": "Once per turn, use 1 Grit to double your Initiative and Move, as well as allowing you to automatically pass all Escape tests. Also your Combat Hits are +1 Damage until the end of that turn.",
                    "name": "Speed of Greed"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Lucky Bugger",
                    "value": "Once per turn after drawing a Gear or Artifact card, you may discard it and Re-draw. +1 Max Grit.",
                    "name": "Squint Eye"
                },
                {
                    "requires": "Good Find!",
                    "value": "Once per Adventure, you may cancel and Re-draw an Exploration Token. When selling Gear or Artifact cards in Town, gain an extra D6 x $50",
                    "name": "Staking Claims"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength and +1 Luck. Also gain D6 Sanity.",
                    "name": "Strength and Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "value": "You may buy Side Bag Tokens in town for half price (round up to nearest $5). +1 Initiative.",
                    "name": "Wheeler Dealer"
                }
            ]
        },
        {
            "name": "Law Man",
            "abilities": [
                {
                    "desc": "Once per Attack, you may Re-roll one To Hit roll.",
                    "name": "Laying Down the Law"
                }
            ],
            "classId": "7309fd50-b111-4d16-8a89-c500807b3472",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "cost": "250",
                    "description": "Range 6; Shots 3",
                    "hands": 1,
                    "name": "Peacekeeper Pistol",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                },
                {
                    "description": "Once per Adventure, give all Heroes +2 Shots with a Gun or +2 Combat (they choose) during their next Activation",
                    "name": "Sheriff Badge",
                    "source": "Starting Gear"
                }
            ],
            "keywords": "Frontier, Law",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 12
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 4,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 1,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "requires": "Teamwork",
                    "value": "Any time you roll a 1 for Move, all Heroes on your Map Tile may Recover 1 Grit. Gain 15 XP for each Grit Recovered.",
                    "name": "Battle Plan"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You may now Activate before Enemies at your Initiative Level. +1 Max Grit.",
                    "name": "Cold Stare"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "requires": "Relentless",
                    "value": "When using Laying Down the Law, you may re-roll any number of To Hit rolls.",
                    "name": "Cool Head"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "You do +2 Damage on any Hits to an Enemy with a higher Initiative. +1 Max Grit.",
                    "name": "Fair Warning"
                },
                {
                    "value": "Use 1 Grit to add +3 Damage to one of your Hits (limit once per Hit).",
                    "name": "Frontier Justice"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to cancel a Darkness card on the D6 roll of 4, 5, or 6 (limit once per turn).",
                    "name": "Iron Will"
                },
                {
                    "requires": "Learning to Live With It",
                    "value": "Use 1 Grit to make all of your Attacks get Critical Hits on rolls of 5 or 6 until the end of your turn.",
                    "name": "Judge, Jury, and Executioner"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Cool Head",
                    "value": "+1 Initiative and +1 Max Grit",
                    "name": "Justice Never Sleeps"
                },
                {
                    "value": "Once per Attack, you may Re-roll one To Hit roll.",
                    "name": "Laying Down the Law"
                },
                {
                    "requires": "Long Arm of the Law",
                    "value": "Any time you kill an Enemy, Heal 2 Sanity Damage.",
                    "name": "Learning to Live With It"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "requires": "Fair Warning",
                    "value": "+1 Combat and +1 Strength and +1 Max Grit.",
                    "name": "Long Arm of the Law"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Luck"
                },
                {
                    "value": "You may roll 2 dice for Move each turn and choose which to use.",
                    "name": "Man of Action"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Use 1 Grit to give all other Heroes +1 Initiative and +1 Move until the end of the turn. Gain 30 XP.",
                    "name": "Motivate"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "requires": "Temper",
                    "value": "While KO'd, at the start of each turn, roll a D6. On the roll of 5 or 6, Heal D6 Wounds/Sanity (any mix) and place your model back on the board.",
                    "name": "Never Gives Up"
                },
                {
                    "requires": "Motivate",
                    "value": "Once per turn, use 1 Grit to prevent D6 Wounds or Sanity Damage that another Hero would take. Gain 10 XP",
                    "name": "Reassure"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "requires": "Cold Stare",
                    "value": "+1 Cunning and +1 Initiative",
                    "name": "Relentless"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)",
                    "name": "Spirit"
                },
                {
                    "requires": "Man of Action",
                    "value": "At the start of a turn, you may reduce your Initiative to 1. If you do, you are Defense 3+ this turn.",
                    "name": "Standing Your Ground"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "value": "Use 1 Grit to Heal 1 Health and 1 Sanity from yourself and every other Hero on your Map Tile - Gain 5 XP for every Wound/Sanity healed from another Hero this way.",
                    "name": "Strong Leadership"
                },
                {
                    "requires": "Reassure",
                    "value": "Use 2 Grit to add your Skill value to another Hero's Skill for a single test. If the test is successful, gain 25 XP.",
                    "name": "Teamwork"
                },
                {
                    "requires": "Standing Your Ground",
                    "value": "Once per turn, use 2 Grit to add +1P Damage to one of your Hits or +2P Damage if you are at less than half Health.",
                    "name": "Temper"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                }
            ]
        },
        {
            "name": "Orphan",
            "abilities": [
                {
                    "desc": "Starts with an Orphan Mission",
                    "name": "On a Mission"
                },
                {
                    "desc": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests",
                    "name": "Quick"
                },
                {
                    "desc": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn",
                    "name": "Young"
                }
            ],
            "classId": "7c791b38-c539-4964-890c-db925782933a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 8,
                "wounds": 0
            },
            "init": 4,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Showman, Frontier",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 4,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 2,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Sanity.",
                    "name": "Agility"
                },
                {
                    "requires": "Something to Prove",
                    "value": "Choose one of the Starting Upgrades of your Secondary Hero Class to acquire. This includes any Gear that goes with it.",
                    "name": "All In"
                },
                {
                    "requires": "Lash Out",
                    "value": "Once per turn, when you kill an Enemy, you may Heal D6 Wounds. +5 Health.",
                    "name": "Bloodlust"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Sanity.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "requires": "Hide",
                    "value": "Once per turn, use 1 Grit to ignore a single Enemy Hit against you (before you roll for Defense).",
                    "name": "Dodge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "When rolling for Discovery on your Orphan Mission, you may roll 1 extra die, then choose one die to discard. +1 Max Grit.",
                    "name": "Grown Up Fast"
                },
                {
                    "multi": true,
                    "value": "You are now +1 Damage on your To Hit rolls of 6+.",
                    "name": "Hardened by the World"
                },
                {
                    "multi": true,
                    "value": "+D6 Health.",
                    "name": "Health"
                },
                {
                    "multi": true,
                    "value": "+2 Health and +2 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Small Target",
                    "value": "Once per Fight, if there are no Enemies adjacent to you, you may Recover 1 Grit.",
                    "name": "Hide"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        },
                        {
                            "affects": "Strength",
                            "value": "1"
                        },
                        {
                            "affects": "health",
                            "value": "2"
                        }
                    ],
                    "value": "+1 Combat and +1 Strength and +2 Health.",
                    "name": "Hot Temper"
                },
                {
                    "requires": "Over Your Head",
                    "value": "Once per turn, use 1 Grit to force any single die to be Re-rolled, even if it has already been Re-rolled.",
                    "name": "I Can Handle It Myself!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Grown Up Fast",
                    "value": "Once per turn, you may take D3 Corruption Hits to Recover a Grit. May also be used once per Town Stay. +1 Max Grit.",
                    "name": "I'm Not a Kid"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "requires": "Toe-to-Toe",
                    "value": "Use 2 Grit to add 1P Damage to one of your Hits. +1 Strength.",
                    "name": "Lash Out"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Start each Adventure with a Revive Token only usable by your Hero",
                    "name": "Need for Vengeance"
                },
                {
                    "value": "Starts with an Orphan Mission",
                    "name": "On a Mission"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sprint",
                    "value": "While there ar eno other Heroes on your Map Tile, you are Defense 3+. +1 Max Grit.",
                    "name": "Over Your Head"
                },
                {
                    "value": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests",
                    "name": "Quick"
                },
                {
                    "value": "Once per Fight, use 1 Grit to gain: A) +1 Combat and all of your Combat Hits are +1 Damage for one Attack or B) +1 Shot with a Gun for one Attack.",
                    "name": "Rage"
                },
                {
                    "value": "Gain 5 XP x your Hero Level any time you Look Through a Doorway. +2 Move.",
                    "name": "Running Ahead"
                },
                {
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "value": "Once per turn, you may Re-roll a single Defense roll.",
                    "name": "Small Target"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Dodge",
                    "value": "While there is only one Enemy adjacent to you, your attacks are +2 Damage against that Enemy. +1 Cunning.",
                    "name": "Sneak Attack"
                },
                {
                    "requires": "I'm Not a Kid",
                    "value": "Any time you kill and Enemy, gain +10 XP (or +50 XP if Large or bigger). +3 Health.",
                    "name": "Something to Prove"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "requires": "Running Ahead",
                    "value": "You may now roll the D8 for Move each turn and Recover a Grit on the roll of 1 or 8.",
                    "name": "Sprint"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain +D6 Sanity.",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Hot Temper",
                    "value": "While adjacent to a Large or bigger Enemy, your attacks are +1 Damage to that Enemy (or +2 on a Critical Hit). +1 Max Grit.",
                    "name": "Toe-to-Toe"
                },
                {
                    "value": "Armor 6+. You may move through other models during your movement.",
                    "name": "Wiley"
                },
                {
                    "value": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn",
                    "name": "Young"
                }
            ]
        },
        {
            "name": "Saloon Girl",
            "abilities": [
                {
                    "desc": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)",
                    "name": "Comforting Presence"
                },
                {
                    "desc": "+1 Move",
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": 1
                        }
                    ],
                    "name": "Fast"
                },
                {
                    "desc": "May only use Guns that have the keyword Light",
                    "name": "Lightweight"
                }
            ],
            "classId": "7fa50e95-f33d-43a8-b93b-501a7b3f3a3a",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 3,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 8,
                "wounds": 0
            },
            "init": 5,
            "items": [
                {
                    "description": "Free Attack 1x Fight; Range 3, Shots, Crit 5/6",
                    "name": "Hold-out Pistol",
                    "slots": 1,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Performer",
            "level": 1,
            "melee": 4,
            "movement": 1,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 14
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 4,
                "Cunning": 3,
                "Lore": 2,
                "Luck": 3,
                "Spirit": 3,
                "Strength": 1
            },
            "wealth": 0,
            "willpower": 4,
            "xp": 0,
            "upgrades": [
                {
                    "value": "You may move through other models during your movement. Once per turn you may Re-roll one failed Defense roll.",
                    "name": "Acrobatic Dodge"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "value": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)",
                    "name": "Comforting Presence"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "modifiers": [
                        {
                            "affects": "corruption",
                            "value": "2"
                        }
                    ],
                    "multi": true,
                    "value": "You can now hold 2 more Corruption Points before gaining a Mutation.",
                    "name": "Dark Stone Resistance"
                },
                {
                    "value": "All of your Attacks are +1 Damage",
                    "name": "Dirty Fightin'"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Move",
                    "name": "Fast"
                },
                {
                    "requires": "Slip By",
                    "value": "Free Attack: Once per Fight, use during your Move. Do 1 Hit each to up to 3 Enemies adjacent to you.",
                    "name": "Fast as Lightning"
                },
                {
                    "value": "You now gain an extra +5 XP per Wound/Sanity that you Heal from another Hero. +3 Sanity.",
                    "name": "Gentle Manner"
                },
                {
                    "multi": true,
                    "value": "+3 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "requires": "Witty Retort",
                    "value": "You may carry up to 3 extra Side Bag Tokens. +1 Cunning.",
                    "name": "Hidden Pouch"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Never a Dull Moment",
                    "value": "Use 1 Grit to ignore an Enemy's Defense for one of your Hits. No effect on Tough Enemies. +1 Max Grit.",
                    "name": "Hit 'Em Where It Hurts"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Parry",
                    "value": "Once per Adventure, prevent all Damage you would take from a single source. +1 Lore.",
                    "name": "I Can Take Care of Myself!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "value": "Use 1 Grit to double the amount just rolled on one of your Damage rolls (Limit once per Hit).",
                    "name": "Knockout Punch"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        },
                        {
                            "affects": "init",
                            "value": "1"
                        },
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "requires": "Sleight of Hand",
                    "value": "+1 Initiative and +1 Agility and +1 Move.",
                    "name": "Light on Your Feet"
                },
                {
                    "value": "May only use Guns that have the keyword Light",
                    "name": "Lightweight"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore (Health)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore (Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck (Sanity)"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Rough and Tumble",
                    "value": "Any time you roll a No Event result on a Town Location Chart, gain 25 XP and D6 x $10. +1 Lore.",
                    "name": "Never a Dull Moment"
                },
                {
                    "requires": "Spinning Kick",
                    "value": "Any time an adjacent Enemy rolls a 1 To Hit you, do 1 Wound to it, ignoring Defense.",
                    "name": "Parry"
                },
                {
                    "requires": "I Can Take Care of Myself!",
                    "value": "Any time you kill an Enemy with a Combat Hit, you gain +1 Combat for that Attack.",
                    "name": "Rapid Strike"
                },
                {
                    "requires": "Spunky",
                    "value": "You may now use any 1-Handed Gun. +3 Health.",
                    "name": "Rough and Tumble"
                },
                {
                    "value": "Use 1 Grit to Ready a Once Per Fight Item you are carrying. You may also roll an extra die for Scavenging.",
                    "name": "Sleight of Hand"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "requires": "Light on Your Feet",
                    "value": "You automatically succeed at all Escape tests. +1 Agility.",
                    "name": "Slip By"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "Use 1 Grit to do 2 Wounds to an adjacent Enemy, ignoring Defense. You may move them up to 2 spaces (unless Large). +1 Strength.",
                    "name": "Spinning Kick"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit.",
                    "name": "Spunky"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "requires": "Hidden Pouch",
                    "value": "Melee To Hit 3+",
                    "name": "What You Least Expect"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Gentle Manner",
                    "value": "Once per turn when you kill an Enemy you may Heal 2 Wounds. +1 Max Grit.",
                    "name": "Witty Retort"
                }
            ]
        },
        {
            "name": "Bandido",
            "abilities": [
                {
                    "desc": "You may Recover a Grit on a Move roll of 1 or 2",
                    "name": "Wild Card"
                }
            ],
            "classId": "c2c8ed0b-4104-44a2-9bfc-b403a7b70615",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 4,
            "faith": 0,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 16,
                "wounds": 0
            },
            "init": 3,
            "items": [
                {
                    "cost": 100,
                    "description": "Range 6, Shots 2",
                    "hands": 1,
                    "keywords": "Gear, Gun, Pistol",
                    "name": "Pistol",
                    "slots": 2,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Outlaw",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 8
            },
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 2,
                "Cunning": 1,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 3,
                "Strength": 4
            },
            "wealth": 0,
            "willpower": 5,
            "xp": 0,
            "upgrades": [
                {
                    "requires": "Infamy",
                    "value": "Ranged To Hit 4+",
                    "name": "Accuracy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Agility. Also gain D6 Health.",
                    "name": "Agility"
                },
                {
                    "value": "Once per turn, use 1 Grit to gain +1 Shot with each 1-Handed Gun you fire this turn.",
                    "name": "Barrage"
                },
                {
                    "requires": "Swingin' Fists",
                    "value": "At the start of your Activation, you may choose an Enemy that is not adjacent. You are +2 Damage on all Combat Hits to that Enemy this turn.",
                    "name": "Charge"
                },
                {
                    "requires": "Dark Stone Dynamite",
                    "value": "Once per Fight, when you get a Critical Hit on a Melee Attack, you may discard a Dynamite Token to add 2D6 Damage to the Hit.",
                    "name": "Chew on This!"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Combat",
                    "name": "Combat"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Cunning",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Cunning. Also gain +D6 Health.",
                    "name": "Cunning"
                },
                {
                    "multi": true,
                    "value": "When holding up the Outpost Bank in Town, you now steal +$50 for every 5+ rolled.",
                    "name": "Cunning Plan"
                },
                {
                    "requires": "Destruction Artist",
                    "value": "Once per turn, Use 1 Dark Stone when Throwing a Dynamite Token to add +2 Damage to each model Hit.",
                    "name": "Dark Stone Dynamite"
                },
                {
                    "requires": "Rage",
                    "value": "Your Melee Attacks get Critical Hits on rolls of 5 or 6 now.",
                    "name": "Deadly"
                },
                {
                    "requires": "Strong Arm",
                    "value": "Any Explosives you Throw Bounce 1 fewer times than whatever is rolled",
                    "name": "Destruction Artist"
                },
                {
                    "value": "Use 2 Grit to gain a Dynamite Token. Extra Starting Gear: Dynamite Satchel and 2 Dynamite Tokens",
                    "name": "Explosives Expert"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +3 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "requires": "Steel Nerves",
                    "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6 x $25 less for a single Item/Service",
                    "name": "Infamy"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Sanity.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "requires": "Twitch",
                    "value": "You gain double the XP listed on all Loot and Scavenge cards. +1 Spirit.",
                    "name": "Lovable Scoundrel"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Luck",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Luck. Also gain +D6 Sanity.",
                    "name": "Luck"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Charge",
                    "value": "Once per turn, use 3 Grit to gain +4 Combat for one Attack. +1 Max Grit.",
                    "name": "Rage"
                },
                {
                    "multi": true,
                    "value": "+2 Side Bag Token Capacity.",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit.",
                    "name": "Sinister Laugh"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Barrage",
                    "value": "Once per turn, you may Re-roll a single failed Willpower save. +1 Max Grit.",
                    "name": "Steel Nerves"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "value": "You may double your Range for Throwing Explosives. +1 Strength.",
                    "name": "Strong Arm"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "value": "Anytime you draw a Loot card, you may discard it and draw a new one. You must keep the second card drawn. You are also +1 Combat.",
                    "name": "Swindler"
                },
                {
                    "value": "Instead of a normal Melee Attack, use 1 Grit to do a 3 Combat Melee Attack to every adjacent Model.",
                    "name": "Swingin' Fists"
                },
                {
                    "value": "You may fire two 1-Handed Guns per turn with no penalty for the off-hand Gun. Extra Starting Gear: Pistol",
                    "name": "Twin Guns"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Sinister Laugh",
                    "value": "Once per Adventure, gain +4 Initiative until the end of the turn. +1 Max Grit.",
                    "name": "Twitch"
                },
                {
                    "multi": true,
                    "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP",
                    "name": "Vendetta"
                },
                {
                    "value": "You may Recover a Grit on a Move roll of 1 or 2",
                    "name": "Wild Card"
                },
                {
                    "requires": "Lovable Scoundrel",
                    "value": "At the start of each turn, Heal 1 Wound on the D6 roll of 4+. If KO'd, instead you may Recover on the D6 roll of 4+ (you must still roll for Injury/Madness)",
                    "name": "Won't Stay Dead"
                }
            ]
        },
        {
            "name": "Preacher",
            "abilities": [
                {
                    "desc": "You may not use Guns. Starts with 1 Blessing and 1 Judgement.",
                    "name": "Holy Man"
                },
                {
                    "desc": "You are +1 Damage on all Attacks against Undead Enemies",
                    "name": "Scourge of the Dead"
                }
            ],
            "classId": "fa565014-f32b-46b4-9621-f2936d079b35",
            "combat": 2,
            "corruption": {
                "current": 0,
                "max": 5
            },
            "darkstone": 0,
            "defense": 5,
            "faith": 2,
            "grit": {
                "current": 1,
                "max": 2
            },
            "health": {
                "max": 12,
                "wounds": 0
            },
            "init": 2,
            "items": [
                {
                    "description": "+1 combat, spend faith to add to combat",
                    "hands": 1,
                    "source": "Starting Gear",
                    "weight": 1
                }
            ],
            "keywords": "Holy",
            "level": 1,
            "melee": 4,
            "movement": 0,
            "ranged": 5,
            "sanity": {
                "loss": 0,
                "max": 10
            },
            "sermons": [
                {
                    "check": 5,
                    "cost": 1,
                    "desc": "For each Faith spent on the cost of the sermon, you may Heal 1 Wound from yourself or an adjacent Hero. At Level 5 - Heal 2 Wounds for each Faith spent.",
                    "type": "Blessing",
                    "xp": 10,
                    "name": "Faith Healing"
                }
            ],
            "sidebag": {
                "capacity": 5
            },
            "stats": {
                "Agility": 1,
                "Cunning": 2,
                "Lore": 3,
                "Luck": 2,
                "Spirit": 4,
                "Strength": 3
            },
            "wealth": 0,
            "willpower": 3,
            "xp": 0,
            "upgrades": [
                {
                    "modifiers": [
                        {
                            "affects": "Agility",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
                    "name": "Agility"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "+1 Faith while in an Other World. +1 Max Grit.",
                    "name": "Ancient Writing"
                },
                {
                    "value": "New Sermon Blessing",
                    "name": "Belief"
                },
                {
                    "requires": "Belief",
                    "value": "Once per turn, you may Re-roll a single Defense roll",
                    "name": "Chosen"
                },
                {
                    "requires": "Chosen",
                    "value": "New Sermon Blessing. +1 Faith",
                    "name": "Conviction"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Demon)"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Undead)"
                },
                {
                    "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP.",
                    "name": "Crush the Forsaken (Void)"
                },
                {
                    "requires": "Conviction",
                    "value": "Defense +4",
                    "name": "Divine Protection"
                },
                {
                    "value": "Once per turn, when Performing a Judgement Sermon, you may Re-roll one of the Casting Dice.",
                    "name": "Firebrand"
                },
                {
                    "requires": "Stories of the Void",
                    "value": "New Sermon.  You may now hold 5 more Corruption Points before getting a Mutation.",
                    "name": "Forbidden Knowledge"
                },
                {
                    "requires": "Vengeance",
                    "value": "Whenever you kill an adjacent Enemy, before assigning any more Hits, you may Move up to 2 spaces in any direction ignoring Escape tests.",
                    "name": "Frothing Rage"
                },
                {
                    "multi": true,
                    "value": "+D6 Health and +D6 Sanity.",
                    "name": "Health and Sanity"
                },
                {
                    "value": "You may not use Guns. Starts with 1 Blessing and 1 Judgement.",
                    "name": "Holy Man"
                },
                {
                    "requires": "Salvation",
                    "value": "Anytime you kill a Demon, every Hero on your Map Tile may Heal 1 Wound or Sanity Damage",
                    "name": "Holy Revolution"
                },
                {
                    "requires": "Revelation",
                    "value": "Once per turn, you may Re-roll one of your To Hit rolls.",
                    "name": "Holy Strike"
                },
                {
                    "modifiers": [
                        {
                            "affects": "init",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Initiative",
                    "name": "Initiative"
                },
                {
                    "multi": true,
                    "value": "You may choose one Injury/Mutation/Madness to Heal.  If you have none, gain +1 Faith.",
                    "name": "Keep the Faith"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Lore. Also gain +D6 Health.",
                    "name": "Lore"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "requires": "Zealot",
                    "value": "Once per turn, you may take 1 Corruption Point, ignoring Willpower, to Heal D6 Health/Sanity (any mix) from yourself or another Hero on your Map Tile. +1 Max Grit.",
                    "name": "Martyr"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Max Grit",
                    "name": "Max Grit"
                },
                {
                    "value": "Once per turn, when Performing a Blessing Sermon, you may Re-roll one of the Casting Dice.",
                    "name": "Missionary"
                },
                {
                    "modifiers": [
                        {
                            "affects": "move",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Move",
                    "name": "Move"
                },
                {
                    "value": "You may now use 2-Handed Guns. Extra Starting Gear: Shotgun (replaces Holy Book)",
                    "name": "Redemptionist"
                },
                {
                    "value": "New Sermon Judgement",
                    "name": "Revelation"
                },
                {
                    "requires": "Martyr",
                    "value": "Use 2 Grit to remove a Corruption Point from yourself.",
                    "name": "Salvation"
                },
                {
                    "value": "You are +1 Damage on all Attacks against Undead Enemies",
                    "name": "Scourge of the Dead"
                },
                {
                    "modifiers": [
                        {
                            "affects": "sidebag",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix).",
                    "name": "Side Bag Capacity"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Spirit",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Spirit.  Also gain +D6 Sanity",
                    "name": "Spirit"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Tools of the Damned",
                    "value": "All of your Attacks are +1 Damage against Void Enemies. +1 Lore.",
                    "name": "Stories of the Void"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Strength",
                            "value": "1"
                        }
                    ],
                    "multi": true,
                    "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
                    "name": "Strength"
                },
                {
                    "modifiers": [
                        {
                            "affects": "Lore",
                            "value": "1"
                        }
                    ],
                    "requires": "Ancient Writing",
                    "value": "All of your Attacks are +1 Damage against Demon Enemies. +1 Lore.",
                    "name": "Tools of the Damned"
                },
                {
                    "modifiers": [
                        {
                            "affects": "combat",
                            "value": "1"
                        }
                    ],
                    "requires": "Holy Strike",
                    "value": "New Sermon Judgement. +1 Combat",
                    "name": "Vengeance"
                },
                {
                    "modifiers": [
                        {
                            "affects": "grit",
                            "value": "1"
                        }
                    ],
                    "value": "Once per turn, you may take 3 Wounds, ignoring Defense, to add +D6 Damage to one your Hits. +1 Max Grit.",
                    "name": "Zealot"
                }
            ]
        }
    ],

    INJURIES : [
      {
          "desc" : "Your condition is serious! Any further Injury Chart rolls are only made on a single D6. This Injury is -1 to roll to Heal during Surgery at the Doc's Office in Town.",
          "name" : "Internal Bleeding"
      },
      {
          "desc" : "One of your hands is twisted and broken. You have one less Hand for equipping Items each turn. 2-Handed Weapons may still be used but they cannot get Critical Hits.",
          "name" : "Mangled Hand"
      },
      {
          "desc" : "Ouch! Your vision is blurred and cloudy as one of your eyes has been scratched.  You cannot get Critical Hits with your Ranged Attacks.",
          "name" : "Gouged Eye"
      },
      {
          "desc" : "A dep and painful cut runs across your leg. You are -1 Move (min 1).",
          "modifiers" : [
              {
                  "affects" : "move",
                  "value" : -1
              }
          ],
          "name" : "Slashed Leg"
      },
      {
          "desc" : "Your ears are ringing a little and you have a headache that won't quit! Until the start of the next Adventure, you are -1 Initiative and roll one less dice on all Skill Test.",
          "name" : "Concussion"
      },
      {
          "desc" : "Your arm has been bent and crushed a bit. You are -1 Combat.",
          "modifiers" : [
              {
                  "affects" : "combat",
                  "value" : -1
              }
          ],
          "name" : "Crushed Arm"
      },
      {
          "desc" : "Not particularly debilitating, but it sure hurts! You are -1 Max Grit.",
          "modifiers" : [
              {
                  "affects" : "grit",
                  "value" : -1
              }
          ],
          "name" : "Broken Collar Bone"
      },
      {
          "desc" : "Deep slashes run across your chest, making it hurt to turn or twist your body. You are -1 Initiative.",
          "modifiers" : [
              {
                  "affects" : "init",
                  "value" : -1
              }
          ],
          "name" : "Chest Wound"
      },
      {
          "desc" : "You pick yourself up and shake yourself off. There is no long lasting effect.",
          "name" : "Wind Knocked Out"
      },
      {
          "desc" : "You're a bit of a mess, but it's all superficial. In a lot of ways, you look tougher! You are +1 Max Grit.",
          "modifiers" : [
              {
                  "affects" : "grit",
                  "value" : 1
              }
          ],
          "name" : "New Scars"
      },
      {
          "desc" : "You are torn to pieces or crushed beyond recovery. Your Hero is Dead.",
          "name" : "Ripped Apart"
      }
  ],

    MADNESS : [
      {
          "desc" : "It's...sooo...coooolldd! When Scavenging, ignore the first 6 you roll on the Scavenge test.",
          "name" : "The Chills"
      },
      {
          "desc" : "You shake it off! You're fine...right? There is no long lasting effect.",
          "name" : "Get a Grip"
      },
      {
          "desc" : "How does it know your name? You can hear it calling you in the dark! Whenever the Hold Back the Darkness roll is failed (including doubles that would fail), you take D3 Sanity Damage, ignoring Willpower saves",
          "name" : "It's Coming for You"
      },
      {
          "desc" : "Your skin burns and itches as you scratch at it feverishly. At the start of each turn, you take 1 Hit, as you claw at your skin.",
          "name" : "The Itching"
      },
      {
          "desc" : "You can no longer trust what you see as shadows and tendrils of darkness writhe in every corner of your eye. Any time you would draw a Loot card, roll a D6. On 1, you instead take 1 Sanity Damage, ignoring Willpower as you recoil from the hideous visions!",
          "name" : "Hallucinations"
      },
      {
          "desc" : "You have descended into the dark depths of purest Madness! Your Hero is, for all intents and purposes, considered to be Dead.",
          "name" : "Lost to the Darkness"
      },
      {
          "desc" : "You feel the ebb and flow of the Void energy all around you. You no longer get a Willpower save to prevent Corruption Hits.",
          "name" : "Open to the Void"
      },
      {
          "desc" : "They're out to get you...all of them! Anytime you want to Scavenge or Explore a Doorway, you must first roll a D6. On 1, 2, or 3, you cannot as you are distracted keeping an eye on the other Heroes with you.",
          "name" : "Paranoia"
      },
      {
          "desc" : "They're telling you to kill...again! Any time you end your Move adjacent to another Hero, roll a D6. On 1 or 2, that Hero takes 3 Hits as you lash out at them!",
          "name" : "Hearing Voices"
      },
      {
          "desc" : "Your fractured state of mind is in shambles, and you are ready to slip over the edge at any moment. Any further Madness Chart rolls are only made on a single D6. This Madness is -1 to the roll to Heal during an Exorcism at the Church in Town.",
          "name" : "Delusions"
      },
      {
          "desc" : "You've come back from the brink of madness...and are stronger for it! You are +1 Max Grit.",
          "modifiers" : [
              {
                  "affects" : "grit",
                  "value" : 1
              }
          ],
          "name" : "I've Seen Things"
      }
  ],

    MUTATIONS : [
      {
          "desc" : "A hole has opened up in your chest leading to another dimension! And occasionally... stuff comes through! Anytime an 11 or 12 is rolled to Hold Back the Darkness, you must roll a D6. On 1, 2, or 3, There is an Ambush Attack as a Low Threat card erupts from the portal. On 4 or 5, nothing happens. On 6, Draw an Artifact card from the Mines.",
          "name" : "Chest Portal"
      },
      {
          "desc" : "Gross! No game effect",
          "name" : "Tentacle Tongue"
      },
      {
          "desc" : "Your skin has fused with chunks of rock, makng you lumbering and slow. You are -2 Move each turn (min 1), however you gain Armor 4+",
          "modifiers" : [
              {
                  "affects" : "move",
                  "value" : -2
              }
          ],
          "name" : "Fused with Rock"
      },
      {
          "desc" : "Your skin and muscle have grown out and extended around one of your items, making it part of you. Choose one Item you are carrying that is 1-Handed or 2-Handed. From now on, that Item must be assigned every turn.",
          "name" : "Fused with Item"
      },
      {
          "desc" : "Your arm has grown deformed and giant. You can no longer use Clothing - Coat Items.",
          "name" : "Arm Growth"
      },
      {
          "desc" : "Your hand has grown deformed and giant. You can no longer use Clothing - Gloves Items.",
          "name" : "Hand Growth"
      },
      {
          "desc" : "Your leg has grown deformed and giant. You can no longer use Clothing - Boots Items.",
          "name" : "Leg Growth"
      },
      {
          "desc" : "Any Dark Stone shards you currently carry become fused to you. These cannot be sold, used, or lost until removed at Doc's Office and will continue to roll for Corruption at the end of every Adventure.",
          "name" : "Fused with Dark Stone"
      },
      {
          "desc" : "You are -1 Move each turn (min 1)",
          "modifiers" : [
              {
                  "affects" : "move",
                  "value" : -1
              }
          ],
          "name" : "Tentacle Leg"
      },
      {
          "desc" : "You have grown large, sharp fangs that protrude from your motuh. You gain a Bite Free Attack - Once per turn. 1 Combat, uses the D8 for Damage. If this Bite attack wounds a Void Enemy, you also take 1 Corruption Point.",
          "name" : "Fangs"
      },
      {
          "desc" : "You can no longer speak. All Item prices in Town cost you +$10.",
          "name" : "Mouth Grown Over"
      },
      {
          "desc" : "You sprout horns from the top of your head. You can no longer use Clothing - Hat Items.",
          "name" : "Horns"
      },
      {
          "desc" : "They say two heads are better than one... I'm not so sure. You may now use 2 Clothing - Hat Items and you are +1 Initiative. However, any time you roll a 6 for movement, you lose your Activation, as your two heads are arguing over where to go next.",
          "modifiers" : [
              {
                  "affects" : "init",
                  "value" : "1"
              }
          ],
          "name" : "Second Head"
      },
      {
          "desc" : "You have grown a third eye that can see into the Void. Once per turn, you may spend 2 Grit to force a Threat card just drawn to be discarded and Re-drawn",
          "name" : "Third Eye"
      },
      {
          "desc" : "One of your eyes has grown over with gnarled flesh. All of your Critical Hits do 1 less Damage than normal.",
          "name" : "Eye Grown Over"
      },
      {
          "desc" : "Shopkeepers are intimidated by your writhing facial hair. All Item prices in Town cost you $10 less than normal (min $10)",
          "name" : "Tentacle Mustache"
      },
      {
          "desc" : "You can now understand what Void creatures are saying as they hiss and growl. At the start of each of your Activations, if there are any Void Enemies on your Map Tile, you are +1 Initiative, but also take 1 Sanity Damage, ignoring Willpower.",
          "name" : "Void Speech"
      },
      {
          "desc" : "All of your Critical Hits are +1 Damage. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
          "name" : "Eye Stalks"
      },
      {
          "desc" : "At the start of each of your Activations, take 1 Hit for every Dark Stone shard and Item with a Dark Stone Icon you are carrying.",
          "name" : "Dark Stone Allergy"
      },
      {
          "desc" : "You have grown the upper torso of a small humanoid like creature out of your abdomen. You are +1 Lore and while in an Other World +1 Initiative. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
          "modifiers" : [
              {
                  "affects" : "Lore",
                  "value" : 1
              },
              {
                  "affects" : "corruption",
                  "value" : -1
              }
          ],
          "name" : "Child of the Void"
      },
      {
          "desc" : "Your fingers have fused together making it impossible to do any fine manipulations. You may not use Gun Items (unless it is an Artifact).",
          "name" : "Fused Fingers"
      },
      {
          "desc" : "You are in bad shape. All of your Town Location Event Chart rolls are -1 to the roll (min 2).",
          "name" : "Nose Fallen Off"
      },
      {
          "desc" : "You lose the use of one Hand each turn, but you are +1 Combat. 2-Handed Guns may still be used, but cannot get Critical Hits.",
          "modifiers" : [
              {
                  "affects" : "combat",
                  "value" : "1"
              }
          ],
          "name" : "Tentacle Arm"
      },
      {
          "desc" : "+1 Move. You can now hold 1 fewer Corruption Points before gaining a Mutation.",
          "modifiers" : [
              {
                  "affects" : "move",
                  "value" : 1
              },
              {
                  "affects" : "corruption",
                  "value" : -1
              }
          ],
          "name" : "Tentacle Tail"
      },
      {
          "desc" : "Your tail nips and bites at you and any others that stray too close. Any time you or another model adjacent to you rolls a 1 on a To Hit roll, that model takes 1 Wound, ignoring Defense. No XP is gained.",
          "name" : "Tail with a Mouth"
      },
      {
          "desc" : "+1 Combat. You can now hold 1 fewer Corruption Point before you get a Mutation.",
          "modifiers" : [
              {
                  "affects" : "combat",
                  "value" : 1
              },
              {
                  "affects" : "corruption",
                  "value" : -1
              }
          ],
          "name" : "Barbed Tail"
      },
      {
          "desc" : "Any Hero adjacent to you at the end of a turn automatically takes D3 Wounds, ignoring Defense.",
          "name" : "Void Plague"
      },
      {
          "desc" : "Your tail talks to you in hushed demonic whispers, curling around to speak into your ear. Any time you take one or more Sanity Damage from a source, you take 1 extra Sanity Damage.",
          "name" : "Tail with a Face"
      },
      {
          "desc" : "You now have 1 extra Hands to use per turn. You can now hold 1 fewer Corruption Points before you get a Mutation.",
          "modifiers" : [
              {
                  "affects" : "corruption",
                  "value" : -1
              }
          ],
          "name" : "Prehensile Tail"
      },
      {
          "desc" : "Gross! No game effect.",
          "name" : "Tentacle Fingers"
      },
      {
          "desc" : "You are -2 Health, but +1 Max Grit.",
          "modifiers" : [
              {
                  "affects" : "health",
                  "value" : -2
              },
              {
                  "affects" : "grit",
                  "value" : 1
              }
          ],
          "name" : "Void Boils"
      },
      {
          "desc" : "Your skin has become gooey and comes off easily now. Any time you take one or more Wounds from a source, you take 1 extra Wound.",
          "name" : "Melting Skin"
      },
      {
          "desc" : "Your skin begins to give off an eerie green glow that lights up the corridors around you. You are now Immune to Voices in the Dark but Enemies also Hit you on To Hit rolls of 1.",
          "name" : "Glowing Skin"
      },
      {
          "desc" : "Any time you pass through a Gate, you take 1 Corruption Point, ignoring Willpower.",
          "name" : "Void Infection"
      },
      {
          "desc" : "Your skin is now oily and greasy, allowing you to slide past Enemies and slip through tight spaces. You may now roll an extra die for Escape tests and choose which roll to use.",
          "name" : "Slippery Skin"
      },
      {
          "desc" : "Your skin becomes hard and crusty, like it's made of rock. You are +3 Health, but -1 Move each turn (min 1).",
          "modifiers" : [
              {
                  "affects" : "health",
                  "value" : 3
              },
              {
                  "affects" : "move",
                  "value" : -1
              }
          ],
          "name" : "Rock Skin"
      }
  ],

    SERMONS : [
      {
          "check" : 10,
          "cost" : 2,
          "deadly" : true,
          "desc" : "You may place a number of Hellfire markers up to your Hero Level +1 in any spaces within Range (limit 1 per space). All markers must form a continuous chain. Markers do 1 Hit with 2D6 Damage to anything in their space. May only be used if you did not Move this turn.",
          "name" : "Cleansing Fire",
          "range" : "8",
          "type" : "Judgement",
          "xp" : 30
      },
      {
          "check" : 9,
          "cost" : 1,
          "desc" : "Choose one Hero within Range. That Hero may remove any Poison affecting them and may Heal 2 Sanity. Level 3: 3 Sanity. Level 5: 4 Sanity. Level 9: 5 Sanity.",
          "name" : "Cure",
          "range" : "6",
          "type" : "Blessing",
          "xp" : 20
      },
      {
          "check" : 5,
          "cost" : 1,
          "desc" : "For each Faith spent on the cost of the sermon, you may Heal 1 Wound from yourself or an adjacent Hero. At Level 5 - Heal 2 Wounds for each Faith spent.",
          "name" : "Faith Healing",
          "type" : "Blessing",
          "xp" : 10
      },
      {
          "check" : 7,
          "cost" : 2,
          "desc" : "Choose one Hero within Range. That Hero gains +3 Initiative until the end of the turn. At level 4, +4 Initiative. At level 8, +5 Initiative.",
          "name" : "Holy Speed",
          "range" : "8",
          "type" : "Blessing",
          "xp" : 15
      },
      {
          "check" : 10,
          "cost" : 2,
          "deadly" : true,
          "desc" : "Cancel a Darkness card. You may spend 1 extra Faith to cancel a Growing Dread card instead.",
          "name" : "Intervention",
          "type" : "Blessing",
          "xp" : 50
      },
      {
          "check" : 6,
          "cost" : 2,
          "deadly" : true,
          "desc" : "You may Heal a number of Wounds equal to the amount the preaching roll beat the casting number by from any mix of Heroes within Range (including yourself)",
          "name" : "Revitalize",
          "range" : "8",
          "type" : "Blessing",
          "xp" : 10
      },
      {
          "check" : 8,
          "cost" : 1,
          "desc" : "Choose any Hero (including yourself). Until the end of the turn, all of that Hero's Hits do +1 Damage each. At Level 4: +2 Damage. At Level 9: +3 Damage.",
          "name" : "Righteous Fury",
          "type" : "Judgement",
          "xp" : 25
      },
      {
          "check" : 9,
          "cost" : 1,
          "desc" : "Choose any Hero. Until the end of turn, that Hero gains: Armor 5+ / Spirit Armor 5+ (limit 1 Shield per Hero). At level 5, Armor 4+ / Spirit Armor 4+",
          "name" : "Shield of Light",
          "type" : "Blessing",
          "xp" : 20
      },
      {
          "check" : 9,
          "cost" : 2,
          "deadly" : true,
          "desc" : "Every Enemy within 2 spaces of you automatically takes 1 Hit. May only be used if you did not Move this turn. At Level 2: 2 Hits. At Level 4: Affects all Enemies on your Map Tile. At Level 6: Hits are +1 Damage. At Level 8: Hits are +2 Damage.",
          "name" : "Shockwave",
          "type" : "Judgement",
          "xp" : 25
      },
      {
          "check" : 9,
          "cost" : 2,
          "deadly" : true,
          "desc" : "Choose one model within Range to immediately take D6 Wounds with no Defense. At Level 3: D8 Wounds. At Level 5: D8+1 Wounds. At Level 9: D8+2 Wounds",
          "name" : "Smite",
          "range" : "12",
          "type" : "Judgement",
          "xp" : 10
      },
      {
          "check" : 7,
          "cost" : 1,
          "desc" : "Choose an Enemy within Range. That Enemy is -2 Defense until the end of the turn. Enemies that are Immune to Critical Hits are only reduced by -1 Defense. At Level 3: Choose 2 Enemies. At Level 6: -3 Defense. At Level 9: Choose 3 Enemies.",
          "name" : "Weaken",
          "range" : "6",
          "type" : "Judgement",
          "xp" : 20
      }
  ],

  SAMURAI_TACTICS: [

      {
          "name": "Whirlwind Strike",
          "desc": "Every adjacent Enemy model immediately takes 1 Hit that does Peril die + Your Hero Level in damage",
          "cost": 5
      },
      {
          "name": "Lightning Slice",
          "desc": "Choose an adjacent space. Every model in that space or 2 spaces in a line direclty behind it take D3+1 Wounds ignoring Defense. L3: 5 spaces; L5: Peril die Damage; L7: Ignores Armor and Endurance",
          "cost": 6
      },
      {
          "name": "Thunder Smash",
          "desc": "Every Enemy model within D3 spaces of you immediately takes 1 Wound ignoring Defense. L3: D6 spaces; L6: 2 Wounds",
          "cost": 4
      },
      {
          "name": "Dancing Dragon",
          "desc": "Spend Fury up to your Level to use. Target Enemy model up to 2 spaces away and move to share their space, placing a Fury token on that space. Then make an Agility 5+ test. If passed, repeat this process, not targeting the same Enemy more than once. When no targets or Fury remain or if failed, move adjacent to final target. Each Enemy takes Wounds equal to Fury tokens placed, ignoring Defense, and remove Fury tokens.",
          "cost": 1
      },
      {
          "name": "Dragon Fire",
          "desc": "Until end of turn, place 1 Burning Marker on an Enemy you do one or more Combat Hits to. L3: +1 Combat this turn, L6: 2 Burning Markers",
          "cost": 5
      },
      {
          "name": "Weeping Blade",
          "desc": "Add +D6 Damage to one Critical Hit while using Blade. L3: Usable on To-Hit 6+ even if immune to Criticals; L6: +Peril die Damage",
          "cost": 3
      },
      {
          "name": "Sword Block",
          "desc": "Roll D3 + Hero Level and prevent that much Damage to you or adjacent model from single Hit. Only usable while Blade is equipped. L3: D6 + Hero Level, L5: Enemy takes 1 Combat Hit from you",
          "cost": 2
      },
      {
          "name": "Battle Cry",
          "desc": "During next activation, all Heroes gain +1 Shot or +1 Combat. 1x Fight. L5: +1 Damage to all Heroes' Attacks during next Activation",
          "cost": 6
      },
      {
          "name": "Flowing Water",
          "desc": "Move up to 2 spaces, auto pass escape test and passing through Enemy spaces. Usable at any time, including during an Attack. L3: Usable multiple times per turn. L5: 3 spaces",
          "cost": 3
      },
      {
          "name": "Blowing Reeds",
          "desc": "Immediately move to an empty space adjacent to another Hero on same Map Tile. Replaces your normal Move for the Turn. L2: Any model, not just Hero; L4: same or adjacent Map Tile; L6: May swap places with other model.",
          "cost": 5
      },
      {
          "name": "Meditation",
          "desc": "Spend Fury up to Hero Level to use. Use only at start of a turn. Init reduced to 1 for Turn. For each Fury spent, Heal 2 Health/Sanity (any mix). L2: Init 2; L4: If 3+ Fury spent, recover 1 Grit; L6: Init -2",
          "cost": 1
      },
      {
          "name": "Rejuvenate",
          "desc": "Spend 2 Fury to remove a status effect or 4 Fury to remove 1 Corruption Point. Usable any time, multiple times per turn",
          "cost": 2
      }
  ],

  SHAMAN_SPELLS: [
      {
          "name": "Warrior's Speed",
          "desc": "Select a Hero on same or adjacent Map Tile (including yourself). Until end of turn, that Hero has +1 Initiative, +3 Move, and +1 to Escape tests",
          "power": 5,
          "xp": 0
      },
      {
          "name": "Charged Hatchet",
          "desc": "For each casting roll of 5+ assigned to this Spell, add +1 Damage to one of your Combat Hits this turn",
          "power": 0,
          "xp": 0
      },
      {
          "name": "Call Down the Storm",
          "desc": "Use only during a Fight. At start of each turn, roll D8. Every Enemy with Init less than the roll has Move reduced to half and on the D6 roll of 5+ is struck by lightning, taking a Hit that does D6+2 Damage. At start of each turn, Storm ends unless caster spends 2 Magik or 1 Dark Stone. Cancels any other Weather or Storm in play",
          "power": 13,
          "xp": 20
      },
      {
          "name": "Tribal Wrath",
          "desc": "Use only during Fight. You and every adjacent Hero are +1 Damage on all Attacks until end of Turn",
          "power": 9,
          "xp": 5
      },
      {
          "name": "Lightning Field",
          "desc": "Use only during Fight. Roll a D6 for every adjacent Enemy. On 5+, it takes 1 Wound ignoring Defense",
          "power": 7,
          "xp": 0
      },
      {
          "name": "Spirit War",
          "desc": "Select Enemy within 3 spaces. For each casting roll of 5+ assigned to this spell, place Sanity marker on that Enemy (keyword Ancient or Magik require 6+). For each 1 or 2, you take 1 Sanity Damage ignoring Willpower. Enemies are -1 Defense for each Sanity marker (or 2 markers if Large+)",
          "power": 0,
          "xp": 5
      },
      {
          "name": "Ancestral Shield",
          "desc": "Select hero on same or adjacent map tile. Target absorbs Wounds equal to 2 + caster's level after which it is destroyed. At start of each turn, spend 1 Magik or shield ends. Limit 1 cast at a time",
          "power": 5,
          "xp": 5
      },
      {
          "name": "Runic Circle",
          "desc": "Place runic circle within 8 spaces of you. Any Hero in space may re-roll 1 Defense roll per turn and Heals 2 Wounds at end of turn. At start of each turn, requires 2 Magik or 1 Dark Stone be spent to maintain. Limit 1 cast at a time",
          "power": 11,
          "xp": 25
      },
      {
          "name": "Inner Fire",
          "desc": "Choose any Hero on same or adjacent Map Tile (including you). For each casting roll of 4+, Heal 1 Sanity Damage (+5XP for other Heros healed). If at least 1 6+ is assigned, you may remove 1 Corruption Point from the target",
          "power": 0,
          "xp": 10
      },
      {
          "name": "Spirit Binding",
          "desc": "Choose any Demon, Void, or Ghost enemy on same or adjacent map tile. -1 Defense until end of turn and if it tries to move, make a Strength 5+ test to prevent (6+ if Large+)",
          "power": 8,
          "xp": 10
      },
      {
          "name": "Shadow Vision",
          "desc": "Cast this spell when a Growing Dread would be added to stack. If successful, cancel that card",
          "power": 15,
          "xp": 20
      },
      {
          "name": "Astral Projection",
          "desc": "Replaces caster's next Activation. Choose one: Darkness deck, any Threat deck, any Encounter deck, or Growing Dread stack. Look at top 2 cards. May choose 1 and make Spirit 6+ test to discard that card.  Put cards back in any order.",
          "power": 13,
          "xp": 25
      },
      {
          "name": "Bear Form",
          "desc": "Cast to transform into Bear Form. +2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
          "power": 11,
          "xp": 30
      },
      {
          "name": "Mouse Form",
          "desc": "Cast to transform into Mouse Form. +3 Init, +2 Agility, Defense 3+, -1 Combat, Auto pass all Escape tests, may move through other models, can only be hit on To-Hit of 6+, Use 1 Grit when transforming back in same space as Enemy to make Growth attack (moved and D6 Wounds ignoring Defense).  You may automatically transform back at start of your Activation on any future turn or if KO'd",
          "power": 6,
          "xp": 20
      },
      {
          "name": "Wolf Form",
          "desc": "Cast to transform into Wolf Form. +2 Cunning, +2 Init, +2 Move, 1x Turn use 1 Grit to cause adjacent Enemies -1 Defense for turn, +1 Combat for each adjacent Hero or +1 Damage if none.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
          "power": 9,
          "xp": 20
      },
      {
          "name": "Buffalo Charge",
          "desc": "Use at start of Activation, replaces caster's Move. For each casting 5+, move 2 spaces ignoring Escape tests. Any model moved through takes 1 Hit for D6 + Hero Level Damage.",
          "power": 0,
          "xp": 10
      },
      {
          "name": "Cougar Strike",
          "desc": "Use only during your Activation. Do Hero Level basic Hits (no modifiers) to one adjacent model.",
          "power": 6,
          "xp": 10
      },
      {
          "name": "Eagle Flight",
          "desc": "Use only during your Activation, replaces caster's Move. Move 2D6 spaces ignoring Escape tests, models, and obstacles.",
          "power": 10,
          "xp": 5
      }
  ],

  GAMBLER_TRICKS: [

      {
          "name": "Fortune's Favor",
          "desc": "Use 1 Fortune token to re-roll any single die just rolled, even if it has already been re-rolled. Only usable on rolls that allow Grit."
      },
      {
          "name": "Tip the Scales",
          "desc": "Use 1 Fortune token to choose any single die just rolled and make a Luck 5+ test. For each 5+ rolled, you may add or subtract 1 from the chosen die roll. Cannot be adjusted higher than natural roll maximum and cannot target die that Grit cannot be used on.",
          "xp": 10
      },
      {
          "name": "Stack the Deck",
          "desc": "Use 1 Fortune token to choose any card deck then make a Cunning 6+ test. If passed, look at the top 3 cards. Choose one to discard and put the other two back in any order. May only be used on decks with discard piles.",
          "xp": 10
      },
      {
          "name": "Bluff",
          "desc": "Use 1 Fortune token when you are about to be Attacked by an Enemy to make a Luck 6+ test. If passed, that Attack is canceled. If failed, all Hits from that Attack are +1 Damage against you",
          "xp": 20
      },
      {
          "name": "Double Down",
          "desc": "1x Fight, use 1 Fortune token when you are about to make a Damage roll for one of your Hits. Double the amount rolled for Damage (before modifiers). If the target would not be killed by this Hit, the Hit does no Damage instead.",
          "xp": 0
      },
      {
          "name": "Counting Cards",
          "desc": "Use 1 Fortune token just after a card has been drawn from any deck and make a Cunning 6+ test. If passed, place that card here facedown and draw a new card to play instead. Any card already here is placed back in its proper deck, D3 cards down from the top",
          "xp": 15
      },
      {
          "name": "Ace in the Hole",
          "desc": "If there is no die here, use 1 Fortune token when you roll a 6 on any single die to place that die here. Roll a new die to replace the 6 just rolled. While there is a die here, use 1 Fortune token to make a Luck 5+ test. If passed, replace any single die just rolled with the 6 that was here (removing the die)",
          "xp": 10
      },
      {
          "name": "Cheat",
          "desc": "Use 2 Fortune tokens and take 1 Corruption Hit to select any number of dice just rolled and make a Cunning 6+ test. If passed, for each 6+ rolled, choose one of the selected dice and rotate it to be on any facing you like. Only usable on rolls that allow Grit.",
          "xp": 25
      }
  ],

  ORPHAN_MISSIONS: [
    {
      "desc": "+1 Cunning. +1 Luck. Requires 5 Discoveries. Reward: To Hit 3+",
      "modifiers": [
        {
          "affects": "Cunning",
          "value": 1
        },
        {
          "affects": "Luck",
          "value": 1
        }
      ],
      "name": "Become the Best"
    },
    {
      "desc": "+2 Health. Requires 2 Discoveries. Reward: +5 Sanity",
      "modifiers": [
        {
          "affects": "health.max",
          "value": 2
        }
      ],
      "name": "Find Yer Kin"
    },
    {
      "desc": "+1 Max Grit. Requires 4 Discoveries. Reward: Start each Adventure with 1 extra Grit.",
      "modifiers": {
        "affects": "grit.max",
        "value": 1
      },
      "name": "Find the Killer"
    },
    {
      "desc": "+1 Combat. Requires 4 Discoveries. Reward: +1 Damage to all of your Attacks",
      "modifiers": [
        {
          "affects": "combat",
          "value": 1
        }
      ],
      "name": "Hunt Them All"
    },
    {
      "desc": "+1 Initiative. Requires 3 Discoveries. Reward: +2 Strength.",
      "modifiers": [
        {
          "affects": "init",
          "value": 1
        }
      ],
      "name": "Take Em Down"
    }
  ]

};
