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
        input.value = '';
    }
}

function addCategory() {
    const category = document.createElement('div');
    category.className = 'category';
    category.innerHTML = `
        <div class="category-header" style="background: linear-gradient(to right, green, red);">
            <h2>Nouvelle Catégorie</h2>
            <div class="category-actions">
                <span class="rename-category" onclick="renameCategory(this)">✏️</span>
                <span class="reorder-category" onclick="reorderCategory(this)">🔃</span>
                <span class="delete-category" onclick="deleteCategory(this)">❌</span>
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
        input.value = '';
    }
}

function downloadTierlist() {
    // Capturer le contenu de la page
    html2canvas(document.body).then(function(canvas) {
        // Créer un élément <a> pour le téléchargement
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';

        // Convertir le canvas en une URL de données (Data URL)
        const image = canvas.toDataURL('image/png');

        // Définir l'URL de données comme source de l'élément <a>
        a.href = image;

        // Spécifier le nom du fichier à télécharger
        a.download = 'tierlist.png';

        // Simuler un clic sur l'élément <a> pour déclencher le téléchargement
        a.click();

        // Supprimer l'élément <a> de la page
        document.body.removeChild(a);
    });
}
