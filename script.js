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
        <div class="category-header" style="background-color: #333;">
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

function toggleDarkMode(checkbox) {
    const body = document.body;
    if (checkbox.checked) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function changeCategoryColor(input) {
    const categoryHeader = input.parentElement.parentElement;
    categoryHeader.style.backgroundColor = input.value;
}

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
