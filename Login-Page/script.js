function validateForm() {
    const userOrMail = document.getElementById("userOrMail").value.trim();
    const password = document.getElementById("password").value.trim();
    let isValid = true;

    if (userOrMail === "") {
        document.getElementById("user-error").style.color = "red";
        isValid = false;
    }

    if (password === "") {
        document.getElementById("password-error").style.color = "red";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("user-error").style.color = "transparent";
        document.getElementById("password-error").style.color = "transparent";
        setTimeout(() => alert("Form submitted successfully!"), 500)
    }
}