function initButtons() {
    let buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
    buttonEdit.addEventListener('click', editProfileShow);  // Прицепить на кнопку listener  // При клике на карандаш вызывается функция showEditProfile

    let editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
    editProfileForm.addEventListener('submit', editProfileSave);  // Прицепить обработчик на submit

    let popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', editProfileCancel);
}

function editProfileShow() {
    let popup = document.querySelector('.popup');  // Найти элемент popup
    popup.classList.add('popup_opened');      // Присвоить модификатор элементу popup
}

function editProfileSave(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    let popup = document.querySelector('.popup');  // Найти элемент popup
    popup.classList.remove('popup_opened');  // Закрыть popup
    console.log('saveProfile')
}

function editProfileCancel() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}

initButtons(); // При загрузке скрипта инициализировать кнопки

