// PASTE_GOOGLE_FORM_URL_HERE
// Example: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
export const googleFormUrl = ''

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
