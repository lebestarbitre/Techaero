
function verifierReponse(choix) {

    const resultat = document.getElementById("resultat-quiz");

    if (choix === 1) {

        resultat.textContent =
            "❌ Mauvaise réponse ! Ne cliquez jamais sur un lien suspect dans un courriel. Vérifiez directement auprès de l'organisme concerné.";

        resultat.style.color = "#c62828";

    } else if (choix === 2) {

        resultat.textContent =
            "✅ Bonne réponse ! Contactez directement votre banque en utilisant son site officiel ou son numéro de téléphone.";

        resultat.style.color = "#087b42";

    } else if (choix === 3) {

        resultat.textContent =
            "❌ Mauvaise réponse ! Ne communiquez jamais votre mot de passe par courriel, même si le message semble provenir de votre banque.";

        resultat.style.color = "#c62828";

    }
}


// =========================
// DIAPORAMA TECHAERO
// =========================

const imagesGalerie = [
    {
        src: "images/ordinateur.jpg",
        legende: "Matériel informatique"
    },
    {
        src: "images/windows.jpg",
        legende: "Systèmes d'exploitation"
    },
    {
        src: "images/reseau.jpg",
        legende: "Réseaux informatiques"
    },
    {
        src: "images/cybersecurite.jpg",
        legende: "Cybersécurité"
    },
    {
        src: "images/stockage.jpg",
        legende: "Stockage informatique"
    }
];

let imageActuelle = 0;

function changerImage(direction) {

    imageActuelle =
        (imageActuelle + direction + imagesGalerie.length)
        % imagesGalerie.length;

    const image = document.getElementById("image-galerie");
    const legende = document.getElementById("legende-galerie");

    image.src = imagesGalerie[imageActuelle].src;
    image.alt = imagesGalerie[imageActuelle].legende;

    legende.textContent =
        (imageActuelle + 1) + " / " +
        imagesGalerie.length + " — " +
        imagesGalerie[imageActuelle].legende;
}


// =========================
// VISIONNEUSE PLEIN ÉCRAN
// =========================

let elementAvantVisionneuse = null;

function ouvrirVisionneuse() {
    const visionneuse = document.getElementById("visionneuse");

    elementAvantVisionneuse = document.activeElement;
    visionneuse.hidden = false;

    actualiserVisionneuse();
    document.body.style.overflow = "hidden";

    document.querySelector(".fermer-visionneuse").focus();
}

function fermerVisionneuse() {
    document.getElementById("visionneuse").hidden = true;
    document.body.style.overflow = "";

    if (elementAvantVisionneuse) {
        elementAvantVisionneuse.focus();
    }
}

function actualiserVisionneuse() {
    const image = document.getElementById("image-agrandie");
    const legende = document.getElementById("legende-agrandie");

    image.src = imagesGalerie[imageActuelle].src;
    image.alt = imagesGalerie[imageActuelle].legende;

    legende.textContent =
        (imageActuelle + 1) + " / " +
        imagesGalerie.length + " — " +
        imagesGalerie[imageActuelle].legende;
}

function naviguerVisionneuse(direction) {
    changerImage(direction);
    actualiserVisionneuse();
}

// RACCOURCIS CLAVIER

document.addEventListener("keydown", function(event) {
    const visionneuse = document.getElementById("visionneuse");

    if (!visionneuse || visionneuse.hidden) return;

    if (event.key === "Escape") {
        fermerVisionneuse();
    }

    if (event.key === "ArrowRight") {
        naviguerVisionneuse(1);
    }

    if (event.key === "ArrowLeft") {
        naviguerVisionneuse(-1);
    }

    if (event.key === "Tab") {
        const controles = [
            document.querySelector(".fermer-visionneuse"),
            document.querySelector(".visionneuse-fleche.gauche"),
            document.querySelector(".visionneuse-fleche.droite")
        ];

        const index = controles.indexOf(document.activeElement);

        if (event.shiftKey && index === 0) {
            event.preventDefault();
            controles[2].focus();
        } else if (!event.shiftKey && index === 2) {
            event.preventDefault();
            controles[0].focus();
        }
    }
});


// =========================
// LECTEURS AUDIO TECHAERO
// =========================

function basculerAudio(id) {
    const audio = document.getElementById(id);

    if (audio.paused) {
        audio.play().catch(() => {
            alert("Impossible de lire le fichier audio. Vérifiez son emplacement.");
        });
    } else {
        audio.pause();
    }
}

function arreterAudio(id) {
    const audio = document.getElementById(id);

    audio.pause();
    audio.currentTime = 0;
}

function changerVolume(id, valeur) {
    document.getElementById(id).volume = Number(valeur);
}

function deplacerAudio(id, valeur) {
    const audio = document.getElementById(id);

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = audio.duration * valeur / 100;
    }
}

function formaterTemps(secondes) {
    if (!Number.isFinite(secondes)) return "0:00";

    const minutes = Math.floor(secondes / 60);
    const reste = Math.floor(secondes % 60);

    return minutes + ":" + String(reste).padStart(2, "0");
}

["musique", "son"].forEach(function(id) {

    const audio = document.getElementById(id);

    if (!audio) return;

    const bouton = document.getElementById("bouton-" + id);
    const progression = document.getElementById("progression-" + id);
    const temps = document.getElementById("temps-" + id);

    audio.volume = 0.7;

    function actualiser() {
        const duree = audio.duration;

        progression.value =
            Number.isFinite(duree) && duree > 0
                ? audio.currentTime / duree * 100
                : 0;

        temps.textContent =
            formaterTemps(audio.currentTime) + " / " +
            formaterTemps(duree);
    }

    audio.addEventListener("timeupdate", actualiser);
    audio.addEventListener("loadedmetadata", actualiser);
    audio.addEventListener("durationchange", actualiser);

    audio.addEventListener("play", function() {
        bouton.textContent = "⏸";
    });

    audio.addEventListener("pause", function() {
        bouton.textContent = "▶";
    });

    audio.addEventListener("ended", function() {
        bouton.textContent = "▶";
        actualiser();
    });

    audio.addEventListener("error", function() {
        temps.textContent = "Fichier audio introuvable ou invalide";
    });

});


// =========================
// FORMULAIRE CONTACT TECHAERO
// =========================

const formulaireContact =
    document.getElementById("formulaire-contact");

if (formulaireContact) {

    formulaireContact.addEventListener("submit", function(event) {

        event.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        const destinataire = "guelmamif1@csdmedu.ca";

        const sujet = encodeURIComponent(
            "Message TechAero de " + nom
        );

        const contenu = encodeURIComponent(
            "Nom : " + nom + "\n" +
            "Courriel : " + email + "\n\n" +
            "Message :\n" + message
        );

        const lien =
            "mailto:" + destinataire +
            "?subject=" + sujet +
            "&body=" + contenu;

        const confirmation =
            document.getElementById("confirmation-contact");

        confirmation.textContent =
            "Votre application de messagerie va s'ouvrir. " +
            "Vérifiez le message, puis cliquez sur Envoyer.";

        confirmation.style.color = "#0878bd";

        window.location.href = lien;

    });

}
