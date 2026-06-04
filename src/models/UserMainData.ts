import type { UserMainDataRaw } from '../types';

export class UserMainData {
  id: number;
  firstName: string;
  score: number;
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;

  constructor(raw: UserMainDataRaw) {
    this.id = raw.id;
    this.firstName = raw.userInfos.firstName;
    this.score = raw.todayScore ?? raw.score ?? 0;
    this.calorieCount = raw.keyData.calorieCount;
    this.proteinCount = raw.keyData.proteinCount;
    this.carbohydrateCount = raw.keyData.carbohydrateCount;
    this.lipidCount = raw.keyData.lipidCount;
  }
}
