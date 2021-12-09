export class UserInfo {
    constructor({selectorName,
        selectorDescription,
        selectorAvanar,
        loadUser,
        updateUser
    }) {
        this._elementName = document.querySelector(selectorName);
        this._elementDescription = document.querySelector(selectorDescription);
        this._elementAvatar = document.querySelector(selectorAvanar);
        this._loadUser = loadUser;
        this._updateUser = updateUser;
    }

    getUserInfo() {
        return this._loadUser();
    }

    setUserInfo(userData) {
        return this._updateUser(userData)
        .then ( user => {
            this.renderUserInfo(user);
        });
    }

    renderUserInfo(user) {
        this._elementName.textContent = user.name;
        this._elementDescription.textContent = user.about;
        this._elementAvatar.src = user.avatar;
    }

    setUserId(userId) {
        this._userId = userId;
    }

    getUserId() {
        return this._userId;
    }

    getName() {
        return this._elementName.textContent;
    }

    getDescription() {
        return this._elementDescription.textContent;
    }
}
