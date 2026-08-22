export type FormData = {
  organizationName: string;
  username: string;
  password: string;
};

export type FormErrors = {
  organizationName?: string;
  username?: string;
  password?: string;
};

export function mainValidation(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.organizationName.trim()) {
    errors.organizationName = "Organisation name is required.";
  }

  if (!form.username) {
    errors.username = "Username is required.";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required.";
  }

  return errors;
}
