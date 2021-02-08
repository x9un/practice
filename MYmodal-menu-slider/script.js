const toggle = document.getElementById('toggle');//the button make navbar toggled
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const navbar = document.getElementById('navbar');

// This function closes navbar if user clicks anywhere outside of navbar once it's opened
// Does not leave unused event listeners on
// It's messy, but it works

function closeNavbar(e){
  if(
    document.body.classList.contains('show-nav')&& //when navbar shows
    e.target!==toggle&&//not trgger the toggle obj
    !toggle.contains(e.target)&&
    e.target!==navbar&& //not trigg;e the navbar obj
    !navbar.contains(e.target)
  ){
    document.body.classList.toggle('show-nav');
    document.body.removeEventListener('click',closeNavbar);
  }else if(!document.body.classList.contains('show-nav')){
    document.body.removeEventListener('click',closeNavbar);
  }
}

//toggle nav
toggle.addEventListener('click',()=>{
  document.body.classList.toggle('show-nav');
  document.body.addEventListener('click',closeNavbar);
});

//show modal
open.addEventListener('click',()=>modal.classList.add('show-modal'));

//hide modal
close.addEventListener('click',()=> modal.classList.remove('show-modal'));

//hide modal on outside click
window.addEventListener('click',e=>e.target==modal?modal.classList.remove('show-modal'):false);