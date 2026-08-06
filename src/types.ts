export interface UserProfile {
  name: string;
  age: number;
  height: string;
  weight: number;
  dominantFoot: "Right" | "Left" | "Both";
  position: string;
  teamLevel: string;
  yearsPlaying: number;
  strengths: string[];
  weaknesses: string[];
  goal: "Gain Muscle" | "Lose Fat" | "Improve Performance" | "Maintain Weight";
  dietaryRestrictions: string[];
  availableDays: number; // days per week
  gymAccess: boolean;
  equipment: string[];
  trainingTime: number; // minutes per session
  onboarded: boolean;
}

export interface TrainingPlan {
  dailyPlan: {
    todayGoals: string[];
    technicalDrills: Drill[];
    recoveryDrills: Drill[];
    coachingTips: string[];
  };
  weeklyPlan: {
    dayName: string;
    focus: string;
    completed: boolean;
  }[];
  monthlyRoadmap: {
    phase: string;
    focus: string;
    milestone: string;
  }[];
}

export interface Drill {
  name: string;
  duration: string;
  repsOrSets: string;
  coachingPoints: string[];
  demoInstructions: string;
  videoPlaceHolder: string; // url or descriptor
  completed: boolean;
  xpValue: number;
}

export interface LiftWorkout {
  id: string;
  name: string;
  focus: string;
  completed: boolean;
  exercises: LiftExercise[];
}

export interface LiftExercise {
  id: string;
  name: string;
  targetSets: number;
  targetReps: string;
  coachingPoints: string;
  sets: {
    reps: number;
    weight: number;
    completed: boolean;
  }[];
}

export interface NutritionLog {
  date: string;
  caloriesTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  waterTarget: number; // in ml
  caloriesConsumed: number;
  proteinConsumed: number; // in g
  waterConsumed: number; // in ml
  meals: Meal[];
}

export interface Meal {
  id: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Pre-Game" | "Post-Game";
  name: string;
  calories: number;
  protein: number;
  time: string;
}

export interface WeakFootSession {
  level: number; // 1 to 5
  touchesGoal: number;
  touchesCompleted: number;
  jugglesGoal: number;
  jugglesCompleted: number;
  passingAccuracyGoal: number; // e.g. 80%
  passingAccuracyLogged?: number;
  completed: boolean;
  date: string;
}

export interface SpeedTest {
  id: string;
  date: string;
  tenYardSprint: number; // seconds
  twentyYardSprint: number; // seconds
  flyingTen: number; // seconds
  verticalJump: number; // inches
}

export interface VideoAnalysis {
  id: string;
  date: string;
  videoName: string;
  skillType: "Shooting" | "Passing" | "Sprinting" | "Dribbling" | "First Touch";
  score: number; // 1-100
  critique: string;
  corrections: string[];
  annotations: { timestamp: string; note: string }[];
  proComparison: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  xpBonus: number;
}

export interface PerformanceReport {
  weekStarting: string;
  strengthsSummary: string;
  priorities: string[];
  nutritionAnalysis: string;
  workoutCompletionRate: number; // e.g. 85
  estimatedImprovementTrend: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}
