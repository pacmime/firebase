angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('character/abilities.html',
    "<div class=\"abilities\">\n" +
    "    <h4>Abilities</h4>\n" +
    "    <div ng-repeat=\"(name, desc) in ctrl.character.abilities\">\n" +
    "        <strong>{{name}}</strong> <small>{{desc}}</small>\n" +
    "        <br><br>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"grid grid--bleed\">\n" +
    "        <div class=\"grid__col-md-5\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                ng-model=\"ctrl.newAbility.name\">\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-md-7\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                    ng-model=\"ctrl.newAbility.desc\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" class=\"btn btn-success\" \n" +
    "                        ng-disabled=\"!ctrl.newAbility.name\" \n" +
    "                        ng-click=\"ctrl.addNewAbility()\">+</button>\n" +
    "                </span>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/body.html',
    "<div class=\"body\">\n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "            \n" +
    "            <ng-include src=\"'src/character/items.html'\"></ng-include>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <ng-include src=\"'src/character/abilities.html'\"></ng-include>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/char-bs.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-5 col-md-6 col-lg-8\">\n" +
    "\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "\n" +
    "                    <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "                    <div>\n" +
    "                        <div><label>To Hit:</label></div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-7 col-md-6 col-lg-4\">\n" +
    "\n" +
    "                    <div class=\"stats\">\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Agility</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Cunning</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Strength</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Lore</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Spirit</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Initiative</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"body\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "                    <div class=\"items\">\n" +
    "                        <h4>Items</h4>\n" +
    "\n" +
    "                        <div ng-repeat=\"(name, item) in ctrl.character.items\" class=\"item row row--no-gutter\">\n" +
    "                            <div class=\"col-sm-9 col-sm-push-3 col-md-8 col-md-push-4\">\n" +
    "                                <strong>{{name}}: </strong> {{item.description}} [<em>{{item.source}}</em>]\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3 col-sm-pull-9 col-md-4 col-md-pull-8\">\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_weight.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.weight}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_darkstone.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.darkstone}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_hands.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.hands}}\n" +
    "                                </div>\n" +
    "                                <div class=\"item__attr\">\n" +
    "                                    <img src=\"assets/item_slots.png\"> \n" +
    "                                    <br class=\"hidden-xs\"> \n" +
    "                                    {{item.slots}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                                        \n" +
    "                        <img src=\"assets/item_weight.png\" width=\"32\"> {{ctrl.itemWeight}}\n" +
    "                        <img src=\"assets/item_darkstone.png\" width=\"32\"> {{ctrl.itemDarkstone}}\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"abilities\">\n" +
    "                        <h4>Abilities</h4>\n" +
    "                        <div ng-repeat=\"(name, desc) in ctrl.character.abilities\">\n" +
    "                            <strong>{{name}}</strong> <small>{{desc}}</small>\n" +
    "                            <br><br>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"row\">\n" +
    "                            <div class=\"col-md-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Name\"\n" +
    "                                    ng-model=\"ctrl.newAbility.name\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-6\">\n" +
    "                                <input type=\"text\" class=\"form-control\" placeholder=\"Description\" \n" +
    "                                    ng-model=\"ctrl.newAbility.desc\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-md-2\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\" \n" +
    "                                    ng-disabled=\"!ctrl.newAbility.name\" \n" +
    "                                    ng-click=\"ctrl.addNewAbility()\">+</button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"footer\">\n" +
    "\n" +
    "        <div class=\"container-fluid\">\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"level\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <label>Level</label>\n" +
    "                                <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>XP</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                            <img src=\"assets/xp.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <!-- <label>Gold</label> -->\n" +
    "                            <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                            <img src=\"assets/wealth.png\">\n" +
    "                        </div>\n" +
    "                        <div class=\"darkstone\">\n" +
    "                            <div class=\"stat\">\n" +
    "                                <!-- <label>Dark Stone</label> -->\n" +
    "                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                                <img src=\"assets/darkstone.png\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        \n" +
    "                        <br>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"row row--no-gutter\">\n" +
    "\n" +
    "                            <div class=\"col-sm-8 col-sm-push-4\">\n" +
    "                                <div class=\"clearfix\">\n" +
    "                                    <div class=\"health\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Health</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <img src=\"assets/wealth.png\">\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "                                            <img src=\"assets/wound.png\">    \n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Defense</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"sanity\">\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Max Sanity</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <!-- <label>Loss</label> -->\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "                                            <img src=\"assets/sanity.png\">\n" +
    "                                        </div>\n" +
    "                                        <div class=\"stat\">\n" +
    "                                            <label>Willpower</label>\n" +
    "                                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    \n" +
    "                                    <div class=\"clearfix\">\n" +
    "                                        <div class=\"faith\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Faith</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"corruption\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Corruption</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <!-- <label>Current</label> -->\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                                    ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "                                                <img src=\"assets/corruption.png\">\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div>\n" +
    "                                        <div class=\"movement\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Move</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"grit\">\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Max Grit</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"stat\">\n" +
    "                                                <label>Current</label>\n" +
    "                                                <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                \n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-4 col-sm-pull-8\">\n" +
    "                                <div class=\"sidebag\">\n" +
    "                                    <h4>Side Bag</h4>\n" +
    "\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Bandages</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "                                        <img src=\"assets/bandages.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Whiskey</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "                                        <img src=\"assets/whiskey.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Tonic</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "                                        <img src=\"assets/tonic.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Herbs</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "                                        <img src=\"assets/herb.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Dynamite</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "                                        <img src=\"assets/dynamite.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Flash</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "                                        <img src=\"assets/flash.png\">\n" +
    "                                    </div>    \n" +
    "                                    <br>\n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <!-- <label>Swamp Fungus</label> -->\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                                            ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "                                        <img src=\"assets/fungus.png\">\n" +
    "                                    </div>    \n" +
    "                                    <div class=\"stat\">\n" +
    "                                        <label>Capacity</label>\n" +
    "                                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "                                    </div>    \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-12 col-md-6\">\n" +
    "\n" +
    "\n" +
    "                    <div class=\"clothing\">\n" +
    "                        <h4>Clothing</h4>\n" +
    "                        <div ng-repeat=\"(slotName,slot) in ctrl.character.clothing\" class=\"media\">\n" +
    "                            <div class=\"media-left\">\n" +
    "                                <strong>{{slotName}}: </strong>\n" +
    "                            </div>\n" +
    "                            <div class=\"media-body\">\n" +
    "                                <div ng-repeat=\"(name,desc) in slot\">\n" +
    "                                    {{name}} <small>{{desc}}</small>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"mutations\">\n" +
    "                        <h4>Mutations</h4>\n" +
    "\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <input type=\"text\" class=\"form-control\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                                <button type=\"button\" class=\"btn btn-success\">+</button>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/character.html',
    "<div class=\"page\">\n" +
    "\n" +
    "    <ng-include src=\"'src/character/header.html'\"></ng-include>\n" +
    "\n" +
    "    <ng-include src=\"'src/character/body.html'\"></ng-include>\n" +
    "\n" +
    "    <ng-include src=\"'src/character/footer.html'\"></ng-include>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/clothing.html',
    "<div class=\"clothing\">\n" +
    "    <h4>Clothing</h4>\n" +
    "    <div ng-repeat=\"(slotName,slot) in ctrl.character.clothing\" class=\"media\">\n" +
    "        <div class=\"media-left\">\n" +
    "            <strong>{{slotName}}: </strong>\n" +
    "        </div>\n" +
    "        <div class=\"media-body\">\n" +
    "            <div ng-repeat=\"(name,desc) in slot\">\n" +
    "                {{name}} <small>{{desc}}</small>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/faith-and-corruption.html',
    "\n" +
    "<div class=\"clearfix\">\n" +
    "    \n" +
    "    <div class=\"faith\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Faith</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.faith\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"corruption\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Corruption</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.corruption.max\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"stat\">\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "                ng-model=\"ctrl.character.corruption.current\"></div>\n" +
    "            <img src=\"assets/corruption.png\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>\n"
  );


  $templateCache.put('character/footer.html',
    "<div class=\"footer\">\n" +
    "\n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <div>\n" +
    "                \n" +
    "                <div class=\"level\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Level</label>\n" +
    "                        <div class=\"value\">{{ctrl.character.level}}</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"xp\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <!-- <label>XP</label> -->\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                        <img src=\"assets/xp.png\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"wealth\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                        <img src=\"assets/wealth.png\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"darkstone\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.darkstone\"></div>\n" +
    "                        <img src=\"assets/darkstone.png\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"grid grid--bleed grid--wrap-reverse\">\n" +
    "\n" +
    "                <div class=\"grid__col-xs-5 grid__col-sm-4\">\n" +
    "\n" +
    "                    <ng-include src=\"'src/character/sidebag.html'\"></ng-include>    \n" +
    "                    \n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"grid__col-xs-7 grid__col-sm-8\">\n" +
    "\n" +
    "                    <ng-include src=\"'src/character/health.html'\"></ng-include>\n" +
    "\n" +
    "                    <ng-include src=\"'src/character/sanity.html'\"></ng-include>\n" +
    "                    \n" +
    "                    <ng-include src=\"'src/character/faith-and-corruption.html'\"></ng-include>\n" +
    "                    \n" +
    "                    <ng-include src=\"'src/character/move-and-grit.html'\"></ng-include>\n" +
    "\n" +
    "                </div>\n" +
    "                \n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <ng-include src=\"'src/character/clothing.html'\"></ng-include>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/mutations-and-injuries.html'\"></ng-include>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/header.html',
    "<header>\n" +
    "        \n" +
    "    <div class=\"grid grid--bleed\">\n" +
    "        \n" +
    "        <div class=\"grid__col-sm-5 grid__col-md-6 grid__col-lg-6\">\n" +
    "\n" +
    "            <div class=\"grid\">\n" +
    "\n" +
    "                <!-- avatar -->\n" +
    "                <div class=\"grid__col-xs-5 grid__col-sm-4 grid__col-md-3 grid__col-lg-2 grid--align-self-end\">\n" +
    "                    <div img-selector ng-model=\"ctrl.character.avatar\" on-save=\"ctrl.save()\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- name, class, and keywords -->\n" +
    "                <div class=\"grid__col-xs-7 grid__col-sm-8 grid__col-md-9 grid__col-lg-10\">\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "                    <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div>\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <br>\n" +
    "\n" +
    "            <div class=\"grid\">\n" +
    "                \n" +
    "                <div class=\"grid__col-xs-4\">\n" +
    "\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Combat</label>\n" +
    "                        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"grid__col-xs-8\">\n" +
    "                    \n" +
    "                    <div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-7 grid__col-md-6 grid__col-lg-4\">\n" +
    "\n" +
    "            <ng-include src=\"'src/character/stats.html'\"></ng-include>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>"
  );


  $templateCache.put('character/health.html',
    "<div class=\"health\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Max Health</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.health.max\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <img src=\"assets/wealth.png\">\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "        <img src=\"assets/wound.png\">    \n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Defense</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/items.html',
    "<div class=\"items\">\n" +
    "    <h4>Items</h4>\n" +
    "\n" +
    "    <div ng-repeat=\"(name, item) in ctrl.character.items\" class=\"item grid grid--bleed grid--wrap-reverse\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-3 grid__col-md-4\">\n" +
    "            <div class=\"grid grid--justify-space-between\">\n" +
    "                <div class=\"grid__col\">\n" +
    "                    <div>\n" +
    "                        <img src=\"assets/item_weight.png\"> \n" +
    "                        <br class=\"hidden-xs\"> \n" +
    "                        {{item.weight}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"grid__col\">\n" +
    "                    <div>\n" +
    "                        <img src=\"assets/item_darkstone.png\"> \n" +
    "                        <br class=\"hidden-xs\"> \n" +
    "                        {{item.darkstone}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"grid__col\">\n" +
    "                    <img src=\"assets/item_hands.png\"> \n" +
    "                    <br class=\"hidden-xs\"> \n" +
    "                    {{item.hands}}\n" +
    "                </div>\n" +
    "                <div class=\"grid__col\">\n" +
    "                    <img src=\"assets/item_slots.png\"> \n" +
    "                    <br class=\"hidden-xs\"> \n" +
    "                    {{item.slots}}\n" +
    "                </div>\n" +
    "                <div class=\"grid__col\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-9 grid__col-md-8\">\n" +
    "            <div>\n" +
    "                <strong>{{name}} </strong>\n" +
    "                <br>\n" +
    "                {{item.description}}\n" +
    "                <br>\n" +
    "                <em>{{item.source}}</em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"ctrl.addNewItem()\">New</button>\n" +
    "                    \n" +
    "    <img src=\"assets/item_weight.png\" width=\"32\"> {{ctrl.itemWeight}}\n" +
    "    <img src=\"assets/item_darkstone.png\" width=\"32\"> {{ctrl.itemDarkstone}}\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/move-and-grit.html',
    "\n" +
    "<div>\n" +
    "    <div class=\"movement\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Move</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.movement\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"grit\">\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Max Grit</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.max\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"stat\">\n" +
    "            <label>Current</label>\n" +
    "            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.grit.current\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/mutations-and-injuries.html',
    "<div class=\"mutations\">\n" +
    "    <h4>Mutations &amp; Injuries</h4>\n" +
    "\n" +
    "    <div class=\"input-group\">\n" +
    "        <input type=\"text\" class=\"form-control\">\n" +
    "        <span class=\"input-group-btn\">\n" +
    "            <button type=\"button\" class=\"btn btn-success\">+</button>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/sanity.html',
    "\n" +
    "<div class=\"sanity\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Max Sanity</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.sanity.max\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Loss</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sanity.loss\"></div>\n" +
    "        <img src=\"assets/sanity.png\">\n" +
    "    </div>\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Willpower</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('character/sidebag.html',
    "<div class=\"sidebag\">\n" +
    "    <h4>Side Bag</h4>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Bandages</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.bandages\"></div>\n" +
    "        <img src=\"assets/bandages.png\">\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Whiskey</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.whiskey\"></div>\n" +
    "        <img src=\"assets/whiskey.png\">\n" +
    "    </div>    \n" +
    "    <br>\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Tonic</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.tonic\"></div>\n" +
    "        <img src=\"assets/tonic.png\">\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Herbs</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.herbs\"></div>\n" +
    "        <img src=\"assets/herb.png\">\n" +
    "    </div>    \n" +
    "    <br>\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Dynamite</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.dynamite\"></div>\n" +
    "        <img src=\"assets/dynamite.png\">\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Flash</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.flash\"></div>\n" +
    "        <img src=\"assets/flash.png\">\n" +
    "    </div>    \n" +
    "    <br>\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Swamp Fungus</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.fungus\"></div>\n" +
    "        <img src=\"assets/fungus.png\">\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <label>Capacity</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.capacity\"></div>\n" +
    "    </div>    \n" +
    "</div>"
  );


  $templateCache.put('character/stats.html',
    "<div class=\"stats\">\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Agility</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Cunning</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Spirit</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "    <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Strength</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Lore</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Spirit</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Initiative</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('home/home.html',
    "<div class=\"container\">\n" +
    "\n" +
    "    <div class=\"alert alert-danger\" ng-if=\"ctrl.displayOpts.error\">{{ctrl.displayOpts.error}}</div>\n" +
    "    \n" +
    "    <div ng-if=\"ctrl.displayOpts.loading\">Fetching data...</div>\n" +
    "    \n" +
    "    <div class=\"list-group\">\n" +
    "        <div class=\"list-group-item disabled\">\n" +
    "            <h4 class=\"list-group-item-heading\">Characters</h4>\n" +
    "            <p class=\"list-group-item-text\">Select a character from the list</p>\n" +
    "        </div>\n" +
    "        <a ng-repeat=\"name in ctrl.chars\" \n" +
    "            class=\"list-group-item\" \n" +
    "            href=\"#/{{name|encode}}\">{{name}}</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-success\"\n" +
    "        title=\"Create a new character\" \n" +
    "        ng-click=\"ctrl.createCharacter()\">\n" +
    "        New\n" +
    "    </button>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('item.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Description\">\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source\">\n" +
    "\n" +
    "        <div>\n" +
    "            <label>Weight: <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Darkstone: <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Num Hands: <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <label>Upgrade Slots:<input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('keypad.html',
    "<div class=\"modal-content keypad\">\n" +
    "  \n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <h3>Current: {{value}}</h3>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-10)\">-10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-5)\">-5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-2)\">-2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(-1)\">-1</button>\n" +
    "        <br>\n" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(1)\">1</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(2)\">2</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(3)\">3</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(4)\">4</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(5)\">5</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(10)\">10</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(15)\">15</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(20)\">20</button>\n" +
    "        <br>\n" +
    "        \n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(25)\">25</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(30)\">30</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(35)\">35</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"change(40)\">40</button>\n" +
    "\n" +
    "    </div>\n" +
    "    \n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );

}]);
