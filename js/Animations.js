const ElementsToBeAnimated = ["swipe-left-anim", "swipe-right-anim", "swipe-up-anim",
 "rotate-up-anim", "rotate-down-anim", "pop-in-anim", "rotate-left-anim"];

var AllElementsToAnimate = new Array();
const scrollBarOffset = 350;

for (let i = 0; i < ElementsToBeAnimated.length; i++) {
let currentItem_i = ElementsToBeAnimated[i];
let ItemsToAnimate = document.getElementsByClassName(currentItem_i);
    for (let j = 0; j < ItemsToAnimate.length; j++) {
        let currentItem_j = ItemsToAnimate[j];
        currentItem_j.classList.add("base-anim");
        AllElementsToAnimate.push(currentItem_j);
    }
}

function animateOnScroll() {
    for (let i = 0; i < AllElementsToAnimate.length; i++) {
        let currentElement = AllElementsToAnimate[i];
        let windowPos = window.scrollY + scrollBarOffset;
        let elementPos = currentElement.offsetTop;
            if (windowPos > elementPos) {
                if (currentElement.style.animationPlayState !== "running") {
                    currentElement.style.animationPlayState = "running";
            }
        }
    }
}

animateOnScroll();

window.onscroll = animateOnScroll;