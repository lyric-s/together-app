import { Mission, MissionPublic } from '@/models/mission.model';

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

/**
 * Maps a MissionPublic (read-only) object to an editable Mission model.
 * This helps unify data structures for the edit form.
 */
export const mapMissionPublicToMission = (mission: MissionPublic): Mission => ({
  id_mission: mission.id_mission,
  name: mission.name,
  description: mission.description,
  skills: mission.skills,
  date_start: mission.date_start,
  date_end: mission.date_end,
  capacity_min: mission.capacity_min,
  capacity_max: mission.capacity_max,
  image_url: mission.image_url,
  id_location: mission.id_location,
  id_categ: mission.id_categ,
  id_asso: mission.id_asso,
  location: mission.location,
  category: mission.category,
  association: mission.association,
});


// TODO: Add utility to calculate number of participants for a mission