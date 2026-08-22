// Public Google Forms responder URL used by every "Get in touch" button.
export const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf-e-HyCV4FyFvNbOP-XRkIzZuqF9uUb8iaJiornVT5rPJyFA/viewform'

export function isGoogleFormUrl(value) {
  if (!value) return false

  try {
    const url = new URL(value)
    const isGoogleFormsPage = url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/')
    return url.protocol === 'https:' && (isGoogleFormsPage || url.hostname === 'forms.gle')
  } catch {
    return false
  }
}
