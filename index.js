CreateForm().then(() => {
    console.log('Form creation successful');
}).catch(error => {
    console.error('Error creating form:', error);
});

async function CreateForm() {
    const accountForm = document.createElement("form");
    accountForm.setAttribute("method", "POST");
    accountForm.setAttribute("action", "submit.php");
    const nameInput = await CreateInputElement("text", "name", "name", "name");
    const usernameInput = await CreateInputElement("text", "username", "username", "user name");
    const passwordInput = await CreateInputElement("password", "password", "password", "password");
    const confirmPasswordInput = await CreateInputElement("password", "confirmPassword", "confirmPassword", "repeat password");
    const emailInput = await CreateInputElement("email", "email", "email", "email");
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    accountForm.append(nameInput);
    accountForm.append(usernameInput);
    accountForm.append(passwordInput);
    accountForm.append(confirmPasswordInput);
    accountForm.append(emailInput);
    accountForm.append(submitButton);
    document.body.append(accountForm);


}


async function CreateInputElement(type, name, placeholder, label) {
    let input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", name);

    let inputLabel = document.createElement("label");
    inputLabel.textContent = label;
    inputLabel.appendChild(input);

    return inputLabel;

}