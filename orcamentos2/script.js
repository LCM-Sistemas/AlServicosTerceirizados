"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const login = new LoginForm("form");
});
class LoginForm {
    /**
     * @param el CSS selector of the form element
     */
    constructor(el) {
        var _a, _b;
        /** Timeout for the login attempt */
        this.loginTimeout = 0;
        /** Username entered in the form */
        this._username = "";
        /** Password entered in the form */
        this._password = "";
        /** Display the password. */
        this._passwordShow = false;
        /** There are errors with the user input. */
        this._hasErrors = false;
        /** User is logging in. */
        this._loginWorking = false;
        this.el = document.querySelector(el);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.passwordShowToggle.bind(this));
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", this.login.bind(this));
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
    /** Username has been entered. */
    get usernameValid() {
        return !!this.username.length;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    /** Password is valid (since this is a demo, check only for a length). */
    get passwordValid() {
        return !!this.password.length;
    }
    get passwordShow() {
        return this._passwordShow;
    }
    set passwordShow(value) {
        var _a, _b;
        this._passwordShow = value;
        if ((_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.password) === null || _b === void 0 ? void 0 : _b.type) {
            this.el.password.type = value ? "text" : "password";
            // hide the previous state
            const stateThen = !value ? PasswordDisplay.On : PasswordDisplay.Off;
            const stateThenIcon = this.el.querySelector(`[data-icon="eye-${stateThen}"]`);
            stateThenIcon === null || stateThenIcon === void 0 ? void 0 : stateThenIcon.setAttribute("display", "none");
            // show the current state
            const stateNow = value ? PasswordDisplay.On : PasswordDisplay.Off;
            const stateNowIcon = this.el.querySelector(`[data-icon="eye-${stateNow}"]`);
            stateNowIcon === null || stateNowIcon === void 0 ? void 0 : stateNowIcon.removeAttribute("display");
            // update the accessible label
            const button = this.el.querySelector("[data-password-show]");
            const buttonTitle = value ? PasswordDisplayLabel.Hide : PasswordDisplayLabel.Show;
            button === null || button === void 0 ? void 0 : button.setAttribute("title", buttonTitle);
        }
    }
    get hasErrors() {
        return this._hasErrors;
    }
    set hasErrors(value) {
        var _a, _b;
        this.ariaErrorMessages();
        // display the username error
        const usernameError = (_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelector("#username-error");
        if (usernameError) {
            usernameError.innerHTML = this.usernameValid ? "" : LoginInvalid.Username;
        }
        // display the password error
        const passwordError = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("#password-error");
        if (passwordError) {
            passwordError.innerHTML = this.passwordValid ? "" : LoginInvalid.Password;
        }
        this._hasErrors = value;
    }
    get loginWorking() {
        return this._loginWorking;
    }
    set loginWorking(value) {
        var _a, _b, _c, _d;
        // temporarily disable the inputs if working
        if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.username) {
            this.el.username.disabled = value;
        }
        if ((_b = this.el) === null || _b === void 0 ? void 0 : _b.password) {
            this.el.password.disabled = value;
        }
        if ((_c = this.el) === null || _c === void 0 ? void 0 : _c.remember_me) {
            this.el.remember_me.disabled = value;
        }
        // same for the button
        const button = (_d = this.el) === null || _d === void 0 ? void 0 : _d.querySelector("[data-login]");
        if (button) {
            button.innerText = value ? LoginState.Working : LoginState.Default;
            button.disabled = value;
        }
        this._loginWorking = value;
    }
    /** Update aria attributes according to the input errors. */
    ariaErrorMessages() {
        var _a, _b;
        if ((_a = this.el) === null || _a === void 0 ? void 0 : _a.username) {
            this.el.username.ariaInvalid = !this.usernameValid;
            if (this.usernameValid) {
                this.el.username.removeAttribute("aria-errormessage");
            }
            else {
                this.el.username.setAttribute("aria-errormessage", "username-error");
            }
        }
        if ((_b = this.el) === null || _b === void 0 ? void 0 : _b.password) {
            this.el.password.ariaInvalid = !this.passwordValid;
            if (this.passwordValid) {
                this.el.password.removeAttribute("aria-errormessage");
            }
            else {
                this.el.password.setAttribute("aria-errormessage", "password-error");
            }
        }
    }
    /**
     * Log into the site using the given credentials (actually does nothing since this is a front-end demo).
     * @param e Submit event
     */
    login(e) {
        var _a, _b, _c, _d;
        e.preventDefault();
        if (!this.loginWorking) {
            const timeout = 750;
            this.loginWorking = true;
            // update the username and password data
            this.username = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.username) === null || _b === void 0 ? void 0 : _b.value;
            this.password = (_d = (_c = this.el) === null || _c === void 0 ? void 0 : _c.password) === null || _d === void 0 ? void 0 : _d.value;
            this.loginTimeout = setTimeout(this.loginActions.bind(this), timeout);
        }
    }
    /** Actions after login */
    loginActions() {
        var _a;
        this.loginWorking = false;
        this.hasErrors = !this.usernameValid || !this.passwordValid;
        if (!this.hasErrors) {
            // reset the form if the login is successful
            this.username = "";
            this.password = "";
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.reset();
        }
    }
    /**
     * Toggle whether the password should be shown
     * @param e Click event
     */
    passwordShowToggle(e) {
        const { target } = e;
        const eye = target;
        if (eye.hasAttribute("data-password-show")) {
            this.passwordShow = !this.passwordShow;
        }
    }
}
var PasswordDisplay;
(function (PasswordDisplay) {
    PasswordDisplay["Off"] = "off";
    PasswordDisplay["On"] = "on";
})(PasswordDisplay || (PasswordDisplay = {}));
var PasswordDisplayLabel;
(function (PasswordDisplayLabel) {
    PasswordDisplayLabel["Hide"] = "Hide password";
    PasswordDisplayLabel["Show"] = "Show password";
})(PasswordDisplayLabel || (PasswordDisplayLabel = {}));
var LoginState;
(function (LoginState) {
    LoginState["Default"] = "Log in";
    LoginState["Working"] = "Logging in\u2026";
})(LoginState || (LoginState = {}));
var LoginInvalid;
(function (LoginInvalid) {
    LoginInvalid["Username"] = "Enter your username";
    LoginInvalid["Password"] = "Enter your password";
})(LoginInvalid || (LoginInvalid = {}));