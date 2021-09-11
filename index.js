const popupProfile = document.querySelector('.popup');  // Найти элемент popup
const popupAddItem = document.querySelector('.popup_add-item');  // Найти элемент popup
const popupItem = document.querySelector('.popup_image');

function initButtons() {
    const buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
    buttonEdit.addEventListener('click', editProfileShow);  // Прицепить listener

    const editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
    editProfileForm.addEventListener('submit', editProfileSave);  // Прицепить обработчик на submit

    const popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', editProfileCancel);

    const buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener

    const addItemForm = document.querySelector('#add-item');
    addItemForm.addEventListener('submit', saveAddItem);

    const addItemButtonCancel = document.querySelector('.popup__button-close_add-item');
    addItemButtonCancel.addEventListener('click', cancelAddItem);

    const popupImageButtonClose = document.querySelector('.popup__button-close_image');
    popupImageButtonClose.addEventListener('click', closePopupImage);
}

function editProfileShow() {
    popupProfile.classList.add('popup_opened');      // Открыть popup
    const profileForm = document.forms['edit-profile'];
    const profileInfo = document.querySelector('.profile__info');
    const currentUserName = profileInfo.querySelector('.profile__name').textContent;
    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;
    profileForm.elements['user-name'].value = currentUserName;
    profileForm.elements['user-description'].value = currentProfileDescription;
}

function editProfileSave(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    const profileForm = submitEvent.target;
    const newUserName = profileForm.elements['user-name'].value;
    const newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов
    const profileInfo = document.querySelector('.profile__info');
    profileInfo.querySelector('.profile__name').textContent = newUserName; // найти элементы профиля и задать текстовое содержимое элементам на странице
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;

    popupProfile.classList.remove('popup_opened');  // Закрыть popup
}

function editProfileCancel() {
    popupProfile.classList.remove('popup_opened');
}


function showAddItem() {
    popupAddItem.classList.add('popup_opened');      // Присвоить модификатор элементу popup
}

function saveAddItem(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    const itemForm = submitEvent.target;
    const card = {
        name: itemForm.elements['item-name'].value,
        link: itemForm.elements['item-link'].value
    }
    addItem(card);
    itemForm.reset();
    popupAddItem.classList.remove('popup_opened');  // Закрыть popup
}

function cancelAddItem() {
    popupAddItem.classList.remove('popup_opened');
}

function addItem(card) {
    const item = `<li class="element">
        <button type="button" class="element__button-trash"></button>
        <img src="${card.link}" alt="${card.name}" class="element__image">
        <div class="element__title">
            <h2 class="element__name">${card.name}</h2>
            <button type="button" class="button-like"></button>
        </div>
    </li>`;
    const elements = document.querySelector('.elements__list'); // найти контейнер карточек
    elements.insertAdjacentHTML('afterbegin', item); // добавить карточку в начало контейнера
    const insertedItem = elements.children[0]; // взять свежесозданную карточку - узел ДОМ
    const buttonLike = insertedItem.querySelector('.button-like');
    buttonLike.addEventListener('click', toggleLike);
    const buttonTrash = insertedItem.querySelector('.element__button-trash');
    buttonTrash.addEventListener('click', deleteItem);
    const image = insertedItem.querySelector('.element__image');
    image.addEventListener('click', openImage);
}

function toggleLike(clickEvent) {
    clickEvent.target.classList.toggle('button-like_active');
}

function deleteItem(clickEvent) {
    const buttonTrash = clickEvent.target;
    const item = buttonTrash.closest('.element');
    item.remove();
}

function openImage (clickEvent) {
    popupItem.querySelectorAll('img').forEach(element => element.remove());
    popupItem.querySelectorAll('h2').forEach(element => element.remove());
    const cardImage = clickEvent.target;
    const popupImage = `<img src="${cardImage.src}" alt="${cardImage.alt}" class="element__image element__image_open">`;
    const popupTitle = `<h2 class="element__name element__name_open">${cardImage.alt}</h2>`
    const popupContainer = popupItem.querySelector('.popup__container_image');
    popupContainer.insertAdjacentHTML('beforeend', popupImage);
    popupContainer.insertAdjacentHTML('beforeend', popupTitle);
    popupItem.classList.add('popup_opened');
}

function closePopupImage() {
    popupItem.classList.remove('popup_opened');
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

