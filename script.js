// Code JavaScript pour gérer les éléments, les catégories et l'avatar

// Fonction pour autoriser le glisser-déposer
function allowDrop(event) {
    event.preventDefault();
}

// Fonction pour gérer le début du glisser
function drag(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

// Fonction pour gérer le fin du glisser
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const categoryName = event.target.closest('.category').querySelector('h2').textContent;
    const categoryList = event.target.closest('.category').querySelector('.elements');

    // Récupérer l'avatar en utilisant l'API
    const avatarUrl = `https://api.habbocity.me/avatar_image.php?user=${data}&action=std&direction=3&head_direction=3&size=l&headonly=0`;

    // Créer un conteneur pour l'avatar, le nom d'utilisateur et le bouton de suppression
    const container = document.createElement('div');
    container.className = 'avatar-container';

    // Créer une image pour l'avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = avatarUrl;
    avatarImg.alt = `${data}'s Avatar`;
    avatarImg.style.objectFit = 'cover'; // Recadrage de l'avatar

    // Créer un paragraphe pour le nom d'utilisateur
    const usernamePara = document.createElement('p');
    usernamePara.textContent = data;

    // Créer un bouton de suppression
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Supprimer';
    removeButton.onclick = function () {
        removePseudo(this);
    };

    // Ajouter l'avatar, le nom d'utilisateur et le bouton de suppression au conteneur
    container.appendChild(avatarImg);
    container.appendChild(usernamePara);
    container.appendChild(removeButton);

    // Ajouter le conteneur à la liste de catégories
    const li = document.createElement('li');
    li.appendChild(container);
    categoryList.appendChild(li);
}

// Reste du code inchangé...

// Fonction pour télécharger la tierlist en image
function downloadTierlist() {
    html2canvas(document.body).then(function (canvas) {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const image = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
        a.href = image;
        a.download = 'tierlist.png';
        a.click();
        document.body.removeChild(a);
    });
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
