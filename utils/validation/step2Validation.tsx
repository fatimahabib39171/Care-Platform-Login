export type FormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  designation: string;
  password: string;
  confirm: string;
};

export type FormErrors = {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirm?: string;
};

export function step2Validation(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!/^[a-zA-Z]+$/.test(form.firstName)) {
    errors.firstName = "First name must contain letters only.";
  }

  if (!form.lastName) {
    errors.lastName = "Last name is required.";
  } else if (!/^[a-zA-Z]+$/.test(form.firstName)) {
    errors.firstName = "Last name must contain letters only.";
  }

  if (!form.username) {
    errors.username = "Username is required.";
  } else if (
    form.username.length < 3 ||
    form.username.length > 20 ||
    !/^[a-zA-Z0-9_.]+$/.test(form.username)
  ) {
    errors.username =
      "Username must be 3–20 characters (letters, numbers, _ or .).";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "A valid email is required.";
  }

  if (
    form.phone.trim() &&
    (!/[0-9]/.test(form.phone) ||
      form.phone.length < 7 ||
      form.phone.length > 15)
  ) {
    errors.phone = "Enter a valid phone number (7-15) digits.";
  }

  if (!form.password.trim()) {
    errors.password = "Password does not meet the requirements.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  } else if (!/[a-z]/.test(form.password)) {
    errors.password = "Password must contain a lowercase letter.";
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = "Password must contain an uppercase letter.";
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = "Password must contain a number.";
  } else if (!/[!@#$%^&*(),.?":{}|<>_\-[\]\\\/]/.test(form.password)) {
    errors.password = "Password must contain a symbol.";
  }

  if (!form.confirm.trim()) {
    errors.confirm = "Please confirm your password";
  } else if (form.password !== form.confirm) {
    errors.confirm = "Passwords do not match.";
  }

  return errors;
}
