const ElementsToBeAnimated = ["swipe-left-anim", "swipe-right-anim", "swipe-up-anim", "swipe-down-anim",
 "rotate-up-anim", "rotate-down-anim", "pop-in-anim", "rotate-left-anim", "rotate-right-anim", "zoom-out-anim",
  "rotate-right-pop-in-anim"];

const invisibilityClass = "invisibility";

const heightToBeAnimatedAt = (70) / 100; //only change value in braces, it's a percent value;

class ElementToAnimate{
    constructor(Element, className, animDur){
        this.Element = Element;
        this.className = className;
        this.animDur = animDur;
        this.hasAnimationPlayed = false;
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
const currentItem_i = ElementsToBeAnimated[i];
let ItemsToAnimate = document.getElementsByClassName(currentItem_i);

    for (let j = ItemsToAnimate.length - 1; j >= 0; j--) {
        let currentItem_j = ItemsToAnimate[j];
        
        let regexp = new RegExp("([0-9]+)(\.[0-9]+)*", "g"); //finds the animation duration and cuts off the "s"
        
        let currentAnimDur = window.getComputedStyle(currentItem_j).animationDuration.match(regexp);
        if(currentAnimDur.length > 1){
            for(let k = 1; k < currentAnimDur.length; k++){
                if(currentAnimDur[k] > currentAnimDur[0]){
                    let tempSwap = currentAnimDur[0];
                    currentAnimDur[0] = currentAnimDur[k];
                    currentAnimDur[k] = tempSwap;
                }
            }
        }
        AllElementsToAnimate.push(new ElementToAnimate(currentItem_j, currentItem_i, currentAnimDur[0]));
        currentItem_j.classList.remove(currentItem_i);
        currentItem_j.classList.add(invisibilityClass);
    }
}

/*This simply puts the screen back to top once the page is reloaded.
    Not really happy with this solution. */
function scrollToTop(){
    animateOnScroll2();
    setTimeout(function(){
        window.scrollTo(0, 0);
    }, 50);
}



/* We check each element that has an animation class if it is visible
    in the lower 1/4 of the screen. If that is the case we set its
    animation state to "running" which starts the animation.*/ 
var startTime = new Date();
var EndTime = new Date();

function removeClassOnAnimEnd(AnimObject){
    AnimObject.Element.classList.remove(AnimObject.className);
    EndTime = new Date();
    console.log("Zeit Delta: " + (EndTime.getMilliseconds() - startTime.getMilliseconds()));
}



const winPos = (window.innerHeight * heightToBeAnimatedAt);
function animateOnScroll2() {
    for (let i = 0; i < AllElementsToAnimate.length; i++) {
        let currentElement = AllElementsToAnimate[i].Element;
        let elementPos = currentElement.getBoundingClientRect().top;
            if (elementPos < winPos) {
                if(AllElementsToAnimate[i].hasAnimationPlayed === false){
                    AllElementsToAnimate[i].hasAnimationPlayed = true;
                    currentElement.classList.remove(invisibilityClass);
                    currentElement.classList.add(AllElementsToAnimate[i].className);

                    startTime = new Date();
                    setTimeout(function(){
                        removeClassOnAnimEnd(AllElementsToAnimate[i]);
                    }, AllElementsToAnimate[i].animDur * 1100); //has to be 1100 so we wait a bit more.
                                                                //else we get ugly issues with animations.
                     //animDur is in seconds and i need milliseconds.
                }
                
            }else if(elementPos > window.innerHeight){
                if(AllElementsToAnimate[i].hasAnimationPlayed === true){
                    AllElementsToAnimate[i].hasAnimationPlayed = false;
                    currentElement.classList.add(invisibilityClass);
                    // currentElement.classList.remove(AllElementsToAnimate[i].className);
                }    
            }
    }
}

window.onload = scrollToTop;

window.onscroll = animateOnScroll2;

let elem = document.getElementsByClassName("plan");