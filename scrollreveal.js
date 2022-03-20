// main tag child elements scroll reveal
ScrollReveal().reveal(".setup-text", { delay: 250, origin: "left", reset: false});
ScrollReveal().reveal(".follow-up-text", { delay: 250, origin: "bottom", reset: false});
ScrollReveal().reveal(".about-me", { delay: 250, origin: "bottom", reset: false});
ScrollReveal().reveal(".contact-me", { delay: 1000, origin: "bottom", distance: "120px" , reset: false});
ScrollReveal().reveal("#logo", { delay: 100, origin: "left", reset: false});
ScrollReveal().reveal(".drop-right:nth-child(1)", { delay: 100, origin: "top", reset: false});
ScrollReveal().reveal(".drop-right:nth-child(2)", { delay: 100, origin: "right", reset: false});

let time;
// scrollreveal each leetr of my name at a 200 milliseconds interval
for (let i = 1; i <= 9; i++) {
    time = 200 + 200*i;
    ScrollReveal().reveal(`.name-${i}`, { delay: time, origin: "right" , reset: true});
}

// scroll down indicator reveal
ScrollReveal().reveal(".scroll-indicator", { delay: 2000, origin: "right", distance: "400px" , reset: false});

// scroll reveal for contact section
ScrollReveal().reveal(".contact-rule", { delay: 2000, origin: "right", reset: false});
// scrollreveal each leetr of my name at a 200 milliseconds interval
for (let i = 1; i <= 9; i++) {
    time = 100 + 100*i;
    ScrollReveal().reveal(`.contact-${i}`, { delay: time, origin: "right", reset: true});
}
ScrollReveal().reveal(".contact-paragraph", { delay: 1000, origin: "bottom", reset: false});
ScrollReveal().reveal("#input-name", { delay: 1100, origin: "bottom", reset: false});
ScrollReveal().reveal("#input-email", { delay: 1200, origin: "bottom", reset: false});
ScrollReveal().reveal("#input-subject", { delay: 1300, origin: "bottom", reset: false});
ScrollReveal().reveal("#input-message", { delay: 1400, origin: "bottom", reset: false});
ScrollReveal().reveal("#contact-submit", { delay: 1500, origin: "bottom", reset: false});


// footer scroll reveal
ScrollReveal().reveal("#linkedin-logo", { delay: 500, distance: "100px", origin: "left", reset: false});
ScrollReveal().reveal("#github-logo", { delay: 500, distance: "100px", origin: "left", reset: false});
ScrollReveal().reveal("#facebok-logo", { delay: 500, distance: "100px", origin: "top", reset: false});
ScrollReveal().reveal("#whatsapp-logo", { delay: 500, distance: "100px", origin: "right", reset: false});
ScrollReveal().reveal("#instagram-logo", { delay: 500, distance: "100px", origin: "right", reset: false});
ScrollReveal().reveal(".footer-text", { delay: 500, origin: "bottom", reset: false});