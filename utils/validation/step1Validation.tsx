export type FormData = {
  organizationName: string;
  type: string;
  timeZone: string;
  address: string;
  cityState: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  description: string;
};

export type FormErrors = {
  organizationName?: string;
  type?: string;
  timeZone?: string;
  address?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
};

export function step1Validation(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.organizationName.trim()) {
    errors.organizationName = "Organisation name is required.";
  } else if (form.organizationName.length < 2) {
    errors.organizationName =
      "Organisation name must be at least 2 characters.";
  }

  if (!form.type) {
    errors.type = "Please select an organisation type";
  }

  if (!form.timeZone) {
    errors.timeZone = "Please select a time zone";
  }

  if (!form.address.trim()) {
    errors.address = "Address is required.";
  } else if (form.address.length < 5) {
    errors.address = "Address must be at least 5 characters.";
  }

  if (!form.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  } else if (
    form.postalCode.length < 3 ||
    form.postalCode.length > 10 ||
    !/^[a-zA-Z0-9]+$/.test(form.postalCode)
  ) {
    errors.postalCode = "Postal code must be 3–10 alphanumeric characters.";
  }

  if (!form.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (
    !/[0-9]/.test(form.phone) ||
    form.phone.length < 7 ||
    form.phone.length > 15
  ) {
    errors.phone = "Enter a valid phone number (7-15) digits.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "A valid email is required.";
  }

  return errors;
}
