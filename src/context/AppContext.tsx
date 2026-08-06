import React, { createContext, useContext, useState, useEffect } from "react";
import {
  UserProfile,
  TrainingPlan,
  LiftWorkout,
  NutritionLog,
  WeakFootSession,
  SpeedTest,
  VideoAnalysis,
  Achievement,
  PerformanceReport,
  ChatMessage,
} from "../types";

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  trainingPlan: TrainingPlan | null;
  updateTrainingPlan: (plan: TrainingPlan) => void;
  liftWorkouts: LiftWorkout[];
  updateLiftWorkout: (workoutId: string, exercises: any[]) => void;
  toggleLiftWorkoutCompleted: (workoutId: string) => void;
  nutritionLog: NutritionLog;
  logMeal: (meal: { type: any; name: string; calories: number; protein: number }) => void;
  deleteMeal: (mealId: string) => void;
  logWater: (amount: number) => void;
  weakFootState: {
    currentLevel: number;
    streak: number;
    totalTouches: number;
    xp: number;
    levelObj: WeakFootSession;
  };
  logWeakFootActivity: (touches: number, juggles: number, accuracy: number) => void;
  speedTests: SpeedTest[];
  logSpeedTest: (test: Omit<SpeedTest, "id" | "date">) => void;
  videoAnalyses: VideoAnalysis[];
  analyzeUserVideo: (skillType: string, videoName: string, duration: string) => Promise<VideoAnalysis>;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  performanceReports: PerformanceReport[];
  generateNewPerformanceReport: () => Promise<void>;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => Promise<void>;
  resetAllData: () => void;
  onboardUser: (profile: UserProfile) => Promise<void>;
  adjustTrainingPlan: (params: { fatigue: number; soreness: number; missedSessions: boolean; injuryStatus: string; daysUntilMatch: string; newFocus: string; userNotes?: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
  xp: number;
  addXp: (amount: number) => void;
  level: number;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const defaultProfile: UserProfile = {
  name: "",
  age: 16,
  height: "5'10\"",
  weight: 155,
  dominantFoot: "Right",
  position: "Winger",
  teamLevel: "Varsity / Elite Academy",
  yearsPlaying: 8,
  strengths: ["Pace", "Dribbling", "1v1 attacking"],
  weaknesses: ["Crossing", "Weak-foot shooting", "Defensive tracking"],
  goal: "Improve Performance",
  dietaryRestrictions: [],
  availableDays: 4,
  gymAccess: true,
  equipment: ["Cones", "Ball", "Rebounder", "Gym Weights"],
  trainingTime: 60,
  onboarded: false,
};

const initialAchievements: Achievement[] = [
  { id: "first_drill", title: "Academy Debut", description: "Complete your first AI technical drill", unlocked: true, unlockedAt: "2026-06-15", iconName: "Trophy", xpBonus: 100 },
  { id: "weak_foot_1", title: "Dextrous Striker", description: "Reach 1,000 recorded weak-foot touches", unlocked: false, iconName: "Compass", xpBonus: 250 },
  { id: "lift_streak", title: "Iron Winger", description: "Complete 3 soccer weightlifting sessions", unlocked: false, iconName: "Flame", xpBonus: 300 },
  { id: "nutrition_pro", title: "Fuel Station", description: "Meet your daily protein goal 3 days in a row", unlocked: true, unlockedAt: "2026-06-17", iconName: "Apple", xpBonus: 150 },
  { id: "sprint_pr", title: "Sonic Surge", description: "Log a sub-1.6s 10-yard sprint", unlocked: false, iconName: "Zap", xpBonus: 500 },
];

const initialSpeedTests: SpeedTest[] = [
  { id: "st_1", date: "2026-06-01", tenYardSprint: 1.68, twentyYardSprint: 3.12, flyingTen: 1.22, verticalJump: 24.5 },
  { id: "st_2", date: "2026-06-08", tenYardSprint: 1.64, twentyYardSprint: 3.05, flyingTen: 1.18, verticalJump: 25.0 },
  { id: "st_3", date: "2026-06-15", tenYardSprint: 1.59, twentyYardSprint: 2.98, flyingTen: 1.15, verticalJump: 26.2 },
];

const initialWeakFootSessions: WeakFootSession = {
  level: 1,
  touchesGoal: 200,
  touchesCompleted: 75,
  jugglesGoal: 20,
  jugglesCompleted: 8,
  passingAccuracyGoal: 70,
  passingAccuracyLogged: 65,
  completed: false,
  date: "2026-06-18",
};

const initialNutrition: NutritionLog = {
  date: "2026-06-18",
  caloriesTarget: 2900,
  proteinTarget: 150,
  carbsTarget: 380,
  waterTarget: 3700,
  caloriesConsumed: 1850,
  proteinConsumed: 95,
  waterConsumed: 2200,
  meals: [
    { id: "meal_1", type: "Breakfast", name: "Oatmeal with whey protein, banana & honey", calories: 620, protein: 35, time: "08:15" },
    { id: "meal_2", type: "Lunch", name: "Grilled chicken breast, brown rice & broccoli", calories: 780, protein: 48, time: "13:00" },
    { id: "meal_3", type: "Snack", name: "Greek yogurt with berries", calories: 450, protein: 12, time: "16:30" },
  ],
};

const initialReports: PerformanceReport[] = [
  {
    weekStarting: "2026-06-11",
    strengthsSummary: "Excellent consistency on high-velocity hamstring loading and technical ball-mastery drills. Weak-foot touches surpassed 1,200 total inside our academy.",
    priorities: ["Increase daily hydration to 3.7L", "Incorporate flying 10m sprint triggers", "Introduce level 3 Wall-passing circuits"],
    nutritionAnalysis: "Your protein intake was optimal (avg 152g), fueling rapid muscle micro-tear repair nicely. However, hydration tracking lagged, sparking mild 2nd-half calf tightness.",
    workoutCompletionRate: 90,
    estimatedImprovementTrend: "Projecting a +0.2s acceleration surge over 20-yards and 5% higher direct instep shot velocity with your non-dominant foot by week 4.",
  },
];

const initialPlan: TrainingPlan = {
  dailyPlan: {
    todayGoals: ["Complete Ball Mastery Warmup", "Finish Day 1 Leg Power Lift", "Submit Video Drill of Weak-foot strike"],
    technicalDrills: [
      {
        name: "La Croqueta & Inside-Outside Cut Circuit",
        duration: "15 mins",
        repsOrSets: "4 sets of 90 sec intervals",
        coachingPoints: [
          "Keep center of gravity low",
          "Slide ball quickly from right to left foot, then burst past cone",
          "Touch ball with pinky toe on external cuts",
        ],
        demoInstructions: "Lay out 4 cones in a square. Move the ball cleanly between your feet using the inside edge, then immediately direct it outward. Focus on the quick acceleration shift.",
        videoPlaceHolder: "la_croqueta_demo",
        completed: false,
        xpValue: 120,
      },
      {
        name: "Elite Weak Foot Instinct Wall Pass",
        duration: "10 mins",
        repsOrSets: "100 firm instep passes",
        coachingPoints: [
          "Lock ankle of your weak foot tightly",
          "Point toes upwards and outwards on contact",
          "Strike through the center of the ball",
        ],
        demoInstructions: "Stand 3 yards from a firm brick wall or soccer rebounder. Receive with the inside of your dominant foot, transfer weights, then fire a highly accurate strike back using only your weak foot.",
        videoPlaceHolder: "weak_foot_wall_pass",
        completed: false,
        xpValue: 100,
      },
    ],
    recoveryDrills: [
      {
        name: "Sports Lab Dynamic Mobility & Hip Opener",
        duration: "12 mins",
        repsOrSets: "2 passes per movement",
        coachingPoints: [
          "Focus on deep controlled diaphragmatic breaths",
          "Open dynamic gate outward with knee parallel to soil",
          "Incorporate light lateral glute-stretch holds",
        ],
        demoInstructions: "Perform walking lunges, high knees, open/close the gates, and hamstring sweeps in a 10-yard lane. Ensures explosive hip agility.",
        videoPlaceHolder: "mobility_warmup",
        completed: false,
        xpValue: 60,
      },
    ],
    coachingTips: [
      "Prioritize dynamic mobility before sprinting—static stretching decreases muscle explosive elasticity.",
      "Stay hydrated: drink 500ml water at least 1 hour before training to improve muscle oxygenation.",
    ],
  },
  weeklyPlan: [
    { dayName: "Monday", focus: "Explosive Technical Mastery & Strength Power", completed: true },
    { dayName: "Tuesday", focus: "Acceleration Mechanics & Plyometrics", completed: false },
    { dayName: "Wednesday", focus: "Active Recovery, Mobility & Match Prep", completed: false },
    { dayName: "Thursday", focus: "Technical Weak-Foot Passing & Aerobic Capacity", completed: false },
    { dayName: "Friday", focus: "Pre-Game Priming & Tactical Visualization", completed: false },
    { dayName: "Saturday", focus: "Match Day (Apply Elite Week Instincts)", completed: false },
    { dayName: "Sunday", focus: "Deep Tissue Stretching, Hot-Cold, Mindset Prep", completed: false },
  ],
  monthlyRoadmap: [
    { phase: "Week 1-2: Foundations", focus: "Build ankle stiffness in weak foot & eccentric leg strength.", milestone: "1,500 weak touches & full trap bar loading depth achieved." },
    { phase: "Week 3-4: Progressions", focus: "Dynamic first-touch transfers & fast hip transition acceleration.", milestone: "Level 3 Weak Foot Academy Unlock & sub-1.62s 10m sprint time." },
  ],
};

const initialLifting: LiftWorkout[] = [
  {
    id: "lift_custom_1",
    name: "Day 1: Explosive Power & Speed Foundations",
    focus: "Lower body speed, hip extension, ankle stiffness",
    completed: false,
    exercises: [
      {
        id: "ex_1",
        name: "Trap Bar Deadlifts",
        targetSets: 3,
        targetReps: "5 reps",
        coachingPoints: "Explode up, drive heels into ground, lock hips at top with glute squeeze.",
        sets: [
          { reps: 5, weight: 135, completed: false },
          { reps: 5, weight: 155, completed: false },
          { reps: 5, weight: 185, completed: false },
        ],
      },
      {
        id: "ex_2",
        name: "Bulgarian Split Squats (Quads & VMO Knee Safety)",
        targetSets: 3,
        targetReps: "8 reps per leg",
        coachingPoints: "Lower knee with control. Keep front knee behind toe line. Explode up.",
        sets: [
          { reps: 8, weight: 40, completed: false },
          { reps: 8, weight: 40, completed: false },
          { reps: 8, weight: 50, completed: false },
        ],
      },
      {
        id: "ex_3",
        name: "Nordic Hamstring Curls (ACL Injury Prevention)",
        targetSets: 3,
        targetReps: "6 reps",
        coachingPoints: "Lower as slowly as possible. Catch yourself softly and push back up.",
        sets: [
          { reps: 6, weight: 0, completed: false },
          { reps: 6, weight: 0, completed: false },
          { reps: 6, weight: 0, completed: false },
        ],
      },
      {
        id: "ex_4",
        name: "Push Press (Upper body explosive trunk transfer)",
        targetSets: 3,
        targetReps: "6 reps",
        coachingPoints: "Dip legs slightly, drive weight overhead aggressively using hip drive.",
        sets: [
          { reps: 6, weight: 95, completed: false },
          { reps: 6, weight: 95, completed: false },
          { reps: 6, weight: 115, completed: false },
        ],
      },
    ],
  },
];

const initialChatHistory: ChatMessage[] = [
  { role: "model", text: "Hey there! I'm Coach Tyler. Welcome to SoccerForge AI! ⚽🏋️‍♂️\n\nI'm ready to help you push your game to the next level. Fire any questions my way—whether you need drills for first touch, a custom meal plan for tomorrow's big match, or help adjusting your squat details!", timestamp: "08:00 AM" },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [liftWorkouts, setLiftWorkouts] = useState<LiftWorkout[]>(initialLifting);
  const [nutritionLog, setNutritionLog] = useState<NutritionLog>(initialNutrition);
  
  // Weak foot state
  const [weakFootLevel, setWeakFootLevel] = useState<number>(1);
  const [weakFootStreak, setWeakFootStreak] = useState<number>(5);
  const [weakFootTotalTouches, setWeakFootTotalTouches] = useState<number>(1450);
  const [weakFootSessionState, setWeakFootSessionState] = useState<WeakFootSession>(initialWeakFootSessions);

  const [speedTests, setSpeedTests] = useState<SpeedTest[]>(initialSpeedTests);
  const [videoAnalyses, setVideoAnalyses] = useState<VideoAnalysis[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [performanceReports, setPerformanceReports] = useState<PerformanceReport[]>(initialReports);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatHistory);
  
  const [xp, setXp] = useState<number>(1250);
  const [level, setLevel] = useState<number>(4);
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("sf_profile");
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

      const savedPlan = localStorage.getItem("sf_plan");
      if (savedPlan) {
        setTrainingPlan(JSON.parse(savedPlan));
      } else {
        // give realistic default plan until they fully onboard
        setTrainingPlan(initialPlan);
      }

      const savedLifts = localStorage.getItem("sf_lifts");
      if (savedLifts) {
        setLiftWorkouts(JSON.parse(savedLifts));
      }

      const savedNutrition = localStorage.getItem("sf_nutrition");
      if (savedNutrition) {
        setNutritionLog(JSON.parse(savedNutrition));
      }

      const savedWFStreak = localStorage.getItem("sf_wf_streak");
      if (savedWFStreak) setWeakFootStreak(parseInt(savedWFStreak, 10));

      const savedWFTouches = localStorage.getItem("sf_wf_touches");
      if (savedWFTouches) setWeakFootTotalTouches(parseInt(savedWFTouches, 10));

      const savedWFLevel = localStorage.getItem("sf_wf_level");
      if (savedWFLevel) setWeakFootLevel(parseInt(savedWFLevel, 10));

      const savedWFSession = localStorage.getItem("sf_wf_session");
      if (savedWFSession) setWeakFootSessionState(JSON.parse(savedWFSession));

      const savedSpeed = localStorage.getItem("sf_speed");
      if (savedSpeed) setSpeedTests(JSON.parse(savedSpeed));

      const savedVideos = localStorage.getItem("sf_videos");
      if (savedVideos) setVideoAnalyses(JSON.parse(savedVideos));

      const savedAchievements = localStorage.getItem("sf_achievements");
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));

      const savedReports = localStorage.getItem("sf_reports");
      if (savedReports) setPerformanceReports(JSON.parse(savedReports));

      const savedChat = localStorage.getItem("sf_chat");
      if (savedChat) setChatMessages(JSON.parse(savedChat));

      const savedXp = localStorage.getItem("sf_xp");
      if (savedXp) setXp(parseInt(savedXp, 10));

      const savedLevel = localStorage.getItem("sf_level");
      if (savedLevel) setLevel(parseInt(savedLevel, 10));

      const savedDark = localStorage.getItem("sf_dark_mode");
      if (savedDark) setDarkMode(savedDark === "true");
    } catch (e) {
      console.error("Local storage restoration failed:", e);
    }
  }, []);

  // Sync utilities
  const save = (key: string, data: any) => {
    localStorage.setItem(key, typeof data === "string" ? data : JSON.stringify(data));
  };

  const addXp = (amount: number) => {
    setXp((prev) => {
      const newXp = prev + amount;
      save("sf_xp", newXp);
      // Determine level (e.g. 500xp per level)
      const newLevel = Math.floor(newXp / 500) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        save("sf_level", newLevel);
        // unlock levels achieve or flash celebrations
      }
      return newXp;
    });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const merged = { ...prev, ...profile };
      save("sf_profile", merged);
      return merged;
    });
  };

  const updateTrainingPlan = (plan: TrainingPlan) => {
    setTrainingPlan(plan);
    save("sf_plan", plan);
  };

  // Onboard users and fetch customized plan from server-side Gemini 3.5-flash
  const onboardUser = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/coaching/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      if (!res.ok) {
        throw new Error("Could not construct AI plan. Please check Gemini API status.");
      }

      const data = await res.json();
      
      const updatedProfile = { ...profile, onboarded: true };
      setUserProfile(updatedProfile);
      save("sf_profile", updatedProfile);

      if (data.trainingPlan) {
        setTrainingPlan(data.trainingPlan);
        save("sf_plan", data.trainingPlan);
      }

      if (data.liftingPlan) {
        // Map elements into exercises with mock empty completed records
        const loadedLifts = data.liftingPlan.map((l: any) => ({
          ...l,
          exercises: l.exercises.map((e: any) => ({
            ...e,
            sets: [
              { reps: parseInt(e.targetReps) || 8, weight: 45, completed: false },
              { reps: parseInt(e.targetReps) || 8, weight: 65, completed: false },
              { reps: parseInt(e.targetReps) || 8, weight: 85, completed: false },
            ],
          })),
        }));
        setLiftWorkouts(loadedLifts);
        save("sf_lifts", loadedLifts);
      }

      // Load target nutrition values
      const newNutritionLog = {
        ...initialNutrition,
        caloriesTarget: data.calories || 2800,
        proteinTarget: data.protein || 160,
        carbsTarget: data.carbs || 350,
        waterTarget: data.water || 3500,
        caloriesConsumed: 0,
        proteinConsumed: 0,
        meals: [],
      };
      setNutritionLog(newNutritionLog);
      save("sf_nutrition", newNutritionLog);

      addXp(150); // XP bonus for onboarding completion
      unlockAchievement("first_drill");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to finalize onboarding setup.");
    } finally {
      setLoading(false);
    }
  };

  const adjustTrainingPlan = async (params: {
    fatigue: number;
    soreness: number;
    missedSessions: boolean;
    injuryStatus: string;
    daysUntilMatch: string;
    newFocus: string;
    userNotes?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/coaching/adjust-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: userProfile,
          adjustmentParams: params,
          currentPlan: trainingPlan,
          liftingPlan: liftWorkouts,
        }),
      });

      if (!res.ok) {
        throw new Error("Could not construct adaptive plan. Please check Gemini API status.");
      }

      const data = await res.json();
      if (!data) throw new Error("Received empty response from adjustment server.");

      if (data.trainingPlan) {
        setTrainingPlan(data.trainingPlan);
        save("sf_plan", data.trainingPlan);
      }

      if (data.liftingPlan) {
        const loadedLifts = data.liftingPlan.map((l: any) => ({
          ...l,
          exercises: l.exercises.map((e: any) => ({
            ...e,
            sets: e.sets || [
              { reps: parseInt(e.targetReps) || 8, weight: 45, completed: false },
              { reps: parseInt(e.targetReps) || 8, weight: 65, completed: false },
              { reps: parseInt(e.targetReps) || 8, weight: 85, completed: false },
            ],
          })),
        }));
        setLiftWorkouts(loadedLifts);
        save("sf_lifts", loadedLifts);
      }

      const newNutritionLog = {
        ...nutritionLog,
        caloriesTarget: data.calories || nutritionLog.caloriesTarget,
        proteinTarget: data.protein || nutritionLog.proteinTarget,
        carbsTarget: data.carbs || nutritionLog.carbsTarget,
        waterTarget: data.water || nutritionLog.waterTarget,
      };
      setNutritionLog(newNutritionLog);
      save("sf_nutrition", newNutritionLog);

      addXp(100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to adaptive align your workout routine.");
    } finally {
      setLoading(false);
    }
  };

  // Technical drills completion hooks
  const toggleLiftWorkoutCompleted = (workoutId: string) => {
    setLiftWorkouts((prev) => {
      const updated = prev.map((w) => {
        if (w.id === workoutId) {
          const toggled = !w.completed;
          if (toggled) {
            addXp(200);
            // check achievements
            const completedCount = prev.filter((wk) => wk.completed).length + 1;
            if (completedCount >= 3) {
              unlockAchievement("lift_streak");
            }
          }
          return { ...w, completed: toggled };
        }
        return w;
      });
      save("sf_lifts", updated);
      return updated;
    });
  };

  const updateLiftWorkout = (workoutId: string, exercises: any[]) => {
    setLiftWorkouts((prev) => {
      const updated = prev.map((w) => {
        if (w.id === workoutId) {
          return { ...w, exercises };
        }
        return w;
      });
      save("sf_lifts", updated);
      return updated;
    });
  };

  // Nutrition tracking helpers
  const logMeal = (meal: { type: any; name: string; calories: number; protein: number }) => {
    setNutritionLog((prev) => {
      const newMeal = {
        id: "meal_" + Date.now(),
        ...meal,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      const meals = [...prev.meals, newMeal];
      const caloriesConsumed = prev.caloriesConsumed + meal.calories;
      const proteinConsumed = prev.proteinConsumed + meal.protein;
      const updated = { ...prev, meals, caloriesConsumed, proteinConsumed };
      save("sf_nutrition", updated);
      addXp(40);
      return updated;
    });
  };

  const deleteMeal = (mealId: string) => {
    setNutritionLog((prev) => {
      const mToDel = prev.meals.find((m) => m.id === mealId);
      if (!mToDel) return prev;
      const meals = prev.meals.filter((m) => m.id !== mealId);
      const caloriesConsumed = Math.max(0, prev.caloriesConsumed - mToDel.calories);
      const proteinConsumed = Math.max(0, prev.proteinConsumed - mToDel.protein);
      const updated = { ...prev, meals, caloriesConsumed, proteinConsumed };
      save("sf_nutrition", updated);
      return updated;
    });
  };

  const logWater = (amount: number) => {
    setNutritionLog((prev) => {
      const waterConsumed = prev.waterConsumed + amount;
      const updated = { ...prev, waterConsumed };
      save("sf_nutrition", updated);
      addXp(15);
      return updated;
    });
  };

  // Weak Foot Academy logging mechanisms
  const logWeakFootActivity = (touches: number, juggles: number, accuracy: number) => {
    setWeakFootTotalTouches((prev) => {
      const res = prev + touches;
      save("sf_wf_touches", res);
      if (res >= 1000) {
        unlockAchievement("weak_foot_1");
      }
      return res;
    });

    setXp((prevXp) => {
      const updatedXp = prevXp + Math.floor(touches / 2);
      save("sf_xp", updatedXp);
      return updatedXp;
    });

    setWeakFootSessionState((prev) => {
      const tComp = Math.min(prev.touchesGoal, prev.touchesCompleted + touches);
      const jugComp = Math.min(prev.jugglesGoal, prev.jugglesCompleted + juggles);
      const isCompletedNow = tComp >= prev.touchesGoal && jugComp >= prev.jugglesGoal;

      if (isCompletedNow && !prev.completed) {
        addXp(150);
        setWeakFootStreak((s) => {
          const ns = s + 1;
          save("sf_wf_streak", ns);
          return ns;
        });

        // Chance to level up!
        if (weakFootLevel < 5) {
          const nextLvl = weakFootLevel + 1;
          setWeakFootLevel(nextLvl);
          save("sf_wf_level", nextLvl);
        }
      }

      const updated = {
        ...prev,
        touchesCompleted: tComp,
        jugglesCompleted: jugComp,
        passingAccuracyLogged: accuracy,
        completed: isCompletedNow || prev.completed,
      };
      save("sf_wf_session", updated);
      return updated;
    });
  };

  // Speed Lab tracking
  const logSpeedTest = (test: Omit<SpeedTest, "id" | "date">) => {
    const newTest: SpeedTest = {
      id: "st_" + Date.now(),
      date: new Date().toLocaleDateString(),
      ...test,
    };
    setSpeedTests((prev) => {
      const updated = [...prev, newTest];
      save("sf_speed", updated);
      return updated;
    });
    addXp(100);

    if (test.tenYardSprint < 1.6) {
      unlockAchievement("sprint_pr");
    }
  };

  // Vision Performance Analysis upload
  const analyzeUserVideo = async (skillType: string, videoName: string, duration: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/video/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillType, videoName, duration }),
      });

      if (!res.ok) {
        throw new Error("Could not get simulated video feedback. Check API credentials.");
      }

      const results: VideoAnalysis = await res.json();
      setVideoAnalyses((prev) => {
        const u = [results, ...prev];
        save("sf_videos", u);
        return u;
      });
      addXp(200);
      return results;
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to trigger automated technique overlay analysis.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Achievements Unlocking
  const unlockAchievement = (id: string) => {
    setAchievements((prev) => {
      const updated = prev.map((a) => {
        if (a.id === id && !a.unlocked) {
          addXp(a.xpBonus);
          return { ...a, unlocked: true, unlockedAt: new Date().toLocaleDateString() };
        }
        return a;
      });
      save("sf_achievements", updated);
      return updated;
    });
  };

  // Weekly Performance Report Tracker
  const generateNewPerformanceReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const mockHistory = {
        workoutsCompleted: liftWorkouts.filter((w) => w.completed).length,
        totalWeakFootTouchesThisWeek: weakFootSessionState.touchesCompleted,
        avgWaterDrank: nutritionLog.waterConsumed,
        recentSprintSeconds: speedTests[speedTests.length - 1]?.tenYardSprint || 1.65,
      };

      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logHistory: mockHistory,
          profile: userProfile,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to construct weekly coaching assessment metrics.");
      }

      const report: PerformanceReport = await res.json();
      setPerformanceReports((prev) => {
        const u = [report, ...prev];
        save("sf_reports", u);
        return u;
      });
      addXp(120);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Impossible to evaluate historical metrics.");
    } finally {
      setLoading(false);
    }
  };

  // Freeform Chat Interface with Coach Tyler
  const sendChatMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChat = [...chatMessages, userMsg];
    setChatMessages(updatedChat);
    save("sf_chat", updatedChat);

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: chatMessages,
          currentMessage: text,
          profile: userProfile,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to prompt model. Make sure API key is loaded.");
      }

      const raw = await res.json();
      const replyText = raw.text || "";

      // Parse coach actions [COACH_ACTION:...]
      const coachActionRegex = /\[COACH_ACTION:([^\]]+)\]/g;
      const matches = Array.from(replyText.matchAll(coachActionRegex)) as any[];

      matches.forEach((match) => {
        try {
          const actionStr = match[1];
          const parts = actionStr.split(":");
          const actionType = parts[0];
          const paramsStr = parts.slice(1).join(":");

          const params: Record<string, string> = {};
          paramsStr.split("|").forEach((p: string) => {
            const eqIndex = p.indexOf("=");
            if (eqIndex !== -1) {
              const k = p.substring(0, eqIndex).trim();
              const v = p.substring(eqIndex + 1).trim();
              params[k] = v;
            }
          });

          if (actionType === "ADD_DRILL") {
            const name = params.name || "Custom Coach Drill";
            const duration = params.duration || "15 mins";
            const repsOrSets = params.repsOrSets || "3 sets";
            const instructions = params.instructions || "Execute as instructed by Coach Tyler.";
            const type = params.type || "technical";
            const points = params.points ? params.points.split(",") : ["Stay focused", "High intensity"];

            setTrainingPlan((prevPlan) => {
              if (!prevPlan) return prevPlan;
              const newDrill = {
                name,
                duration,
                repsOrSets,
                demoInstructions: instructions,
                coachingPoints: points,
                videoPlaceHolder: "custom_coach",
                completed: false,
                xpValue: 120,
              };
              const updated = { ...prevPlan };
              if (type === "recovery") {
                updated.dailyPlan.recoveryDrills = [...updated.dailyPlan.recoveryDrills, newDrill];
              } else {
                updated.dailyPlan.technicalDrills = [...updated.dailyPlan.technicalDrills, newDrill];
              }
              save("sf_plan", updated);
              return updated;
            });
          } else if (actionType === "ADD_LIFT") {
            const name = params.name || "Custom Lift Exercise";
            const setsCount = Number(params.targetSets) || 3;
            const targetReps = params.targetReps || "8 reps";
            const coachingPoints = params.coachingPoints || "Form focus.";

            setLiftWorkouts((prevLifts) => {
              const updated = prevLifts.map((w) => {
                const newEx = {
                  id: "ex_" + Date.now() + Math.random(),
                  name,
                  targetSets: setsCount,
                  targetReps,
                  coachingPoints,
                  sets: Array.from({ length: setsCount }).map(() => ({
                    reps: Number(targetReps.replace(/\D/g, "")) || 8,
                    weight: 45,
                    completed: false,
                  })),
                };
                return {
                  ...w,
                  exercises: [...w.exercises, newEx],
                };
              });
              save("sf_lifts", updated);
              return updated;
            });
          }
        } catch (matchErr) {
          console.error("Coaching action parse failure:", matchErr);
        }
      });

      const cleanText = replyText.replace(coachActionRegex, "").trim();

      const modelMsg: ChatMessage = {
        role: "model",
        text: cleanText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => {
        const withModel = [...prev, modelMsg];
        save("sf_chat", withModel);
        return withModel;
      });
    } catch (err: any) {
      console.error(err);
      const errModelMsg: ChatMessage = {
        role: "model",
        text: "My apologies, I had a quick signal drop while reviewing the whiteboard! (Make sure process.env.GEMINI_API_KEY is configured under Settings > Secrets to enable real-time replies). How can I guide you on your workouts?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, errModelMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetAllData = () => {
    localStorage.clear();
    setUserProfile(defaultProfile);
    setTrainingPlan(initialPlan);
    setLiftWorkouts(initialLifting);
    setNutritionLog(initialNutrition);
    setWeakFootLevel(1);
    setWeakFootStreak(0);
    setWeakFootTotalTouches(0);
    setWeakFootSessionState(initialWeakFootSessions);
    setSpeedTests(initialSpeedTests);
    setVideoAnalyses([]);
    setAchievements(initialAchievements);
    setPerformanceReports(initialReports);
    setChatMessages(initialChatHistory);
    setXp(0);
    setLevel(1);
    setDarkMode(true);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        trainingPlan,
        updateTrainingPlan,
        liftWorkouts,
        updateLiftWorkout,
        toggleLiftWorkoutCompleted,
        nutritionLog,
        logMeal,
        deleteMeal,
        logWater,
        weakFootState: {
          currentLevel: weakFootLevel,
          streak: weakFootStreak,
          totalTouches: weakFootTotalTouches,
          xp: xp,
          levelObj: weakFootSessionState,
        },
        logWeakFootActivity,
        speedTests,
        logSpeedTest,
        videoAnalyses,
        analyzeUserVideo,
        achievements,
        unlockAchievement,
        performanceReports,
        generateNewPerformanceReport,
        chatMessages,
        sendChatMessage,
        resetAllData,
        onboardUser,
        adjustTrainingPlan,
        loading,
        error,
        xp,
        addXp,
        level,
        darkMode,
        setDarkMode: (val) => {
          setDarkMode(val);
          save("sf_dark_mode", val);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside an AppProvider context.");
  return context;
};
