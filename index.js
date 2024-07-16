CreateForm().then(() => {
    console.log('Form creation successful');
}).catch(error => {
    console.error('Error creating form:', error);
});

async function CreateForm() {
    const accountForm = document.createElement("form");
    accountForm.id = "data-form";
    accountForm.setAttribute("method", "POST");
    const nameInput = await CreateInputElement("text", "name", "name", true);
    const usernameInput = await CreateInputElement("text", "username", "username", true);
    const passwordInput = await CreateInputElement("password", "password", "password", true);
    const confirmPasswordInput = await CreateInputElement("password", "confirmPassword", "repeat password", true);
    const emailInput = await CreateInputElement("email", "email", "email", true);

    const nameInputLabel = await CreateLabel(nameInput, "Name:");
    const usernameInputLabel = await CreateLabel(usernameInput, "User name:");
    const passwordInputLabel = await CreateLabel(passwordInput, "Password:");
    const confirmPasswordInputLabel = await CreateLabel(confirmPasswordInput, "Confirm Password:");
    const emailInputLabel = await CreateLabel(emailInput, "Email:");

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");
    accountForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
            name: nameInput.value,
            username: usernameInput.value,
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            email: emailInput.value,
        };
        await PresentData(data);
    })
    accountForm.appendChild(nameInputLabel);
    accountForm.appendChild(nameInput);
    accountForm.appendChild(usernameInputLabel);
    accountForm.appendChild(usernameInput);
    accountForm.appendChild(passwordInputLabel);
    accountForm.appendChild(passwordInput);
    accountForm.appendChild(confirmPasswordInputLabel);
    accountForm.appendChild(confirmPasswordInput);
    accountForm.appendChild(emailInputLabel);
    accountForm.appendChild(emailInput);
    accountForm.append(submitButton);
    passwordInput.addEventListener("input", async () => {
        await ValidatePasswords();
    });
    confirmPasswordInput.addEventListener("input", async () => {
        await ValidatePasswords();
    });
    document.body.append(accountForm);


}

function ValidatePasswords() {
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

function CreateInputElement(type, name, placeholder, required = false) {
    let input = document.createElement("input");
    input.setAttribute("type", type);
    input.setAttribute("name", name);
    input.setAttribute("placeholder", placeholder);
    input.setAttribute("id", name);

    if (required) {
        input.required = true;
    }

    return input;

}

function CreateLabel(inputId, labelText) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.addEventListener('click', function() {
        inputId.focus();
    });

    return label;
}


function PresentData(data) {
    const databox = document.getElementById("data-content");
    databox.classList.add("show-data-content")
    databox.innerHTML = `<p>${data.name} ${data.username} ${data.email} ${data.password}</p>`;
    console.log(data);
}