import { Mission } from '@/models/mission.model';

/**
 * Check if a mission is already finished
 */
export function isMissionFinished(mission: Mission): boolean {
  return new Date(mission.date_end) < new Date();
}

// TODO: Add utility to calculate number of participants for a mission