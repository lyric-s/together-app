import { Mission } from '@/models/mission.model';

/**
 * Check if a mission is already finished
 */
export function isMissionFinished(mission: Mission): boolean {
  if (!mission.date_end) {
    return false;
  }
  const endDate = new Date(mission.date_end);
  if (isNaN(endDate.getTime())) {
    return false;
  }
  return endDate < new Date();
}

// TODO: Add utility to calculate number of participants for a mission