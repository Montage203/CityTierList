// Code JavaScript pour gérer les pseudonymes, les catégories et l'avatar

// Fonction pour autoriser le glisser-déposer
function allowDrop(event) {
    event.preventDefault();
}

// Fonction pour gérer le début du glisser
function drag(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

// Fonction pour gérer la fin du glisser
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const categoryName = event.target.closest('.category').querySelector('h2').textContent;
    const categoryList = event.target.closest('.category').querySelector('.pseudonyms');
    const li = document.createElement('li');
    li.textContent = data;
    li.setAttribute('draggable', 'true');
    li.setAttribute('ondragstart', 'drag(event)');
    categoryList.appendChild(li);

    // Appel à l'API pour obtenir l'avatar du joueur
    fetchAvatar(data, li);
}

// Fonction pour ajouter un joueur
function addPlayer() {
    const input = document.getElementById('player-pseudo');
    const pseudonym = input.value.trim();
    if (pseudonym !== '') {
        const outsidePseudonymsList = document.getElementById('draggable');
        const li = document.createElement('li');
        li.textContent = pseudonym;
        li.setAttribute('draggable', 'true');
        li.setAttribute('ondragstart', 'drag(event)');
        outsidePseudonymsList.appendChild(li);

        // Appel à l'API pour obtenir l'avatar du joueur
        fetchAvatar(pseudonym, li);

        input.value = '';
    }
}

// Fonction pour basculer le mode sombre
function toggleDarkMode(checkbox) {
    const body = document.body;
    if (checkbox.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Fonction pour changer la couleur de la catégorie
function changeCategoryColor(input) {
    const categoryHeader = input.parentElement.parentElement;
    categoryHeader.style.backgroundColor = input.value;
}

// Fonction pour récupérer l'avatar via l'API
function fetchAvatar(pseudo, element) {
    const user = pseudo;
    const action = 'std';
    const direction = 3;
    const headDirection = 3;
    const gesture = 'std';
    const size = 'l';
    const headOnly = 0;
    const apiUrl = `https://api.habbocity.me/avatar_image.php?user=${user}&action=${action}&direction=${direction}&head_direction=${headDirection}&gesture=${gesture}&size=${size}&headonly=${headOnly}`;
    const avatarImage = document.createElement('img');
    avatarImage.src = apiUrl;
    avatarImage.alt = `${pseudo}'s Avatar`;
    element.appendChild(avatarImage);
}

// Fonction pour télécharger la tierlist en image
function downloadTierlist() {
    html2canvas(document.body).then(function(canvas) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const image = canvas.toDataURL('image/png');
        a.href = image;
        a.download = 'tierlist.png';
        a.click();
        document.body.removeChild(a);
    });
}
