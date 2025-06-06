// Seleziona tutte le sezioni con id e tutti i link della navbar
const sezioni = document.querySelectorAll("section[id]");
// MODIFICA QUI: La selezione dei link della navbar deve ora puntare al nuovo contenitore off-canvas
const linkNavigazione = document.querySelectorAll(".offcanvas-menu .nav-link");
const logo = document.getElementById("logo");

// INIZIO NUOVE AGGIUNTE PER MENU OFF-CANVAS
// Seleziona gli elementi del menu off-canvas e l'overlay
const offcanvasMenu = document.getElementById("offcanvasMenu");
const offcanvasOverlay = document.getElementById("offcanvasOverlay");
const offcanvasToggle = document.getElementById("offcanvasToggle"); // Il bottone hamburger
const offcanvasClose = document.getElementById("offcanvasClose");   // Il bottone 'X' dentro il menu

// Funzione per gestire l'apertura e chiusura del menu off-canvas e dell'overlay
function toggleOffcanvas() {
  offcanvasMenu.classList.toggle("show");
  offcanvasOverlay.classList.toggle("show");
  document.body.classList.toggle("offcanvas-open"); // Blocca lo scroll del body
}
// FINE NUOVE AGGIUNTE PER MENU OFF-CANVAS

// Funzione per rimuovere la classe 'active' da tutti i link
function rimuoviClasseAttiva() {
  linkNavigazione.forEach((link) => link.classList.remove("active"));
}

// Funzione per impostare il link attivo in base allo scroll
function impostaAttivoAlloScroll() {
  const scrollY = window.pageYOffset;

  sezioni.forEach((sezione) => {
    const altezzaSezione = sezione.offsetHeight;
    // La posizione della sezione è influenzata dall'header fisso,
    // quindi sottraiamo la sua altezza e un margine extra.
    const posizioneSezione = sezione.offsetTop - 160;
    const idSezione = sezione.getAttribute("id");

    if (scrollY >= posizioneSezione && scrollY < posizioneSezione + altezzaSezione) {
      rimuoviClasseAttiva();
      // MODIFICA QUI: La selezione del link attivo deve ora puntare al nuovo contenitore off-canvas
      const linkAttivo = document.querySelector(`.offcanvas-menu .nav-link[href="#${idSezione}"]`);
      if (linkAttivo) {
        linkAttivo.classList.add("active");
      }
    }
  });
}

// Funzione per gestire il ridimensionamento del logo allo scroll
function gestisciRidimensionamentoLogo() {
  if (window.scrollY > 50) {
    logo.style.height = "60px";
  } else {
    logo.style.height = "90px";
  }
}

// Evento scroll per aggiornare il link attivo e il logo
window.addEventListener("scroll", () => {
  impostaAttivoAlloScroll();
  gestisciRidimensionamentoLogo();
});

// Evento click per scroll dolce dei link della navbar
linkNavigazione.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del link
    const idTarget = link.getAttribute("href").substring(1);
    const sezioneTarget = document.getElementById(idTarget);

    if (sezioneTarget) {
      // Scorre fino alla sezione, compensando l'altezza dell'header
      window.scrollTo({
        top: sezioneTarget.offsetTop - 140,
        behavior: "smooth", // Animazione di scroll fluida
      });
    }
    // AGGIUNTA QUI: Chiude il menu off-canvas dopo aver cliccato un link
    toggleOffcanvas();
  });
});

// Eventi per aprire e chiudere il menu off-canvas
// AGGIUNTE QUI: Assegna gli event listener per il toggler, il pulsante di chiusura e l'overlay
offcanvasToggle.addEventListener("click", toggleOffcanvas);
offcanvasClose.addEventListener("click", toggleOffcanvas);
offcanvasOverlay.addEventListener("click", toggleOffcanvas);


// Imposta il link attivo corretto all'apertura della pagina
window.addEventListener("load", impostaAttivoAlloScroll);