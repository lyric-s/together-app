import { AxiosError } from 'axios';

/**
 * Handle an API error by extracting a user-facing message and terminating execution.
 *
 * @param error - The caught error to analyze; may be an AxiosError with a response payload or any other error value.
 * @throws An Error with a message extracted in this order when the input is an AxiosError: `response.data.detail`, `response.data.message`, `error.message`, or the fallback `"Une erreur inconnue est survenue."`. For non-Axios errors, throws `Error("Erreur inattendue de connexion.")`.
 * @remarks Also logs the selected message to the console prefixed with "API Error:" before throwing.
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