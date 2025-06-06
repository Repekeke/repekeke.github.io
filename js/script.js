// Seleziona tutte le sezioni con id e tutti i link della navbar
const sezioni = document.querySelectorAll("section[id]");
const linkNavigazione = document.querySelectorAll(".nav-link");
const logo = document.getElementById("logo"); // Seleziona l'elemento del logo

// Funzione per rimuovere la classe 'active' da tutti i link
function rimuoviClasseAttiva() {
  linkNavigazione.forEach((link) => link.classList.remove("active"));
}

// Funzione per impostare il link attivo in base allo scroll
function impostaAttivoAlloScroll() {
  const scrollY = window.pageYOffset;

  sezioni.forEach((sezione) => {
    const altezzaSezione = sezione.offsetHeight;
    // Calcola la posizione della sezione, compensando l'altezza dell'header fisso
    const posizioneSezione = sezione.offsetTop - 160;
    const idSezione = sezione.getAttribute("id");

    if (scrollY >= posizioneSezione && scrollY < posizioneSezione + altezzaSezione) {
      rimuoviClasseAttiva();
      const linkAttivo = document.querySelector(`.nav-link[href="#${idSezione}"]`);
      if (linkAttivo) {
        linkAttivo.classList.add("active");
      }
    }
  });
}

// Funzione per gestire il ridimensionamento del logo allo scroll
function gestisciRidimensionamentoLogo() {
  if (window.scrollY > 50) { // Se l'utente ha scrollato di più di 50 pixel
    logo.style.height = "60px"; // Riduci l'altezza del logo a 60px
  } else {
    logo.style.height = "90px"; // Altrimenti, reimposta l'altezza originale a 90px
  }
}

// Aggiunge un listener all'evento 'scroll' della finestra
// Quando l'utente scorre, vengono chiamate entrambe le funzioni:
// - per aggiornare il link attivo nella navbar
// - per ridimensionare il logo
window.addEventListener("scroll", () => {
  impostaAttivoAlloScroll();
  gestisciRidimensionamentoLogo();
});

// Aggiunge un listener per ogni link della navbar per lo scroll dolce
linkNavigazione.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del click (salto immediato)
    const idTarget = link.getAttribute("href").substring(1); // Ottiene l'ID della sezione target
    const sezioneTarget = document.getElementById(idTarget);

    if (sezioneTarget) {
      // Scorre dolcemente fino alla sezione, compensando l'altezza dell'header per una visuale ottimale
      window.scrollTo({
        top: sezioneTarget.offsetTop - 140, // 140px per compensare l'header fisso
        behavior: "smooth", // Abilita l'animazione di scroll fluida
      });
    }
  });
});

// Imposta il link attivo corretto e la dimensione del logo all'apertura della pagina
window.addEventListener("load", () => {
  impostaAttivoAlloScroll();
  gestisciRidimensionamentoLogo();
});