(function(angular) {
    
    "use strict";



    class ItemsController {

        constructor () {
            this.displayOpts = {
                editing: false
            };
        }

        $onInit () {
            
        }

        showEditor () {
            this.displayOpts.editing = true;
        }

        hideEditor () {
            this.displayOpts.editing = false;   
        }

        addItem () {
            this.ngModel = this.ngModel || {};

            //if editing existing item, remove old copy in case key (title)
            // changed. then add updated copy from editor
            if(this.editingItem) 
                this.ngModel[this.editingItem.title] = null;
            

            var key = this.newItem.title;
            key = key.replace(/\'/g, '').replace(/\./g, '');

            this.ngModel[key] = this.newItem;
        
            this.onChange();
            this.hideEditor();
            this.newItem = {};
        }

        removeItem (item) {
            if(item) {
                this.ngModel[item.title] = null;
                this.onChange();
            }
        }

        editItem (item) {
            this.displayOpts.editing = true;
            this.editingItem = item;
            this.newItem = angular.copy(item);
        }

    }



    angular.module("dresden.char").component("items", {
        bindings: {
            ngModel: "=",
            onChange: "&"
        },
        templateUrl: 'char/items.component.html',
        controller: ItemsController
    });

}) (angular);