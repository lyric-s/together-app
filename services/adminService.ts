import api from './api';
import { AxiosError } from 'axios';
import { Volunteer,} from '@/models/volunteer.model';

// --- Error handling helper ---
function handleApiError(error: unknown): never {
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

export const adminService = {
    /**
     * List all volunteers (Paginate)
     * GET /volunteers/
     */
    getAllVolunteers: async (offset = 0, limit = 100): Promise<Volunteer[]> => {
        try {
        const { data } = await api.get<Volunteer[]>('/volunteers/', {
            params: { offset, limit }
        });
        return data;
        } catch (error) {
        handleApiError(error);
        }
    }


};