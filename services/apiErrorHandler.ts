import { AxiosError } from 'axios';

/**
 * Extracts a user-facing message from an API error and throws an Error.
 *
 * Attempts to derive the message in this order when the input is an AxiosError:
 * `response.data.detail`, `response.data.message`, `error.message`, or the fallback
 * `"Une erreur inconnue est survenue."`. Logs the selected message to the console
 * prefixed with `"API Error:"` before throwing.
 *
 * @param error - The caught error to analyze; may be an AxiosError with a response payload or any other value.
 * @throws An `Error` with the selected message for AxiosError inputs; for non-Axios errors throws `Error("Erreur inattendue de connexion.")`.
 */
export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    // Attempts to retrieve the error message from the backend (FastAPI/Django/Node)
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      "Une erreur inconnue est survenue.";
    
    console.error("API Error:", message);
    throw new Error(message);
  }
  throw new Error("Erreur inattendue de connexion.");
}