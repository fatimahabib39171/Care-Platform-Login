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
  }

  if (!form.lastName) {
    errors.lastName = "Last name is required.";
  }

  if (!form.username) {
    errors.username = "Username is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "A valid email is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Enter a valid phone number (7–15 digits).";
  }

  if (!form.password.trim()) {
    errors.password = "Password does not meet the requirements.";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!form.confirm.trim()) {
    errors.confirm = "Please confirm your password";
  } else if (form.password !== form.confirm) {
    errors.confirm = "Passwords do not match.";
  }

  return errors;
}
