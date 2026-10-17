export type ContactIcon = "email" | "phone" | "linkedin" | "github";

export const CONTACT_LINKS: { icon: ContactIcon; label: string; value: string; href: string }[] = [
  { icon: "email", label: "Email", value: "felipeprono@gmail.com", href: "mailto:felipeprono@gmail.com" },
  { icon: "phone", label: "Teléfono", value: "+54 9 342 478-7555", href: "tel:+5493424787555" },
  { icon: "linkedin", label: "LinkedIn", value: "Felipe Prono", href: "https://www.linkedin.com/in/felipe-prono-5b0886173/" },
  { icon: "github", label: "GitHub", value: "feliprono01", href: "https://github.com/feliprono01" },
];

export const CONTACT_DIALOGUE: Record<"sent" | "error", string> = {
  sent: "¡Mensaje recibido! Te voy a responder a la brevedad, normalmente en menos de 24 horas.",
  error: "Algo salió mal al enviar el mensaje. Probá de nuevo o escribime directo a felipeprono@gmail.com.",
};
