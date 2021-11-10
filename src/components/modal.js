const body = document.querySelector('.page');

export function initModal() {
    const popupOverlays = document.querySelectorAll('.popup__overlay');
    popupOverlays.forEach(overlay => overlay.addEventListener('click', closeParentPopup)); // привязать EventListener к каждому элементу коллекции overlay
}

export function openPopup(popup) { // открывает мод.окно
    popup.classList.add('popup_opened');
    body.addEventListener('keydown', closeWithEsc);
}

export function closePopup(popup) { // закрывает мод.окно
    popup.classList.remove('popup_opened');
}

function closeParentPopup(clickEvent) {
    const overlay = clickEvent.target;
    closePopup(overlay.parentElement);
}

function closeWithEsc(event) {
    if(event.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened')); // вызвать функцию closePopup, передав ей элемент с классом .popup_opened
        body.removeEventListener('keydown', closeWithEsc);
    }
}
