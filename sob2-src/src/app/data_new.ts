export const Data = {
  CLASSES: [
    { //GUNSLINGER
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
      "name": "Gunslinger",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "ranged",
              "value": -1
            }
          ],
          "name": "Best Shot in the West",
          "requires": "Master of Killin'",
          "value": "Ranged To Hit 2+"
        },
        {
          "name": "Call Your Shot",
          "requires": "Showmanship",
          "value": "Before rolling To Hit, choose a number. Any die that rolls the chosen number does an extra 1 Damage ignoring Defense even if the shot would normally miss."
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
          "name": "Card Shark",
          "requires": "Hushed Whispers",
          "value": "+1 Cunning and +1 Luck. Any time you win at Gambling in Town, you gain an extra D6 x $10."
        },
        {
          "name": "Catch Phrase",
          "value": "Once per Adventure, you may say your Catch Phrase to immediately Heal 2D6 Wounds or to add D6 Damage to one of your Hits."
        },
        {
          "name": "Cerberus Shots",
          "requires": "Ricochet Shots",
          "value": "Start with up to 2 Cerberus Shots in your Six-Shooter. (Blue markers)"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Charmed Life",
          "requires": "Call Your Shot",
          "value": "You start every Adventure with a Revive Token, usable only by you. Gain 25 XP any time you use it. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Cool Hand",
          "value": "At the start of any Fight Turn, you may reduce your Initiative by 3 to gain +1 Shot with a 1-Handed Gun. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "multi": true,
          "name": "Health",
          "value": "+D6 Health."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+2 Health and +2 Sanity."
        },
        {
          "name": "Hellfire Shots",
          "requires": "Cerberus Shots",
          "value": "Start with up to 2 Hellfire Shots in your Six-Shooter. (Red markers)"
        },
        {
          "name": "Hushed Whispers",
          "value": "You now start every Adventure and Town Stay with an extra 1 Grit."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Killer",
          "requires": "Card Shark",
          "value": "You may now use up to 2 Shots from your Six-Shooter on each Hit. +1 Max Grit."
        },
        {
          "name": "Legend of the West",
          "requires": "Killer",
          "value": "Once per Fight, use 2 Grit to add extra Damage to one of your Hits, equal to your current Hero Level."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Master of Killin'",
          "requires": "Through Shot",
          "value": "You may now use your Six-Shooter Shots with any Gun, not just Pistols. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Pistol Fanning",
          "type": "starting",
          "value": "Use 1 Grit to double the number of Shots you get with a 1-Handed Gun for one Attack (limit once per turn). To use this ability, you must have 1 Hand slot open."
        },
        {
          "name": "Quick and the Dead",
          "value": "Uses the Six Shooter template. Starts each game fully loaded with 6 Dead Eye Shot bullets"
        },
        {
          "name": "Quickdraw",
          "type": "starting",
          "value": "Anytime a new group of Enemies is placed on the board, you may immediately make a free Attack outside of the normal turn sequence.  To use the ability, you must have 1 Hand slot open."
        },
        {
          "name": "Reload",
          "type": "starting",
          "value": "Use 2 Grit to re-fill D6 Shots back into your Six Shooter Template"
        },
        {
          "name": "Ricochet Shots",
          "value": "Start with up to 2 Ricochet Shots in your Six Shooter. (Green markers)"
        },
        {
          "name": "Showmanship",
          "requires": "Catch Phrase",
          "value": "Draw an additional Personal Item."
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "The Right Tool",
          "requires": "Hellfire Shots",
          "value": "You may start each Adventure with any mix of Shot Types in your Six-Shooter Template. +1 Max Grit."
        },
        {
          "name": "Through Shot",
          "requires": "Cool Hand",
          "value": "Any time you kill and Enemy with a 1-Handed Gun, you may immediately do a free Hit with that Gun to another Enemy in one of the three spaces behind it."
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //COWBOY
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
      "name": "Cowboy",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Sanity."
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
          "name": "Bar Fight Vet",
          "requires": "Take a Swing",
          "value": "+1 Combat and +1 Strength and +1 Move."
        },
        {
          "name": "Brash Heroics",
          "requires": "Living on the Edge",
          "value": "Once per Fight, use 1 Grit to do D6 Wounds, ignoring Defense to both yourself and one adjacent Enemy. +3 Health."
        },
        {
          "name": "Close Companion",
          "requires": "Frontier Rivals",
          "value": "While you have a Trasnport Animal (it must be named), you are: Willpower 3+."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": 2
            }
          ],
          "name": "Daredevil",
          "type": "starting",
          "value": "You are +2 Move.  All of your Attacks on adjacent Large size or bigger Enemies are +1 Damage"
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "Fancy Roping",
          "value": "Any time you Rope an Enemy with the Lasso, gain 10 XP, and Recover a Grit on the D6 roll of 4+. +1 Initiative."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Fast Return",
          "requires": "Fancy Roping",
          "value": "You may now use the Lasso up to twice per Fight, but only one Enemy may be Roped at a time. +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Frontier Rivals",
          "requires": "Living Off the Land",
          "value": "You are now +1 Damage on all Attacks vs Tribal, Outlaw, or Beast Enemies, and gain +25 XP for each you kill. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Frontier Vendetta",
          "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "name": "Giddy-Up!",
          "requires": "Shake It Off",
          "value": "Once per Fight, use 1 Grit to Mount an adjacent, Large or bigger Enemy (sharing its full base). While Mounted, you may not be targeted by that Enemy and the Enemy is -1 Defense. At the end of each turn, pass a Strength 6+ test (gaining 25 XP) or dismount to an adjacent empty space."
        },
        {
          "name": "Happy Trails",
          "value": "Once per Travel, may spend 1 Grit to cancel a Travel Hazard on the D6 roll of 3+ (before any tests are made for that Travel Hazard)."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Living Off the Land",
          "value": "You gain double XP from Scavenge cards and may roll one extra die when Scavenging. Alos, for each Scavenge card drawn, Heal 1 Wound or Sanity."
        },
        {
          "name": "Living on the Edge",
          "value": "While you are at half or less of either your Health or Sanity, your Rough Rider ability triggers on a 3+ instead (or 2+ if both)."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "name": "Pale Rider",
          "requires": "Sucker Punch",
          "value": "You may now use your Rought Rider ability to Recover Grit as long as you only have 0 or 1 Grit at the start of the turn, and it may be used even while KO'd."
        },
        {
          "name": "Rough Rider",
          "value": "At the start of each Turn (or Day in Town), if you have no Grit, Recover 1 Grit on the D6 roll of 4+."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Shake It Off",
          "requires": "Fast Return",
          "value": "At the end of any turn while KO'd, use 2 Grit to Recover without rolling for Injury/Madness. Heal 2D6 (any mix) as normal. +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity. Also gain +D6 Health"
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Sucker Punch",
          "requires": "Bar Fight Vet",
          "value": "Once per turn, use 1 Grit to use your Strength value (instead of rolling) as Damage for a Combat Hit. +1 Max Grit."
        },
        {
          "name": "Take a Swing",
          "value": "Once per turn, use 1 Grit to make a Melee Attack using your Basic Combat (no Items), in addition to your normal Ranged Attack."
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
          "name": "The Deadlier the Better",
          "requires": "Brash Heroics",
          "value": "+1 Max Grit and +1 Strength."
        },
        {
          "name": "Trick Shooting",
          "type": "starting",
          "value": "Use 1 Grit when you cause a Hit with a Gun to immediately cause an additional D3 other Enemies in a continuous chain, starting adjacent to the target, to also take a single Hit from that Gun"
        },
        {
          "name": "Watchman",
          "type": "starting",
          "value": "You always Activate before Enemies at your Initiative level.  Also all Heroes in your Posse gain +2 Initiative during the first turn of an Ambush Attack. Extra Starting Gear: Rider's Rifle (replaces Pistol)"
        },
        {
          "name": "Who Wants to Live Forever?",
          "requires": "The Deadlier the Better",
          "value": "You gain +2 Shots with a 1-Handed Gun or +2 Combat (you choose), during you rActivation for every Horror Hit you took form Fear, Terror, or Unspeakable Terror this turn (max +3)."
        },
        {
          "name": "Wilderness Mastered",
          "requires": "Close Companion",
          "value": "While you have 4 or more Clothing Items Equipped (including a Hat), you are: Defense 3+"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //DRIFTER
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
      "name": "Drifter",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "Bad Ass",
          "requires": "Squint",
          "value": "Once per turn, use 2 Grit to make an extra Attack. +1 Initiative"
        },
        {
          "name": "Bitter Enemies",
          "value": "Choose one (Undead, Demon, Mutant, or Beast). Your Hits are now +2 Damage vs those Enemies and when gaining XP from them, gain an extra 10 XP."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health."
        },
        {
          "name": "Danger Magnet",
          "value": "All Enemies gain 1 Elite ability for free. When traveling to town, always add an extra D3 Traveling Hazards"
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "name": "Distrustful",
          "value": "-1 Initiative for every Hero adjacent at the start of the turn (min 1)"
        },
        {
          "name": "Drifter's Secret",
          "type": "starting",
          "value": "Immortal - At the start of every Adventure, roll 2D6 for each Injury, Curse, Parasite, or Mutation the Hero has. On the roll of 7 or higher, it is healed.  Any time the Hero would be killed, they are considered dead for the rest of the Adventure/Town Stay. At the start of the next Adventure, the Hero is automatically returned to life, but must roll once on the Madness Chart and starts with no Grit."
        },
        {
          "name": "Feared by Evil",
          "requires": "Skilled Fighter",
          "value": "At the start of each turn during a Fight, choose an Enemy on your Map Tile. It immediately takes D3 Wounds."
        },
        {
          "multi": true,
          "name": "Grizzled by Time",
          "value": "At the end of every successful Mission, roll a D6. On the roll of 5+, you gain +1 Health."
        },
        {
          "name": "Gunfighter",
          "type": "starting",
          "value": "For ever 6+ you roll To Hit with a Pistol Ranged Attack, you gain +1 Shot with that Gun (max +3 Shots per turn)"
        },
        {
          "multi": true,
          "name": "Health",
          "value": "+3 Health."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "Infamous",
          "requires": "Jaded",
          "value": "All XP you gain while Traveling, in Town, or from Mission Rewards, is doubled. +1 Initiative."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Jaded",
          "value": "You gain the Keyword Outlaw and may roll an extra die for movement each turn, and choose which to use. +2 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "ranged",
              "value": -1
            }
          ],
          "name": "Long Stare",
          "requires": "Unimpressed",
          "value": "Range To Hit 2+"
        },
        {
          "name": "Long Years Experience",
          "value": "Not restricted to targeting adjacent Enemies first with Ranged Attacks. Starts with 2 Personal Items. At start of each Fight, every other non-Drifter Hero may Recover 1 Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Loose Cannon",
          "requires": "Infamous",
          "value": "Once per turn, use 1 Grit to add Damage to one of your Hits equal to your current Sanity Damage (max +5). +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "No Name",
          "type": "starting",
          "value": "The Hero has no name. Instead, the rest of the posse may decide on a nickname for the Hero. +1 Agility. Start every Adventure with Max Grit."
        },
        {
          "name": "Resourceful",
          "type": "starting",
          "value": "Any time you draw one or more Loot, Scavenge, Darkness, or Encounter cards, you may draw one extra card, then choose one of those to discard. If used for an Encounter draw, the Hero must be on the Map Tile that the Encounter is drawn for."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Restraint",
          "requires": "Sage Advice",
          "value": "At the start of every Fight, you may Heal 3 Wounds / Sanity (any mix) from each other Hero. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Sage Advice",
          "value": "Each other Hero that Activates before you during the turn may Re-roll one of their dice just rolled, of your choice. +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity. Also gain +2 Sanity."
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
          "name": "Skilled Fighter",
          "requires": "Sneer",
          "value": "+1 Combat and +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Sneer",
          "requires": "Bitter Enemies",
          "value": "You are Immune to Horror Hits caused by Enemies. +1 Max Grit."
        },
        {
          "name": "Spinning Guns",
          "requires": "Loose Cannon",
          "value": "Use 2 Grit to immediately do D6 Wounds to every adjacent Enemy, ignoring Defense."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health"
        },
        {
          "name": "Squint",
          "value": "While there are no other Heroes adjacent to you, you are Defense 3+"
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
          "name": "Strength",
          "value": "+1 Strength. Also gain +2 Sanity."
        },
        {
          "name": "True Hero",
          "requires": "Weapon of Choice",
          "value": "Once per Fight, use 3 Grit to immediately Recover a KO'd Hero on your Map Tile. +2 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Unimpressed",
          "requires": "Bad Ass",
          "value": "Any time a Growing Dread card is drawn, roll a D6. On the roll of 4+, cancel it. +1 Max Grit."
        },
        {
          "name": "Weapon of Choice",
          "requires": "Restraint",
          "value": "Choose one (Hand Weapon, Pistol, Shotgun, or Rifle). You now add +1 Combat/ +1 Shot to any Weapon you are using with that Keyword."
        }
      ],
      "wealth": 0,
      "willpower": 3,
      "xp": 0
    },
    { //RANCHER
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
      "name": "Rancher",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Combat",
          "value": "+1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "name": "Dark Stone Trap",
          "requires": "Refinement",
          "value": "Use 2 Grit to drop a Dark Stone in an adjacent space during your Move. As an Attack, detonate it doing 2D6 Damage to all models in the same and adjacent spaces."
        },
        {
          "name": "Deadly Shot",
          "requires": "Sharpshooter",
          "value": "Your Critical Hits with a Gun are +3 Damage"
        },
        {
          "name": "Dressed for Adventure",
          "value": "You gain +2 Health for each Clothing Item you wear. Clothing Items do not count weight against your Carrying limit."
        },
        {
          "name": "Evasion",
          "value": "You may roll 2 dice for Escape tests and pick the highest roll."
        },
        {
          "name": "Farmstead Defender",
          "type": "starting",
          "value": "If there are no Enemies adjacent to you, you may Re-roll one missed To Hit roll per turn."
        },
        {
          "name": "Fisticuffs",
          "requires": "Is That All You've Got?",
          "value": "Once per Fight, you may add +1 Damage to all your Combat Hits."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Forge Works",
          "requires": "Void Enhancement",
          "value": "While at the Blacksmith in Town, you may pay $500 less for any Upgrades purchased at the Dark Stone Forge. +1 Strength."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity."
        },
        {
          "name": "Home Remedies",
          "type": "starting",
          "value": "Use 1 Grit to Heal D6 Wounds from yourself or another adjacent Hero (gain 5 XP for every Wound healed from another Hero this way)."
        },
        {
          "name": "I've Seen Worse!",
          "requires": "Life Goes On",
          "value": "Use 2 Grit whie KO'd to Heal D6+2 Wounds/Sanity (any mix) and place your model back on the board."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Iron Concentration",
          "value": "Once per turn, you may Re-roll a single damage roll for one of your Gun Hits."
        },
        {
          "modifiers": [
            {
              "affects": "willpower",
              "value": -1
            }
          ],
          "name": "Is That All You've Got?",
          "requires": "Ready for Action",
          "value": "Willpower 3+"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Life Goes On",
          "requires": "Dressed for Adventure",
          "value": "You are now +1 Initiative for each Mutation you have (max +3). +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Rapid Reload",
          "requires": "Iron Concentration",
          "value": "You get +1 Shot with any 2-Handed Gun."
        },
        {
          "name": "Rapid Shot",
          "value": "2-Handed. Anytime you kill an Enemy with a 2-Handed Gun, you immediately gain +1 Shot with that Gun."
        },
        {
          "name": "Ready for Action",
          "value": "You may now carry twice as many Tokens in your Side Bag"
        },
        {
          "name": "Refinement",
          "requires": "Forge Works",
          "value": "You may use 12 Dark Stone to fill an Upgrade Slot on a Gun or Hand Weapon. That Item is now +1 Damage and has 1 Dark Stone."
        },
        {
          "name": "Sharpshooter",
          "requires": "Rapid Reload",
          "value": "Any time you kill an Enemy with a Gun, you may immediately do D6 Damage to anoter Enemy in one of the three spaces behind it."
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
          "name": "Shrug It Off",
          "requires": "Fisticuffs",
          "value": "Defense 3+. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "name": "Swinging Rifle",
          "type": "starting",
          "value": "Use 1 Grit during your Activation to do 1 automatic Combat Hit to every adjacent Enemy. This does not count as your Attack. Use only while equipped with a 2-Handed Gun."
        },
        {
          "modifiers": [
            {
              "affects": "melee",
              "value": -1
            }
          ],
          "name": "Up Close and Personal",
          "requires": "I've Seen Worse!",
          "value": "Melee To Hit 3+"
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Void Enhancement",
          "value": "Once per turn, you may use a Dark Stone to add +D6 Damage to one of your Hits. +1 Max Grit."
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //US MARSHAL
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
      "name": "US Marshal",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "A Story to Tell",
          "value": "You gain extra Movement each turn equal to your Lore. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Above the Law",
          "requires": "Look Out!",
          "value": "Use 2 Grit to ready your Marshal Badge. Limit once per Adventure. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "name": "Back Up Plan",
          "requires": "A Story to Tell",
          "value": "You may now Recover a Grit on a Move roll of 6 as well as the normal 1."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Been Around",
          "requires": "Saddle Bags",
          "value": "Any time you would take 1 or more Sanity Damage, take 1 fewer. +1 Lore."
        },
        {
          "name": "Cleaning up the West",
          "value": "Any time you kill an Enemy, you may Heal 1 Wound and 1 Sanity and gain 10 XP."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Combat",
          "value": "+1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Dead or Alive",
          "requires": "Hunter",
          "value": "Use 2 Grit to cancel a Darkness or Growing Dread card. +1 Max Grit."
        },
        {
          "name": "Double Shot",
          "value": "(Shotgun) Once per turn, when you kill an Enemy with a Shotgun, you gain +1 Shot with that Shotgun"
        },
        {
          "name": "End of the Line",
          "requires": "Dead or Alive",
          "value": "Once per turn, use 3 Grit to do one automatic Hit to every Enemy on y our Map Tile. These Hits use the D8 for Damage."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Focus",
          "value": "You no longer need to target adjacent Enemies first with Ranged Attacks. +1 Max Grit."
        },
        {
          "name": "Hardened Resolve",
          "value": "Use 1 Grit to Heal 3 Wounds or 3 Sanity from yourself or another Hero on you Map Tile (gain 5 XP for ever Wound/Sanity healed from another Hero this way). You are +2 Sanity."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity"
        },
        {
          "name": "Hunter",
          "requires": "Focus",
          "value": "At the start of each Adventure, choose a specific Enemy Type. You are +1 Damage against that Enemy and gain $10 for each you kill."
        },
        {
          "name": "I Don't Think So!",
          "requires": "No Nonsense",
          "value": "Once per turn, you may take 1 Corruption Hit to force an Enemy on your Map Tile to Re-roll a single die just rolled"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Look Out!",
          "value": "Use 1 Grit to transfer all Hits just taken by an adjacent Hero to yourself (before Defense rolls). Gain 10 XP for each Hit transferred."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "No Nonsense",
          "requires": "No Shame In It",
          "value": "Add +1 Shot to any Shotgun you are using. Rolling the same Mutation twice on the chart has no effect on you."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "No Shame In It",
          "value": "Once per turn, you may take 1 Corruption Hit to use a Dark Stone in place of a Grit. +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "One Man Army",
          "requires": "Whirling Strike",
          "value": "While you are the only Hero on your Map Tile, you gain +1 Combat or +1 Shot with a Gun. +1 Max Grit."
        },
        {
          "name": "Rolling Thunder",
          "value": "Anytime you kill an Enemy, you may Recover a Grit on the D6 roll of 4, 5, or 6."
        },
        {
          "name": "Saddle Bags",
          "requires": "Back Up Plan",
          "value": "You may now carry an extra 3 Tokens in your Side Bag."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)"
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "That Does It!",
          "requires": "I Don't Think So!",
          "value": "Your Hits are +1 Damage for each Mutation you have (max +3). +1 Strength."
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose a specific Enemy Type. From now on, any time you collect XP from that Enemy Type, collect an addition +10 XP."
        },
        {
          "name": "Whirling Strike",
          "requires": "Above the Law",
          "value": "Use 2 Grit as an Attack to roll your full Combat against every adjacent Enemy."
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //GAMBLER
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
      "classId": "47aE4QTcdX3bs6J4YoZr",
      "combat": 2,
      "corruption": {
        "current": 0,
        "max": 5
      },
      "darkstone": 0,
      "defense": 4,
      "fortune": {
        "current": 3,
        "max": 3
      },
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
          "cost": 100,
          "description": "Range 6, Shots 2",
          "hands": 1,
          "keywords": "Gear, Gun, Pistol",
          "name": "Pistol",
          "slots": 2,
          "source": "Starting Gear",
          "weight": 1
        },
        {
          "name": "Gambling Trick"
        },
        {
          "name": "Fortune's Favor"
        }
      ],
      "keywords": "Performer, Showman",
      "level": 1,
      "melee": 5,
      "movement": 0,
      "name": "Gambler",
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
        "Lore": 2,
        "Luck": 3,
        "Spirit": 1,
        "Strength": 2
      },
      "tricks": [
        {
          "desc": "This is a description",
          "name": "Trick Name"
        }
      ],
      "upgrades": [
        {
          "name": "Fancy Footwork",
          "type": "starting",
          "value": "You may roll and extra die for Move each turn and choose which to use. If doubles are rolled on your Move dice, also recover 1 Fortune token"
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "name": "Side Bet",
          "type": "starting",
          "value": "+1 Luck. When making any Skill test, if you roll 3 of a kind, recover 1 Fortune token. However if you roll three 1s, lose D3 Fortune tokens instead"
        },
        {
          "name": "High Roller",
          "type": "starting",
          "value": "Your To-Hit rolls of 6+ do +1 Damage. Whenever you recover a Grit, you may also recover 1 Fortune token."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "name": "Nimble Fingers",
          "value": "New Gambling Trick. +1 Agility"
        },
        {
          "modifiers": [
            {
              "affects": "movement",
              "value": 1
            }
          ],
          "name": "On a Roll",
          "value": "Whenever you kill an Enemy, you may recover 1 Fortune token. +1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "name": "Well, I Say!",
          "value": "1x per Adventure, you may recover Fortune tokens up to your max. +1 Lore"
        },
        {
          "modifiers": [
            {
              "affects": "fortune",
              "value": 1
            }
          ],
          "name": "Play to Win",
          "value": "Your Poker Face ability now gives a bonus D6+2 x $50 instead, but also gives you and extra Unwanted Attention marker. +1 Fortune"
        },
        {
          "modifiers": [
            {
              "affects": "Fortune",
              "value": 1
            }
          ],
          "name": "Tell",
          "requires": "Nimble Fingers",
          "value": "For each To Hit roll of 1 an Enemy rolls when attacking you, you may cancel one of its other successful To Hit rolls on you. +1 Fortune"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "name": "Box Cars",
          "requires": "On a Roll",
          "value": "Any time you roll a 6 for Willpower, Defense, or any skill test, you may change any other single die of that test into a 6 as well. +1 Initiative"
        },
        {
          "name": "Affectation",
          "requires": "Well, I Say!",
          "value": "At the start of each Adventure, you may draw a random Personal Item to use until the end of that Adventure"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "name": "Cutthroat",
          "requires": "Play to Win",
          "value": "You add +1 Shot and +1 Damage to any Light Gun you use. +1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "name": "Old Hand",
          "requires": "Tell",
          "value": "New Gambling Trick. +1 Cunning"
        },
        {
          "modifiers": [
            {
              "affects": "fortune",
              "value": 1
            }
          ],
          "name": "Blow for Luck",
          "requires": "Box Cars",
          "value": "1x turn, you may spend 1 Grit to recover 1 Fortune or vice versa. +1 Fortune"
        },
        {
          "name": "Fancy Pants",
          "requires": "Affectation",
          "value": "You are +1 Sanity and +1 Health for each of the following Clothing items you have equipped: Hat, Belt, Coat, Pants, Torso, Gloves, Boots. You may not stay at the Camp Site in Town."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            },
            {
              "affects": "defense",
              "value": -1
            }
          ],
          "name": "Full House",
          "requires": "Cutthroat",
          "value": "+1 Cunning and Defense 3+"
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "name": "Make Your Own Luck",
          "requires": "Old Hand",
          "value": "You start every Adventure with a Revive token, usable only by you. Gain 25 XP any time you use it. +1 Luck"
        },
        {
          "name": "Let It Ride",
          "requires": "Blow for Luck",
          "value": "Any time you roll 4 or more dice together, you may choose any number of those dice to re-roll once. These dice do not count as having been re-rolled."
        },
        {
          "modifiers": [
            {
              "affects": "fortune",
              "value": 1
            }
          ],
          "name": "Entourage",
          "requires": "Fancy Pants",
          "value": "You only need to pay 50% of the base 'Cost to Hire' for any Allies. All Items and tokens in Town cost you 20% less (rounding up to nearest $5). +1 Fortune"
        },
        {
          "name": "Aces High",
          "requires": "Full House",
          "value": "If your Cunning is higher than an Enemy's Initiative, you are +1 on To-Hit rolls assigned to that Enemy (6+ is a Critical Hit)"
        },
        {
          "multi": true,
          "name": "Of Many Talents",
          "roll": 2,
          "value": "At the start of each Adventure, choose one of the following keywords to have until the end of that Adventure: Traveler, Frontier, Outlaw, Soldier, Strange"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Cunning",
          "roll": 3,
          "value": "+1 Cunning"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Initiative",
          "roll": 4,
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Strength",
          "roll": 5,
          "value": "+1 Strength, +D6 Health/Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "movement",
              "value": 0
            },
            {
              "affects": "Spirit",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Move or +1 Spirit",
          "roll": 6,
          "value": "+1 Move or +1 Spirit, +D6 Health"
        },
        {
          "modifiers": [

          ],
          "multi": true,
          "name": "Health and Sanity",
          "roll": 7,
          "value": "+D6 Health and +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "movement",
              "value": 0
            },
            {
              "affects": "Lore",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Move or +1 Lore",
          "roll": 8,
          "value": "+1 Move or +1 Lore, +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 2
            }
          ],
          "multi": true,
          "name": "+2 Side Bag Capacity",
          "roll": 9,
          "value": "+1 Side Bag Capacity and +D6 Health"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Max Grit",
          "roll": 10,
          "value": "+1 Grit"
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Luck",
          "roll": 11,
          "value": "+1 Luck"
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "roll": 12,
          "value": "You can now hold 2 more Corruption Points before mutating"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //JARGONO NATIVE
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
      "name": "Jargono Native",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "name": "Ancestor's Favor",
          "requires": "Tribal Warrior",
          "value": "Whenever you kill a Large or bigger Enemy, you may move the Darkness back one space on the Depth Track (does not trigger special spaces moved back through). +1 Spirit."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Battle Stance",
          "value": "Whenever one or more Enemy groups are placed in Ambush, Recover 1 Grit. +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Deep Cuts",
          "requires": "Quick Shot",
          "value": "You may double the Endurance value of any Enemy while Attacking it. +1 Strength."
        },
        {
          "name": "Enemy Tracks",
          "value": "Once per Adventure, use 1 Grit to switch Attack (or Ambush) on an Exploration Token into 2x Encounters instead. The rest of the Token remains the same."
        },
        {
          "multi": true,
          "name": "Fighting Style",
          "value": "Choose a specific Enemy Type. From now on you take 1 less Damage from any Attack made by an Enemy of that Type (minimum 1)."
        },
        {
          "name": "Fungus Grower",
          "requires": "Stealth Strike",
          "value": "You gain 1 Swamp Fungus Side Bag Token at the start of each Adventure."
        },
        {
          "name": "Fury of Jargono",
          "requires": "Mighty Swing",
          "value": "Once per Fight, use 2 Grit to make an extra Attack this Activation. +2 Max Grit."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "melee",
              "value": -1
            }
          ],
          "name": "Honored Champion",
          "requires": "Shield Charge",
          "value": "Melee To Hit 3+"
        },
        {
          "name": "Hunter's Reflexes",
          "value": "You are +1 Damage on all of your Attacks against Beast Enemies. Also, gain +2 Initiative in the first turn of an Ambush Attack"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Jumping Attack",
          "value": "Once per Fight, you may spend un-used movement points from your Move to add Damge to one of your Combat Hits. Ever 2 Move = +1 Damage."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore (Health or Sanity)",
          "value": "+1 Lore. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Lore (Health)",
          "value": "+1 Lore. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Health."
        },
        {
          "name": "Master of the Hunt",
          "requires": "Deep Cuts",
          "value": "You gain +2 Combat and +2 Shots with any Bow you are using, while there are one or more Extra Large (or bigger) Enemies on the board."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
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
          "name": "Mighty Swing",
          "requires": "Spinning Slash",
          "value": "+1 Combat and +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "move"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Other World Native (Jargono)",
          "value": "Starts with a Swamps of Jargono Personal Item instead of a normal Personal Item. Also, +3 Lore while in Swamps of Jargono."
        },
        {
          "name": "Pit Fighter",
          "type": "starting",
          "value": "If you start your Activation adjacent to one or more Enemies, Recover a Grit on the D6 roll of 5+. Also, once per turn, while you have a Shield equipped, you may force one Enemy Hit just rolled against you to be Re-rolled."
        },
        {
          "name": "Primitive",
          "value": "You may not use Guns, Books, or Tech items"
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
          "name": "Quick Shot",
          "requires": "Enemy Tracks",
          "value": "You may add +1 Shot to any Bow you are using. +1 Initiative and +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": 1
            }
          ],
          "name": "Serpent Slayer",
          "type": "starting",
          "value": "You are +1 Move and may move through other models. You are also immune to Poison markers. Extra Starting Gear: Dark Stone Daggers (replaces Tribal Shield and Dark Stone Blade)"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Shield Bash",
          "requires": "Battle Stance",
          "value": "While you have a Shield equipped, you are +1 Combat. +1 Max Grit."
        },
        {
          "name": "Shield Charge",
          "requires": "Shield Bash",
          "value": "Use 1 Grit, while you have  Shield equipped, to move through other models this turn. Each model moved through takes 2 Wounds, ignoring Defense (limit once per model)."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "Spinning Slash",
          "requires": "Jumping Attack",
          "value": "While you have a 2-Handed Item Hand Weapon equipped, you are +1 Damage with Combat Hits. +1 Initiative."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Stealth Strike",
          "value": "Your Critical Hits are +1 Damage and you are +1 to all Escape rolls. +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "ranged",
              "value": -1
            }
          ],
          "name": "Treetop Hunter",
          "type": "starting",
          "value": "Ranged To Hit: 4+.  Double-shot (Bow) - Once per turn, when you kill an enemy with a Bow, you gain +1 Shot with that Bow. Extra Starting Gear: Jargono Bow (replaces Tribal Shield)"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Tribal Warrior",
          "requires": "Fungus Grower",
          "value": "You are +2 Health for each Tribal Item you have (max +10). +1 Strength."
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //INDIAN SCOUT
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
      "name": "Indian Scout",
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
          "name": "Agility",
          "value": "+1 Agility. Also gain 2 Health and +2 Sanity."
        },
        {
          "name": "Battle Scout",
          "value": "Once per Adventure, give all other Heroes +2 Initiative unti the end of the turn. You may Recover 1 Grit."
        },
        {
          "name": "Cavalry Scout",
          "type": "starting",
          "value": "You may roll 2 dice for Move each turn and choose which to use."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Cleansing Ritual",
          "requires": "Guardian Spirit",
          "value": "Use 2 Grit to remove a Corruption Point from yourself or an adjacent Hero. +1 Max Grit."
        },
        {
          "name": "Counting Trophies",
          "requires": "Warrior's Heart",
          "value": "Once per Adventure, you may Heal Sanity Damage equal to the number of Enemies you have killed during this Mission. This may be Healed from any mix of Heroes."
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
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +2 Health and +2 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Duck and Roll",
          "requires": "Moves in the Shadows",
          "value": "Use 2 Grit to ignore all damage just done to you by a single source. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "name": "Eye for Detail",
          "requires": "Know Your Prey",
          "value": "When you successfully Scavenge, you may draw one extra card, then choose one to discard. +1 Cunning."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "name": "Fast",
          "value": "+1 Move"
        },
        {
          "name": "Guardian Spirit",
          "requires": "Voices of the Ancestors",
          "value": "Once per Adventure, you may cancel a Growing Dread or Darkness card on the D6 roll of 3+."
        },
        {
          "modifiers": [
            {
              "affects": "health",
              "value": 3
            },
            {
              "affects": "sanity",
              "value": 3
            }
          ],
          "multi": true,
          "name": "Health and Sanity",
          "value": "+3 Health and +3 Sanity."
        },
        {
          "name": "Heightened Senses",
          "type": "starting",
          "value": "Once per turn you may Re-roll a single To Hit roll or Defense roll."
        },
        {
          "name": "I Smell Death Here!",
          "requires": "Eye for Detail",
          "value": "Once per turn, use 1 Grit to discard and re-draw a Threat card just drawn. Gain 25 XP."
        },
        {
          "name": "Know Your Prey",
          "requires": "This Way",
          "value": "Once per turn, you may Re-roll a Damage roll for one of your Hits."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +2 Health and +2 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +2 Health and +2 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Moves in the Shadows",
          "requires": "Pass Through",
          "value": "You are now Defense 3+ during the first turn of the Fight."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Pass Through",
          "value": "You may now roll 2 dice for Escape tests and choose which roll to use. +1 Agility."
        },
        {
          "name": "Savage Attack",
          "type": "starting",
          "value": "Use 1 Grit to gain +2 Combat until the end of your turn (Limit once per turn)."
        },
        {
          "name": "Shadow Strike",
          "requires": "Duck and Roll",
          "value": "Once per Adventure, transfer 2D6 Wounds from yourself to an adjacent Enemy, ignoring Defense."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity"
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +2 Health and +2 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain 2 Health and +2 Sanity."
        },
        {
          "name": "This Way",
          "value": "Once per turn, use 1 Grit to discard and re-draw a Map card just drawn."
        },
        {
          "name": "Tracker",
          "value": "Once per Adventure, you may discard and Re-draw an Exploration Token or Encounter card just revealed."
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "name": "Vengeful Spirits",
          "requires": "Cleansing Ritual",
          "value": "Once per Fight, use 2 Grit to do one automatic Hit to ever Enemy on your Map Tile. Heal 1 Sanity Damage for each Hit done."
        },
        {
          "name": "Voices of the Ancestors",
          "value": "You may take 4 Sanity Damage, ignoring Willpower to Recover a Grit"
        },
        {
          "name": "Warrior's Heart",
          "requires": "Warrior's Spirit",
          "value": "Spirit Armor 5+"
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "name": "Warrior's Spirit",
          "requires": "Battle Scout",
          "value": "You may now Activate before Enemies at your Initiative level. +1 Spirit."
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //FRONTIER DOC
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
      "name": "Frontier Doc",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Anatomy",
          "requires": "Careful Study",
          "value": "You get Critical Hits on To Hit rolls of 5+ against Enemy Types you have encountered before. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Antidote",
          "value": "Use 1 Grit to let every Hero on your Map Tile choose: Discard all Poison Markers or Discard 1 Corruption Point on D6 roll of 4+. +1 Lore."
        },
        {
          "name": "Battlefield Experience",
          "type": "starting",
          "value": "You may move through other models during your movement and you automatically pass all Escape tests. At the start of every Fight, Recover 1 Grit"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Careful Study",
          "requires": "Dissection",
          "value": "You are +1 on Defense rolls against HIts from your Enemy Types you have encountered before. +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Chemistry",
          "requires": "Ingenuity",
          "value": "Use 1 Grit and discard any 2 different Side Bag Tokens to create a dynamite token. +1 Max Grit."
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
          "name": "Conclusions",
          "requires": "Anatomy",
          "value": "+1 Cunning and +1 Initiative and Defense 4+."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "name": "Dispassionate",
          "requires": "Treatment",
          "value": "You are immune to the Enemy abilities Fear and Terror. +1 Combat."
        },
        {
          "name": "Dissection",
          "value": "Once per turn, when you kill an Enemy with a Combat Hit, Recover a Grit on the D6 roll of 4+. +3 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "name": "Do No Harm",
          "requires": "Hold Them Down",
          "value": "There is no longer a penalty for a 1 result when using Field Surgery. +1 Luck."
        },
        {
          "multi": true,
          "name": "Doc's Speciality",
          "value": "Choose another Hero class. From now on, any time you Heal Wounds from a Hero of that Class, Heal an extra +1 Wound and +1 Sanity Damage from them."
        },
        {
          "name": "Expert Surgeon",
          "type": "starting",
          "value": "When using your Field Surgery ability, the Injury/Mutation is Healed on the D6 roll of 4+ now. Extra Starting Gear: Surgeon's Saw."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Explorer",
          "requires": "Do No Harm",
          "value": "While in an Other World, you roll 1 extr die on all Skill tests and, at the start of your Acctivation each turn, you Recover a Grit on the D6 roll of 4+. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Explorer's Notes",
          "value": "Choose an Other World. From now on, any time you collect XP in that world, collect an extra +5 XP."
        },
        {
          "name": "Field Research",
          "type": "starting",
          "value": "The first time you encounter a new specific Enemy Type, gain 50 XP (variations count as a new type). Your Attacks are +1 Damage against all Enemy Types you have ever encountered in previous Fights. Extra Starting Gear: Collection Jar."
        },
        {
          "name": "Field Surgery",
          "value": "Once per Adventure or Town Stay, use 1 Grit to choose an Injury or Mutation on another Hero and roll a D6. On 5+, that Injury/Mutation is Healed (gain 50 XP). On 1, the Hero loses 1 Health Permanently instead. May not be used during a Fight."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "name": "Gadgeteer",
          "requires": "Tinkerer",
          "value": "Once per Fight, you may add a number of Damage to one of your Hits equal to the number of Tech Items you currently carry (max +10). +1 Cunning."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Heal Thy Self",
          "requires": "Dispassionate",
          "value": "You automatically Heal 2 Wounds at the start of every turn. You may also use Field Surgery on yourself now. +1 Strength."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+2D6 Health/Sanity (any mix)."
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
          "name": "Hold Them Down",
          "requires": "Antidote",
          "value": "+1 Combat and +1 Strength."
        },
        {
          "name": "Ingenuity",
          "value": "Once per turn, when you use the effect of a Side Bag Token, you may use 1 Grit to roll a D6. On the roll of 4+, do not discard the Side Bag Token."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "name": "Medical Training",
          "value": "When using Bandages Tokens to Heal yourself or another Hero, add +3 to the roll (or +5 at Hero Level 5 or higher)"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move. Also gain +D8 Sanity."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D8 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength."
        },
        {
          "name": "Tinkerer",
          "requires": "Chemistry",
          "value": "Use 2 Grit to add the following UPgrade to an Item you are carrying: Gadget (1 Upgrade Slot). The Item gains the Keyword Tech and grants +1 Health (or +1 Damage if a Hand Weapon or Gun)."
        },
        {
          "name": "Treatment",
          "requires": "Triage",
          "value": "You now gain 10 XP for each Wound Healed from another Hero. Also once per turn, you may remove 1 status effect marker from yourself or an adjacent Hero."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Triage",
          "value": "Whenever you Heal Wounds from another Hero, Reocver a Grit on the D6 roll of 4+. +1 Max Grit."
        }
      ],
      "wealth": 0,
      "willpower": 3,
      "xp": 0
    },
    { //PROSPECTOR
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
      "name": "Prospector",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility.  Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "name": "All Mine!",
          "requires": "It's Mine!",
          "value": "While carrying 4 or more weight worth of Items, you are Defense 3+."
        },
        {
          "name": "Blast Miner",
          "type": "starting",
          "value": "Start every Adventure with 1 free Dynamite Token in your sidebag. You also gain: Free Attack (once per Fight) - Throw Dynamite"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Crazed",
          "requires": "Impressive Facial Hair",
          "value": "While at half or less Sanity, your Attacks are +1 Damage. +1 Max Grit."
        },
        {
          "name": "Crotchety",
          "value": "May not use Guns or Tech items"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Dark Stone Life",
          "requires": "Gold Fever",
          "value": "Your Attacks are +1 Damage for every Mutation you have (max +3). +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "name": "Death Blow",
          "value": "The Hero's To Hit rolls of 8+ double the Damage rolled for that Hit. Only usable with weapons that use D8 for To Hit rolls"
        },
        {
          "name": "Eagle Eye",
          "type": "starting",
          "value": "You may Scavenge a Map Tile even if it already has a Scavenged marker on it (Limit one extra Scavenge per Map Tile). Roll one extra die when Scavenging."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "name": "Every Rock",
          "value": "You may now Scavenge End Caps as though they were full Map Tiles (not including Gates). +1 Move."
        },
        {
          "name": "Expert Miner",
          "value": "Whenever the Hero collects Gold or Dark Stone from Loot, Scavenge, or Encounter cards, double the amount collected."
        },
        {
          "name": "Gold Fever",
          "requires": "Crazed",
          "value": "During an Adventure, once per turn, when collecting Gold, you may Recover 1 Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Good Find!",
          "value": "After any Hero in the Posse collects Gold from a Loot or Scavenge card, they may collect an extra $25. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Greedy",
          "requires": "Wheeler Dealer",
          "value": "When drawing Loot cards, you may spend 1 Grit to discard and Re-draw any number of them. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity"
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
          "name": "Hearty Swing",
          "requires": "Staking Claims",
          "value": "+1 Combat and +1 Agility"
        },
        {
          "name": "Impressive Facial Hair",
          "value": "Once per adventure, you may tug at your facial hair to Recover Grit up to your Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "It's Mine!",
          "requires": "Greedy",
          "value": "You gain the Keyword Outlaw and may now use Shotgun Ranged Weapons. +1 Initiative."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "name": "Lucky Bugger",
          "requires": "Every Rock",
          "value": "When using your Expert Miner ability, you may make a Luck 6+ test. If passed, Triple the amount collected. +1 Luck"
        },
        {
          "name": "Master Scavenger",
          "requires": "Squint Eye",
          "value": "After Scavenging, you may spend 1 Grit to set aside a Scavenge card drawn. That card is removed from the deck until the end of the Adventure (Limit 4 cards)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "multi": true,
          "name": "Miner's Vendetta",
          "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "name": "Mining Guide",
          "requires": "Hearty Swing",
          "value": "Once per turn, while holding the Lantern, you may spend 1 Grit to Re-roll one of the dice for the Hold Back the Darkness roll."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity. Also gain +D6 Health"
        },
        {
          "name": "Speed of Greed",
          "type": "starting",
          "value": "Once per turn, use 1 Grit to double your Initiative and Move, as well as allowing you to automatically pass all Escape tests. Also your Combat Hits are +1 Damage until the end of that turn."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Squint Eye",
          "requires": "Lucky Bugger",
          "value": "Once per turn after drawing a Gear or Artifact card, you may discard it and Re-draw. +1 Max Grit."
        },
        {
          "name": "Staking Claims",
          "requires": "Good Find!",
          "value": "Once per Adventure, you may cancel and Re-draw an Exploration Token. When selling Gear or Artifact cards in Town, gain an extra D6 x $50"
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
          "name": "Strength and Luck",
          "value": "+1 Strength and +1 Luck. Also gain D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "name": "Wheeler Dealer",
          "value": "You may buy Side Bag Tokens in town for half price (round up to nearest $5). +1 Initiative."
        }
      ],
      "wealth": 0,
      "willpower": 5,
      "xp": 0
    },
    { //LAW MAN
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
      "name": "Law Man",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "name": "Battle Plan",
          "requires": "Teamwork",
          "value": "Any time you roll a 1 for Move, all Heroes on your Map Tile may Recover 1 Grit. Gain 15 XP for each Grit Recovered."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Cold Stare",
          "value": "You may now Activate before Enemies at your Initiative Level. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Combat",
          "value": "+1 Combat"
        },
        {
          "name": "Cool Head",
          "requires": "Relentless",
          "value": "When using Laying Down the Law, you may re-roll any number of To Hit rolls."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Fair Warning",
          "value": "You do +2 Damage on any Hits to an Enemy with a higher Initiative. +1 Max Grit."
        },
        {
          "name": "Frontier Justice",
          "type": "starting",
          "value": "Use 1 Grit to add +3 Damage to one of your Hits (limit once per Hit)."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Iron Will",
          "type": "starting",
          "value": "Use 1 Grit to cancel a Darkness card on the D6 roll of 4, 5, or 6 (limit once per turn)."
        },
        {
          "name": "Judge, Jury, and Executioner",
          "requires": "Learning to Live With It",
          "value": "Use 1 Grit to make all of your Attacks get Critical Hits on rolls of 5 or 6 until the end of your turn."
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
          "name": "Justice Never Sleeps",
          "requires": "Cool Head",
          "value": "+1 Initiative and +1 Max Grit"
        },
        {
          "name": "Laying Down the Law",
          "value": "Once per Attack, you may Re-roll one To Hit roll."
        },
        {
          "name": "Learning to Live With It",
          "requires": "Long Arm of the Law",
          "value": "Any time you kill an Enemy, Heal 2 Sanity Damage."
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
          "name": "Long Arm of the Law",
          "requires": "Fair Warning",
          "value": "+1 Combat and +1 Strength and +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "name": "Man of Action",
          "value": "You may roll 2 dice for Move each turn and choose which to use."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "name": "Motivate",
          "value": "Use 1 Grit to give all other Heroes +1 Initiative and +1 Move until the end of the turn. Gain 30 XP."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Never Gives Up",
          "requires": "Temper",
          "value": "While KO'd, at the start of each turn, roll a D6. On the roll of 5 or 6, Heal D6 Wounds/Sanity (any mix) and place your model back on the board."
        },
        {
          "name": "Reassure",
          "requires": "Motivate",
          "value": "Once per turn, use 1 Grit to prevent D6 Wounds or Sanity Damage that another Hero would take. Gain 10 XP"
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
          "name": "Relentless",
          "requires": "Cold Stare",
          "value": "+1 Cunning and +1 Initiative"
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Health/Sanity (any mix)"
        },
        {
          "name": "Standing Your Ground",
          "requires": "Man of Action",
          "value": "At the start of a turn, you may reduce your Initiative to 1. If you do, you are Defense 3+ this turn."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "name": "Strong Leadership",
          "type": "starting",
          "value": "Use 1 Grit to Heal 1 Health and 1 Sanity from yourself and every other Hero on your Map Tile - Gain 5 XP for every Wound/Sanity healed from another Hero this way."
        },
        {
          "name": "Teamwork",
          "requires": "Reassure",
          "value": "Use 2 Grit to add your Skill value to another Hero's Skill for a single test. If the test is successful, gain 25 XP."
        },
        {
          "name": "Temper",
          "requires": "Standing Your Ground",
          "value": "Once per turn, use 2 Grit to add +1P Damage to one of your Hits or +2P Damage if you are at less than half Health."
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //ORPHAN
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
      "missions": [
        {
          "desc": "This is a blank mission",
          "name": "Blank Mission"
        }
      ],
      "movement": 0,
      "name": "Orphan",
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Sanity."
        },
        {
          "name": "All In",
          "requires": "Something to Prove",
          "value": "Choose one of the Starting Upgrades of your Secondary Hero Class to acquire. This includes any Gear that goes with it."
        },
        {
          "name": "Bloodlust",
          "requires": "Lash Out",
          "value": "Once per turn, when you kill an Enemy, you may Heal D6 Wounds. +5 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "name": "Dodge",
          "requires": "Hide",
          "value": "Once per turn, use 1 Grit to ignore a single Enemy Hit against you (before you roll for Defense)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Grown Up Fast",
          "value": "When rolling for Discovery on your Orphan Mission, you may roll 1 extra die, then choose one die to discard. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Hardened by the World",
          "value": "You are now +1 Damage on your To Hit rolls of 6+."
        },
        {
          "multi": true,
          "name": "Health",
          "value": "+D6 Health."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+2 Health and +2 Sanity."
        },
        {
          "name": "Hide",
          "requires": "Small Target",
          "value": "Once per Fight, if there are no Enemies adjacent to you, you may Recover 1 Grit."
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
          "name": "Hot Temper",
          "value": "+1 Combat and +1 Strength and +2 Health."
        },
        {
          "name": "I Can Handle It Myself!",
          "requires": "Over Your Head",
          "value": "Once per turn, use 1 Grit to force any single die to be Re-rolled, even if it has already been Re-rolled."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "I'm Not a Kid",
          "requires": "Grown Up Fast",
          "value": "Once per turn, you may take D3 Corruption Hits to Recover a Grit. May also be used once per Town Stay. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Lash Out",
          "requires": "Toe-to-Toe",
          "value": "Use 2 Grit to add 1P Damage to one of your Hits. +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "name": "Need for Vengeance",
          "type": "starting",
          "value": "Start each Adventure with a Revive Token only usable by your Hero"
        },
        {
          "name": "On a Mission",
          "value": "Starts with an Orphan Mission"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Over Your Head",
          "requires": "Sprint",
          "value": "While there ar eno other Heroes on your Map Tile, you are Defense 3+. +1 Max Grit."
        },
        {
          "name": "Quick",
          "value": "Always Activates before Enemies at Initiative level and automatically passes all Escape tests"
        },
        {
          "name": "Rage",
          "type": "starting",
          "value": "Once per Fight, use 1 Grit to gain: A) +1 Combat and all of your Combat Hits are +1 Damage for one Attack or B) +1 Shot with a Gun for one Attack."
        },
        {
          "name": "Running Ahead",
          "value": "Gain 5 XP x your Hero Level any time you Look Through a Doorway. +2 Move."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D6 Sanity (any mix)."
        },
        {
          "name": "Small Target",
          "value": "Once per turn, you may Re-roll a single Defense roll."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "name": "Sneak Attack",
          "requires": "Dodge",
          "value": "While there is only one Enemy adjacent to you, your attacks are +2 Damage against that Enemy. +1 Cunning."
        },
        {
          "name": "Something to Prove",
          "requires": "I'm Not a Kid",
          "value": "Any time you kill and Enemy, gain +10 XP (or +50 XP if Large or bigger). +3 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Sanity"
        },
        {
          "name": "Sprint",
          "requires": "Running Ahead",
          "value": "You may now roll the D8 for Move each turn and Recover a Grit on the roll of 1 or 8."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Toe-to-Toe",
          "requires": "Hot Temper",
          "value": "While adjacent to a Large or bigger Enemy, your attacks are +1 Damage to that Enemy (or +2 on a Critical Hit). +1 Max Grit."
        },
        {
          "name": "Wiley",
          "type": "starting",
          "value": "Armor 6+. You may move through other models during your movement."
        },
        {
          "name": "Young",
          "value": "May not Dual Wield Guns. Unless KO'd, may Heal 1 Wound or 1 Sanity Damage at the start of each turn"
        }
      ],
      "wealth": 0,
      "willpower": 3,
      "xp": 0
    },
    { //SALOON GIRL
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
      "name": "Saloon Girl",
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
      "upgrades": [
        {
          "name": "Acrobatic Dodge",
          "type": "starting",
          "value": "You may move through other models during your movement. Once per turn you may Re-roll one failed Defense roll."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Combat",
          "value": "+1 Combat"
        },
        {
          "name": "Comforting Presence",
          "value": "At the end of Hero Turn, you may Heal 1 Wound or 1 Sanity from every other adjacent Hero (gain 5 XP for each Healed this way)"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": "2"
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "value": "You can now hold 2 more Corruption Points before gaining a Mutation."
        },
        {
          "name": "Dirty Fightin'",
          "type": "starting",
          "value": "All of your Attacks are +1 Damage"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "name": "Fast",
          "value": "+1 Move"
        },
        {
          "name": "Fast as Lightning",
          "requires": "Slip By",
          "value": "Free Attack: Once per Fight, use during your Move. Do 1 Hit each to up to 3 Enemies adjacent to you."
        },
        {
          "name": "Gentle Manner",
          "value": "You now gain an extra +5 XP per Wound/Sanity that you Heal from another Hero. +3 Sanity."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+3 Health and +3 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "name": "Hidden Pouch",
          "requires": "Witty Retort",
          "value": "You may carry up to 3 extra Side Bag Tokens. +1 Cunning."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Hit 'Em Where It Hurts",
          "requires": "Never a Dull Moment",
          "value": "Use 1 Grit to ignore an Enemy's Defense for one of your Hits. No effect on Tough Enemies. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "I Can Take Care of Myself!",
          "requires": "Parry",
          "value": "Once per Adventure, prevent all Damage you would take from a single source. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "name": "Knockout Punch",
          "type": "starting",
          "value": "Use 1 Grit to double the amount just rolled on one of your Damage rolls (Limit once per Hit)."
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
          "name": "Light on Your Feet",
          "requires": "Sleight of Hand",
          "value": "+1 Initiative and +1 Agility and +1 Move."
        },
        {
          "name": "Lightweight",
          "value": "May only use Guns that have the keyword Light"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore (Health)",
          "value": "+1 Lore. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore (Sanity)",
          "value": "+1 Lore. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck (Sanity)",
          "value": "+1 Luck. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Never a Dull Moment",
          "requires": "Rough and Tumble",
          "value": "Any time you roll a No Event result on a Town Location Chart, gain 25 XP and D6 x $10. +1 Lore."
        },
        {
          "name": "Parry",
          "requires": "Spinning Kick",
          "value": "Any time an adjacent Enemy rolls a 1 To Hit you, do 1 Wound to it, ignoring Defense."
        },
        {
          "name": "Rapid Strike",
          "requires": "I Can Take Care of Myself!",
          "value": "Any time you kill an Enemy with a Combat Hit, you gain +1 Combat for that Attack."
        },
        {
          "name": "Rough and Tumble",
          "requires": "Spunky",
          "value": "You may now use any 1-Handed Gun. +3 Health."
        },
        {
          "name": "Sleight of Hand",
          "value": "Use 1 Grit to Ready a Once Per Fight Item you are carrying. You may also roll an extra die for Scavenging."
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Slip By",
          "requires": "Light on Your Feet",
          "value": "You automatically succeed at all Escape tests. +1 Agility."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Spinning Kick",
          "value": "Use 1 Grit to do 2 Wounds to an adjacent Enemy, ignoring Defense. You may move them up to 2 spaces (unless Large). +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Spunky",
          "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "name": "What You Least Expect",
          "requires": "Hidden Pouch",
          "value": "Melee To Hit 3+"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Witty Retort",
          "requires": "Gentle Manner",
          "value": "Once per turn when you kill an Enemy you may Heal 2 Wounds. +1 Max Grit."
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //WANDERING SAMURAI
      "abilities": [
        {
          "desc": "Starts with 2 Random Wanderer Samurai Battle Tactics (draw 3, choose 2). Battle Tactics may each only be used 1x turn",
          "name": "Samurai Battle Tactics"
        },
        {
          "desc": "Any time you do 1 or more Wounds to an Enemy with a Combat Hit, gain 1 Fury token",
          "name": "Battle Fury"
        },
        {
          "desc": "May not use Guns or Explosives and may not voluntarily Flee from an Adventure (though the rest of the Posse may Flee without you)",
          "name": "Code of Honor"
        }
      ],
      "classId": "M1qfgZTa78yjAmoEspsh",
      "combat": 2,
      "corruption": {
        "current": 0,
        "max": 5
      },
      "darkstone": 0,
      "defense": 3,
      "faith": 0,
      "fury": {
        "current": 0,
        "max": 5
      },
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
          "name": "Wanderer's Katana",
          "source": "Starting Gear"
        }
      ],
      "keywords": "Traveler, Showman, Samurai",
      "level": 1,
      "melee": 3,
      "movement": 0,
      "name": "Wandering Samurai",
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
        "Cunning": 3,
        "Lore": 2,
        "Luck": 2,
        "Spirit": 2,
        "Strength": 3
      },
      "tactics": [
        {
          "desc": "This is a description",
          "name": "Tactic Name"
        }
      ],
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "fury",
              "value": 1
            },
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "name": "Ronin",
          "type": "starting",
          "value": "+1 Max Fury and +1 Strength. When drawing Loot cards, you may draw one extra and choose one to discard. May not use Samurai Battle Tactics that have the keyword Healing. Extra Starting Gear: Samurai Armor, Ronin's Helmet"
        },
        {
          "name": "Quiet Traveler",
          "type": "starting",
          "value": "Gain D3+1 Fury at the start of every Fight. Your 2-H Hand Weapons only take up 1-H for you to use"
        },
        {
          "name": "Sword Master",
          "type": "starting",
          "value": "Rapid Strike (Blade) - Any time you kill an Enemy with a Combat Hit using a Blad Hand Weapon, you immediately gain +1 Combat for that Attack (limit +3)"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "name": "Battle Ready",
          "value": "New Wanderer Samurai Tactic; +1 Agility"
        },
        {
          "modifiers": [
            {
              "affects": "fury",
              "value": 1
            }
          ],
          "name": "Battle Yell",
          "value": "Any time you kill an Enemy with a Combat Hit, gain +1 Fury"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "name": "Control Discipline",
          "value": "While using a 2-H blade, you may use the D8 for your Combat Damage. +1 Cunning"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            },
            {
              "affects": "Move",
              "value": 1
            }
          ],
          "name": "On the Road",
          "value": "You may start every Adventure with a free Fire Sake token. +1 Lore and +1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "name": "Fighter's Training",
          "requires": "Battle Ready",
          "value": "New Wanderer Samurai Battle Tactic. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "fury",
              "value": 1
            }
          ],
          "name": "Extra Effort",
          "requires": "Battle Yell",
          "value": "1x turn you may spend 2 Fury each to add extra dice to any Skill test you are making. +1 Max Fury"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "name": "Power Discipline",
          "requires": "Control Discipline",
          "value": "1x turn while using a Blade, you may spend 5 Fury to add D6 Damage to one of your Combat Hits. +1 Strength"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "name": "Calm Exterior",
          "requires": "On the Road",
          "value": "1x turn, you may spend 2 Grit to gain Peril Die Fury. +1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": 1
            }
          ],
          "name": "Warrior's Resolve",
          "requires": "Fighter's Training",
          "value": "New Wanderer Samurai Battle Tactic. +1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            },
            {
              "affects": "fury",
              "value": 1
            }
          ],
          "name": "Unleashed",
          "requires": "Extra Effort",
          "value": "1x Adventure, gain Fury up to your Max Fury for free. +1 Max Grit and +1 Max Fury"
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": 1
            }
          ],
          "name": "Mental Discipline",
          "requires": "Power Discipline",
          "value": "1x Fight, at the start of a turn, you may reduce your Init by any amount (min 1). Gain Fury equal to this amount. +1 Spirit"
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": 1
            }
          ],
          "name": "Don't Make Him Angry",
          "requires": "Calm Exterior",
          "value": "1x Travel, you may spend 1 Grit to cancel a Travel Hazard (before any dice are rolled for it). +1 Combat"
        },
        {
          "name": "Master of War",
          "requires": "Warrior's Resolve",
          "value": "At the start of each Adventure, draw a temporary Wanderer Samurai Battle Tactic. This is one use, only for this Adventure that may be played without spending Fury."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "name": "Master of Fury",
          "requires": "Unleashed",
          "value": "Any time you spend Fury, add 1 extra Fury to the total spent for free. +1 Initiative"
        },
        {
          "name": "Flashing Steel",
          "requires": "Mental Discipline",
          "value": "While you have a Blade equipped, you are +1 Damage on your Combat Hits, and 1x turn you may re-roll all of your failed Defense rolls just rolled"
        },
        {
          "modifiers": [
            {
              "affects": "fury",
              "value": 2
            },
            {
              "affects": "willpower",
              "value": -1
            }
          ],
          "name": "Death Before Dishonor",
          "requires": "Don't Make Him Angry",
          "value": "+2 Max Fury and Willpower 3+"
        },
        {
          "multi": true,
          "name": "Honorable Vendetta",
          "roll": 2,
          "value": "Choose an Enemy keyword. Any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "modifiers": [
            {
              "affects": "fury",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Max Fury",
          "roll": 3,
          "value": "+1 Max Fury"
        },
        {
          "modifiers": [
            {
              "affects": "movement",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Move",
          "roll": 4,
          "value": "+1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            },
            {
              "affects": "Lore",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Str and +1 Lore",
          "roll": 5,
          "value": "+1 Strength and +1 Lore, +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 0
            },
            {
              "affects": "Spirit",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Cunning or +1 Spirit",
          "roll": 6,
          "value": "+1 Cunning or +1 Spirit, +D6 Health/Sanity"
        },
        {
          "modifiers": [

          ],
          "multi": true,
          "name": "Health and Sanity",
          "roll": 7,
          "value": "+D6 Health and +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 0
            },
            {
              "affects": "Luck",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Agility or +1 Luck",
          "roll": 8,
          "value": "+1 Agility or +1 Luck, +D6 Health/Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 2
            }
          ],
          "multi": true,
          "name": "+2 Side Bag Capacity",
          "roll": 9,
          "value": "+1 Side Bag Capacity"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Max Grit",
          "roll": 10,
          "value": "+1 Grit"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Initiative",
          "roll": 11,
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "roll": 12,
          "value": "You can now hold 2 more Corruption Points before mutating"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //DARK STONE SHAMAN
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
      "classId": "Rsyya36YjBhmfv4U1ICQ",
      "combat": 2,
      "corruption": {
        "current": 0,
        "max": 5
      },
      "darkstone": 0,
      "defense": 4,
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
          "cost": 450,
          "description": "+1 Magik. 1x turn you may attempt to cancel a Darkness card. Roll D6, on 5 or 6 success; otherwise take Peril die Sanity damage ignoring Willpower",
          "hands": 1,
          "keywords": "Gear, Icon, Magik, Hand Weapon",
          "modifiers": [
            {
              "affects": "magik",
              "value": 1
            }
          ],
          "name": "Shaman Staff",
          "slots": 2,
          "source": "Starting Gear",
          "weight": 1
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
      "keywords": "Tribal, Magik",
      "level": 1,
      "magik": {
        "current": 3,
        "max": 3
      },
      "melee": 4,
      "movement": 0,
      "name": "Dark Stone Shaman",
      "ranged": 5,
      "sanity": {
        "loss": 0,
        "max": 12
      },
      "spells": [

      ],
      "stats": {
        "Agility": 2,
        "Cunning": 1,
        "Lore": 4,
        "Luck": 1,
        "Spirit": 4,
        "Strength": 2
      },
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "name": "Spirit Hunter",
          "type": "starting",
          "value": "+1 Initiative. When casting Battle spells, you may re-roll one of the casting dice. Extra Starting Gear: Dark Stone Hatchet, Warrior's Speed"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "name": "Spirit Guardian",
          "type": "starting",
          "value": "+1 Strength. When casting Spirit Magik Protection spells, you may re-roll one of the casting dice. Extra Starting Gear: Ancestral Shield"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "name": "Spirit Shaper",
          "type": "starting",
          "value": "+1 Max Grit. When casting Spirit Magik Shapeshifting spells, you may re-roll one of the casting dice. Extra Starting Gear: Bear Form"
        },
        {
          "name": "War Shaman",
          "value": "New Spirit Magik Battle or Protection spell"
        },
        {
          "name": "Call of the Wild",
          "value": "New Spirit Magik Shapeshifting spell"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "name": "Harmony",
          "value": "You no longer need to roll for Corruption from Darkstone at the end of each Adventure. +1 Max Grit"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 1
            },
            {
              "affects": "magik",
              "value": 1
            }
          ],
          "name": "Storytelling",
          "value": "+1 Magik and +1 Lore"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "name": "Spirit Sacrifice",
          "requires": "War Shaman",
          "value": "1x turn when you kill an Enemy, you may use 2 Magik to recover a Grit. +1 Agility"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "name": "Tribal Dance",
          "requires": "Call of the Wild",
          "value": "While in Animal Form, you may re-roll 1 Defense or 1 To Hit roll per turn. +1 Initiative"
        },
        {
          "name": "Attuned",
          "requires": "Harmony",
          "value": "Dark Stone used to enhance your spells now add 3 extra casting dice each instead"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 1
            }
          ],
          "name": "Wisdom of Ages",
          "requires": "Storytelling",
          "value": "New Spirit Magik Battle or Protection or Shapeshifting spell. +1 Cunning"
        },
        {
          "modifiers": [
            {
              "affects": "magik",
              "value": 1
            }
          ],
          "name": "Battle Chant",
          "requires": "Spirit Sacrifice",
          "value": "New Spirit Magik Battle or Protection spell. +1 Magik"
        },
        {
          "modifiers": [
            {
              "affects": "magik",
              "value": 1
            }
          ],
          "name": "Animal Nature",
          "requires": "Tribal Dance",
          "value": "New Spirit Magik Shapeshifting spell. +1 Magik"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "name": "Void Strength",
          "requires": "Attuned",
          "value": "You are +1 Health for each unique Item you carry that has a Dark Stone icon on it. +1 Strength"
        },
        {
          "name": "Ancestral Guide",
          "requires": "Wisdom of Ages",
          "value": "1x turn, you may use 2 Dark Stone to prevent the Darkness from moving on the Depth Track on a D6 roll of 3+"
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
          "name": "Spirit Champion",
          "requires": "Battle Chant",
          "value": "+1 Max Grit and Defense 3+"
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": 1
            }
          ],
          "name": "One With The Spirits",
          "requires": "Animal Nature",
          "value": "You may now cast other Spirit Magik, even while in Animal Form. +1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": 1
            }
          ],
          "name": "Light As A Feather",
          "requires": "Void Strength",
          "value": "Items you carry that have a Dark Stone icon count as having 1 less weight. +1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "magik",
              "value": 1
            }
          ],
          "name": "Tribal Elder",
          "requires": "Ancestral Guide",
          "value": "1x turn, you may add an extra Power Level to a single spell you are casting"
        },
        {
          "multi": true,
          "name": "Ancient Rivals",
          "roll": 2,
          "value": "You are +1 Damage on all Attacks against Void Enemies, and any time you collect XP from a Void Enemy, collect an extra +5 XP"
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Strength",
          "roll": 3,
          "value": "+1 Strength"
        },
        {
          "modifiers": [
            {
              "affects": "movement",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Move",
          "roll": 4,
          "value": "+1 Move"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Agility",
          "roll": 5,
          "value": "+1 Agility, +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": 0
            },
            {
              "affects": "Spirit",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Lore or +1 Spirit",
          "roll": 6,
          "value": "+1 Lore or +1 Spirit, +D6 Health/Sanity"
        },
        {
          "modifiers": [

          ],
          "multi": true,
          "name": "Health and Sanity",
          "roll": 7,
          "value": "+D6 Health and +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": 0
            },
            {
              "affects": "Luck",
              "value": 0
            }
          ],
          "multi": true,
          "name": "+1 Cunning or +1 Luck",
          "roll": 8,
          "value": "+1 Cunning or +1 Luck, +D6 Health/Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": 2
            }
          ],
          "multi": true,
          "name": "+2 Side Bag Capacity",
          "roll": 9,
          "value": "+1 Side Bag Capacity"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Max Grit",
          "roll": 10,
          "value": "+1 Grit"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": 1
            }
          ],
          "multi": true,
          "name": "+1 Initiative",
          "roll": 11,
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "corruption",
              "value": 2
            }
          ],
          "multi": true,
          "name": "Dark Stone Resistance",
          "roll": 12,
          "value": "You can now hold 2 more Corruption Points before mutating"
        }
      ],
      "wealth": 0,
      "willpower": 4,
      "xp": 0
    },
    { //BANDIDO
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
        },
        {
          "cost": 400,
          "description": "Holds 5 Dynamite Tokens. Outlaw only.",
          "keywords": "Gear",
          "name": "Dynamite Satchel",
          "slots": 0,
          "source": "Starting Gear",
          "weight": 1
        }
      ],
      "keywords": "Outlaw",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "name": "Bandido",
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
      "upgrades": [
        {
          "name": "Accuracy",
          "requires": "Infamy",
          "value": "Ranged To Hit 4+"
        },
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health."
        },
        {
          "name": "Barrage",
          "value": "Once per turn, use 1 Grit to gain +1 Shot with each 1-Handed Gun you fire this turn."
        },
        {
          "name": "Charge",
          "requires": "Swingin' Fists",
          "value": "At the start of your Activation, you may choose an Enemy that is not adjacent. You are +2 Damage on all Combat Hits to that Enemy this turn."
        },
        {
          "name": "Chew on This!",
          "requires": "Dark Stone Dynamite",
          "value": "Once per Fight, when you get a Critical Hit on a Melee Attack, you may discard a Dynamite Token to add 2D6 Damage to the Hit."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Combat",
          "value": "+1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "Cunning",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Cunning",
          "value": "+1 Cunning. Also gain +D6 Health."
        },
        {
          "multi": true,
          "name": "Cunning Plan",
          "value": "When holding up the Outpost Bank in Town, you now steal +$50 for every 5+ rolled."
        },
        {
          "name": "Dark Stone Dynamite",
          "requires": "Destruction Artist",
          "value": "Once per turn, Use 1 Dark Stone when Throwing a Dynamite Token to add +2 Damage to each model Hit."
        },
        {
          "name": "Deadly",
          "requires": "Rage",
          "value": "Your Melee Attacks get Critical Hits on rolls of 5 or 6 now."
        },
        {
          "name": "Destruction Artist",
          "requires": "Strong Arm",
          "value": "Any Explosives you Throw Bounce 1 fewer times than whatever is rolled"
        },
        {
          "name": "Explosives Expert",
          "type": "starting",
          "value": "Use 2 Grit to gain a Dynamite Token. Extra Starting Gear: Dynamite Satchel and 2 Dynamite Tokens"
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +3 Sanity."
        },
        {
          "name": "Infamy",
          "requires": "Steel Nerves",
          "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6 x $25 less for a single Item/Service"
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "name": "Lovable Scoundrel",
          "requires": "Twitch",
          "value": "You gain double the XP listed on all Loot and Scavenge cards. +1 Spirit."
        },
        {
          "modifiers": [
            {
              "affects": "Luck",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Luck",
          "value": "+1 Luck. Also gain +D6 Sanity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Rage",
          "requires": "Charge",
          "value": "Once per turn, use 3 Grit to gain +4 Combat for one Attack. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+2 Side Bag Token Capacity."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Sinister Laugh",
          "value": "Any time you kill an Enemy, roll a D6. On the roll of 5 or 6, Recover 1 Grit. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Steel Nerves",
          "requires": "Barrage",
          "value": "Once per turn, you may Re-roll a single failed Willpower save. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "name": "Strong Arm",
          "value": "You may double your Range for Throwing Explosives. +1 Strength."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "name": "Swindler",
          "type": "starting",
          "value": "Anytime you draw a Loot card, you may discard it and draw a new one. You must keep the second card drawn. You are also +1 Combat."
        },
        {
          "name": "Swingin' Fists",
          "value": "Instead of a normal Melee Attack, use 1 Grit to do a 3 Combat Melee Attack to every adjacent Model."
        },
        {
          "name": "Twin Guns",
          "type": "starting",
          "value": "You may fire two 1-Handed Guns per turn with no penalty for the off-hand Gun. Extra Starting Gear: Pistol"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Twitch",
          "requires": "Sinister Laugh",
          "value": "Once per Adventure, gain +4 Initiative until the end of the turn. +1 Max Grit."
        },
        {
          "multi": true,
          "name": "Vendetta",
          "value": "Choose an Enemy Type. From now on, any time you collect XP from those Enemies, collect an extra +10 XP"
        },
        {
          "name": "Wild Card",
          "value": "You may Recover a Grit on a Move roll of 1 or 2"
        },
        {
          "name": "Won't Stay Dead",
          "requires": "Lovable Scoundrel",
          "value": "At the start of each turn, Heal 1 Wound on the D6 roll of 4+. If KO'd, instead you may Recover on the D6 roll of 4+ (you must still roll for Injury/Madness)"
        }
      ],
      "wealth": 0,
      "willpower": 5,
      "xp": 0
    },
    { //PREACHER
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
          "name": "Holy Book",
          "source": "Starting Gear",
          "weight": 1
        }
      ],
      "keywords": "Holy",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "name": "Preacher",
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
          "name": "Faith Healing",
          "type": "Blessing",
          "xp": 10
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
      "upgrades": [
        {
          "modifiers": [
            {
              "affects": "Agility",
              "value": "1"
            }
          ],
          "name": "Agility",
          "value": "+1 Agility. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Ancient Writing",
          "value": "+1 Faith while in an Other World. +1 Max Grit."
        },
        {
          "name": "Belief",
          "value": "New Sermon Blessing"
        },
        {
          "name": "Chosen",
          "requires": "Belief",
          "value": "Once per turn, you may Re-roll a single Defense roll"
        },
        {
          "name": "Conviction",
          "requires": "Chosen",
          "value": "New Sermon Blessing. +1 Faith"
        },
        {
          "name": "Crush the Forsaken (Demon)",
          "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
        },
        {
          "name": "Crush the Forsaken (Undead)",
          "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
        },
        {
          "name": "Crush the Forsaken (Void)",
          "value": "From now on, any time you collect XP from that kind of Enemy, collect an extra +5 XP."
        },
        {
          "name": "Divine Protection",
          "requires": "Conviction",
          "value": "Defense +4"
        },
        {
          "name": "Firebrand",
          "type": "starting",
          "value": "Once per turn, when Performing a Judgement Sermon, you may Re-roll one of the Casting Dice."
        },
        {
          "name": "Forbidden Knowledge",
          "requires": "Stories of the Void",
          "value": "New Sermon.  You may now hold 5 more Corruption Points before getting a Mutation."
        },
        {
          "name": "Frothing Rage",
          "requires": "Vengeance",
          "value": "Whenever you kill an adjacent Enemy, before assigning any more Hits, you may Move up to 2 spaces in any direction ignoring Escape tests."
        },
        {
          "multi": true,
          "name": "Health and Sanity",
          "value": "+D6 Health and +D6 Sanity."
        },
        {
          "name": "Holy Man",
          "value": "You may not use Guns. Starts with 1 Blessing and 1 Judgement."
        },
        {
          "name": "Holy Revolution",
          "requires": "Salvation",
          "value": "Anytime you kill a Demon, every Hero on your Map Tile may Heal 1 Wound or Sanity Damage"
        },
        {
          "name": "Holy Strike",
          "requires": "Revelation",
          "value": "Once per turn, you may Re-roll one of your To Hit rolls."
        },
        {
          "modifiers": [
            {
              "affects": "init",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Initiative",
          "value": "+1 Initiative"
        },
        {
          "multi": true,
          "name": "Keep the Faith",
          "value": "You may choose one Injury/Mutation/Madness to Heal.  If you have none, gain +1 Faith."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Lore",
          "value": "+1 Lore. Also gain +D6 Health."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Martyr",
          "requires": "Zealot",
          "value": "Once per turn, you may take 1 Corruption Point, ignoring Willpower, to Heal D6 Health/Sanity (any mix) from yourself or another Hero on your Map Tile. +1 Max Grit."
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Max Grit",
          "value": "+1 Max Grit"
        },
        {
          "name": "Missionary",
          "type": "starting",
          "value": "Once per turn, when Performing a Blessing Sermon, you may Re-roll one of the Casting Dice."
        },
        {
          "modifiers": [
            {
              "affects": "move",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Move",
          "value": "+1 Move"
        },
        {
          "name": "Redemptionist",
          "type": "starting",
          "value": "You may now use 2-Handed Guns. Extra Starting Gear: Shotgun (replaces Holy Book)"
        },
        {
          "name": "Revelation",
          "value": "New Sermon Judgement"
        },
        {
          "name": "Salvation",
          "requires": "Martyr",
          "value": "Use 2 Grit to remove a Corruption Point from yourself."
        },
        {
          "name": "Scourge of the Dead",
          "value": "You are +1 Damage on all Attacks against Undead Enemies"
        },
        {
          "modifiers": [
            {
              "affects": "sidebag",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Side Bag Capacity",
          "value": "+1 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Spirit",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Spirit",
          "value": "+1 Spirit.  Also gain +D6 Sanity"
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Stories of the Void",
          "requires": "Tools of the Damned",
          "value": "All of your Attacks are +1 Damage against Void Enemies. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "Strength",
              "value": "1"
            }
          ],
          "multi": true,
          "name": "Strength",
          "value": "+1 Strength. Also gain D6 Health/Sanity (any mix)."
        },
        {
          "modifiers": [
            {
              "affects": "Lore",
              "value": "1"
            }
          ],
          "name": "Tools of the Damned",
          "requires": "Ancient Writing",
          "value": "All of your Attacks are +1 Damage against Demon Enemies. +1 Lore."
        },
        {
          "modifiers": [
            {
              "affects": "combat",
              "value": "1"
            }
          ],
          "name": "Vengeance",
          "requires": "Holy Strike",
          "value": "New Sermon Judgement. +1 Combat"
        },
        {
          "modifiers": [
            {
              "affects": "grit",
              "value": "1"
            }
          ],
          "name": "Zealot",
          "value": "Once per turn, you may take 3 Wounds, ignoring Defense, to add +D6 Damage to one your Hits. +1 Max Grit."
        }
      ],
      "wealth": 0,
      "willpower": 3,
      "xp": 0
  },
    { //SORCERER
      "name": "Sorcerer",
      "abilities": [
          {
              "desc": "Starts with 2 Elemental Magik spells. For each spell, select any Element, draw 2 spells of that type choosing 1 to keep, and discard the other. Each spell may only be cast once per Turn.",
              "name": "Elemental Magik"
          },
          {
              "desc": "As a Starting Hero, choose 1 Element to be your focus. From now on, you are +1 to your casting total when casting a spell of that element.",
              "name": "Magik Focus"
          },
          {
              "desc": "May not use Guns",
              "name": "Ancient Arts"
          }
      ],
      "classId": "4455653a-4f1d-453a-994d-c6ec9ede860b",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 5,
      "mana": 4,
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 10,
          "wounds": 0
      },
      "init": 3,
      "items": [
          {
              "description": "At the start of each Adventure, remove any Tokens on this Item, then place D6 Arcane Powder tokens here. You may discard Arcane Powder tokens from here to add +1 each to the Casting Total of a Spell you are Casting. Magik Only",
              "hands": 0,
              "name": "Roku Demon Bag",
              "weight": 0,
              "slots": 0,
              "cost": 500,
              "keywords": "Gear, Magik, Container",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Magik, Strange",
      "level": 1,
      "melee": 5,
      "movement": 0,
      "ranged": 4,
      "sanity": {
          "loss": 0,
          "max": 14
      },
      "elementalMagik": [
          {
              "check": 0,
              "cost": 2,
              "deadly": false,
              "type": "any",
              "name": "Elemental Blast",
              "desc": "Free Starting Upgrade. Use 2 Mana to fire an Elemental Blast as your Ranged Attack. This counts as a Spell, with the same Keyword as your Magik Focus Element but no Casting Roll is needed. Range 8, Shots 1. Each Hit rolled counts as D3 Hits on the Target (a Critical counts as D3 Critical Hits)."
          }
      ],
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 2,
          "Cunning": 2,
          "Lore": 4,
          "Luck": 3,
          "Spirit": 3,
          "Strength": 1
      },
      "upgrades": [

            {
              "name": "Arcane Protection",
              "type": "starting",
              "value": "Once per turn, you may re-roll a single failed Defense or Willpower roll. Also you may ignore the effects of any Enemy Spell affecting you, on the D6 roll of 4+."
            },
            {
              "name": "Demon Fire Claw",
              "type": "starting",
              "value": "Use 1 Grit to gain +2 Combat until the end of the turn. On any turn in which this is used, your Combat Hits are +1 Damage each (or +2 against Demon Enemies)."
            },
            {
              "name": "Blood of the Dragon",
              "type": "starting",
              "value": "At the start of your Activation, Heal D3 Wounds. You are immune to Poison."
            },


          {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D6 Sanity.",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning",
            "value": "+1 Cunning. Also gain D6 Sanity.",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "3 Health and 1 Sanity.",
             "modifiers": [
               {
                 "affects": "health",
                 "value": "3"
                 },
                 {
                   "affects": "sanity",
                   "value": "1"
                 }
             ]
           },
           {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative and Health",
             "value": "+1 Initiative. Also, gain +D6 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Strength",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Strength and Health",
             "value": "+1 Strength. Also, gain +D6 Health"
           },
           {
             "multi": true,
             "name": "Touched by the Void",
             "value": "Each time the Darkness marker on the Depth track crosses into a new stage, heal D6 Wounds and take 1 Corruption Hit."
           },
           {
             "modifiers": [
               {
                 "affects": "Spirit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Spirit",
             "value": "+1 Spirit. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck",
             "value": "+1 Luck. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
           {
             "modifiers": [
               {
                 "affects": "move",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Move",
             "value": "+1 Move"
           },
           {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity. Also gain +D6 Health."
           },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },
           {
             "multi": true,
             "name": "Arcane Powder",
             "value": "Start each Adventure with +1 Arcane Powder token in your Roku Demon Bag.",
             "modifiers": [ { "affects": "arcanePowder", "value": 1 } ]
           },
           {
             "multi": true,
             "name": "Dragon Spirit",
             "value": "Once per Adventure, add +2 Damage to one of your Hits"
         },

          {
              "name": "Conjuring",
              "value": "New Elemental Magik Spell"
          },
          {
              "modifiers": [
                {
                  "affects": "mana",
                  "value": "1"
                }
              ],
              "name": "Incantations",
              "requires": "Conjuring",
              "value": "New Elemental Magik Spell. +1 Mana."
          },
          {
              "modifiers": [
                {
                  "affects": "Spirit",
                  "value": "1"
                }
              ],
              "name": "Elemental Wrath",
            "requires": "Incantations",
            "value": "Your Elemental Blast now only costs 1 Mana and it's +1 Shot (or +2 if Hero Level 6 or higher). +1 Spirit."
          },
          {
            "name": "Master of Magik",
            "requires": "Elemental Wrath",
            "value": "Once per Adventure, Cast one of your spells without paying Mana or making a Casting Roll. This may be used to cast the same Spell a second time in the same turn."
          },
          {
            "name": "Arcane Wonder",
            "value": "Start each Adventure with +2 Arcane Powder tokens in your Roku Demon Bag. +1 Lore.",
            "modifiers": [
              {
                "affects": "Lore",
                "value": "1"
              }
            ]
          },
          {
            "name": "Keeper of the Vault",
            "value": "You gain +1 Health for each Artifact you carry (max +6). +1 Cunning",
            "requires": "Arcane Wonder",
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ]
          },
          {
            "name": "Bound Demon",
            "requires": "Keeper of the Vault",
            "value": "Choose an Artifact to bind a Demon into. That Artifact may never be lost, sold, or discarded. At the start of each Adventure, draw a Random Spell from a chosen Element for that Artifact. Discard this Spell during the Adventure to cast it for free, without a Casting Roll."
          },
          {
              "name": "Vault of Rage",
              "requires": "Bound Demon",
              "value": "At the start of each Adventure, draw an Artifact from a Random World to use for this Adventure. You may not trade or sell this Item and it has no weight. Discard the Artifact at the end of the Adventure."
          },
          {
              "name": "Iron Skin",
              "value": "Armor 6+. Also, you are immune to Bleeding and Burning markers. +1 Strength.",
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Smell of Blood",
              "requires": "Iron Skin",
              "value": "Melee to Hit 4+"
          },
          {
              "name": "Dragon Rage",
              "requires": "Smell of Blood",
              "value": "Once per turn, you may re-roll one of your Damage rolls for a Combat Hit. +1 Initiative.",
              "modifiers": [
                {
                  "affects": "init",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Savage Ferocity",
              "requires": "Dragon Rage",
              "value": "You are +2 Combat for each open hand you currently have. +1 Strength",
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Counter Spell",
              "value": "Once per turn, spend 2 Mana to fully cancel the effects of an Enemy Spell on the D6 roll of 4+. +1 Mana.",
              "modifiers": [
                {
                  "affects": "mana",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Ancient Rivalry",
              "requires": "Counter Spell",
              "value": "Your Attacks are +1 Damage against Void enemies. Once per turn, you may force an enemy to re-roll one of their To Hit rolls against you."
          },
          {
              "name": "War Caster",
              "requires": "Ancient Rivalry",
              "value": "New Elemental Magik Spell. +1 Mana.",
              "modifiers": [
                {
                  "affects": "mana",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Fifth Element",
              "requires": "War Caster",
              "value": "You are +2 Health for each different Mutation you have. When rolling on the Mutation Chart, you may choose one of the dice to re-roll."
          }
        ],
        "wealth": 0,
        "willpower": 3,
        "xp": 0
    },
    { //TRAVELING MONK
      "name": "Traveling Monk",
      "abilities": [
          {
              "desc": "At the start of each turn, gain 1 Ki Token",
              "name": "Discipline"
          },
          {
              "desc": "Once per turn, yu may channel your Ki into one of your Combat Hits or any source of Healing you are using. For each Ki Token spent, increase Healing by 1 to a single target. For every 2 spent, increase Damage by 1 for that Hit.",
              "name": "Sacred Order"
          },
          {
              "desc": "+1 Damage on all attacks against Myth Enemies",
              "name": "Tamabushi"
          }
      ],
      "classId": "4bc1cc80-ce5a-49d1-b863-e62ab84a085d",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
      "ki": {
          "max": 6,
          "current": 0
      },
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
              "description": "At the end of each turn, you may Heal 1 Wound from every other adjacent Hero. If equipped as 2-handed, your Combat Hits may use the D8 for damage. Holy Only",
              "hands": 1,
              "name": "Monk Staff",
              "weight": 1,
              "slots": 3,
              "cost": 400,
              "keywords": "Gear, Hand Weapon, Holy",
              "source": "Starting Gear"
          },
          {
              "description": "Once per Adventure, you and all Heroes on your Map Tile count as having Cover 3+ save against ALL attacks / Damage sources until the end of the turn. Holy Only",
              "hands": 0,
              "name": "Sacred Bell",
              "weight": 0,
              "slots": 0,
              "cost": 500,
              "keywords": "Gear, Holy, Icon",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Traveler, Holy",
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
          "Cunning": 1,
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
              "name": "Acrobatic Flip",
              "type": "starting",
              "value": "Once per turn, you may re-roll one failed Defense roll. You may spend Ki Tokens for Movement, gaining 2 extra Move for each Ki Token spent. If you do, you may move through other models during your movement this turn."
            },
            {
              "name": "Fists of Fury",
              "type": "starting",
              "value": "Once per turn, when making a Melee attack, use 1 Grit to roll one extra Combat against each Enemy currently adjacent to you OR to roll 2 extra Combat against a single Large or bigger Enemy adjacent to you."
            },
            {
              "name": "Defender of the Light",
              "type": "starting",
              "value": "+2 Max Ki. Gain D3 Kit Tokens any time the Hold Back the Darkness roll is failed (not including Depth Events).",
              "modifiers": [{"affects":"ki", "value":2}]
            },

            {
              "multi": true,
              "name": "Sacred Vow",
              "value": "Choose an Enemy keyword. Any time you kill that Enemy type, collect extra 10 XP and Heal 1 Wound (or 20 XP, D3 Wounds if Large size or larger)"
            },
            {
              "modifiers": [
                {
                  "affects": "init",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Initiative",
              "value": "+1 Initiative."
            },
            {
              "modifiers": [
                {
                  "affects": "move",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Move",
              "value": "+1 Move"
            },
            {
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Strength and Health",
              "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
            },
            {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
            "multi": true
          },
            {
                "modifiers": [
                  {
                    "affects": "Cunning",
                    "value": "1"
                  }
                ],
                "name": "Cunning and Health",
                "value": "+1 Cunning. Also gain D6 Health.",
                "multi": true
            },
            {
                "modifiers": [
                  {
                    "affects": "Lore",
                    "value": "1"
                  }
                ],
                "name": "Lore and Health",
                "value": "+1 Lore. Also gain D6 Health.",
                "multi": true
            },
            {
              "multi": true,
              "name": "Health and Sanity",
              "value": "D6 Health and D6 Sanity."
            },
            {
              "modifiers": [
                {
                  "affects": "Lore",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Lore and Sanity",
              "value": "+1 Lore. Also gain +D6 Sanity."
            },
            {
              "modifiers": [
                {
                  "affects": "Luck",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Luck and Sanity",
              "value": "+1 Luck. Also gain +D6 Sanity."
            },
            {
             "modifiers": [
               {
                 "affects": "ki",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Ki",
             "value": "+1 Max Ki"
           },
            {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity. Also gain +D6 Health."
            },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },
           {
             "multi": true,
             "name": "Sacred Duty",
             "value": "Once per Adventure, Recover 1 Grit."
           },


          {
              "name": "Trained from Birth",
              "value": "Once per turn, use 1 Grit to add +2 Damage to one of your Combat Hits (or +3 against Demon Enemy)"
          },
          {
             "name": "Ki Block",
              "requires": "Trained from Birth",
              "value": "Once per turn, spend Ki equal to the Damage you or another adjacent Hero just took from a single Hit to prevent that Damage. +1 Max Ki.",
              "modifiers":[{"affects":"ki","value":1}]
          },
          {
              "name": "Warrior Monk",
              "requires": "Ki Block",
              "value": "Defense 3+. +1 Max Grit",
              "modifiers":[{"affects":"defense","value":3},{"affects":"grit","value":1}]
          },
          {
            "name": "Ki Blast",
            "requires": "Warrior Monk",
            "value": "Once per Fight, spend any number of Ki to create a Ki Blast with a Range equal to half the number of Ki spent (rounding down). Every Enemy within Range takes D6 Wounds ignorning Defense."
          },
          {
            "name": "Guardian Shield",
            "value": "Once per Adventure, you may ready your Sacred Bell. +1 Max Grit",
            "modifiers":[{"affects":"grit","value":1}]
          },
          {
            "name": "One with the Light",
            "value": "Any time you gain 1 or more Ki Tokens, you may remove 1 Wound or Sanity Damage from yourself (may not spend Ki to increase this)."
          },
          {
            "name": "Protector",
            "requires": "One with the Light",
            "value": "Once per turn, you may spend 6 Ki to re-roll one of the dice on a Hold Back the Darkness roll. +1 Max Ki.",
            "modifiers":[{"affects":"ki","value":1}]
          },
          {
              "name": "Defier of Darkness",
              "requires": "Protector",
              "value": "Whenever a Growing Dread or Darkness card is drawn, you may cancel it on a D6 of 5+. If canceled, gain 10 XP."
          },
          {
              "name": "Quickness",
              "value": "At the start of any turn, you may spend Ki to increase your Initiative this turn by +1 for every 2 Ki spent. +1 Move",
              "modifiers":[{"affects":"move","value":1}]
          },
          {
              "name": "Speed Lines",
              "requires": "Quickness",
              "value": "You are +1 Damage against all Enemies with a lower Initiative than you. +1 Agility",
              "modifiers":[{"affects":"Agility","value":1}]
          },
          {
              "name": "Patience",
              "requires": "Speed Lines",
              "value": "Once per turn, spend 5 Ki to Recover a Grit. You may use Grit to re-roll your To-Hit rolls, even if they have already been re-rolled."
          },
          {
              "name": "The Last Straw",
              "requires": "Patience",
              "value": "Once per Adventure, un-equip any number of Clothing Items to gain +1 Combat each (max +6) until the end of the turn. You may not equip Clothing Items for the rest of the current Fight."
          },
          {
              "name": "Do Not Fear",
              "value": "Myth and Demon Enemies do 1 less Damage to you on all Hits (min 1). You are immune to Enemy Ability Fear."
          },
          {
              "name": "Between Worlds",
              "requires": "Do Not Fear",
              "value": "While in an OtherWorld, you roll 1 extra die on all Skill tests. +1 Lore.",
              "modifiers":[{"affects":"Lore","value":1}]
          },
          {
              "name": "Knows No Terror",
              "requires": "Between Worlds",
              "value": "All of your Attacks are +1 Damage against Undead and Demon Enemies. You are immune to Terror and Unspeakable Terror abilities"
          },
          {
              "name": "Hero of the Dragon War",
              "requires": "Knows No Terror",
              "value": "While in a Fight with an XL Enemy or larger, every Hero on your Map Tile Recovers Grit on D6 of 4+ each at the start of every turn. +1 Combat",
              "modifiers":[{"affects":"combat","value":1}]
          }
        ]
    },
    { //SAMURAI WARRIOR
      "name": "Samurai Warrior",
      "abilities": [
          {
              "desc": "Starts with 2 Random Warrior Samurai Battle Tactics (draw 3, choose 2). Battle Tactics may each onlly be used once per turn.",
              "name": "Samurai Battle Tactics"
          },
          {
              "desc": "Any time yu do one or more Wounds to an Enemy with a Combat Hit, gain 1 Fury Token",
              "name": "Battle Fury"
          }
      ],
      "classId": "31254331-ec58-4b71-ae35-8239f06ac7ab",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 3,
      "fury": {
          "max": 6,
          "current": 0
      },
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 12,
          "wounds": 0
      },
      "init": 3,
      "items": [
          {
              "description": "+1 Combat. Once per Turn, spend 2 Fury to add +1 Damage to one of your Combat Hits.",
              "hands": 0,
              "name": "Warrior's Katana",
              "weight": 1,
              "slots": 2,
              "cost": 250,
              "keywords": "Gear, Trederra, Gun, Pistol",
              "source": "Starting Gear",
              "modifiers": [{"affects":"combat","value":1}]
          },
          {
              "description": "Armor 5+. +2 Health. -1 Initiative. Samurai Only",
              "hands": 0,
              "name": "Samurai Armor",
              "weight": 1,
              "slots": 2,
              "cost": 500,
              "keywords": "Gear, Clothing, Torso",
              "source": "Starting Gear",
              "modifiers":[
                  {"affects": "health","value":2},
                  {"affects":"armor","value":5},
                  {"affects":"init","value":-1}
              ]
          },
          {
              "description": "Once per turn, when you kill an Enemy, gain 1 Fury. Samurai Only",
              "hands": 0,
              "name": "Samurai Helmet",
              "weight": 1,
              "slots": 1,
              "cost": 300,
              "keywords": "Gear, Clothing, Hat",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Samurai, Showman, Soldier",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "ranged": 4,
      "sanity": {
          "loss": 0,
          "max": 10
      },
      "samuraiTactics": [
      ],
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 3,
          "Cunning": 3,
          "Lore": 2,
          "Luck": 1,
          "Spirit": 2,
          "Strength": 4
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Rising Sun",
              "type": "starting",
              "value": "Once per turn, use 1 Grit to add +2 Damage to one of your Combat Hits. Whenever the Hold Back the Darkness is failed (not including Depth Events), Recover Grit on D6 of 4+."
            },
            {
              "name": "Determination",
              "type": "starting",
              "value": "+2 Max Fury. When you take 1 or more Wounds from Enemy Attacks, gain 1 Fury",
              "modifiers": [{"affects":"fury","value":2}]
            },
            {
              "name": "Wall of Steel",
              "type": "starting",
              "value": "Once per Turn, you may re-roll all of your failed Armor rolls just rolled"
            },


            {
              "multi": true,
              "name": "Honorable Vendetta",
              "value": "Choose an Enemy keyword. any time you collect XP from those Enemies, collect extra 10 XP."
            },
            {
             "modifiers": [{"affects": "fury","value": 1}],
             "name": "Max Fury",
             "value": "+1 Max Fury.",
             "multi": true
            },
            {
              "modifiers": [{"affects": "move","value": "1"}],
              "multi": true,
              "name": "Move",
              "value": "+1 Move"
            },
            {
            "modifiers": [{"affects": "Agility","value": "1"}],
            "name": "Agility and Health/Sanity",
            "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
            "multi": true
          },
            {
           "modifiers": [{"affects": "Strength","value": "1"}],
           "name": "Strength and Health/Sanity",
           "value": "+1 Strength. Also gain D6 Health/Sanity (any mix).",
           "multi": true
         },
            {
                "modifiers": [{"affects": "Cunning","value": "1"}],
                "name": "Cunning",
                "value": "+1 Cunning. Also gain D6 Health/Sanity (any mix).",
                "multi": true
            },
            {
                "modifiers": [{"affects": "Spirit","value": "1"}],
                "name": "Spirit",
                "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
                "multi": true
            },
            {
                "multi": true,
                "name": "Health and Sanity",
                "value": "D6 Health and D6 Sanity."
            },
            {
              "modifiers": [
                {
                  "affects": "Lore",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Lore",
              "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
            },
            {
              "modifiers": [
                {
                  "affects": "Luck",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Luck",
              "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
            },
            {
              "modifiers": [
                {
                  "affects": "sidebag",
                  "value": "2"
                }
              ],
              "multi": true,
              "name": "Side Bag Capacity",
              "value": "+2 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
            },
            {
              "modifiers": [
                {
                  "affects": "grit",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Max Grit",
              "value": "+1 Max Grit"
            },
            {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative",
             "value": "+1 Initiative"
           },
            {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },


          {
              "name": "Battle Tested",
              "value": "New Warrior Samurai Battle Tactic. +1 Luck",
              "modifiers":[{"affects":"Luck","value":1}]
          },
          {
              "name": "Warrior's Training",
              "requires": "Battle Tested",
              "value": "New Warrior Samurai Battle Tactic. +1 Max Grit",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Unrelenting Resolve",
              "requires": "Warrior's Training",
              "value": "New Warrior Samurai Battle Tactic. +1 Initiative",
              "modifiers":[{"affects":"init","value":1}]
          },
          {
            "name": "Lord of War",
            "requires": "Unrelenting Resolve",
            "value": "Melee To Hit 3+",
            "modifiers":[{"affects":"melee","value":3}]
          },
          {
            "name": "Growing Rage",
            "value": "Once per Adventure gain 1 Fury for every 2 Wounds you currently have. While at half Health or less, you are +1 Combat."
          },
          {
            "name": "Shout at the Darkness",
            "value": "Once per turn, spend 3 Fury to cancel a Darkness card on D6 of 3+. +1 Max Fury",
            "requires": "Growing Rage",
            "modifiers": [{"affects": "fury","value": "1"}]
          },
          {
            "name": "Furious Speed",
            "requires": "Shout at the Darkness",
            "value": "Once per turn, at the start of the turn, spend any number of Fury to gain +1 Initiative each. +1 Max Grit and +1 Max Fury.",
            "modifiers":[{"affects":"grit","value":1},{"affects":"fury","value":1}]
          },
          {
              "name": "Fury Unleashed",
              "requires": "Furious Speed",
              "value": "Once per Fight, you may spend any number of Fury to add +1 Damage each to one of your Combat Hits. +1 Max Fury.",
              "modifiers":[{"affects":"fury","value":1}]
          },
          {
              "name": "Defense Discipline",
              "value": "Once per Fight, you may add +1 to all of your Armor rolls just rolled. +1 Max Grit.",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Attack Discipline",
              "requires": "Defense Discipline",
              "value": "All Keyword Strike Battle Tactics cost you 1 less Fury to activate (min 1). +1 Initiative.",
              "modifiers":[{"affects":"init","value":1}]
          },
          {
              "name": "Movement Discipline",
              "requires": "Attack Discipline",
              "value": "Whenever you roll a 1 for Move, you may also gain D3 Fury. +1 Move",
              "modifiers":[{"affects":"move","value":1}]
          },
          {
              "name": "Precise Strikes",
              "requires": "Movement Discipline",
              "value": "Your Melee To Hit rolls of 1 may be assigned to targets as though they were Hits, doing D3 Wounds each, ignoring Defense. +1 Strength",
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Leadership",
              "value": "At the start of each turn, choose any one Hero or Ally to Heal 1 Wound or 1 Sanity Damage. +1 Lore",
              "modifiers":[{"affects":"Lore","value":1}]
          },
          {
              "name": "Toe to Toe",
              "requires": "Leadership",
              "value": "Once per Adventure, use 1 Grit to gain +2 Combat for each Large or bigger Enemy adjacent to you (limit +6). +1 Strength.",
              "modifiers":[{"affects":"Strength","value":1}]
          },
          {
              "name": "Stalwart",
              "requires": "Toe to Toe",
              "value": "For each Clothing Item you have equipped, you are +1 Health and +1 Sanity (max +5 each). +1 Corruption Resistance.",
              "modifiers":[{"affects":"corruption","value":1}]
          },
          {
              "name": "Battle Formation",
              "requires": "Stalwart",
              "value": "You are +1 Combat for each other Hero or Ally adjacent to you (max +2). +1 Cunning",
              "modifiers":[{"affects":"Cunning","value":1}]
          }
        ]
    },
    { //ASSASSIN
      "name": "Assassin",
      "abilities": [
          {
              "desc": "Starts with a Ninja Clan card of your choice.",
              "name": "Ninja Clan"
          },
          {
              "desc": "+1 Move. You may move through other models and you automatically pass all Escape tests.",
              "name": "Nimble"
          },
          {
              "desc": "Your Combat Hits ignore any Armor an Enemy has, and are also +1 Damage while your target is the only Enemy adjacent to you",
              "name": "Deadly"
          },
          {
              "desc": "May not use Guns. Once per turn, you may re-roll any number of your Defense rolls just made",
              "name": "Silent Fighter"
          }
      ],
      "classId": "992db5e3-a9c0-41b0-8a77-7e2e77352c46",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
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
              "description": "Your Combat Hits are Critical Hits on rolls of 5+. Stealth Only",
              "hands": 1,
              "name": "Ninjato",
              "weight": 1,
              "slots": 1,
              "cost": 250,
              "keywords": "Gear, Blade, Hand Weapon",
              "source": "Starting Gear"
          },
          {
              "description": "Free Attack (once per Fight) - Range 5, Shots 2. May be used at any time during your Move, but not while adjacent to Enemies. Stealth Only",
              "hands": 0,
              "name": "Shuriken",
              "weight": 0,
              "slots": 0,
              "cost": 300,
              "keywords": "Gear, Shuriken",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Outlaw, Stealth",
      "level": 1,
      "melee": 3,
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
          "Agility": 4,
          "Cunning": 3,
          "Lore": 3,
          "Luck": 2,
          "Spirit": 1,
          "Strength": 2
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Smoke Bomb",
              "type": "starting",
              "value": "Once per Turn, use 1 Grit at any time (except during Enemy Activation) to immediately move up to D6 spaces, ignoring anything in those spaces during the move. If you end this move at least 3 spaces away from where you started, gain +2 Combat until the end of the turn."
            },
            {
              "name": "Ruthless",
              "type": "starting",
              "value": "Any time you kill an Enemy, you may heal 1 Sanity Damage. Extra Starting Gear: Pair of Sai (replaces Ninjato)"
            },
            {
              "name": "Running Assault",
              "type": "starting",
              "value": "+1 Move. Once per Fight, you may ready and exhausted Shuriken Item.",
              "modifiers":[{"affects":"move","value":1}]
            },


            {
              "multi": true,
              "name": "Assassination Target",
              "value": "Once per Adventure, choose an Enemy model at the start of a Fight. If you kill that model, gain double XP for killing it. Must choose different models for each target."
            },
            {
              "modifiers": [
                {
                  "affects": "init",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Initiative",
              "value": "+1 Initiative"
            },
            {
              "modifiers": [
                {
                  "affects": "move",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Move",
              "value": "+1 Move"
            },
            {
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Strength and Health",
              "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
            },
            {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning",
            "value": "+1 Cunning. Also gain D6 Sanity.",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Spirit",
                "value": "1"
              }
            ],
            "name": "Spirit",
            "value": "+1 Spirit. Also gain D6 Sanity.",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "2 Health and 2 Sanity.",
             "modifiers": [
               {
                 "affects": "health",
                 "value": 2
                 },
                 {
                   "affects": "sanity",
                   "value": 2
                 }
             ]
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore",
             "value": "+1 Lore. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck",
             "value": "+1 Luck. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
           {
             "multi": true,
             "name": "Health",
             "value": "+ Peril Die Health"
           },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },


          {
              "name": "From the Shadows",
              "value": "When assigning any Hit to a Target on the other side of a Barrier from you, that Hit is +1 Damage. +1 Cunning",
              "modifiers":[{"affects":"Cunning","value":1}]
          },
          {
              "modifiers": [{"affects": "health","value": 2}],
              "name": "Find the Weak Spot",
              "requires": "From the Shadows",
              "value": "Once per turn, you may ignore Tough or Endurance abilities of an Enemy for a single Hit. +2 Health."
          },
          {
              "name": "Shadow Dodge",
            "requires": "Find the Weak Spot",
            "value": "Once per turn, you may bounce yourself once in place of a Defense roll (even after rolled or if Defense would be ignored). If moved to a different space, that Defense is successful. If not moved, take Damage as normal."
          },
          {
            "name": "Living Shadow",
            "requires": "Shadow Dodge",
            "value": "Models with a lower Initiative than you are -1 To Hit you. +1 Initiative.",
            "modifiers":[{"affects":"init","value":1}]
          },
          {
            "name": "Acrobatic Strike",
            "value": "Once per turn, when you move through an Enemy's space, that Enemy takes 1 Wound, ignoring Defense, on D6 of 4, 5, or 6. +1 Move",
            "modifiers":[{"affects":"move","value":1}]
          },
          {
            "name": "Wall Run",
            "value": "You may roll 2 dice for Move each turn and choose which to use. +1 Move.",
            "requires": "Acrobatic Strike",
            "modifiers": [
              {
                "affects": "move",
                "value": "1"
              }
            ]
          },
          {
            "name": "Dance of Death",
            "requires": "Wall Run",
            "value": "For every 4 spaces you moved (may not count same space twice), gain +1 Combat on a Melee Attack this turn. When used, your Combat Hits must be assigned to targets not adjacent to you at the start of your Activation."
          },
          {
              "name": "Move Like the Wind",
              "requires": "Dance of Death",
              "value": "You always count as having Cover 5+"
          },
          {
              "name": "Deadly Accuracy",
              "value": "Once per Fight, when you roll a Critical Hit on a To Hit, you may turn one of your normal Hits into a Critical as well."
          },
          {
              "name": "Clan Veteran",
              "requires": "Deadly Accuracy",
              "value": "You may now use your Ninja Clan's ability a second time during each Adventure. +1 Spirit",
              "modifiers":[{"affects":"Spirit","value":1}]
          },
          {
              "name": "Light on Your Feet",
              "requires": "Clan Veteran",
              "value": "+1 Initiative, +1 Agility, and +1 Move",
              "modifiers": [
                {"affects":"init","value": 1},
                {"affects":"Agility","value":1},
                {"affects":"move","value":1}
              ]
          },
          {
              "name": "Deep Slice",
              "requires": "Light on Your Feet",
              "value": "Once per turn, you may add a Bleeding Marker to a Target you assigned a Melee Critical Hit to. +1 Strength",
              "modifiers": [
                {
                  "affects": "Strength",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Distraction",
              "value": "Gain 2 Flash Powder side bag tokens. +2 Side Bag Capacity",
              "modifiers":[{"affects":"sidebag","value":1}]
          },
          {
              "name": "Mini-bombs",
              "requires": "Distraction",
              "value": "Gain 1 Bomb side bag token at the start of each Adventure. Once per Fight, you may throw an Explosive as a free attack."
          },
          {
              "name": "Chop Chop",
              "requires": "Mini-bombs",
              "value": "While you have 2 1-Handed or 1 2-Handed Hand Weapons equipped, you gain +1 Combat"
          },
          {
              "name": "Only a Ninja Can Kill a Ninja",
              "requires": "War Caster",
              "value": "You start every Adventure with a Revive Token usable only by you. Gain 25 XP any time you use it. +1 Spirit",
              "modifiers":[{"affects":"Spirit","value":1}]
          }
        ]
    },
    { //TREDERRAN VETERAN
      "name": "Trederran Veteran",
      "abilities": [
          {
              "desc": "Starts with a Trederran Veteran Faction card of your choice",
              "name": "Trederran Faction"
          },
          {
              "desc": "You are Defense 3+ instead against Enemy Ranged attacks and you do not need to target adjacent Enemies first when making a Ranged Attack.",
              "name": "Battle-Hardened"
          },
          {
              "desc": "Starts with a Terderra Personal Item instead of a normal one. Also, +3 Lore while in Trederra OtherWorld.",
              "name": "OtherWorld Native (Trederra)"
          }
      ],
      "classId": "e4f27631-8bc8-4ed1-b9d7-3186d37ad926",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
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
              "description": "Range 5, Shots 2, Damage +1",
              "hands": 1,
              "name": "Trusty Trench Pistol",
              "weight": 1,
              "slots": 2,
              "cost": 250,
              "keywords": "Gear, Trederra, Gun, Pistol",
              "source": "Starting Gear"
          },
          {
              "description": "+2 Health. While equipped, your Corruption Resistance is increased by 2",
              "hands": 0,
              "name": "Worn Trench Coat",
              "weight": 1,
              "slots": 2,
              "cost": 400,
              "keywords": "Gear, Trederra, Clothing, Coat",
              "source": "Starting Gear",
              "modifiers": [{"affects":"health","value":2},{"affects":"corruption","value":2}]
          },
          {
              "description": "Any time you would take a Corruption Point or gain a Poison marker, roll a D6. Ignore it on a roll of 5+",
              "hands": 0,
              "name": "Veteran's Breath Mask",
              "weight": 0,
              "slots": 0,
              "cost": 500,
              "keywords": "Gear, Trederra, Clothing, Face",
              "source": "Starting Gear"
          }
      ],
      "keywords": "OtherWorld, Trederra, Alien, Soldier",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "ranged": 3,
      "sanity": {
          "loss": 0,
          "max": 11
      },
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 2,
          "Cunning": 3,
          "Lore": 1,
          "Luck": 4,
          "Spirit": 2,
          "Strength": 3
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
      "upgrades": [
            {
              "name": "Field Officer",
              "type": "starting",
              "value": "At the start of every Fight, all Heroes may Recover a Grit on the D6 roll of 5+ each (or 4+ each if you are Level 4 or higher). Extra starting gear: Officer's Sabre"
            },
            {
              "name": "From the Front Lines",
              "type": "starting",
              "value": "Start every Adventure with D3 free Shatter Grenade tokens in your Side Bag. You also gain: Free Attack (once per Fight) - Throw Shatter Grenade. Extra starting gear: Old Dark Stone Carbine (replaces Trusty Trench Pistol)"
            },
            {
              "name": "Tainted by War",
              "type": "starting",
              "value": "+1 Max Grit. Start with a Mutation. When rolling for a Mutation, always roll twice and choose which to keep.",
              "modifiers": [ {"affects": "grit", "value":1} ]
            },

            {
              "multi": true,
              "name": "Dark Stone Hunter",
              "value": "Any time you gain 1 or more Dark Stone, you may gain 1 extra."
            },
            {
              "modifiers": [
                {
                  "affects": "corruption",
                  "value": "2"
                }
              ],
              "multi": true,
              "name": "Corruption Resistance",
              "value": "+2 Corruption Resistance"
            },
            {
              "modifiers": [
                {
                  "affects": "move",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Move",
              "value": "+1 Move"
            },
            {
            "modifiers": [
              {
                "affects": "Strength",
                "value": "1"
              }
            ],
            "name": "Strength and Sanity",
            "value": "+1 Strength. Also gain D6 Sanity.",
            "multi": true
            },
            {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning and Sanity",
            "value": "+1 Cunning. Also gain D6 Sanity.",
            "multi": true
          },
            {
            "modifiers": [
              {
                "affects": "Lore",
                "value": "1"
              }
            ],
            "multi": true,
            "name": "Lore and Sanity",
            "value": "+1 Lore. Also, gain +D6 Sanity"
          },
            {
            "modifiers": [
              {
                "affects": "Spirit",
                "value": "1"
              }
            ],
            "multi": true,
            "name": "Spirit and Sanity",
            "value": "+1 Spirit. Also gain +D6 Sanity."
          },
            {
             "multi": true,
             "name": "Health and Sanity",
             "value": "3 Health and 3 Sanity.",
             "modifiers": [
               {
                 "affects": "health",
                 "value": "3"
                 },
                 {
                   "affects": "sanity",
                   "value": "3"
                 }
             ]
           },
            {
             "modifiers": [
               {
                 "affects": "Agility",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Agility and Health",
             "value": "+1 Agility. Also gain +D6 Health."
           },
            {
             "modifiers": [
               {
                 "affects": "Spirit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Spirit and Health",
             "value": "+1 Spirit. Also gain +D6 Health."
           },
            {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative",
             "value": "+1 Initiative"
           },
            {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
            {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity"
           },
            {
             "multi": true,
             "name": "Personalized Gear",
             "value": "Choose any Item you have to gain an extra upgrade slot. Limit once per Item."
           },

          {
              "name": "Trench Scout",
              "value": "You may now roll 2 dice for Escape tests and choose which to use. +2 Move",
              "modifiers":[{"affects":"move","value":2}]
          },
          {
              "name": "Adrenaline Rush",
              "requires": "Trench Scout",
              "value": "At the start of any Fight, you may Heal D6 Wounds/Sanity (any mix)."
          },
          {
              "name": "Keen Eyes",
              "requires": "Adrenaline Rush",
              "value": "Whenever you draw one or more Loot or Scavenge cards, you may draw one extra (this may increase beyond the limit of 3 Loot per Fight)."
          },
          {
            "name": "Winds of Change",
            "requires": "Keen Eyes",
            "value": "Once per turn, you may make a Luck 6+ test to cancel and re-draw a Darkness, Growing Dread, Encounter, or Threat card just drawn. Gain 20 XP. +2 Corruption Resistance.",
            "modifiers":[{"affects":"corruption","value":1}]
          },
          {
            "name": "Soldier's Satchel",
            "value": "At the start of every Adventure, gain 1 of the following Side Bag Tokens for free: Bandages, Whiskey (Sake), Shatter Grenade. +2 Side Bag Capacity",
            "modifiers":[{"affects":"sidebag","value":2}]
          },
          {
            "name": "Battle Gear",
            "value": "You are +1 Health for each Clothing Item you have equipped. +1 Strength",
            "requires": "Soldier's Satchel",
            "modifiers":[{"affects":"Strength","value":1}]
          },
          {
            "name": "Unflinching",
            "requires": "Battle Gear",
            "value": "Willpower 3+",
            "modifiers":[{"affects":"willpower","value":3}]
          },
          {
              "name": "Trederran Sunset",
              "requires": "Unflinching",
              "value": "Any time you are KO'd, you may do 2D6 Wounds to every adjacent model, ignoring Defense. You now have unlimited Max Grit.",
              "modifiers":[{"affects":"grit","value":99}]
          },
          {
              "name": "Dark Stone Shots",
              "value": "Once per turn, discard a Dark Stone to add extra Damage to one of your Gun Hits, equal to the number of upgrade slots the Gun has."
          },
          {
              "name": "Weapons Training",
              "requires": "Dark Stone Shots",
              "value": "When using any 1-Handed Gun, add +2 Range. When using any 2-Handed Gun, add +1 Shot."
          },
          {
              "name": "Firefight",
              "requires": "Weapons Training",
              "value": "Once per turn, when you kill an Enemy with a Ranged Attack, make a Cunning 6+ test to Recover 1 Grit for each 6+ rolled."
          },
          {
              "name": "Death Machine",
              "requires": "Firefight",
              "value": "Once per turn, use 2 Grit to make an extra Ranged Attack. +1 Max Grit.",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Ruthless",
              "value": "Once per Fight, you may take 1 Corruption Hit to add +D3 Damage to one of your Hits"
          },
          {
              "name": "Dark Stone Greed",
              "requires": "Ruthless",
              "value": "You are +1 Sanity for each Dark Stone icon on Items you are carrying. This includes Dark Stone that is hidden. (max +10)"
          },
          {
              "name": "Watch the World Burn",
              "requires": "Dark Stone Greed",
              "value": "Any time the Darkness moves 1 or more spaces forward on the Depth Track, you may Recover a Grit. +1 Lore",
              "modifiers":[{"affects":"Lore","value":1}]
          },
          {
              "name": "Frenzy",
              "requires": "Watch the World Burn",
              "value": "You are +1 Combat for each Mutation you have (Limit +3). Free Attack once per Fight: Use 1 Grit to make an extra Melee Attack"
          }
        ]
    },
    { //SOLDIER
      "name": "Soldier",
      "abilities": [
          {
              "desc": "If you do not move during your Activation, add +1 Shot to any 2-handed Bun you attack with.",
              "name": "Soldier's Reload"
          },
          {
              "desc": "You do not need to target adjacent Enemies first with your Ranged Attacks.",
              "name": "Fire Discipline"
          }
      ],
      "classId": "7b56f8f2-54b7-4458-9194-ae22c945182f",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 10,
          "wounds": 0
      },
      "init": 3,
      "items": [
          {
              "description": "Range 10, Shots 1. Use Peril Die + 1 for Damage. Hits from this Gun may not be assigned to Enemies adjacent to you.",
              "hands": 2,
              "name": "Flintlock Rifle",
              "weight": 1,
              "slots": 3,
              "cost": 450,
              "keywords": "Gear, Gun, Rifle",
              "source": "Starting Gear"
          },
          {
              "description": "Armor 6+, +2 Health",
              "hands": 0,
              "name": "Soldier's Armor",
              "weight": 1,
              "slots": 1,
              "cost": 400,
              "keywords": "Gear, Clothing, Torso",
              "source": "Starting Gear",
              "modifiers":[{"affects":"armor","value":6},{"affects":"health","value":2}]
          }
      ],
      "keywords": "Soldier, Scout",
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
          "Lore": 1,
          "Luck": 4,
          "Spirit": 2,
          "Strength": 3
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Sharp Shooter",
              "type": "starting",
              "value": "Any time you kill an Enemy with a Ranged Critical Hit, Recover a Grit on D6 of 4+. Once per Fight, use 1 Grit to add +D6 Damage to one of your Gun Hits."
            },
            {
              "name": "Fall Back",
              "type": "starting",
              "value": "At the start of your Activation each turn, during the Fight, you may make a free move up to 2 spaces, ignoring Escape tests. This free move does not prevent the use of the Soldier's Reload Ability."
            },
            {
              "name": "Military Scout",
              "type": "starting",
              "value": "+1 Move. Once per Turn, use 1 Grit to cancel and re-draw an Encounter, Threat card, Darkness, or Exploration Token. When you do, gain 15 XP.",
              "modifiers":[{"affects":"move","value":1}]
            },

          {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D6 Health/Sanity (any mix).",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Spirit",
                "value": "1"
              }
            ],
            "name": "Spirit",
            "value": "+1 Spirit. Also gain D6 Health/Sanity (any mix).",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "D6 Health and D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative",
             "value": "+1 Initiative"
           },
           {
             "modifiers": [
               {
                 "affects": "Strength",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Strength and Health",
             "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
           },
           {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck and Health",
             "value": "+1 Luck. Also, gain +D6 Health/Sanity (any mix)"
           },
           {
             "multi": true,
             "name": "Battlefield Rivalry",
             "value": "Choose an Enemy keyword. From now on, any time you kill one of those Enemies, Heal 1 Wound or Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Cunning",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Cunning",
             "value": "+1 Cunning. Also gain +D6 Health/Sanity (any mix)."
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore",
             "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
           },
           {
             "modifiers": [{"affects": "grit","value": "1"}
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
           {
             "modifiers": [
               {
                 "affects": "move",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Move",
             "value": "+1 Move"
           },
           {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity. Also gain +D6 Health/Sanity (any mix)."
           },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },

          {
              "name": "Rifle Butt",
              "value": "While you have 2-Handed Gun equipped, you are +2 Combat. +1 Initiative",
              "modifiers": [{"affects":"init","value":1}]
          },
          {
              "name": "Double Shot (Rifle)",
              "requires": "Rifle Butt",
              "value": "Once per turn, when you kill an Enemy with a Rifle, you gain +1 Shot with that Rifle"
          },
          {
             "name": "Banzai!",
             "requires": "Double Shot (Rifle)",
             "value": "Once per fight, use 1 Grit to gain +D6 Move, ignore Escape tests, and all of your Combat Hits are +2 Damage until end of the turn. +1 Initiative.",
             "modifiers": [{"affects":"init","value":1}]
          },
          {
            "name": "Expert Gunner",
            "requires": "Banzai!",
            "value": "You may use the D8 when rolling to hit for all your Ranged To Hit rolls. +1 Initiative.",
            "modifiers": [{"affects":"init","value":1}]
          },
          {
            "name": "Team Defense",
            "value": "Every other Hero adjacent to you may Re-roll one of their Defense rolls per turn. If this re-rolled Defense is successful, gain 5 XP."
          },
          {
            "name": "Armed to the Teeth",
            "value": "For each Gun and Hand Weapon you are carrying, gain +2 Health (max +10). +1 Strength.",
            "requires": "Team Defense",
            "modifiers": [{"affects":"Strength","value":1}]
          },
          {
            "name": "Sacrifice",
            "requires": "Armed to the Teeth",
            "value": "Once per turn, take D6 Wounds, ignoring Defense, to prevent all Damage that another Hero within 2 spaces would take from a single source. Gain 20 XP."
          },
          {
              "name": "Never Say Die",
              "requires": "Sacrifice",
              "value": "Once per Adventure, at the start of a turn, you may automatically Recover from being KO'd, as long as there are no Enemies adjacent to you. Roll to Heal as normal, but do not roll for Injury or Madness."
          },
          {
              "name": "Stand Firm",
              "value": "Once per Adventure, cancel a Darkness card. Gain 10 XP"
          },
          {
              "name": "See It Through",
              "requires": "Stand Firm",
              "value": "Whenever a Growing Dread card is drawn, Recover a Grit. +1 Spirit.",
              "modifiers": [{"affects":"Spirit","value":1}]
          },
          {
              "name": "Revenge",
              "requires": "See It Through",
              "value": "Whenever another Hero or Ally is KO'd, Recover a Grit and you are +1 Combat/Shot (choose) during your next Activation. +1 Max Grit.",
              "modifiers": [{"affects":"grit","value":1}]
          },
          {
              "name": "Nobody Left Behind",
              "requires": "Revenge",
              "value": "Use 2 Grit to Recover another KO'd Hero adjacent to you, even if there are multiple Enemies on the same Map Tile. Gain 25 XP and that Hero may roll 3 dice for Injury/Madness, discarding the lowest die."
          },
          {
              "name": "Survivor",
              "value": "Once per turn, add +1 to all of your Armor rolls just made."
          },
          {
              "name": "Deflect",
              "requires": "Survivor",
              "value": "Once per turn, you may force an adjacent Enemy to re-roll one of its To Hit rolls against you."
          },
          {
              "name": "Tough as Nails",
              "requires": "Deflect",
              "value": "Increase the Armor value by 1 of any Armor you have equipped."
          },
          {
              "name": "Last Man Standing",
              "requires": "Tough as Nails",
              "value": "Defense 3+",
              "modifiers": [{"affects":"defense","value":3}]
          }
        ]
    },
    { //ENFORCER
      "name": "Enforcer",
      "abilities": [
          {
              "desc": "You have Endurance 4. You may not take more than 4 Wounds from any single Hit.",
              "name": "High Pain Threshold"
          },
          {
              "desc": "Always rolls 1 extra die when Scavenging",
              "name": "Mercenary"
          }
      ],
      "classId": "1b2246b8-ccc1-4408-96e4-069780cdfc97",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 3,
      "endurance": 4,
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 10,
          "wounds": 0
      },
      "init": 2,
      "items": [
          {
              "description": "Your Combat Hits are +1 Damage against Medium or smaller Enemies. Gain $10 any time you kill an Enemy. Outlaw Only",
              "hands": 1,
              "name": "Outlaw Club",
              "weight": 1,
              "slots": 2,
              "cost": 250,
              "keywords": "Gear, Hand Weapon",
              "source": "Starting Gear"
          },
          {
              "description": "+2 Health. Once per Adventure, fully Heal your Health. This Item may not be discarded, traded, or lost in any way. Outlaw Only",
              "hands": 0,
              "name": "Shoulder Tattoo",
              "weight": 0,
              "slots": 0,
              "cost": 0,
              "keywords": "Gear, Tattoo",
              "source": "Starting Gear",
              "modifiers":[{"affects":"health","value":2}]
          }
      ],
      "keywords": "Outlaw, Showman",
      "level": 1,
      "melee": 3,
      "movement": 0,
      "ranged": 5,
      "sanity": {
          "loss": 0,
          "max": 10
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
              "name": "Finding a Weakness",
              "type": "starting",
              "value": "Once per Turn, use 1 Grit to double one of your Damage rolls (before any modifiers). This Damage also ignores Armor."
            },
            {
              "name": "Failure is No Option",
              "type": "starting",
              "value": "+1 Max Grit. You Recover a Grit at the start of your Activation each turn. Make note whenever you Fail a Mission (you must cut off a finger for each). After 5 failed missions, you gain -1 Combat and +1 Max Grit. After 10 Failed Missions, you lose the use of 1 Hand.",
              "modifiers":[{"affects":"grit","value":1}]
            },
            {
              "name": "A Hard Life",
              "type": "starting",
              "value": "+2 Sanity. Once per Turn/Day in Town, you may Re-roll a single Willpower roll. You are immune to all Status Effect markers.",
              "modifiers":[{"affects":"sanity","value":2}]
            },


          {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D3 Sanity.",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Spirit",
                "value": "1"
              }
            ],
            "name": "Spirit",
            "value": "+1 Spirit. Also gain D3 Sanity.",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "D6 Health and 2 Sanity.",
             "modifiers": [{"affects": "sanity","value": 2}]
           },
           {
             "modifiers": [{"affects": "init","value": "1"}],
             "multi": true,
             "name": "Initiative",
             "value": "+1 Initiative."
           },
           {
             "modifiers": [
               {
                 "affects": "Cunning",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Cunning and Health",
             "value": "+1 Cunning. Also, gain +D6 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore and Health",
             "value": "+1 Lore. Also, gain +D6 Health"
           },
           {
             "multi": true,
             "name": "Proud Scars",
             "value": "Every time you successfully remove an Injury, Mutation, or Parasite, roll a D6. On 5+, gain 1 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore and Sanity",
             "value": "+1 Lore. Also gain +D3 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck and Sanity",
             "value": "+1 Luck. Also gain +D3 Sanity."
           },
           {
             "multi": true,
             "name": "Tribute",
             "value": "At the start of every Town Stay, gain D6 x $10"
           },
           {
             "modifiers": [
               {
                 "affects": "move",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Move",
             "value": "+1 Move"
           },
           {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity"
           },
           {
             "modifiers": [{"affects": "weight", "value": 1 }],
             "multi": true,
             "name": "You may carry 1 extra weight",
             "value": "You may carry 1 extra weight"
           },

          {
              "name": "Stern Glare",
              "value": "Spirit Armor 5+",
              "modifiers":[{"affects":"spiritArmor","value":5}]
          },
          {
              "name": "Infamy",
              "requires": "Stern Glare",
              "value": "Once per Town Stay, you may intimidate a local shopkeeper to pay D6x$25 less for a single Item or Service."
          },
          {
              "name": "Cripple",
            "requires": "Infamy",
            "value": "Use 1 Grit when you do 2 or more Wounds to an Enemy. That model is Crippled (-1 Defense, -1 Move, limit once per model). May not be used on models immune to Critical Hits."
          },
          {
            "name": "Gruesom Punishment",
            "requires": "Cripple",
            "value": "Your Melee To Hit rolls of 6+ also add a Bleeding marker on D6 roll of 4, 5, or 6 each. +1 Strength",
            "modifiers":[{"affects":"Strength","value":1}]
          },
          {
            "name": "Make an Example",
            "value": "Choose one Enemy at the start of your Activation each turn during a Fight. Until the end of the turn, your To Hit rolls of 5+ count as Critical Hits against that model."
          },
          {
            "name": "Just Try It",
            "value": "Anytime the Darkness would escape on the Depth Track, roll a D6. On the roll of 5+, instead place the marker on the last space before escaping. Gain 20 XP."
          },
          {
            "name": "Merciless",
            "requires": "Just Try It",
            "value": "While you have 2 1-Handed Weapons equipped, you are +1 Combat. +1 Agility.",
            "modifiers":[{"affects":"Agility","value":1}]
          },
          {
              "name": "Laughs at Death",
              "requires": "Merciless",
              "value": "Heal 1 Wound at the start of each turn. When Recovering from being KOd, you may Heal double the amount rolled (any mix)"
          },
          {
              "name": "For the Challenge",
              "value": "Your Attacks are +1 Damage against Enemies with the Fear, Terror, or Unspeakable Terror ability."
          },
          {
              "name": "The High Life",
              "requires": "For the Challenge",
              "value": "Anytime you would draw a Loot or Scavenge card, you may Heal 1 Wound or 1 Sanity. +1 Luck",
              "modifiers":[{"affects":"Luck","value":1}]
          },
          {
              "name": "Fools Rush In",
              "requires": "The High Life",
              "value": "During the first turn of a Fight, while on a Map Tile where Enemies were placed, gain +1 Combat for every two spaces you start your Activation from the entrance spaces of that Map Tile."
          },
          {
              "name": "You Don't Scare Me!",
              "requires": "Fools Rush In",
              "value": "Willpower 4+. +1 Combat.",
              "modifiers":[{"affects":"combat","value":1},{"affects":"willpower","value":4}]
          },
          {
              "name": "Iron Nerves",
              "value": "Your High Pain Threshold is now Endurance 3. +2 Sanity.",
              "modifiers":[{"affects":"sanity","value":2},{"affects":"endurance","value":3}]
          },
          {
              "name": "No Compromise",
              "requires": "Iron Nerves",
              "value": "Once per Adventure, use 2 Grit to fully Heal your Sanity. +1 Max Grit.",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Confidence",
              "requires": "No Compromise",
              "value": "You are +1 Sanity for each tattoo you have. +1 Max Grit.",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Feels No Pain",
              "requires": "Confidence",
              "value": "Your High Pain Threshold is now Endurance 2. +2 Sanity.",
              "modifiers":[{"affects":"sanity","value":2},{"affects":"endurance","value":2}]
          }
        ]
    },
    { //DAIMYO
      "name": "Daimyo",
      "abilities": [
          {
              "desc": "Starts with 2 random Samurai Battle Tactics drawn from any Battle Tactics decks (draw 2, choose 1 for each). Each may only be used once per Turn.",
              "name": "Samurai Battle Tactis"
          },
          {
              "desc": "Any time you or an Ally does one or more Wounds to an Enemy with a Combat or Ranged Hit, gain 1 Fury Token.",
              "name": "Command Fury"
          },
          {
              "desc": "Starts each Adventure with 1 Armored Ashigaru Ally",
              "name": "Honor Guard"
          }
      ],
      "classId": "31bc6866-d846-417e-8ce3-9b7e4fc18c61",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
      "fury": { "max": 5, "current": 0 },
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 10,
          "wounds": 0
      },
      "init": 3,
      "items": [
          {
              "description": "Range 4, Shots 2. +1 Damage. Spend 2 Fury to gain +1 Shot. These extra Shots do not generate Fury Tokens.",
              "hands": 1,
              "name": "Daimyo Pisol",
              "weight": 1,
              "slots": 1,
              "cost": 400,
              "keywords": "Gear, Gun, Pistol",
              "source": "Starting Gear"
          },
          {
              "description": "Armor 5+. +1 Max Grit. Samurai Only",
              "hands": 0,
              "name": "General's Armor",
              "weight": 1,
              "slots": 1,
              "cost": 650,
              "keywords": "Gear, Clothing, Torso, Shoulders",
              "source": "Starting Gear",
              "modifiers":[{"affects":"armor","value":5},{"affects":"grit","value":1}]
          },
          {
              "description": "Once per turn, you may ignore an Enemy's Defense and Armor for a single Combat Hit",
              "hands": 1,
              "name": "Warlord's Katana",
              "weight": 1,
              "slots": 2,
              "cost": 275,
              "keywords": "Gear, Blade, Hand Weapon",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Samurai, Showman, Soldier",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "ranged": 4,
      "sanity": {
          "loss": 0,
          "max": 12
      },
      "samuraiTactics": [

      ],
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 3,
          "Cunning": 4,
          "Lore": 2,
          "Luck": 2,
          "Spirit": 1,
          "Strength": 3
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Battlefield General",
              "type": "starting",
              "value": "Start each Adventure with D3 Armored Ashigaru Allies instead of 1. At the start of any turn, spend 4 Fury and 2 Grit to place a new Armored Ashigaru Ally in any space adjacent to you (limit 3 on the board at a time)."
            },
            {
              "name": "Strategist",
              "type": "starting",
              "value": "At the start of each turn, you may choose one other Hero or Ally to gain +2 Initiative until the end of the turn or Heal 1 Sanity. Extra Starting Gear: Daimyo War Fan."
            },
            {
              "name": "Warlord",
              "type": "starting",
              "value": "During a Fight, roll a D6 at the start of each turn. On rolls of 3+, gain 1 Fury. Extra starting gear: Impressive Helmet."
            },

            {
              "multi": true,
              "name": "Honorable Vendetta",
              "value": "Choose an Enemy Keyword. From now on, any time you collect XP from those Enemies, collect an extra 10 XP"
            },
            {
              "modifiers": [{"affects": "fury","value": "1"}],
              "name": "Max Fury",
              "value": "+1 Max Fury",
              "multi": true
            },
            {
              "modifiers": [
                {
                  "affects": "move",
                  "value": "1"
                }
              ],
              "multi": true,
              "name": "Move",
              "value": "+1 Move"
            },
            {
            "modifiers": [
              {
                "affects": "Strength",
                "value": "1"
              }
            ],
            "name": "Strength and Sanity",
            "value": "+1 Strength. Also gain D6 Sanity.",
            "multi": true
          },
            {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning and Sanity",
            "value": "+1 Cunning. Also gain D6 Sanity.",
            "multi": true
          },
            {
             "modifiers": [
               {
                 "affects": "Spirit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Spirit and Health/Sanity",
             "value": "+1 Spirit. Also, gain +D6 Health/Sanity (any mix)"
           },
            {
             "modifiers": [
               {
                 "affects": "Agility",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Agility and Health/Sanity",
             "value": "+1 Agility. Also gain +D6 Health/Sanity (any mix)."
           },
            {
            "multi": true,
            "name": "Health and Sanity",
            "value": "D6 Health and D6 Sanity."
          },
            {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore and Health/Sanity",
             "value": "+1 Lore. Also gain +D6 Health/Sanity (any mix)."
            },
            {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck and Health/Sanity",
             "value": "+1 Luck. Also gain +D6 Health/Sanity (any mix)."
            },
            {
              "modifiers": [
                {
                  "affects": "sidebag",
                  "value": "2"
                }
              ],
              "multi": true,
              "name": "Side Bag Capacity",
              "value": "+2 Side Bag Token Capacity"
            },
            {
            "modifiers": [
              {
                "affects": "init",
                "value": "1"
              }
            ],
            "multi": true,
            "name": "Initiative",
            "value": "+1 Initiative"
          },
            {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
            {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },

          {
              "name": "First Blood",
              "value": "Whenever you do Damage to a previously unwounded Enemy, gain +5 XP. +1 Initiative.",
              "modifiers":[{"affects":"init","value":1}]
          },
          {
              "name": "Know Thy Enemy",
              "requires": "First Blood",
              "value": "At the start of each turn during a Fight, roll a D6. You may choose all Enemies with Initiative above the roll OR all below the roll to be -1 Defense until the end of the turn."
          },
          {
              "name": "Battle Charge",
            "requires": "Know Thy Enemy",
            "value": "Once per Fight, use 4 Fury to give all Heroes and Allies on your Map Tile +1 Combat during their next Activation. You may not gain any more Fury until the end of the turn."
          },
          {
            "name": "Unmatched",
            "requires": "Battle Charge",
            "value": "Choose 2: Defense 3+, Willpower 3+, Ranged 3+, or Melee 3+"
          },
          {
            "name": "Survey the Field",
            "value": "At the start of every Fight, Recover 1 Grit"
          },
          {
            "name": "Standing Army",
            "value": "All Allies cost you half price to Hire (round up to nearest $5). Once per Travel, you may force one Travel Hazard to be re-rolled.",
            "requires": "Survey the Field"
          },
          {
            "name": "Ruthless Volley",
            "requires": "Standing Army",
            "value": "You and all Allies in the Hero Party may add +1 Shot to any Gun or Bow used"
          },
          {
              "name": "Supply Chain",
              "requires": "Ruthless Volley",
              "value": "At the start of every Fight, gain 1 of the following Side Bag Tokens for free: Bandages, Sake, Fire Sake, or Bomb"
          },
          {
              "name": "Inspiring Figure",
              "value": "All Allies in the Hero Party are +1 Health and +1 Sanity. +1 Lore",
              "modifiers": [{"affects": "Lore","value": "1"}]
          },
          {
              "name": "Training Drills",
              "requires": "Inspiring Figure",
              "value": "Once per turn, you may re-roll an Ally's roll on the Exploration Chart when using their Check It Out ability."
          },
          {
              "name": "Direction",
              "requires": "Training Drills",
              "value": "You may use your Grit on dice rolled by any Ally in the Hero Party"
          },
          {
              "name": "Legendary Leader",
              "requires": "Direction",
              "value": "Armored Ashigaru in the Hero Party are now Defense 3+ and Willpower 3+. +1 Combat",
              "modifiers": [{"affects": "combat","value": "1"}]
          },
          {
              "name": "Battle Plan",
              "value": "New Samurai Battle Tactic. +1 Luck",
              "modifiers": [{"affects": "Luck","value": "1"}]
          },
          {
              "name": "Tribute",
              "requires": "Battle Plan",
              "value": "At the start of each Town Stay, you gain $50 x your Hero Level. +1 Max Fury",
              "modifiers": [{"affects": "fury","value": "1"}]
          },
          {
              "name": "Veteran",
              "requires": "Tribute",
              "value": "New Samurai Battle Tactic. +1 Initiative.",
              "modifiers": [{"affects": "init","value": "1"}]
          },
          {
              "name": "Battlemaster",
              "requires": "Veteran",
              "value": "At the start of each Adventure, draw 2 new Samurai Battle Tactics, for use only during this Adventure. Discard these at the end of the Adventure. +1 Max Fury",
              "modifiers": [{"affects": "fury","value": "1"}]
          }
        ]
    },
    { //GEISHA
      "name": "Geisha / Kabuki",
      "abilities": [
          {
              "desc": "At the end of the Turn, may Heal D3 Sanity Damage from one other adjacent Hero (gain 5 XP) for each Sanity Damage healed.",
              "name": "Reassuring Touch"
          },
          {
              "desc": "May not use 2-handed items",
              "name": "Dainty"
          },
          {
              "desc": "+1 Move",
              "name": "Fast"
          }
      ],
      "classId": "a5d012db-f221-4ad3-89de-cc6bf78b6e21",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 3,
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
              "description": "Once per Turn, you may re-roll a single failed Defense or Escape roll. Ignore Weather effects. Performer Only",
              "hands": 1,
              "name": "Parasol",
              "weight": 0,
              "slots": 2,
              "cost": 250,
              "keywords": "Gear, Hand Weapon, Parasol",
              "source": "Starting Gear"
          },
          {
              "description": "Use any time during your Move: Free Attack (once per turn) - Do 1 automatic Wound, ignoring Defense, to an adjacent model. Stealth Only",
              "hands": 0,
              "name": "Hidden Dagger",
              "weight": 0,
              "slots": 0,
              "cost": 300,
              "keywords": "Gear, Blade",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Stealth, Showman, Performer",
      "level": 1,
      "melee": 4,
      "movement": 1,
      "ranged": 4,
      "sanity": {
          "loss": 0,
          "max": 12
      },
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 3,
          "Cunning": 4,
          "Lore": 2,
          "Luck": 2,
          "Spirit": 3,
          "Strength": 1
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Distract",
              "type": "starting",
              "value": "+1 Initiative. At the end of your Move, choose an Enemy model adjacent to you. Until the end of the turn, that Enemy is -1 Defense.",
              "modifiers": [{"affects":"init","value":1}]
            },
            {
              "name": "Outwit",
              "type": "starting",
              "value": "All of your Combat Hits are +1 Damage against Enemies that have Initiative equal to or lower than your Cunning. Once per Adventure, add Damage equal to your Cunning to one of your Combat Hits"
            },
            {
              "name": "Comforting Laugh",
              "type": "starting",
              "value": "Any time you draw a Loot card, you may Recover Grit on D6 roll of 5 or 6. Once per Turn, use 1 Grit to Heal D6 Wounds from any mix of other Heroes on your Map Tile (gain XP for this Healing as normal)."
            },

          {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D6 Sanity.",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Spirit",
                "value": "1"
              }
            ],
            "name": "Spirit",
            "value": "+1 Spirit. Also gain D6 Sanity.",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "3 Health and 3 Sanity.",
             "modifiers": [
               {
                 "affects": "health",
                 "value": "3"
                 },
                 {
                   "affects": "sanity",
                   "value": "3"
                 }
             ]
           },
           {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative and Health",
             "value": "+1 Initiative. Also, gain +D6 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Strength",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Strength and Health/Sanity",
             "value": "+1 Strength. Also, gain +D6 Health/Sanity (any mix)"
           },
           {
             "modifiers": [
               {
                 "affects": "Cunning",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Cunning and Health/Sanity",
             "value": "+1 Cunning. Also, gain +D6 Health/Sanity (any mix)"
           },
           {
             "multi": true,
             "name": "Hired Kill",
             "value": "Once per Adventure, choose an Enemy model at the start of a Fight. If you kill that model, gain D6 x $50."
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore",
             "value": "+1 Lore. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck",
             "value": "+1 Luck. Also gain +D6 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
           {
             "modifiers": [
               {
                 "affects": "move",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Move",
             "value": "+1 Move"
           },
           {
             "multi": true,
             "name": "Fame",
             "value": "Once per Town stay, re-roll any single die."
           },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },
           {
             "multi": true,
             "name": "Health",
             "value": "Gain Peril Die Health"
         },

          {
              "name": "Twirl",
              "value": "While you have a Parasol equipped, you may re-roll one of your Melee To Hit rolls each turn. +1 Agility.",
              "modifiers":[{"affects":"Agility","value":1}]
          },
          {
              "name": "Awareness",
              "requires": "Twirl",
              "value": "Once per turn, use 1 Grit to cancel the effects of a single Scavenge card just drawn. Gain 10 XP. You may also roll an extra die for scavenging."
          },
          {
              "name": "Dance",
            "requires": "Awareness",
            "value": "You automatically pass all Escape tests and may move through other models. +1 Agility.",
            "modifiers":[{"affects":"Agility","value":1}]
          },
          {
            "name": "Flashing Steel",
            "requires": "Dance",
            "value": "Gain +1 Combat for each 1-Handed Item you have equipped (+2 for a Parasol)"
          },
          {
            "name": "Smile",
            "value": "When using Reassuring Touch, may now Heal all adjacent Heroes. +2 Health",
            "modifiers":[{"affects":"health","value":2}]
          },
          {
            "name": "Unassuming",
            "value": "When rolling on a Town Location Event Chart, you may roll 3 D6 and discard the lowest single die. +1 Cunning",
            "modifiers":[{"affects":"Cunning","value":1}]
          },
          {
            "name": "Humble Bow",
            "requires": "Unassuming",
            "value": "At the start of a turn, during a Fight, Recover a Grit on the D6 of 4+. +1 Max Grit.",
            "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Stunning Beauty",
              "requires": "Humble Bow",
              "value": "All Enemies adjacent to  you are -1 Defense. +1 Strength.",
              "modifiers":[{"affects":"Strength","value":1}]
          },
          {
              "name": "Misdirect",
              "value": "Once per turn, use 1 Grit to re-roll any number of Enemy To-Hit rolls just rolled against a single Hero on your Map Tile. +1 Cunning.",
              "modifiers":[{"affects":"Cunning","value":1}]
          },
          {
              "name": "Pyrotechnics",
              "requires": "Misdirect",
              "value": "Once per Fight, use 1 Grit to immediately gain and throw a Bomb Token as a Free Attack."
          },
          {
              "name": "Fast Hands",
              "requires": "Pyrotechnics",
              "value": "You may now make up to 2 Free Attacks per turn. These are still limited by their 'Once per...' restrictions. +1 Initiative.",
              "modifiers": [
                {
                  "affects": "init",
                  "value": "1"
                }
              ]
          },
          {
              "name": "Elegant Performance",
              "requires": "Fast Hands",
              "value": "Any Enemy targeting you is -1 Combat/Shot (min 1). +1 Combat.",
              "modifiers":[{"affects":"combat","value":1}]
          },
          {
              "name": "Crush",
              "value": "Adjacent Enemies may not Heal Wounds. At the end of your Activation, you may remove 1 adjacent Corpse token. Gain 10 XP."
          },
          {
              "name": "Deep Slice",
              "requires": "Crush",
              "value": "When using your Hidden Dagger, does D3 Wounds instead of only 1."
          },
          {
              "name": "Sabotage",
              "requires": "Deep Slice",
              "value": "Once per Fight, at the start of a turn, use 1 Grit to choose a single Enemy that is Large or smaller. Select one ability on that Enemy's sheet to disable for the turn."
          },
          {
              "name": "Eviscerate",
              "requires": "Sabotage",
              "value": "Free Attack once per turn: Use 2 Grit to do D6 Wounds, ignoring Defense, to each Enemy adjacent to you. +1 Max Grit.",
              "modifiers":[{"affects":"grit","value":1}]
          }
        ]
    },
    { //KITSUNE
      "name": "Kitsune",
      "abilities": [
          {
              "desc": "Enemies are -1 on their To Hit rolls targeting this Hero (6+ still hits and triggers special abilities)",
              "name": "Hiding in Plain Sight"
          },
          {
              "desc": "Always Activates before Enemies at Initiative level and automatically passes Escape tests.",
              "name": "Quick"
          }
      ],
      "classId": "b4227b26-3e3f-416e-8f4c-6dfe5bebe3cd",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
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
              "description": "Your Combat Hits treat Enemy Defense higher than 2 as only 2. If equipped as 2-handed, you are +1 Initiative. Stealth Only",
              "hands": 1,
              "name": "Kama Knives",
              "weight": 1,
              "slots": 2,
              "cost": 600,
              "keywords": "Gear, Hand Weapon",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Stealth, Traveler, OtherWorld Myth",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "ranged": 4,
      "sanity": {
          "loss": 0,
          "max": 13
      },
      "sidebag": {
          "capacity": 5
      },
      "stats": {
          "Agility": 3,
          "Cunning": 2,
          "Lore": 3,
          "Luck": 1,
          "Spirit": 4,
          "Strength": 2
      },
      "wealth": 0,
      "willpower": 3,
      "xp": 0,
        "upgrades": [

            {
              "name": "Trickster",
              "type": "starting",
              "value": "You Recover Grit on Move rolls of 1 or 6. Once per Turn, use 1 Grit to choose any single D6 just rolled and place it on this card.  If there was already a die here, it is swapped for the new one using its value to replace the die just taken. If there was not already a die, roll a new one to replace the one taken. Any die here is discarded when KO'd or at the end of the Adventure"
            },
            {
              "name": "Pounce",
              "type": "starting",
              "value": "You are +1 Move and may move through other models. Your Combat Hits are +1 Damage against Enemies that have not Activated this turn.",
              "modifiers":[{"affects":"move","value":1}]
            },
            {
              "name": "Elemental Spirit",
              "type": "starting",
              "value": "Choose one Magik Element (Fire, Wind, Earth, Water) to become a Fox guardian of that type. Mana 3. You are Keyword Magik and get 1 Spell from that element deck (draw 2, choose 1). You may cast Spells you have using Mana like a Sorcerer/Sorceress. Each time you gain Hero levels 2, 4, 6, or 8, you may either gain +1 Mana OR gain a new Spell of your Element",
              "modifiers": [{"affects":"mana","value":3}]
            },


          {
            "modifiers": [
              {
                "affects": "Agility",
                "value": "1"
              }
            ],
            "name": "Agility",
            "value": "+1 Agility. Also gain D3+1 Sanity.",
            "multi": true
          },
          {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning",
            "value": "+1 Cunning. Also gain D3+1 Sanity.",
            "multi": true
          },
           {
             "multi": true,
             "name": "Health and Sanity",
             "value": "D8 Health/Sanity (any mix)."
           },
           {
             "modifiers": [
               {
                 "affects": "init",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Initiative and Health",
             "value": "+1 Initiative. Also, gain D3+1 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Strength",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Strength and Health",
             "value": "+1 Strength. Also, gain D3+1 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Cunning",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Cunning and Sanity",
             "value": "+1 Cunning. Also, gain D3+1 Health"
           },
           {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore",
             "value": "+1 Lore. Also gain D3+1 Health."
           },
           {
             "multi": true,
             "name": "Guardian Traveler",
             "value": "Choose an OtherWorld. While in that World, you are +1 Move and +1 Lore."
           },
           {
             "multi": true,
             "name": "Fox Trick",
             "value": "Choose an Enemy Keyword. From now on, you take -1 Damage from Attacks made by those Enemies (min 1). Limit once per Keyword."
           },
           {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
           {
             "modifiers": [
               {
                 "affects": "move",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Move",
             "value": "+1 Move"
           },
           {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity and Sanity",
             "value": "+2 Side Bag Token Capacity. Also gain D3+1 Sanity."
           },
           {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },


          {
              "name": "Foretell",
              "value": "Whenever one or more Threat cards are drawn, every Hero on your Map Tile may Recover a Grit on D6 of 5+ each."
          },
          {
              "name": "In Time of Need",
              "requires": "Foretell",
              "value": "Whenever a Darkness card is drawn, every Hero on your Map Tile may Heal D3 Wounds/Sanity (any mix)."
          },
          {
              "modifiers": [{"affects": "grit","value": "1"}],
              "name": "Force of Good",
              "requires": "In Time of Need",
              "value": "Whenever the Hero Party marker moves onto a Growing Dread or Blood Splatter space, Recover a Grit. +1 Max Grit."
          },
          {
            "name": "Intefere",
            "requires": "Force of Good",
            "value": "Use 2 Grit to cancel a Growing Dread card. Gain 20 XP. +1 Max Grit.",
            "modifiers": [{"affects": "grit","value": "1"}]
          },
          {
            "name": "Nature's Touch",
            "value": "Once per turn, use 1 Grit to Heal D3 Wounds from each Hero on your Map Tile."
          },
          {
            "name": "Resistance",
            "value": "Spirit Armor 5+. +2 Corruption Resistance.",
            "requires": "Nature's Touch",
            "modifiers": [{"affects": "spiritArmor","value": 5},{"affects":"corruption","value":2}]
          },
          {
            "name": "Furry Protector",
            "requires": "Resistance",
            "value": "You may use your Grit to re-roll any number of dice for another Hero's Defense roll just made. When using Grit to re-roll Defense rolls, add +1 to the dice."
          },
          {
              "name": "Defining Moment",
              "requires": "Furry Protector",
              "value": "Once per Adventure, ready all of your other 'Once per' items and abilities currently exhausted (does not ready 'Defining Moment')."
          },
          {
              "name": "Animal Reflexes",
              "value": "You are +2 Initiative during the first turn of any Ambush Attack. +1 Initiative.",
              "modifiers": [{"affects": "init","value": 1}]
          },
          {
              "name": "Battle Spirit",
              "requires": "Animal Reflexes",
              "value": "+1 Combat and +1 Strength.",
              "modifiers": [{"affects": "combat","value": 1},{"affects":"Strength","value":1}]
          },
          {
              "name": "Flurry of Blows",
              "requires": "Battle Spirit",
              "value": "When using Grit to re-roll your To Hit rolls, add +1 to the rolls."
          },
          {
              "name": "Mythic Warrior",
              "requires": "Flurry of Blows",
              "value": "Melee To Hit 3+",
              "modifiers": [{"affects": "melee","value": 3}]
          },
          {
              "name": "Shift",
              "value": "Once per turn, when an Enemy rolls a natural 1 To Hit against you, you may cause that roll to instead Hit another Enemy adjacent to you, ignoring Defense."
          },
          {
              "name": "Manipulate",
              "requires": "Shift",
              "value": "Once per Adventure / Travel / Town Stay, use 1 Grit to force any chart roll to be re-rolled. +1 Cunning.",
              "modifiers": [{"affects": "Cunning","value": 1}]
          },
          {
              "name": "Obscure",
              "requires": "Manipulate",
              "value": "Once per turn, when a card is drawn, use 1 Grit to place that card on the bottom of the deck and draw again. Gain 10 XP."
          },
          {
              "name": "Blur",
              "requires": "Obscure",
              "value": "Once per Fight, use 2 Grit at the end of your Activation to immediately Activate again. +1 Max Grit.",
              "modifiers": [{"affects": "grit","value": 1}]
          }
        ]
    },
    { //SUMO
      "name": "Sumo",
      "abilities": [
          {
              "desc": "This Hero is Large. Automatically passes Escape tests for Medium or smaller Enemies and may move into spaces with Medium or smaller models, shifting that model into the space just left. This does not allow the Hero to move through Barriers.",
              "name": "Large"
          },
          {
              "desc": "When moving into a space with a model, you may roll a D6. On 4+, you may Push that model back into one of the 3 adjacent spaces behind it. No single model may be Pushed more than once per Turn.",
              "name": "Push"
          },
          {
              "desc": "Gain +1 Combat for each open Hand.",
              "name": "Meaty Hands"
          }
      ],
      "classId": "5619d13a-9eff-4c2f-8c52-2a9c5872952d",
      "combat": 2,
      "corruption": {
          "current": 0,
          "max": 5
      },
      "darkstone": 0,
      "defense": 4,
      "grit": {
          "current": 1,
          "max": 2
      },
      "health": {
          "max": 20,
          "wounds": 0
      },
      "init": 2,
      "items": [
          {
              "description": "Whenever you kill an Enemy, Recover Grit on a D6 roll of 5 or 6. Large Size Only",
              "hands": 0,
              "name": "Sumo Mawashi",
              "weight": 1,
              "slots": 2,
              "cost": 250,
              "keywords": "Gear, Clothing, Pants",
              "source": "Starting Gear"
          }
      ],
      "keywords": "Samurai, Showman, Performer",
      "level": 1,
      "melee": 4,
      "movement": 0,
      "ranged": 5,
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
          "Lore": 2,
          "Luck": 1,
          "Spirit": 3,
          "Strength": 4
      },
      "wealth": 0,
      "willpower": 4,
      "xp": 0,
        "upgrades": [

            {
              "name": "Multi-Hand Slap",
              "type": "starting",
              "value": "Once per Turn, if you did not Move during your Activation, use 1 Grit to automatically do D3+1 basic Hits to an adjacent Enemy model (or D6+1 if you instead spend 2 Grit)."
            },
            {
              "name": "Belly Smash",
              "type": "starting",
              "value": "+1 Agility. You gain the following: Free Attack (once per Fight) - Immediately move up to 2 spaces in any direction (moving through other models), then Bounce D3-1 times from that space, like a Bomb (shifting any model Bounced into). Every model adjacent to your final position takes D3 Wounds, ignoring Defense.",
              "modifiers": [{"affects":"Agility","value":1}]
            },
            {
              "name": "Wrestling Champion",
              "type": "starting",
              "value": "You now automatically pass all Escape tests and may move into spaces with Large size or smaller models (including with the Push ability), shifting them as normal. Your Push ability now works on D6 rolls of 3+ instead. Your Combat Hits are +1 Damage on models you moved with Push this turn."
            },

            {
              "name": "Honorable Vendetta",
              "value": "Choose an Enemy Keyword. Any time you collect XP from those Enemies, gain extra 10 XP",
              "multi": true
            },
            {
             "modifiers": [
               {
                 "affects": "grit",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Max Grit",
             "value": "+1 Max Grit"
           },
            {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity and Sanity",
             "value": "+2 Side Bag Token Capacity. Also gain +D6 Sanity."
           },
            {
            "modifiers": [
              {
                "affects": "Strength",
                "value": "1"
              }
            ],
            "name": "Strength and Sanity",
            "value": "+1 Strength. Also gain D6 Sanity.",
            "multi": true
          },
            {
            "modifiers": [
              {
                "affects": "Cunning",
                "value": "1"
              }
            ],
            "name": "Cunning and Health",
            "value": "+1 Cunning. Also gain Peril Die Health.",
            "multi": true
          },
            {
              "modifiers": [
                {
                  "affects": "Agility",
                  "value": "1"
                }
              ],
              "name": "Agility and Health",
              "value": "+1 Agility. Also gain Peril Die Health.",
              "multi": true
            },
            {
             "multi": true,
             "name": "Health and Sanity",
             "value": "D6 Health and D6 Sanity."
           },
            {
             "modifiers": [
               {
                 "affects": "Lore",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Lore and Health",
             "value": "+1 Lore. Also, gain Peril Die Health"
           },
            {
             "modifiers": [
               {
                 "affects": "Luck",
                 "value": "1"
               }
             ],
             "multi": true,
             "name": "Luck and Health",
             "value": "+1 Luck. Also, gain Peril Die Health"
           },
            {
             "modifiers": [
               {
                 "affects": "sidebag",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Side Bag Capacity",
             "value": "+2 Side Bag Token Capacity"
           },
            {
            "modifiers": [
              {
                "affects": "grit",
                "value": 1
              }
            ],
            "multi": true,
            "name": "Max Grit",
            "value": "+1 Max Grit"
          },
            {
             "modifiers": [
               {
                 "affects": "corruption",
                 "value": "2"
               }
             ],
             "multi": true,
             "name": "Corruption Resistance",
             "value": "+2 Corruption Resistance"
           },
            {
             "multi": true,
             "name": "You may carry extra weight",
             "value": "You may carry 1 extra weight",
             "modifiers": [ { "affects": "weight", "value": 1 } ]
           },


            {
              "name": "Smash",
              "value": "Your Melee To Hit rolls of 6+ now do +1 Damage. +1 Strength",
              "modifiers":[{"affects":"Strength","value":1}]
          },
            {
              "name": "Throw",
              "requires": "Smash",
              "value": "Free Attack once per turn: Use 1 Grit to choose an adjacent model that is Large or smaller and move it up to D6 spaces ignoring other models, Escape tests, and barriers."
          },
            {
              "name": "Solid Mass",
              "requires": "Throw",
              "value": "You may always use your Defense, even against Hits that would normally ignore Defense. +5 Health",
              "modifiers":[{"affects":"health","value":5}]
          },
            {
            "name": "Squeeze",
            "requires": "Solid Mass",
            "value": "When you assign 2 or more non-Critical Hits to a target, you may add all of the Damage together as a single Hit"
          },
            {
                "name": "Concentration",
                "value": "Once per turn, you may re-roll one of your To Hit rolls. You may not be moved by Enemy Attacks or Abilities"
            },
            {
                "name": "Meditation",
                "value": "You may give up your normal Move during your Activation to Heal D3 Wounds/Sanity (any mix). +1 Spirit",
                "modifiers":[{"affects":"Spirit","value":1}]
            },
            {
                "name": "Competitive Focus",
                "requires": "Meditation",
                "value": "You may Activate before Enemies at your Initiative level. +1 Initiative",
                "modifiers":[{"affects":"init","value":1}]
            },
            {
                "name": "Determination",
                "requires": "Competitive Focus",
                "value": "Melee To Hit 3+",
                "modifiers":[{"affects":"melee","value":3}]
            },
            {
                "name": "Eruption",
                "value": "At the end of your Move, use 1 Grit to do 1 Wound to every adjacent model, ignoring Defense and Armor. +1 Max Grit",
                "modifiers":[{"affects":"grit","value":1}]
            },
          {
              "name": "Roaring Challenge",
              "requires": "Eruption",
              "value": "Use 1 Grit at the start of an Enemy Group's Activation to force all of those Enemies to change targets to you this turn. They are -1 To Hit until the end of the turn."
          },
          {
              "name": "Body Block",
              "requires": "Roaring Challenge",
              "value": "Use 1 Grit to give yourself, and every adjacent Hero, Cover 5+ until the end of the turn. +1 Max Grit",
              "modifiers":[{"affects":"grit","value":1}]
          },
          {
              "name": "Giant",
              "requires": "Body Block",
              "value": "Defense 3+",
              "modifiers":[{"affects":"defense","value":3}]
          },
          {
              "name": "Body Slam",
              "value": "When Pushing an Enemy, you may move it back D3 spaces instead of only 1, and do D3 Wounds to it, ignoring Defense"
          },
          {
              "name": "Sumo's Fury",
              "requires": "Body Slam",
              "value": "You now use the rules for Fury and have Max Fury 2. Use 2 Fury to add +1 Damage to one of your Combat Hits. +1 Max Grit",
              "modifiers":[{"affects":"grit","value":1},{"affects":"fury","value":2}]
          },
          {
              "name": "Pin",
              "requires": "Sumo's Fury",
              "value": "Use 3 Fury to prevent an adjacent Enemy model, that is Large or smaller, from Activating this turn. You may not gain Fury until the start of your next Activation. +1 Max Fury",
              "modifiers":[{"affects":"fury","value":1}]
          },
          {
              "name": "Destroy",
              "requires": "Pin",
              "value": "Use 4 Fury to double your Combat including Meaty Hands until the end of the turn. You may not gain Fury until the start of your next Activation. +1 Max Fury",
              "modifiers":[{"affects":"fury","value":1}]
          }
        ]
      }
  ],
  GAMBLER_TRICKS: [
    {
      "desc": "If there is no die here, use 1 Fortune token when you roll a 6 on any single die to place that die here. Roll a new die to replace the 6 just rolled. While there is a die here, use 1 Fortune token to make a Luck 5+ test. If passed, replace any single die just rolled with the 6 that was here (removing the die)",
      "name": "Ace in the Hole",
      "xp": 10
    },
    {
      "desc": "Use 1 Fortune token when you are about to be Attacked by an Enemy to make a Luck 6+ test. If passed, that Attack is canceled. If failed, all Hits from that Attack are +1 Damage against you",
      "name": "Bluff",
      "xp": 20
    },
    {
      "desc": "Use 2 Fortune tokens and take 1 Corruption Hit to select any number of dice just rolled and make a Cunning 6+ test. If passed, for each 6+ rolled, choose one of the selected dice and rotate it to be on any facing you like. Only usable on rolls that allow Grit.",
      "name": "Cheat",
      "xp": 25
    },
    {
      "desc": "Use 1 Fortune token just after a card has been drawn from any deck and make a Cunning 6+ test. If passed, place that card here facedown and draw a new card to play instead. Any card already here is placed back in its proper deck, D3 cards down from the top",
      "name": "Counting Cards",
      "xp": 15
    },
    {
      "desc": "1x Fight, use 1 Fortune token when you are about to make a Damage roll for one of your Hits. Double the amount rolled for Damage (before modifiers). If the target would not be killed by this Hit, the Hit does no Damage instead.",
      "name": "Double Down",
      "xp": 0
    },
    {
      "desc": "Use 1 Fortune token to re-roll any single die just rolled, even if it has already been re-rolled. Only usable on rolls that allow Grit.",
      "name": "Fortune's Favor"
    },
    {
      "desc": "Use 1 Fortune token to choose any card deck then make a Cunning 6+ test. If passed, look at the top 3 cards. Choose one to discard and put the other two back in any order. May only be used on decks with discard piles.",
      "name": "Stack the Deck",
      "xp": 10
    },
    {
      "desc": "Use 1 Fortune token to choose any single die just rolled and make a Luck 5+ test. For each 5+ rolled, you may add or subtract 1 from the chosen die roll. Cannot be adjusted higher than natural roll maximum and cannot target die that Grit cannot be used on.",
      "name": "Tip the Scales",
      "xp": 10
    },
    {
      "desc": "description",
      "name": "Trick Name"
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
          "affects": "health",
          "value": 2
        }
      ],
      "name": "Find Yer Kin"
    },
    {
      "desc": "+1 Max Grit. Requires 4 Discoveries. Reward: Start each Adventure with 1 extra Grit.",
      "modifiers": {
        "affects": "grit",
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
  ],
  WANDERING_SAMURAI_TACTICS: [
    {
      "cost": 6,
      "desc": "During next activation, all Heroes gain +1 Shot or +1 Combat. 1x Fight. L5: +1 Damage to all Heroes' Attacks during next Activation",
      "name": "Battle Cry"
    },
    {
      "cost": 5,
      "desc": "Immediately move to an empty space adjacent to another Hero on same Map Tile. Replaces your normal Move for the Turn. L2: Any model, not just Hero; L4: same or adjacent Map Tile; L6: May swap places with other model.",
      "name": "Blowing Reeds"
    },
    {
      "cost": 1,
      "desc": "Spend Fury up to your Level to use. Target Enemy model up to 2 spaces away and move to share their space, placing a Fury token on that space. Then make an Agility 5+ test. If passed, repeat this process, not targeting the same Enemy more than once. When no targets or Fury remain or if failed, move adjacent to final target. Each Enemy takes Wounds equal to Fury tokens placed, ignoring Defense, and remove Fury tokens.",
      "name": "Dancing Dragon"
    },
    {
      "cost": 5,
      "desc": "Until end of turn, place 1 Burning Marker on an Enemy you do one or more Combat Hits to. L3: +1 Combat this turn, L6: 2 Burning Markers",
      "name": "Dragon Fire"
    },
    {
      "cost": 3,
      "desc": "Move up to 2 spaces, auto pass escape test and passing through Enemy spaces. Usable at any time, including during an Attack. L3: Usable multiple times per turn. L5: 3 spaces",
      "name": "Flowing Water"
    },
    {
      "cost": 6,
      "desc": "Choose an adjacent space. Every model in that space or 2 spaces in a line direclty behind it take D3+1 Wounds ignoring Defense. L3: 5 spaces; L5: Peril die Damage; L7: Ignores Armor and Endurance",
      "name": "Lightning Slice"
    },
    {
      "cost": 1,
      "desc": "Spend Fury up to Hero Level to use. Use only at start of a turn. Init reduced to 1 for Turn. For each Fury spent, Heal 2 Health/Sanity (any mix). L2: Init 2; L4: If 3+ Fury spent, recover 1 Grit; L6: Init -2",
      "name": "Meditation"
    },
    {
      "cost": 2,
      "desc": "Spend 2 Fury to remove a status effect or 4 Fury to remove 1 Corruption Point. Usable any time, multiple times per turn",
      "name": "Rejuvenate"
    },
    {
      "cost": 2,
      "desc": "Roll D3 + Hero Level and prevent that much Damage to you or adjacent model from single Hit. Only usable while Blade is equipped. L3: D6 + Hero Level, L5: Enemy takes 1 Combat Hit from you",
      "name": "Sword Block"
    },
    {
      "cost": 4,
      "desc": "Every Enemy model within D3 spaces of you immediately takes 1 Wound ignoring Defense. L3: D6 spaces; L6: 2 Wounds",
      "name": "Thunder Smash"
    },
    {
      "cost": 3,
      "desc": "Add +D6 Damage to one Critical Hit while using Blade. L3: Usable on To-Hit 6+ even if immune to Criticals; L6: +Peril die Damage",
      "name": "Weeping Blade"
    },
    {
      "cost": 5,
      "desc": "Every adjacent Enemy model immediately takes 1 Hit that does Peril die + Your Hero Level in damage",
      "name": "Whirlwind Strike"
    }
  ],
  SERMONS: [
    {
      "check": 10,
      "cost": 2,
      "deadly": true,
      "desc": "You may place a number of Hellfire markers up to your Hero Level +1 in any spaces within Range (limit 1 per space). All markers must form a continuous chain. Markers do 1 Hit with 2D6 Damage to anything in their space. May only be used if you did not Move this turn.",
      "name": "Cleansing Fire",
      "range": "8",
      "type": "Judgement",
      "xp": 30
    },
    {
      "check": 9,
      "cost": 1,
      "desc": "Choose one Hero within Range. That Hero may remove any Poison affecting them and may Heal 2 Sanity. Level 3: 3 Sanity. Level 5: 4 Sanity. Level 9: 5 Sanity.",
      "name": "Cure",
      "range": "6",
      "type": "Blessing",
      "xp": 20
    },
    {
      "check": 5,
      "cost": 1,
      "desc": "For each Faith spent on the cost of the sermon, you may Heal 1 Wound from yourself or an adjacent Hero. At Level 5 - Heal 2 Wounds for each Faith spent.",
      "name": "Faith Healing",
      "type": "Blessing",
      "xp": 10
    },
    {
      "check": 7,
      "cost": 2,
      "desc": "Choose one Hero within Range. That Hero gains +3 Initiative until the end of the turn. At level 4, +4 Initiative. At level 8, +5 Initiative.",
      "name": "Holy Speed",
      "range": "8",
      "type": "Blessing",
      "xp": 15
    },
    {
      "check": 10,
      "cost": 2,
      "deadly": true,
      "desc": "Cancel a Darkness card. You may spend 1 extra Faith to cancel a Growing Dread card instead.",
      "name": "Intervention",
      "type": "Blessing",
      "xp": 50
    },
    {
      "check": 6,
      "cost": 2,
      "deadly": true,
      "desc": "You may Heal a number of Wounds equal to the amount the preaching roll beat the casting number by from any mix of Heroes within Range (including yourself)",
      "name": "Revitalize",
      "range": "8",
      "type": "Blessing",
      "xp": 10
    },
    {
      "check": 8,
      "cost": 1,
      "desc": "Choose any Hero (including yourself). Until the end of the turn, all of that Hero's Hits do +1 Damage each. At Level 4: +2 Damage. At Level 9: +3 Damage.",
      "name": "Righteous Fury",
      "type": "Judgement",
      "xp": 25
    },
    {
      "check": 9,
      "cost": 1,
      "desc": "Choose any Hero. Until the end of turn, that Hero gains: Armor 5+ / Spirit Armor 5+ (limit 1 Shield per Hero). At level 5, Armor 4+ / Spirit Armor 4+",
      "name": "Shield of Light",
      "type": "Blessing",
      "xp": 20
    },
    {
      "check": 9,
      "cost": 2,
      "deadly": true,
      "desc": "Every Enemy within 2 spaces of you automatically takes 1 Hit. May only be used if you did not Move this turn. At Level 2: 2 Hits. At Level 4: Affects all Enemies on your Map Tile. At Level 6: Hits are +1 Damage. At Level 8: Hits are +2 Damage.",
      "name": "Shockwave",
      "type": "Judgement",
      "xp": 25
    },
    {
      "check": 9,
      "cost": 2,
      "deadly": true,
      "desc": "Choose one model within Range to immediately take D6 Wounds with no Defense. At Level 3: D8 Wounds. At Level 5: D8+1 Wounds. At Level 9: D8+2 Wounds",
      "name": "Smite",
      "range": "12",
      "type": "Judgement",
      "xp": 10
    },
    {
      "check": 7,
      "cost": 1,
      "desc": "Choose an Enemy within Range. That Enemy is -2 Defense until the end of the turn. Enemies that are Immune to Critical Hits are only reduced by -1 Defense. At Level 3: Choose 2 Enemies. At Level 6: -3 Defense. At Level 9: Choose 3 Enemies.",
      "name": "Weaken",
      "range": "6",
      "type": "Judgement",
      "xp": 20
    }
  ],
  SHAMAN_SPELLS: [
    {
      "desc": "Select hero on same or adjacent map tile. Target absorbs Wounds equal to 2 + caster's level after which it is destroyed. At start of each turn, spend 1 Magik or shield ends. Limit 1 cast at a time",
      "name": "Ancestral Shield",
      "power": 5,
      "xp": 5
    },
    {
      "desc": "Replaces caster's next Activation. Choose one: Darkness deck, any Threat deck, any Encounter deck, or Growing Dread stack. Look at top 2 cards. May choose 1 and make Spirit 6+ test to discard that card.  Put cards back in any order.",
      "name": "Astral Projection",
      "power": 13,
      "xp": 25
    },
    {
      "desc": "Cast to transform into Bear Form. +2 Strength, +1 Combat, Armor 5+, Use 1 Grit to add D3 + Hero level to one Combat Hit, When you kill an Enemy recover Grit on D6 of 5 or 6.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
      "name": "Bear Form",
      "power": 11,
      "xp": 30
    },
    {
      "desc": "Use at start of Activation, replaces caster's Move. For each casting 5+, move 2 spaces ignoring Escape tests. Any model moved through takes 1 Hit for D6 + Hero Level Damage.",
      "name": "Buffalo Charge",
      "power": 0,
      "xp": 10
    },
    {
      "desc": "Use only during a Fight. At start of each turn, roll D8. Every Enemy with Init less than the roll has Move reduced to half and on the D6 roll of 5+ is struck by lightning, taking a Hit that does D6+2 Damage. At start of each turn, Storm ends unless caster spends 2 Magik or 1 Dark Stone. Cancels any other Weather or Storm in play",
      "name": "Call Down the Storm",
      "power": 13,
      "xp": 20
    },
    {
      "desc": "For each casting roll of 5+ assigned to this Spell, add +1 Damage to one of your Combat Hits this turn",
      "name": "Charged Hatchet",
      "power": 0,
      "xp": 0
    },
    {
      "desc": "Use only during your Activation. Do Hero Level basic Hits (no modifiers) to one adjacent model.",
      "name": "Cougar Strike",
      "power": 6,
      "xp": 10
    },
    {
      "desc": "Use only during your Activation, replaces caster's Move. Move 2D6 spaces ignoring Escape tests, models, and obstacles.",
      "name": "Eagle Flight",
      "power": 10,
      "xp": 5
    },
    {
      "desc": "Choose any Hero on same or adjacent Map Tile (including you). For each casting roll of 4+, Heal 1 Sanity Damage (+5XP for other Heros healed). If at least 1 6+ is assigned, you may remove 1 Corruption Point from the target",
      "name": "Inner Fire",
      "power": 0,
      "xp": 10
    },
    {
      "desc": "Use only during Fight. Roll a D6 for every adjacent Enemy. On 5+, it takes 1 Wound ignoring Defense",
      "name": "Lightning Field",
      "power": 7,
      "xp": 0
    },
    {
      "desc": "Cast to transform into Mouse Form. +3 Init, +2 Agility, Defense 3+, -1 Combat, Auto pass all Escape tests, may move through other models, can only be hit on To-Hit of 6+, Use 1 Grit when transforming back in same space as Enemy to make Growth attack (moved and D6 Wounds ignoring Defense).  You may automatically transform back at start of your Activation on any future turn or if KO'd",
      "name": "Mouse Form",
      "power": 6,
      "xp": 20
    },
    {
      "desc": "Place runic circle within 8 spaces of you. Any Hero in space may re-roll 1 Defense roll per turn and Heals 2 Wounds at end of turn. At start of each turn, requires 2 Magik or 1 Dark Stone be spent to maintain. Limit 1 cast at a time",
      "name": "Runic Circle",
      "power": 11,
      "xp": 25
    },
    {
      "desc": "Cast this spell when a Growing Dread would be added to stack. If successful, cancel that card",
      "name": "Shadow Vision",
      "power": 15,
      "xp": 20
    },
    {
      "desc": "description",
      "name": "Spell Name",
      "power": 1,
      "type": "Battle"
    },
    {
      "desc": "Choose any Demon, Void, or Ghost enemy on same or adjacent map tile. -1 Defense until end of turn and if it tries to move, make a Strength 5+ test to prevent (6+ if Large+)",
      "name": "Spirit Binding",
      "power": 8,
      "xp": 10
    },
    {
      "desc": "Select Enemy within 3 spaces. For each casting roll of 5+ assigned to this spell, place Sanity marker on that Enemy (keyword Ancient or Magik require 6+). For each 1 or 2, you take 1 Sanity Damage ignoring Willpower. Enemies are -1 Defense for each Sanity marker (or 2 markers if Large+)",
      "name": "Spirit War",
      "power": 0,
      "xp": 5
    },
    {
      "desc": "Use only during Fight. You and every adjacent Hero are +1 Damage on all Attacks until end of Turn",
      "name": "Tribal Wrath",
      "power": 9,
      "xp": 5
    },
    {
      "desc": "Select a Hero on same or adjacent Map Tile (including yourself). Until end of turn, that Hero has +1 Initiative, +3 Move, and +1 to Escape tests",
      "name": "Warrior's Speed",
      "power": 5,
      "xp": 0
    },
    {
      "desc": "Cast to transform into Wolf Form. +2 Cunning, +2 Init, +2 Move, 1x Turn use 1 Grit to cause adjacent Enemies -1 Defense for turn, +1 Combat for each adjacent Hero or +1 Damage if none.  You may automatically transform back at start of your Activation on any future turn or if KO'd",
      "name": "Wolf Form",
      "power": 9,
      "xp": 20
    }
  ],
  ELEMENTAL_MAGIK: [
      {
        "check": 6,
        "cost": 3,
        "deadly": false,
        "desc": "Use this Spell as a Ranged Attack. Place the Flame Template. Every model touched by the Template takes 1 Hit that does D8 Damage, ignoring Armor and Cover. Any Corpse Tokens touched are destroyed on the D6 roll of 3+ each.  Level 3: D8+1 Damage. Level 5: 2 Hits",
        "name": "Dragon Fire",
        "range": "*",
        "type": "Fire",
        "xp": 0
      },
      {
        "check": 9,
        "cost": 2,
        "deadly": false,
        "desc": "Use this Spell as a Ranged Attack. Choose a space within Range and Line of Sight and roll once To Hit. If missed, bounces D3 times like a bomb. Any model in the final space take D6 Wounds, ignoring Defense, while every model in adjacent spaces takes D3 Wounds, ignoring Defense. Any Corpse Tokens in either space are destroyed.",
        "name": "Fire Ball",
        "range": "8",
        "type": "Fire",
        "xp": 0
      },
      {
        "check": 11,
        "cost": 3,
        "deadly": true,
        "desc": "Use this Spell as a Ranged Attack. Choose a space within Range and Line of Sight to erupt in flames. Every model in an adjacent space takes a number of Hits equal to Hero Level. These Hits are +1 Damage. Heroes hit take 2 Wounds per Hit while Enemies take D6+1 Wounds per Hit. May only be cast successfully once per Adventure.",
        "name": "Burning Storm",
        "range": "8",
        "type": "Fire",
        "xp": 25
      },
      {
        "check": 11,
        "cost": 1,
        "deadly": true,
        "desc": "Choose a model within Range. The target takes a number of Wounds equal to target's Defense, ignoring Defense and Armor. If the target has Armor, it takes 3 extra Wounds. Do not gain XP for models wounded/killed by this spell.",
        "name": "Melt",
        "range": "5",
        "type": "Fire",
        "xp": 25
      },
      {
        "check": 8,
        "cost": 2,
        "deadly": true,
        "desc": "This Spell may either target all Heroes on your Map Tile (including yourself) OR a chosen Enemy Group on the board. Until the end of the next Activation, targets are +2 Combat, but -1 on To Hit rolls. If targeting Enemies, they are also -1 Defense.",
        "name": "Frenzy",
        "range": "*",
        "type": "Fire",
        "xp": 20
      },
      {
        "check": 10,
        "cost": 1,
        "deadly": false,
        "desc": "Choose an Enemy model within Range to mark with magical fire. When that model is killed, it explodes just as though a Bomb had gone off in its space. If the model is XL or bigger, every model adjacent is affected.  XP is only awarded the first time this is cast per Fight.",
        "name": "Detonate",
        "range": "10",
        "type": "Fire",
        "xp": 15
      },
      {
        "check": 9,
        "cost": 1,
        "deadly": false,
        "desc": "Choose one of your Equipped Hand Weapons to burst into flames! Until the end of the turn, that Item gains: Your Combat Hits are +1 Damage (+2 against Undead) and are Keyword Fire.",
        "name": "Ignite",
        "range": "*",
        "type": "Fire",
        "xp": 5
      },
      {
        "check": 10,
        "cost": 2,
        "deadly": true,
        "desc": "Choose a model within Range and Line of Sight to take Peril Die Damage, ignoring Defense. This may target a Corpse Token using a Casting Value of 7+ instead to destroy it.",
        "name": "Disintegrate",
        "range": "5",
        "type": "Fire",
        "xp": 0
      },
      {
        "check": 10,
        "cost": 2,
        "deadly": true,
        "desc": "Choose any Hero (including yourself) to immediately Heal D3+2 Wounds OR choose an Injury or Mutation and remove it on D6 of 5 or 6. Only 1 Mutation or Injury may be successfully removed like this (from the Party as a whole) during an Adventure.  XP only awarded first time cast per Adventure",
        "name": "Regrowth",
        "range": "*",
        "type": "Earth",
        "xp": 15
      },
      {
        "check": 9,
        "cost": 3,
        "deadly": false,
        "name": "Tangling Vines",
        "desc": "Select a model within 8 spaces to be seized by tangling vines! That model may not move during its next Activation and immediately takes 2 Hits. At the start of each of its further Activations, it must roll a D6. On the roll of 5+, it breaks free, otherwise it takes 2 Hits and may not move. Large models break free on 4+, XL on 3+, and larger break free automatically. Limit 1 in play at a time. XP awarded first time cast per Adventure.",
        "range": "8",
        "type": "Earth",
        "xp": 25
      },
      {
        "check": 10,
        "cost": 2,
        "deadly": false,
        "name": "Earthquake",
        "desc": "Choose the same or an adjacent Map Tile to you. Every model on that tile takes 2 Hits as the ground shakes violently. Level 3 - These Hits are Damage +1. Level 5 - 3 Hits. XP awarded first time cast per Adventure.",
        "range": "*",
        "type": "Earth",
        "xp": 20
      },
      {
        "check": 7,
        "cost": 2,
        "deadly": false,
        "name": "Stone Shield",
        "desc": "Choose any Hero (including yourself) to be protected by a shield of stone erupting from the ground. Hero has Cover 5+ against all Attacks until end of Turn. This spell effect is canceled if that Hero moves. Limit 1 shield at a time. Level 3 - Cover 4+. Level 5 - All Enemies adjacent to target take 1 Hit. XP awarded first time cast per Adventure.",
        "range": "*",
        "type": "Earth",
        "xp": 20
      },
      {
        "check": 11,
        "cost": 1,
        "deadly": true,
        "name": "Resist",
        "desc": "Every Hero on your Map tile may remove one status marker from themselves. For each marker removed, gain 5 XP. Level 3 - Casting Value is 10+. Level 6, Casting value is 9+.",
        "range": "*",
        "type": "Earth",
        "xp": 0
      },
      {
        "check": 8,
        "cost": 2,
        "deadly": true,
        "name": "Wooden Blade",
        "desc": "When cast, creates the following Item for you to use until the next turn: Wooden Blade (Hand Weapon, Blade, Magik). +1 Combat. 1-Handed. Melee To Hit is 4+.  At the start of each following turn, you may spend 2 Mana to keep this Spell going.",
        "range": "self",
        "type": "Earth",
        "xp": 0
      },
      {
        "check": 8,
        "cost": 1,
        "deadly": true,
        "name": "Lotus Blossom",
        "desc": "Choose any Hero (including yourself) to immediate Heal D3 Wounds or D3 Sanity Damage.",
        "range": "*",
        "type": "Earth",
        "xp": 0
      },
      {
        "check": 9,
        "cost": 2,
        "deadly": false,
        "name": "Fists of Stone",
        "desc": "Cast at any time, except during an Attack, to choose a Hero within 5 spaces (including yourself). Until the end of the turn, that Hero gains +1 Combat for each open Hand they have. However, any time that Hero rolls a 1 To Hit this turn, they also take a Corruption Hit from a transforming magik. XP awarded first time cast per Adventure.",
        "range": "5",
        "type": "Earth",
        "xp": 10
      },
      {
        "check": 7,
        "cost": 2,
        "deadly": true,
        "name": "Roaring Wind",
        "desc": "Weather. Choose a Map Tile within 8 spaces. Every model on that tile immediately takes a Bleeding marker on D6 of 4+ each. XP awarded first time per Adventure.",
        "range": "8",
        "type": "Wind",
        "xp": 10
      },
      {
        "check": 10,
        "cost": 1,
        "deadly": true,
        "name": "Divine Focus",
        "desc": "Until the end of the turn, you are +1 on all your To Hit rolls.",
        "range": "*",
        "type": "Wind",
        "xp": 0
      },
      {
        "check": 10,
        "cost": 2,
        "deadly": false,
        "name": "Lightning Strike",
        "desc": "Weather. As a Ranged Attack, choose a model within Range and Line of Sight to be the target. That model takes 3 Hits that do D8 Damage each. Every model adjacent also takes 1 Hit that does D8 Damage. These Hits ignore any Armor the model may have. Level 5 - D8+3 Damage each.",
        "range": "10",
        "type": "Wind",
        "xp": 0
      },
      {
        "check": 10,
        "cost": 3,
        "deadly": true,
        "name": "Thunder",
        "desc": "Cancels a Darkness card just played. Level 3 - Darkness or Growing Dread (in stack). Level 5 - Mana cost 2.",
        "range": "*",
        "type": "Wind",
        "xp": 20
      },
      {
        "check": 11,
        "cost": 3,
        "deadly": true,
        "name": "Typhoon",
        "desc": "Weather. Until the end of the turn, all non-Myth enemies on your Map Tile are -2 Move and -1 on all To Hit rolls. At start of each following turn, spend 2 Mana to keep this spell going. XP awarded first time per Adventure.",
        "range": "*",
        "type": "Wind",
        "xp": 30
      },
      {
        "check": 7,
        "cost": 3,
        "deadly": true,
        "name": "Shifting Form",
        "desc": "Until the end of the turn, every Hit you take does 1 less Wound. Level 3 - 1 less Sanity as well. Level 5 - Mana cost 2. Level 7 - spend double Mana cost when casting to grant +1 on all Defense rolls until end of the turn.",
        "range": "*",
        "type": "Wind",
        "xp": 5
      },
      {
        "check": 9,
        "cost": 2,
        "deadly": false,
        "name": "Winds of Wisdom",
        "desc": "Choose any Hero (including yourself) to gain 2 extra dice on a Skill test just rolled.",
        "range": "*",
        "type": "Wind",
        "xp": 10
      },
      {
        "check": 9,
        "cost": 2,
        "deadly": false,
        "name": "Heavenly Flight",
        "desc": "Cast this spell to take flight until the end of the turn. While flying, you are +1 Move and may move through other models. In addition Enemies that cannot move through models are -1 on their To Hit rolls against you and you automatically pass Escape tests against them. At start of each following turn, you may spend 2 Mana to keep this spell going.",
        "range": "*",
        "type": "Wind",
        "xp": 0
      },
      {
        "check": 11,
        "cost": 2,
        "deadly": true,
        "name": "Water Spirits",
        "desc": "Choose a Medium or smaller Enemy (with starting Health 12 or less). Water spirits materialize to drag them screaming back into the deep!  That Enemy is removed and no XP is gained for killing them. Double any Corruption Hits taken from casting this spell.",
        "range": "6",
        "type": "Water",
        "xp": 25
      },
      {
        "check": 10,
        "cost": 1,
        "deadly": false,
        "name": "Reflection",
        "desc": "Cast this Spell to choose one Hit you just took. That Hit is canceled, and if it was caused by an Enemy, roll a D6. On 5+, that Enemy takes 1 Hit using the Damage of the original Hit, ignoring Defense. Level 2 - Casting value 9+. Level 3 - Enemy Hit on 4+. Level 5 - Casting value 8+. Level 6 - Enemy automatically Hit. Level 8 - Casting value 7+.",
        "range": "*",
        "type": "Water",
        "xp": 10
      },
      {
        "check": 8,
        "cost": 2,
        "deadly": false,
        "name": "Water Shield",
        "desc": "Choose any Hero (including yourself) to be protected by a shield of swirling water! Hero has Cover 4+ against all Attacks until end of turn. Effect is canceled if target moves. Limit 1 Shield at a time. Level 3 - removes Burning markers from target. Level 5 - target automatically passes Escape tests. XP awarded first time cast per Adventure.",
        "range": "*",
        "type": "Water",
        "xp": 15
      },
      {
        "check": 8,
        "cost": 2,
        "deadly": false,
        "name": "Water Burst",
        "desc": "Use when you take 1 or more Hits (before Defense rolls). You gain Cover 2+ against each of those Hits as you burst into a shower of water!Immediately move your Hero to any other empty space on the Map Tile, as you re-form yourself. Until end of the turn, you are -1 an all your To Hit rolls.",
        "range": "*",
        "type": "Water",
        "xp": 10
      },
      {
        "check": 10,
        "cost": 3,
        "deadly": true,
        "name": "Tsunami",
        "desc": "Use this Spell as a Ranged Attack. Choose a direction to send out a tidal wave! Creates an area of effect that is 3 spaces wide and Peril Die spaces out from the caster. Every model in the area takes 2 Hits, and unless Large or bigger, is moved 2 spaces away from caster (if possible). Level 5 - 3 Hits and moves 3 spaces.",
        "range": "*",
        "type": "Water",
        "xp": 15
      },
      {
        "check": 7,
        "cost": 2,
        "deadly": false,
        "name": "Flowing River",
        "desc": "Use this Spell in place of your normal Move. You may immediately move up to D6+3 spaces in one general direction. Choose a direction to flow in and each space moved must be forward into one of the three spaces in that direction. This move ignores Escape tests.",
        "range": "self",
        "type": "Water",
        "xp": 0
      },
      {
        "check": 6,
        "cost": 1,
        "deadly": false,
        "name": "Cleanse",
        "desc": "Every Hero on your Map Tile may roll a D6 for each status effect they have. On 5+, remove that marker. Once per Adventure, may be cast with 10+ instead, to roll for each Corruption Point in place of Status Effect markers.  XP awarded for each marker or Corruption removed.",
        "range": "*",
        "type": "Water",
        "xp": 5
      },
      {
        "check": 11,
        "cost": 2,
        "deadly": false,
        "name": "Drown",
        "desc": "Choose a model within Range and Line of Sight to begin choking as water wells up inside them!. That model loses its next Activation (unless Larger or bigger) and takes D6 Damage, ignoring Defense, Armor, and Cover. My only be successfully cast once per Fight.",
        "range": "4",
        "type": "Water",
        "xp": 0
      }
  ],
  NINJA_CLANS: [
    {
        "name": "Sobara Masters",
        "description": "+1 Lore. Once per Adventure, add +1 Damage to all of your Hits until the end of this turn (+2 if using 2-Handed Weapon)",
        "modifiers": [{"affects":"Lore","value":1}]
    },
    {
        "name": "The Hidden Dragon",
        "description": "+1 Luck. Once per Adventure, Recover Grit up to your Max Grit.",
        "modifiers": [{"affects":"Luck","value":1}]
    },
    {
        "name": "Sobara Masters",
        "description": "+1 Spirit. Once per Adventure, Heal 2 Wounds/Sanity (any mix) from each Hero on your Map Tile (including yourself).",
        "modifiers": [{"affects":"Spirit","value":1}]
    },
    {
        "name": "Okasa Brotherhood",
        "description": "+1 Strength. Once per Adventure, Free Attack: Every Enemy on your Map Tile immediately takes 1 Hit that does D6 Damage.",
        "modifiers": [{"affects":"Strength","value":1}]
    }
  ],
  SAMURAI_WARRIOR_BATTLE_TACTICS: [
      {
        "cost": 3,
        "desc": "Use at end of your Move. Immediately roll an extra 1 Combat Attack against each Enemy adjacent to you. These Attacks may gain bonuses of any Hand Weapons you have equipped, but may not be increased beyond Combat 1. You may not gain Fury Tokens from these extra Attacks.",
        "name": "Warlord Smash",
        "type": "Strike"
      },
      {
        "cost": 5,
        "desc": "Choose an adjacent Enemy and roll a single die for Melee or Ranged To Hit (your choice). If successful, that Enemy immediately takes D6 Wounds, ignoring Defense and Armor. If not killed, that Enemy gains +2 Combat/Shots during its next Activation. Level 3 - Peril Die Damage. Level 6 - 2 Peril Die Damage.",
        "name": "Execution",
        "type": "Strike"
      },
      {
        "cost": 3,
        "desc": "Select an Ally within 8 spaces that just completed its Activation. That Ally may immediately Activate again. (Works on Allies, not Heroes)",
        "name": "Order to Charge",
        "type": "Command"
      },
      {
        "cost": 2,
        "desc": "Every Ally model on your Map Tile that has Combat 1 or higher and did not move this turn gains +2 Combat until the end of the turn. (Works on Allies, not Heroes).",
        "name": "Order to Stand Firm",
        "type": "Command"
      },
      {
        "cost": 2,
        "desc": "Every Ally model on your Map Tile immediately Heals 2 Wounds and 2 Sanity. (Works on Allies, not Heroes)",
        "name": "Commanding Presence",
        "type": "Command"
      },
      {
        "cost": 5,
        "desc": "Use once per Adventure at the start of a turn. Place up to D3 new Armored Ashigaru Allies in empty spaces adjacent to you (limit 3 on board at once). These models may Activate normally this turn.",
        "name": "Reinforcements",
        "type": "Command"
      },
      {
        "cost": 1,
        "desc": "Immediate Heal 1 Wound or 1 Sanity from every Hero and Ally on your Map Tile. Gain XP for this as normal.",
        "name": "Rally to Me!",
        "type": "Healing"
      },
      {
        "cost": 4,
        "desc": "Add +2 Damage to one of your Hits for each other Hero and Ally model adjacent to the target. Level 3 - Hit ignores Defense if at least +4 Damage. Level 5 - Adds +3 Damage for each.",
        "name": "Overwhelm",
        "type": "Formation"
      },
      {
        "cost": 4,
        "desc": "Gain +2 Combat for one Attack. You may not gain Fury Tokens from these extra Combat dice.",
        "name": "Furious Slash",
        "type": "Strike"
      },
      {
        "cost": 3,
        "desc": "Immediately move up to 2 spaces, ignoring Escape tests; then do a single free Combat Hit to an adjacent Enemy that was not adjacent before this move. You may not gain Fury Tokens from this free hit.",
        "name": "Lunging Thrust",
        "type": "Strike"
      },
      {
        "cost": 2,
        "desc": "Use when you kill an adjacent Enemy to immediately move into that model's space, ignoring Escape tests, and gain +1 Combat for your current Attack. You may continue to assign remaining Hits from this new position. This may be used multiple times per turn.",
        "name": "Stalwart Advance",
        "type": "Strike"
      },
      {
        "cost": 4,
        "desc": "Choose a direction. Each model in the 3 spaces adjacent to you in that direction takes 1 Combat Hit that is +1 Damage. These Combat Hits do not generate Fury. Level 3 - 2 Combat Hits each. Level 5 - +2 Damage.  Level 7 - 3 Combat Hits each.",
        "name": "Sweeping Slice",
        "type": "Strike"
      },
      {
        "cost": 5,
        "desc": "You may immediately Heal 1 Wound/Sanity (any mix) for each Enemy adjacent to you (2 each for Enemies Large or bigger). Level 3 - If you Heal 4 or more, gain +1 Combat during next Activation. Level 7 - Heal 2 for each Enemy (3 for Large or bigger).",
        "name": "Stand Your Ground",
        "type": "Healing"
      },
      {
        "cost": 3,
        "desc": "Use only while you are more spaces from the Entry Door of the Map Tile than every other Hero on the same Tile. Add extra Damage to one of your Combat Hits equal to the number of other Heroes on the tile (max +5).",
        "name": "Spearhead",
        "type": "Formation"
      },
      {
        "cost": 4,
        "desc": "You and each adjacent Hero gain +1 to your Defense rolls until the end of the turn. Defense rolls that roll a natural 1 do not gain the +1.",
        "name": "Shoulder to Shoulder",
        "type": "Formation"
      },
      {
        "cost": 2,
        "desc": "Use when you kill an Enemy to collect their head (keep track how many you collect). At the end of the Adventure, gain +10 XP and $25 for each head collected.",
        "name": "Collection Heads",
        "type": "Honor"
      },
      {
        "cost": 2,
        "desc": "Limit once per Fight. Use at start of the turn to select the Enemy with the highest remaining Health to Challenge (choose if tied). Until end of the Fight, that Enemy will always prioritize you as its target and both you and that Enemy are +2 Damage on all Attacks against each other. If you kill that Enemy, gain extra 20 XP (or 40 XP if Larger or bigger) and recover 1 Grit.",
        "name": "Challenge",
        "type": "Honor"
      },
      {
        "cost": 1,
        "desc": "May be used multiple times per turn, but only once during each Enemy group's Activation. Use when one or more adjacent Enemies roll a 1 on their To Hit rolls against you. For each 1 rolled you may cancel one other successful Hit. If there are no Hits left to cancel, for each remaining 1, do the Damage from that Enemy's Hit +2 to an Enemy adjacent to you (including itself).",
        "name": "Parry",
        "type": "Defense"
      }
  ],
  TREDERRAN_FACTIONS: [
      {
          "name": "The Union",
          "desc": "Any time you use a Side Bag Token, roll a D6. On the roll of 5 or 6, do not discard it."
      },
      {
          "name": "The Royal Foundry",
          "desc": "You are -3 Corruption Resistance but gain +2 Health for each Mutation you have. Once per Adventure, gain +2 Shots on a Ranged Attack with a Gun.",
          "modifiers": [{"affects":"corruption","value":-3}]
      },
      {
          "name": "Kharkarus Konfederacy",
          "desc": "You start every Adventure with a free Revive token that only you may use. Going up in Hero Level costs you extra XP equal to new level x 100, in addition to the normal cost."
      },
      {
          "name": "Shintaro Core",
          "desc": "Armor 5+. -1 Initiative.  -1 on all Escape tests.",
          "modifiers": [{"affects":"armor","value":5},{"affects":"init","value":-1}]
      },
      {
          "name": "Republic of Tar-Kon",
          "desc": "All your Attacks are +1 Damage. You gain no XP from Loot, Scavenge, or Healing other Heroes."
      },
      {
          "name": "Liberation Army",
          "desc": "1x Fight, you may take D3+1 Wounds ignoring Defense and Armor, to add D6 Damage to one of your Hits. Gain Keyword Fanatic. At end of every Succesful Adventure, gain 1 Health. At end of every Failed Adventure, lose 2 Health permanently."
      }
  ],
  INJURIES: [
    {
      "desc": "Not particularly debilitating, but it sure hurts! You are -1 Max Grit.",
      "group": "injuries",
      "modifiers": [
        {
          "affects": "grit",
          "value": -1
        }
      ],
      "name": "Broken Collar Bone"
    },
    {
      "desc": "Deep slashes run across your chest, making it hurt to turn or twist your body. You are -1 Initiative.",
      "group": "injuries",
      "modifiers": [
        {
          "affects": "init",
          "value": -1
        }
      ],
      "name": "Chest Wound"
    },
    {
      "desc": "Your ears are ringing a little and you have a headache that won't quit! Until the start of the next Adventure, you are -1 Initiative and roll one less dice on all Skill Test.",
      "group": "injuries",
      "name": "Concussion"
    },
    {
      "desc": "Your arm has been bent and crushed a bit. You are -1 Combat.",
      "group": "injuries",
      "modifiers": [
        {
          "affects": "combat",
          "value": -1
        }
      ],
      "name": "Crushed Arm"
    },
    {
      "desc": "Ouch! Your vision is blurred and cloudy as one of your eyes has been scratched.  You cannot get Critical Hits with your Ranged Attacks.",
      "group": "injuries",
      "name": "Gouged Eye"
    },
    {
      "desc": "Your condition is serious! Any further Injury Chart rolls are only made on a single D6. This Injury is -1 to roll to Heal during Surgery at the Doc's Office in Town.",
      "group": "injuries",
      "name": "Internal Bleeding"
    },
    {
      "desc": "One of your hands is twisted and broken. You have one less Hand for equipping Items each turn. 2-Handed Weapons may still be used but they cannot get Critical Hits.",
      "group": "injuries",
      "name": "Mangled Hand"
    },
    {
      "desc": "You're a bit of a mess, but it's all superficial. In a lot of ways, you look tougher! You are +1 Max Grit.",
      "group": "injuries",
      "modifiers": [
        {
          "affects": "grit",
          "value": 1
        }
      ],
      "name": "New Scars"
    },
    {
      "desc": "You are torn to pieces or crushed beyond recovery. Your Hero is Dead.",
      "group": "injuries",
      "name": "Ripped Apart"
    },
    {
      "desc": "A dep and painful cut runs across your leg. You are -1 Move (min 1).",
      "group": "injuries",
      "modifiers": [
        {
          "affects": "move",
          "value": -1
        }
      ],
      "name": "Slashed Leg"
    },
    {
      "desc": "You pick yourself up and shake yourself off. There is no long lasting effect.",
      "group": "injuries",
      "name": "Wind Knocked Out"
    }
  ],
  MADNESS: [
    {
      "desc": "Your fractured state of mind is in shambles, and you are ready to slip over the edge at any moment. Any further Madness Chart rolls are only made on a single D6. This Madness is -1 to the roll to Heal during an Exorcism at the Church in Town.",
      "group": "madness",
      "name": "Delusions"
    },
    {
      "desc": "You shake it off! You're fine...right? There is no long lasting effect.",
      "group": "madness",
      "name": "Get a Grip"
    },
    {
      "desc": "You can no longer trust what you see as shadows and tendrils of darkness writhe in every corner of your eye. Any time you would draw a Loot card, roll a D6. On 1, you instead take 1 Sanity Damage, ignoring Willpower as you recoil from the hideous visions!",
      "group": " madness",
      "name": "Hallucinations"
    },
    {
      "desc": "They're telling you to kill...again! Any time you end your Move adjacent to another Hero, roll a D6. On 1 or 2, that Hero takes 3 Hits as you lash out at them!",
      "group": "madness",
      "name": "Hearing Voices"
    },
    {
      "desc": "You've come back from the brink of madness...and are stronger for it! You are +1 Max Grit.",
      "group": "madness",
      "modifiers": [
        {
          "affects": "grit",
          "value": 1
        }
      ],
      "name": "I've Seen Things"
    },
    {
      "desc": "How does it know your name? You can hear it calling you in the dark! Whenever the Hold Back the Darkness roll is failed (including doubles that would fail), you take D3 Sanity Damage, ignoring Willpower saves",
      "group": "madness",
      "name": "It's Coming for You"
    },
    {
      "desc": "You have descended into the dark depths of purest Madness! Your Hero is, for all intents and purposes, considered to be Dead.",
      "group": "madness",
      "name": "Lost to the Darkness"
    },
    {
      "desc": "You feel the ebb and flow of the Void energy all around you. You no longer get a Willpower save to prevent Corruption Hits.",
      "group": "madness",
      "name": "Open to the Void"
    },
    {
      "desc": "They're out to get you...all of them! Anytime you want to Scavenge or Explore a Doorway, you must first roll a D6. On 1, 2, or 3, you cannot as you are distracted keeping an eye on the other Heroes with you.",
      "group": "madness",
      "name": "Paranoia"
    },
    {
      "desc": "It's...sooo...coooolldd! When Scavenging, ignore the first 6 you roll on the Scavenge test.",
      "group": "madness",
      "name": "The Chills"
    },
    {
      "desc": "Your skin burns and itches as you scratch at it feverishly. At the start of each turn, you take 1 Hit, as you claw at your skin.",
      "group": "madness",
      "name": "The Itching"
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
]
}
