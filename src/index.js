import menuPage from "./menuPage";
import contactLink from "./contactPage";
import './index.css';
import logoimg from './media/logo.svg'
import welcomephoto from './media/welcome.svg'
import fiveImg from './media/five.svg'
import whatsappImg from './media/whatsapp.svg'
import instagramImg from './media/instagram.svg'
import homepageImg from './media/background.jpg'

const homepage = function(){
    let container = document.querySelector('#container');
container.src = homepageImg

let content = document.createElement("div")
content.classList.add("content")
container.appendChild(content)

let logo = document.createElement("img")
logo.classList.add("logo")
content.appendChild(logo)
logo.src = logoimg
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
welcomeImg.src = welcomephoto

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
post1.src = whatsappImg
post1.setAttribute("width", "80px")

let post2 = document.createElement('img')
post2.classList.add("post2")
post.appendChild(post2)
post2.src= instagramImg
post2.setAttribute("width", "50px")
post2.style = "margin-right: 20px;"

let post3 = document.createElement('img')
post3.classList.add("post3")
post.appendChild(post3)
post3.src = fiveImg
post3.setAttribute("width", "50px")
post3.style = "margin-right: 20px;"


menu.addEventListener("click", () =>{
    console.log("menu")
    content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"
    menuPage()
})
contact.addEventListener("click", () =>{
    console.log("contact")
    content.style = "display: none;"
    welcome.style = "display: none;"
    text.style = "display: none;"
    link.style = "display: none;"
    contactLink()
})
}
homepage();
export default homepage;
