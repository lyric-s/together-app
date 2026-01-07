import { User } from "./user.model";
import { Mission } from "./mission.model";

/**
 * Volunteer data models.
 * Represents volunteer profiles, including personal information,
 * related user account data, and mission-related statistics.
 */

export interface Volunteer {
  id_volunteer: number;
  id_user: number;
  last_name: string;
  first_name: string;
  phone_number: string;
  birthdate: string;
  skills: string;
  address?: string;
  zip_code?: string;
  bio: string;

  active_missions_count: number;
  finished_missions_count: number;

  user?: User;
  missions?: Mission[];
}

export interface VolunteerCreate {
  last_name: string;
  first_name: string;
  phone_number: string;
  birthdate: string;
  skills: string;
  address?: string;
  zip_code?: string;
  bio: string;
}

export interface VolunteerUpdate {
  last_name?: string;
  first_name?: string;
  phone_number?: string;
  birthdate?: string;
  skills?: string;
  address?: string;
  zip_code?: string;
  bio?: string;

  email?: string;
  password?: string;
}
