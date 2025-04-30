/**
 * Interfaces for lookup services.
 */
import { Role } from "../models/role.js";

/**
 * Interface for role lookup service.
 */
export interface IRoleLookupService {
  /**
   * Finds a role by name, ID, or keywords using a prioritized lookup strategy.
   * @param name The role name, ID, or keyword
   * @returns The role if found, null otherwise
   */
  findRole(name: string): Role | null;
}
