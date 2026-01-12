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
    let message = "Une erreur inconnue est survenue.";
    const responseData = error.response?.data as any; // Cast explicite pour accès souple

    if (responseData) {
      if (typeof responseData.detail === 'string') {
        message = responseData.detail;
      } else if (Array.isArray(responseData.detail)) {
        message = responseData.detail.map((e: any) => e.msg || JSON.stringify(e)).join(', ');
      } else if (typeof responseData.message === 'string') {
        message = responseData.message;
      } else if (typeof responseData === 'string') {
        message = responseData;
      }
    } else if (error.message) {
      message = error.message;
    }

    console.error("API Error (Full):", error);

    throw new Error(message, { cause: error });
  }

  console.error("Non-API Error:", error);
  throw new Error("Erreur inattendue de connexion.", { cause: error });
}