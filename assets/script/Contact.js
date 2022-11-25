'use strict';

class Contact {
    #fullName;
    #city;
    #email;

    constructor(fullName, city, email) {
        this.#fullName = fullName;
        this.#city = city;
        this.#email = email
    }

    get fullName() {
        return this.#fullName;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }

    getInfo() {
        return`${this.#fullName}`;
    }
}

export default Contact;