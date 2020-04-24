
document.addEventListener("DOMContentLoaded", e => { 

const inputField = document.querySelector("#search-input");
const searchIcon = document.querySelector("#search");
const menu = document.querySelector(".menu-section");
const liste = document.querySelectorAll(".links");
const naslov = document.querySelector(".heading");
const prevdef = document.querySelector("#prevdef");
const hamb_menu = document.querySelector(".menu");
const hamb_icon = document.querySelector(".hamburger");
const close_icon = document.querySelector(".close");

// Debounce function
 
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

// Prevent default
document.querySelectorAll("a")
.forEach(link => link.addEventListener("click",(e)=>{
    e.preventDefault();
    }) )
 
// Hamburger menu edit
 
 hamb_icon.addEventListener("click",()=>{
     hamb_menu.classList.add("appear_menu"); 
 })

 // When you click off the menu, close it

 window.addEventListener("click",(e)=>{ 
    let lijevo = innerWidth*0.5; 
     if(e.clientX>lijevo) 
        hamb_menu.classList.remove("appear_menu"); 
 })

 // Window resize

 window.addEventListener("resize",()=>{
     if(innerWidth>880)
        hamb_menu.classList.remove("appear_menu");
 })
 
 // close menu on click X

 close_icon.addEventListener("click",()=>{
    hamb_menu.classList.remove("appear_menu"); 
 })

// All links to white on hover 

menu.addEventListener("mouseover",()=>{
    liste.forEach(list => list.style.color = "white");
    inputField.style.border = "1px solid white";
    searchIcon.style.color = "white";
})
menu.addEventListener("mouseleave",()=>{
    let udaljenost = window.pageYOffset;
    if(udaljenost<300) {
        liste.forEach(list => list.style.color = "black");
        inputField.style.border = "1px solid black";
        searchIcon.style.color = "black";
    }
})

// Input field ( search bar )

searchIcon.addEventListener("click", ()=> { 
       if(inputField.classList.contains("active2")) { 
        inputField.value="";
        inputField.classList.remove('active2');
    } else {
    inputField.classList.add('active2'); }
    // short version
    searchIcon.classList.contains("move") ?  searchIcon.classList.remove('move') :
    searchIcon.classList.add('move');
})  

document.addEventListener("click",()=>{
    if(inputField.value!="" && inputField !== document.activeElement) {
       inputField.value = "";
       inputField.classList.remove('active2');
       searchIcon.classList.remove('move');
    } 
})

// Menu bar on scroll

function navbar(e){
    let udaljenost = window.pageYOffset;
    if(udaljenost>300) {
        menu.classList.add("change"); 
        liste.forEach(lista => lista.style.color="white");
        liste.forEach(lista => lista.style.fontWeight="normal");
        searchIcon.style.color = "white"; 
        inputField.style.border = "1px solid white";

    }  else {
       menu.classList.remove("change");  
       liste.forEach(lista => lista.style.color="black");
       liste.forEach(lista => lista.style.fontWeight="bold");
       searchIcon.style.color = "black";
       inputField.style.border = "1px solid black";
    }
    if(udaljenost>600)
        document.querySelector("#scaleup").style.transform = "scale(1)"; 
};

window.addEventListener("scroll", debounce(navbar,100));

// Opacity reduces on landingpage  as we scroll 

function reduceOp(e){ 
  let udaljenost = window.pageYOffset;
  let reduceOpacity = 1; 
  (udaljenost>0) ?
  document.querySelector(".hero-section").style.opacity 
  = (reduceOpacity-(udaljenost/600)) : 
  document.querySelector(".hero-section").style.opacity = 1;    
}
window.addEventListener("scroll", debounce(reduceOp,100));

// Center text jumps out and in

function move(e){
        
       let udaljenost = window.pageYOffset;

       if(udaljenost>200) 
        naslov.style.transform = "scale(0)";
      
       if(udaljenost<120)
        naslov.style.transform = "scale(1)";
      
}

window.addEventListener("scroll", debounce(move,100));

// Scroll to next section button click 

document.querySelector("#gotop").addEventListener("click",()=>{
  window.scroll({
    top : 0,
    left : 0,
    behavior : 'smooth'
}); 
})
document.querySelector("#ab").addEventListener("click",()=>{
  window.scrollTo(0,window.innerHeight*3);
})
document.querySelector("#ret").addEventListener("click",()=>{
  window.scrollTo(0,window.innerHeight*2);
})
document.querySelector("#ww").addEventListener("click",()=>{
  window.scrollTo(0,window.innerHeight);
})
prevdef.addEventListener("click",()=>{
    window.scrollTo(0,window.innerHeight);
})

// carousel retailers section 
         
    const btn_l = document.querySelector(".btn-left");
    const btn_r = document.querySelector(".btn-right");
    const slider = document.querySelector(".carousel-slider"); 
    const items = document.querySelectorAll(".carousel-item");
    const num_item = items.length - 1;
  
    let item_width = items[0].clientWidth;
    let count = 1;
    let slide_r = 1;
    let slide_l = -1;
    let active_label = document.querySelector(".carousel-label.active");
 
    function slide(direction){  
        
      active_label.classList.remove("active");     
      if(direction===slide_r)
        count++;
      else if(direction===slide_l)
        count--;
      
        if(count==num_item+1){
            count = 0;
            slider.style.transform = `translateX(${-item_width}px)`; 
            slider.style.transition = "";
          }
          if(count==-1){
            count = num_item;
            slider.style.transform = `translateX(${-num_item * item_width}px)`; 
            slider.style.transition = "";
          }

      let item = items[count];
      
      active_label = document.querySelector(`.carousel-label[for="${item.name}"]`);
      active_label.classList.add("active");     
       
      slider.style.transform = `translateX(${-count * item_width}px)`;
      slider.style.transition = "0.75s ease-out";     
    }
    
    btn_r.onclick = e => {
      slide(slide_r); 
    }
    btn_l.onclick = e => {
      slide(slide_l);
    }
      
  });
 


 