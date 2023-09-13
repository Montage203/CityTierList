// Code JavaScript pour gérer les éléments, les catégories, le thème sombre et l'avatar

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
    const categoryList = event.target.closest('.category').querySelector('.elements');
    const li = document.createElement('li');
    li.textContent = data;
    li.setAttribute('draggable', 'true');
    li.setAttribute('ondragstart', 'drag(event)');
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

// Fonction pour basculer le mode sombre
function toggleDarkMode(checkbox) {
    const body = document.body;
    if (checkbox.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
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
