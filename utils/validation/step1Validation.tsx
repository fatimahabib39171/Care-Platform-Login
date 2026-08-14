export type FormData = {
  organisationName: string;
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
  organisationName?: string;
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

  if (!form.organisationName.trim()) {
    errors.organisationName = "Organisation name is required.";
  }

  if (!form.type) {
    errors.type = "Please select an organisation type";
  }

  if (!form.timeZone) {
    errors.timeZone = "Please select a time zone";
  }

  if (!form.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!form.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  }

  if (!form.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "A valid email is required.";
  }

  return errors;
}
