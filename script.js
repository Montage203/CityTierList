function createAvatarElement(data) {
    const categoryList = document.querySelector('.category .elements');
    const avatarUrl = `https://api.habbocity.me/avatar_image.php?user=${data}&action=std&direction=3&head_direction=3&size=l&headonly=0`;
    const container = document.createElement('div');
    container.className = 'avatar-container';
    const avatarImg = document.createElement('img');
    avatarImg.src = avatarUrl;
    avatarImg.alt = `${data}'s Avatar`;
    avatarImg.style.objectFit = 'cover';
    const usernamePara = document.createElement('p');
    usernamePara.textContent = data;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Supprimer';
    removeButton.onclick = function () {
        removePseudo(this);
    };
    container.appendChild(avatarImg);
    container.appendChild(usernamePara);
    container.appendChild(removeButton);
    const li = document.createElement('li');
    li.appendChild(container);
    categoryList.appendChild(li);
}

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

function changeCategoryColor(input) {
    const categoryHeader = input.parentElement.parentElement;
    categoryHeader.style.backgroundColor = input.value;
}

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

function removePseudo(button) {
    const pseudoContainer = button.parentElement;
    pseudoContainer.remove();
}

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

createAvatarElement('Niko');
