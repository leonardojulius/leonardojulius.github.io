/* Show menu */

const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')

    })
}

/* remove menu */

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')

    });
}



/* remove menu mobile */

const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {

    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n=>n.addEventListener('click', linkAction))

/* change add shadow header */

const shadowHeader = () => {
    const header = document.getElementById('header')
    //add a class if the bottom offset is greater than 50

    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}

window.addEventListener('scroll', shadowHeader)