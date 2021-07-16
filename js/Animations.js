const ElementsToBeAnimated = ["swipe-left-anim", "swipe-right-anim", "swipe-up-anim", "swipe-down-anim",
 "rotate-up-anim", "rotate-down-anim", "pop-in-anim", "rotate-left-anim", "rotate-right-anim",
  "rotate-right-pop-in-anim"];

class ElementToAnimate{
    constructor(Element, className, animDur){
        this.Element = Element;
        this.className = className;
        this.animDur = animDur;
    }
}

var AllElementsToAnimate = new Array();
const regex = new RegExp("\-anim");

/* Since we use the transform, our animations will widen the
websites width, which results in bad layout issues.
adding the animFix class just helps to cut off the elements
once the overflow outside of the viewport */
let wrappingBodyForAnimation = document.body.innerHTML;
let newBody = '<div class="animFix">' + wrappingBodyForAnimation + "</div>";
document.body.innerHTML = newBody;


/*
This function simply finds all the Elements that
own a "anim"-class. So we find all the elements that
should be animated and store them in the "AllElementsToAnimate"-Array
*/
for (let i = 0; i < ElementsToBeAnimated.length; i++) {
let currentItem_i = ElementsToBeAnimated[i];
let ItemsToAnimate = document.getElementsByClassName(currentItem_i);
    for (let j = 0; j < ItemsToAnimate.length; j++) {
        let currentItem_j = ItemsToAnimate[j];
        let regexp = new RegExp("[0-9]+\.[0-9]+"); //finds the animation duration and cuts off the "s"
        let currentAnimDur = window.getComputedStyle(currentItem_j).animationDuration.match(regexp);
        AllElementsToAnimate.push(new ElementToAnimate(currentItem_j, currentItem_i, currentAnimDur[0]));
    }
}


/*This simply puts the screen back to top once the page is reloaded.
    Not really happy with this solution. */
function scrollToTop(){
    animateOnScroll2();
    window.scrollTo(0, 0);
}

/* We check each element that has an animation class if it is visible
    in the lower 1/4 of the screen. If that is the case we set its
    animation state to "running" which starts the animation.*/ 
var startTime = new Date();
var EndTime = new Date();

function removeClassOnAnimEnd(AnimObject){
    AnimObject.Element.classList.remove(AnimObject.className);
    AnimObject.Element.removeEventListener("animationend", removeClassOnAnimEnd);
    EndTime = new Date();
    console.log("Zeit Delta: " + (EndTime.getMilliseconds() - startTime.getMilliseconds()));
}
    
const winPos = (window.innerHeight * 0.7);
function animateOnScroll2() {
    for (let i = 0; i < AllElementsToAnimate.length; i++) {
        let currentElement = AllElementsToAnimate[i].Element;
        let elementPos = currentElement.getBoundingClientRect().top;
            if (elementPos < winPos) {
                if (currentElement.style.animationPlayState !== "running") {
                    currentElement.style.animationDirection = "normal";
                    currentElement.style.animationFillMode = "forwards";
                    currentElement.style.animationPlayState = "running";
                    startTime = new Date();
                    setTimeout(function(){
                        removeClassOnAnimEnd(AllElementsToAnimate[i]);
                    }, AllElementsToAnimate[i].animDur * 1100); //animDur is in seconds and i need milliseconds.
                }

            }else if(elementPos > window.innerHeight){
                if(currentElement.style.animationPlayState === "running"){
                    let classListOfCurrentElement = currentElement.classList;
                        void currentElement.offsetHeight;
                        classListOfCurrentElement.add(AllElementsToAnimate[i].className);
                        currentElement.style.animationPlayState = "paused";
                    }
                }    
    }
    console.log("-------------------------------------------------------------------------");
}

setTimeout(scrollToTop, 100);

window.onscroll = animateOnScroll2;


let elem = document.getElementsByClassName("plan");
console.log(elem[0].classList[0]);