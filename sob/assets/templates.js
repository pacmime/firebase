angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('character/abilities/abilities.html',
    "<div class=\"abilities\">\n" +
    "    <h4>Abilities</h4>\n" +
    "    <div ng-repeat=\"(id, ability) in character.abilities\" \n" +
    "        ability=\"ability\" on-save=\"onEdited(id, updated)\"></div>\n" +
    "\n" +
    "    <hr>\n" +
    "    \n" +
    "    <form class=\"form\">\n" +
    "        \n" +
    "        <label>Add Ability</label>\n" +
    "        <div class=\"f-container f-justify-between f-align-center\">\n" +
    "            <div class=\"f-cell-2x\">\n" +
    "                <select class=\"form-control\" ng-model=\"newAbility\" \n" +
    "                    ng-options=\"item as item.name disable when item.disabled for item in options\">\n" +
    "                    <option value=\"\">Select New Ability</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!newAbility\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <label>Add Custom Ability</label>\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"customAbility.name\">\n" +
    "        <textarea rows=\"2\" class=\"form-control\" placeholder=\"Description\" ng-model=\"customAbility.desc\"></textarea>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!customAbility.name\" ng-click=\"addCustom()\">Add</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/abilities/ability.html',
    "<div class=\"ability\">\n" +
    "  <div ng-if=\"!ctrl.displayEditor\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "          <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "        </button>     \n" +
    "      </div>\n" +
    "      <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "        type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "        <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "      </button>&nbsp;&nbsp;&nbsp;\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>\n" +
    "  </div>\n" +
    "  <form class=\"form\" ng-if=\"ctrl.displayEditor\">\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"ctrl.name\" placeholder=\"name\">\n" +
    "    <textarea rows=\"3\" class=\"form-control\" ng-model=\"ctrl.desc\" placeholder=\"value\"></textarea>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.save()\">\n" +
    "      <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.cancel()\">\n" +
    "      <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "    </button>\n" +
    "  </form>\n" +
    "</div>"
  );


  $templateCache.put('character/body.html',
    "<div class=\"body\">\n" +
    "    \n" +
    "    <div class=\"grid\">\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "            \n" +
    "            <div>\n" +
    "                \n" +
    "                <div class=\"level\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Level</label>\n" +
    "                        <div class=\"value\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.level\" minimum=\"1\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"xp\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <!-- <label>XP</label> -->\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.xp\"></div>\n" +
    "                        <!-- <img src=\"assets/xp.png\"> -->\n" +
    "                        <span class=\"sprite sprite-xp\"></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"wealth\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div class=\"value--sm\" editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.wealth\"></div>\n" +
    "                        <!-- <img src=\"assets/wealth.png\"> -->\n" +
    "                        <span class=\"sprite sprite-wealth\"></span>\n" +
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
    "            <ng-include src=\"'src/character/health.html'\"></ng-include>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/sanity.html'\"></ng-include>\n" +
    "            \n" +
    "            <ng-include src=\"'src/character/faith-and-corruption.html'\"></ng-include>\n" +
    "            \n" +
    "            <ng-include src=\"'src/character/move-and-grit.html'\"></ng-include>\n" +
    "\n" +
    "            <ng-include src=\"'src/character/sidebag.html'\"></ng-include>    \n" +
    "                    \n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <div abilities character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "            \n" +
    "        </div>\n" +
    "    </div>\n" +
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
    "\n" +
    "    <a onclick=\"useV2()\" class=\"pull-right\">Use Version 2 of the App</a>\n" +
    "\n" +
    "    <script>\n" +
    "        function useV2() {\n" +
    "            var newPath = \"/sob/v2.html\";\n" +
    "\n" +
    "            //development version\n" +
    "            if(~window.location.pathname.indexOf(\"dev\"))\n" +
    "                newPath = \"/v2dev.html\";\n" +
    "\n" +
    "            window.location.pathname=newPath;\n" +
    "        }\n" +
    "    </script>\n" +
    "</div>"
  );


  $templateCache.put('character/clothing/clothing-item.html',
    "<div class=\"clothing-item\">\n" +
    "   <div class=\"pull-right\">\n" +
    "       <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "          <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "            <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "          </button>\n" +
    "          <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "            <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "          </button>     \n" +
    "        </div>\n" +
    "        <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "          type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "           <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "       </button>&nbsp;&nbsp;&nbsp;\n" +
    "       <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "           <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "       </button>\n" +
    "   </div>\n" +
    "   <h5>\n" +
    "       {{clothingItem.name}} \n" +
    "       <small>{{clothingItem.type}}</small>\n" +
    "   </h5>\n" +
    "   <p><small>{{clothingItem.desc}}</small></p>\n" +
    "   <p>\n" +
    "       <small>\n" +
    "           <em ng-if=\"clothingItem.source\"> ({{clothingItem.source}})</em>\n" +
    "           <span class=\"sprite sprite-item_weight\"></span> {{clothingItem.weight}}\n" +
    "           <span class=\"sprite sprite-item_darkstone\"></span> {{clothingItem.darkstone}}\n" +
    "           <span class=\"sprite sprite-item_hands\"></span> {{clothingItem.hands}}\n" +
    "           <span class=\"sprite sprite-item_slots\"></span> {{clothingItem.slots}}\n" +
    "       </small>\n" +
    "   </p>\n" +
    "</div>"
  );


  $templateCache.put('character/clothing/clothing.html',
    "<div class=\"clothing\">\n" +
    "   \n" +
    "    <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"add()\">Add</button>\n" +
    "\n" +
    "    <h4>\n" +
    "        Clothing\n" +
    "        <small>\n" +
    "            <span class=\"sprite sprite-item_weight\"></span> {{itemWeight}} &nbsp;\n" +
    "            <span class=\"sprite sprite-item_darkstone\"></span> {{itemDarkstone}}\n" +
    "        </small>\n" +
    "    </h4>\n" +
    "\n" +
    "   <div ng-repeat=\"(type,item) in character.clothing\"> \n" +
    "     <clothing-item-2 clothing-item=\"character.clothing[type]\" on-save=\"onEdited(item, type)\"></clothing-item-2>\n" +
    "   </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('character/clothing/editor.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"What is the clothing's name?\">\n" +
    "        </div><br>\n" +
    "        \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Desc</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Describe the clothing\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Source</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Cost</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Slot</span>\n" +
    "            <input disabled type=\"text\" class=\"form-control\" ng-if=\"!newItem\" value=\"{{item.type}}\">\n" +
    "            <select type=\"text\" class=\"form-control\" ng-if=\"newItem\" \n" +
    "                ng-model=\"item.type\" required ng-options=\"type for type in types\">\n" +
    "                <option value=\"\">Select Slot</option>\n" +
    "            </select>\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>        \n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name||!item.type\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
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
    "            <!-- <img src=\"assets/corruption.png\"> -->\n" +
    "            <span class=\"sprite sprite-corruption\"></span>\n" +
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
    "            <div items character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "\n" +
    "            <!-- <ng-include src=\"'src/character/clothing.html'\"></ng-include> -->\n" +
    "            <div clothing-2 character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "            <div mutations character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "            <div sermons character=\"ctrl.character\" on-save=\"ctrl.save()\"></div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"grid__col-sm-12 grid__col-md-6\">\n" +
    "            <div class=\"notes\">\n" +
    "                <h4>\n" +
    "                    <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"ctrl.save()\">Save</button>\n" +
    "                    Notes\n" +
    "                </h4>\n" +
    "                <textarea name=\"notes\" rows=\"10\" placeholder=\"Enter any notes about this character\" class=\"form-control\"\n" +
    "                    ng-model=\"ctrl.character.notes\"></textarea>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
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
    "                <div class=\"grid__col-xs-5 grid__col-sm-4 grid__col-md-3 grid__col-lg-3 grid--align-self-end\">\n" +
    "                    <div img-selector ng-model=\"ctrl.character.avatar\" on-save=\"ctrl.save()\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- name, class, and keywords -->\n" +
    "                <div class=\"grid__col-xs-7 grid__col-sm-8 grid__col-md-9 grid__col-lg-9\">\n" +
    "                    <div><label>Name: </label> {{ctrl.charName}}</div>\n" +
    "                    <div class=\"editable-input\">\n" +
    "                        <strong>Class: </strong> {{ctrl.charClass}}\n" +
    "                        <!-- <select class=\"form-control\" ng-model=\"ctrl.character.class\" ng-change=\"ctrl.save()\" \n" +
    "                            ng-options=\"item.id as item.name for item in ctrl.classes\">\n" +
    "                            <option value=\"\">Select Class</option>\n" +
    "                        </select> -->\n" +
    "                    </div>\n" +
    "                    <!-- <div editable-input label=\"Class\" ng-model=\"ctrl.character.class\" on-save=\"ctrl.save()\"></div> -->\n" +
    "                    <div editable-input label=\"Keywords\" ng-model=\"ctrl.character.keywords\" on-save=\"ctrl.save()\"></div>\n" +
    "                    <br>\n" +
    "                    <div>\n" +
    "                        <span class=\"stat\">\n" +
    "                            <label>Combat</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.combat\"></div>\n" +
    "                        </span>\n" +
    "\n" +
    "                        <span class=\"stat stat--with-plus\">\n" +
    "                            <label>Melee</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.melee\"></div>\n" +
    "                        </span>\n" +
    "                        <span class=\"stat stat--with-plus\">\n" +
    "                            <label>Ranged</label>\n" +
    "                            <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.ranged\"></div>\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "\n" +
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
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.health.wounds\"></div>\n" +
    "        <!-- <img src=\"assets/wound.png\">    --> \n" +
    "        <span class=\"sprite sprite-wound\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Defense</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.defense\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Armor</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.armor\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('character/items/editor.html',
    "<div class=\"modal-content\">\n" +
    "  <!-- <div class=\"modal-header\">\n" +
    "    <h4 class=\"modal-title\">Modal title</h4>\n" +
    "  </div> -->\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Desc</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Description\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <input type=\"text\" class=\"form-control\" ng-model=\"item.keywords\" placeholder=\"Keywords\"><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-8\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Source</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-4\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">$</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>   \n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Use</span>\n" +
    "            <select class=\"form-control\" ng-model=\"item.usage\">\n" +
    "            <option value=\"\">N/A</option>\n" +
    "            <option value=\"Turn\">Turn</option>\n" +
    "            <option value=\"Fight\">Fight</option>\n" +
    "            <option value=\"Adventure\">Adventure</option>\n" +
    "        </select>\n" +
    "        <br>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('character/items/item.html',
    "<div class=\"item grid grid--bleed grid--wrap-reverse\">\n" +
    "   <div class=\"grid__col-sm-3 grid__col-md-4\">\n" +
    "       <div class=\"grid grid--justify-space-between\">\n" +
    "           <div class=\"grid__col\">\n" +
    "               <div>\n" +
    "                  <span class=\"sprite sprite-item_weight\" ng-class=\"{disabled:!item.weight}\"></span> \n" +
    "                  <br class=\"hidden-xs\"> {{item.weight}}\n" +
    "                </div>\n" +
    "           </div>\n" +
    "           <div class=\"grid__col\">\n" +
    "               <div>\n" +
    "                  <span class=\"sprite sprite-item_darkstone\" ng-class=\"{disabled:!item.darkstone}\"></span> \n" +
    "                  <br class=\"hidden-xs\"> {{item.darkstone}}\n" +
    "                </div>\n" +
    "           </div>\n" +
    "           <div class=\"grid__col\">\n" +
    "               <div>\n" +
    "                  <span class=\"sprite sprite-item_hands\" ng-class=\"{disabled:!item.hands}\"></span> \n" +
    "                  <br class=\"hidden-xs\"> {{item.hands}}\n" +
    "                </div>\n" +
    "           </div>\n" +
    "           <div class=\"grid__col\">\n" +
    "               <div>\n" +
    "                  <span class=\"sprite sprite-item_slots\" ng-class=\"{disabled:!item.slots}\"></span> \n" +
    "                  <br class=\"hidden-xs\"> {{item.slots}}\n" +
    "                </div>\n" +
    "           </div>\n" +
    "           <div class=\"grid__col\"></div>\n" +
    "       </div>\n" +
    "   </div>\n" +
    "   <div class=\"grid__col-sm-9 grid__col-md-8\">\n" +
    "       <div>\n" +
    "            <div class=\"pull-right\">\n" +
    "              <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "                  <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "                </button>     \n" +
    "              </div>\n" +
    "              <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "                type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "                 <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "               </button>&nbsp;&nbsp;&nbsp;\n" +
    "               <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "                 <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "               </button>\n" +
    "            </div>\n" +
    "            <h5>{{name}} <br><small>({{item.source}}) <span ng-if=\"item.cost\">${{item.cost}}</span></small></h5>\n" +
    "            <small>\n" +
    "              {{item.description}}  \n" +
    "              <div ng-if=\"item.keywords\">{{item.keywords}}</div>\n" +
    "            </small>\n" +
    "            <div ng-if=\"item.usage\"> <input type=\"checkbox\"> <small>(per {{item.usage}})</small> </div>\n" +
    "       </div>\n" +
    "   </div>\n" +
    "</div>"
  );


  $templateCache.put('character/items/items.html',
    "<div class=\"items\">\n" +
    "    \n" +
    "    <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"add()\">Add</button>\n" +
    "    \n" +
    "    <h4>\n" +
    "        Items \n" +
    "        <small>\n" +
    "            <span class=\"sprite sprite-item_weight\"></span> {{itemWeight}} &nbsp;\n" +
    "            <span class=\"sprite sprite-item_darkstone\"></span> {{itemDarkstone}}\n" +
    "        </small>\n" +
    "    </h4>\n" +
    "\n" +
    "    <div ng-repeat=\"(name, item) in character.items\" item=\"item\" name=\"{{name}}\" on-save=\"onEdited(name, item)\"></div>\n" +
    "\n" +
    "    <hr>\n" +
    "\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('character/move-and-grit.html',
    "\n" +
    "<div>\n" +
    "    <div class=\"movement\">\n" +
    "        <div class=\"stat stat--prepend-plus\">\n" +
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


  $templateCache.put('character/mutations/mutation.html',
    "<div class=\"mutation\">\n" +
    "  <div ng-if=\"!ctrl.displayEditor\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "          <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "        </button>     \n" +
    "      </div>\n" +
    "      <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "        type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "        <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "      </button>&nbsp;&nbsp;&nbsp;\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>\n" +
    "  </div>\n" +
    "  <form ng-if=\"ctrl.displayEditor\">\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"ctrl.name\" placeholder=\"name\">\n" +
    "    <textarea rows=\"3\" class=\"form-control\" ng-model=\"ctrl.desc\" placeholder=\"value\"></textarea>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.save()\">\n" +
    "      <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.cancel()\">\n" +
    "      <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "    </button>\n" +
    "  </form>\n" +
    "  <br><br>\n" +
    "</div>"
  );


  $templateCache.put('character/mutations/mutations-and-injuries.html',
    "<div class=\"mutations\">\n" +
    "    <h4>Mutations &amp; Injuries</h4>\n" +
    "    <div ng-repeat=\"(name, desc) in character.mutations\" \n" +
    "        mutation name=\"{{name}}\" desc=\"{{desc}}\" on-save=\"onEdited(name, newName, newDesc)\"></div>\n" +
    "    <hr>\n" +
    "    \n" +
    "    <label>Add Mutation, Injury, or Madness</label>\n" +
    "    <div class=\"f-container f-justify-between f-align-center\">\n" +
    "        <div class=\"f-cell-2x\">\n" +
    "            <select class=\"form-control\" ng-model=\"newMutation\" \n" +
    "                ng-options=\"item as item.name group by item.group disable when item.disabled for item in mimOpts\">\n" +
    "                <option value=\"\">Select One</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!newMutation\" ng-click=\"add()\">Add</button>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "\n" +
    "    <form class=\"form\">\n" +
    "        <label>Add Custom Mutation, Injury, or Madness</label>\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"customMutation.name\">\n" +
    "        <textarea rows=\"3\" class=\"form-control\" placeholder=\"Description\" ng-model=\"customMutation.desc\"></textarea>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!customMutation.name\" ng-click=\"addCustom()\">Add</button>\n" +
    "    </form>\n" +
    "\n" +
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
    "        <!-- <img src=\"assets/sanity.png\"> -->\n" +
    "        <span class=\"sprite sprite-sanity\"></span>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Willpower</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.willpower\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"stat stat--with-plus\">\n" +
    "        <label>Sp Armor</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.spiritArmor\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('character/sermons/editor.html',
    "<div class=\"modal-content\">\n" +
    "  \n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Sermon Name\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Type</span>\n" +
    "            <select class=\"form-control\" ng-model=\"item.type\">\n" +
    "                <option value=\"\">Select One</option>\n" +
    "                <option value=\"Blessing\">Blessing</option>\n" +
    "                <option value=\"Judgement\">Judgement</option>\n" +
    "            </select>\n" +
    "        </div><br>\n" +
    "        \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Desc</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Description\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Cost</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.cost\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Check</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.check\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Range</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.range\" placeholder=\"e.g, 6\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">XP</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.xp\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Deadly</span>\n" +
    "            <input type=\"checkbox\" class=\"form-control\" ng-model=\"item.deadly\">\n" +
    "        </div><br>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name||!item.type\" ng-click=\"ok()\">Save</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('character/sermons/sermon.html',
    "<div class=\"sermon\" ng-class=\"{disabled:!ctrl.isAvailable()}\">\n" +
    "    <h5>\n" +
    "        {{sermon.name}} \n" +
    "        <small>{{sermon.type}}</small>\n" +
    "    </h5>\n" +
    "    <p>\n" +
    "        <small>\n" +
    "            <div>\n" +
    "                <span ng-if=\"sermon.deadly\">\n" +
    "                    <span class=\"glyphicon glyphicon-exclamation-sign\" title=\"Dangerous!\"></span>&nbsp;&nbsp;&nbsp;\n" +
    "                </span>\n" +
    "                <strong>[{{sermon.check}}+]</strong>&nbsp;&nbsp;&nbsp;\n" +
    "                <strong>Cost: </strong> {{sermon.cost}}&nbsp;&nbsp;&nbsp;\n" +
    "                <strong>XP: </strong> {{sermon.xp}}&nbsp;&nbsp;&nbsp;\n" +
    "            </div>\n" +
    "            <div><strong>Range: </strong> {{sermon.range}}</div>\n" +
    "            <div>{{sermon.desc}}</div>\n" +
    "       </small>\n" +
    "    </p>\n" +
    "    <div>\n" +
    "        <div class=\"pull-right\">\n" +
    "            <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "                  <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "                </button>     \n" +
    "              </div>\n" +
    "              <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "                type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "                <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "            </button>&nbsp;&nbsp;&nbsp;\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "                <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        \n" +
    "        <!-- if not cast already and not empty or insufficient -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-info\" \n" +
    "            ng-if=\"ctrl.canCast()\" \n" +
    "            ng-click=\"ctrl.use()\">cast</button>\n" +
    "\n" +
    "        <!-- if cast but not empty -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-warning\" \n" +
    "            ng-if=\"ctrl.canSpendExtraFaith()\" \n" +
    "            ng-click=\"ctrl.spendExtraFaith()\">+faith</button>\n" +
    "\n" +
    "        <!-- if cast but no applied xp -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" \n" +
    "            ng-if=\"ctrl.canApplyXP()\" ng-click=\"ctrl.applyXP()\">+xp</button>\n" +
    "\n" +
    "        <!-- if empty or not cast and insufficient -->\n" +
    "        <span class=\"text-muted\" \n" +
    "            ng-if=\"ctrl.isInsufficient()\">\n" +
    "            <em>not enough faith</em>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "        \n" +
    "</div>"
  );


  $templateCache.put('character/sermons/sermons.html',
    "<div class=\"sermons\" ng-if=\"canCastSermons()\">\n" +
    "   <h4>\n" +
    "        <div class=\"pull-right\">\n" +
    "            Faith: {{$parent.character.availableFaith}} / {{$parent.character.faith}} \n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"$parent.resetFaith()\">reset</button>\n" +
    "        </div>\n" +
    "        Sermons\n" +
    "    </h4>\n" +
    "    <div ng-repeat=\"(key,sermon) in $parent.character.sermons\"> \n" +
    "        <div sermon=\"sermon\" on-save=\"$parent.$parent.onEdited(name, sermon)\"></div>\n" +
    "    </div>\n" +
    "    <hr>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-10\">\n" +
    "            <select class=\"form-control\" ng-model=\"$parent.newSermon\" \n" +
    "                ng-options=\"sermon as sermon.name for sermon in $parent.sermonOpts\">\n" +
    "                <option value=\"\">Add Sermon</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-2\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" \n" +
    "                ng-disabled=\"!$parent.newSermon\" ng-click=\"$parent.add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('character/sidebag.html',
    "<div class=\"sidebag\">\n" +
    "    <h4>Side Bag</h4>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Bandages</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.bandages\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/bandages.png\"> -->\n" +
    "        <span class=\"sprite sprite-bandages\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Whiskey</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.whiskey\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/whiskey.png\"> -->\n" +
    "        <span class=\"sprite sprite-whiskey\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Tonic</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.tonic\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/tonic.png\"> -->\n" +
    "        <span class=\"sprite sprite-tonic\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Herbs</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.herbs\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/herb.png\"> -->\n" +
    "        <span class=\"sprite sprite-herb\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Dynamite</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.dynamite\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/dynamite.png\"> -->\n" +
    "        <span class=\"sprite sprite-dynamite\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Flash</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.flash\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/flash.png\"> -->\n" +
    "        <span class=\"sprite sprite-flash\"></span>\n" +
    "    </div>    \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Swamp Fungus</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.fungus\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/fungus.png\"> -->\n" +
    "        <span class=\"sprite sprite-fungus\"></span>\n" +
    "    </div>    \n" +
    "\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Spice</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.spices\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/spice.png\"> -->\n" +
    "        <span class=\"sprite sprite-spice\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Potion</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.potions\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/potion.png\"> -->\n" +
    "        <span class=\"sprite sprite-potion\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Hatchet</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.hatchets\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/hatchet.png\"> -->\n" +
    "        <span class=\"sprite sprite-hatchet\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Lantern Oil</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.lanternOil\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/oil.png\"> -->\n" +
    "        <span class=\"sprite sprite-oil\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Exotic Herbs</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.exoticHerbs\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/exoticHerbs.png\"> -->\n" +
    "        <span class=\"sprite sprite-exoticHerbs\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Tequila</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.tequila\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/tequila.png\"> -->\n" +
    "        <span class=\"sprite sprite-tequila\"></span>\n" +
    "    </div> \n" +
    "    <div class=\"stat\">\n" +
    "        <!-- <label>Fine Cigar</label> -->\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" \n" +
    "            ng-model=\"ctrl.character.sidebag.cigars\"\n" +
    "            maximum=\"{{ctrl.getAvailableSidebagCapacity()}}\"></div>\n" +
    "        <!-- <img src=\"assets/cigar.png\"> -->\n" +
    "        <span class=\"sprite sprite-cigar\"></span>\n" +
    "    </div> \n" +
    "\n" +
    "\n" +
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
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Agility\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Cunning</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Cunning\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Spirit</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Spirit\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "    <span class=\"hidden-xs\" style=\"display:inline-block;width:2em;\"></span>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Strength</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Strength\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Lore</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Lore\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Luck</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.stats.Luck\" minimum=\"1\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"stat\">\n" +
    "        <label>Initiative</label>\n" +
    "        <div editable-stat-value on-save=\"ctrl.save()\" ng-model=\"ctrl.character.init\" minimum=\"1\"></div>\n" +
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
    "        <div class=\"list-group-item\" ng-if=\"!user\"><em>Login to select from your available characters</em></div>\n" +
    "        <div ng-repeat=\"(id, obj) in ctrl.chars\" class=\"list-group-item\">\n" +
    "            <div class=\" pull-right\">\n" +
    "                <a href=\"#/{{id|encode}}\" class=\"btn btn-sm btn-default\">Version 1</a>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-danger\"\n" +
    "                    ng-click=\"ctrl.removeCharacter(id)\">\n" +
    "                    <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <a href=\"v2.html#/{{id|encode}}\">\n" +
    "                {{obj.name}} \n" +
    "                <small ng-if=\"obj.className\"><strong>[{{obj.className}}]</strong></small>\n" +
    "            </a>\n" +
    "            \n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"f-container\">\n" +
    "        <div class=\"f-cell-2x\">\n" +
    "            <select class=\"form-control\" \n" +
    "                ng-model=\"ctrl.newCharClass\" \n" +
    "                ng-options=\"item.id as item.name for item in ctrl.classOptions\">\n" +
    "                <option value=\"\">Create a New Character</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-click=\"ctrl.createCharacter()\">Create</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('keypad.html',
    "<div class=\"modal-content keypad\">\n" +
    "  \n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <h5>Current: {{value}} <br><small>(min: {{minimum}}, max: {{maximum}})</small></h5>\n" +
    "\n" +
    "        <div class=\"f-container f-justify-between f-wrap\">\n" +
    "\n" +
    "            <div class=\"f-cell f-cell-75p\">\n" +
    "        \n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-100)\" ng-disable=\"value==minimum\">-100</button>\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-50)\" ng-disable=\"value==minimum\">-50</button>\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-25)\" ng-disable=\"value==minimum\">-25</button>\n" +
    "                <br>\n" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-10)\" ng-disable=\"value==minimum\">-10</button>\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-5)\" ng-disable=\"value==minimum\">-5</button>\n" +
    "                <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-1)\" ng-disable=\"value==minimum\">-1</button>\n" +
    "                <br>\n" +
    "\n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(1)\">+1</button>\n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(5)\">+5</button>\n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(10)\">+10</button>\n" +
    "                <br>\n" +
    "                \n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(25)\">+25</button>\n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(50)\">+50</button>\n" +
    "                <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(100)\">+100</button>\n" +
    "                <br>\n" +
    "                <br>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"f-cell f-cell-25p\">\n" +
    "                <small><strong>applied:</strong><br>{{changes}}</small>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-50)\" ng-disable=\"value==minimum\">-50</button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-10)\" ng-disable=\"value==minimum\">-10</button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-5)\" ng-disable=\"value==minimum\">-5</button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"change(-1)\" ng-disable=\"value==minimum\">-1</button>\n" +
    "            <br>\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(1)\">+1</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(2)\">+2</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(3)\">+3</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(4)\">+4</button>\n" +
    "            <br>\n" +
    "            \n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(5)\">+5</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(10)\">+10</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(15)\">+15</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(20)\">+20</button>\n" +
    "            <br>\n" +
    "            \n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(25)\">+25</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(30)\">+30</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(50)\">+50</button>\n" +
    "            <button type=\"button\" class=\"btn btn-success\" ng-click=\"change(100)\">+100</button>\n" +
    "            <br><br>\n" +
    "        -->\n" +
    "\n" +
    "        <div class=\"manual-entry\">\n" +
    "            <div class=\"input-group\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <a class=\"btn btn-danger\" ng-click=\"change(-1*manualAdj)\" ng-disabled=\"isNaN(manualAdj)\">-</a>\n" +
    "                </span>\n" +
    "                <input type=\"number\" class=\"form-control\" ng-model=\"manualAdj\" placeholder=\"Adjust by ...\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <a class=\"btn btn-success\" ng-click=\"change(manualAdj)\" ng-disabled=\"isNaN(manualAdj)\">+</a>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
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


  $templateCache.put('login.html',
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <form class=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"email\">Email</label>\n" +
    "                <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"Email address\" \n" +
    "                    class=\"form-control\" ng-model=\"email\"\n" +
    "                    ng-keyup=\"onKeyUp($event, $event.keyCode)\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"password\">Password</label>\n" +
    "                <input type=\"password\" id=\"password\" name=\"password\" \n" +
    "                    placeholder=\"Password\" class=\"form-control\" ng-model=\"password\"\n" +
    "                    ng-keyup=\"onKeyUp($event, $event.keyCode)\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"errorMessage\" class=\"text-danger\">{{errorMessage}}</div>\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n" +
    "            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"login()\">Login</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('v2/abilities/abilities.html',
    "<div class=\"abilities\">\n" +
    "    <br>\n" +
    "    \n" +
    "    <!-- list abilities -->\n" +
    "    <div ng-repeat=\"(id, ability) in character.abilities\" \n" +
    "        ability=\"ability\" on-save=\"onEdited(id, updated)\"></div>\n" +
    "\n" +
    "    <br>\n" +
    "    \n" +
    "    <!-- add new -->\n" +
    "    <form class=\"form\">\n" +
    "        <label>Add Ability</label>\n" +
    "\n" +
    "        <div class=\"f-container f-justify-between f-align-center\">\n" +
    "            <div class=\"f-cell-2x\">\n" +
    "                <select class=\"form-control\" ng-model=\"newAbility\" \n" +
    "                    ng-options=\"item as item.name disable when item.disabled for item in options\">\n" +
    "                    <option value=\"\">Select New Ability</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!newAbility\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <label>Add Custom Ability</label>\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"customAbility.name\">\n" +
    "        <textarea rows=\"2\" class=\"form-control\" placeholder=\"Description\" ng-model=\"customAbility.desc\"></textarea>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!customAbility.name\" ng-click=\"addCustom()\">Add</button>\n" +
    "\n" +
    "    </form>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('v2/abilities/ability.html',
    "<div class=\"ability\">\n" +
    "  <div ng-if=\"!ctrl.displayEditor\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "          <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "        </button>     \n" +
    "      </div>\n" +
    "      <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "        type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "        <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "      </button>&nbsp;&nbsp;&nbsp;\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>\n" +
    "  </div>\n" +
    "  <form class=\"form\" ng-if=\"ctrl.displayEditor\">\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"ctrl.name\" placeholder=\"name\">\n" +
    "    <textarea rows=\"3\" class=\"form-control\" ng-model=\"ctrl.desc\" placeholder=\"value\"></textarea>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.save()\">\n" +
    "      <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.cancel()\">\n" +
    "      <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "    </button>\n" +
    "  </form>\n" +
    "</div>"
  );


  $templateCache.put('v2/character.html',
    "<div class=\"page f-container f-column f-justify-between\">\n" +
    "\n" +
    "\n" +
    "    <div class=\"char__header\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm pull-right\" onClick=\"$(this).closest('.char__header').toggleClass('expanded')\">\n" +
    "            <span class=\"glyphicon glyphicon-option-horizontal\"></span>\n" +
    "        </button>\n" +
    "        <div class=\"char__name\">\n" +
    "            <label>Name: </label> {{$ctrl.character.name}}\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"editable-input\">\n" +
    "            <strong>Class: </strong> {{$ctrl.charClass}}\n" +
    "            <!-- <select class=\"form-control\" ng-model=\"$ctrl.character.class\" ng-change=\"$ctrl.save()\" \n" +
    "                ng-options=\"item.id as item.name for item in $ctrl.classes\">\n" +
    "                <option value=\"\">Select Class</option>\n" +
    "            </select> -->\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- <div editable-input label=\"Class\" ng-model=\"$ctrl.character.class\" on-save=\"$ctrl.save()\"></div> -->\n" +
    "        <div editable-input label=\"Keys\" ng-model=\"$ctrl.character.keywords\" on-save=\"$ctrl.save()\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Char -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='char'\">\n" +
    "        <div ng-include=\"'src/v2/panel-char.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Abilities -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='abil'\">\n" +
    "        <div abilities character=\"$ctrl.character\" on-save=\"$ctrl.save()\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Sermons -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='sermons'\">\n" +
    "        <div sermons character=\"$ctrl.character\" on-save=\"$ctrl.save()\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Items and Clothing -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='items'\">\n" +
    "        <div class=\"items-panel\">\n" +
    "            <div items character=\"$ctrl.character\" on-save=\"$ctrl.save()\"></div>\n" +
    "            <div clothing-2 character=\"$ctrl.character\" on-save=\"$ctrl.save()\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Sidebag -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='side'\">\n" +
    "        <sidebag sidebag=\"$ctrl.character.sidebag\" on-save=\"$ctrl.save()\"></sidebag>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Injuries and Mutations -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='inj'\">\n" +
    "        <div mutations character=\"$ctrl.character\" on-save=\"$ctrl.save()\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Miscellaneous -->\n" +
    "    <div class=\"char__panel\" ng-if=\"$ctrl.panel==='misc'\">\n" +
    "        <div class=\"notes\">\n" +
    "            <h4>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"$ctrl.save()\">Save</button>\n" +
    "                Notes\n" +
    "            </h4>\n" +
    "            <textarea name=\"notes\" rows=\"10\" placeholder=\"Enter any notes about this character\" class=\"form-control\"\n" +
    "                ng-model=\"$ctrl.character.notes\"></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- message display -->\n" +
    "    <div class=\"message-display\" ng-if=\"$ctrl.displayOpts.message\">\n" +
    "        <span class=\"glyphicon glyphicon-ok\"></span> {{$ctrl.displayOpts.message}}\n" +
    "    </div>\n" +
    "    <div class=\"message-display is-error\" ng-if=\"$ctrl.displayOpts.error\">\n" +
    "        <span class=\"glyphicon glyphicon-exclamation-sign\"></span> {{$ctrl.displayOpts.error}}\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- footer buttons -->\n" +
    "    <div ng-include=\"'src/v2/footer.html'\"></div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('v2/clothing/clothing-item.html',
    "<div class=\"clothing-item\">\n" +
    "    <div class=\"pull-right\">\n" +
    "        <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "                <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "                <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "            </button>     \n" +
    "        </div>\n" +
    "        <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "            type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "           <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "        </button>&nbsp;&nbsp;&nbsp;\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "           <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <h5>\n" +
    "       {{clothingItem.name}} \n" +
    "       <small>{{clothingItem.type}}</small> \n" +
    "       <small ng-if=\"clothingItem.source\"><em>({{clothingItem.source}})</em></small>\n" +
    "    </h5>\n" +
    "    <p>\n" +
    "        <small>\n" +
    "            {{clothingItem.desc}}\n" +
    "            <div ng-if=\"clothingItem.keywords\">{{clothingItem.keywords}}</div>\n" +
    "        </small>\n" +
    "    </p>\n" +
    "    <div class=\"f-container f-justify-between f-align-center\">\n" +
    "        <div>\n" +
    "            <span class=\"sprite sprite-item_weight\" ng-class=\"{disabled:!clothingItem.weight}\"></span> \n" +
    "            {{clothingItem.weight}}\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <span class=\"sprite sprite-item_darkstone\" ng-class=\"{disabled:!clothingItem.darkstone}\"></span> \n" +
    "            {{clothingItem.darkstone}}\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <span class=\"sprite sprite-item_hands\" ng-class=\"{disabled:!clothingItem.hands}\"></span> \n" +
    "            {{clothingItem.hands}}\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <span class=\"sprite sprite-item_slots\" ng-class=\"{disabled:!clothingItem.slots}\"></span> \n" +
    "            {{clothingItem.slots}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('v2/clothing/clothing.html',
    "<div class=\"clothing\">\n" +
    "   \n" +
    "    <br>\n" +
    "    <h4>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"add()\">Add</button>\n" +
    "        \n" +
    "        Clothing\n" +
    "        <small>\n" +
    "            <span class=\"sprite sprite-item_weight\"></span> {{itemWeight}} &nbsp;\n" +
    "            <span class=\"sprite sprite-item_darkstone\"></span> {{itemDarkstone}}\n" +
    "        </small>\n" +
    "    </h4>\n" +
    "    <hr>\n" +
    "    <div ng-repeat=\"(type,item) in character.clothing\"> \n" +
    "        <clothing-item-2 clothing-item=\"character.clothing[type]\" on-save=\"onEdited(item, type)\"></clothing-item-2>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('v2/clothing/editor.html',
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\" style=\"background: #ebf7d0\">\n" +
    "        <h5 class=\"modal-title\">Edit Clothing</h5>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "<!-- \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"What is the clothing's name?\">\n" +
    "        </div><br>\n" +
    "        \n" +
    "        <textarea rows=\"2\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Describe the clothing\"></textarea>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-8\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Source</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-4\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">$</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Slot</span>\n" +
    "            <input disabled type=\"text\" class=\"form-control\" ng-if=\"!newItem\" value=\"{{item.type}}\">\n" +
    "            <select type=\"text\" class=\"form-control\" ng-if=\"newItem\" \n" +
    "                ng-model=\"item.type\" required ng-options=\"type for type in types\">\n" +
    "                <option value=\"\">Select Slot</option>\n" +
    "            </select>\n" +
    "        </div><br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>   -->      \n" +
    "\n" +
    "\n" +
    "        <ul class=\"nav nav-tabs\" role=\"tablist\">\n" +
    "            <li role=\"presentation\" class=\"active\">\n" +
    "                <a href=\"#first\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">Basic</a>\n" +
    "            </li>\n" +
    "            <li role=\"presentation\">\n" +
    "                <a href=\"#second\" aria-controls=\"second\" role=\"tab\" data-toggle=\"tab\">Advanced</a>\n" +
    "            </li>\n" +
    "            <li role=\"presentation\">\n" +
    "                <a href=\"#third\" aria-controls=\"third\" role=\"tab\" data-toggle=\"tab\">Stats</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <!-- Tab panes -->\n" +
    "        <div class=\"tab-content\">\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane active\" id=\"first\">\n" +
    "                <br>\n" +
    "                <label>Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "                <br>\n" +
    "                <label>Description</label>\n" +
    "                <textarea rows=\"3\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Provide a description\"></textarea>\n" +
    "                <br>\n" +
    "                <label>Slot</label>\n" +
    "                <input disabled type=\"text\" class=\"form-control\" ng-if=\"!newItem\" value=\"{{item.type}}\">\n" +
    "                <select type=\"text\" class=\"form-control\" ng-if=\"newItem\" \n" +
    "                    ng-model=\"item.type\" required ng-options=\"type for type in types\">\n" +
    "                    <option value=\"\">Select Slot</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane\" id=\"second\">\n" +
    "                <br>\n" +
    "                <label>Source</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "                <br>\n" +
    "                <label>Use</label>\n" +
    "                <select class=\"form-control\" ng-model=\"item.usage\">\n" +
    "                    <option value=\"\">N/A</option>\n" +
    "                    <option value=\"Turn\">Turn</option>\n" +
    "                    <option value=\"Fight\">Fight</option>\n" +
    "                    <option value=\"Adventure\">Adventure</option>\n" +
    "                </select>\n" +
    "                <br>\n" +
    "                <label>Keywords</label>    \n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.keywords\" placeholder=\"Keywords\">\n" +
    "            </div>\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane\" id=\"third\">\n" +
    "                <br>\n" +
    "                <label>Cost</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">$</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "                </div>\n" +
    "                <hr>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-6\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-6\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>   \n" +
    "                <br>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name||!item.type\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('v2/footer.html',
    "<div class=\"char__footer\">\n" +
    "    <div class=\"f-container f-justify-around\">\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='char'}\"\n" +
    "            ng-click=\"$ctrl.panel='char'\">\n" +
    "            <span class=\"glyphicon glyphicon-user\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='abil'}\"\n" +
    "            ng-click=\"$ctrl.panel='abil'\">\n" +
    "            <span class=\"glyphicon glyphicon-flash\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-if=\"$ctrl.canCastSermons()\"\n" +
    "            ng-class=\"{active:$ctrl.panel==='sermons'}\"\n" +
    "            ng-click=\"$ctrl.panel='sermons'\">\n" +
    "            <span class=\"glyphicon glyphicon-book\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='items'}\"\n" +
    "            ng-click=\"$ctrl.panel='items'\">\n" +
    "            <span class=\"glyphicon glyphicon-gift\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='side'}\"\n" +
    "            ng-click=\"$ctrl.panel='side'\">\n" +
    "            <span class=\"glyphicon glyphicon-briefcase\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='inj'}\"\n" +
    "            ng-click=\"$ctrl.panel='inj'\">\n" +
    "            <span class=\"glyphicon glyphicon-alert\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"f-cell f-equal\" \n" +
    "            ng-class=\"{active:$ctrl.panel==='misc'}\"\n" +
    "            ng-click=\"$ctrl.panel='misc'\">\n" +
    "            <span class=\"glyphicon glyphicon-comment\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('v2/items/editor.html',
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\" style=\"background:#d0f5f7\">\n" +
    "        <h5 class=\"modal-title\">Edit Item</h5>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <!-- \n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        \n" +
    "        <textarea rows=\"2\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Provide a description\"></textarea>\n" +
    "        <br>\n" +
    "\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6 col-sm-8\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-map-marker\"></span></span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6 col-sm-4\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">$</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" min=\"0\" max=\"2\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                </div><br>\n" +
    "            \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                    <input type=\"number\" max=\"2\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>   \n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6 col-sm-4\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Use</span>\n" +
    "                    <select class=\"form-control\" ng-model=\"item.usage\">\n" +
    "                        <option value=\"\">N/A</option>\n" +
    "                        <option value=\"Turn\">Turn</option>\n" +
    "                        <option value=\"Fight\">Fight</option>\n" +
    "                        <option value=\"Adventure\">Adventure</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6 col-sm-8\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-tag\"></span></span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.keywords\" placeholder=\"Keywords\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br> \n" +
    "        -->\n" +
    "\n" +
    "\n" +
    "        <ul class=\"nav nav-tabs\" role=\"tablist\">\n" +
    "            <li role=\"presentation\" class=\"active\">\n" +
    "                <a href=\"#first\" aria-controls=\"first\" role=\"tab\" data-toggle=\"tab\">Basic</a>\n" +
    "            </li>\n" +
    "            <li role=\"presentation\">\n" +
    "                <a href=\"#second\" aria-controls=\"second\" role=\"tab\" data-toggle=\"tab\">Adv</a>\n" +
    "            </li>\n" +
    "            <li role=\"presentation\">\n" +
    "                <a href=\"#third\" aria-controls=\"third\" role=\"tab\" data-toggle=\"tab\">Stats</a>\n" +
    "            </li>\n" +
    "            <!-- <li role=\"presentation\">\n" +
    "                <a href=\"#bonuses\" aria-controls=\"bonuses\" role=\"tab\" data-toggle=\"tab\">Bonuses</a>\n" +
    "            </li> -->\n" +
    "        </ul>\n" +
    "\n" +
    "        <!-- Tab panes -->\n" +
    "        <div class=\"tab-content\">\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane active\" id=\"first\">\n" +
    "                <br>\n" +
    "                <label>Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Name\">\n" +
    "                <br>\n" +
    "                <label>Description</label>\n" +
    "                <textarea rows=\"4\" class=\"form-control\" ng-model=\"item.description\" placeholder=\"Provide a description\"></textarea>\n" +
    "            </div>\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane\" id=\"second\">\n" +
    "                <br>\n" +
    "                <label>Source</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.source\" placeholder=\"Source (eg, 'General Store' or 'Targa Plateau')\">\n" +
    "                <br>\n" +
    "                <label>Use</label>\n" +
    "                <select class=\"form-control\" ng-model=\"item.usage\">\n" +
    "                    <option value=\"\">N/A</option>\n" +
    "                    <option value=\"Turn\">Turn</option>\n" +
    "                    <option value=\"Fight\">Fight</option>\n" +
    "                    <option value=\"Adventure\">Adventure</option>\n" +
    "                </select>\n" +
    "                <br>\n" +
    "                <label>Keywords</label>    \n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.keywords\" placeholder=\"Keywords\">\n" +
    "            </div>\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane\" id=\"third\">\n" +
    "                <br>\n" +
    "                <label>Cost</label>\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">$</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.cost\" placeholder=\"Optionally, specify the cost\">\n" +
    "                </div>\n" +
    "                <hr>\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-xs-6\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_weight.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" ng-model=\"item.weight\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_darkstone.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" ng-model=\"item.darkstone\" class=\"form-control\">\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-6\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_hands.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" ng-model=\"item.hands\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                        <br>\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\"><img src=\"assets/item_slots.png\" height=\"16\"></span>\n" +
    "                            <input type=\"number\" min=\"0\" ng-model=\"item.slots\" class=\"form-control\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>   \n" +
    "                <br>\n" +
    "            </div>\n" +
    "            <!-- <div role=\"tabpanel\" class=\"tab-pane\" id=\"bonuses\">\n" +
    "                <div class=\"f-container f-justify-between f-align-center f-row f-wrap\">\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Ag</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.agility\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Cu</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.cunning\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Sp</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.spirit\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">St</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.strength\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Lo</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.lore\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Lu</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.luck\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">He</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.health\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Sa</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.sanity\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Co</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.combat\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Me</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.melee\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Rg</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.ranged\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">In</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.init\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Mv</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.movement\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Df</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.defense\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"f-cell f-cell-33p\">\n" +
    "                        <div class=\"input-group\">\n" +
    "                            <span class=\"input-group-addon\">Wp</span>\n" +
    "                            <input class=\"form-control\" type=\"number\" min=\"-20\" max=\"20\" ng-model=\"item.bonuses.willpower\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div> -->\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name\" ng-click=\"ok()\">Apply</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('v2/items/item.html',
    "<div class=\"item usage-{{item.usage|lowercase}}\">\n" +
    "    <div class=\"pull-right\">\n" +
    "        <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "                <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "                <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "            </button>     \n" +
    "        </div>\n" +
    "        <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "            type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "            <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "        </button>&nbsp;&nbsp;&nbsp;\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "            <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <h5>\n" +
    "        <!-- <input type=\"checkbox\" ng-model=\"item.equipped\"> --> \n" +
    "        {{name}} \n" +
    "        <small>\n" +
    "            <em>\n" +
    "                <span ng-if=\"item.source\">{{item.source}}</span>\n" +
    "                &nbsp;\n" +
    "                <span ng-if=\"item.cost\">${{item.cost}}</span>\n" +
    "            </em>\n" +
    "        </small>\n" +
    "    </h5>\n" +
    "    \n" +
    "    <div ng-if=\"item.description\"><small>{{item.description}}</small></div>\n" +
    "    <div ng-if=\"item.keywords\"><small><em>{{item.keywords}}</em></small></div>\n" +
    "    \n" +
    "    <span ng-if=\"item.usage\">\n" +
    "        <input type=\"checkbox\"> <small>(per {{item.usage}})</small>\n" +
    "    </span>\n" +
    "    \n" +
    "    <div class=\"f-container f-justify-between f-align-center\">\n" +
    "        <div><span class=\"sprite sprite-item_weight\" ng-class=\"{disabled:!item.weight}\"></span> {{item.weight}}</div>\n" +
    "        <div><span class=\"sprite sprite-item_darkstone\" ng-class=\"{disabled:!item.darkstone}\"></span> {{item.darkstone}}</div>\n" +
    "        <div><span class=\"sprite sprite-item_hands\" ng-class=\"{disabled:!item.hands}\"></span> {{item.hands}}</div>\n" +
    "        <div><span class=\"sprite sprite-item_slots\" ng-class=\"{disabled:!item.slots}\"></span> {{item.slots}}</div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('v2/items/items.html',
    "<div class=\"items\">\n" +
    "    \n" +
    "    <br>\n" +
    "    <h4>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-click=\"add()\">Add</button>\n" +
    "    \n" +
    "        Items \n" +
    "        <small>\n" +
    "            <span class=\"sprite sprite-item_weight\"></span> {{itemWeight}} &nbsp;\n" +
    "            <span class=\"sprite sprite-item_darkstone\"></span> {{itemDarkstone}}\n" +
    "        </small>\n" +
    "    </h4>\n" +
    "    <hr>\n" +
    "\n" +
    "    <div ng-repeat=\"(name, item) in character.items\" item=\"item\" name=\"{{name}}\" on-save=\"onEdited(name, item)\"></div>\n" +
    "\n" +
    "    <hr>\n" +
    "\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('v2/mutations/mutation.html',
    "<div class=\"mutation\">\n" +
    "  \n" +
    "  <div ng-if=\"!ctrl.displayEditor\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "          <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "          <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "        </button>     \n" +
    "      </div>\n" +
    "      <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "        type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "        <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "      </button>&nbsp;&nbsp;&nbsp;\n" +
    "      <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "        <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h5>{{ctrl.name}}</h5> <small>{{ctrl.desc}}</small>\n" +
    "  </div>\n" +
    "  \n" +
    "  <form ng-if=\"ctrl.displayEditor\">\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"ctrl.name\" placeholder=\"name\">\n" +
    "    <textarea rows=\"3\" class=\"form-control\" ng-model=\"ctrl.desc\" placeholder=\"value\"></textarea>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.save()\">\n" +
    "      <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.cancel()\">\n" +
    "      <span class=\"glyphicon glyphicon-remove\"></span>\n" +
    "    </button>\n" +
    "  </form>\n" +
    "  \n" +
    "</div>"
  );


  $templateCache.put('v2/mutations/mutations-and-injuries.html',
    "<div class=\"mutations\">\n" +
    "    <br>\n" +
    "    \n" +
    "    <!-- list all -->\n" +
    "    <div ng-repeat=\"(name, desc) in character.mutations\" \n" +
    "        mutation name=\"{{name}}\" desc=\"{{desc}}\" on-save=\"onEdited(name, newName, newDesc)\"></div>\n" +
    "    \n" +
    "    <br>\n" +
    "    \n" +
    "    <!-- add new -->\n" +
    "    <label>Add Mutation, Injury, or Madness</label>\n" +
    "    <div class=\"f-container f-justify-between f-align-center\">\n" +
    "        <div class=\"f-cell-2x\">\n" +
    "            <select class=\"form-control\" ng-model=\"newMutation\" \n" +
    "                ng-options=\"item as item.name group by item.group disable when item.disabled for item in mimOpts\">\n" +
    "                <option value=\"\">Select One</option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!newMutation\" ng-click=\"add()\">Add</button>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "\n" +
    "    <form class=\"form\">\n" +
    "        <label>Add Custom Mutation, Injury, or Madness</label>\n" +
    "        <input type=\"text\" class=\"form-control\" placeholder=\"Name\" ng-model=\"customMutation.name\">\n" +
    "        <textarea rows=\"3\" class=\"form-control\" placeholder=\"Description\" ng-model=\"customMutation.desc\"></textarea>\n" +
    "        <button type=\"button\" class=\"btn btn-success pull-right\" ng-disabled=\"!customMutation.name\" ng-click=\"addCustom()\">Add</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('v2/panel-char.html',
    "<div>\n" +
    "    <div class=\"f-container f-justify-between\">\n" +
    "        <!-- avatar -->\n" +
    "        <div class=\"f-cell\">\n" +
    "            <div class=\"avatar\" img-selector ng-model=\"$ctrl.character.avatar\" on-save=\"$ctrl.save()\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"f-cell attributes\">\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Agility</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Agility\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Cunning</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Cunning\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Spirit</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Spirit\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Strength</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Strength\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Lore</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Lore\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"f-cell-33p\">\n" +
    "                <div class=\"stat stat-label-top\">\n" +
    "                    <label>Luck</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.stats.Luck\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"f-container f-justify-between\" style=\"margin-top: 1em;\">\n" +
    "\n" +
    "        <div class=\"f-cell f-cell-75p f-container f-wrap\">\n" +
    "\n" +
    "            <!-- COMBAT SECTION -->\n" +
    "            <div class=\"combat f-container f-justify-around f-align-center\">\n" +
    "                <span class=\"stat f-cell\">\n" +
    "                    <label>Combat</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.combat\"></div>\n" +
    "                </span>\n" +
    "\n" +
    "                <span class=\"stat stat--with-plus f-cell\">\n" +
    "                    <label>Melee</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.melee\"></div>\n" +
    "                </span>\n" +
    "                <span class=\"stat stat--with-plus f-cell\">\n" +
    "                    <label>Ranged</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.ranged\"></div>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            \n" +
    "            <!-- HEALTH SECTION -->\n" +
    "            <div class=\"health f-container f-justify-around f-align-center\">\n" +
    "                \n" +
    "                <div class=\"f-cell has-stat-with-max\">\n" +
    "                    <div class=\"stat f-cell\">\n" +
    "                        <div editable-stat-value on-save=\"$ctrl.save()\" \n" +
    "                            ng-model=\"$ctrl.character.health.wounds\"></div>\n" +
    "                        <!-- <img src=\"assets/wound.png\">    --> \n" +
    "                        <span class=\"sprite sprite-wound\"></span>\n" +
    "\n" +
    "                        <div class=\"stat\">\n" +
    "                            <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.health.max\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"f-cell stat stat--with-plus f-cell\">\n" +
    "                    <label>Defense</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.defense\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"f-cell stat stat--with-plus f-cell\">\n" +
    "                    <label>Armor</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.armor\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "                \n" +
    "               \n" +
    "            <!-- SANITY SECTION --> \n" +
    "            <div class=\"sanity f-container f-justify-around f-align-center\">\n" +
    "                \n" +
    "                <div class=\"f-cell has-stat-with-max\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <!-- <label>Loss</label> -->\n" +
    "                        <div editable-stat-value on-save=\"$ctrl.save()\" \n" +
    "                            ng-model=\"$ctrl.character.sanity.loss\"></div>\n" +
    "                        <!-- <img src=\"assets/sanity.png\"> -->\n" +
    "                        <span class=\"sprite sprite-sanity\"></span>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.sanity.max\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"f-cell stat stat--with-plus\">\n" +
    "                    <label>Willpower</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.willpower\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"f-cell stat stat--with-plus\">\n" +
    "                    <label>Sp Armor</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.spiritArmor\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "                \n" +
    "            <div class=\"other f-container f-justify-around f-align-center\">\n" +
    "\n" +
    "                <div class=\"faith f-cell\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Faith</label>\n" +
    "                        <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.faith\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"grit f-cell has-stat-with-max\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <label>Grit</label>\n" +
    "                        <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.grit.current\"></div>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.grit.max\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"corruption f-cell has-stat-with-max\">\n" +
    "                    <div class=\"stat\">\n" +
    "                        <div editable-stat-value on-save=\"$ctrl.save()\" \n" +
    "                            ng-model=\"$ctrl.character.corruption.current\"></div>\n" +
    "                        <span class=\"sprite sprite-corruption\"></span>\n" +
    "                        <div class=\"stat\">\n" +
    "                            <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.corruption.max\"></div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>  \n" +
    "            \n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"general f-cell f-cell-25p f-container\">\n" +
    "\n" +
    "            <div class=\"level f-cell\">\n" +
    "                <div class=\"stat\">\n" +
    "                    <label>Level</label>\n" +
    "                    <div class=\"value\" editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.level\" minimum=\"1\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"xp f-cell\">\n" +
    "                <div class=\"stat\">\n" +
    "                    <div class=\"value--sm\" editable-stat-value on-save=\"$ctrl.onXP()\" ng-model=\"$ctrl.character.xp\"></div>\n" +
    "                    <span class=\"sprite sprite-xp\"></span>\n" +
    "                    <div style=\"font-size:0.625em\"><span class=\"glyphicon glyphicon-arrow-up\"></span> at {{$ctrl.xpLevels[$ctrl.character.level]}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"wealth f-cell\">\n" +
    "                <div class=\"stat\">\n" +
    "                    <div class=\"value--sm\" editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.wealth\"></div>\n" +
    "                    <!-- <img src=\"assets/wealth.png\"> -->\n" +
    "                    <span class=\"sprite sprite-wealth\"></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"darkstone f-cell\">\n" +
    "                <div class=\"stat\">\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.darkstone\"></div>\n" +
    "                    <img src=\"assets/darkstone.png\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"init f-cell\">\n" +
    "                <div class=\"stat\">\n" +
    "                    <label>Init</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.init\" minimum=\"1\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"movement f-cell\">\n" +
    "                <div class=\"stat stat--prepend-plus\">\n" +
    "                    <label>Move</label>\n" +
    "                    <div editable-stat-value on-save=\"$ctrl.save()\" ng-model=\"$ctrl.character.movement\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <br>\n" +
    "    <center><small>Shadows of Brimstone is a registered trademark of Flying Frog Productions.</small></center>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('v2/sermons/editor.html',
    "<div class=\"modal-content\">\n" +
    "  \n" +
    "    <div class=\"modal-body\">\n" +
    "\n" +
    "        <!-- <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Name</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Sermon Name\">\n" +
    "        </div><br>\n" +
    "\n" +
    "        <textarea rows=\"2\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Provide a description\"></textarea>\n" +
    "        <br>\n" +
    "\n" +
    "        <select class=\"form-control\" ng-model=\"item.type\">\n" +
    "            <option value=\"\">Select Type</option>\n" +
    "            <option value=\"Blessing\">Blessing</option>\n" +
    "            <option value=\"Judgement\">Judgement</option>\n" +
    "        </select>\n" +
    "        <br>\n" +
    "        \n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Cost</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.cost\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Check</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.check\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">XP</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.xp\" min=\"0\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-xs-6\">\n" +
    "                <div>Deadly? <input type=\"checkbox\" ng-model=\"item.deadly\" id=\"isDeadly\"> </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <br>\n" +
    "\n" +
    "        <div class=\"input-group\">\n" +
    "            <span class=\"input-group-addon\">Range</span>\n" +
    "            <input type=\"text\" class=\"form-control\" ng-model=\"item.range\" placeholder=\"e.g, 6\">\n" +
    "        </div> -->\n" +
    "\n" +
    "\n" +
    "        <ul class=\"nav nav-tabs\" role=\"tablist\">\n" +
    "            <li role=\"presentation\" class=\"active\">\n" +
    "                <a href=\"#first\" aria-controls=\"first\" role=\"tab\" data-toggle=\"tab\">Basic</a>\n" +
    "            </li>\n" +
    "            <li role=\"presentation\">\n" +
    "                <a href=\"#second\" aria-controls=\"second\" role=\"tab\" data-toggle=\"tab\">Adv</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <!-- Tab panes -->\n" +
    "        <div class=\"tab-content\">\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane active\" id=\"first\">\n" +
    "                <br>\n" +
    "\n" +
    "                <label>Name</label>\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"item.name\" placeholder=\"Sermon Name\">\n" +
    "                <br>\n" +
    "\n" +
    "                <label>Description</label>\n" +
    "                <textarea rows=\"2\" class=\"form-control\" ng-model=\"item.desc\" placeholder=\"Provide a description\"></textarea>\n" +
    "                <br>\n" +
    "\n" +
    "                <label>Type</label>\n" +
    "                <select class=\"form-control\" ng-model=\"item.type\">\n" +
    "                    <option value=\"\">Select Type</option>\n" +
    "                    <option value=\"Blessing\">Blessing</option>\n" +
    "                    <option value=\"Judgement\">Judgement</option>\n" +
    "                </select>\n" +
    "\n" +
    "            </div>\n" +
    "            <div role=\"tabpanel\" class=\"tab-pane\" id=\"second\">\n" +
    "                <br>\n" +
    "                \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Cost</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.cost\" min=\"0\">\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Check</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.check\" min=\"0\">\n" +
    "                </div>\n" +
    "                <br>\n" +
    "        \n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">XP</span>\n" +
    "                    <input type=\"number\" class=\"form-control\" ng-model=\"item.xp\" min=\"0\">\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <span class=\"input-group-addon\">Range</span>\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"item.range\" placeholder=\"e.g, 6\">\n" +
    "                </div>\n" +
    "                <br>\n" +
    "\n" +
    "                <label>Deadly? <input type=\"checkbox\" ng-model=\"item.deadly\" id=\"isDeadly\"> </label>\n" +
    "                <br>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        \n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!item.name||!item.type\" ng-click=\"ok()\">Save</button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('v2/sermons/sermon.html',
    "<div class=\"sermon\" ng-class=\"{disabled:!ctrl.isAvailable()}\">\n" +
    "    <h5>\n" +
    "        <span ng-if=\"sermon.deadly\">\n" +
    "            <span class=\"glyphicon glyphicon-exclamation-sign\" title=\"Dangerous!\"></span> \n" +
    "        </span>\n" +
    "        {{sermon.name}} \n" +
    "        <small>{{sermon.type}}</small>\n" +
    "    </h5>\n" +
    "    <p>\n" +
    "        <small>\n" +
    "            <div>\n" +
    "                <strong>[{{sermon.check}}+]</strong>&nbsp;&nbsp;&nbsp;\n" +
    "                <strong>Cost: </strong> {{sermon.cost}}&nbsp;&nbsp;&nbsp;\n" +
    "                <strong>XP: </strong> {{sermon.xp}}&nbsp;&nbsp;&nbsp;\n" +
    "            </div>\n" +
    "            <div><strong>Range: </strong> {{sermon.range}}</div>\n" +
    "            <div>{{sermon.desc}}</div>\n" +
    "       </small>\n" +
    "    </p>\n" +
    "    <div>\n" +
    "        <div class=\"pull-right\">\n" +
    "            <div class=\"btn-group\" ng-if=\"ctrl.confirmingDelete\">\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-success\" ng-click=\"ctrl.remove()\">\n" +
    "                  <span class=\"glyphicon glyphicon-ok\"></span>\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.confirmingDelete=false\">\n" +
    "                  <span class=\"glyphicon glyphicon-ban-circle\"></span>\n" +
    "                </button>     \n" +
    "              </div>\n" +
    "              <button ng-if=\"!ctrl.confirmingDelete\"\n" +
    "                type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"ctrl.confirmingDelete=true\">\n" +
    "                <span class=\"glyphicon glyphicon-trash\"></span>\n" +
    "            </button>&nbsp;&nbsp;&nbsp;\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"ctrl.edit()\">\n" +
    "                <span class=\"glyphicon glyphicon-pencil\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "        \n" +
    "        <!-- if not cast already and not empty or insufficient -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-info\" \n" +
    "            ng-if=\"ctrl.canCast()\" \n" +
    "            ng-click=\"ctrl.use()\">cast</button>\n" +
    "\n" +
    "        <!-- if cast but not empty -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-warning\" \n" +
    "            ng-if=\"ctrl.canSpendExtraFaith()\" \n" +
    "            ng-click=\"ctrl.spendExtraFaith()\">+faith</button>\n" +
    "\n" +
    "        <!-- if cast but no applied xp -->\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" \n" +
    "            ng-if=\"ctrl.canApplyXP()\" ng-click=\"ctrl.applyXP()\">+xp</button>\n" +
    "\n" +
    "        <!-- if empty or not cast and insufficient -->\n" +
    "        <span class=\"text-muted\" \n" +
    "            ng-if=\"ctrl.isInsufficient()\">\n" +
    "            <em>not enough faith</em>\n" +
    "        </span>\n" +
    "            \n" +
    "        \n" +
    "    </div>\n" +
    "        \n" +
    "</div>"
  );


  $templateCache.put('v2/sermons/sermons.html',
    "<div class=\"sermons\">\n" +
    "    <br>\n" +
    "    <div>\n" +
    "        <strong>Faith:</strong> {{character.availableFaith}} / {{character.faith}} \n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-default\" ng-click=\"resetFaith()\">reset</button>\n" +
    "\n" +
    "        &nbsp;&nbsp;&nbsp;\n" +
    "        <div class=\"pull-right f-container f-align-center\">\n" +
    "            <select class=\"form-control\" ng-model=\"newSermon\" \n" +
    "                ng-options=\"sermon as sermon.name for sermon in sermonOpts\">\n" +
    "                <option value=\"\">Add Sermon</option>\n" +
    "            </select>\n" +
    "            <button type=\"button\" class=\"btn btn-sm btn-success\" \n" +
    "                ng-disabled=\"!newSermon\" ng-click=\"add()\">Add</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <hr>\n" +
    "\n" +
    "    <div class=\"sermons-container\">\n" +
    "\n" +
    "        <div>\n" +
    "            <h5>\n" +
    "                Blessings\n" +
    "                <small ng-if=\"hasAbility('Missionary')\">Missionary: re-roll one die when casting blessings</small>\n" +
    "            </h5>\n" +
    "            <div ng-repeat=\"(name,sermon) in character.sermons\"> \n" +
    "                <div ng-if=\"'Blessing'===sermon.type\" \n" +
    "                    sermon=\"sermon\" \n" +
    "                    on-save=\"onEdited(name, sermon)\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <hr class=\"visible-xs-block\">\n" +
    "        \n" +
    "        <div>\n" +
    "            <h5>\n" +
    "                Judgements\n" +
    "                <small ng-if=\"hasAbility('Firebrand')\">Firebrand: re-roll one die when casting judgements</small>\n" +
    "            </h5>\n" +
    "            <div ng-repeat=\"(name,sermon) in character.sermons\"> \n" +
    "                <div ng-if=\"'Judgement'===sermon.type\" \n" +
    "                    sermon=\"sermon\" \n" +
    "                    on-save=\"onEdited(name, sermon)\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('v2/sidebag/sidebag.html',
    "<div class=\"sidebag\">\n" +
    "    \n" +
    "    <br>\n" +
    "    <div class=\"clearfix\">\n" +
    "        <div class=\"pull-right\">\n" +
    "            <div class=\"stat\">\n" +
    "                <label>Capacity</label>\n" +
    "                <div editable-stat-value on-save=\"$ctrl.save()\" \n" +
    "                    ng-model=\"$ctrl.sidebag.capacity\"></div>\n" +
    "            </div>  \n" +
    "        </div>\n" +
    "        <h4>Sidebag</h4>\n" +
    "    </div>\n" +
    "    <br>\n" +
    "    \n" +
    "    <div class=\"f-container f-justify-between f-wrap\">\n" +
    "    \n" +
    "        <div ng-repeat=\"option in $ctrl.options\" class=\"sidebag__option\">\n" +
    "            <label><span class=\"sprite sprite-{{option}}\"></span> {{option}}</label>\n" +
    "\n" +
    "            <!-- <div class=\"input-group\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" class=\"btn btn-danger\"\n" +
    "                        ng-click=\"$ctrl.decrease(option)\">&minus;</button>\n" +
    "                </span>\n" +
    "                <input type=\"number\" min=\"0\" class=\"form-control\" disabled ng-model=\"$ctrl.sidebag[option]\">\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                    <button type=\"button\" class=\"btn btn-success\"\n" +
    "                        ng-click=\"$ctrl.increase(option)\">&plus;</button>\n" +
    "                </span>\n" +
    "            </div> -->\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-default\"\n" +
    "                ng-click=\"$ctrl.decrease(option)\"\n" +
    "                ng-disabled=\"!$ctrl.sidebag[option]\">&minus;</button>\n" +
    "            <span class=\"option__display\">{{$ctrl.sidebag[option]}}</span>\n" +
    "            <button type=\"button\" class=\"btn btn-default\"\n" +
    "                ng-click=\"$ctrl.increase(option)\"\n" +
    "                ng-disabled=\"!$ctrl.max\">&plus;</button>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "  \n" +
    "</div>"
  );

}]);
