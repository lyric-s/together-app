import { User } from "./user.model";

/**
 * Association data models.
 * Describes association profiles as exposed by the API, along with
 * payloads used to create or update association information.
 */

export interface Association {
  id_asso: number;
  id_user: number;
  name: string;
  address: string;
  country: string;
  phone_number: string;
  zip_code: string;
  rna_code: string;
  company_name: string;
  description: string;
  user?: User;
}

export interface AssociationCreate {
  name: string;
  address: string;
  country: string;
  phone_number: string;
  zip_code: string;
  rna_code: string;
  company_name: string;
  description: string;
}

export interface AssociationUpdate {
  name?: string;
  address?: string;
  country?: string;
  phone_number?: string;
  zip_code?: string;
  rna_code?: string;
  company_name?: string;
  description?: string;
}
