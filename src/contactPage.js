import welcomephoto from './media/welcome.svg'
import menuPage from "./menuPage";
import homepageLink from './index.js'


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
welcomeImg.src = welcomephoto

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
    menuPage()
})
homepage.addEventListener("click", () =>{
    console.log("homepage")
    welcome.style = "display:none"
    form.style = "display:none"
    homepageLink()

})
}
export default contact ;