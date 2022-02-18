// check if window is completely loaded, remove preloder 3 seconds later 
// the time was set to 3 seconds for development purposes
// it'll be reduced significantly before launch 
window.onload = setTimeout(() => {
    let preorder = document.getElementById("preloader");
    preorder.style.display = "none";
}, 1000);

// variable to check the dropdown state
let dropDown = false;
// variable to check the previously selected theme
// theme set as "light"  by default
let currentTheme = getCookie("themeColor");
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
        // check the selected theme, to know the color of "close icon" to display
        if (currentTheme === "light") {
            // if the theme is light, display the dark close icon
            dropDownIcon.src = "icons/dark-close.svg";
            for (let i = 0; i <= 100; i++) {
                let dropDiv = document.querySelector(".drop-right-div");
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        } else {
            // if the theme is dark, display the light close icon
            dropDownIcon.src = "icons/light-close.svg";
            for (let i = 0; i <= 100; i++) {
                let dropDiv = document.querySelector(".drop-right-div");
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        }
        // change dropdown state
        dropDown = true;
    } else {
        // if dropdown has been clicked
        if (currentTheme === "light") {
            // if the theme is light, display the dark list icon
            dropDownIcon.src = "icons/dark-list-icon.svg";
            for (let i = 100; i >= 0; i--) {
                let dropDiv = document.querySelector(".drop-right-div");
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        } else {
            // if the theme is dark, display the light list icon
            dropDownIcon.src = "icons/light-list-icon.svg";
            for (let i = 100; i >= 0; i--) {
                let dropDiv = document.querySelector(".drop-right-div");
                let inv = 100 - i;
                dropDiv.style.width = `${i}%`;
                dropDiv.style.left = `${inv}%`;
            }
        }
        // change dropdown state
        dropDown = false;
    }
    console.log(dropDown);
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
        setThemeValue(themeColors.reverse());
        // set new cookie value afterwards
        setCookie("themeColor", "dark", 365);
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
        setThemeValue(themeColors.reverse());
        // set new cookie value afterwards
        setCookie("themeColor", "light", 365);
    }
    console.log(getCookie("themeColor"));
}

