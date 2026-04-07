import emailjs from "@emailjs/browser";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_TEMPLATE_ID_CONTACT,
} from "@/config/emailjs";

/** Home form — needs home template */
export function isHomeEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_PUBLIC_KEY?.trim() &&
      EMAILJS_SERVICE_ID?.trim() &&
      EMAILJS_TEMPLATE_ID?.trim()
  );
}

/** Contact form — needs contact template */
export function isContactEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_PUBLIC_KEY?.trim() &&
      EMAILJS_SERVICE_ID?.trim() &&
      EMAILJS_TEMPLATE_ID_CONTACT?.trim()
  );
}

function getControlValue(form: HTMLFormElement, key: string): string {
  const item = form.elements.namedItem(key);
  if (!item) return "";
  if (item instanceof RadioNodeList) {
    const first = item[0];
    return first && "value" in first
      ? String((first as HTMLInputElement).value).trim()
      : "";
  }
  return "value" in item
    ? String((item as HTMLInputElement | HTMLTextAreaElement).value).trim()
    : "";
}

/**
 * Contact form — same as:
 * emailjs.send(service_id, template_id, {
 *   name: form.name.value,  // use namedItem("name") because form.name is the form's own attribute
 *   email, phone, message
 * })
 * Template: {{name}}, {{email}}, {{phone}}, {{message}}
 */
export async function sendContactEmail(form: HTMLFormElement): Promise<void> {
  const publicKey = EMAILJS_PUBLIC_KEY.trim();
  const serviceId = EMAILJS_SERVICE_ID.trim();
  const templateId = EMAILJS_TEMPLATE_ID_CONTACT.trim();

  if (!publicKey || !serviceId || !templateId) {
    throw new Error(
      "EmailJS is not configured. Add your keys in src/config/emailjs.ts."
    );
  }

  const name = getControlValue(form, "name");
  const email = getControlValue(form, "email");
  const phone = getControlValue(form, "phone");
  const message = getControlValue(form, "message");

  await emailjs.send(
    serviceId,
    templateId,
    {
      name,
      email,
      phone,
      message,
    },
    { publicKey }
  );
}

/** Home — Request a Quote. Optional source line prepended to {{message}} */
export async function sendInquiryEmail(params: {
  name: string;
  email: string;
  phone: string;
  message: string;
  formSource?: string;
}): Promise<void> {
  const publicKey = EMAILJS_PUBLIC_KEY.trim();
  const serviceId = EMAILJS_SERVICE_ID.trim();
  const templateId = EMAILJS_TEMPLATE_ID.trim();

  if (!publicKey || !serviceId || !templateId) {
    throw new Error(
      "EmailJS is not configured. Add your keys in src/config/emailjs.ts."
    );
  }

  const messageBody = params.formSource
    ? `[${params.formSource}]\n\n${params.message}`
    : params.message;

  await emailjs.send(
    serviceId,
    templateId,
    {
      name: params.name,
      email: params.email,
      phone: params.phone.trim() || "—",
      message: messageBody,
    },
    { publicKey }
  );
}
