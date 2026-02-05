function validateForm() {
  validateEmail();
  validatePassword();
}

// -------------------------Email Validation-------------------------
function validateEmail() {
  const email = document.getElementById("email").value;
  const emailResult = document.getElementById("emailResult");
  let errors = [];

  switch (true) {
    case !/[A-Z]/.test(email):
      errors.push("❌ Email must contain at least one uppercase letter");
    case !/[a-z]/.test(email):
      errors.push("❌ Email must contain at least one lowercase letter");
    case !email.includes("@"):
      errors.push("❌ Email must contain '@'");
    case !email.endsWith(".com"):
      errors.push("❌ Email must end with '.com'");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    emailResult.innerHTML = errors.join("<br>");
    emailResult.className = "error";
  } else {
    emailResult.innerHTML = "✅ Valid email address!";
    emailResult.className = "success";
  }
}

// --------------------Password Validation---------------------
function validatePassword() {
  const password = document.getElementById("password").value;
  const passwordResult = document.getElementById("passwordResult");
  let errors = [];

  switch (true) {
    case password.length !== 8:
      errors.push("❌ Password must be exactly 8 characters");
    case !/[A-Z]/.test(password):
      errors.push("❌ Password must contain at least one uppercase letter");
    case !/^[A-Za-z]+$/.test(password):
      errors.push("❌ Password must not contain numbers or special characters");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    passwordResult.innerHTML =
      "❌ Password is Weak!<br>" + errors.join("<br>");
    passwordResult.className = "error";
  } else {
    passwordResult.innerHTML = "✅ Password is Strong!";
    passwordResult.className = "success";
  }
}
