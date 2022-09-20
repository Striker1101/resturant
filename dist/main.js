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


menu.addEventListener("click", () =>{
    console.log("menu")
    welcome.style = "display:none"
    form.style = "display:none"
    ;(0,_menuPage__WEBPACK_IMPORTED_MODULE_1__["default"])()
})
homepage.addEventListener("click", () =>{
    console.log("homepage")
    welcome.style = "display:none"
    form.style = "display:none"
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
    content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"
    ;(0,_menuPage__WEBPACK_IMPORTED_MODULE_0__["default"])()
})
contact.addEventListener("click", () =>{
    console.log("contact")
    content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"
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
            welcome.style = "display: none;"
            contentMenu.style = "display: none;"
        })
        contact.addEventListener("click", () =>{
            console.log("contact")
            ;(0,_contactPage_js__WEBPACK_IMPORTED_MODULE_1__["default"])()
            welcome.style = "display: none;"
            contentMenu.style = "display: none;"
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
___CSS_LOADER_EXPORT___.push([module.id, "body{\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n    background-size:cover;\r\n    background-position: center;\r\n    background-attachment: fixed;\r\n    \r\n}\r\n#container{\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.content{\r\n    margin-top: 10px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.welcome{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    position: relative;\r\n    justify-content: center;\r\n    \r\n\r\n}\r\n.welcomeImg{\r\n    width: 130px;\r\n    height: 150px;\r\n    transition: width 3s ease-in, transform 2s ease-in;\r\n    \r\n}\r\n.welcomeImg:hover{\r\n    width: 150px;\r\n    height: 200px;\r\n    transform: rotate(360deg);\r\n}\r\n.menu:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.contact:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.link{\r\n    position: relative;\r\n\r\n}\r\n.post{\r\n    display: flex;\r\n    flex-direction: row;\r\n   justify-content: center;\r\n}\r\n/*------menu--------*/\r\n.contentMenu{\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 15px;\r\n}\r\n\r\n.cover{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n.coverImg>img{\r\n    width: 300px;\r\n    height: 200px;\r\n    border-radius: 20px;\r\n    size: cover;\r\n}\r\nh3{\r\n    color: antiquewhite;\r\n}\r\n\r\n/*--contact--->*/\r\n.form{\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 30px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,mDAAqC;IACrC,qBAAqB;IACrB,2BAA2B;IAC3B,4BAA4B;;AAEhC;AACA;;IAEI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;AACvB;AACA;IACI,gBAAgB;IAChB,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;AACvB;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,mBAAmB;IACnB,kBAAkB;IAClB,uBAAuB;;;AAG3B;AACA;IACI,YAAY;IACZ,aAAa;IACb,kDAAkD;;AAEtD;AACA;IACI,YAAY;IACZ,aAAa;IACb,yBAAyB;AAC7B;AACA;IACI,4BAA4B;AAChC;AACA;IACI,4BAA4B;AAChC;AACA;IACI,kBAAkB;;AAEtB;AACA;IACI,aAAa;IACb,mBAAmB;GACpB,uBAAuB;AAC1B;AACA,qBAAqB;AACrB;IACI,aAAa;IACb,sBAAsB;IACtB,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;IACnB,SAAS;AACb;AACA;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,WAAW;AACf;AACA;IACI,mBAAmB;AACvB;;AAEA,gBAAgB;AAChB;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,uBAAuB;IACvB,mBAAmB;IACnB,YAAY;AAChB","sourcesContent":["body{\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n    background: url(media/background.jpg);\r\n    background-size:cover;\r\n    background-position: center;\r\n    background-attachment: fixed;\r\n    \r\n}\r\n#container{\r\n\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.content{\r\n    margin-top: 10px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.welcome{\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    position: relative;\r\n    justify-content: center;\r\n    \r\n\r\n}\r\n.welcomeImg{\r\n    width: 130px;\r\n    height: 150px;\r\n    transition: width 3s ease-in, transform 2s ease-in;\r\n    \r\n}\r\n.welcomeImg:hover{\r\n    width: 150px;\r\n    height: 200px;\r\n    transform: rotate(360deg);\r\n}\r\n.menu:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.contact:hover{\r\n    border: 4px solid whitesmoke;\r\n}\r\n.link{\r\n    position: relative;\r\n\r\n}\r\n.post{\r\n    display: flex;\r\n    flex-direction: row;\r\n   justify-content: center;\r\n}\r\n/*------menu--------*/\r\n.contentMenu{\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 15px;\r\n}\r\n\r\n.cover{\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    align-items: center;\r\n    gap: 10px;\r\n}\r\n.coverImg>img{\r\n    width: 300px;\r\n    height: 200px;\r\n    border-radius: 20px;\r\n    size: cover;\r\n}\r\nh3{\r\n    color: antiquewhite;\r\n}\r\n\r\n/*--contact--->*/\r\n.form{\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 10px;\r\n    justify-content: center;\r\n    align-items: center;\r\n    margin: 30px;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7Ozs7O1dDckJBOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9jb250YWN0UGFnZS5qcyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvLi4vLi4vXHUwMDAwI1dFQi9yZXN0dXJhbnQvc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3R1cmFudC8uLi8uLi9cdTAwMDAjV0VCL3Jlc3R1cmFudC9zcmMvbWVudVBhZ2UuanMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50Ly4uLy4uL1x1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9pbmRleC5jc3M/YjJjOCIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9yZXN0dXJhbnQvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Jlc3R1cmFudC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmVzdHVyYW50L3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJpbXBvcnQgd2VsY29tZXBob3RvIGZyb20gJy4vbWVkaWEvd2VsY29tZS5zdmcnXHJcbmltcG9ydCBtZW51UGFnZSBmcm9tIFwiLi9tZW51UGFnZVwiO1xyXG5pbXBvcnQgaG9tZXBhZ2VMaW5rIGZyb20gJy4vaW5kZXguanMnXHJcblxyXG5cclxuY29uc3QgY29udGFjdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xyXG4gICBcclxuICAgIGxldCB3ZWxjb21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG53ZWxjb21lLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lXCIpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWxjb21lKVxyXG5cclxuICAgIGxldCBob21lcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuaG9tZXBhZ2UuY2xhc3NMaXN0LmFkZChcIm1lbnVcIilcclxud2VsY29tZS5hcHBlbmRDaGlsZChob21lcGFnZSlcclxuaG9tZXBhZ2UudGV4dENvbnRlbnQgPSBcImhvbWVwYWdlXCJcclxuaG9tZXBhZ2Uuc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NCwgMTIyLCA0MiwgMC43KTtcIlxyXG4gICAgIFxyXG5sZXQgd2VsY29tZUltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcclxud2VsY29tZUltZy5jbGFzc0xpc3QuYWRkKFwid2VsY29tZUltZ1wiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKHdlbGNvbWVJbWcpXHJcbndlbGNvbWVJbWcuc3JjID0gd2VsY29tZXBob3RvXHJcblxyXG5sZXQgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxubWVudS5jbGFzc0xpc3QuYWRkKFwiY29udGFjdFwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKG1lbnUpXHJcbm1lbnUudGV4dENvbnRlbnQgPSBcIm1lbnVcIlxyXG5tZW51LnN0eWxlID0gXCJ3aWR0aDogODBweDsgaGVpZ2h0OjgwcHg7IGJvcmRlci1yYWRpdXM6NTBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NCwgMTIyLCA0MiwgMC43KTtcIlxyXG4vL2NvbnRhY3Quc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBcImNvbnRhY3RQYWdlKClcIilcclxuXHJcbmxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXHJcbmZvcm0uY2xhc3NMaXN0LmFkZCgnZm9ybScpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JtKVxyXG5cclxubGV0IG5hbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcclxuZm9ybS5hcHBlbmRDaGlsZChuYW1lTGFiZWwpXHJcbm5hbWVMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJuYW1lXCIpXHJcbm5hbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiIFlPVVIgTkFNRVwiXHJcblxyXG5sZXQgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxubmFtZS5jbGFzc0xpc3QuYWRkKCduYW1lJylcclxubmFtZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKVxyXG5uYW1lLnN0eWxlID0gXCJib3JkZXItcmFkaXVzOiAyMHB4O1wiXHJcbmZvcm0uYXBwZW5kQ2hpbGQobmFtZSlcclxubGV0IGIxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKVxyXG5mb3JtLmFwcGVuZENoaWxkKGIxKVxyXG5cclxubGV0IGVtYWlsTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXHJcbmZvcm0uYXBwZW5kQ2hpbGQoZW1haWxMYWJlbClcclxuZW1haWxMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJlbWFpbFwiKVxyXG5lbWFpbExhYmVsLnRleHRDb250ZW50ID0gJ0VNQUlMJ1xyXG5cclxubGV0IGVtYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG5lbWFpbC5jbGFzc0xpc3QuYWRkKCdlbWFpbCcpXHJcbmVtYWlsLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJlbWFpbFwiKVxyXG5lbWFpbC5zdHlsZSA9IFwiYm9yZGVyLXJhZGl1czogMjBweDtcIlxyXG5mb3JtLmFwcGVuZENoaWxkKGVtYWlsKVxyXG5sZXQgYjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpXHJcbmZvcm0uYXBwZW5kQ2hpbGQoYjIpXHJcblxyXG5sZXQgdGV4dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG5mb3JtLmFwcGVuZENoaWxkKHRleHRMYWJlbClcclxudGV4dExhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcInRleHRcIilcclxudGV4dExhYmVsLnRleHRDb250ZW50ID0gXCJJTlBVVCBZT1VSIE1FU0FHRSBIRVJFXCJcclxuXHJcbmxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxyXG50ZXh0LmNsYXNzTGlzdC5hZGQoJ3RleHQnKVxyXG50ZXh0LnNldEF0dHJpYnV0ZShcImNvbHNcIiwgXCI1MFwiKVxyXG50ZXh0LnNldEF0dHJpYnV0ZShcInJvd3NcIiwgXCIyMFwiKVxyXG50ZXh0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiIFlvdSBjYW4gbWFrZSByZXNlcnZldGlvbnMgb3Igc3BlYWsgZGlyZWN0bHkgd2l0aCB0aGUgc3RvcmUgb3duZXIgb24gYW55IHJlbGF0ZWQgaXNzdWVzXCIpXHJcbnRleHQuc3R5bGUgPSBcImJvcmRlci1yYWRpdXM6IDIwcHg7XCJcclxuZm9ybS5hcHBlbmRDaGlsZCh0ZXh0KVxyXG5sZXQgYjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdicicpXHJcbmZvcm0uYXBwZW5kQ2hpbGQoYjMpXHJcblxyXG5cclxubWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhcIm1lbnVcIilcclxuICAgIHdlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6bm9uZVwiXHJcbiAgICBmb3JtLnN0eWxlID0gXCJkaXNwbGF5Om5vbmVcIlxyXG4gICAgbWVudVBhZ2UoKVxyXG59KVxyXG5ob21lcGFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhcImhvbWVwYWdlXCIpXHJcbiAgICB3ZWxjb21lLnN0eWxlID0gXCJkaXNwbGF5Om5vbmVcIlxyXG4gICAgZm9ybS5zdHlsZSA9IFwiZGlzcGxheTpub25lXCJcclxuICAgIGhvbWVwYWdlTGluaygpXHJcblxyXG59KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNvbnRhY3QgOyIsImltcG9ydCBtZW51UGFnZSBmcm9tIFwiLi9tZW51UGFnZVwiO1xyXG5pbXBvcnQgY29udGFjdExpbmsgZnJvbSBcIi4vY29udGFjdFBhZ2VcIjtcclxuaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcbmltcG9ydCBsb2dvaW1nIGZyb20gJy4vbWVkaWEvbG9nby5zdmcnXHJcbmltcG9ydCB3ZWxjb21lcGhvdG8gZnJvbSAnLi9tZWRpYS93ZWxjb21lLnN2ZydcclxuaW1wb3J0IGZpdmVJbWcgZnJvbSAnLi9tZWRpYS9maXZlLnN2ZydcclxuaW1wb3J0IHdoYXRzYXBwSW1nIGZyb20gJy4vbWVkaWEvd2hhdHNhcHAuc3ZnJ1xyXG5pbXBvcnQgaW5zdGFncmFtSW1nIGZyb20gJy4vbWVkaWEvaW5zdGFncmFtLnN2ZydcclxuaW1wb3J0IGhvbWVwYWdlSW1nIGZyb20gJy4vbWVkaWEvYmFja2dyb3VuZC5qcGcnXHJcblxyXG5jb25zdCBob21lcGFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xyXG5jb250YWluZXIuc3JjID0gaG9tZXBhZ2VJbWdcclxuXHJcbmxldCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG5jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJjb250ZW50XCIpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50KVxyXG5cclxubGV0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpXHJcbmxvZ28uY2xhc3NMaXN0LmFkZChcImxvZ29cIilcclxuY29udGVudC5hcHBlbmRDaGlsZChsb2dvKVxyXG5sb2dvLnNyYyA9IGxvZ29pbWdcclxubG9nby5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLFwiODBweFwiKVxyXG5cclxubGV0IGxvZ29UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbmxvZ29UZXh0LmNsYXNzTGlzdC5hZGQoXCJsb2dvVGV4dFwiKVxyXG5jb250ZW50LmFwcGVuZENoaWxkKGxvZ29UZXh0KVxyXG5sb2dvVGV4dC50ZXh0Q29udGVudCA9IFwiRVJPUyBQQUxBQ0VcIjtcclxuXHJcbmxldCBzdWJ0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbnN1YnRleHQuY2xhc3NMaXN0LmFkZChcInN1YnRleHRcIilcclxuY29udGVudC5hcHBlbmRDaGlsZChzdWJ0ZXh0KVxyXG5zdWJ0ZXh0LnRleHRDb250ZW50ID0gXCJIb21lIG9mIHRoZSBiZXN0IG5vb2RsZXNcIjtcclxuXHJcbmxldCB3ZWxjb21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG53ZWxjb21lLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lXCIpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZCh3ZWxjb21lKVxyXG5cclxuXHJcblxyXG5sZXQgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxubWVudS5jbGFzc0xpc3QuYWRkKFwibWVudVwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKG1lbnUpXHJcbm1lbnUudGV4dENvbnRlbnQgPSBcIm1lbnVcIlxyXG5tZW51LnN0eWxlID0gXCJ3aWR0aDogODBweDsgaGVpZ2h0OjgwcHg7IGJvcmRlci1yYWRpdXM6NTBweDsgIGJhY2tncm91bmQtY29sb3I6IHJnYigxODQsIDEyMiwgNDIsIDAuNyk7XCJcclxuLy9tZW51LnNldEF0dHJpYnV0ZShcIm9uY2xpY2tcIiwgXCJtZW51UGFnZSgpXCIpXHJcblxyXG5sZXQgd2VsY29tZUltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcclxud2VsY29tZUltZy5jbGFzc0xpc3QuYWRkKFwid2VsY29tZUltZ1wiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKHdlbGNvbWVJbWcpXHJcbndlbGNvbWVJbWcuc3JjID0gd2VsY29tZXBob3RvXHJcblxyXG5sZXQgY29udGFjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcclxuY29udGFjdC5jbGFzc0xpc3QuYWRkKFwiY29udGFjdFwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKGNvbnRhY3QpXHJcbmNvbnRhY3QudGV4dENvbnRlbnQgPSBcImNvbnRhY3RcIlxyXG5jb250YWN0LnN0eWxlID0gXCJ3aWR0aDogODBweDsgaGVpZ2h0OjgwcHg7IGJvcmRlci1yYWRpdXM6NTBweDsgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NCwgMTIyLCA0MiwgMC43KTtcIlxyXG4vL2NvbnRhY3Quc2V0QXR0cmlidXRlKFwib25jbGlja1wiLCBcImNvbnRhY3RQYWdlKClcIilcclxuXHJcbmxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG50ZXh0LmNsYXNzTGlzdC5hZGQoXCJ0ZXh0XCIpXHJcbmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZXh0KVxyXG5cclxubGV0IHRleHRPbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxyXG50ZXh0T25lLmNsYXNzTGlzdC5hZGQoXCJ0ZXh0T25lXCIpXHJcbnRleHQuYXBwZW5kQ2hpbGQodGV4dE9uZSlcclxudGV4dE9uZS50ZXh0Q29udGVudCA9IFwiaW50cm8gdG8gdGhlIGVzdGFibGlzaG1lbnRcIlxyXG50ZXh0T25lLnN0eWxlID0gXCJ3aWR0aDogMzAwcHg7IGhlaWdodDoyMDBweDsgYm9yZGVyLXJhZGl1czoxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcblxyXG5sZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxubGluay5jbGFzc0xpc3QuYWRkKFwibGlua1wiKVxyXG5jb250YWluZXIuYXBwZW5kQ2hpbGQobGluaylcclxuXHJcbmxldCBwb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxucG9zdC5jbGFzc0xpc3QuYWRkKFwicG9zdFwiKVxyXG5saW5rLmFwcGVuZENoaWxkKHBvc3QpXHJcblxyXG5sZXQgcG9zdDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG5wb3N0MS5jbGFzc0xpc3QuYWRkKFwicG9zdDFcIilcclxucG9zdC5hcHBlbmRDaGlsZChwb3N0MSlcclxucG9zdDEuc3JjID0gd2hhdHNhcHBJbWdcclxucG9zdDEuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCI4MHB4XCIpXHJcblxyXG5sZXQgcG9zdDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG5wb3N0Mi5jbGFzc0xpc3QuYWRkKFwicG9zdDJcIilcclxucG9zdC5hcHBlbmRDaGlsZChwb3N0MilcclxucG9zdDIuc3JjPSBpbnN0YWdyYW1JbWdcclxucG9zdDIuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgXCI1MHB4XCIpXHJcbnBvc3QyLnN0eWxlID0gXCJtYXJnaW4tcmlnaHQ6IDIwcHg7XCJcclxuXHJcbmxldCBwb3N0MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbnBvc3QzLmNsYXNzTGlzdC5hZGQoXCJwb3N0M1wiKVxyXG5wb3N0LmFwcGVuZENoaWxkKHBvc3QzKVxyXG5wb3N0My5zcmMgPSBmaXZlSW1nXHJcbnBvc3QzLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIFwiNTBweFwiKVxyXG5wb3N0My5zdHlsZSA9IFwibWFyZ2luLXJpZ2h0OiAyMHB4O1wiXHJcblxyXG5cclxubWVudS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhcIm1lbnVcIilcclxuICAgIGNvbnRlbnQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHdlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHRleHQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIGxpbmsuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIG1lbnVQYWdlKClcclxufSlcclxuY29udGFjdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XHJcbiAgICBjb25zb2xlLmxvZyhcImNvbnRhY3RcIilcclxuICAgIGNvbnRlbnQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHdlbGNvbWUuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIHRleHQuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIGxpbmsuc3R5bGUgPSBcImRpc3BsYXk6IG5vbmU7XCJcclxuICAgIGNvbnRhY3RMaW5rKClcclxufSlcclxufVxyXG5ob21lcGFnZSgpO1xyXG5leHBvcnQgZGVmYXVsdCBob21lcGFnZTtcclxuIiwiaW1wb3J0IGhvbWVwYWdlTGluayBmcm9tICcuL2luZGV4LmpzJ1xyXG5pbXBvcnQgY29udGFjdExpbmsgZnJvbSAnLi9jb250YWN0UGFnZS5qcydcclxuaW1wb3J0IHdlbGNvbWVwaG90byBmcm9tICcuL21lZGlhL3dlbGNvbWUuc3ZnJ1xyXG5pbXBvcnQgaW1nQSBmcm9tICcuL21lZGlhL2ltZzEuanBnJ1xyXG5pbXBvcnQgaW1nQiBmcm9tICcuL21lZGlhL2ltZzIuanBnJ1xyXG5pbXBvcnQgaW1nQyBmcm9tICcuL21lZGlhL2ltZzMuanBnJ1xyXG5pbXBvcnQgaW1nRCBmcm9tICcuL21lZGlhL2ltZzQuanBnJ1xyXG5pbXBvcnQgaW1nRSBmcm9tICcuL21lZGlhL2ltZzUuanBnJ1xyXG5cclxuXHJcbmNvbnN0IG1lbnVQYWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XHJcbiAgIFxyXG4gICAgbGV0IHdlbGNvbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbndlbGNvbWUuY2xhc3NMaXN0LmFkZChcIndlbGNvbWVcIilcclxuY29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWUpXHJcblxyXG4gICAgbGV0IGhvbWVwYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5ob21lcGFnZS5jbGFzc0xpc3QuYWRkKFwibWVudVwiKVxyXG53ZWxjb21lLmFwcGVuZENoaWxkKGhvbWVwYWdlKVxyXG5ob21lcGFnZS50ZXh0Q29udGVudCA9IFwiaG9tZXBhZ2VcIlxyXG5ob21lcGFnZS5zdHlsZSA9IFwid2lkdGg6IDgwcHg7IGhlaWdodDo4MHB4OyBib3JkZXItcmFkaXVzOjUwcHg7ICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbiAgICAgXHJcbmxldCB3ZWxjb21lSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxyXG53ZWxjb21lSW1nLmNsYXNzTGlzdC5hZGQoXCJ3ZWxjb21lSW1nXCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQod2VsY29tZUltZylcclxud2VsY29tZUltZy5zcmMgPSB3ZWxjb21lcGhvdG9cclxuXHJcbmxldCBjb250YWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5jb250YWN0LmNsYXNzTGlzdC5hZGQoXCJjb250YWN0XCIpXHJcbndlbGNvbWUuYXBwZW5kQ2hpbGQoY29udGFjdClcclxuY29udGFjdC50ZXh0Q29udGVudCA9IFwiY29udGFjdFwiXHJcbmNvbnRhY3Quc3R5bGUgPSBcIndpZHRoOiA4MHB4OyBoZWlnaHQ6ODBweDsgYm9yZGVyLXJhZGl1czo1MHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg0LCAxMjIsIDQyLCAwLjcpO1wiXHJcbi8vY29udGFjdC5zZXRBdHRyaWJ1dGUoXCJvbmNsaWNrXCIsIFwiY29udGFjdFBhZ2UoKVwiKVxyXG4gICAgXHJcbmxldCBjb250ZW50TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuY29udGVudE1lbnUuIGNsYXNzTGlzdC5hZGQoXCJjb250ZW50TWVudVwiKVxyXG5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudE1lbnUpXHJcblxyXG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKVxyXG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlcicpO1xyXG4gICAgY29udGVudE1lbnUuYXBwZW5kQ2hpbGQoaGVhZGVyKVxyXG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCIgTUVOVSBMSVNUXCJcclxuXHJcbiAgICAgICAgbGV0IGNvdmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVyLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyKVxyXG4gICAgICAgICAvL2dyaWQxXHJcbiAgICAgICAgbGV0IGNvdmVySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVySW1nLmNsYXNzTGlzdC5hZGQoJ2NvdmVySW1nJylcclxuICAgICAgICBjb3Zlci5hcHBlbmRDaGlsZChjb3ZlckltZylcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1nMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgY292ZXJJbWcuYXBwZW5kQ2hpbGQoaW1nMSlcclxuICAgICAgICBpbWcxLnNyYyA9IGltZ0FcclxuXHJcbiAgICAgICAgbGV0IGNvdmVydGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0LmNsYXNzTGlzdC5hZGQoJ2NvdmVydGV4dCcpXHJcbiAgICAgICAgY292ZXIuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0KVxyXG5cclxuICAgICAgICBsZXQgdGV4dDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICBjb3ZlcnRleHQuYXBwZW5kQ2hpbGQodGV4dDEpXHJcbiAgICAgICAgdGV4dDEuaW5uZXJIVE1MID0gXCI8aDI+aW5ncmVkaWVudHM8L2gyPiA8cD5lZ2dzPC9wPjxQPmNoaWxseTwvcD48cD52ZWdldGFibGVzPC9wPjxoMz4kMjA8L2gzPlwiXHJcbiAgICAgICAgLy9ncmlkMlxyXG4gICAgICAgIGxldCBjb3ZlcjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXIyLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyMilcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzIuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyMi5hcHBlbmRDaGlsZChjb3ZlckltZzIpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nMi5hcHBlbmRDaGlsZChpbWcyKVxyXG4gICAgICAgIGltZzIuc3JjID0gaW1nQlxyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0MiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0Mi5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQyJylcclxuICAgICAgICBjb3ZlcjIuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0MilcclxuXHJcbiAgICAgICAgbGV0IHRleHQyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0Mi5hcHBlbmRDaGlsZCh0ZXh0MilcclxuICAgICAgICB0ZXh0Mi5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQxMDwvaDM+XCJcclxuICAgICAgICAvL2dyaWQzXHJcblxyXG4gICAgICAgIGxldCBjb3ZlcjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXIzLmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyMylcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzMuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyMy5hcHBlbmRDaGlsZChjb3ZlckltZzMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nMy5hcHBlbmRDaGlsZChpbWczKVxyXG4gICAgICAgIGltZzMuc3JjID0gaW1nQ1xyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0MyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0My5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQzJylcclxuICAgICAgICBjb3ZlcjMuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0MylcclxuXHJcbiAgICAgICAgbGV0IHRleHQzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0My5hcHBlbmRDaGlsZCh0ZXh0MylcclxuICAgICAgICB0ZXh0My5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQ1MDwvaDM+XCJcclxuXHJcbiAgICAgICAgLy9ncmlkNFxyXG4gICAgICAgIGxldCBjb3ZlcjQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXI0LmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyNClcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICBjb3ZlckltZzQuY2xhc3NMaXN0LmFkZCgnY292ZXJJbWcnKVxyXG4gICAgICAgIGNvdmVyNC5hcHBlbmRDaGlsZChjb3ZlckltZzQpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGltZzQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgICAgIGNvdmVySW1nNC5hcHBlbmRDaGlsZChpbWc0KVxyXG4gICAgICAgIGltZzQuc3JjID0gaW1nRFxyXG5cclxuICAgICAgICBsZXQgY292ZXJ0ZXh0NCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgY292ZXJ0ZXh0NC5jbGFzc0xpc3QuYWRkKCdjb3ZlcnRleHQ0JylcclxuICAgICAgICBjb3ZlcjQuYXBwZW5kQ2hpbGQoY292ZXJ0ZXh0NClcclxuXHJcbiAgICAgICAgbGV0IHRleHQ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcbiAgICAgICAgY292ZXJ0ZXh0NC5hcHBlbmRDaGlsZCh0ZXh0NClcclxuICAgICAgICB0ZXh0NC5pbm5lckhUTUwgPSBcIjxoMj5pbmdyZWRpZW50czwvaDI+IDxwPmVnZ3M8L3A+PFA+Y2hpbGx5PC9wPjxwPnZlZ2V0YWJsZXM8L3A+PGgzPiQ3MDwvaDM+XCJcclxuXHJcbiAgICAgICAgLy9ncmlkNVxyXG4gICAgICAgIGxldCBjb3ZlcjUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgY292ZXI1LmNsYXNzTGlzdC5hZGQoXCJjb3ZlclwiKVxyXG4gICAgICAgIGNvbnRlbnRNZW51LmFwcGVuZENoaWxkKGNvdmVyNSlcclxuXHJcbiAgICAgICAgbGV0IGNvdmVySW1nNT0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgICAgIGNvdmVySW1nNS5jbGFzc0xpc3QuYWRkKCdjb3ZlckltZycpXHJcbiAgICAgICAgY292ZXI1LmFwcGVuZENoaWxkKGNvdmVySW1nNSlcclxuICAgICAgICBcclxuICAgICAgICBsZXQgaW1nNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXHJcbiAgICAgICAgY292ZXJJbWc1LmFwcGVuZENoaWxkKGltZzUpXHJcbiAgICAgICAgaW1nNS5zcmMgPSBpbWdFXHJcblxyXG4gICAgICAgIGxldCBjb3ZlcnRleHQ1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgICAgICBjb3ZlcnRleHQ1LmNsYXNzTGlzdC5hZGQoJ2NvdmVydGV4dDUnKVxyXG4gICAgICAgIGNvdmVyNS5hcHBlbmRDaGlsZChjb3ZlcnRleHQ1KVxyXG5cclxuICAgICAgICBsZXQgdGV4dDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcclxuICAgICAgICBjb3ZlcnRleHQ1LmFwcGVuZENoaWxkKHRleHQ1KVxyXG4gICAgICAgIHRleHQ1LmlubmVySFRNTCA9IFwiPGgyPmluZ3JlZGllbnRzPC9oMj4gPHA+ZWdnczwvcD48UD5jaGlsbHk8L3A+PHA+dmVnZXRhYmxlczwvcD48aDM+JDQwPC9oMz5cIlxyXG5cclxuXHJcbiAgICAgICAgaG9tZXBhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhvbWVwYWdlXCIpXHJcbiAgICAgICAgICAgIGhvbWVwYWdlTGluaygpO1xyXG4gICAgICAgICAgICB3ZWxjb21lLnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiXHJcbiAgICAgICAgICAgIGNvbnRlbnRNZW51LnN0eWxlID0gXCJkaXNwbGF5OiBub25lO1wiXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb250YWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250YWN0XCIpXHJcbiAgICAgICAgICAgIGNvbnRhY3RMaW5rKClcclxuICAgICAgICAgICAgd2VsY29tZS5zdHlsZSA9IFwiZGlzcGxheTogbm9uZTtcIlxyXG4gICAgICAgICAgICBjb250ZW50TWVudS5zdHlsZSA9IFwiZGlzcGxheTogbm9uZTtcIlxyXG4gICAgICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lbnVQYWdlOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJtZWRpYS9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHl7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOmNvdmVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIFxcclxcbn1cXHJcXG4jY29udGFpbmVye1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmNvbnRlbnR7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4ud2VsY29tZXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgXFxyXFxuXFxyXFxufVxcclxcbi53ZWxjb21lSW1ne1xcclxcbiAgICB3aWR0aDogMTMwcHg7XFxyXFxuICAgIGhlaWdodDogMTUwcHg7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDNzIGVhc2UtaW4sIHRyYW5zZm9ybSAycyBlYXNlLWluO1xcclxcbiAgICBcXHJcXG59XFxyXFxuLndlbGNvbWVJbWc6aG92ZXJ7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXHJcXG59XFxyXFxuLm1lbnU6aG92ZXJ7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHdoaXRlc21va2U7XFxyXFxufVxcclxcbi5jb250YWN0OmhvdmVye1xcclxcbiAgICBib3JkZXI6IDRweCBzb2xpZCB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG4ubGlua3tcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcblxcclxcbn1cXHJcXG4ucG9zdHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuLyotLS0tLS1tZW51LS0tLS0tLS0qL1xcclxcbi5jb250ZW50TWVudXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvdmVye1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxMHB4O1xcclxcbn1cXHJcXG4uY292ZXJJbWc+aW1ne1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogMjAwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIHNpemU6IGNvdmVyO1xcclxcbn1cXHJcXG5oM3tcXHJcXG4gICAgY29sb3I6IGFudGlxdWV3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLyotLWNvbnRhY3QtLS0+Ki9cXHJcXG4uZm9ybXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxMHB4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAzMHB4O1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvaW5kZXguY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0lBQ1YsbURBQXFDO0lBQ3JDLHFCQUFxQjtJQUNyQiwyQkFBMkI7SUFDM0IsNEJBQTRCOztBQUVoQztBQUNBOztJQUVJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLHVCQUF1Qjs7O0FBRzNCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGtEQUFrRDs7QUFFdEQ7QUFDQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IseUJBQXlCO0FBQzdCO0FBQ0E7SUFDSSw0QkFBNEI7QUFDaEM7QUFDQTtJQUNJLDRCQUE0QjtBQUNoQztBQUNBO0lBQ0ksa0JBQWtCOztBQUV0QjtBQUNBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtHQUNwQix1QkFBdUI7QUFDMUI7QUFDQSxxQkFBcUI7QUFDckI7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjtBQUNBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsV0FBVztBQUNmO0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUEsZ0JBQWdCO0FBQ2hCO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixZQUFZO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHl7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKG1lZGlhL2JhY2tncm91bmQuanBnKTtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOmNvdmVyO1xcclxcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxyXFxuICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7XFxyXFxuICAgIFxcclxcbn1cXHJcXG4jY29udGFpbmVye1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuLmNvbnRlbnR7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG4ud2VsY29tZXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgXFxyXFxuXFxyXFxufVxcclxcbi53ZWxjb21lSW1ne1xcclxcbiAgICB3aWR0aDogMTMwcHg7XFxyXFxuICAgIGhlaWdodDogMTUwcHg7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDNzIGVhc2UtaW4sIHRyYW5zZm9ybSAycyBlYXNlLWluO1xcclxcbiAgICBcXHJcXG59XFxyXFxuLndlbGNvbWVJbWc6aG92ZXJ7XFxyXFxuICAgIHdpZHRoOiAxNTBweDtcXHJcXG4gICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXHJcXG59XFxyXFxuLm1lbnU6aG92ZXJ7XFxyXFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIHdoaXRlc21va2U7XFxyXFxufVxcclxcbi5jb250YWN0OmhvdmVye1xcclxcbiAgICBib3JkZXI6IDRweCBzb2xpZCB3aGl0ZXNtb2tlO1xcclxcbn1cXHJcXG4ubGlua3tcXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcblxcclxcbn1cXHJcXG4ucG9zdHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXHJcXG4gICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG59XFxyXFxuLyotLS0tLS1tZW51LS0tLS0tLS0qL1xcclxcbi5jb250ZW50TWVudXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMTVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvdmVye1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxMHB4O1xcclxcbn1cXHJcXG4uY292ZXJJbWc+aW1ne1xcclxcbiAgICB3aWR0aDogMzAwcHg7XFxyXFxuICAgIGhlaWdodDogMjAwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAgIHNpemU6IGNvdmVyO1xcclxcbn1cXHJcXG5oM3tcXHJcXG4gICAgY29sb3I6IGFudGlxdWV3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLyotLWNvbnRhY3QtLS0+Ki9cXHJcXG4uZm9ybXtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxMHB4O1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgbWFyZ2luOiAzMHB4O1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9cXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vXFx1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9cXHUwMDAwI1dFQi9yZXN0dXJhbnQvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vXFx1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi4vLi4vXFx1MDAwMCNXRUIvcmVzdHVyYW50L3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==