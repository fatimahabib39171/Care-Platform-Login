export type FormData = {
  organisationName: string;
  username: string;
  password: string;
};

export type FormErrors = {
  organisationName?: string;
  username?: string;
  password?: string;
};

export function mainValidation(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.organisationName.trim()) {
    errors.organisationName = "Organisation name is required.";
  }

  if (!form.username) {
    errors.username = "Username is required.";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
}
