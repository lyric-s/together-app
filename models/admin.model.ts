/**
 * Admin-related data models.
 * These interfaces define the shape of admin data received from the API
 * and the payloads sent when creating or updating an admin account.
 */

export interface Admin {
  id_admin: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export interface AdminCreate {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}

export interface AdminUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
}
