const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddItem = document.querySelector('.popup_add-item');
const popupItem = document.querySelector('.popup_image');
const profileInfo = document.querySelector('.profile__info');
const profileForm = document.forms['edit-profile'];

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

function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    const trashButton = card.querySelector('.element__button-trash');
    trashButton.addEventListener('click', deleteItem);

    const image = card.querySelector('.element__image');
    image.src = item.link;
    image.alt = item.name;
    image.addEventListener('click', openImage);

    const heading = card.querySelector('.element__name');
    heading.append(document.createTextNode(item.name));

    const likeButton = card.querySelector('.button-like');
    likeButton.addEventListener('click', toggleLike);

    return card;
}

function addItem(card) {
    const elements = document.querySelector('.elements__list'); // найти контейнер карточек
    elements.prepend(createCard(card))
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
    const cardImage = clickEvent.target;
    const popupImage = popupItem.querySelector('.element__image_open');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    const popupTitle = popupItem.querySelector('.element__name_open');
    popupTitle.textContent = cardImage.alt;
    openPopup(popupItem);
}

function closePopupImage() {
    closePopup(popupItem);
}


initButtons(); // При загрузке скрипта инициализировать кнопки
initContent();

