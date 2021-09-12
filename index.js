const popupProfile = document.querySelector('.popup');
const popupAddItem = document.querySelector('.popup_add-item');
const popupItem = document.querySelector('.popup_image');
const profileInfo = document.querySelector('.profile__info');

function initButtons() {
    const buttonEdit = document.querySelector('.button-edit');  // Найти кнопку с карандашом
    buttonEdit.addEventListener('click', showEditProfile);  // Прицепить listener

    const editProfileForm = document.querySelector('#edit-profile');  // Найти форму редактирования профиля
    editProfileForm.addEventListener('submit', saveEditProfile);  // Прицепить обработчик на submit

    const popupButtonCancel = document.querySelector('.popup__button-close');
    popupButtonCancel.addEventListener('click', cancelEditProfile);

    const buttonAdd = document.querySelector('.button-add');  // Найти кнопку с +
    buttonAdd.addEventListener('click', showAddItem);  // Прицепить listener

    const addItemForm = document.querySelector('#add-item');
    addItemForm.addEventListener('submit', saveAddItem);

    const addItemButtonCancel = document.querySelector('.popup__button-close_add-item');
    addItemButtonCancel.addEventListener('click', cancelAddItem);

    const popupImageButtonClose = document.querySelector('.popup__button-close_image');
    popupImageButtonClose.addEventListener('click', closePopupImage);
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function showEditProfile() {
    openPopup(popupProfile);
    const profileForm = document.forms['edit-profile'];
    const currentUserName = profileInfo.querySelector('.profile__name').textContent;
    const currentProfileDescription = profileInfo.querySelector('.profile__description').textContent;
    profileForm.elements['user-name'].value = currentUserName;
    profileForm.elements['user-description'].value = currentProfileDescription;
}

function saveEditProfile(submitEvent) {
    submitEvent.preventDefault();  // Не отправлять форму на сервер и не перезагружать страницу
    const profileForm = submitEvent.target;
    const newUserName = profileForm.elements['user-name'].value;
    const newProfileDescription = profileForm.elements['user-description'].value;// найти инпуты, взять данные из инпутов
    profileInfo.querySelector('.profile__name').textContent = newUserName; // найти элементы профиля и задать текстовое содержимое элементам на странице
    profileInfo.querySelector('.profile__description').textContent = newProfileDescription;

    closePopup(popupProfile);
}

function cancelEditProfile() {
    closePopup(popupProfile);
}


function showAddItem() {
    openPopup(popupAddItem);
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
    closePopup(popupAddItem);
}

function cancelAddItem() {
    closePopup(popupAddItem);
}

function renderCard(name, link) {
    const card = document.createElement('li');
    card.classList.add('element');

    const trashButton = document.createElement('button');
    trashButton.classList.add('element__button-trash');
    trashButton.type = 'button';
    trashButton.addEventListener('click', deleteItem);

    const image = document.createElement('img');
    image.classList.add('element__image');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', openImage);

    const title = document.createElement('div');
    title.classList.add('element__title');
    const heading = document.createElement('h2');
    heading.classList.add('element__name');
    heading.append(document.createTextNode(name));
    const likeButton = document.createElement('button');
    likeButton.classList.add('button-like');
    likeButton.type = 'button';
    likeButton.addEventListener('click', toggleLike);
    title.append(heading, likeButton);

    card.append(trashButton, image, title);

    return card;
}

function addItem(card) {
    const elements = document.querySelector('.elements__list'); // найти контейнер карточек
    elements.prepend(renderCard(card.name, card.link))
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
    openPopup(popupItem);
}

function closePopupImage() {
    closePopup(popupItem);
}


initButtons(); // При загрузке скрипта инициализировать кнопки
initContent();

