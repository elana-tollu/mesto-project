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

    let popupImageButtonClose = document.querySelector('.popup__button-close_image');
    popupImageButtonClose.addEventListener('click', closePopupImage);
}

function editProfileShow() {
    let popup = document.querySelector('.popup');  // Найти элемент popup
    popup.classList.add('popup_opened');      // Открыть popup
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
    itemForm.reset();
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
    let elements = document.querySelector('.elements__list'); // найти контейнер карточек
    elements.insertAdjacentHTML('afterbegin', item); // добавить карточку в начало контейнера
    let insertedItem = elements.children[0]; // взять свежесозданную карточку - узел ДОМ
    let buttonLike = insertedItem.querySelector('.button-like');
    buttonLike.addEventListener('click', toggleLike);
    let buttonTrash = insertedItem.querySelector('.element__button-trash');
    buttonTrash.addEventListener('click', deleteItem);
    let image = insertedItem.querySelector('.element__image');
    image.addEventListener('click', openImage);
}

function toggleLike(clickEvent) {
    clickEvent.target.classList.toggle('button-like_active');
}

function deleteItem(clickEvent) {
    let buttonTrash = clickEvent.target;
    let item = buttonTrash.closest('.element');
    item.remove();
}

function openImage (clickEvent) {
    let cardImage = clickEvent.target;
    let popupImage = `<img src="${cardImage.src}" alt="${cardImage.alt}" class="element__image element__image_open">`;
    let popupTitle = `<h2 class="element__name element__name_open">${cardImage.alt}</h2>`
    let popup = document.querySelector('.popup_image');
    let popupContainer = popup.querySelector('.popup__container_image');
    popupContainer.insertAdjacentHTML('beforeend', popupImage);
    popupContainer.insertAdjacentHTML('beforeend', popupTitle);
    popup.classList.add('popup_opened');
}

function closePopupImage() {
    let popup = document.querySelector('.popup_image');
    popup.classList.remove('popup_opened');
    let popupImage = popup.querySelector('img');
    let popupTitle = popup.querySelector('h2');
    popupImage.remove();
    popupTitle.remove();
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

