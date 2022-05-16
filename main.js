// check if window is completely loaded, remove preloder 3 seconds later 
// the time was set to 3 seconds for development purposes
// it'll be reduced significantly before launch 
window.onload = setTimeout(() => {
    let preorder = document.getElementById("preloader");
    preorder.style.display = "none";

    // alert("This Portfolio Website is still under development");

}, 1000);

// variable to check the dropdown state
let dropDown = false;
// variable to check the previously selected theme
// theme set as "light"  by default
currentTheme = getCookie("themeColor");
// varaibale to select the dropdown icon
let dropDownIcon = document.querySelector("#drop-right");
// varaibale to select the themeIcon icon
let themeIcon = document.querySelector("#change-theme");
// variable to select logo icon
let logo = document.querySelector("#logo");

// dropdowm function
function dropRight() {
    // get selected theme
    currentTheme = getCookie("themeColor");
    // if dropdown hasnt been clicked before
    if (dropDown === false) {
        let dropDiv = document.querySelector(".drop-right-div");
        // check the selected theme, to know the color of "close icon" to display
        if (currentTheme === "light") {
            // if the theme is light, display the dark close icon
            dropDownIcon.src = "icons/dark-close.svg";
            // dropDiv.style.display = `flex`;
            dropDiv.style.padding = `20px 50px 50px`;
            for (let i = 0; i <= 100; i++) {
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        } else {
            // if the theme is dark, display the light close icon
            dropDownIcon.src = "icons/light-close.svg";
            // dropDiv.style.display = `flex`;
            dropDiv.style.padding = `20px 50px 50px`;
            for (let i = 0; i <= 100; i++) {
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        }
        // remove box shadow on nav after the drop right div slides in
        let nav = document.querySelector("nav");
        nav.style.boxShadow = "none";
        // change dropdown state
        dropDown = true;
    } else {
        let dropDiv = document.querySelector(".drop-right-div");
        // if dropdown has been clicked
        if (currentTheme === "light") {
            // if the theme is light, display the dark list icon
            dropDownIcon.src = "icons/dark-list-icon.svg";
            for (let i = 100; i >= 0; i--) {
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
            // dropDiv.style.display = `none`;
            dropDiv.style.padding = `0px`;
        } else {
            // if the theme is dark, display the light list icon
            dropDownIcon.src = "icons/light-list-icon.svg";
            for (let i = 100; i >= 0; i--) {
                let dropDiv = document.querySelector(".drop-right-div");
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
            // dropDiv.style.display = `none`;
            dropDiv.style.padding = `0px`;
        }
        
        // replace box shadow on nav after the drop right div slides out
        let nav = document.querySelector("nav");
        nav.style.boxShadow = "0px 1px 10px 1px var(--themeColor4)";
        // change dropdown state
        dropDown = false;
    }
    // console.log(dropDown);
}

// change theme function
function changeTheme() {
    // get cookie theme value
    currentTheme = getCookie("themeColor");
    // if theme is "light"
    if (currentTheme === "light") {
        // if theme is light, it is being switched to dark
        // so all the icons should be switched to the light versions
        themeIcon.src = "icons/light-mode.svg";
        logo.src = "icons/light-logo.svg";
        if (dropDown == false) {
            dropDownIcon.src = "icons/light-list-icon.svg";
        } else {
            dropDownIcon.src = "icons/light-close.svg";
        }
        // also reverse the themeColors in the CSS themeColors variables
        setThemeValue(themeColors.reverse(),  'themeColor');
        setThemeValue(inputColors.reverse(),  'inputColor');
        
        // set new cookie value afterwards
        setCookie("themeColor", "dark", 365);

        // select footer icons
        let linkedin = document.querySelector("#linkedin-logo");
        let github = document.querySelector("#github-logo");
        let facebook = document.querySelector("#facebook-logo");
        let instagram = document.querySelector("#instagram-logo");
        let footerLogo1 = document.querySelector("#footer-logo");
        let footerLogo2 = document.querySelector(".footer-logo");

        // change footer icons
        linkedin.src = "icons/light-linkedin.svg";
        github.src = "icons/light-github.svg";
        facebook.src = "icons/light-facebook.svg";
        instagram.src = "icons/light-instagram.svg";
        footerLogo1.src = "icons/light-logo.svg";
        footerLogo2.src = "icons/light-logo.svg";
        
        // select card and card wrapper
        let card = document.getElementsByClassName("card");
        let cardTextWrapper = document.getElementsByClassName("card-text-wrapper");
        let cardStyling = document.getElementsByClassName("card-styling");

        //  set card background colors
        // console.log(typeof card)
        // console.log(card)
        currentTheme = getCookie("themeColor");
        for (let index = 0; index < card.length; index++) {
            
            card[index].style.backgroundColor = inputBackgroundColor;
            cardTextWrapper[index].style.backgroundColor = inputBackgroundColor;
            cardStyling[index].src = `icons/${currentTheme}-card-base.svg`;
            
        }

        // select card emojis
        let moonEmoji = document.querySelector("#moon-emoji");
        let sunEmoji = document.querySelector("#sun-emoji");
        moonEmoji.style.display = "none ";
        sunEmoji.style.display = "inline ";
        // display sun emoji for dark theme, and make moon emoji invisible

        // switch themecolors for stackarray balls, other related code is in stackcanvas.js
        for (let j = 0; j < stackArray.length; j++) {

            stackArray[j].fontColor = colorArray[0];
            stackArray[j].ballStroke = colorArray[randomInteger(3, 6)];
            stackArray[j].ballFill = stackArray[j].ballStroke;
            
        }
        
    } else {
        // if theme is dark, it is being switched to light
        // so all the icons should be switched to the dark versions
        themeIcon.src = "icons/dark-mode.svg";
        logo.src = "icons/dark-logo.svg";
        if (dropDown == false) {
            dropDownIcon.src = "icons/dark-list-icon.svg";
        } else {
            dropDownIcon.src = "icons/dark-close.svg";
        }
        // also reverse the themeColors in the CSS themeColors variables
        setThemeValue(themeColors.reverse(),  'themeColor');
        setThemeValue(inputColors.reverse(),  'inputColor');
       
        // set new cookie value afterwards
        setCookie("themeColor", "light", 365);
        
        // select footer icons
        let linkedin = document.querySelector("#linkedin-logo");
        let github = document.querySelector("#github-logo");
        let facebook = document.querySelector("#facebook-logo");
        let instagram = document.querySelector("#instagram-logo");
        let footerLogo1 = document.querySelector("#footer-logo");
        let footerLogo2 = document.querySelector(".footer-logo");

        // change footer icons
        linkedin.src = "icons/dark-linkedin.svg";
        github.src = "icons/dark-github.svg";
        facebook.src = "icons/dark-facebook.svg";
        instagram.src = "icons/dark-instagram.svg";
        footerLogo1.src = "icons/dark-logo.svg";
        footerLogo2.src = "icons/dark-logo.svg";
        
        // select card and card wrapper
        let card = document.getElementsByClassName("card");
        let cardTextWrapper = document.getElementsByClassName("card-text-wrapper");
        let cardStyling = document.getElementsByClassName("card-styling");

        //  set card background colors
        // console.log(typeof card)
        // console.log(card)
        currentTheme = getCookie("themeColor");
        for (let index = 0; index < card.length; index++) {
            
            card[index].style.backgroundColor = inputBackgroundColor;
            cardTextWrapper[index].style.backgroundColor = inputBackgroundColor;
            cardStyling[index].src = `icons/${currentTheme}-card-base.svg`;
            
        }

        // select card emojis
        let moonEmoji = document.querySelector("#moon-emoji");
        let sunEmoji = document.querySelector("#sun-emoji");
        moonEmoji.style.display = "inline ";
        sunEmoji.style.display = "none";
        // display moon emoji for light theme, and make sun emoji invisible

        // switch themecolors for stackarray balls, other related code is in stackcanvas.js
        for (let j = 0; j < stackArray.length; j++) {
            
            stackArray[j].fontColor = colorArray[6];
            stackArray[j].ballStroke = colorArray[randomInteger(0, 3)];
            stackArray[j].ballFill = stackArray[j].ballStroke;
            
        }
        
    }

    
    // console.log(getCookie("themeColor"));
}


var lastScrollTop = 0;
// function to remove nav when scrolling down and replace it back when scrolling up 
window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    // if dropDown menu hasn't been clicked
    if (dropDown === false) {
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
            // downscroll code
            //nav.style.position = "unset";
            for (let i = 0; i < 70; i++) {
                let inv = 70 - i;
                nav.style.top = `-${i}px`;
                nav.style.height = `${inv}px`;
            }
            //   console.log("scrolling down");
        } else {
            // upscroll code
            for (let i = 0; i < 70; i++) {
                let inv = 70 - i;
                nav.style.top = `-${inv}px`;
                nav.style.height = `${i}px`;
            }
            // console.log("scrolling up");
        }
        //if st is less than or equal to 0, let lastScrollTop be equal to 0, else let it be equal to st
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    } else {
        nav.style.top = `0px`;
        nav.style.height = `70px`;
    }
}, false);

let contactSection = document.querySelector("#contact-section");
// console.log({contactSection});

function scrollToContact() {
    contactSection.scrollIntoView({behavior: "smooth", block: "start"})
}

document.getElementById("contact-nav-link").addEventListener("click", function(event){
    event.preventDefault();
    scrollToContact();
  });