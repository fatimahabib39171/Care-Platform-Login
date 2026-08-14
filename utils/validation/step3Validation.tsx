export type FormData = {
  question1: string;
  answer1: string;
  question2: string;
  answer2: string;
};

export type FormErrors = {
  question1?: string;
  answer1?: string;
  question2?: string;
  answer2?: string;
};

export function step3Validation(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.question1.trim()) {
    errors.question1 = "Please select a question.";
  }

  if (!form.answer1) {
    errors.answer1 = "Answer is required.";
  }

  if (!form.question2) {
    errors.question2 = "Please select a question.";
  }

  if (!form.answer2.trim()) {
    errors.answer2 = "Answer is required.";
  }

  return errors;
}
