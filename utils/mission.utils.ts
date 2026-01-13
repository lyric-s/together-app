import { Mission } from '@/models/mission.model';

/**
 * Determine whether a mission's end date is in the past.
 *
 * Returns `false` if `mission.date_end` is missing or cannot be parsed as a valid date.
 *
 * @returns `true` if the mission's end date is earlier than the current time, `false` otherwise.
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