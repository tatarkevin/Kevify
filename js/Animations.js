const ElementsToBeAnimated = ["swipe-left-anim", "swipe-right-anim", "swipe-up-anim", "swipe-down-anim",
 "rotate-up-anim", "rotate-down-anim", "pop-in-anim", "rotate-left-anim"];

var AllElementsToAnimate = new Array();
const scrollBarOffset = 400;
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
        AllElementsToAnimate.push(currentItem_j);
    }
}


/*This simply puts the screen back to top once the page is reloaded.
    Not really happy with this solution. */
function scrollToTop(){
    window.scrollTo(0, 0);
    animateOnScroll2();
}

/* We check each element that has an animation class if it is visible
    in the lower 1/4 of the screen. If that is the case we set its
    animation state to "running" which starts the animation.*/ 
function animateOnScroll2() {
    let winPos = (window.innerHeight * 0.80);
    // console.log("windowPos: " + (winPos));
    for (let i = 0; i < AllElementsToAnimate.length; i++) {
        let currentElement = AllElementsToAnimate[i];
        let elementPos = currentElement.getBoundingClientRect().top;
        // console.log("ElementPos: " + elementPos);
            if (elementPos < winPos) {
                if (currentElement.style.animationPlayState !== "running") {
                    currentElement.style.animationDirection = "normal";
                    currentElement.style.animationFillMode = "forwards";
                    currentElement.style.animationPlayState = "running";
                }
            }else if(elementPos > winPos){
                /*TODO: If we scroll back above the animated Element
                    i want its animation to be reset.*/
                    //they said i have to remove the class
                    //then trigger a dom reflow
                    //then set a timeout to 1ms and re-add the class
                    //to the element.
                    //Also set the animationPlayState = "paused";
                    if(currentElement.style.animationPlayState === "running"){
                        console.log("animationState: " + currentElement.style.animationPlayState)
                        let classListOfCurrentElement = currentElement.classList;
                        for(let j = 0; j < classListOfCurrentElement.length; j++){
                            if((regex).test(classListOfCurrentElement[j])){
                                const tempString = classListOfCurrentElement[j];

                                classListOfCurrentElement.remove(tempString);
                                // console.log(tempString + " removed");

                            

                                setTimeout(function(){
                                    void currentElement.offsetHeight;
                                    classListOfCurrentElement.add(tempString);
                                    currentElement.style.animationPlayState = "paused";
                                    // console.log(tempString + " added");
                                }, 1);
                            }
                        }
                    }
                    
            }
    }
    console.log("-------------------------------------------------------------------------");
}

setTimeout(scrollToTop, 50);

window.onload = scrollToTop;

window.onscroll = animateOnScroll2;



// Old function, wasn't good enough :(
/* function animateOnScroll() {
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
} */