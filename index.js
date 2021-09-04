function showEditProfile () {
    // Найти элемент popup
    let popup = document.querySelector('.popup');

    // Присвоить модификатор элементу popup
    popup.classList.add('popup_opened');
}

function saveProfile() {
    console.log('saveProfile')
}

// Найти кнопку class="button-edit"
let buttonEdit = document.querySelector('.button-edit');
// Прицепить на кнопку listener  // При клике на карандаш вызывается функция showEditProfile
buttonEdit.addEventListener('click', showEditProfile);

// Найти кнопку class="popup__button-save"
let popupButtonSave = document.querySelector('.popup__button-save');
// Прицепить на кнопку listener
popupButtonSave.addEventListener('click', saveProfile);

