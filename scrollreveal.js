// main tag child elements scroll reveal
ScrollReveal().reveal(".setup-text", { delay: 250, origin: "left" });
ScrollReveal().reveal(".follow-up-text", { delay: 250, origin: "bottom" });
ScrollReveal().reveal(".about-me", { delay: 250, origin: "bottom" });
ScrollReveal().reveal(".contact-me", { delay: 750, origin: "bottom" });

let time;
// scrollreveal each leetr of my name at a 200 milliseconds interval
for (let i = 1; i <= 9; i++) {
    time = 200 + 200*i;
    ScrollReveal().reveal(`.name-${i}`, { delay: time, origin: "right" });
}

// scroll down indicator reveal
ScrollReveal().reveal(".scroll-indicator", { delay: 1000, origin: "right" });


// ScrollReveal().reveal(".dropdown-list li", { delay: 10, origin: "right", interval: 20 });

