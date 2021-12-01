export class UserInfo {
    constructor({selectorName,
        selectorDescription,
        loadUser,
        updateUser
    }) {
        this._selectorName = selectorName;
        this._selectorDescription = selectorDescription;
        this._loadUser = loadUser;
        this._updateUser = updateUser;
    }

    getUserInfo() {
        return this._loadUser();
    }

    setUserInfo(userData) {
        this._updateUser(userData).then ( user => {
            this._selectorName.textContent = user.name;
            this._selectorDescription.textContent = user.about;
        });
    }
}
