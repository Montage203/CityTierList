// Code JavaScript pour gérer les pseudonymes et les catégories
const categoriesContainer = document.getElementById('categories');
const outsidePseudonymsContainer = document.getElementById('outside-pseudonyms');

function addPseudonym(button) {
    const input = button.previousElementSibling;
    const pseudonym = input.value.trim();
    if (pseudonym !== '') {
        const pseudonymsList = button.nextElementSibling;
        const li = document.createElement('li');
        li.textContent = pseudonym;
        li.setAttribute('draggable', 'true');
        li.setAttribute('ondragstart', 'drag(event)');
        pseudonymsList.appendChild(li);

        // Appel à l'API pour obtenir l'avatar du joueur
        fetchAvatar(pseudonym, li);
        
        input.value = '';
    }
}

function addCategory() {
    const category = document.createElement('div');
    category.className = 'category';
    category.innerHTML = `
        <div class="category-header" style="background-color: #f0f0f0;">
            <h2>Nouvelle Catégorie</h2>
            <div class="category-actions">
                <span class="rename-category" onclick="renameCategory(this)">✏️</span>
                <span class="reorder-category" onclick="reorderCategory(this)">🔃</span>
                <span class="delete-category" onclick="deleteCategory(this)">❌</span>
                <input type="color" class="category-color" onchange="changeCategoryColor(this)">
            </div>
        </div>
        <ul class="pseudonyms" ondrop="drop(event)" ondragover="allowDrop(event)"></ul>
    `;
    categoriesContainer.appendChild(category);
}

function renameCategory(button) {
    const categoryHeader = button.parentElement.parentElement;
    const categoryName = categoryHeader.querySelector('h2');
    const newCategoryName = prompt('Nouveau nom de catégorie :', categoryName.textContent);
    if (newCategoryName !== null) {
        categoryName.textContent = newCategoryName;
    }
}

function reorderCategory(button) {
    const category = button.parentElement.parentElement.parentElement;
    $(category).sortable();
}

function deleteCategory(button) {
    const category = button.parentElement.parentElement.parentElement;
    category.remove();
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    event.target.appendChild(document.createTextNode(data));
    const li = document.createElement('li');
    li.textContent = data;
    event.target.appendChild(li);

    // Appel à l'API pour obtenir l'avatar
