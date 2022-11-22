module.exports = class UserDto {
    email;

    id;

    lastName;

    firstName;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.lastName = model.lastName;
        this.firstName = model.firstName;
    }
};
