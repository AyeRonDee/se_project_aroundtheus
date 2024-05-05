//The UserInfo class is responsible for rendering information about the user on the page. This class should:

export default class UserInfo {
  constructor({ name, description }) {
    //Take an object with the selectors of two elements into the constructor:
    //one for the profile’s name element and one for its job element.
    this._nameElement = document.querySelector(name);
    this._descriptionElement = document.querySelector(description);
  }

  getUserInfo() {
    //which returns an object containing information about the user.
    //This method will be handy for cases when it's necessary to display the user data in the open form.
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._descriptionElement.textContent = data.description;
    //which takes new user data and adds it to the page.
    //This method should be used after successful submission of the profile form.
  }
}

//Create an instance of the UserInfo class in index.js and use its methods as described.
