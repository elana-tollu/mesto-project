function initButtons() {
    let buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
    buttonEdit.addEventListener('click', editProfileShow);  // Прицепить listener

    let editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
    editProfileForm.addEventListener('submit', editProfileSave);  // Прицепить обработчик на submit

    let popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', editProfileCancel);


    let buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener

    let addItemForm = document.querySelector('#add-item');
    addItemForm.addEventListener('submit', saveAddItem);

    let addItemButtonCancel = document.querySelector('.popup__button-close_add-item');
    addItemButtonCancel.addEventListener('click', cancelAddItem);
}

function editProfileShow() {
    let popup = document.querySelector('.popup');  // Найти элемент popup
    popup.classList.add('popup_opened');      // Присвоить модификатор элементу popup
    let profileForm = document.forms['edit-profile'];
    let profileInfo = document.querySelector('.profile__info');
    let currentUserName = profileInfo.querySelector('.profile__name').textContent;
    let currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;
    profileForm.elements['user-name'].value = currentUserName;
    profileForm.elements['user-description'].value = currentProfileDescription;
}

function editProfileSave(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    let profileForm = submitEvent.target;
    let newUserName = profileForm.elements['user-name'].value;
    let newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов
    let profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__name').textContent = newUserName; // найти элементы профиля и задать текстовое содержимое элементам на странице
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;
    let popup = document.querySelector('.popup');  // Найти элемент popup
    popup.classList.remove('popup_opened');  // Закрыть popup
}

function editProfileCancel() {
    let popup = document.querySelector('.popup');
    popup.classList.remove('popup_opened');
}


function showAddItem() {
    let popup = document.querySelector('.popup_add-item');  // Найти элемент popup
    popup.classList.add('popup_opened');      // Присвоить модификатор элементу popup
}

function saveAddItem(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    let itemForm = submitEvent.target;
    let card = {
        name: itemForm.elements['item-name'].value,
        link: itemForm.elements['item-link'].value
    }
    addItem(card);
    let popup = document.querySelector('.popup_add-item');  // Найти элемент popup
    popup.classList.remove('popup_opened');  // Закрыть popup
}

function cancelAddItem() {
    let popup = document.querySelector('.popup_add-item');
    popup.classList.remove('popup_opened');
}

function addItem(card) {
    let item = `<li class="element">
        <button type="button" class="element__button-trash"></button>
        <img src="${card.link}" alt="${card.name}" class="element__image">
        <div class="element__title">
            <h2 class="element__name">${card.name}</h2>
            <button type="button" class="button-like"></button>
        </div>
    </li>`;
    let elements = document.querySelector('.elements__list');
    elements.insertAdjacentHTML('afterbegin', item);
}

function initContent() {
    const initialCards = [
        {
          name: 'Архыз',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
          name: 'Челябинская область',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
          name: 'Иваново',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
          name: 'Камчатка',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
          name: 'Холмогорский район',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
          name: 'Байкал',
          link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
        ];
        initialCards.forEach(addItem);
}

initButtons(); // При загрузке скрипта инициализировать кнопки
initContent();

