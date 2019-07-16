webpackJsonp(["styles"],{

/***/ "./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/less-loader/dist/cjs.js??ref--9-3!./src/styles.less":
/***/ (function(module, exports) {

module.exports = "/* You can add global styles to this file, and also import other style files */\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\nhtml {\n  font-size: 16px;\n}\nhtml,\nbody {\n  height: 100%;\n  width: 100%;\n  padding: 0;\n  margin: 0;\n}\nbody {\n  font-size: 1rem;\n  font-family: sans-serif, arial, Helvetica;\n  background: #E9E3CD;\n}\napp-root,\napp-character {\n  display: block;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  margin-top: 0;\n  margin-bottom: 0.25em;\n}\nh6 {\n  font-size: 0.85rem;\n}\nh5 {\n  font-size: 1rem;\n}\nh4 {\n  font-size: 1.25rem;\n}\nh3 {\n  font-size: 1.5rem;\n}\nh2 {\n  font-size: 1.75rem;\n}\nh1 {\n  font-size: 2rem;\n}\np {\n  margin: 0.5em 0;\n  font-style: italic;\n}\nlabel {\n  font-weight: 700;\n}\ninput.form-control,\nselect.form-control,\ntextarea.form-control {\n  width: 100%;\n  font-size: 1em;\n  padding: 0.25em 0.5em;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n}\ninput.form-control.u-sm,\nselect.form-control.u-sm,\ntextarea.form-control.u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"] {\n  font-size: 1em;\n  padding: 0.25em 0.5em;\n  background-color: #ddd;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n}\nbutton[type=\"button\"].u-sm {\n  font-size: 0.875em;\n}\nbutton[type=\"button\"].active {\n  background-color: #4277ad;\n  color: #fff;\n  -webkit-box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.3);\n          box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.3);\n}\nbutton[type=\"button\"].btn--add,\nbutton[type=\"button\"].btn-add.active {\n  background-color: #1ac6e2;\n  color: #fff;\n}\nbutton[type=\"button\"].btn--del,\nbutton[type=\"button\"].btn--del.active {\n  background-color: #f30a0a;\n  color: #fff;\n}\nbutton[type=\"button\"].btn--use,\nbutton[type=\"button\"].btn--use.active {\n  background-color: #4d4;\n  color: #fff;\n}\nbutton[type=\"button\"][disabled] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\nbutton[type=\"button\"].btn--round {\n  border-radius: 100%;\n}\n.hidden {\n  display: none;\n}\n.u-text--center {\n  text-align: center;\n}\n.u-text--sc {\n  font-variant: small-caps;\n}\n.u-text--uc {\n  text-transform: uppercase;\n}\n.u-text--lc {\n  text-transform: lowercase;\n}\n.u-text--right {\n  text-align: right;\n}\n.u-xxlg {\n  font-size: 2em;\n}\n.u-xlg {\n  font-size: 1.5em;\n}\n.u-lg {\n  font-size: 1.25em;\n}\n.u-sm {\n  font-size: 0.875em;\n}\n.u-xs {\n  font-size: 0.75em;\n}\n.u-xxs {\n  font-size: 0.5em;\n}\n.faded {\n  opacity: 0.3;\n}\n.u-mg-left--md {\n  margin-left: 1em;\n}\n.u-mg-right--md {\n  margin-right: 1em;\n}\n.u-mg-top--md {\n  margin-top: 1em;\n}\n.u-mg-bottom--md {\n  margin-bottom: 1em;\n}\n.t-fg--danger {\n  color: #f00;\n}\n.d-flex {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.flex-row {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-col {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.flex-wrap {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex-justify-start {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.flex-justify-end {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n.flex-justify-between {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.flex-justify-around {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.flex-justify-center {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.flex-justify-stretch {\n  -webkit-box-pack: stretch;\n      -ms-flex-pack: stretch;\n          justify-content: stretch;\n}\n.flex-align-start {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.flex-align-end {\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n.flex-align-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.flex-align-stretch {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n.col,\n.col-1 {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n.col-2 {\n  -webkit-box-flex: 2;\n      -ms-flex-positive: 2;\n          flex-grow: 2;\n}\n.col-3 {\n  -webkit-box-flex: 3;\n      -ms-flex-positive: 3;\n          flex-grow: 3;\n}\n.col-4 {\n  -webkit-box-flex: 4;\n      -ms-flex-positive: 4;\n          flex-grow: 4;\n}\n.col-5 {\n  -webkit-box-flex: 5;\n      -ms-flex-positive: 5;\n          flex-grow: 5;\n}\n.col-6 {\n  -webkit-box-flex: 6;\n      -ms-flex-positive: 6;\n          flex-grow: 6;\n}\n.col-auto {\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n}\n.col-half {\n  -ms-flex-preferred-size: 50%;\n      flex-basis: 50%;\n}\n.col-2-sm,\n.col-3-sm,\n.col-4-sm,\n.col-5-sm,\n.col-6-sm,\n.col-2-md,\n.col-3-md,\n.col-4-md,\n.col-5-md,\n.col-6-md,\n.col-2-lg,\n.col-3-lg,\n.col-4-lg,\n.col-5-lg,\n.col-6-lg,\n.col-2-xlg,\n.col-3-xlg,\n.col-4-xlg,\n.col-5-xlg,\n.col-6-xlg {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 100%;\n          flex: 1 0 100%;\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .col-2-sm {\n    -webkit-box-flex: 2;\n        -ms-flex: 2 0 50%;\n            flex: 2 0 50%;\n  }\n  .col-3-sm {\n    -webkit-box-flex: 3;\n        -ms-flex: 3 0 33%;\n            flex: 3 0 33%;\n  }\n  .col-4-sm {\n    -webkit-box-flex: 4;\n        -ms-flex: 4 0 25%;\n            flex: 4 0 25%;\n  }\n  .col-5-sm {\n    -webkit-box-flex: 5;\n        -ms-flex: 5 0 20%;\n            flex: 5 0 20%;\n  }\n  .col-6-sm {\n    -webkit-box-flex: 6;\n        -ms-flex: 6 0 16.67%;\n            flex: 6 0 16.67%;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .col-2-md {\n    -webkit-box-flex: 2;\n        -ms-flex: 2 0 50%;\n            flex: 2 0 50%;\n  }\n  .col-3-md {\n    -webkit-box-flex: 3;\n        -ms-flex: 3 0 33%;\n            flex: 3 0 33%;\n  }\n  .col-4-md {\n    -webkit-box-flex: 4;\n        -ms-flex: 4 0 25%;\n            flex: 4 0 25%;\n  }\n  .col-5-md {\n    -webkit-box-flex: 5;\n        -ms-flex: 5 0 20%;\n            flex: 5 0 20%;\n  }\n  .col-6-md {\n    -webkit-box-flex: 6;\n        -ms-flex: 6 0 16.67%;\n            flex: 6 0 16.67%;\n  }\n}\n@media (min-width: 1200px) and (max-width: 1499px) {\n  .col-2-lg {\n    -webkit-box-flex: 2;\n        -ms-flex: 2 0 50%;\n            flex: 2 0 50%;\n  }\n  .col-3-lg {\n    -webkit-box-flex: 3;\n        -ms-flex: 3 0 33%;\n            flex: 3 0 33%;\n  }\n  .col-4-lg {\n    -webkit-box-flex: 4;\n        -ms-flex: 4 0 25%;\n            flex: 4 0 25%;\n  }\n  .col-5-lg {\n    -webkit-box-flex: 5;\n        -ms-flex: 5 0 20%;\n            flex: 5 0 20%;\n  }\n  .col-6-lg {\n    -webkit-box-flex: 6;\n        -ms-flex: 6 0 16.67%;\n            flex: 6 0 16.67%;\n  }\n}\n@media (min-width: 1500px) {\n  .col-2-xlg {\n    -webkit-box-flex: 2;\n        -ms-flex: 2 0 50%;\n            flex: 2 0 50%;\n  }\n  .col-3-xlg {\n    -webkit-box-flex: 3;\n        -ms-flex: 3 0 33%;\n            flex: 3 0 33%;\n  }\n  .col-4-xlg {\n    -webkit-box-flex: 4;\n        -ms-flex: 4 0 25%;\n            flex: 4 0 25%;\n  }\n  .col-5-xlg {\n    -webkit-box-flex: 5;\n        -ms-flex: 5 0 20%;\n            flex: 5 0 20%;\n  }\n  .col-6-xlg {\n    -webkit-box-flex: 6;\n        -ms-flex: 6 0 16.67%;\n            flex: 6 0 16.67%;\n  }\n}\n@media (max-width: 766px) {\n  .d-none-xs {\n    display: none;\n  }\n}\n.d-grid {\n  display: -ms-grid;\n  display: grid;\n}\n.desc {\n  color: #777;\n  text-align: justify;\n}\n.c-error {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  background: #ff0000e3;\n  color: #fff;\n  padding: 0.5em 1em;\n  z-index: 9999;\n}\n.c-error a,\n.c-error a:visited {\n  color: #fff;\n}\n.c-messages {\n  position: absolute;\n  bottom: 0;\n  width: 100%;\n  z-index: 9998;\n}\n.c-messages .c-message {\n  background: #ffffffe3;\n  color: #333;\n  padding: 0.5em 1em;\n  margin: 0.25em 0 0;\n  white-space: normal;\n}\n.l-char {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  width: 100%;\n  overflow: auto;\n}\n.l-page {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 100%;\n          flex: 1 0 100%;\n  padding: 0.5em 1em 1em;\n  border-right: 1px solid #d7d6b7;\n  border-left: 1px solid #f8f7e5;\n}\n.l-page:first-child {\n  border-left: none;\n}\n.l-page:last-child {\n  border-right: none;\n}\n.l-page header {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  -webkit-box-flex: 100%;\n      -ms-flex: 100%;\n          flex: 100%;\n  z-index: 9999;\n}\n.l-page main {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 66%;\n          flex: 1 0 66%;\n}\n.l-page main section {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.25em 0;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.l-page main section > section {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.l-page main section.misc {\n  padding: 0;\n  -webkit-box-pack: stretch;\n      -ms-flex-pack: stretch;\n          justify-content: stretch;\n}\n@media (min-width: 300px) {\n  .l-char {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    overflow-y: hidden;\n    overflow-x: auto;\n    height: 100%;\n    padding-top: 36px;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n  }\n  .l-page {\n    -webkit-box-flex: 1;\n        -ms-flex: 1 0 375px;\n            flex: 1 0 375px;\n    overflow-y: auto;\n    white-space: normal;\n  }\n}\n.bio {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.bio h3,\n.bio h4,\n.bio h5 {\n  margin: 0;\n}\n.card {\n  background: rgba(255, 255, 255, 0.85);\n  margin: 0.25em 0;\n  padding: 0.5em;\n  border-radius: 0.25em;\n  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);\n}\n/* ----------- SPRITES ------------- */\nimg.sprite-darkstone {\n  left: -0.25em;\n  bottom: -0.25em;\n}\n.sprite {\n  background-image: url('spritesheet.bdb16edfbce5226b4d40.png');\n  background-repeat: no-repeat;\n  display: inline-block;\n  vertical-align: bottom;\n}\n.sprite-bandages {\n  width: 55px;\n  height: 55px;\n  background-position: -5px -5px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-cigar,\n.sprite-cigars {\n  width: 55px;\n  height: 55px;\n  background-position: -70px -5px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-corruption {\n  width: 56px;\n  height: 56px;\n  background-position: -135px -5px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-dynamite {\n  width: 55px;\n  height: 55px;\n  background-position: -200px -5px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-exoticHerbs {\n  width: 55px;\n  height: 54px;\n  background-position: -5px -70px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-flash {\n  width: 55px;\n  height: 55px;\n  background-position: -70px -70px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-fungus {\n  width: 55px;\n  height: 55px;\n  background-position: -135px -70px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-hatchet,\n.sprite-hatchets {\n  width: 55px;\n  height: 55px;\n  background-position: -200px -70px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-herb,\n.sprite-herbs {\n  width: 55px;\n  height: 55px;\n  background-position: -5px -135px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-item_darkstone {\n  width: 55px;\n  height: 55px;\n  background-position: -70px -135px;\n  zoom: 0.3;\n  -moz-transform: scale(0.4);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.4);\n  -o-transform-origin: 0 0;\n}\n.sprite-item_hands {\n  width: 55px;\n  height: 55px;\n  background-position: -135px -135px;\n  zoom: 0.3;\n  -moz-transform: scale(0.4);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.4);\n  -o-transform-origin: 0 0;\n}\n.sprite-item_slots {\n  width: 55px;\n  height: 55px;\n  background-position: -200px -135px;\n  zoom: 0.3;\n  -moz-transform: scale(0.4);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.4);\n  -o-transform-origin: 0 0;\n}\n.sprite-item_weight {\n  width: 55px;\n  height: 55px;\n  background-position: -5px -200px;\n  zoom: 0.3;\n  -moz-transform: scale(0.4);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.4);\n  -o-transform-origin: 0 0;\n}\n.sprite-oil,\n.sprite-lanternOil {\n  width: 55px;\n  height: 55px;\n  background-position: -70px -200px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-potion,\n.sprite-potions {\n  width: 55px;\n  height: 55px;\n  background-position: -135px -200px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-sanity {\n  width: 56px;\n  height: 56px;\n  background-position: -200px -200px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-spice,\n.sprite-spices {\n  width: 55px;\n  height: 55px;\n  background-position: -265px -5px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-tequila {\n  width: 55px;\n  height: 55px;\n  background-position: -265px -70px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-tonic {\n  width: 55px;\n  height: 55px;\n  background-position: -265px -135px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-wealth {\n  width: 55px;\n  height: 55px;\n  background-position: -265px -200px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-whiskey {\n  width: 55px;\n  height: 55px;\n  background-position: -5px -265px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-wound {\n  width: 56px;\n  height: 56px;\n  background-position: -70px -265px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-xp {\n  width: 56px;\n  height: 56px;\n  background-position: -135px -265px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-nectar {\n  width: 56px;\n  height: 56px;\n  background-position: -200px -265px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-junkBomb {\n  width: 56px;\n  height: 56px;\n  background-position: -265px -265px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-antiRad {\n  width: 55px;\n  height: 55px;\n  background-position: -5px -330px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-fireSake {\n  width: 56px;\n  height: 56px;\n  background-position: -70px -330px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-stake {\n  width: 56px;\n  height: 56px;\n  background-position: -135px -330px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-shatterGrenade {\n  width: 56px;\n  height: 56px;\n  background-position: -200px -330px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite-strongSake {\n  width: 56px;\n  height: 56px;\n  background-position: -265px -330px;\n  zoom: 0.6;\n  -moz-transform: scale(0.5);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.5);\n  -o-transform-origin: 0 0;\n}\n.sprite-sake {\n  width: 56px;\n  height: 56px;\n  background-position: -70px -395px;\n  zoom: 0.5875;\n  -moz-transform: scale(0.6);\n  -moz-transform-origin: 0 0;\n  -o-transform: scale(0.6);\n  -o-transform-origin: 0 0;\n}\n.sprite.disabled {\n  opacity: 0.25;\n}\n/* ------------------------------------- */\n.value-display {\n  background: #fff;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  border: 1px solid #000;\n  border-radius: 8px;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);\n}\n.value-display .label {\n  display: block;\n  font-weight: 700;\n  font-size: 1em;\n  width: 96px;\n  border-top: 1px solid #000;\n  border-radius: 0 0 8px 8px;\n}\n.value-display .label.u-sm {\n  font-size: 1em;\n}\n.value-display .value {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 64px;\n          flex: 1 0 64px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n.value-display .value > *:first-child {\n  font-size: 2em;\n  text-align: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n      -ms-flex: 1 0 1em;\n          flex: 1 0 1em;\n  padding: 0 0.5em;\n  max-width: 64px;\n}\n.value-display .value > *:first-child.u-sm {\n  font-size: 1.25em;\n}\n.value-display .value.u-sm > *:first-child {\n  font-size: 1.5em;\n}\n.value-display .value.modified > *:first-child {\n  background-color: #ffbc0052;\n}\n.value-display .incrementer,\n.value-display .decrementer {\n  font-size: 1em;\n  width: 2em;\n  height: 2em;\n  border: none;\n  font-weight: 700;\n  border-radius: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.value-display .incrementer:first-child,\n.value-display .decrementer:first-child {\n  border-radius: 0 8px 0 0;\n}\n.value-display .incrementer {\n  color: #333;\n  background-color: #b6e3b6;\n}\n.value-display .decrementer {\n  color: #333;\n  background-color: #f1c9c9;\n}\n.has-stat-with-max {\n  width: 90px;\n}\n.stat {\n  position: relative;\n  display: inline-block;\n  text-align: center;\n  vertical-align: top;\n  width: 3em;\n  height: 3em;\n}\n.stat .label {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin-bottom: 0;\n  line-height: 0.9;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  font-size: 0.65em;\n  z-index: 3;\n}\n.stat .label.label--top {\n  top: -0.25em;\n  height: 1em;\n  font-size: 0.875em;\n}\n.stat .value {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  position: relative;\n  margin: 0;\n  font-size: 1.75em;\n  width: 100%;\n  height: 100%;\n  border-radius: 100%;\n  background: #fff;\n  border: 1px solid #777;\n  z-index: 2;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n.stat .stat {\n  position: absolute;\n  top: -10px;\n  right: -22px;\n  width: 36px;\n  height: 36px;\n  z-index: 1;\n}\n.stat .stat .value {\n  font-size: 1em;\n  /*box-shadow: 0 1px 3px #000;*/\n  border: 1px solid #333;\n  background: #666;\n  color: #fff;\n  font-weight: 700;\n}\n.stat .value.is-modified {\n  color: #44ad43;\n}\n.stat .stat .value.is-modified {\n  color: #ace9ac;\n}\n.stat img {\n  position: absolute;\n  bottom: -12px;\n  left: -12px;\n  width: 2em;\n  z-index: 2;\n}\n.stat .sprite {\n  position: absolute;\n  bottom: -12px;\n  left: -12px;\n  z-index: 2;\n  -webkit-transform: scaleX(0.75) scaleY(0.75);\n          transform: scaleX(0.75) scaleY(0.75);\n}\n.stat.stat--with-plus editable-stat-value:after {\n  content: \"+\";\n  font-size: 1.25em;\n  position: absolute;\n  right: 0;\n  top: 16%;\n  z-index: 1000;\n}\n.stat.stat--prepend-plus editable-stat-value:before {\n  content: \"+\";\n  font-size: 1.25em;\n  position: absolute;\n  left: 0;\n  top: 16%;\n  z-index: 1000;\n}\n@media (min-width: 768px) {\n  .stat.stat--with-plus editable-stat-value:after {\n    font-size: 2em;\n  }\n  .stat.stat--prepend-plus editable-stat-value:before {\n    font-size: 2em;\n  }\n}\n.stat .value.value--sm,\n.stat .value--sm .value {\n  font-size: 1.25em;\n}\n@media (min-width: 768px) {\n  .stat .value.value--sm,\n  .stat .value--sm .value {\n    font-size: 1.25em;\n  }\n}\n.attributes .f-cell-33p {\n  text-align: center;\n}\n/* at higher resolutions, make the stats larger */\n@media (min-width: 768px) {\n  .has-stat-with-max {\n    width: auto;\n    text-align: center;\n  }\n  .stat .label {\n    position: absolute;\n    font-size: 1em;\n  }\n  .stat .label.label--top {\n    top: 0;\n    height: 10px;\n    font-size: 1em;\n  }\n  .stat .label.label--sm {\n    font-size: 0.8em;\n  }\n  .stat .value {\n    font-size: 2em;\n  }\n  .stat .sprite {\n    bottom: -0.25em;\n    left: -0.25em;\n    -webkit-transform: scaleX(1.25) scaleY(1.25);\n            transform: scaleX(1.25) scaleY(1.25);\n  }\n  .stat .value.value--sm {\n    font-size: 1.5em;\n  }\n  .stat .stat {\n    top: -0.25em;\n    right: -2.25em;\n  }\n  .stat .stat .value {\n    font-size: 1.25em;\n  }\n}\n.t-combat,\n.t-combat .stat2 .label {\n  background-color: #bbb;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-health,\n.t-health .stat2 .label {\n  background-color: #C24E4E;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-sanity,\n.t-sanity .stat2 .label {\n  background-color: #81A0D3;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-faith,\n.t-faith .stat2 .label {\n  background-color: yellow;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-fury,\n.t-fury .stat2 .label {\n  background-color: red;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-magik,\n.t-magik .stat2 .label {\n  background-color: purple;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-fortune,\n.t-fortune .stat2 .label {\n  background-color: orange;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-ki,\n.t-ki .stat2 .label {\n  background-color: yellow;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-mana,\n.t-mana .stat2 .label {\n  background-color: purple;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-corruption,\n.t-corruption .stat2 .label {\n  background-color: #58A932;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.t-grit,\n.t-grit .stat2 .label {\n  background-color: #9c7a3f;\n  background-image: url('texture.8ba198fc94a9d91143b3.png');\n}\n.section-label {\n  -webkit-transform: rotateZ(-90deg);\n          transform: rotateZ(-90deg);\n  font-weight: 700;\n  font-variant: all-small-caps;\n}\n.form-group {\n  margin: 0 0 0.5em;\n}\n.icon-caret--up {\n  width: 1em;\n  height: 1em;\n  background-size: 100%;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNOCAyMC42OTVsNy45OTctMTEuMzlMMjQgMjAuNjk1eiIvPjwvc3ZnPg==');\n}\n.icon-caret--down {\n  width: 1em;\n  height: 1em;\n  background-size: 100%;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBkPSJNMjQgMTEuMzA1bC03Ljk5NyAxMS4zOUw4IDExLjMwNXoiLz48L3N2Zz4=');\n}\n"

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/styles.less":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/raw-loader/index.js!./node_modules/postcss-loader/lib/index.js??embedded!./node_modules/less-loader/dist/cjs.js??ref--9-3!./src/styles.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/raw-loader/index.js!../node_modules/postcss-loader/lib/index.js??embedded!../node_modules/less-loader/dist/cjs.js??ref--9-3!./styles.less", function() {
			var newContent = require("!!../node_modules/raw-loader/index.js!../node_modules/postcss-loader/lib/index.js??embedded!../node_modules/less-loader/dist/cjs.js??ref--9-3!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/styles.less");


/***/ })

},[2]);
//# sourceMappingURL=styles.bundle.js.map