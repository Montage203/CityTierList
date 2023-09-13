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

    // Créer un paragraphe pour le nom d'utilisateur
    const usernamePara = document.createElement('p');
    usernamePara.textContent = data;

    // Créer un bouton de suppression
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Supprimer';
    removeButton.onclick = function() {
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

// Fonction pour ajouter une catégorie
function addCategory() {
    const categoriesContainer = document.getElementById('categories');
    const category = document.createElement('div');
    category.className = 'category';
    category.innerHTML = `
        <div class="category-header">
            <h2>Nouvelle Catégorie</h2>
            <div class="category-actions">
                <span class="rename-category" onclick="renameCategory(this)">✏️</span>
                <span class="reorder-category" onclick="reorderCategory(this)">🔃</span>
                <span class="delete-category" onclick="deleteCategory(this)">❌</span>
                <input type="color" class="category-color" onchange="changeCategoryColor(this)">
                <input type="text" class="add-element-input" placeholder="Ajouter un élément">
                <button class="add-element-button" onclick="addElement(this)">Ajouter</button>
            </div>
            <ul class="elements" ondrop="drop(event)" ondragover="allowDrop(event)">
                <!-- Éléments ici... -->
            </ul>
        </div>
    `;
    categoriesContainer.appendChild(category);
}

// Fonction pour renommer une catégorie
function renameCategory(button) {
    const categoryHeader = button.parentElement.parentElement;
    const categoryName = categoryHeader.querySelector('h2');
    const newCategoryName = prompt('Nouveau nom de catégorie :', categoryName.textContent);
    if (newCategoryName !== null) {
        categoryName.textContent = newCategoryName;
    }
}

// Fonction pour réorganiser une catégorie
function reorderCategory(button) {
    const category = button.parentElement.parentElement.parentElement;
    $(category).sortable();
}

// Fonction pour supprimer une catégorie
function deleteCategory(button) {
    const category = button.parentElement.parentElement.parentElement;
    category.remove();
}

// Fonction pour changer la couleur d'une catégorie
function changeCategoryColor(input) {
    const categoryHeader = input.parentElement.parentElement;
    categoryHeader.style.backgroundColor = input.value;
}

// Fonction pour ajouter un élément
function addElement(button) {
    const input = button.previousElementSibling;
    const elementName = input.value.trim();
    if (elementName !== '') {
        const elementsList = button.parentElement.parentElement.parentElement.querySelector('.elements');
        const li = document.createElement('li');
        li.textContent = elementName;
        li.setAttribute('draggable', 'true');
        li.setAttribute('ondragstart', 'drag(event)');
        elementsList.appendChild(li);
        input.value = '';
    }
}

// Fonction pour supprimer un pseudo d'une catégorie
function removePseudo(button) {
    const pseudoContainer = button.parentElement;
    pseudoContainer.remove();
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
