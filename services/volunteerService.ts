import api from "./api";
import { AxiosError } from "axios";

import { Volunteer, VolunteerUpdate } from "@/models/volunteer.model";
import { Mission } from "@/models/mission.model";

/**
 * Helper to extract a readable error message from Axios
 */
function handleApiError(error: unknown): never {
  if (error instanceof AxiosError) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message;

    throw new Error(message);
  }

  throw new Error("Unexpected error occurred");
}

// get connected volunteer's data
export async function getMyVolunteerProfile(): Promise<Volunteer> {
  try {
    const { data } = await api.get<Volunteer>("/volunteers/me");
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// update volunteer's data
export async function updateMyVolunteerProfile(
  payload: VolunteerUpdate
): Promise<Volunteer> {
  try {
    const { data } = await api.patch<Volunteer>(
      "/volunteers/me",
      payload
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}


// get the number of accomplished mission by the volunteer
export async function getCompletedMissionsCount(): Promise<number> {
  try {
    const { data } = await api.get<number>(
      "/volunteers/me/missions/count"
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}


// get volunteer's masked password
export async function getMaskedPassword(): Promise<string> {
  try {
    const { data } = await api.get<string>(
      "/volunteers/me/password-mask"
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// get volunteer's missions for a specific day
export async function getMyMissionsByDate(
  date: string // YYYY-MM-DD
): Promise<Mission[]> {
  try {
    const { data } = await api.get<Mission[]>(
      "/volunteers/me/missions",
      { params: { date } }
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// get all volunteer's missions
export async function getAllMyMissions(): Promise<Mission[]> {
  try {
    const { data } = await api.get<Mission[]>(
      "/volunteers/me/missions"
    );
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

