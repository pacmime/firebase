angular.module("dresden").run(["$templateCache", function($templateCache) {$templateCache.put("login.html","<div class=\"modal-content\">\n    <div class=\"modal-body\">\n\n        <form class=\"form\">\n            <div class=\"form-group\">\n                <label for=\"email\">Email</label>\n                <input type=\"email\" name=\"email\" placeholder=\"Email address\" class=\"form-control\" ng-model=\"email\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password</label>\n                <input type=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" ng-model=\"password\">\n            </div>\n\n            <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Cancel</button>\n            <button type=\"button\" class=\"btn btn-primary\" ng-click=\"login()\">Login</button>\n        </form>\n\n    </div>\n</div>");
$templateCache.put("char/char.component.html","<div class=\"c-character\">\n\n    <div class=\"c-card always-shown\">\n        <h4>{{$ctrl.character.name}}</h4>\n        <select class=\"form-control\" ng-model=\"$ctrl.character.template\" \n            ng-options=\"tmpl for tmpl in $ctrl.templates\"\n            ng-change=\"$ctrl.save()\">\n            <option value=\"\" disabled>Choose a template</option>\n        </select>\n    </div>\n\n    <div class=\"l-container\">\n\n        <div class=\"l-column has-gutter\">\n\n            <div class=\"c-aspects c-card is-shown\">\n\n                <h5>High Concept</h5>\n                <textarea rows=\"2\" class=\"form-control\" \n                    ng-model=\"$ctrl.character.aspects.highConcept\"\n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-change=\"$ctrl.save()\"></textarea>\n\n                <h5>Trouble</h5>\n                <textarea rows=\"2\" class=\"form-control\" \n                    ng-model=\"$ctrl.character.aspects.trouble\"\n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-change=\"$ctrl.save()\"></textarea>\n\n                <h5>Other Aspects</h5>\n                <textarea rows=\"2\" class=\"form-control\" \n                    ng-model=\"$ctrl.character.aspects.other\"\n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-change=\"$ctrl.save()\"></textarea>\n\n            </div>\n\n            <stress ng-model=\"$ctrl.character.stress\" on-change=\"$ctrl.save()\"></stress>\n\n            <consequences ng-model=\"$ctrl.character.consequences\" on-change=\"$ctrl.save()\"></consequences>\n\n            <div class=\"c-misc c-card is-shown\">\n                \n                <form class=\"form-flex\">\n                    <div class=\"form-group\">\n                        <label for=\"powerLevel\" class=\"control-label\">Power Level</label>\n                        <select id=\"powerLevel\" class=\"form-control\" \n                            ng-model=\"$ctrl.character.powerLevel\"\n                            ng-change=\"$ctrl.onPowerLevelChange()\">\n                            <option value=\"Feet in the Water\">Feet in the Water</option>\n                            <option value=\"Waist Deep\">Waist Deep</option>\n                            <option value=\"Other\">Other</option>\n                        </select>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"powerLevel\" class=\"control-label\">Skill Cap</label>\n                        {{$ctrl.character.skillCap}}\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"powerLevel\" class=\"control-label\">Base Refresh</label>\n                        {{$ctrl.character.baseRefresh}}\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"powerLevel\" class=\"control-label\">Adjusted Refresh</label>\n                        {{$ctrl.adjustedRefresh}}\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"powerLevel\" class=\"control-label\">Fate Points</label>\n                        <input type=\"number\" min=\"0\" class=\"form-control\" \n                            ng-model=\"$ctrl.character.fatePoints\" \n                            ng-change=\"$ctrl.save()\">\n                    </div>\n                </form>\n                \n            </div>\n\n        </div>\n\n        <div class=\"l-column has-gutter\">\n\n            <skills ng-model=\"$ctrl.character.skills\" on-change=\"$ctrl.save()\"></skills>\n\n            <powers ng-model=\"$ctrl.character.powers\" on-change=\"$ctrl.save()\"></powers>\n\n            <div class=\"c-ladder c-card\">\n                <h4>The Ladder</h4>\n                <table>\n                    <tr><td>Legendary</td><td>+8</td></tr>\n                    <tr><td>Epic</td><td>+7</td></tr>\n                    <tr><td>Fantastic</td><td>+6</td></tr>\n                    <tr><td>Superb</td><td>+5</td></tr>\n                    <tr><td>Great</td><td>+4</td></tr>\n                    <tr><td>Good</td><td>+3</td></tr>\n                    <tr><td>Fair</td><td>+2</td></tr>\n                    <tr><td>Average</td><td>+1</td></tr>\n                    <tr><td>Mediocre</td><td>+0</td></tr>\n                    <tr><td>Poor</td><td>–1</td></tr>\n                    <tr><td>Terrible</td><td>–2</td></tr>\n                </table>\n            </div>\n\n        </div>  <!-- end of l-column -->\n\n    </div>  <!-- end of l-container -->\n\n\n    <div class=\"c-phases c-card\">\n        \n        <h4>Background</h4>\n        <form class=\"form-flex\">\n            <div class=\"form-group\">\n                <label class=\"control-label\">Events</label>\n                <textarea class=\"form-control\" rows=\"2\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.background.events\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Aspect</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.background.aspect\" placeholder=\"Aspect...\">\n            </div>\n        </form>\n\n        <hr>\n        \n        <h4>Rising Conflict</h4>\n        <form class=\"form-flex\">\n            <div class=\"form-group\">\n                <label class=\"control-label\">Events</label>\n                <textarea class=\"form-control\" rows=\"2\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.conflict.events\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Aspect</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.conflict.aspect\" placeholder=\"Aspect...\">\n            </div>\n        </form>\n\n        <hr>\n        \n        <h4>Story</h4>\n        <form class=\"form-flex\">\n            <div class=\"form-group\">\n                <label class=\"control-label\">Title</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.story.title\" placeholder=\"Title...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Guest(s)</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.story.guest\" placeholder=\"Guest Starring...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Events</label>\n                <textarea class=\"form-control\" rows=\"2\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.story.events\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Aspect</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.story.aspect\" placeholder=\"Aspect...\">\n            </div>\n        </form>\n        <hr>\n        \n        <h4>Guest Star</h4>\n        <form class=\"form-flex\">\n            <div class=\"form-group\">\n                <label class=\"control-label\">Title</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest1.title\" placeholder=\"Title...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Guest(s)</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest1.guest\" placeholder=\"Guest Starring...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Events</label>\n                <textarea class=\"form-control\" rows=\"2\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest1.events\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Aspect</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest1.aspect\" placeholder=\"Aspect...\">\n            </div>\n        </form>\n        <hr>\n        \n        <h4>Guest Star Redux</h4>\n        <form class=\"form-flex\">\n            <div class=\"form-group\">\n                <label class=\"control-label\">Title</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest2.title\" placeholder=\"Title...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Guest(s)</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest2.guest\" placeholder=\"Guest Starring...\">\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Events</label>\n                <textarea class=\"form-control\" rows=\"2\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest2.events\"></textarea>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">Aspect</label>\n                <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.save()\" \n                    ng-model-options=\"{ debounce: 500 }\"\n                    ng-model=\"$ctrl.character.phases.guest2.aspect\" placeholder=\"Aspect...\">\n            </div>\n        </form>\n    </div>\n\n\n    <div class=\"c-notes c-card\">\n        <h4>Notes</h4>\n        <textarea rows=\"10\" class=\"form-control\" \n            ng-model=\"$ctrl.character.notes\"\n            ng-model-options=\"{ debounce: 500 }\"\n            ng-change=\"$ctrl.save()\"></textarea>\n    </div>\n\n\n    <div class=\"c-indicator--save\" ng-show=\"$ctrl.displayOpts.showSave\">\n        Character changes saved\n    </div>\n\n    <div class=\"c-nav\">\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-aspects,.c-misc\', this)\">home</button>\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-skills\', this)\">skills</button>\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-powers\', this)\">powers</button>\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-stress,.c-consequences\', this)\">stress</button>\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-phases,.c-notes\', this)\">notes</button>\n        <button type=\"button\" class=\"btn btn-link\" onclick=\"show(\'.c-ladder\', this)\">ladder</button>\n    </div>\n\n\n</div>");
$templateCache.put("char/consequences.component.html","<div class=\"c-consequences c-card\">\n\n    <button type=\"button\" class=\"c-btn c-btn--info pull-right\" ng-click=\"$ctrl.showConsequenceEditor()\">\n        <span class=\"glyphicon glyphicon-plus-sign\"></span>\n    </button>\n\n    <h4>Consequences</h4>\n\n    <form class=\"form-flex c-editor\" ng-if=\"$ctrl.displayOpts.showConsequenceEditor\">\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"consqType\">Type</label>\n            <select id=\"consqType\" class=\"form-control\" ng-model=\"$ctrl.newConsequence.type\" \n                ng-change=\"$ctrl.updateNewConsequenceModifier()\">\n                <option value=\"mild\">Mild</option>\n                <option value=\"moderate\">Moderate</option>\n                <option value=\"Severe\">Severe</option>\n                <option value=\"Extreme\">Extreme</option>\n            </select>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"consqAspect\">Aspect</label>\n            <input id=\"consqAspect\" class=\"form-control\" type=\"text\" \n                ng-model=\"$ctrl.newConsequence.aspect\" required>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"consqMod\">Mod</label>\n            <input id=\"consqMod\" class=\"form-control\" type=\"text\" \n                ng-model=\"$ctrl.newConsequence.modifier\" class=\"disabled\">\n        </div>\n        <button type=\"button\" class=\"btn btn-primary\" \n            ng-click=\"$ctrl.addConsequence()\"\n            ng-class=\"{disabled:!$ctrl.newConsequence.aspect}\">Add</button>\n        <button type=\"button\" class=\"btn btn-default\" ng-click=\"$ctrl.hideConquenceEditor()\">Cancel</button>\n    </form>\n\n    <div ng-repeat=\"consq in $ctrl.getConsequences()\">\n        [{{consq.type}}] <em>{{consq.aspect}}</em> ({{consq.modifier}}) \n        <button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"$ctrl.removeConsequence(consq)\">\n            <span class=\"glyphicon glyphicon-trash\"></span>\n        </button>\n    </div>\n\n</div>");
$templateCache.put("char/powers.component.html","<div class=\"c-powers c-card\">\n\n    <button type=\"button\" class=\"c-btn c-btn--info pull-right\" ng-click=\"$ctrl.showEditor()\">\n        <span class=\"glyphicon glyphicon-plus-sign\"></span>\n    </button>\n\n    <h4>Stunts &amp; Powers</h4>\n\n\n    <form class=\"form-flex c-editor\" ng-if=\"$ctrl.displayOpts.showEditor\">\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"powerName\">Name</label>\n            <input id=\"powerName\" class=\"form-control\" type=\"text\" \n                ng-model=\"$ctrl.newPower.name\" required>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"powerCost\">Cost</label>\n            <input id=\"powerCost\" class=\"form-control\" type=\"number\" min=\"-8\" max=\"0\" \n                ng-model=\"$ctrl.newPower.cost\" required>\n        </div>\n        <div class=\"form-group\">\n            <label class=\"control-label\" for=\"powerMisc\">Misc</label>\n            <input id=\"powerMisc\" class=\"form-control\" type=\"text\" \n                ng-model=\"$ctrl.newPower.misc\">\n        </div>\n        <button type=\"button\" class=\"btn btn-primary\" \n            ng-click=\"$ctrl.addPower()\"\n            ng-class=\"{disabled:!$ctrl.newPower.name}\">Add</button>\n        <button type=\"button\" class=\"btn btn-default\" ng-click=\"$ctrl.hideEditor()\">Cancel</button>\n    </form>\n\n\n    <div ng-repeat=\"(name, power) in $ctrl.ngModel\" class=\"c-power\">\n        \n        <button type=\"button\" class=\"c-btn c-btn--sm c-btn--danger pull-right\" ng-click=\"$ctrl.removePower(name)\">\n            <span class=\"glyphicon glyphicon-trash\"></span>\n        </button>\n\n        <label>{{name}}</label> ({{power.cost}}) \n        \n        <span ng-if=\"power.misc\">- {{power.misc}}</span>\n\n    </div>\n\n\n</div>");
$templateCache.put("char/skills.component.html","<div class=\"c-skills c-card\">\n\n    <h4>\n        Skills \n        ({{$ctrl.ngModel.spent}}/{{$ctrl.ngModel.total}})\n        <span class=\"glyphicon glyphicon-exclamation-sign text-danger\"\n            title=\"Too many skills picked!\"\n            ng-if=\"$ctrl.validateSpent()\"></span>\n    </h4>\n\n    <div class=\"c-skill-group\">\n        <div>\n            <label>Superb (+5)</label>\n            <small>\n                {{$ctrl.getSkillSlots(\'superb\')}} Slots\n                <span class=\"glyphicon glyphicon-exclamation-sign text-danger\"\n                    title=\"More skills needed below this group!\"\n                    ng-if=\"$ctrl.validate(\'superb\')\"></span>\n            </small>\n        </div>\n        <textarea rows=\"2\" class=\"form-control\" \n            ng-model=\"$ctrl.ngModel.superb.choices\"\n            ng-change=\"$ctrl.onChange()\"></textarea>\n    </div>\n\n    <div class=\"c-skill-group\">\n        <div>\n            <label>Great (+4)</label>\n            <small>\n                {{$ctrl.getSkillSlots(\'great\')}} Slots\n                <span class=\"glyphicon glyphicon-exclamation-sign text-danger\"\n                    title=\"More skills needed below this group!\"\n                    ng-if=\"$ctrl.validate(\'great\')\"></span>\n            </small>\n        </div>\n        <textarea rows=\"2\" class=\"form-control\" \n            ng-model=\"$ctrl.ngModel.great.choices\"\n            ng-change=\"$ctrl.onChange()\"></textarea>\n    </div>\n\n    <div class=\"c-skill-group\">\n        <div>\n            <label>Good (+3)</label>\n            <small>\n                {{$ctrl.getSkillSlots(\'good\')}} Slots\n                <span class=\"glyphicon glyphicon-exclamation-sign text-danger\"\n                    title=\"More skills needed below this group!\"\n                    ng-if=\"$ctrl.validate(\'good\')\"></span>\n            </small>\n        </div>\n        <textarea rows=\"2\" class=\"form-control\" \n            ng-model=\"$ctrl.ngModel.good.choices\"\n            ng-change=\"$ctrl.onChange()\"></textarea>\n    </div>\n\n    <div class=\"c-skill-group\">\n        <div>\n            <label>Fair (+2)</label>\n            <small>\n                {{$ctrl.getSkillSlots(\'fair\')}} Slots\n                <span class=\"glyphicon glyphicon-exclamation-sign text-danger\"\n                    title=\"More skills needed below this group!\"\n                    ng-if=\"$ctrl.validate(\'fair\')\"></span>\n            </small>\n        </div>\n        <textarea rows=\"2\" class=\"form-control\" \n            ng-model=\"$ctrl.ngModel.fair.choices\"\n            ng-change=\"$ctrl.onChange()\"></textarea>\n    </div>\n\n    <div class=\"c-skill-group\">\n        <div>\n            <label>Average (+1)</label>\n            <small>\n                {{$ctrl.getSkillSlots(\'average\')}} Slots\n            </small>\n        </div>\n        <textarea rows=\"2\" class=\"form-control\" \n            ng-model=\"$ctrl.ngModel.average.choices\"\n            ng-change=\"$ctrl.onChange()\"></textarea>\n    </div>\n\n</div>");
$templateCache.put("char/stress.component.html","<div class=\"c-stress c-card\">\n                \n    <button type=\"button\" class=\"c-btn c-btn--sm c-btn--info pull-right\" ng-click=\"$ctrl.resetStress()\">reset</button>\n    <h4>Stress</h4>\n\n    <div ng-repeat=\"type in [\'physical\',\'mental\',\'social\',\'hunger\']\">\n        <h5>{{type}}</h5>\n        <div class=\"stress__track\">\n            <input type=\"number\" min=\"0\" max=\"8\" class=\"form-control\"\n                ng-model=\"$ctrl.ngModel[type].threshold\"\n                ng-change=\"$ctrl.onChange()\">\n            <div ng-repeat=\"i in [0,1,2,3,4,5,6,7]\">\n                <div class=\"c-bubble disabled\" ng-if=\"$ctrl.ngModel[type].threshold<(i+1)\"></div>\n                <div class=\"c-bubble\" \n                    ng-if=\"$ctrl.ngModel[type].threshold>=(i+1)\"\n                    ng-class=\"{active:$ctrl.ngModel[type].used[i]}\"\n                    ng-click=\"$ctrl.toggleStress(type,i)\">\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <h5>Armor</h5>\n    <textarea rows=\"2\" class=\"form-control\" \n        ng-model=\"$ctrl.ngModel.armor\" ng-change=\"$ctrl.onChange()\"></textarea>\n\n</div>");
$templateCache.put("home/home.component.html","<div class=\"container\">\n\n\n    <h3>Dresden Files Character App</h3>\n    <p>Select a character from the list on the left or click \'New Character\' to create one</p>\n\n\n    <div class=\"alert alert-danger\" ng-if=\"$ctrl.displayOpts.error\">{{$ctrl.displayOpts.error}}</div>\n    \n    <!-- <div ng-if=\"$ctrl.displayOpts.loading\">Fetching data...</div>\n    \n    <div class=\"list-group\">\n        <div class=\"list-group-item disabled\">\n            <h4 class=\"list-group-item-heading\">Characters</h4>\n            <p class=\"list-group-item-text\">Select a character from the list</p>\n        </div>\n        <div class=\"list-group-item\" ng-if=\"!$ctrl.user\"><em>Login to select from your available characters</em></div>\n        <div ng-repeat=\"name in $ctrl.chars\" class=\"list-group-item\">\n            <button type=\"button\" class=\"c-btn c-btn--sm c-btn--danger pull-right\" ng-click=\"$ctrl.removeChar(name)\">\n                <span class=\"glyphicon glyphicon-trash\"></span>\n            </button>\n            <a ui-sref=\"char({ id: \'{{name}}\' })\">{{name}}</a>\n        </div>\n        <a class=\"list-group-item list-group-item-success\" ng-if=\"$ctrl.user\" ng-click=\"$ctrl.createCharacter()\">\n            Create a New Character\n        </a>\n    </div> -->\n\n</div>");
$templateCache.put("home/sidebar.component.html","<nav class=\"c-sidebar\">\n\n    <div class=\" c-menu\">\n\n        <h4>Dresden Files</h4>\n        \n        <hr>\n\n        <p ng-if=\"!$ctrl.user\">\n            <em>Login to see a list of your available characters</em>\n        </p>\n        \n        <p ng-if=\"$ctrl.displayOpts.loading\">Fetching data...</p>\n        \n        <div class=\"c-menu__option\">\n            <a ng-if=\"$ctrl.user\" ng-click=\"$ctrl.createCharacter()\">New Character</a>\n        </div>\n        \n        <div ng-repeat=\"name in $ctrl.chars\" class=\"c-menu__option\">\n            <button type=\"button\" class=\"c-btn c-btn--sm c-btn--danger pull-right\" ng-click=\"$ctrl.removeChar(name)\">\n                <span class=\"glyphicon glyphicon-trash\"></span>\n            </button>\n            <a ui-sref=\"char({ id: \'{{name}}\' })\">{{name}}</a>\n        </div>\n    </div>\n\n\n    <login-menu></login-menu>\n\n</nav>");}]);