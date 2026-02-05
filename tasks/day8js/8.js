function check() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let emailResult = document.getElementById("emailResult");
    let passwordResult = document.getElementById("passwordResult");

    emailResult.innerHTML = "";
    passwordResult.innerHTML = "";

    let emailErrors = [];
    let passwordErrors = [];

    // -------- EMAIL VALIDATION --------------------------------------------------------------
    if (!/[A-Z]/.test(email))
        emailErrors.push("❌ Email must contain at least one uppercase letter");

    if (!/[a-z]/.test(email))
        emailErrors.push("❌ Email must contain at least one lowercase letter");

    if (!email.includes("@"))
        emailErrors.push("❌ Email must include '@'");

    if (!email.includes(".com"))
        emailErrors.push("❌ Email must end with '.com'");

    if (emailErrors.length === 0) {
        emailResult.style.color = "green";
        emailResult.innerHTML = "✅ Valid email address!";
    } else {
        emailResult.style.color = "red";
        emailResult.innerHTML = "❌ Invalid Email!";
        alert(emailErrors.join("\n"));
    }
    
    // -------- PASSWORD VALIDATION -----------------------------------------------
    if (password.length !== 8)
        passwordErrors.push("❌ Password must be exactly 8 characters");

    if (!/^[A-Za-z]+$/.test(password))
        passwordErrors.push("❌ Password must not contain special characters");

    if (!/[A-Z]/.test(password))
        passwordErrors.push("❌ Password must contain at least one uppercase letter");

    if (!/^[A-Z][a-z]+$/.test(password))
        passwordErrors.push("❌ Remaining letters must be lowercase");

    if (passwordErrors.length === 0) {
        passwordResult.style.color = "green";
        passwordResult.innerHTML = "✅ Password is Strong!";
    } else {
        passwordResult.style.color = "red";
        passwordResult.innerHTML = "❌ Password is Weak!";
        alert(passwordErrors.join("\n"));
    }
}