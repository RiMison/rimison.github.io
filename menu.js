const nav = document.querySelector(".nav"); //declaração das constantes//
const btnMenu = document.querySelector(".btn-menu"); //declaração das constantes//
const menu = document.querySelector(".menu"); //declaração das constantes//

function handleButtonClick(event) { // A criação de uma função //
  if (event.type === "touchstart") event.preventDefault();
  event.stopPropagation();
  nav.classList.toggle("active"); // Adicione active caso tenha um clique e, caso não tenha remova-o//
  handleClickOutside(menu, () => { //Ela observa o menu que move a classe active caso o usuário click fora do menu//
    nav.classList.remove("active");
    setAria();
  });
  setAria();
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) { //Verificação se não possui um atributo no html chamado de data- target//
      targetElement.removeAttribute("data-target"); //Demonstra o valor do atributo data-target//
      html.removeEventListener("click", handleHTMLClick);
      html.removeEventListener("touchstart", handleHTMLClick);
      callback(); //Remove a classe active//
    }
  }
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick);
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

function setAria() {
  const isActive = nav.classList.contains("active");
  btnMenu.setAttribute("aria-expanded", isActive);
  if (isActive) {
    btnMenu.setAttribute("aria-label", "Fechar Menu");
  } else {
    btnMenu.setAttribute("aria-label", "Abrir Menu");
  }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick);