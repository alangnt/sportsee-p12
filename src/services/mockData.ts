import type { UserData } from '../types';

export const mockUserData: UserData = {
  mainData: {
    id: 0,
    firstName: 'Thomas',
    score: 0.5,
    calorieCount: 1930,
    proteinCount: 155,
    carbohydrateCount: 290,
    lipidCount: 50,
  },
  activity: [
    { day: '1', kilogram: 68, calories: 356 },
    { day: '2', kilogram: 69, calories: 349 },
    { day: '3', kilogram: 68, calories: 310 },
    { day: '4', kilogram: 69, calories: 800 },
    { day: '5', kilogram: 67, calories: 100 },
    { day: '6', kilogram: 67, calories: 320 },
    { day: '7', kilogram: 68, calories: 329 },
    { day: '8', kilogram: 67, calories: 510 },
    { day: '9', kilogram: 66, calories: 1100 },
    { day: '10', kilogram: 68, calories: 342 },
  ],
  averageSessions: [
    { day: 'L', sessionLength: 400 },
    { day: 'M', sessionLength: 300 },
    { day: 'M', sessionLength: 320 },
    { day: 'J', sessionLength: 200 },
    { day: 'V', sessionLength: 278 },
    { day: 'S', sessionLength: 189 },
    { day: 'D', sessionLength: 189 },
  ],
  performance: [
    { subject: 'Intensité', value: 80 },
    { subject: 'Vitesse', value: 90 },
    { subject: 'Force', value: 70 },
    { subject: 'Endurance', value: 85 },
    { subject: 'Energie', value: 60 },
    { subject: 'Cardio', value: 75 },
  ],
};
