document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU ================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {

      const open = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        open
      );

    });
  }


  document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });

  });


  /* ================= REVEAL ================= */

  const reveals =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "in-view"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: .12
      }
    );


  reveals.forEach(element => {
    observer.observe(element);
  });


  /* ================= CARDS ================= */

  document
    .querySelectorAll(".details-toggle")
    .forEach(button => {

      button.addEventListener("click", () => {

        const card =
          button.closest(".service-card");

        card.classList.toggle("expanded");

        if (card.classList.contains("expanded")) {

          button.textContent =
            "Ver menos ↑";

        } else {

          button.textContent =
            "Conocer más →";

        }

      });

    });


  /* ================= ATELIER MODAL ================= */

  const modal =
    document.getElementById("atelierModal");

  const openButtons = [
    document.getElementById("openAtelier"),
    document.getElementById("openAtelier2")
  ];

  const closeButton =
    document.getElementById("closeAtelier");

  const backdrop =
    document.getElementById("modalBackdrop");


  function openAtelier() {

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeAtelier() {

    modal.classList.remove("open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  openButtons.forEach(button => {

    if (button) {
      button.addEventListener(
        "click",
        openAtelier
      );
    }

  });


  closeButton.addEventListener(
    "click",
    closeAtelier
  );


  backdrop.addEventListener(
    "click",
    closeAtelier
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("open")
      ) {

        closeAtelier();

      }

    }
  );


  /* ================= ATELIER TABS ================= */

  const choices =
    document.querySelectorAll(
      ".atelier-choice"
    );

  const panels =
    document.querySelectorAll(
      ".atelier-panel"
    );


  choices.forEach(choice => {

    choice.addEventListener(
      "click",
      () => {

        const target =
          choice.dataset.panel;

        choices.forEach(item => {
          item.classList.remove(
            "active"
          );
        });

        panels.forEach(panel => {
          panel.classList.remove(
            "active"
          );
        });

        choice.classList.add(
          "active"
        );

        document
          .getElementById(target)
          .classList.add("active");

      }
    );

  });


  /* ================= PERSONALIZACIÓN ================= */

  let selectedGarment = "";


  document
    .querySelectorAll(".custom-option")
    .forEach(option => {

      option.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".custom-option"
            )
            .forEach(item => {

              item.classList.remove(
                "selected"
              );

            });

          option.classList.add(
            "selected"
          );

          selectedGarment =
            option.dataset.garment;

        }
      );

    });


  /* ================= CONTINUAR ================= */

  const customContinue =
    document.getElementById(
      "customContinue"
    );


  customContinue.addEventListener(
    "click",
    () => {

      if (!selectedGarment) {

        alert(
          "Primero elige qué quieres diseñar ✨"
        );

        return;

      }

      document
        .querySelectorAll(
          ".atelier-choice"
        )
        .forEach(item => {

          item.classList.remove(
            "active"
          );

        });

      document
        .querySelector(
          '[data-panel="appointment"]'
        )
        .classList.add("active");


      document
        .querySelectorAll(
          ".atelier-panel"
        )
        .forEach(panel => {

          panel.classList.remove(
            "active"
          );

        });


      document
        .getElementById("appointment")
        .classList.add("active");

    }
  );


  /* ================= IR AL FORMULARIO ================= */

  const goToContact =
    document.getElementById(
      "goToContact"
    );


  goToContact.addEventListener(
    "click",
    () => {

      closeAtelier();

      const garment =
        document.getElementById(
          "garment"
        );

      if (selectedGarment) {

        garment.value =
          selectedGarment;

      }

      setTimeout(() => {

        document
          .getElementById(
            "contacto"
          )
          .scrollIntoView({
            behavior: "smooth"
          });

      }, 200);

    }
  );


  /* ================= QUIZ ================= */

  const recommendBtn =
    document.getElementById(
      "recommendBtn"
    );

  const quizResult =
    document.getElementById(
      "quizResult"
    );

  const resultTitle =
    document.getElementById(
      "resultTitle"
    );

  const resultText =
    document.getElementById(
      "resultText"
    );


  recommendBtn.addEventListener(
    "click",
    () => {

      const interest =
        document.getElementById(
          "interest"
        ).value;


      const recommendations = {

        spa: {
          title:
            "Oasis Spa ✨",

          text:
            "Tu mascota merece un momento de relajación. Explora nuestra propuesta de bienestar y cuidados."
        },

        moda: {
          title:
            "The Atelier 👗",

          text:
            "¡Esta experiencia es para ustedes! Puedes explorar nuestras colecciones o crear una pieza personalizada."
        },

        bistro: {
          title:
            "Bark & Meow Bistro ☕",

          text:
            "Un momento para compartir. Descubre nuestra propuesta gourmet pet-friendly."
        }

      };


      const result =
        recommendations[interest];


      resultTitle.textContent =
        result.title;

      resultText.textContent =
        result.text;

      quizResult.classList.add(
        "show"
      );

    }
  );


  /* ================= FAQ ================= */

  document
    .querySelectorAll(".faq-question")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const item =
            button.closest(
              ".faq-item"
            );

          const wasOpen =
            item.classList.contains(
              "open"
            );


          document
            .querySelectorAll(
              ".faq-item"
            )
            .forEach(other => {

              other.classList.remove(
                "open"
              );

            });


          if (!wasOpen) {

            item.classList.add(
              "open"
            );

          }

        }
      );

    });


  /* ================= FORMULARIO ================= */

  const form =
    document.getElementById(
      "contactForm"
    );

  const message =
    document.getElementById(
      "formMessage"
    );


  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      message.classList.add(
        "show"
      );

      message.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

    }
  );


  /* ================= BACK TOP ================= */

  const backTop =
    document.getElementById(
      "backTop"
    );


  window.addEventListener(
    "scroll",
    () => {

      if (
        window.scrollY > 500
      ) {

        backTop.classList.add(
          "visible"
        );

      } else {

        backTop.classList.remove(
          "visible"
        );

      }

    }
  );


  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* ================= AÑO ================= */

  const year =
    document.getElementById(
      "year"
    );

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }

});