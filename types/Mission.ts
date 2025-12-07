export type Mission = {
  id: string,
  title: string,
  image: string,
  dateStart: string,
  dateEnd: string,
  categ: string,
  nbMin: number,
  nbMax: number,
  nbRegistered: number,
  place: string,
  description: string,
};

export type MissionEditable = Omit<Mission, 'nbMin' | 'nbMax'> & {
  nbMin: number | string;
  nbMax: number | string;
};