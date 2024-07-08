CreateForm().then(() => {
    console.log('Form creation successful');
}).catch(error => {
    console.error('Error creating form:', error);
});

async function CreateForm() {
    const accountForm = document.createElement("form");
    accountForm.setAttribute("method", "POST");
    accountForm.setAttribute("action", "submit.php");
    const nameInput = await CreateInputElement("text", "name", "name", "name", true);
    const usernameInput = await CreateInputElement("text", "username", "username", "user name", true);
    const passwordInput = await CreateInputElement("password", "password", "password", "password", true);
    const confirmPasswordInput = await CreateInputElement("password", "confirmPassword", "confirmPassword", "repeat password", true);
    const emailInput = await CreateInputElement("email", "email", "email", "email", true);
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    accountForm.append(nameInput);
    accountForm.append(usernameInput);
    accountForm.append(passwordInput);
    accountForm.append(confirmPasswordInput);
    accountForm.append(emailInput);
    accountForm.append(submitButton);
    passwordInput.addEventListener("input", async () => {
        await ValidatePasswords();
    });
    confirmPasswordInput.addEventListener("input", async () => {
        await ValidatePasswords();
    });
    document.body.append(accountForm);


}

async function ValidatePasswords() {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const submitButton = document.querySelector("input[type='submit']");


    if (passwordInput.value.length < 8 || passwordInput.value !== confirmPasswordInput.value) {
        passwordInput.classList.add("invalidPassword");
        confirmPasswordInput.classList.add("invalidPassword");
        submitButton.disabled = true;
    } else {
        passwordInput.classList.remove("invalidPassword");
        confirmPasswordInput.classList.remove("invalidPassword");
        submitButton.disabled = false;

    }

}

async function CreateInputElement(type, name, placeholder, label, required = false) {
    let input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", name);

    if (required) {
        input.required = true;
    }

    let inputLabel = document.createElement("label");
    inputLabel.textContent = label;
    inputLabel.appendChild(input);

    return inputLabel;

}