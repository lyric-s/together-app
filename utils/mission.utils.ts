import { Mission } from '@/models/mission.model';

/**
 * Check if a mission is already finished
 */
export function isMissionFinished(mission: Mission): boolean {
  return new Date(mission.date_end) < new Date();
}

// + nb of participant for a mission