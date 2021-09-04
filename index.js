function initButtons() {
    // Найти кнопку class="button-edit"
    let buttonEdit = document.querySelector('.button-edit');
    // Прицепить на кнопку listener  // При клике на карандаш вызывается функция showEditProfile
    buttonEdit.addEventListener('click', editProfileShow);

    let popupButtonSave = document.querySelector('.popup__button-save');
    popupButtonSave.addEventListener('click', editProfileSave);

    let popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', editProfileCancel);
}

function editProfileShow() {
    // Найти элемент popup
    let popup = document.querySelector('.popup');

    // Присвоить модификатор элементу popup
    popup.classList.add('popup_opened');
}

function editProfileSave() {
    console.log('saveProfile')
}

function editProfileCancel() {
    let popup = document.querySelector('.popup');

    // Присвоить модификатор элементу popup
    popup.classList.remove('popup_opened');
}

initButtons();

