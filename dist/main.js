/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/api.js":
/*!*************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/css-loader/dist/runtime/api.js ***!
  \*************************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/getUrl.js":
/*!****************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/css-loader/dist/runtime/getUrl.js ***!
  \****************************************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!********************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \********************************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!************************************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \************************************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!****************************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \****************************************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!******************************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \******************************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!******************************************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***********************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***********************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*****************************************************************************************!*\
  !*** ../../ #WEB/resturant/node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*****************************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/contactPage.js":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/contactPage.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _media_welcome_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./media/welcome.svg */ "../../\u0000#WEB/resturant/src/media/welcome.svg");
/* harmony import */ var _menuPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menuPage */ "../../\u0000#WEB/resturant/src/menuPage.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "../../\u0000#WEB/resturant/src/index.js");





const contact = function(){
    let container = document.querySelector('#container');
   
    let welcome = document.createElement("div")
welcome.classList.add("welcome")
container.appendChild(welcome)

    let homepage = document.createElement("button")
homepage.classList.add("menu")
welcome.appendChild(homepage)
homepage.textContent = "homepage"
homepage.style = "width: 80px; height:80px; border-radius:50px;  background-color: rgb(184, 122, 42, 0.7);"
     
let welcomeImg = document.createElement("img")
welcomeImg.classList.add("welcomeImg")
welcome.appendChild(welcomeImg)
welcomeImg.src = _media_welcome_svg__WEBPACK_IMPORTED_MODULE_0__

let menu = document.createElement("button")
menu.classList.add("contact")
welcome.appendChild(menu)
menu.textContent = "menu"
menu.style = "width: 80px; height:80px; border-radius:50px; background-color: rgb(184, 122, 42, 0.7);"
//contact.setAttribute("onclick", "contactPage()")

let form = document.createElement('form')
form.classList.add('form')
container.appendChild(form)

let nameLabel = document.createElement('label')
form.appendChild(nameLabel)
nameLabel.setAttribute("for", "name")
nameLabel.textContent = " YOUR NAME"

let name = document.createElement('input')
name.classList.add('name')
name.setAttribute("type", "text")
name.style = "border-radius: 20px;"
form.appendChild(name)
let b1 = document.createElement('br')
form.appendChild(b1)

let emailLabel = document.createElement('label')
form.appendChild(emailLabel)
emailLabel.setAttribute("for", "email")
emailLabel.textContent = 'EMAIL'

let email = document.createElement('input')
email.classList.add('email')
email.setAttribute("type", "email")
email.style = "border-radius: 20px;"
form.appendChild(email)
let b2 = document.createElement('br')
form.appendChild(b2)

let textLabel = document.createElement('label')
form.appendChild(textLabel)
textLabel.setAttribute("for", "text")
textLabel.textContent = "INPUT YOUR MESAGE HERE"

let text = document.createElement('textarea')
text.classList.add('text')
text.setAttribute("cols", "50")
text.setAttribute("rows", "20")
text.setAttribute("placeholder", " You can make reservetions or speak directly with the store owner on any related issues")
text.style = "border-radius: 20px;"
form.appendChild(text)
let b3 = document.createElement('br')
form.appendChild(b3)

let submit = document.createElement('input')
submit.classList.add('submit')
submit.setAttribute("type", "submit")
form.appendChild(submit)

menu.addEventListener("click", () =>{
    console.log("menu")
    /*welcome.style = "display:none"
    form.style = "display:none"*/
    container.innerHTML = ""
    ;(0,_menuPage__WEBPACK_IMPORTED_MODULE_1__["default"])()
})
homepage.addEventListener("click", () =>{
    console.log("homepage")
    /*welcome.style = "display:none"
    form.style = "display:none"*/
    container.innerHTML = ""
    ;(0,_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])()

})
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contact);

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/index.js":
/*!******************************************!*\
  !*** ../../ #WEB/resturant/src/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _menuPage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuPage */ "../../\u0000#WEB/resturant/src/menuPage.js");
/* harmony import */ var _contactPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contactPage */ "../../\u0000#WEB/resturant/src/contactPage.js");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.css */ "../../\u0000#WEB/resturant/src/index.css");
/* harmony import */ var _media_logo_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media/logo.svg */ "../../\u0000#WEB/resturant/src/media/logo.svg");
/* harmony import */ var _media_welcome_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media/welcome.svg */ "../../\u0000#WEB/resturant/src/media/welcome.svg");
/* harmony import */ var _media_five_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./media/five.svg */ "../../\u0000#WEB/resturant/src/media/five.svg");
/* harmony import */ var _media_whatsapp_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media/whatsapp.svg */ "../../\u0000#WEB/resturant/src/media/whatsapp.svg");
/* harmony import */ var _media_instagram_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./media/instagram.svg */ "../../\u0000#WEB/resturant/src/media/instagram.svg");
/* harmony import */ var _media_background_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./media/background.jpg */ "../../\u0000#WEB/resturant/src/media/background.jpg");










const homepage = function(){
    let container = document.querySelector('#container');
container.src = _media_background_jpg__WEBPACK_IMPORTED_MODULE_8__

let content = document.createElement("div")
content.classList.add("content")
container.appendChild(content)

let logo = document.createElement("img")
logo.classList.add("logo")
content.appendChild(logo)
logo.src = _media_logo_svg__WEBPACK_IMPORTED_MODULE_3__
logo.setAttribute("width","80px")

let logoText = document.createElement("h3")
logoText.classList.add("logoText")
content.appendChild(logoText)
logoText.textContent = "EROS PALACE";

let subtext = document.createElement("h3")
subtext.classList.add("subtext")
content.appendChild(subtext)
subtext.textContent = "Home of the best noodles";

let welcome = document.createElement("div")
welcome.classList.add("welcome")
container.appendChild(welcome)



let menu = document.createElement("button")
menu.classList.add("menu")
welcome.appendChild(menu)
menu.textContent = "menu"
menu.style = "width: 80px; height:80px; border-radius:50px;  background-color: rgb(184, 122, 42, 0.7);"
//menu.setAttribute("onclick", "menuPage()")

let welcomeImg = document.createElement("img")
welcomeImg.classList.add("welcomeImg")
welcome.appendChild(welcomeImg)
welcomeImg.src = _media_welcome_svg__WEBPACK_IMPORTED_MODULE_4__

let contact = document.createElement("button")
contact.classList.add("contact")
welcome.appendChild(contact)
contact.textContent = "contact"
contact.style = "width: 80px; height:80px; border-radius:50px; background-color: rgb(184, 122, 42, 0.7);"
//contact.setAttribute("onclick", "contactPage()")

let text = document.createElement("div")
text.classList.add("text")
container.appendChild(text)

let textOne = document.createElement("p")
textOne.classList.add("textOne")
text.appendChild(textOne)
textOne.textContent = "intro to the establishment"
textOne.style = "width: 300px; height:200px; border-radius:10px; background-color: rgb(184, 122, 42, 0.7);"

let link = document.createElement("div")
link.classList.add("link")
container.appendChild(link)

let post = document.createElement('div')
post.classList.add("post")
link.appendChild(post)

let post1 = document.createElement('img')
post1.classList.add("post1")
post.appendChild(post1)
post1.src = _media_whatsapp_svg__WEBPACK_IMPORTED_MODULE_6__
post1.setAttribute("width", "80px")

let post2 = document.createElement('img')
post2.classList.add("post2")
post.appendChild(post2)
post2.src= _media_instagram_svg__WEBPACK_IMPORTED_MODULE_7__
post2.setAttribute("width", "50px")
post2.style = "margin-right: 20px;"

let post3 = document.createElement('img')
post3.classList.add("post3")
post.appendChild(post3)
post3.src = _media_five_svg__WEBPACK_IMPORTED_MODULE_5__
post3.setAttribute("width", "50px")
post3.style = "margin-right: 20px;"


menu.addEventListener("click", () =>{
    console.log("menu")
    /*content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"*/
    container.innerHTML = ""
    ;(0,_menuPage__WEBPACK_IMPORTED_MODULE_0__["default"])()
})
contact.addEventListener("click", () =>{
    console.log("contact")
    /*content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"*/
    container.innerHTML = ""
    ;(0,_contactPage__WEBPACK_IMPORTED_MODULE_1__["default"])()
})
}
homepage();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (homepage);


/***/ }),

/***/ "../../\u0000#WEB/resturant/src/menuPage.js":
/*!*********************************************!*\
  !*** ../../ #WEB/resturant/src/menuPage.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "../../\u0000#WEB/resturant/src/index.js");
/* harmony import */ var _contactPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contactPage.js */ "../../\u0000#WEB/resturant/src/contactPage.js");
/* harmony import */ var _media_welcome_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./media/welcome.svg */ "../../\u0000#WEB/resturant/src/media/welcome.svg");
/* harmony import */ var _media_img1_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media/img1.jpg */ "../../\u0000#WEB/resturant/src/media/img1.jpg");
/* harmony import */ var _media_img2_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media/img2.jpg */ "../../\u0000#WEB/resturant/src/media/img2.jpg");
/* harmony import */ var _media_img3_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./media/img3.jpg */ "../../\u0000#WEB/resturant/src/media/img3.jpg");
/* harmony import */ var _media_img4_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media/img4.jpg */ "../../\u0000#WEB/resturant/src/media/img4.jpg");
/* harmony import */ var _media_img5_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./media/img5.jpg */ "../../\u0000#WEB/resturant/src/media/img5.jpg");










const menuPage = function(){
    let container = document.querySelector('#container');
   
    let welcome = document.createElement("div")
welcome.classList.add("welcome")
container.appendChild(welcome)

    let homepage = document.createElement("button")
homepage.classList.add("menu")
welcome.appendChild(homepage)
homepage.textContent = "homepage"
homepage.style = "width: 80px; height:80px; border-radius:50px;  background-color: rgb(184, 122, 42, 0.7);"
     
let welcomeImg = document.createElement("img")
welcomeImg.classList.add("welcomeImg")
welcome.appendChild(welcomeImg)
welcomeImg.src = _media_welcome_svg__WEBPACK_IMPORTED_MODULE_2__

let contact = document.createElement("button")
contact.classList.add("contact")
welcome.appendChild(contact)
contact.textContent = "contact"
contact.style = "width: 80px; height:80px; border-radius:50px; background-color: rgb(184, 122, 42, 0.7);"
//contact.setAttribute("onclick", "contactPage()")
    
let contentMenu = document.createElement("div")
contentMenu. classList.add("contentMenu")
container.appendChild(contentMenu)

    let header = document.createElement("h1")
    header.classList.add('header');
    contentMenu.appendChild(header)
    header.textContent = " MENU LIST"

        let cover = document.createElement("div")
        cover.classList.add("cover")
        contentMenu.appendChild(cover)
         //grid1
        let coverImg = document.createElement("div")
        coverImg.classList.add('coverImg')
        cover.appendChild(coverImg)
        
        let img1 = document.createElement('img')
        coverImg.appendChild(img1)
        img1.src = _media_img1_jpg__WEBPACK_IMPORTED_MODULE_3__

        let covertext = document.createElement('div')
        covertext.classList.add('covertext')
        cover.appendChild(covertext)

        let text1 = document.createElement('p')
        covertext.appendChild(text1)
        text1.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$20</h3>"
        //grid2
        let cover2 = document.createElement("div")
        cover2.classList.add("cover")
        contentMenu.appendChild(cover2)

        let coverImg2 = document.createElement("div")
        coverImg2.classList.add('coverImg')
        cover2.appendChild(coverImg2)
        
        let img2 = document.createElement('img')
        coverImg2.appendChild(img2)
        img2.src = _media_img2_jpg__WEBPACK_IMPORTED_MODULE_4__

        let covertext2 = document.createElement('div')
        covertext2.classList.add('covertext2')
        cover2.appendChild(covertext2)

        let text2 = document.createElement('p')
        covertext2.appendChild(text2)
        text2.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$10</h3>"
        //grid3

        let cover3 = document.createElement("div")
        cover3.classList.add("cover")
        contentMenu.appendChild(cover3)

        let coverImg3 = document.createElement("div")
        coverImg3.classList.add('coverImg')
        cover3.appendChild(coverImg3)
        
        let img3 = document.createElement('img')
        coverImg3.appendChild(img3)
        img3.src = _media_img3_jpg__WEBPACK_IMPORTED_MODULE_5__

        let covertext3 = document.createElement('div')
        covertext3.classList.add('covertext3')
        cover3.appendChild(covertext3)

        let text3 = document.createElement('p')
        covertext3.appendChild(text3)
        text3.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$50</h3>"

        //grid4
        let cover4 = document.createElement("div")
        cover4.classList.add("cover")
        contentMenu.appendChild(cover4)

        let coverImg4 = document.createElement("div")
        coverImg4.classList.add('coverImg')
        cover4.appendChild(coverImg4)
        
        let img4 = document.createElement('img')
        coverImg4.appendChild(img4)
        img4.src = _media_img4_jpg__WEBPACK_IMPORTED_MODULE_6__

        let covertext4 = document.createElement('div')
        covertext4.classList.add('covertext4')
        cover4.appendChild(covertext4)

        let text4 = document.createElement('p')
        covertext4.appendChild(text4)
        text4.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$70</h3>"

        //grid5
        let cover5 = document.createElement("div")
        cover5.classList.add("cover")
        contentMenu.appendChild(cover5)

        let coverImg5= document.createElement("div")
        coverImg5.classList.add('coverImg')
        cover5.appendChild(coverImg5)
        
        let img5 = document.createElement('img')
        coverImg5.appendChild(img5)
        img5.src = _media_img5_jpg__WEBPACK_IMPORTED_MODULE_7__

        let covertext5 = document.createElement('div')
        covertext5.classList.add('covertext5')
        cover5.appendChild(covertext5)

        let text5 = document.createElement('p')
        covertext5.appendChild(text5)
        text5.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$40</h3>"


        homepage.addEventListener("click", () =>{
            console.log("homepage")
            ;(0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
            /*welcome.style = "display: none;"
            contentMenu.style = "display: none;"*/
            container.innerHTML = ""
        })
        contact.addEventListener("click", () =>{
            console.log("contact")
            ;(0,_contactPage_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
           /* welcome.style = "display: none;"
            contentMenu.style = "display: none;"*/
            container.innerHTML = ""
        })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuPage);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!../../\u0000#WEB/resturant/src/index.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!../../ #WEB/resturant/src/index.css ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "../../\u0000#WEB/resturant/node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! media/background.jpg */ "../../\u0000#WEB/resturant/src/media/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body{\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-size:cover;\r\n    background-position: center;\r\n    background-attachment: fixed;\r\n    \r\n}\r\n#container{\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.content{\r\n    margin-top: 10px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.welcome{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    position: relative;\r\n    justify-content: center;\r\n    \r\n\r\n}\r\n.welcomeImg{\r\n    width: 130px;\r\n    height: 150px;\r\n    transition: width 3s ease-in, transform 2s ease-in;\r\n    \r\n}\r\n.welcomeImg:hover{\r\n    width: 150px;\r\n    height: 200px;\r\n    transform: rotate(360deg);\r\n}\r\n.menu:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.contact:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.link{\r\n    position: relative;\r\n\r\n}\r\n.post{\r\n    display: flex;\r\n    flex-direction: row;\r\n   justify-content: center;\r\n}\r\n/*------menu--------*/\r\n.contentMenu{\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 15px;\r\n}\r\n\r\n.cover{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n.coverImg>img{\r\n    width: 300px;\r\n    height: 200px;\r\n    border-radius: 20px;\r\n    size: cover;\r\n}\r\nh3{\r\n    color: antiquewhite;\r\n}\r\n\r\n/*--contact--->*/\r\n.form{\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 20px;\r\n}\r\n.submit{\r\n    color: antiquewhite;\r\n    background-color: rgb(184, 122, 42, 0.7);\r\n    border-radius: 5px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,mDAAqC;IACrC,qBAAqB;IACrB,2BAA2B;IAC3B,4BAA4B;;AAEhC;AACA;;IAEI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;AACvB;AACA;IACI,gBAAgB;IAChB,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,kBAAkB;IAClB,uBAAuB;;;AAG3B;AACA;IACI,YAAY;IACZ,aAAa;IACb,kDAAkD;;AAEtD;AACA;IACI,YAAY;IACZ,aAAa;IACb,yBAAyB;AAC7B;AACA;IACI,4BAA4B;AAChC;AACA;IACI,4BAA4B;AAChC;AACA;IACI,kBAAkB;;AAEtB;AACA;IACI,aAAa;IACb,mBAAmB;GACpB,uBAAuB;AAC1B;AACA,qBAAqB;AACrB;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;AACb;AACA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,WAAW;AACf;AACA;IACI,mBAAmB;AACvB;;AAEA,gBAAgB;AAChB;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;AAChB;AACA;IACI,mBAAmB;IACnB,wCAAwC;IACxC,kBAAkB;AACtB","sourcesContent":["body{\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n    background: url(media/background.jpg);\r\n    background-size:cover;\r\n    background-position: center;\r\n    background-attachment: fixed;\r\n    \r\n}\r\n#container{\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.content{\r\n    margin-top: 10px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.welcome{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    position: relative;\r\n    justify-content: center;\r\n    \r\n\r\n}\r\n.welcomeImg{\r\n    width: 130px;\r\n    height: 150px;\r\n    transition: width 3s ease-in, transform 2s ease-in;\r\n    \r\n}\r\n.welcomeImg:hover{\r\n    width: 150px;\r\n    height: 200px;\r\n    transform: rotate(360deg);\r\n}\r\n.menu:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.contact:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.link{\r\n    position: relative;\r\n\r\n}\r\n.post{\r\n    display: flex;\r\n    flex-direction: row;\r\n   justify-content: center;\r\n}\r\n/*------menu--------*/\r\n.contentMenu{\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 15px;\r\n}\r\n\r\n.cover{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n.coverImg>img{\r\n    width: 300px;\r\n    height: 200px;\r\n    border-radius: 20px;\r\n    size: cover;\r\n}\r\nh3{\r\n    color: antiquewhite;\r\n}\r\n\r\n/*--contact--->*/\r\n.form{\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 20px;\r\n}\r\n.submit{\r\n    color: antiquewhite;\r\n    background-color: rgb(184, 122, 42, 0.7);\r\n    border-radius: 5px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../\u0000#WEB/resturant/src/index.css":
/*!*******************************************!*\
  !*** ../../ #WEB/resturant/src/index.css ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../\u0000#WEB/resturant/node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _WEB_resturant_node_modules_css_loader_dist_cjs_js_WEB_resturant_src_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../ #WEB/resturant/node_modules/css-loader/dist/cjs.js!../../../ #WEB/resturant/src/index.css */ "./node_modules/css-loader/dist/cjs.js!../../\u0000#WEB/resturant/src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_WEB_resturant_node_modules_css_loader_dist_cjs_js_WEB_resturant_src_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_WEB_resturant_node_modules_css_loader_dist_cjs_js_WEB_resturant_src_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _WEB_resturant_node_modules_css_loader_dist_cjs_js_WEB_resturant_src_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _WEB_resturant_node_modules_css_loader_dist_cjs_js_WEB_resturant_src_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/background.jpg":
/*!******************************************************!*\
  !*** ../../ #WEB/resturant/src/media/background.jpg ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cb8c43a6de1b088f3194.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/five.svg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/five.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6f3b33f17b7a66777251.svg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/img1.jpg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/img1.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e67a043cc45357cf7860.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/img2.jpg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/img2.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ae05f4e7b21c543f2aad.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/img3.jpg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/img3.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e75f5f35101f5fe6f188.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/img4.jpg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/img4.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e8bce3af14f39052de80.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/img5.jpg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/img5.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c74b0f0b4b5ad9956cb6.jpg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/instagram.svg":
/*!*****************************************************!*\
  !*** ../../ #WEB/resturant/src/media/instagram.svg ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "41fafecc2a856bf09bf3.svg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/logo.svg":
/*!************************************************!*\
  !*** ../../ #WEB/resturant/src/media/logo.svg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9391f5363e93e696dfe5.svg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/welcome.svg":
/*!***************************************************!*\
  !*** ../../ #WEB/resturant/src/media/welcome.svg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f0297debc960f8b0d36a.svg";

/***/ }),

/***/ "../../\u0000#WEB/resturant/src/media/whatsapp.svg":
/*!****************************************************!*\
  !*** ../../ #WEB/resturant/src/media/whatsapp.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "876a6a3247a43f5de36e.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("../../\u0000#WEB/resturant/src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7V0NyQkE7Ozs7O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvc3JjL2NvbnRhY3RQYWdlLmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9tZW51UGFnZS5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvc3JjL2luZGV4LmNzcz9iMmM4Iiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImltcG9ydCB3ZWxjb21lcGhvdG8gZnJvbSAnLi9tZWRpYS93ZWxjb21lLnN2ZydcclxuaW1wb3J0IG1lbnVQYWdlIGZyb20gXCIuL21lbnVQYWdlXCI7XHJcbmltcG9ydCBob21lcGFnZUxpbmsgZnJvbSAnLi9pbmRleC5qcydcclxuXHJcblxyXG5jb25zdCBjb250YWN0ID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgIFxyXG4gICAgbGV0IHdlbGNvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbndlbGNvbWUuY2xhc3NMaXN0LmFkZChcIndlbGNvbWVcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWUpXHJcblxyXG4gICAgbGV0IGhvbWVwYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5ob21lcGFnZS5jbGFzc0xpc3QuYWRkKFwibWVudVwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKGhvbWVwYWdlKVxyXG5ob21lcGFnZS50ZXh0Q29udGVudCA9IFwiaG9tZXBhZ2VcIlxyXG5ob21lcGFnZS5zdHlsZSA9IFwid2lkdGg6IDgwcHg7IGhlaWdodDo4MHB4OyBib3JkZXItcmFkaXVzOjUwcHg7ICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbiAgICAgXHJcbmxldCB3ZWxjb21lSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxyXG53ZWxjb21lSW1nLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lSW1nXCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQod2VsY29tZUltZylcclxud2VsY29tZUltZy5zcmMgPSB3ZWxjb21lcGhvdG9cclxuXHJcbmxldCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5tZW51LmNsYXNzTGlzdC5hZGQoXCJjb250YWN0XCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQobWVudSlcclxubWVudS50ZXh0Q29udGVudCA9IFwibWVudVwiXHJcbm1lbnUuc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbi8vY29udGFjdC5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwiY29udGFjdFBhZ2UoKVwiKVxyXG5cclxubGV0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcclxuZm9ybS5jbGFzc0xpc3QuYWRkKCdmb3JtJylcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pXHJcblxyXG5sZXQgbmFtZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG5mb3JtLmFwcGVuZENoaWxkKG5hbWVMYWJlbClcclxubmFtZUxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIm5hbWVcIilcclxubmFtZUxhYmVsLnRleHRDb250ZW50ID0gXCIgWU9VUiBOQU1FXCJcclxuXHJcbmxldCBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG5uYW1lLmNsYXNzTGlzdC5hZGQoJ25hbWUnKVxyXG5uYW1lLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpXHJcbm5hbWUuc3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IDIwcHg7XCJcclxuZm9ybS5hcHBlbmRDaGlsZChuYW1lKVxyXG5sZXQgYjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpXHJcbmZvcm0uYXBwZW5kQ2hpbGQoYjEpXHJcblxyXG5sZXQgZW1haWxMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcclxuZm9ybS5hcHBlbmRDaGlsZChlbWFpbExhYmVsKVxyXG5lbWFpbExhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcImVtYWlsXCIpXHJcbmVtYWlsTGFiZWwudGV4dENvbnRlbnQgPSAnRU1BSUwnXHJcblxyXG5sZXQgZW1haWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbmVtYWlsLmNsYXNzTGlzdC5hZGQoJ2VtYWlsJylcclxuZW1haWwuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImVtYWlsXCIpXHJcbmVtYWlsLnN0eWxlID0gXCJib3JkZXItcmFkaXVzOiAyMHB4O1wiXHJcbmZvcm0uYXBwZW5kQ2hpbGQoZW1haWwpXHJcbmxldCBiMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJylcclxuZm9ybS5hcHBlbmRDaGlsZChiMilcclxuXHJcbmxldCB0ZXh0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXHJcbmZvcm0uYXBwZW5kQ2hpbGQodGV4dExhYmVsKVxyXG50ZXh0TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwidGV4dFwiKVxyXG50ZXh0TGFiZWwudGV4dENvbnRlbnQgPSBcIklOUFVUIFlPVVIgTUVTQUdFIEhFUkVcIlxyXG5cclxubGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpXHJcbnRleHQuY2xhc3NMaXN0LmFkZCgndGV4dCcpXHJcbnRleHQuc2V0QXR0cmlidXRlKFwiY29sc1wiLCBcIjUwXCIpXHJcbnRleHQuc2V0QXR0cmlidXRlKFwicm93c1wiLCBcIjIwXCIpXHJcbnRleHQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCIgWW91IGNhbiBtYWtlIHJlc2VydmV0aW9ucyBvciBzcGVhayBkaXJlY3RseSB3aXRoIHRoZSBzdG9yZSBvd25lciBvbiBhbnkgcmVsYXRlZCBpc3N1ZXNcIilcclxudGV4dC5zdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMjBweDtcIlxyXG5mb3JtLmFwcGVuZENoaWxkKHRleHQpXHJcbmxldCBiMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJylcclxuZm9ybS5hcHBlbmRDaGlsZChiMylcclxuXHJcbmxldCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbnN1Ym1pdC5jbGFzc0xpc3QuYWRkKCdzdWJtaXQnKVxyXG5zdWJtaXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInN1Ym1pdFwiKVxyXG5mb3JtLmFwcGVuZENoaWxkKHN1Ym1pdClcclxuXHJcbm1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xyXG4gICAgY29uc29sZS5sb2coXCJtZW51XCIpXHJcbiAgICAvKndlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6bm9uZVwiXHJcbiAgICBmb3JtLnN0eWxlID0gXCJkaXNwbGF5Om5vbmVcIiovXHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgbWVudVBhZ2UoKVxyXG59KVxyXG5ob21lcGFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhcImhvbWVwYWdlXCIpXHJcbiAgICAvKndlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6bm9uZVwiXHJcbiAgICBmb3JtLnN0eWxlID0gXCJkaXNwbGF5Om5vbmVcIiovXHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgaG9tZXBhZ2VMaW5rKClcclxuXHJcbn0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY29udGFjdCA7IiwiaW1wb3J0IG1lbnVQYWdlIGZyb20gXCIuL21lbnVQYWdlXCI7XHJcbmltcG9ydCBjb250YWN0TGluayBmcm9tIFwiLi9jb250YWN0UGFnZVwiO1xyXG5pbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IGxvZ29pbWcgZnJvbSAnLi9tZWRpYS9sb2dvLnN2ZydcclxuaW1wb3J0IHdlbGNvbWVwaG90byBmcm9tICcuL21lZGlhL3dlbGNvbWUuc3ZnJ1xyXG5pbXBvcnQgZml2ZUltZyBmcm9tICcuL21lZGlhL2ZpdmUuc3ZnJ1xyXG5pbXBvcnQgd2hhdHNhcHBJbWcgZnJvbSAnLi9tZWRpYS93aGF0c2FwcC5zdmcnXHJcbmltcG9ydCBpbnN0YWdyYW1JbWcgZnJvbSAnLi9tZWRpYS9pbnN0YWdyYW0uc3ZnJ1xyXG5pbXBvcnQgaG9tZXBhZ2VJbWcgZnJvbSAnLi9tZWRpYS9iYWNrZ3JvdW5kLmpwZydcclxuXHJcbmNvbnN0IGhvbWVwYWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbmNvbnRhaW5lci5zcmMgPSBob21lcGFnZUltZ1xyXG5cclxubGV0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImNvbnRlbnRcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnQpXHJcblxyXG5sZXQgbG9nbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcclxubG9nby5jbGFzc0xpc3QuYWRkKFwibG9nb1wiKVxyXG5jb250ZW50LmFwcGVuZENoaWxkKGxvZ28pXHJcbmxvZ28uc3JjID0gbG9nb2ltZ1xyXG5sb2dvLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsXCI4MHB4XCIpXHJcblxyXG5sZXQgbG9nb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxubG9nb1RleHQuY2xhc3NMaXN0LmFkZChcImxvZ29UZXh0XCIpXHJcbmNvbnRlbnQuYXBwZW5kQ2hpbGQobG9nb1RleHQpXHJcbmxvZ29UZXh0LnRleHRDb250ZW50ID0gXCJFUk9TIFBBTEFDRVwiO1xyXG5cclxubGV0IHN1YnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcclxuc3VidGV4dC5jbGFzc0xpc3QuYWRkKFwic3VidGV4dFwiKVxyXG5jb250ZW50LmFwcGVuZENoaWxkKHN1YnRleHQpXHJcbnN1YnRleHQudGV4dENvbnRlbnQgPSBcIkhvbWUgb2YgdGhlIGJlc3Qgbm9vZGxlc1wiO1xyXG5cclxubGV0IHdlbGNvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbndlbGNvbWUuY2xhc3NMaXN0LmFkZChcIndlbGNvbWVcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWUpXHJcblxyXG5cclxuXHJcbmxldCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5tZW51LmNsYXNzTGlzdC5hZGQoXCJtZW51XCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQobWVudSlcclxubWVudS50ZXh0Q29udGVudCA9IFwibWVudVwiXHJcbm1lbnUuc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NCwgMTIyLCA0MiwgMC43KTtcIlxyXG4vL21lbnUuc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBcIm1lbnVQYWdlKClcIilcclxuXHJcbmxldCB3ZWxjb21lSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxyXG53ZWxjb21lSW1nLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lSW1nXCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQod2VsY29tZUltZylcclxud2VsY29tZUltZy5zcmMgPSB3ZWxjb21lcGhvdG9cclxuXHJcbmxldCBjb250YWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5jb250YWN0LmNsYXNzTGlzdC5hZGQoXCJjb250YWN0XCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQoY29udGFjdClcclxuY29udGFjdC50ZXh0Q29udGVudCA9IFwiY29udGFjdFwiXHJcbmNvbnRhY3Quc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbi8vY29udGFjdC5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwiY29udGFjdFBhZ2UoKVwiKVxyXG5cclxubGV0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbnRleHQuY2xhc3NMaXN0LmFkZChcInRleHRcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKHRleHQpXHJcblxyXG5sZXQgdGV4dE9uZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbnRleHRPbmUuY2xhc3NMaXN0LmFkZChcInRleHRPbmVcIilcclxudGV4dC5hcHBlbmRDaGlsZCh0ZXh0T25lKVxyXG50ZXh0T25lLnRleHRDb250ZW50ID0gXCJpbnRybyB0byB0aGUgZXN0YWJsaXNobWVudFwiXHJcbnRleHRPbmUuc3R5bGUgPSBcIndpZHRoOiAzMDBweDsgaGVpZ2h0OjIwMHB4OyBib3JkZXItcmFkaXVzOjEwcHg7IGJhY2tncm91bmQtY29sb3I6IHJnYigxODQsIDEyMiwgNDIsIDAuNyk7XCJcclxuXHJcbmxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5saW5rLmNsYXNzTGlzdC5hZGQoXCJsaW5rXCIpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChsaW5rKVxyXG5cclxubGV0IHBvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5wb3N0LmNsYXNzTGlzdC5hZGQoXCJwb3N0XCIpXHJcbmxpbmsuYXBwZW5kQ2hpbGQocG9zdClcclxuXHJcbmxldCBwb3N0MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbnBvc3QxLmNsYXNzTGlzdC5hZGQoXCJwb3N0MVwiKVxyXG5wb3N0LmFwcGVuZENoaWxkKHBvc3QxKVxyXG5wb3N0MS5zcmMgPSB3aGF0c2FwcEltZ1xyXG5wb3N0MS5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjgwcHhcIilcclxuXHJcbmxldCBwb3N0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbnBvc3QyLmNsYXNzTGlzdC5hZGQoXCJwb3N0MlwiKVxyXG5wb3N0LmFwcGVuZENoaWxkKHBvc3QyKVxyXG5wb3N0Mi5zcmM9IGluc3RhZ3JhbUltZ1xyXG5wb3N0Mi5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCBcIjUwcHhcIilcclxucG9zdDIuc3R5bGUgPSBcIm1hcmdpbi1yaWdodDogMjBweDtcIlxyXG5cclxubGV0IHBvc3QzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcclxucG9zdDMuY2xhc3NMaXN0LmFkZChcInBvc3QzXCIpXHJcbnBvc3QuYXBwZW5kQ2hpbGQocG9zdDMpXHJcbnBvc3QzLnNyYyA9IGZpdmVJbWdcclxucG9zdDMuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCI1MHB4XCIpXHJcbnBvc3QzLnN0eWxlID0gXCJtYXJnaW4tcmlnaHQ6IDIwcHg7XCJcclxuXHJcblxyXG5tZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgIGNvbnNvbGUubG9nKFwibWVudVwiKVxyXG4gICAgLypjb250ZW50LnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiXHJcbiAgICB3ZWxjb21lLnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiXHJcbiAgICB0ZXh0LnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiXHJcbiAgICBsaW5rLnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiKi9cclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBtZW51UGFnZSgpXHJcbn0pXHJcbmNvbnRhY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xyXG4gICAgY29uc29sZS5sb2coXCJjb250YWN0XCIpXHJcbiAgICAvKmNvbnRlbnQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHdlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHRleHQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIGxpbmsuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCIqL1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGNvbnRhY3RMaW5rKClcclxufSlcclxufVxyXG5ob21lcGFnZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBob21lcGFnZTtcclxuIiwiaW1wb3J0IGhvbWVwYWdlTGluayBmcm9tICcuL2luZGV4LmpzJ1xyXG5pbXBvcnQgY29udGFjdExpbmsgZnJvbSAnLi9jb250YWN0UGFnZS5qcydcclxuaW1wb3J0IHdlbGNvbWVwaG90byBmcm9tICcuL21lZGlhL3dlbGNvbWUuc3ZnJ1xyXG5pbXBvcnQgaW1nQSBmcm9tICcuL21lZGlhL2ltZzEuanBnJ1xyXG5pbXBvcnQgaW1nQiBmcm9tICcuL21lZGlhL2ltZzIuanBnJ1xyXG5pbXBvcnQgaW1nQyBmcm9tICcuL21lZGlhL2ltZzMuanBnJ1xyXG5pbXBvcnQgaW1nRCBmcm9tICcuL21lZGlhL2ltZzQuanBnJ1xyXG5pbXBvcnQgaW1nRSBmcm9tICcuL21lZGlhL2ltZzUuanBnJ1xyXG5cclxuXHJcbmNvbnN0IG1lbnVQYWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgIFxyXG4gICAgbGV0IHdlbGNvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbndlbGNvbWUuY2xhc3NMaXN0LmFkZChcIndlbGNvbWVcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWUpXHJcblxyXG4gICAgbGV0IGhvbWVwYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5ob21lcGFnZS5jbGFzc0xpc3QuYWRkKFwibWVudVwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKGhvbWVwYWdlKVxyXG5ob21lcGFnZS50ZXh0Q29udGVudCA9IFwiaG9tZXBhZ2VcIlxyXG5ob21lcGFnZS5zdHlsZSA9IFwid2lkdGg6IDgwcHg7IGhlaWdodDo4MHB4OyBib3JkZXItcmFkaXVzOjUwcHg7ICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbiAgICAgXHJcbmxldCB3ZWxjb21lSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxyXG53ZWxjb21lSW1nLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lSW1nXCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQod2VsY29tZUltZylcclxud2VsY29tZUltZy5zcmMgPSB3ZWxjb21lcGhvdG9cclxuXHJcbmxldCBjb250YWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5jb250YWN0LmNsYXNzTGlzdC5hZGQoXCJjb250YWN0XCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQoY29udGFjdClcclxuY29udGFjdC50ZXh0Q29udGVudCA9IFwiY29udGFjdFwiXHJcbmNvbnRhY3Quc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbi8vY29udGFjdC5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwiY29udGFjdFBhZ2UoKVwiKVxyXG4gICAgXHJcbmxldCBjb250ZW50TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuY29udGVudE1lbnUuIGNsYXNzTGlzdC5hZGQoXCJjb250ZW50TWVudVwiKVxyXG5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudE1lbnUpXHJcblxyXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKVxyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xyXG4gICAgY29udGVudE1lbnUuYXBwZW5kQ2hpbGQoaGVhZGVyKVxyXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCIgTUVOVSBMSVNUXCJcclxuXHJcbiAgICAgICAgbGV0IGNvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVyLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyKVxyXG4gICAgICAgICAvL2dyaWQxXHJcbiAgICAgICAgbGV0IGNvdmVySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVySW1nLmNsYXNzTGlzdC5hZGQoJ2NvdmVySW1nJylcclxuICAgICAgICBjb3Zlci5hcHBlbmRDaGlsZChjb3ZlckltZylcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1nMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgY292ZXJJbWcuYXBwZW5kQ2hpbGQoaW1nMSlcclxuICAgICAgICBpbWcxLnNyYyA9IGltZ0FcclxuXHJcbiAgICAgICAgbGV0IGNvdmVydGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NvdmVydGV4dCcpXHJcbiAgICAgICAgY292ZXIuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0KVxyXG5cclxuICAgICAgICBsZXQgdGV4dDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICBjb3ZlcnRleHQuYXBwZW5kQ2hpbGQodGV4dDEpXHJcbiAgICAgICAgdGV4dDEuaW5uZXJIVE1MID0gXCI8aDI+aW5ncmVkaWVudHM8L2gyPiA8cD5lZ2dzPC9wPjxQPmNoaWxseTwvcD48cD52ZWdldGFibGVzPC9wPjxoMz4kMjA8L2gzPlwiXHJcbiAgICAgICAgLy9ncmlkMlxyXG4gICAgICAgIGxldCBjb3ZlcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXIyLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyMilcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzIuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyMi5hcHBlbmRDaGlsZChjb3ZlckltZzIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nMi5hcHBlbmRDaGlsZChpbWcyKVxyXG4gICAgICAgIGltZzIuc3JjID0gaW1nQlxyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0Mi5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQyJylcclxuICAgICAgICBjb3ZlcjIuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0MilcclxuXHJcbiAgICAgICAgbGV0IHRleHQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0Mi5hcHBlbmRDaGlsZCh0ZXh0MilcclxuICAgICAgICB0ZXh0Mi5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQxMDwvaDM+XCJcclxuICAgICAgICAvL2dyaWQzXHJcblxyXG4gICAgICAgIGxldCBjb3ZlcjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXIzLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyMylcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzMuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyMy5hcHBlbmRDaGlsZChjb3ZlckltZzMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nMy5hcHBlbmRDaGlsZChpbWczKVxyXG4gICAgICAgIGltZzMuc3JjID0gaW1nQ1xyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0My5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQzJylcclxuICAgICAgICBjb3ZlcjMuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0MylcclxuXHJcbiAgICAgICAgbGV0IHRleHQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0My5hcHBlbmRDaGlsZCh0ZXh0MylcclxuICAgICAgICB0ZXh0My5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQ1MDwvaDM+XCJcclxuXHJcbiAgICAgICAgLy9ncmlkNFxyXG4gICAgICAgIGxldCBjb3ZlcjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXI0LmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyNClcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzQuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyNC5hcHBlbmRDaGlsZChjb3ZlckltZzQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nNC5hcHBlbmRDaGlsZChpbWc0KVxyXG4gICAgICAgIGltZzQuc3JjID0gaW1nRFxyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0NC5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQ0JylcclxuICAgICAgICBjb3ZlcjQuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0NClcclxuXHJcbiAgICAgICAgbGV0IHRleHQ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0NC5hcHBlbmRDaGlsZCh0ZXh0NClcclxuICAgICAgICB0ZXh0NC5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQ3MDwvaDM+XCJcclxuXHJcbiAgICAgICAgLy9ncmlkNVxyXG4gICAgICAgIGxldCBjb3ZlcjUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXI1LmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyNSlcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nNT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVySW1nNS5jbGFzc0xpc3QuYWRkKCdjb3ZlckltZycpXHJcbiAgICAgICAgY292ZXI1LmFwcGVuZENoaWxkKGNvdmVySW1nNSlcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1nNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgY292ZXJJbWc1LmFwcGVuZENoaWxkKGltZzUpXHJcbiAgICAgICAgaW1nNS5zcmMgPSBpbWdFXHJcblxyXG4gICAgICAgIGxldCBjb3ZlcnRleHQ1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBjb3ZlcnRleHQ1LmNsYXNzTGlzdC5hZGQoJ2NvdmVydGV4dDUnKVxyXG4gICAgICAgIGNvdmVyNS5hcHBlbmRDaGlsZChjb3ZlcnRleHQ1KVxyXG5cclxuICAgICAgICBsZXQgdGV4dDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICBjb3ZlcnRleHQ1LmFwcGVuZENoaWxkKHRleHQ1KVxyXG4gICAgICAgIHRleHQ1LmlubmVySFRNTCA9IFwiPGgyPmluZ3JlZGllbnRzPC9oMj4gPHA+ZWdnczwvcD48UD5jaGlsbHk8L3A+PHA+dmVnZXRhYmxlczwvcD48aDM+JDQwPC9oMz5cIlxyXG5cclxuXHJcbiAgICAgICAgaG9tZXBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhvbWVwYWdlXCIpXHJcbiAgICAgICAgICAgIGhvbWVwYWdlTGluaygpO1xyXG4gICAgICAgICAgICAvKndlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgICAgICAgICAgY29udGVudE1lbnUuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCIqL1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29udGFjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29udGFjdFwiKVxyXG4gICAgICAgICAgICBjb250YWN0TGluaygpXHJcbiAgICAgICAgICAgLyogd2VsY29tZS5zdHlsZSA9IFwiZGlzcGxheTogbm9uZTtcIlxyXG4gICAgICAgICAgICBjb250ZW50TWVudS5zdHlsZSA9IFwiZGlzcGxheTogbm9uZTtcIiovXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWVudVBhZ2U7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIm1lZGlhL2JhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keXtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6Y292ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXHJcXG4gICAgXFxyXFxufVxcclxcbiNjb250YWluZXJ7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uY29udGVudHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi53ZWxjb21le1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBcXHJcXG5cXHJcXG59XFxyXFxuLndlbGNvbWVJbWd7XFxyXFxuICAgIHdpZHRoOiAxMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAxNTBweDtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggM3MgZWFzZS1pbiwgdHJhbnNmb3JtIDJzIGVhc2UtaW47XFxyXFxuICAgIFxcclxcbn1cXHJcXG4ud2VsY29tZUltZzpob3ZlcntcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbn1cXHJcXG4ubWVudTpob3ZlcntcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuLmNvbnRhY3Q6aG92ZXJ7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHdoaXRlc21va2U7XFxyXFxufVxcclxcbi5saW5re1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuXFxyXFxufVxcclxcbi5wb3N0e1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG4vKi0tLS0tLW1lbnUtLS0tLS0tLSovXFxyXFxuLmNvbnRlbnRNZW51e1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY292ZXJ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDEwcHg7XFxyXFxufVxcclxcbi5jb3ZlckltZz5pbWd7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gICAgc2l6ZTogY292ZXI7XFxyXFxufVxcclxcbmgze1xcclxcbiAgICBjb2xvcjogYW50aXF1ZXdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4vKi0tY29udGFjdC0tLT4qL1xcclxcbi5mb3Jte1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBnYXA6IDEwcHg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDIwcHg7XFxyXFxufVxcclxcbi5zdWJtaXR7XFxyXFxuICAgIGNvbG9yOiBhbnRpcXVld2hpdGU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODQsIDEyMiwgNDIsIDAuNyk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsVUFBVTtJQUNWLG1EQUFxQztJQUNyQyxxQkFBcUI7SUFDckIsMkJBQTJCO0lBQzNCLDRCQUE0Qjs7QUFFaEM7QUFDQTs7SUFFSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7QUFDdkI7QUFDQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQix1QkFBdUI7OztBQUczQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixrREFBa0Q7O0FBRXREO0FBQ0E7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksNEJBQTRCO0FBQ2hDO0FBQ0E7SUFDSSw0QkFBNEI7QUFDaEM7QUFDQTtJQUNJLGtCQUFrQjs7QUFFdEI7QUFDQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7R0FDcEIsdUJBQXVCO0FBQzFCO0FBQ0EscUJBQXFCO0FBQ3JCO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixTQUFTO0FBQ2I7QUFDQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFdBQVc7QUFDZjtBQUNBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBLGdCQUFnQjtBQUNoQjtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsU0FBUztJQUNULHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLHdDQUF3QztJQUN4QyxrQkFBa0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keXtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kOiB1cmwobWVkaWEvYmFja2dyb3VuZC5qcGcpO1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6Y292ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gICAgYmFja2dyb3VuZC1hdHRhY2htZW50OiBmaXhlZDtcXHJcXG4gICAgXFxyXFxufVxcclxcbiNjb250YWluZXJ7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4uY29udGVudHtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcbi53ZWxjb21le1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBcXHJcXG5cXHJcXG59XFxyXFxuLndlbGNvbWVJbWd7XFxyXFxuICAgIHdpZHRoOiAxMzBweDtcXHJcXG4gICAgaGVpZ2h0OiAxNTBweDtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggM3MgZWFzZS1pbiwgdHJhbnNmb3JtIDJzIGVhc2UtaW47XFxyXFxuICAgIFxcclxcbn1cXHJcXG4ud2VsY29tZUltZzpob3ZlcntcXHJcXG4gICAgd2lkdGg6IDE1MHB4O1xcclxcbiAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbn1cXHJcXG4ubWVudTpob3ZlcntcXHJcXG4gICAgYm9yZGVyOiA0cHggc29saWQgd2hpdGVzbW9rZTtcXHJcXG59XFxyXFxuLmNvbnRhY3Q6aG92ZXJ7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHdoaXRlc21va2U7XFxyXFxufVxcclxcbi5saW5re1xcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuXFxyXFxufVxcclxcbi5wb3N0e1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG4vKi0tLS0tLW1lbnUtLS0tLS0tLSovXFxyXFxuLmNvbnRlbnRNZW51e1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY292ZXJ7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDEwcHg7XFxyXFxufVxcclxcbi5jb3ZlckltZz5pbWd7XFxyXFxuICAgIHdpZHRoOiAzMDBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gICAgc2l6ZTogY292ZXI7XFxyXFxufVxcclxcbmgze1xcclxcbiAgICBjb2xvcjogYW50aXF1ZXdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4vKi0tY29udGFjdC0tLT4qL1xcclxcbi5mb3Jte1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBnYXA6IDEwcHg7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBtYXJnaW46IDIwcHg7XFxyXFxufVxcclxcbi5zdWJtaXR7XFxyXFxuICAgIGNvbG9yOiBhbnRpcXVld2hpdGU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODQsIDEyMiwgNDIsIDAuNyk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vXFx1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL1xcdTAwMDAjV0VCL3Jlc3R1cmFudC9zcmMvaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vXFx1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uLy4uL1xcdTAwMDAjV0VCL3Jlc3R1cmFudC9zcmMvaW5kZXguY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4uLy4uL1xcdTAwMDAjV0VCL3Jlc3R1cmFudC9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=