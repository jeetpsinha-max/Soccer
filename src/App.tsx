import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import {
  Trophy,
  Target,
  Flame,
  Activity,
  Zap,
  Compass,
  User,
  Dumbbell,
  Apple,
  Video,
  MessageSquare,
  Plus,
  Trash2,
  Calendar,
  Droplets,
  CheckCircle,
  Lightbulb,
  ChevronRight,
  RefreshCw,
  LogOut,
  Check,
  ChevronDown,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  Heart,
  ArrowUpRight,
  Sparkles,
  Info,
  Clock,
  Play,
  Upload,
  UserX,
  CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function MainAppContent() {
  const {
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
    weakFootState,
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
  } = useApp();

  // Navigation: "dashboard" | "pitch" | "gym" | "nutrition" | "lab" | "coach" | "profile"
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // AI Adaptive Tuning states
  const [showAdjuster, setShowAdjuster] = useState(true);
  const [adjustFatigue, setAdjustFatigue] = useState(3);
  const [adjustSoreness, setAdjustSoreness] = useState(2);
  const [adjustMissedSessions, setAdjustMissedSessions] = useState(false);
  const [adjustInjuryStatus, setAdjustInjuryStatus] = useState("None");
  const [adjustDaysUntilMatch, setAdjustDaysUntilMatch] = useState("None");
  const [adjustNewFocus, setAdjustNewFocus] = useState("Balance All");
  const [adjustUserNotes, setAdjustUserNotes] = useState("");
  const [adjustmentResultMsg, setAdjustmentResultMsg] = useState("");

  const handleAdjustPlan = async () => {
    setAdjustmentResultMsg("");
    try {
      await adjustTrainingPlan({
        fatigue: adjustFatigue,
        soreness: adjustSoreness,
        missedSessions: adjustMissedSessions,
        injuryStatus: adjustInjuryStatus,
        daysUntilMatch: adjustDaysUntilMatch,
        newFocus: adjustNewFocus,
        userNotes: adjustUserNotes,
      });
      setAdjustmentResultMsg("Success: SoccerForge AI has recalibrated and aligned your training plan targets!");
      setTimeout(() => setAdjustmentResultMsg(""), 8000);
    } catch (err) {
      console.error(err);
      setAdjustmentResultMsg("Error: Failed to register AI adaptive alignment adjustments.");
    }
  };

  // Local state for editing drills (skills) and gym exercises
  const [editingDrillIndex, setEditingDrillIndex] = useState<number | null>(null);
  const [editingDrillType, setEditingDrillType] = useState<"technical" | "recovery" | null>(null);
  const [editingDrillName, setEditingDrillName] = useState("");
  const [editingDrillDuration, setEditingDrillDuration] = useState("");
  const [editingDrillReps, setEditingDrillReps] = useState("");
  const [editingDrillInstructions, setEditingDrillInstructions] = useState("");
  const [editingDrillPoints, setEditingDrillPoints] = useState("");
  const [isAddingDrillType, setIsAddingDrillType] = useState<"technical" | "recovery" | null>(null);

  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [editingExerciseName, setEditingExerciseName] = useState("");
  const [editingExerciseSets, setEditingExerciseSets] = useState("");
  const [editingExerciseReps, setEditingExerciseReps] = useState("");
  const [editingExercisePoints, setEditingExercisePoints] = useState("");
  const [isAddingExercise, setIsAddingExercise] = useState(false);

  // Local UI status
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  
  // Quick Log Helpers
  const [isWaterLogging, setIsWaterLogging] = useState(false);
  const [quickMealType, setQuickMealType] = useState<"Breakfast" | "Lunch" | "Dinner" | "Snack" | "Pre-Game" | "Post-Game">("Breakfast");
  const [quickMealName, setQuickMealName] = useState("");
  const [quickMealCalories, setQuickMealCalories] = useState("");
  const [quickMealProtein, setQuickMealProtein] = useState("");
  const [isMealLogging, setIsMealLogging] = useState(false);

  // Weak Foot log helpers
  const [wfTouches, setWfTouches] = useState("100");
  const [wfJuggles, setWfJuggles] = useState("15");
  const [wfAccuracy, setWfAccuracy] = useState("75");
  const [isWfLogging, setIsWfLogging] = useState(false);

  // Speed log helpers
  const [speed10, setSpeed10] = useState("1.62");
  const [speed20, setSpeed20] = useState("2.95");
  const [flying10, setFlying10] = useState("1.15");
  const [vertJump, setVertJump] = useState("26.0");
  const [isSpeedLogging, setIsSpeedLogging] = useState(false);

  // Video analyzer local state
  const [selectedSkill, setSelectedSkill] = useState<"Shooting" | "Passing" | "Sprinting" | "Dribbling" | "First Touch">("Shooting");
  const [customVideoName, setCustomVideoName] = useState("");
  const [simulatedDuration, setSimulatedDuration] = useState("10 seconds");
  const [videoConsent, setVideoConsent] = useState(false);
  const [uploadStatusMsg, setUploadStatusMsg] = useState("");

  // Chat conversation text box
  const [chatInput, setChatInput] = useState("");

  // Subscription tiers modal status
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [userPlanType, setUserPlanType] = useState<"Free" | "Pro">("Pro");

  // Onboarding local state variables (pre-filled with excellent starter details)
  const [onboardName, setOnboardName] = useState("");
  const [onboardAge, setOnboardAge] = useState(16);
  const [onboardHeight, setOnboardHeight] = useState("5'11\"");
  const [onboardWeight, setOnboardWeight] = useState(160);
  const [onboardFoot, setOnboardFoot] = useState<"Right" | "Left" | "Both">("Right");
  const [onboardPosition, setOnboardPosition] = useState("Winger");
  const [onboardTeam, setOnboardTeam] = useState("Elite Academy / ECNL");
  const [onboardYears, setOnboardYears] = useState(8);
  const [onboardStrengths, setOnboardStrengths] = useState("Acceleration, Dribbling, 1v1 Feints");
  const [onboardWeaknesses, setOnboardWeaknesses] = useState("Crossing, Weak-Foot shots, aerial target plays");
  const [onboardGoal, setOnboardGoal] = useState<"Gain Muscle" | "Lose Fat" | "Improve Performance" | "Maintain Weight">("Improve Performance");
  const [onboardRestrictions, setOnboardRestrictions] = useState("");
  const [onboardDays, setOnboardDays] = useState(4);
  const [onboardGym, setOnboardGym] = useState(true);
  const [onboardDuration, setOnboardDuration] = useState(60);

  // Submit dynamic AI onboarding plan wrapper
  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const strengthsArr = onboardStrengths.split(",").map((s) => s.trim()).filter(Boolean);
    const weaknessesArr = onboardWeaknesses.split(",").map((s) => s.trim()).filter(Boolean);
    const dietaryArr = onboardRestrictions.split(",").map((d) => d.trim()).filter(Boolean);

    await onboardUser({
      name: onboardName || "Player One",
      age: onboardAge,
      height: onboardHeight,
      weight: onboardWeight,
      dominantFoot: onboardFoot,
      position: onboardPosition,
      teamLevel: onboardTeam,
      yearsPlaying: onboardYears,
      strengths: strengthsArr,
      weaknesses: weaknessesArr,
      goal: onboardGoal,
      dietaryRestrictions: dietaryArr,
      availableDays: onboardDays,
      gymAccess: onboardGym,
      equipment: ["Cones", "Ball", "Rebounder", onboardGym ? "Gym Weights" : ""].filter(Boolean),
      trainingTime: onboardDuration,
      onboarded: true,
    });
    
    setShowOnboardingModal(false);
    setActiveTab("dashboard");
  };

  // Video Analysis action simulation (triggers real Node/Gemini backend analytics review)
  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoConsent) {
      alert("Please provide the required safety consent to permit sports science video analysis.");
      return;
    }
    setUploadStatusMsg("Uploading binary sequence to SoccerForge lab...");
    setTimeout(async () => {
      try {
        await analyzeUserVideo(
          selectedSkill,
          customVideoName || `${selectedSkill.toLowerCase()}_trial_mp4.mov`,
          simulatedDuration
        );
        setUploadStatusMsg("Critique complete! AI Overlay mapped below.");
        setCustomVideoName("");
      } catch (err: any) {
        setUploadStatusMsg("");
      }
    }, 1500);
  };

  // User manual customization functions
  const handleSaveDrill = (type: "technical" | "recovery", idx: number) => {
    if (!trainingPlan) return;
    const updatedPlan = { ...trainingPlan };
    const drillList = type === "technical" 
      ? [...updatedPlan.dailyPlan.technicalDrills] 
      : [...updatedPlan.dailyPlan.recoveryDrills];
      
    if (drillList[idx]) {
      drillList[idx] = {
        ...drillList[idx],
        name: editingDrillName,
        duration: editingDrillDuration,
        repsOrSets: editingDrillReps,
        demoInstructions: editingDrillInstructions,
        coachingPoints: editingDrillPoints.split(",").map(p => p.trim()).filter(Boolean),
      };
      
      if (type === "technical") {
        updatedPlan.dailyPlan.technicalDrills = drillList;
      } else {
        updatedPlan.dailyPlan.recoveryDrills = drillList;
      }
      updateTrainingPlan(updatedPlan);
    }
    setEditingDrillIndex(null);
    setEditingDrillType(null);
  };

  const handleDeleteDrill = (type: "technical" | "recovery", idx: number) => {
    if (!trainingPlan) return;
    const updatedPlan = { ...trainingPlan };
    if (type === "technical") {
      updatedPlan.dailyPlan.technicalDrills = updatedPlan.dailyPlan.technicalDrills.filter((_, i) => i !== idx);
    } else {
      updatedPlan.dailyPlan.recoveryDrills = updatedPlan.dailyPlan.recoveryDrills.filter((_, i) => i !== idx);
    }
    updateTrainingPlan(updatedPlan);
  };

  const handleCreateDrill = (type: "technical" | "recovery") => {
    if (!trainingPlan) return;
    const updatedPlan = { ...trainingPlan };
    const newDrill = {
      name: editingDrillName || "New Soccer Skill Drill",
      duration: editingDrillDuration || "15 mins",
      repsOrSets: editingDrillReps || "4 sets",
      demoInstructions: editingDrillInstructions || "Practice quick touches.",
      coachingPoints: editingDrillPoints ? editingDrillPoints.split(",").map(p => p.trim()).filter(Boolean) : ["Focus on lock ankle"],
      completed: false,
      xpValue: 100,
      videoPlaceHolder: "custom_user"
    };
    if (type === "technical") {
      updatedPlan.dailyPlan.technicalDrills = [...updatedPlan.dailyPlan.technicalDrills, newDrill];
    } else {
      updatedPlan.dailyPlan.recoveryDrills = [...updatedPlan.dailyPlan.recoveryDrills, newDrill];
    }
    updateTrainingPlan(updatedPlan);
    setIsAddingDrillType(null);
    setEditingDrillName("");
    setEditingDrillDuration("");
    setEditingDrillReps("");
    setEditingDrillInstructions("");
    setEditingDrillPoints("");
  };

  const handleSaveExercise = (workoutId: string, exId: string) => {
    const workout = liftWorkouts.find(w => w.id === workoutId);
    if (!workout) return;
    const updatedExList = workout.exercises.map(ex => {
      if (ex.id === exId) {
        return {
          ...ex,
          name: editingExerciseName,
          targetSets: Number(editingExerciseSets) || 3,
          targetReps: editingExerciseReps,
          coachingPoints: editingExercisePoints
        };
      }
      return ex;
    });
    updateLiftWorkout(workoutId, updatedExList);
    setEditingExerciseId(null);
  };

  const handleDeleteExercise = (workoutId: string, exId: string) => {
    const workout = liftWorkouts.find(w => w.id === workoutId);
    if (!workout) return;
    const updatedExList = workout.exercises.filter(ex => ex.id !== exId);
    updateLiftWorkout(workoutId, updatedExList);
  };

  const handleCreateExercise = (workoutId: string) => {
    const workout = liftWorkouts.find(w => w.id === workoutId);
    if (!workout) return;
    const newEx = {
      id: "ex_user_" + Date.now(),
      name: editingExerciseName || "New Strength Drill",
      targetSets: Number(editingExerciseSets) || 3,
      targetReps: editingExerciseReps || "8 reps",
      coachingPoints: editingExercisePoints || "Focus on explosive rep extensions",
      sets: Array.from({ length: Number(editingExerciseSets) || 3 }).map(() => ({
        reps: Number(editingExerciseReps.replace(/\D/g, "")) || 8,
        weight: 45,
        completed: false
      }))
    };
    const updatedExList = [...workout.exercises, newEx];
    updateLiftWorkout(workoutId, updatedExList);
    setIsAddingExercise(false);
    setEditingExerciseName("");
    setEditingExerciseSets("");
    setEditingExerciseReps("");
    setEditingExercisePoints("");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    await sendChatMessage(msg);
  };

  // Quick interactive toggle for individual drills
  const [completedDrills, setCompletedDrills] = useState<Record<string, boolean>>({});
  const handleToggleDrill = (drillName: string, xpVal: number) => {
    const wasCompleted = !!completedDrills[drillName];
    setCompletedDrills(prev => ({ ...prev, [drillName]: !wasCompleted }));
    if (!wasCompleted) {
      addXp(xpVal);
    }
  };

  return (
    <div className={`min-h-screen text-white font-sans ${userProfile.onboarded ? "bg-[#0F172A]" : "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]"} selection:bg-[#2563EB]/40 flex flex-col`}>
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center font-black text-xl tracking-tighter italic shadow-lg shadow-[#2563EB]/20">
              SF
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight uppercase italic flex items-center gap-1.5 md:text-2xl">
                SOCCERFORGE <span className="text-[#2563EB]">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest hidden md:block">
                ELITE PERFORMANCE LAB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* XP and LEVEL badge */}
            <div className="bg-slate-800/80 border border-slate-700/60 px-3 py-1 rounded-full flex items-center gap-2 text-xs md:text-sm">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="text-slate-400">LVL</span>
              <span className="font-bold text-white">{level}</span>
              <span className="text-slate-500">|</span>
              <span className="font-semibold text-emerald-400">{xp} XP</span>
            </div>

            {/* Account settings trigger */}
            <button
              id="settings-trigger-btn"
              onClick={() => setShowSettingsModal(true)}
              className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full border border-slate-700/60 transition-colors cursor-pointer"
              title="Identity & App Compliance Controls"
            >
              <User className="w-[18px] h-[18px] text-slate-300" />
            </button>

            {/* Premium badge */}
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                userPlanType === "Pro"
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-bold"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              {userPlanType} Active
            </button>
          </div>
        </div>
      </header>

      {/* COMPLIANCE ALERT BAR IN CASE USER IS JUST RE-ALIGNING METRICS */}
      {error && (
        <div className="bg-red-500/10 border-b border-red-500/30 text-red-200 text-xs text-center py-2 px-4 flex items-center justify-center gap-2">
          <Info className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
          <button onClick={() => window.location.reload()} className="underline font-bold hover:text-white">Retry Connection</button>
        </div>
      )}

      {/* ONBOARDING STATE CHECK */}
      {!userProfile.onboarded ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl "
          >
            <div className="text-center mb-8">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase tracking-widest rounded-full">
                AI Sports Onboarding
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight mt-3">Forge Your Custom Legacy</h1>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                Our athletic models compute high-velocity technical regimens, nutrition indexes, and core injury-prevention lift patterns.
              </p>
            </div>

            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
              {/* Category 1: Athlete Bio */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/40">
                <h3 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Core Biography
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Player Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Liam Sterling"
                      value={onboardName}
                      onChange={(e) => setOnboardName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Age (COPPA-Aware)</label>
                    <input
                      required
                      type="number"
                      min={10}
                      max={45}
                      value={onboardAge}
                      onChange={(e) => setOnboardAge(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Dominant Foot</label>
                    <select
                      value={onboardFoot}
                      onChange={(e) => setOnboardFoot(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Right">Right Foot</option>
                      <option value="Left">Left Foot (Weak Foot Focus)</option>
                      <option value="Both">Both (Ambidextrous Specialist)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Position</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Winger / Central Mid"
                      value={onboardPosition}
                      onChange={(e) => setOnboardPosition(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Team Tier/Level</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Varsity / MLS Next"
                      value={onboardTeam}
                      onChange={(e) => setOnboardTeam(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Years Playing</label>
                    <input
                      required
                      type="number"
                      value={onboardYears}
                      onChange={(e) => setOnboardYears(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category 2: Soccer Profile & Goals */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/40">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Technical Focus & Target Core
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Current Strengths (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Acceleration, 1v1 tactics, close control"
                      value={onboardStrengths}
                      onChange={(e) => setOnboardStrengths(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Current Weaknesses (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Weak foot crosses, volleys, defensive posture"
                      value={onboardWeaknesses}
                      onChange={(e) => setOnboardWeaknesses(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Primary Nutrition Focus</label>
                    <select
                      value={onboardGoal}
                      onChange={(e) => setOnboardGoal(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Improve Performance">Peak Match Performance Optimization</option>
                      <option value="Gain Muscle">Lean Offseason Muscle Hypertrophy</option>
                      <option value="Lose Fat">Sprinting Lean Power Catalyst (Lose Fat)</option>
                      <option value="Maintain Weight">Metabolic Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Dietary Restrictions</label>
                    <input
                      type="text"
                      placeholder="None, Gluten-free, Vegan, No Dairy etc."
                      value={onboardRestrictions}
                      onChange={(e) => setOnboardRestrictions(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category 3: Workouts & Gym Availability */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/40">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5" /> Athletic Availability & Setup
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Available Days / Week</label>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={onboardDays}
                      onChange={(e) => setOnboardDays(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Training Session Length (m)</label>
                    <input
                      type="number"
                      step={5}
                      value={onboardDuration}
                      onChange={(e) => setOnboardDuration(parseInt(e.target.value, 10))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Gym Access</label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-1 text-sm text-slate-300">
                        <input
                          type="radio"
                          checked={onboardGym}
                          onChange={() => setOnboardGym(true)}
                          className="text-blue-500 focus:ring-0"
                        /> Yes
                      </label>
                      <label className="flex items-center gap-1 text-sm text-slate-300">
                        <input
                          type="radio"
                          checked={!onboardGym}
                          onChange={() => setOnboardGym(false)}
                          className="text-blue-500 focus:ring-0"
                        /> No (Bodyweight/Band focus)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal COPPA & Privacy Compliance checkbox */}
              <div className="p-3 bg-blue-950/20 rounded-xl border border-blue-900/30 text-xs text-slate-400 space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input required type="checkbox" className="mt-0.5 rounded text-blue-500" />
                  <span>
                    I confirm that I am aged 13 or over, or have obtained parental permit constraints. I agree to the SoccerForge Privacy Policies, COPPA data guidelines, and self-directed sports training waivers.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563EB] hover:bg-blue-600 active:bg-blue-700 py-3 rounded-xl font-bold tracking-wide text-sm uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 cursor-pointer disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Assembling Neural Soccer Regimen...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Forge AI Academy Access Now
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      ) : (
        /* STANDARD REGISTERED INTERACTIVE EXPERIENCE */
        <div className="flex-grow flex flex-col max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">

          {/* QUICK HERO DASH HEADER CARD */}
          <div className="bg-gradient-to-r from-slate-900 via-[#1E293B] to-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563EB]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#10B981] p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[12px] flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black tracking-widest text-[#2563EB] uppercase">ACADEMY</span>
                  <span className="text-xl font-extrabold text-white -mt-1 italic">9</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase tracking-wider rounded border border-[#10B981]/20">
                    Pro Academy Blueprint Loaded
                  </span>
                  <span className="text-slate-400 text-xs hidden md:inline">Tier: {userProfile.teamLevel}</span>
                </div>
                <h2 className="text-2xl font-black italic text-white tracking-tight mt-1">
                  WELCOMED BACK, {userProfile.name.toUpperCase()}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Your AI Strength & Conditioning Matrix calculated 3 targeted drills specifically optimizing your <span className="text-emerald-400 font-bold">{userProfile.position}</span> workload today.
                </p>
              </div>
            </div>

            {/* Quick calibration option */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setOnboardName(userProfile.name);
                  setOnboardAge(userProfile.age);
                  setOnboardHeight(userProfile.height);
                  setOnboardWeight(userProfile.weight);
                  setOnboardFoot(userProfile.dominantFoot);
                  setOnboardPosition(userProfile.position);
                  setOnboardTeam(userProfile.teamLevel);
                  setOnboardYears(userProfile.yearsPlaying);
                  setOnboardStrengths(userProfile.strengths.join(", "));
                  setOnboardWeaknesses(userProfile.weaknesses.join(", "));
                  setOnboardGoal(userProfile.goal);
                  setOnboardRestrictions(userProfile.dietaryRestrictions.join(", "));
                  setOnboardDays(userProfile.availableDays);
                  setOnboardGym(userProfile.gymAccess);
                  setOnboardDuration(userProfile.trainingTime);
                  updateUserProfile({ onboarded: false });
                }}
                className="px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Calibrate AI Plan
              </button>
            </div>
          </div>

          <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
            
            {/* COLUMN 1: INTERACTIVE NAVIGATION (DESKTOP) */}
            <nav className="lg:col-span-3 flex flex-col gap-2 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase px-3 pt-2 mb-1">
                COACHING MODULES
              </span>
              {[
                { id: "dashboard", label: "Smart Dashboard", icon: Activity, color: "text-[#2563EB]" },
                { id: "pitch", label: "Skills Training", icon: Target, color: "text-[#10B981]" },
                { id: "gym", label: "Weightlifting Coach", icon: Dumbbell, color: "text-amber-500" },
                { id: "nutrition", label: "Nutrition & Fueling", icon: Apple, color: "text-rose-500" },
                { id: "lab", label: "Speed Lab & Video", icon: Zap, color: "text-cyan-400" },
                { id: "coach", label: "Coach Tyler AI", icon: MessageSquare, color: "text-violet-400" },
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left cursor-pointer ${
                      isSelected
                        ? "bg-slate-800 text-white border-l-4 border-[#2563EB]"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <IconComp className={`w-5 h-5 shrink-0 ${isSelected ? item.color : "text-slate-500"}`} />
                    <span>{item.label}</span>
                    {isSelected && (
                      <ChevronRight className="w-4 h-4 ml-auto text-slate-500" />
                    )}
                  </button>
                );
              })}

              <span className="text-[10px] font-extrabold tracking-wider text-slate-500 uppercase px-3 pt-6 mb-1">
                COMPLIANCE & LEGAL
              </span>
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setShowSettingsModal(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors text-left"
              >
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>COPPA & Privacy Logs</span>
              </button>
            </nav>

            {/* COLUMN 2: ACTIVE SCREEN CONTAINER */}
            <div className="lg:col-span-9 space-y-8">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                >
                  
                  {/* TAB 1: SMART DASHBOARD */}
                  {activeTab === "dashboard" && (
                    <div className="space-y-8">
                      
                      {/* STATS STRIP ROW */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col">
                          <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block">
                            Training Streak
                          </span>
                          <span className="text-3xl font-black tracking-tight mt-1 text-white flex items-center gap-1.5">
                            <Flame className="w-6 h-6 text-orange-500 fill-orange-500 shrink-0" />
                            {weakFootState.streak} <span className="text-xs text-slate-500 font-bold uppercase">Days</span>
                          </span>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col">
                          <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block">
                            Weak Foot Touches
                          </span>
                          <span className="text-3xl font-black tracking-tight mt-1 text-blue-400 flex items-center gap-1.5">
                            <Compass className="w-5 h-5 text-blue-400 shrink-0" />
                            {weakFootState.totalTouches.toLocaleString()}
                          </span>
                        </div>

                        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col">
                          <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block">
                            Current XP Yield
                          </span>
                          <span className="text-3xl font-black mt-1 text-[#10B981]">
                            {weakFootState.xp} <span className="text-xs text-slate-500 uppercase font-bold">PTS</span>
                          </span>
                        </div>

                        <div className="bg-[#2563EB]/10 border border-[#2563EB]/30 p-4 rounded-2xl flex flex-col">
                          <span className="text-[#2563EB] text-[10px] font-extrabold uppercase tracking-widest block">
                            Next Match Prep
                          </span>
                          <span className="text-base font-black text-white mt-1 uppercase tracking-tight flex items-center gap-1">
                            <Calendar className="w-4 h-4 shrink-0 text-amber-500" /> Saturday
                          </span>
                          <span className="text-[10px] text-zinc-400">Tactical Review Ready</span>
                        </div>
                      </div>

                      {/* TODAY'S FORGE REGIMEN: DRILLS + LIFT OVERVIEW */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        
                        {/* LEFT: TODAY'S TRAINING CHECKS */}
                        <div className="md:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-md">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <div>
                              <h3 className="text-lg font-bold">Today's Academy Regimen</h3>
                              <p className="text-xs text-slate-500">Earn up to 280 XP upon full completion</p>
                            </div>
                            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg uppercase">
                              {new Date().toLocaleDateString([], { month: "short", day: "numeric" })}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Required Drills
                            </h4>

                            {trainingPlan?.dailyPlan?.technicalDrills?.map((drill, index) => {
                              const isComp = !!completedDrills[drill.name];
                              return (
                                <div
                                  key={index}
                                  className={`p-4 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors border-l-4 ${
                                    isComp ? "border-emerald-500 bg-slate-800/10" : "border-[#2563EB] bg-slate-800/30"
                                  } flex items-start justify-between gap-3`}
                                  onClick={() => handleToggleDrill(drill.name, drill.xpValue)}
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      {isComp ? (
                                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 shrink-0" />
                                      )}
                                      <h5 className={`text-sm font-bold ${isComp ? "line-through text-slate-400" : "text-white"}`}>
                                        {drill.name}
                                      </h5>
                                    </div>
                                    <p className="text-xs text-slate-400">Duration: {drill.duration} | {drill.repsOrSets}</p>
                                  </div>
                                  <span className="text-xs font-bold px-2 py-0.5 bg-slate-800 text-teal-400 rounded">
                                    +{drill.xpValue} XP
                                  </span>
                                </div>
                              );
                            })}

                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-2">
                              Required Lift Coach Workload
                            </h4>

                            {liftWorkouts.map((w) => (
                              <div
                                key={w.id}
                                className={`p-4 rounded-xl cursor-pointer hover:bg-slate-800/40 transition-colors border-l-4 ${
                                  w.completed ? "border-emerald-500 bg-slate-800/10" : "border-amber-500 bg-slate-800/30"
                                } flex items-center justify-between gap-3`}
                                onClick={() => toggleLiftWorkoutCompleted(w.id)}
                              >
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    {w.completed ? (
                                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border-2 border-amber-500 shrink-0" />
                                    )}
                                    <h5 className={`text-sm font-bold ${w.completed ? "line-through text-slate-400" : "text-white"}`}>
                                      {w.name}
                                    </h5>
                                  </div>
                                  <p className="text-xs text-slate-500">{w.focus}</p>
                                </div>
                                <span className="text-xs font-bold px-2 py-0.5 bg-slate-800 text-amber-400 rounded shrink-0">
                                  +200 XP
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* RIGHT: NUTRITION & WEAK FOOT ACCUMULATORS */}
                        <div className="md:col-span-5 space-y-6">
                          
                          {/* NUTRITION FAST LOG */}
                          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                                Daily Nutrition Status
                              </h4>
                              <button
                                onClick={() => setActiveTab("nutrition")}
                                className="text-[10px] text-blue-400 hover:underline font-bold"
                              >
                                Detail View
                              </button>
                            </div>

                            <div className="space-y-3.5">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-400">Protein target</span>
                                  <span className="font-bold text-slate-200">
                                    {nutritionLog.proteinConsumed}g / {nutritionLog.proteinTarget}g
                                  </span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-emerald-500 transition-all duration-300" 
                                    style={{ width: `${Math.min(100, (nutritionLog.proteinConsumed / nutritionLog.proteinTarget) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-400">Water Fluid Hydration</span>
                                  <span className="font-bold text-slate-200">
                                    {nutritionLog.waterConsumed / 1000}L / {nutritionLog.waterTarget / 1000}L
                                  </span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${Math.min(100, (nutritionLog.waterConsumed / nutritionLog.waterTarget) * 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <div className="pt-2 flex gap-2">
                              <button
                                onClick={() => logWater(500)}
                                className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 py-1.5 rounded-lg text-xs font-bold text-blue-400 transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <Droplets className="w-3.5 h-3.5" /> +500ml Water
                              </button>
                              <button
                                onClick={() => setIsMealLogging(true)}
                                className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 py-1.5 rounded-lg text-xs font-bold text-emerald-400 transition-all cursor-pointer flex items-center justify-center gap-1"
                              >
                                <Plus className="w-3.5 h-3.5" /> Add Meal
                              </button>
                            </div>
                          </div>

                          {/* WEAK FOOT ACADEMY STAMP */}
                          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-900/30 rounded-3xl p-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-black tracking-widest rounded uppercase">
                                LEVEL {weakFootState.currentLevel}
                              </span>
                              <span className="text-xs font-extrabold text-indigo-400 italic">Elite Weak Foot Academy</span>
                            </div>
                            
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold">Daily Non-Dominant Wall Volleys</h4>
                              <p className="text-xs text-slate-400">Trigger neural rewiring through firm wall passes.</p>
                            </div>

                            <div className="bg-slate-900/50 p-3 rounded-xl space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Target touches</span>
                                <span className="font-bold text-indigo-300">
                                  {weakFootState.levelObj.touchesCompleted} / {weakFootState.levelObj.touchesGoal}
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-500" 
                                  style={{ width: `${Math.min(100, (weakFootState.levelObj.touchesCompleted / weakFootState.levelObj.touchesGoal) * 100)}%` }}
                                ></div>
                              </div>
                            </div>

                            <button
                              onClick={() => setIsWfLogging(true)}
                              className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 py-2 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10 cursor-pointer"
                            >
                              <Compass className="w-3.5 h-3.5" /> Quick Log touches
                            </button>
                          </div>

                        </div>
                      </div>

                      {/* COACH TYLER FLOATING MOTIVATION BANNER */}
                      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 p-5 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-center md:text-left">
                          <div className="w-12 h-12 rounded-full border border-indigo-500/30 bg-slate-800 flex items-center justify-center text-xl shrink-0 font-bold text-indigo-400">
                            👨‍🏫
                          </div>
                          <div>
                            <h4 className="text-sm font-bold flex items-center justify-center md:justify-start gap-1">
                              Need a drill correction? <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            </h4>
                            <p className="text-xs text-slate-400">
                              Coach Tyler is standing by to explain the bio-mechanics of any dynamic foot pivot.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveTab("coach")}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-[#2563EB] text-xs font-bold uppercase rounded-lg shadow-md hover:scale-[1.02] transition-all cursor-pointer whitespace-nowrap"
                        >
                          Message Coach Tyler
                        </button>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: TECHNICAL TRAINING PLAN & WEAK FOOT ACADEMY */}
                  {activeTab === "pitch" && (
                    <div className="space-y-8">
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800">
                        <div className="flex justify-between items-start flex-wrap gap-4 border-b border-slate-800 pb-4 mb-4">
                          <div>
                            <h3 className="text-xl font-bold tracking-tight">AI Soccer Development Plan</h3>
                            <p className="text-xs text-slate-400 mt-1">
                              Generated for a <span className="text-emerald-400">{userProfile.age} year old {userProfile.position}</span> operating at <span className="text-emerald-400">{userProfile.teamLevel}</span> levels.
                            </p>
                          </div>
                          
                          {/* QUICK RESTORE INITIAL PLAN */}
                          <button
                            onClick={() => {
                              if (confirm("Reset to default sports science plan? This will clear custom drills.")) {
                                resetAllData();
                              }
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all font-bold text-xs uppercase px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Re-sync Default
                          </button>
                        </div>

                        {/* AI ADAPTIVE STRATEGY ENGINE */}
                        <div className="bg-slate-950/60 p-5 rounded-2xl border border-indigo-500/20 mb-6 space-y-4">
                          <div className="flex justify-between items-center flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                              <div>
                                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Adaptive Strategy Engine</h4>
                                <p className="text-[10px] text-slate-400">
                                  Instantly auto-calibrate workouts based on fatigue, injuries, missed sessions, and upcoming game dates.
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setShowAdjuster(!showAdjuster)}
                              className="text-[11px] font-black uppercase text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer transition"
                            >
                              {showAdjuster ? "Hide Calibration" : "Expand Tune Console"}
                            </button>
                          </div>

                          {showAdjuster && (
                            <div className="space-y-4 pt-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                                
                                {/* 1. FATIGUE SLIDER */}
                                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                                  <label className="text-[10px] font-extrabold uppercase text-slate-400 block flex justify-between">
                                    <span>Athlete Fatigue</span>
                                    <span className={adjustFatigue > 6 ? "text-red-400 font-black" : "text-emerald-400 font-bold"}>
                                      {adjustFatigue}/10
                                    </span>
                                  </label>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={adjustFatigue}
                                    onChange={(e) => setAdjustFatigue(Number(e.target.value))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                  />
                                  <span className="text-[9px] text-slate-500 block">
                                    {adjustFatigue <= 3 && "Full CNS firing readiness. Ready for heavy drill counts."}
                                    {adjustFatigue > 3 && adjustFatigue <= 6 && "Normal wear and tear. Medium training volume loads."}
                                    {adjustFatigue > 6 && "Fatigue threshold crossed. Auto sizing-down technical volume."}
                                  </span>
                                </div>

                                {/* 2. SORENESS SLIDER */}
                                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                                  <label className="text-[10px] font-extrabold uppercase text-slate-400 block flex justify-between">
                                    <span>Muscle Soreness</span>
                                    <span className={adjustSoreness > 6 ? "text-amber-400 font-black" : "text-emerald-400 font-bold"}>
                                      {adjustSoreness}/10
                                    </span>
                                  </label>
                                  <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={adjustSoreness}
                                    onChange={(e) => setAdjustSoreness(Number(e.target.value))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                  />
                                  <span className="text-[9px] text-slate-500 block">
                                    {adjustSoreness <= 3 && "Minimal muscle damage. Excellent high-load potential."}
                                    {adjustSoreness > 3 && adjustSoreness <= 6 && "Tighter muscle fibers. Adding post-drill myofascial triggers."}
                                    {adjustSoreness > 6 && "Severe stiffness. AI prioritizing joint mobilizers & rest segments."}
                                  </span>
                                </div>

                                {/* 3. INJURY PREVENTION SELECTOR */}
                                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                                  <label className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                    Injury / Point Soreness
                                  </label>
                                  <select
                                    value={adjustInjuryStatus}
                                    onChange={(e) => setAdjustInjuryStatus(e.target.value)}
                                    className="w-full bg-slate-900 text-slate-200 p-1.5 rounded-lg border border-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                  >
                                    <option value="None">None (Full Health Plan)</option>
                                    <option value="Ankle Discomfort">Ankle (Static Touches & Stability)</option>
                                    <option value="Knee Soreness">Knee (Safe Isometric Sits, Low impact)</option>
                                    <option value="Groin pull">Groin (Theraband Loops, Static holds)</option>
                                    <option value="Hamstring tightness">Hamstring (Nerve glides, Glute activation)</option>
                                    <option value="Shin Splints">Shin Splints (No plyometrics or sprints)</option>
                                  </select>
                                  <span className="text-[9px] text-slate-500 block">
                                    {adjustInjuryStatus === "None" ? "Standard dynamic soccer performance programs." : "Activating joint preservation protocols."}
                                  </span>
                                </div>

                                {/* 4. GAME COUNTDOWN SELECTOR */}
                                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                                  <label className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                    Upcoming Match Proximity
                                  </label>
                                  <select
                                    value={adjustDaysUntilMatch}
                                    onChange={(e) => setAdjustDaysUntilMatch(e.target.value)}
                                    className="w-full bg-slate-900 text-slate-200 p-1.5 rounded-lg border border-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                  >
                                    <option value="None">No Upcoming Games (Standard Phase)</option>
                                    <option value="Tomorrow">Tomorrow (Matchday -1 Primer)</option>
                                    <option value="In 2 days">In 2 Days (Activation Phase)</option>
                                    <option value="In 3-4 days">In 3-4 Days (High Volume Output)</option>
                                    <option value="Next Week">Next Week (Taper Cycle)</option>
                                  </select>
                                  <span className="text-[9px] text-slate-500 block">
                                    {adjustDaysUntilMatch === "None" && "Standard progressive performance training overrides."}
                                    {adjustDaysUntilMatch === "Tomorrow" && "Triggers a CNS Primer: sharp short touches, light mobilities."}
                                    {adjustDaysUntilMatch === "In 2 days" && "CNS excitation prep. Shorter drills to avoid lactic buildup."}
                                  </span>
                                </div>

                                {/* 5. RECENT MISSED SESSIONS */}
                                <div className="space-y-2 bg-slate-900/40 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-extrabold uppercase text-slate-400">
                                      Missed Sessions Recently?
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => setAdjustMissedSessions(!adjustMissedSessions)}
                                      className={`px-3 py-1 text-[9px] font-black uppercase rounded border transition-all ${
                                        adjustMissedSessions
                                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                                          : "bg-slate-800 border-slate-700 text-slate-400"
                                      }`}
                                    >
                                      {adjustMissedSessions ? "YES (Catchup Mode)" : "NO (On Track)"}
                                    </button>
                                  </div>
                                  <p className="text-[9px] text-slate-500 leading-tight">
                                    {adjustMissedSessions 
                                      ? "AI reorganizes remaining days to lock in top technical replication counts without injuring."
                                      : "Steady state optimization is active. Standard periodic schedules."}
                                  </p>
                                </div>

                                {/* 6. COGNITIVE FOCUS SELECTION */}
                                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                                  <label className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                    Adaptive Tactical Focus
                                  </label>
                                  <select
                                    value={adjustNewFocus}
                                    onChange={(e) => setAdjustNewFocus(e.target.value)}
                                    className="w-full bg-slate-900 text-slate-200 p-1.5 rounded-lg border border-slate-800 text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                                  >
                                    <option value="Balance All">Balance Technical & Athletics</option>
                                    <option value="Ball Mastery & Agility">Ball Mastery & Agility (Fast Feet)</option>
                                    <option value="First Touch & Passing">First Touch & Rebound Passing</option>
                                    <option value="Shooting & Crossing">In the Box: Finishing & Crossing</option>
                                    <option value="Weak-Foot Precision Shots">Weak-Foot Isolation Drills</option>
                                    <option value="Aerobic Speed & CNS Prep">Sprinting, Agility, Speed Dynamics</option>
                                  </select>
                                  <span className="text-[9px] text-slate-500 block">
                                    Selected focus: {adjustNewFocus}
                                  </span>
                                </div>

                              </div>

                              {/* FREE TEXT CUSTOM NOTE INPUT */}
                              <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800 text-xs">
                                <label className="text-[10px] font-extrabold uppercase text-slate-400 block">
                                  Dynamic Athlete Notes & Voice Directives
                                </label>
                                <textarea
                                  value={adjustUserNotes}
                                  onChange={(e) => setAdjustUserNotes(e.target.value)}
                                  placeholder="E.g., 'Coach Tyler, my groin feels slightly tight when running deep diagonal lines. Swap in more stability isometrics and lower dribble pressure today...'"
                                  className="w-full bg-slate-950/80 text-xs text-slate-300 p-2.5 rounded-xl border border-slate-800 focus:ring-1 focus:ring-indigo-500 outline-none min-h-[50px] resize-y"
                                />
                              </div>

                              <div className="flex justify-between items-center pt-2">
                                <button
                                  type="button"
                                  disabled={loading}
                                  onClick={handleAdjustPlan}
                                  className={`font-black text-xs uppercase px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 transition duration-200 ${
                                    loading
                                      ? "bg-slate-800 text-slate-500 border border-slate-700 pointer-events-none"
                                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                                  }`}
                                >
                                  {loading ? (
                                    <>
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      Adapting Plan via Sports Science...
                                    </>
                                  ) : (
                                    <>
                                      <Sparkles className="w-3.5 h-3.5" />
                                      Re-Calibrate Core Workout Plan
                                    </>
                                  )}
                                </button>

                                {adjustmentResultMsg && (
                                  <p className="text-[10.5px] font-black text-emerald-400 animate-pulse text-right">
                                    {adjustmentResultMsg}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                                1. Daily Drills Breakdown
                              </h4>
                              <button
                                onClick={() => {
                                  setIsAddingDrillType("technical");
                                  setEditingDrillName("");
                                  setEditingDrillDuration("15 mins");
                                  setEditingDrillReps("4 sets");
                                  setEditingDrillInstructions("");
                                  setEditingDrillPoints("Focus on clean contact, Keep eye on ball");
                                }}
                                className="bg-[#2563EB]/10 hover:bg-[#2563EB]/20 border border-[#2563EB]/40 text-blue-400 text-[10px] font-black uppercase px-2 py-1 rounded cursor-pointer"
                              >
                                + Add Drill
                              </button>
                            </div>

                            {/* ADD DRILL FORM */}
                            {isAddingDrillType === "technical" && (
                              <div className="p-4 bg-slate-950/80 rounded-xl border border-blue-500/30 space-y-3">
                                <h5 className="text-xs font-bold text-blue-400 uppercase">New Technical Drill</h5>
                                <div className="space-y-2 text-xs">
                                  <div>
                                    <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Drill Name</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Wall Pass Turn combo" 
                                      value={editingDrillName}
                                      onChange={(e) => setEditingDrillName(e.target.value)}
                                      className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Duration</label>
                                      <input 
                                        type="text" 
                                        placeholder="e.g. 15 mins" 
                                        value={editingDrillDuration}
                                        onChange={(e) => setEditingDrillDuration(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Reps / Sets</label>
                                      <input 
                                        type="text" 
                                        placeholder="e.g. 3 sets x 20 reps" 
                                        value={editingDrillReps}
                                        onChange={(e) => setEditingDrillReps(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Method & Instructions</label>
                                    <textarea 
                                      placeholder="Write specific soccer coaching sequences..." 
                                      value={editingDrillInstructions}
                                      onChange={(e) => setEditingDrillInstructions(e.target.value)}
                                      className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white h-16 resize-none"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Coaching cues (comma-separated)</label>
                                    <input 
                                      type="text" 
                                      placeholder="Stay low, Lock ankle, Check shoulder" 
                                      value={editingDrillPoints}
                                      onChange={(e) => setEditingDrillPoints(e.target.value)}
                                      className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                    />
                                  </div>
                                  <div className="flex gap-2 pt-1 font-bold">
                                    <button 
                                      onClick={() => handleCreateDrill("technical")}
                                      className="flex-grow bg-[#2563EB] hover:bg-blue-600 text-white rounded py-1 text-center cursor-pointer"
                                    >
                                      Insert Drill
                                    </button>
                                    <button 
                                      onClick={() => setIsAddingDrillType(null)}
                                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded px-3 py-1 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {trainingPlan?.dailyPlan?.technicalDrills?.map((drill, idx) => (
                              <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3 relative group">
                                {editingDrillIndex === idx && editingDrillType === "technical" ? (
                                  <div className="space-y-2 text-xs">
                                    <h5 className="font-bold text-blue-400 uppercase">Modify Active Drill</h5>
                                    <div>
                                      <input 
                                        type="text" 
                                        value={editingDrillName}
                                        onChange={(e) => setEditingDrillName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white font-bold"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <input 
                                        type="text" 
                                        value={editingDrillDuration}
                                        onChange={(e) => setEditingDrillDuration(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                        placeholder="Duration"
                                      />
                                      <input 
                                        type="text" 
                                        value={editingDrillReps}
                                        onChange={(e) => setEditingDrillReps(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                        placeholder="Reps / Sets"
                                      />
                                    </div>
                                    <textarea 
                                      value={editingDrillInstructions}
                                      onChange={(e) => setEditingDrillInstructions(e.target.value)}
                                      className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white h-12"
                                    />
                                    <input 
                                      type="text" 
                                      value={editingDrillPoints}
                                      onChange={(e) => setEditingDrillPoints(e.target.value)}
                                      className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white text-[11px]"
                                      placeholder="Coaching cues (comma separated)"
                                    />
                                    <div className="flex gap-2 font-bold py-1">
                                      <button 
                                        onClick={() => handleSaveDrill("technical", idx)}
                                        className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 cursor-pointer"
                                      >
                                        Save Changes
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setEditingDrillIndex(null);
                                          setEditingDrillType(null);
                                        }}
                                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded px-2 p-1 cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-start justify-between">
                                      <h5 className="font-bold text-sm text-slate-200">{drill.name}</h5>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] bg-[#2563EB]/10 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">
                                          {drill.duration}
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-xs text-slate-300 leading-relaxed italic">
                                      &ldquo;{drill.demoInstructions}&rdquo;
                                    </p>
                                    <div className="space-y-1.5">
                                      <span className="text-[10px] text-slate-500 uppercase font-black">Coaching Points:</span>
                                      {drill.coachingPoints.map((pt, pIdx) => (
                                        <div key={pIdx} className="flex items-start gap-1.5 text-xs text-slate-400">
                                          <span className="text-emerald-400">•</span>
                                          <span>{pt}</span>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Action Bar */}
                                    <div className="pt-2 border-t border-slate-850 flex justify-end gap-2 text-[10px] uppercase font-bold opacity-75 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={() => {
                                          setEditingDrillIndex(idx);
                                          setEditingDrillType("technical");
                                          setEditingDrillName(drill.name);
                                          setEditingDrillDuration(drill.duration);
                                          setEditingDrillReps(drill.repsOrSets || "4 sets");
                                          setEditingDrillInstructions(drill.demoInstructions);
                                          setEditingDrillPoints(drill.coachingPoints.join(", "));
                                        }}
                                        className="text-amber-400 hover:text-amber-300 cursor-pointer"
                                      >
                                        [Modify Detail]
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Remove "${drill.name}" from schedule?`)) {
                                            handleDeleteDrill("technical", idx);
                                          }
                                        }}
                                        className="text-red-400 hover:text-red-300 cursor-pointer"
                                      >
                                        [Swap / Slip out]
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="space-y-6">
                            <div>
                              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
                                  2. Mental & Stretching Recovery
                                </h4>
                                <button
                                  onClick={() => {
                                    setIsAddingDrillType("recovery");
                                    setEditingDrillName("");
                                    setEditingDrillDuration("10 mins");
                                    setEditingDrillReps("1 sequence");
                                    setEditingDrillInstructions("");
                                    setEditingDrillPoints("Breathe deep, Keep body loose");
                                  }}
                                  className="bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/40 text-teal-400 text-[10px] font-black uppercase px-2 py-1 rounded cursor-pointer"
                                >
                                  + Add Recovery
                                </button>
                              </div>

                              {/* ADD RECOVERY DRIL FORM */}
                              {isAddingDrillType === "recovery" && (
                                <div className="p-4 bg-slate-950/80 rounded-xl border border-teal-500/30 space-y-3 mb-4">
                                  <h5 className="text-xs font-bold text-teal-400 uppercase">New Recovery Activity</h5>
                                  <div className="space-y-2 text-xs">
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Name</label>
                                      <input 
                                        type="text" 
                                        placeholder="e.g. Foam Roll Calves & Hip Flexors" 
                                        value={editingDrillName}
                                        onChange={(e) => setEditingDrillName(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                      />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Duration</label>
                                        <input 
                                          type="text" 
                                          placeholder="e.g. 10 mins" 
                                          value={editingDrillDuration}
                                          onChange={(e) => setEditingDrillDuration(e.target.value)}
                                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Target Pace</label>
                                        <input 
                                          type="text" 
                                          placeholder="e.g. Slow relaxation" 
                                          value={editingDrillReps}
                                          onChange={(e) => setEditingDrillReps(e.target.value)}
                                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-[10px] text-slate-400 uppercase font-black mb-1">Instructions</label>
                                      <textarea 
                                        placeholder="Write instructions..." 
                                        value={editingDrillInstructions}
                                        onChange={(e) => setEditingDrillInstructions(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white h-16 resize-none"
                                      />
                                    </div>
                                    <div className="flex gap-2 pt-1 font-bold">
                                      <button 
                                        onClick={() => handleCreateDrill("recovery")}
                                        className="flex-grow bg-teal-600 hover:bg-teal-700 text-white rounded py-1 text-center cursor-pointer"
                                      >
                                        Insert Recovery
                                      </button>
                                      <button 
                                        onClick={() => setIsAddingDrillType(null)}
                                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded px-3 py-1 cursor-pointer"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {trainingPlan?.dailyPlan?.recoveryDrills?.map((rDrill, idx) => (
                                <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 relative group mb-3">
                                  {editingDrillIndex === idx && editingDrillType === "recovery" ? (
                                    <div className="space-y-2 text-xs">
                                      <h5 className="font-bold text-teal-400 uppercase">Modify Recovery</h5>
                                      <input 
                                        type="text" 
                                        value={editingDrillName}
                                        onChange={(e) => setEditingDrillName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white font-bold"
                                      />
                                      <input 
                                        type="text" 
                                        value={editingDrillDuration}
                                        onChange={(e) => setEditingDrillDuration(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                      />
                                      <textarea 
                                        value={editingDrillInstructions}
                                        onChange={(e) => setEditingDrillInstructions(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white h-12"
                                      />
                                      <div className="flex gap-2 font-bold py-1">
                                        <button 
                                          onClick={() => handleSaveDrill("recovery", idx)}
                                          className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 cursor-pointer"
                                        >
                                          Save
                                        </button>
                                        <button 
                                          onClick={() => {
                                            setEditingDrillIndex(null);
                                            setEditingDrillType(null);
                                          }}
                                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded px-2 p-1 cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex justify-between">
                                        <h5 className="font-bold text-sm text-slate-200">{rDrill.name}</h5>
                                        <span className="text-xs text-slate-400">{rDrill.duration}</span>
                                      </div>
                                      <p className="text-xs text-slate-400 leading-relaxed">
                                        {rDrill.demoInstructions}
                                      </p>
                                      <div className="pt-1 flex justify-end gap-2 text-[10px] uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          onClick={() => {
                                            setEditingDrillIndex(idx);
                                            setEditingDrillType("recovery");
                                            setEditingDrillName(rDrill.name);
                                            setEditingDrillDuration(rDrill.duration);
                                            setEditingDrillReps(rDrill.repsOrSets || "1 set");
                                            setEditingDrillInstructions(rDrill.demoInstructions);
                                            setEditingDrillPoints(rDrill.coachingPoints ? rDrill.coachingPoints.join(", ") : "");
                                          }}
                                          className="text-amber-400 hover:text-amber-300 cursor-pointer"
                                        >
                                          [Edit]
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm(`Remove "${rDrill.name}"?`)) {
                                              handleDeleteDrill("recovery", idx);
                                            }
                                          }}
                                          className="text-red-400 hover:text-red-300 cursor-pointer"
                                        >
                                          [Remove]
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="bg-slate-800/20 p-4 rounded-xl border border-slate-800 space-y-2">
                              <h5 className="text-xs uppercase font-extrabold tracking-widest text-[#2563EB] flex items-center gap-1">
                                <Lightbulb className="w-4 h-4 text-amber-400" /> Professional Academy Insights
                              </h5>
                              <ul className="space-y-2">
                                {trainingPlan?.dailyPlan?.coachingTips?.map((tip, idx) => (
                                  <li key={idx} className="text-xs text-slate-400 leading-relaxed">
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* WEEKLY OVERVIEW TRACKER */}
                        <div className="mt-8 pt-6 border-t border-slate-800">
                          <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">
                            Weekly Periodization Roadmap
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                            {trainingPlan?.weeklyPlan?.map((day, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-xl border text-center transition-all ${
                                  day.completed 
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-slate-200"
                                    : "bg-slate-900/60 border-slate-800 text-slate-400"
                                }`}
                              >
                                <span className="text-[10px] font-black uppercase tracking-wider block">{day.dayName}</span>
                                <span className="text-[8px] md:text-[10px] uppercase block truncate mt-1 text-slate-500" title={day.focus}>
                                  {day.focus}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* ELITE WEAK FOOT ACADEMY SECTION */}
                      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] rounded-3xl p-6 border border-indigo-900/40 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/30 pb-4">
                          <div>
                            <span className="text-[10px] bg-indigo-500 px-3 py-1 rounded-full text-white font-extrabold tracking-widest uppercase">
                              DEDICATED ACADEMY MODULE
                            </span>
                            <h3 className="text-2xl font-black italic tracking-tight text-indigo-300 mt-2">
                              Elite Weak Foot Academy
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Consistent daily touches build rapid muscle-memory & balance adjustments in non-dominant feet.
                            </p>
                          </div>
                          
                          {/* BADGES METRICS */}
                          <div className="flex gap-2">
                            <div className="bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-xl text-center">
                              <span className="text-[8px] text-slate-400 block font-bold uppercase">TREAK</span>
                              <span className="text-lg font-bold text-orange-400">{weakFootState.streak} 🔥</span>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-xl text-center">
                              <span className="text-[8px] text-slate-400 block font-bold uppercase">LEVEL</span>
                              <span className="text-lg font-bold text-indigo-300">Lvl {weakFootState.currentLevel}</span>
                            </div>
                          </div>
                        </div>

                        {/* INTRO OF FIVE LEVELS OF METHODOLOGY */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          {[
                            { name: "1: Foundation", target: "Simple Wall & Lock Ankle", xp: 100 },
                            { name: "2: Control", target: "Weak juggle & Inside touch", xp: 200 },
                            { name: "3: Passing", target: "Transfer & Release", xp: 300 },
                            { name: "4: Finishing", target: "Instep Drive & Instep Volley", xp: 400 },
                            { name: "5: Match Ready", target: "Agility turn & Shoot", xp: 500 },
                          ].map((lvl, index) => {
                            const isLvlComplete = weakFootState.currentLevel > index + 1;
                            const isLvlActive = weakFootState.currentLevel === index + 1;
                            return (
                              <div
                                key={index}
                                className={`p-4 rounded-xl border text-center transition-all ${
                                  isLvlComplete
                                    ? "bg-slate-900/40 border-indigo-900/20 text-slate-500"
                                    : isLvlActive
                                    ? "bg-indigo-900/30 border-indigo-500 text-white shadow-lg"
                                    : "bg-slate-900/10 border-slate-800"
                                }`}
                              >
                                <span className={`text-[10px] font-black uppercase tracking-wider block ${isLvlActive ? "text-indigo-300" : ""}`}>
                                  Level {lvl.name}
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400 mt-1 block">
                                  {lvl.target}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* ENTER TOUCH DATA INTERACTIVE WIDGET */}
                        <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-900/20 space-y-4">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-indigo-400" /> Log Today's Non-Dominant Foot Workout
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Touches Completed</label>
                              <input
                                type="number"
                                value={wfTouches}
                                onChange={(e) => setWfTouches(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Consecutive Juggles</label>
                              <input
                                type="number"
                                value={wfJuggles}
                                onChange={(e) => setWfJuggles(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Estimated Passing Accuracy (%)</label>
                              <input
                                type="number"
                                value={wfAccuracy}
                                onChange={(e) => setWfAccuracy(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-sm"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              logWeakFootActivity(
                                parseInt(wfTouches, 10) || 50,
                                parseInt(wfJuggles, 10) || 5,
                                parseInt(wfAccuracy, 10) || 70
                              );
                              alert("Well fought! Weak foot touches logged, XP incremented!");
                            }}
                            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs uppercase px-4 py-2 rounded-lg transition-colors cursor-pointer"
                          >
                            Sync Touches to Leaderboard
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WEIGHTLIFTING */}
                  {activeTab === "gym" && (
                    <div className="space-y-8">
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-6">
                        <div className="border-b border-slate-800 pb-4">
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 px-3 py-1 border border-amber-500/20 rounded-full font-bold uppercase tracking-widest">
                            AI Weightlifting Coach
                          </span>
                          <h3 className="text-xl font-black italic mt-2">
                            Soccer-Specific Strong Program
                          </h3>
                          <p className="text-xs text-slate-400">
                            Our system crafts schedules prioritizing hamstring stiffness, explosive hip snap, and ACL prevention relative to your age ({userProfile.age}).
                          </p>
                        </div>

                        {liftWorkouts.map((workout) => (
                          <div key={workout.id} className="space-y-4">
                            <div className="flex justify-between items-center bg-slate-900/60 p-4 border border-slate-800 rounded-xl flex-wrap gap-2">
                              <div>
                                <h4 className="text-base font-bold text-slate-100">{workout.name}</h4>
                                <p className="text-xs text-slate-400">Focus: {workout.focus}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setIsAddingExercise(!isAddingExercise);
                                    setEditingExerciseName("");
                                    setEditingExerciseSets("3");
                                    setEditingExerciseReps("10 reps");
                                    setEditingExercisePoints("Maintain deep stability & control");
                                  }}
                                  className="text-[10px] uppercase font-black tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/25 px-2.5 py-1.5 rounded-lg hover:bg-amber-500/20 transition-all cursor-pointer"
                                >
                                  {isAddingExercise ? "Close Add Form" : "+ Add Lift"}
                                </button>
                                <button
                                  onClick={() => toggleLiftWorkoutCompleted(workout.id)}
                                  className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                                    workout.completed
                                      ? "bg-emerald-500 text-slate-950"
                                      : "bg-[#2563EB] hover:bg-blue-600 text-white"
                                  }`}
                                >
                                  {workout.completed ? "Workout Marked Done ✓" : "Commit Workout Completed"}
                                </button>
                              </div>
                            </div>

                            {/* ADD EXERCISE FORM */}
                            {isAddingExercise && (
                              <div className="p-4 bg-slate-950/80 rounded-xl border border-amber-500/30 space-y-3">
                                <h5 className="text-xs font-bold text-amber-400 uppercase">New Strength / Bio-Power Exercise</h5>
                                <div className="space-y-2 text-xs">
                                  <div>
                                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Exercise Name</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Hex bar Deadlifts" 
                                      value={editingExerciseName}
                                      onChange={(e) => setEditingExerciseName(e.target.value)}
                                      className="w-full bg-slate-900 border border-slate-700/80 rounded p-1.5 text-white"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Target Sets</label>
                                      <input 
                                        type="number" 
                                        placeholder="3" 
                                        value={editingExerciseSets}
                                        onChange={(e) => setEditingExerciseSets(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700/80 rounded p-1.5 text-white"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] text-slate-400 uppercase mb-1">Target Reps</label>
                                      <input 
                                        type="text" 
                                        placeholder="e.g. 8 reps" 
                                        value={editingExerciseReps}
                                        onChange={(e) => setEditingExerciseReps(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700/80 rounded p-1.5 text-white"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[9px] text-slate-400 uppercase mb-1">Coach Cues & Tips</label>
                                    <input 
                                      type="text" 
                                      placeholder="e.g. Flat back, grip firmly, explode up" 
                                      value={editingExercisePoints}
                                      onChange={(e) => setEditingExercisePoints(e.target.value)}
                                      className="w-full bg-slate-900 border border-slate-700/80 rounded p-1.5 text-white"
                                    />
                                  </div>
                                  <div className="flex gap-2 font-bold py-1">
                                    <button 
                                      onClick={() => handleCreateExercise(workout.id)}
                                      className="flex-grow bg-amber-500 hover:bg-amber-600 text-slate-950 py-1 rounded text-center cursor-pointer"
                                    >
                                      Add to Sheet
                                    </button>
                                    <button 
                                      onClick={() => setIsAddingExercise(false)}
                                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {workout.exercises.map((ex, exIdx) => (
                                <div key={ex.id || exIdx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-3 relative group">
                                  {editingExerciseId === ex.id ? (
                                    <div className="space-y-2 text-xs">
                                      <h5 className="font-bold text-amber-400 uppercase">Change Lift Intensity</h5>
                                      <input 
                                        type="text" 
                                        value={editingExerciseName}
                                        onChange={(e) => setEditingExerciseName(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white font-bold"
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                        <input 
                                          type="number" 
                                          value={editingExerciseSets}
                                          onChange={(e) => setEditingExerciseSets(e.target.value)}
                                          className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                          placeholder="Sets"
                                        />
                                        <input 
                                          type="text" 
                                          value={editingExerciseReps}
                                          onChange={(e) => setEditingExerciseReps(e.target.value)}
                                          className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                          placeholder="Reps"
                                        />
                                      </div>
                                      <input 
                                        type="text" 
                                        value={editingExercisePoints}
                                        onChange={(e) => setEditingExercisePoints(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-white"
                                        placeholder="Coach tips"
                                      />
                                      <div className="flex gap-2 font-bold py-1">
                                        <button 
                                          onClick={() => handleSaveExercise(workout.id, ex.id)}
                                          className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 cursor-pointer"
                                        >
                                          Save
                                        </button>
                                        <button 
                                          onClick={() => setEditingExerciseId(null)}
                                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 rounded px-2 p-1 cursor-pointer"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex justify-between items-start">
                                        <h5 className="font-bold text-xs text-slate-200">{ex.name}</h5>
                                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-400 font-bold uppercase whitespace-nowrap">
                                          {ex.targetSets}x {ex.targetReps}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-400 italic">
                                        Coach tips: {ex.coachingPoints}
                                      </p>

                                      <div className="space-y-1">
                                        <span className="text-[8px] font-black tracking-widest text-[#2563EB] block">
                                          DYNAMIC PROGRESSION MULTIPLIERS
                                        </span>
                                        {ex.sets?.map((set, setIdx) => (
                                          <div key={setIdx} className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400">Set {setIdx + 1}</span>
                                            <span className="text-slate-300 font-semibold">
                                              {set.reps} reps @ {set.weight} lbs
                                            </span>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Action buttons */}
                                      <div className="pt-2 border-t border-slate-850 flex justify-end gap-2 text-[9px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          onClick={() => {
                                            setEditingExerciseId(ex.id);
                                            setEditingExerciseName(ex.name);
                                            setEditingExerciseSets(String(ex.targetSets));
                                            setEditingExerciseReps(ex.targetReps);
                                            setEditingExercisePoints(ex.coachingPoints);
                                          }}
                                          className="text-amber-400 hover:text-amber-300 cursor-pointer"
                                        >
                                          [Edit]
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm(`Remove exercise "${ex.name}"?`)) {
                                              handleDeleteExercise(workout.id, ex.id);
                                            }
                                          }}
                                          className="text-red-400 hover:text-red-300 cursor-pointer"
                                        >
                                          [Delete]
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* SPORTS PHYSIOLOGY ACL EDUCATION BANNER */}
                      <div className="p-5 bg-gradient-to-tr from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-3xl space-y-2">
                        <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                          <Activity className="w-4 h-4" /> Posterior Chain Power Insights (Sports Science Lab)
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Soccer players experience heavy deceleration strain. Exercises like **Nordic Hamstring Curls** and **Trap Bar Deadlifts** build eccentric knee safety buffers, shielding your ACL from tearing on pivot-cuts.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: NUTRITION COACH */}
                  {activeTab === "nutrition" && (
                    <div className="space-y-8">
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-6">
                        <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div>
                            <span className="text-[10px] bg-rose-500/10 text-rose-400 px-3 py-1 border border-rose-500/20 rounded-full font-bold uppercase tracking-widest">
                              AI Nutrition Scientist
                            </span>
                            <h3 className="text-xl font-black italic mt-2">
                              Goal Oriented Nutrition Matrix
                            </h3>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">Goal: {userProfile.goal}</span>
                        </div>

                        {/* NUTRITION METRIC DIAGRAMS */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* CALORIES */}
                          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
                            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Daily Calories Intake</span>
                            <div className="text-2xl font-black text-rose-400 mt-2">
                              {nutritionLog.caloriesConsumed} / {nutritionLog.caloriesTarget} <span className="text-xs text-slate-500 font-normal">kcal</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-rose-500" 
                                style={{ width: `${Math.min(100, (nutritionLog.caloriesConsumed / nutritionLog.caloriesTarget) * 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* PROTEIN */}
                          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
                            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Protein target</span>
                            <div className="text-2xl font-black text-emerald-400 mt-2">
                              {nutritionLog.proteinConsumed} / {nutritionLog.proteinTarget} <span className="text-xs text-slate-500 font-normal">g</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500" 
                                style={{ width: `${Math.min(100, (nutritionLog.proteinConsumed / nutritionLog.proteinTarget) * 100)}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* WATER */}
                          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-center space-y-2">
                            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Hydration target</span>
                            <div className="text-2xl font-black text-blue-400 mt-2">
                              {nutritionLog.waterConsumed / 1000}L / {nutritionLog.waterTarget / 1000}L
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500" 
                                style={{ width: `${Math.min(100, (nutritionLog.waterConsumed / nutritionLog.waterTarget) * 100)}%` }}
                              ></div>
                            </div>
                          </div>

                        </div>

                        {/* WHY THIS MATTERS INSIGHT */}
                        <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-1">
                          <strong className="text-white block uppercase">Why this target matters:</strong>
                          <span>
                            To maintain speed and prevent early muscle cramping, carbohydrates must fuel muscle glycogen depots continuously. A high protein intake (1.5 - 2.0g per kg client bodyweight) guarantees rapid myofibril rebuilds secondary to intense technical sprints.
                          </span>
                        </div>

                        {/* SUGGESTED PRE-GAME & RECOVERY IDEAS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/30">
                            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5" /> High-Intensity Pre-Game Fueling
                            </h4>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              **Meal Idea:** 150g grilled chicken breast with 400g sweet potato mash and a serving of glazed carrots & honey. Take 3 hours prior to kickoff. Ensure 500ml water tracking.
                            </p>
                          </div>
                          <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-900/30">
                            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                              <Activity className="w-3.5 h-3.5" /> Quick Post-Game Muscle Recovery
                            </h4>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              **Meal Idea:** Triple pancake stack topped with fresh berries, lowfat yogurt, and 30g performance whey isolate powder shake immediately within 45 minutes post workout.
                            </p>
                          </div>
                        </div>

                        {/* ADD NEW MEAL FORM INSIDE VIEW */}
                        <div className="bg-slate-900/75 p-5 rounded-xl border border-slate-800 space-y-4">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
                            Create custom local food journal entry
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Meal Title</label>
                              <input
                                type="text"
                                placeholder="Salmon Pasta Salad"
                                value={quickMealName}
                                onChange={(e) => setQuickMealName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Category</label>
                              <select
                                value={quickMealType}
                                onChange={(e) => setQuickMealType(e.target.value as any)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              >
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                                <option value="Pre-Game">Pre-Game</option>
                                <option value="Post-Game">Post-Game</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Calories (kcal)</label>
                              <input
                                type="number"
                                placeholder="680"
                                value={quickMealCalories}
                                onChange={(e) => setQuickMealCalories(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Protein (g)</label>
                              <input
                                type="number"
                                placeholder="40"
                                value={quickMealProtein}
                                onChange={(e) => setQuickMealProtein(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (!quickMealName.trim() || !quickMealCalories) {
                                alert("Please state food names and calorie count.");
                                return;
                              }
                              logMeal({
                                type: quickMealType,
                                name: quickMealName,
                                calories: parseInt(quickMealCalories, 10),
                                protein: parseInt(quickMealProtein, 10) || 0,
                              });
                              setQuickMealName("");
                              setQuickMealCalories("");
                              setQuickMealProtein("");
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-slate-900 font-black text-xs uppercase px-4 py-2 rounded-lg transition-colors cursor-pointer"
                          >
                            Add Food Journal Row
                          </button>
                        </div>

                        {/* LIST JOURNAL ENTRIES */}
                        <div className="space-y-2">
                          <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                            Recorded today:
                          </h4>
                          {nutritionLog.meals.length === 0 ? (
                            <p className="text-xs text-slate-500 italic">No food logged yet today.</p>
                          ) : (
                            <div className="space-y-1.5">
                              {nutritionLog.meals.map((meal) => (
                                <div key={meal.id} className="bg-slate-900/60 border border-slate-800 px-4 py-2.5 rounded-lg flex items-center justify-between text-xs">
                                  <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-2 bg-slate-800 px-2 py-0.5 rounded">
                                      {meal.type}
                                    </span>
                                    <span className="font-bold text-slate-200">{meal.name}</span>
                                    <span className="text-slate-500 ml-2">({meal.time})</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-rose-400 font-bold">{meal.calories} kcal</span>
                                    <span className="text-emerald-400 font-semibold">{meal.protein}g protein</span>
                                    <button 
                                      onClick={() => deleteMeal(meal.id)}
                                      className="text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  )}

                  {/* TAB 5: SPEED LAB & VIDEO CRITIQUE */}
                  {activeTab === "lab" && (
                    <div className="space-y-8">
                      
                      {/* SPEED LAB PLYOMETRIC METRICS */}
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
                        <div>
                          <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-3 py-1 border border-cyan-500/20 rounded-full font-bold uppercase tracking-widest">
                            Speed Development Catalyst
                          </span>
                          <h3 className="text-xl font-black italic mt-2">
                            Weekly Biomechanical Speed Trials
                          </h3>
                        </div>

                        {/* PROGRESS METERS CHART */}
                        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
                          <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                            Latest Sprint Trials Log
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            {speedTests.map((st, idx) => (
                              <div key={st.id || idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                                <p className="text-[10px] text-slate-500 font-bold uppercase">{st.date}</p>
                                <div className="space-y-1.5 mt-2">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">10-yd Sprint</span>
                                    <span className="font-bold text-cyan-400">{st.tenYardSprint}s</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">20-yd Sprint</span>
                                    <span className="font-bold text-white">{st.twentyYardSprint}s</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Flying 10-yd</span>
                                    <span className="font-bold text-white">{st.flyingTen}s</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Vert Jump</span>
                                    <span className="font-bold text-emerald-400">{st.verticalJump}&quot;</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="p-4 bg-[#2563EB]/10 rounded-xl border border-[#2563EB]/30 flex items-center justify-between text-xs">
                            <span className="text-slate-300 font-medium">Record sub-1.6s 10-yd sprint to claim the **Sonic Surge** Badge!</span>
                            <span className="font-bold text-blue-400">500 XP Reward</span>
                          </div>
                        </div>

                        {/* ADD SPEED TEST DATA FORM */}
                        <div className="bg-slate-900/75 p-5 rounded-xl border border-slate-800 space-y-4">
                          <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-200">
                            Log Sprint & Jump metrics
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">10-yd Sprint (s)</label>
                              <input
                                type="number"
                                step="0.01"
                                placeholder="1.62"
                                value={speed10}
                                onChange={(e) => setSpeed10(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">20-yd Sprint (s)</label>
                              <input
                                type="number"
                                step="0.01"
                                placeholder="2.98"
                                value={speed20}
                                onChange={(e) => setSpeed20(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Flying 10 (s)</label>
                              <input
                                type="number"
                                step="0.01"
                                placeholder="1.15"
                                value={flying10}
                                onChange={(e) => setFlying10(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Vert Jump (&quot;)</label>
                              <input
                                type="number"
                                step="0.1"
                                placeholder="25.5"
                                value={vertJump}
                                onChange={(e) => setVertJump(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              logSpeedTest({
                                tenYardSprint: parseFloat(speed10) || 1.62,
                                twentyYardSprint: parseFloat(speed20) || 2.95,
                                flyingTen: parseFloat(flying10) || 1.15,
                                verticalJump: parseFloat(vertJump) || 25.0,
                              });
                              alert("Speed data recorded successfully. Your AI metrics were refreshed.");
                            }}
                            className="bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-slate-950 font-black text-xs uppercase px-4 py-2 rounded-lg transition-colors cursor-pointer"
                          >
                            Commit Speed Metrics
                          </button>
                        </div>
                      </div>

                      {/* AI VIDEO ANALYSIS INTERACTIVE SECTION */}
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-6">
                        <div>
                          <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 border border-indigo-500/20 rounded-full font-bold uppercase tracking-widest">
                            Computer Vision Overlay Analysis
                          </span>
                          <h3 className="text-xl font-black italic mt-2">
                            AI Dynamic Video Analyzer
                          </h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Choose your drill skill type and specify recent training footage. Real Gemini biomechanics output custom correction annotations and pro comparison overlays.
                          </p>
                        </div>

                        <form onSubmit={handleVideoSubmit} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Skill Drill Focus</label>
                              <select
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value as any)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                <option value="Shooting">Shooting mechanics</option>
                                <option value="Passing">Passing technique</option>
                                <option value="Dribbling">Dribbling & Ball mastery form</option>
                                <option value="Sprinting">Sprint acceleration mechanics</option>
                                <option value="First Touch">Dynamic first touch control</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Footage Filename</label>
                              <input
                                required
                                type="text"
                                placeholder="shooting_practice_v2.mp4"
                                value={customVideoName}
                                onChange={(e) => setCustomVideoName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Clip Duration</label>
                              <select
                                value={simulatedDuration}
                                onChange={(e) => setSimulatedDuration(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                <option value="8 seconds">8 seconds (Tight pivot action)</option>
                                <option value="12 seconds">12 seconds (Passing drill)</option>
                                <option value="15 seconds">15 seconds (Shuttle sprint run)</option>
                              </select>
                            </div>
                          </div>

                          <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-2">
                            <label className="flex items-start gap-2 cursor-pointer">
                              <input
                                required
                                type="checkbox"
                                checked={videoConsent}
                                onChange={(e) => setVideoConsent(e.target.checked)}
                                className="mt-0.5 rounded text-blue-500"
                              />
                              <span>
                                I authorize SoccerForge AI to run biomechanical analytical calculations over uploaded training videos for sports learning objectives.
                              </span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            disabled={loading || !videoConsent}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                          >
                            {loading ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Processing Pixels via Gemini...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" /> Start AI Frame Extraction
                              </>
                            )}
                          </button>
                        </form>

                        {/* STATUS REVIEWS OF ANALYSES */}
                        {uploadStatusMsg && (
                          <div className="p-3 bg-[#2563EB]/10 rounded-xl text-center text-xs text-blue-300 font-medium">
                            {uploadStatusMsg}
                          </div>
                        )}

                        <div className="space-y-4">
                          <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                            Previous Analysis Overlays
                          </h4>

                          {videoAnalyses.length === 0 ? (
                            <div className="p-4 bg-slate-900/20 border border-slate-800 text-slate-400 rounded-xl text-center text-xs">
                              No footage analyzed yet. Log your first video above to get a pro mechanics comparison score!
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {videoAnalyses.map((va) => (
                                <div key={va.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
                                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
                                    <div>
                                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full border border-indigo-500/20 uppercase font-black tracking-wide">
                                        Skill: {va.skillType}
                                      </span>
                                      <h5 className="font-bold text-sm text-slate-200 mt-1">{va.videoName}</h5>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] text-slate-400 uppercase font-bold">{va.date}</span>
                                      <span className="text-xl font-extrabold text-[#10B981] bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-0.5">
                                        Score: {va.score}/100
                                      </span>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                      <span className="text-[#2563EB] font-black uppercase text-[10px] tracking-wide mr-1.5 block">AI Mechanics Critique:</span>
                                      {va.critique}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-slate-950 p-3 rounded-lg space-y-1">
                                      <span className="text-[9px] text-[#10B981] uppercase font-black tracking-wide">Dynamic Correction Markers</span>
                                      <ul className="space-y-1 text-xs text-slate-400">
                                        {va.corrections?.map((c, idx) => (
                                          <li key={idx}>• {c}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="bg-slate-950 p-3 rounded-lg space-y-1 text-xs">
                                      <span className="text-[9px] text-[#2563EB] uppercase font-black tracking-wide">Drill Time Timestamp Index</span>
                                      <div className="space-y-1 mt-1">
                                        {va.annotations?.map((an, idx) => (
                                          <div key={idx} className="flex gap-2">
                                            <span className="text-cyan-400 font-bold font-mono">{an.timestamp}</span>
                                            <span className="text-slate-400">{an.note}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs">
                                    <span className="text-indigo-400 font-bold block uppercase text-[10px]">Comparison style analysis:</span>
                                    <p className="text-slate-300 mt-1 leading-relaxed">
                                      {va.proComparison}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB 6: CHAT COACH & PERFORMANCE REPORTS */}
                  {activeTab === "coach" && (
                    <div className="space-y-8">
                      
                      {/* WEEKLY SPORTS SCIENCE PERFORMANCE REPORTS */}
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-4">
                          <div>
                            <span className="text-[10px] bg-emerald-500/10 text-[#10B981] px-3 py-1 border border-[#10B981]/20 rounded-full font-bold uppercase tracking-widest">
                              WEEKLY PERFORMANCE REPORT ENGINE
                            </span>
                            <h3 className="text-xl font-black italic mt-2">
                              Sports Science Deep Analytics
                            </h3>
                          </div>
                          
                          <button
                            onClick={async () => {
                              try {
                                setUploadStatusMsg("Recalculating physical metrics...");
                                await generateNewPerformanceReport();
                                setUploadStatusMsg("Report successfully generated!");
                              } catch (err: any) {
                                alert("Failed to recompute metrics log context.");
                              }
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-[#10B981] text-xs font-bold uppercase rounded-xl shadow-md text-slate-900 cursor-pointer"
                          >
                            Compute Latest Analytics Review
                          </button>
                        </div>

                        <div className="space-y-4">
                          {performanceReports.map((report, idx) => (
                            <div key={idx} className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-sm">
                              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span className="text-xs font-extrabold text-white">Report for week ending: {report.weekStarting}</span>
                                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                                  Completion: {report.workoutCompletionRate}%
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                <div className="space-y-2">
                                  <div>
                                    <strong className="text-slate-400 block uppercase">Technical Performance Strengths:</strong>
                                    <p className="text-slate-300 leading-relaxed mt-0.5">{report.strengthsSummary}</p>
                                  </div>
                                  <div>
                                    <strong className="text-slate-400 block uppercase">Target Nutrition Audit Suggestions:</strong>
                                    <p className="text-slate-300 leading-relaxed mt-0.5">{report.nutritionAnalysis}</p>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <div>
                                    <strong className="text-slate-400 block uppercase mb-1">Key Action Plan Milestones:</strong>
                                    <ul className="space-y-1 text-slate-300">
                                      {report.priorities?.map((p, pIdx) => (
                                        <li key={pIdx}>• {p}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                                    <strong className="text-blue-400 block uppercase text-[10px]">Estimated Improvement Trend</strong>
                                    <p className="text-slate-300 leading-relaxed font-medium mt-1">{report.estimatedImprovementTrend}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CONVERSATIONAL COACH TYLER INTERACTIVE PANEL */}
                      <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col h-[550px]">
                        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-xl shadow-md">
                              👨‍🏫
                            </div>
                            <div>
                              <h4 className="text-base font-black italic">Coach Tyler</h4>
                              <p className="text-xs text-[#10B981] font-bold">● Active 24/7 Soccer Mentor & Strength Coach</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-zinc-500 italic block">Gemini 3.5 AI Hybrid System</span>
                        </div>

                        {/* MESSAGES WATERFALL */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-4">
                          {chatMessages.map((msg, idx) => {
                            const isModel = msg.role === "model";
                            return (
                              <div
                                key={idx}
                                className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                              >
                                <div
                                  className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-wrap shadow-sm ${
                                    isModel
                                      ? "bg-slate-800/80 text-slate-100 rounded-tl-none border border-slate-700/60"
                                      : "bg-[#2563EB] text-white rounded-tr-none"
                                  }`}
                                >
                                  {msg.text}
                                  <span className="text-[9px] text-slate-400/80 mt-1.5 block text-right">
                                    {msg.timestamp}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* CHAT CHUTEP INPUT */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-[#0F172A] rounded-b-2xl flex gap-2">
                          <input
                            type="text"
                            placeholder="Ask Coach Tyler: 'Explain trap-bar biomechanics' or 'What should I eat 2 hrs before kickoff?'"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
                          />
                          <button
                            type="submit"
                            disabled={loading || !chatInput.trim()}
                            className="bg-[#2563EB] hover:bg-blue-650 px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer text-white disabled:opacity-40"
                          >
                            Send
                          </button>
                        </form>
                      </div>

                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

          </main>

          {/* GAMIFICATION STATS LIST ROW (XP BAR AT THE VERY BOTTOM OF THE CONTEXT FILE) */}
          <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mt-4 space-y-6">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Unlocked Achievements & Pro Badges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((a) => {
                const isUnlocked = a.unlocked;
                return (
                  <div
                    key={a.id}
                    className={`p-4 rounded-xl border text-center relative transition-all ${
                      isUnlocked 
                        ? "bg-gradient-to-tr from-slate-900 to-emerald-950/20 border-emerald-500/30 text-white" 
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-1.5 right-1.5 text-[8px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded font-extrabold uppercase">
                        Locked
                      </div>
                    )}
                    <span className="text-2xl block mb-2">{isUnlocked ? "🏆" : "🔒"}</span>
                    <h5 className="font-bold text-xs uppercase tracking-tight truncate">{a.title}</h5>
                    <p className="text-[10px] text-slate-400 mt-1 leading-snug">{a.description}</p>
                    <span className="text-[9px] text-[#10B981] font-bold mt-2 block">+{a.xpBonus} XP Bonus</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* APP STORE REVIEWS PREPARATION FOOTER */}
          <footer className="mt-12 py-8 border-t border-slate-800 text-center space-y-4 text-xs text-slate-500">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="font-semibold text-slate-400">© 2026 SoccerForge AI</span>
              <a onClick={() => { setActiveTab("dashboard"); setShowSettingsModal(true); }} className="hover:underline cursor-pointer">Privacy Policy</a>
              <a onClick={() => { setActiveTab("dashboard"); setShowSettingsModal(true); }} className="hover:underline cursor-pointer">Terms of Service</a>
              <a onClick={() => { setActiveTab("dashboard"); setShowSettingsModal(true); }} className="hover:underline cursor-pointer">COPPA Handling Information</a>
              <a onClick={() => { setActiveTab("dashboard"); setShowSettingsModal(true); }} className="hover:underline cursor-pointer">Data Erasure Request API</a>
            </div>
            <p className="max-w-xl mx-auto leading-relaxed text-[10px]">
              SoccerForge is designed defensively for high-school & collegiate athletes. Biomechanical advice generated represents professional training practices but always consult certified athletic sports professionals for safety metrics.
            </p>
          </footer>

        </div>
      )}

      {/* MODAL 1: SETTINGS / PRIVACY COMPLIANCE CONTROLS */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 relative text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Identity Security & COPPA Compliance Controls
              </h4>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <strong className="text-white block uppercase mb-1">COPPA handling rule:</strong>
                <p className="text-slate-300 leading-relaxed">
                  Athletes under 13 years of age require verified parent or coach consent checks. No personal geo-tracking maps data is committed without strict legal authorizations.
                </p>
              </div>

              <div>
                <strong className="text-white block uppercase mb-1">GDPR & CCPA Rights Data Controls:</strong>
                <p className="text-slate-300 leading-relaxed">
                  We stand strictly behind right-to-be-forgotten regulations. Click the action option below to eliminate your logged sprints, weak-foot sessions, video analysis tokens, and profile instantly.
                </p>
                <button
                  onClick={() => {
                    if (confirm("Are you absolutely sure you want to permanently delete all personalized training data? This cannot be undone.")) {
                      resetAllData();
                      setShowSettingsModal(false);
                      alert("SoccerForge platform cleaned up of child credentials successfully.");
                    }
                  }}
                  className="mt-2 text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer font-bold transition-all text-[11px]"
                >
                  <UserX className="w-3.5 h-3.5" /> Erase Entire Profile & Logs
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1 text-[11px]">
                <strong className="text-slate-400 block uppercase">Sandbox Security Token Logs</strong>
                <div className="text-slate-500 font-mono">
                  <div>User Identity Account: {userProfile.name || "None Registered"}</div>
                  <div>Email Registration Identifier Mode: JeetPSinha@gmail.com</div>
                  <div>Time Synchronization Epoch: 2026-06-18</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Close Settings panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SUBSCRIPTION OFFERS TOGGLES */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" /> In-App Subscription Offers Matrix
              </h4>
              <button onClick={() => setShowSubscriptionModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            <p className="text-xs text-slate-400">
              SoccerForge works seamlessly via Google Play & iOS App Store In-App-Purchase layers. Pick a simulated tier below to calibrate active coach abilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* FREE TIER */}
              <div className={`p-4 rounded-2xl border text-xs text-slate-350 space-y-3 ${userPlanType === "Free" ? "border-blue-500 bg-slate-950" : "border-slate-800"}`}>
                <h5 className="font-extrabold text-slate-100 text-sm">FREE REGIMEN TIER</h5>
                <p className="text-slate-400 text-[11px]">Basic daily training regimens, simple weak foot touches logs.</p>
                <div className="text-base font-black text-white">$0.00 <span className="text-[10px] text-slate-500 font-light">/ Perpetual</span></div>
                <button
                  type="button"
                  onClick={() => {
                    setUserPlanType("Free");
                    setShowSubscriptionModal(false);
                    alert("Switched account profile back to Free tier bounds.");
                  }}
                  className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold text-[10px] uppercase transition-all cursor-pointer"
                >
                  Activate Free Setup
                </button>
              </div>

              {/* PRO TIER */}
              <div className={`p-4 rounded-2xl border text-xs text-slate-350 bg-gradient-to-tr from-slate-900 to-[#1e1b4b] space-y-3 ${userPlanType === "Pro" ? "border-amber-500 shadow-lg shadow-amber-500/5" : "border-[#1e1b4b]"}`}>
                <div className="flex justify-between items-center">
                  <h5 className="font-extrabold text-amber-400 text-sm">AI PRO PREMIUM</h5>
                  <span className="text-[9px] bg-amber-500 text-slate-950 px-1 rounded font-black font-sans leading-relaxed">BEST VALUE</span>
                </div>
                <p className="text-slate-300 text-[11px]">Unlimited personalized Technical programs, real AI lifts progressions, custom computer vision overlay reviews.</p>
                <div className="text-base font-black text-amber-300">$14.99 <span className="text-[10px] text-slate-500 font-light">/ Month</span></div>
                <button
                  type="button"
                  onClick={() => {
                    setUserPlanType("Pro");
                    setShowSubscriptionModal(false);
                    alert("Pro subscription activated! Unlock unlimited AI analysis and strength planning.");
                  }}
                  className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 rounded font-black text-[10px] uppercase transition-all hover:scale-[1.01] cursor-pointer"
                >
                  Subscribe Pro Premium
                </button>
              </div>

            </div>

            <div className="pt-2 border-t border-slate-800 text-right text-xs">
              <button onClick={() => setShowSubscriptionModal(false)} className="px-4 py-2 bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer">
                Return to pitch drills
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK MEAL LOGGING BOTTOM DRAWER */}
      {isMealLogging && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Quick Add Premium Meal Log</h4>
              <button onClick={() => setIsMealLogging(false)} className="text-slate-400 font-bold hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Meal Title</label>
                <input
                  type="text"
                  placeholder="e.g. Scrambled eggs, complex toast"
                  value={quickMealName}
                  onChange={(e) => setQuickMealName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Category</label>
                  <select
                    value={quickMealType}
                    onChange={(e) => setQuickMealType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Pre-Game">Pre-Game</option>
                    <option value="Post-Game">Post-Game</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    placeholder="520"
                    value={quickMealCalories}
                    onChange={(e) => setQuickMealCalories(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="30"
                    value={quickMealProtein}
                    onChange={(e) => setQuickMealProtein(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!quickMealName.trim() || !quickMealCalories) {
                    alert("Please fill in meal name and calorie goals.");
                    return;
                  }
                  logMeal({
                    type: quickMealType,
                    name: quickMealName,
                    calories: parseInt(quickMealCalories, 10),
                    protein: parseInt(quickMealProtein, 10) || 0,
                  });
                  setQuickMealName("");
                  setQuickMealCalories("");
                  setQuickMealProtein("");
                  setIsMealLogging(false);
                  alert("Food logged!");
                }}
                className="w-full bg-[#2563EB] text-white py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
              >
                Log Meal Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK WEAK FOOT LOG DRAWER */}
      {isWfLogging && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl max-w-lg w-full p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider">Quick Log Weak Foot Drills</h4>
              <button onClick={() => setIsWfLogging(false)} className="text-slate-400 font-bold hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Touches Added</label>
                <input
                  type="number"
                  placeholder="200"
                  value={wfTouches}
                  onChange={(e) => setWfTouches(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Juggles Added</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={wfJuggles}
                    onChange={(e) => setWfJuggles(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">Passing Accuracy (%)</label>
                  <input
                    type="number"
                    placeholder="75"
                    value={wfAccuracy}
                    onChange={(e) => setWfAccuracy(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  logWeakFootActivity(
                    parseInt(wfTouches, 10) || 50,
                    parseInt(wfJuggles, 10) || 5,
                    parseInt(wfAccuracy, 10) || 70
                  );
                  setWfTouches("100");
                  setWfJuggles("15");
                  setWfAccuracy("75");
                  setIsWfLogging(false);
                  alert("Touches cataloged! Streak and level computed.");
                }}
                className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
              >
                Log Weak Foot Volleys Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR FOR APPLE & GOOGLE RENDERINGS */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/95 border-t border-slate-800/80 px-4 md:px-8 flex items-center justify-between z-30 block lg:hidden">
        {[
          { id: "dashboard", label: "Dash", icon: Activity },
          { id: "pitch", label: "Pitch", icon: Target },
          { id: "gym", label: "Gym", icon: Dumbbell },
          { id: "nutrition", label: "Kitchen", icon: Apple },
          { id: "lab", label: "Lab", icon: Zap },
          { id: "coach", label: "Coach", icon: MessageSquare },
        ].map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                isSelected ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] font-bold uppercase tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
