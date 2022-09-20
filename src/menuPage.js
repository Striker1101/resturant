import homepageLink from './index.js'
import contactLink from './contactPage.js'
import welcomephoto from './media/welcome.svg'
import imgA from './media/img1.jpg'
import imgB from './media/img2.jpg'
import imgC from './media/img3.jpg'
import imgD from './media/img4.jpg'
import imgE from './media/img5.jpg'


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
welcomeImg.src = welcomephoto

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
        img1.src = imgA

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
        img2.src = imgB

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
        img3.src = imgC

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
        img4.src = imgD

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
        img5.src = imgE

        let covertext5 = document.createElement('div')
        covertext5.classList.add('covertext5')
        cover5.appendChild(covertext5)

        let text5 = document.createElement('p')
        covertext5.appendChild(text5)
        text5.innerHTML = "<h2>ingredients</h2> <p>eggs</p><P>chilly</p><p>vegetables</p><h3>$40</h3>"


        homepage.addEventListener("click", () =>{
            console.log("homepage")
            homepageLink();
            /*welcome.style = "display: none;"
            contentMenu.style = "display: none;"*/
            container.innerHTML = ""
        })
        contact.addEventListener("click", () =>{
            console.log("contact")
            contactLink()
           /* welcome.style = "display: none;"
            contentMenu.style = "display: none;"*/
            container.innerHTML = ""
        })
}

export default menuPage;