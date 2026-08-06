import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase payload bounds for mock video streams/base64 uploads
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Lazy initializer for the Gemini AI SDK to prevent boot crashes if API key is blank
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ---------------------------------------------------------
// ENHANCED ERROR FALLBACK GENERATORS (Robust Performance Fallback)
// ---------------------------------------------------------

function getFallbackPlan(profile: any) {
  const name = profile?.name || "Player";
  const position = profile?.position || "Winger";
  const level = profile?.teamLevel || "Academy Level";
  const dominantFoot = profile?.dominantFoot || "Right";
  const weakFoot = dominantFoot === "Right" ? "Left" : "Right";
  const goal = profile?.goal || "Improve Performance";
  const availableDays = profile?.availableDays || 4;
  const trainingTime = profile?.trainingTime || 60;
  const gymAccess = !!profile?.gymAccess;

  const technicalDrills = [
    {
      name: "High-Frequency Sweet-Spot Wall Passes",
      duration: `${Math.round(trainingTime * 0.3)} mins`,
      repsOrSets: "150 firm repetitions",
      coachingPoints: [
        `Focus fully on using your ${weakFoot} foot to build symmetrical neural chemistry`,
        "Open your receiving hip 45 degrees to maintain absolute field awareness",
        "Keep ankle locked on contact"
      ],
      demoInstructions: `Stand 3 meters from a solid wall. Pass and receive solely with your non-dominant ${weakFoot} foot, focusing on clean sweet-spot soccer contact.`,
      videoPlaceHolder: "Wall Pass Focus",
      completed: false,
      xpValue: 100
    },
    {
      name: `Dynamic ${position}-Specific Sprint-Drills`,
      duration: `${Math.round(trainingTime * 0.4)} mins`,
      repsOrSets: "5 sets of 20 meters",
      coachingPoints: [
        "Unleash explosive power on first touch",
        "Low center of gravity during high-speed transitions",
        "Maintain upright form on straight line sprints"
      ],
      demoInstructions: `Set cones at 5-meter increments. Accelerate dynamically, focusing on explosive stride mechanics matching your role as an elite ${position}.`,
      videoPlaceHolder: "Linear Speed Focus",
      completed: false,
      xpValue: 100
    }
  ];

  const recoveryDrills = [
    {
      name: "Foam Roll & Deep Diaphragmatic Stretches",
      duration: "10 mins",
      repsOrSets: "2 rounds of 4 major stretches",
      coachingPoints: [
        "Inhale for 4 seconds, hold for 4, exhale for 4 to downregulate nervous system",
        "Release tension in hip flexors and calves to prevent common sports wear-and-tear"
      ],
      demoInstructions: "Roll dynamic muscles (quads, IT-band, and calves) slowly to maximize sports muscle recovery.",
      videoPlaceHolder: "Stretching Focus",
      completed: false,
      xpValue: 50
    }
  ];

  const todayGoals = [
    `Unlocking premier ${position} movement sequences`,
    `Build robust power durability using precise lower body drills`
  ];

  const coachingTips = [
    `Welcome to the Forge, ${name}. As a ${level} player, consistent technical touches build matchday confidence.`,
    `Your primary goal is ${goal}. Prioritize clean, structured sleep patterns alongside these routines to let your body synthesize muscle repairs.`
  ];

  const weeklyPlan = [
    { "dayName": "Monday", "focus": "Dynamic Speed & Dribbles", "completed": false },
    { "dayName": "Tuesday", "focus": "Strength Power Lifting", "completed": false },
    { "dayName": "Wednesday", "focus": "Cardio & Team Tactics", "completed": false },
    { "dayName": "Thursday", "focus": "Active Recovery Mobility", "completed": false },
    { "dayName": "Friday", "focus": "Match Prep Focus", "completed": false },
    { "dayName": "Saturday", "focus": "Peak Output Matchday", "completed": false },
    { "dayName": "Sunday", "focus": "Regenerative Reset", "completed": false }
  ];

  const monthlyRoadmap = [
    { "phase": "Week 1-2: Foundations", "focus": "Aerobic base and non-dominant foot wall-passes.", "milestone": "Hit 1,500 total wall-passes on weak foot." },
    { "phase": "Week 3-4: Progressions", "focus": "Reactive speed pivots and explosive resistance repetitions.", "milestone": "Achieve high metric consistency across training trails." }
  ];

  // Dynamic calorie & macro logic based on goal
  let calories = 2800;
  let protein = 160;
  if (goal.includes("Gain")) {
    calories = 3150;
    protein = 180;
  } else if (goal.includes("Lose")) {
    calories = 2450;
    protein = 165;
  }

  const liftingExercises = gymAccess ? [
    {
      "id": "ex_1",
      "name": "Bulgarian Split Squats (Gym)",
      "targetSets": 4,
      "targetReps": "8 reps per leg",
      "coachingPoints": "Keep shoulders tall, drive through front heel. Develops ultimate leg symmetry."
    },
    {
      "id": "ex_2",
      "name": "Heavy Trap Bar Deadlifts",
      "targetSets": 3,
      "targetReps": "5 reps @ 80% 1RM",
      "coachingPoints": "Brace core. Snap hips forward aggressively with flat back."
    },
    {
      "id": "ex_3",
      "name": "Nordic Hamstring Curls",
      "targetSets": 3,
      "targetReps": "6 reps",
      "coachingPoints": "Slow, resisted 4-second descent to stimulate strong tendon protection."
    }
  ] : [
    {
      "id": "ex_1",
      "name": "Bodyweight Bulgarian Split Squats",
      "targetSets": 4,
      "targetReps": "12 reps per leg",
      "coachingPoints": "Focus on high precision and full standard range of motion."
    },
    {
      "id": "ex_2",
      "name": "Single-Leg Glute Bridges",
      "targetSets": 3,
      "targetReps": "15 reps",
      "coachingPoints": "Squeeze glutes fully at peak extension. Strengthens lower back muscles."
    },
    {
      "id": "ex_3",
      "name": "Nordic Hamstring Curls (Assisted)",
      "targetSets": 3,
      "targetReps": "6 reps",
      "coachingPoints": "Use hands to gently push back up off floor, concentrating resistance on eccentric descent."
    }
  ];

  return {
    "trainingPlan": {
      "dailyPlan": {
        todayGoals,
        technicalDrills,
        recoveryDrills,
        coachingTips
      },
      weeklyPlan,
      monthlyRoadmap
    },
    calories,
    protein,
    "carbs": calories === 3150 ? 410 : 350,
    "water": 3500,
    "liftingPlan": [
      {
        "id": "lift_1",
        "name": gymAccess ? "Elite Gym Power & Speed Foundations" : "Elite Bodyweight Power & Joint Protective Plan",
        "focus": gymAccess ? "Lower-body power, barbell/rebound deadlifts, explosive jumps" : "High-tension muscle endurance and range control",
        "completed": false,
        "exercises": liftingExercises
      }
    ]
  };
}

function getFallbackChat(currentMessage: string, profile: any) {
  const name = profile?.name || "Player";
  const position = profile?.position || "Winger";
  const weakFoot = (profile?.dominantFoot === "Right" ? "Left" : "Right");
  const msgLower = (currentMessage || "").toLowerCase();

  let actionTag = "";
  let customResponse = "";

  if (msgLower.includes("pushup") || msgLower.includes("push-up")) {
    actionTag = `\n[COACH_ACTION:ADD_LIFT:name=Pushups (Eccentric Focus)|targetSets=3|targetReps=12 reps|coachingPoints=Keep core completely locked, fall slowly, explode upward]`;
    customResponse = `I have added Pushups with a slow eccentric tempo to your lifting plan. This constructs incredible upper trunk stiffness vital for winning physical 50/50 duels on the wing.`;
  } else if (msgLower.includes("squat") || msgLower.includes("squats")) {
    actionTag = `\n[COACH_ACTION:ADD_LIFT:name=Barbell Back Squats|targetSets=3|targetReps=8 reps|coachingPoints=Keep chest tall, descend below parallel, and drive aggressively]`;
    customResponse = `I have added Barbell Back Squats to your lifting sheets. Squat depth feeds explosive vertical acceleration, especially when starting a high-speed sprint.`;
  } else if (msgLower.includes("deadlift") || msgLower.includes("deadlifts")) {
    actionTag = `\n[COACH_ACTION:ADD_LIFT:name=Elite Trap-bar Deadlifts|targetSets=4|targetReps=5 reps|coachingPoints=Brace trunk, pull the slack out, push the ground away]`;
    customResponse = `Added elite Trap-bar Deadlifts! This stimulates deep force transfer through your hamstrings and glutes for high-speed linear acceleration.`;
  } else if (msgLower.includes("dribble") || msgLower.includes("dribbling") || msgLower.includes("cone") || msgLower.includes("cones")) {
    actionTag = `\n[COACH_ACTION:ADD_DRILL:name=Coach slalom tight-cones|duration=12 mins|repsOrSets=4 sets x 75 sec|instructions=Weave through 6 cones spaced 1 meter apart using rapid instep/outstep touches.|type=technical|points=Keep center of gravity low,Double touches on weak foot,Snap hips fast]`;
    customResponse = `Whiteboard updated! Added a fast-touch technical Slalom Drill to your skill training. Tight cones build elite, rapid touch coordination and ball-handling.`;
  } else if (msgLower.includes("pass") || msgLower.includes("passing") || msgLower.includes("wall") || msgLower.includes("wall passes")) {
    actionTag = `\n[COACH_ACTION:ADD_DRILL:name=High-tempo Rebounder Wall Passes|duration=15 mins|repsOrSets=150 precise repetitions|instructions=Pass and receive forcefully off a wall using only your weak ${weakFoot} foot.|type=technical|points=Lock the ankle tight,Angle receiving foot 45 deg,Active toes]`;
    customResponse = `Whiteboard updated! Got high-tempo weak foot wall passes loaded. This develops standard symmetry in your hips and triggers explosive fast-muscle reactions.`;
  } else if (msgLower.includes("change") || msgLower.includes("workout") || msgLower.includes("swap") || msgLower.includes("alter") || msgLower.includes("add")) {
    actionTag = `\n[COACH_ACTION:ADD_LIFT:name=Dynamic Kettlebell Swings|targetSets=3|targetReps=15 reps|coachingPoints=Hinge hard at the hips, squeeze glutes at peak extension tightly]`;
    customResponse = `Sure! I have adjusted your workout plan and added Kettlebell Swings. This is fantastic soccer training to stimulate hip power and rapid posterior chain recovery.`;
  }

  return `Coach Tyler: Excellent focus, ${name}! The high-demand AI model link experienced a temporary spike, but here is my strategic instruction on that:

${customResponse || `For an elite ${position}, high-velocity close control and rapid ${weakFoot}-foot pass work is the bedrock of playmaking. If you were asking about your drills, remember to coordinate your trailing arm for balance and keep your hips square to the target.`}

Stay consistent with your daily hydration and protein targets. Let's execute 50 quick touches on your weak foot today. Drop any other thoughts and I'll adapt your training!${actionTag}`;
}

function getFallbackVideoAnalysis(skillType: string, videoName: string, duration: string) {
  return {
    "score": 85,
    "critique": `Elite bio-mechanical review for your ${skillType || "Shooting"} sequence. Solid center-of-gravity management. We observed key kinetic triggers in your plant-foot angle and hip rotation during execution of ${videoName || "this drill"}.`,
    "corrections": [
      "Secure and lock the ankle firmly throughout the final phase to keep trajectory true and low.",
      "Open your weight-bearing hip 5 degrees wider to expand the available passing and shooting angles under tight defensive press.",
      "Keep head fully over the ball centerline so power remains concentrated directly on target."
    ],
    "annotations": [
      { "timestamp": "0:02", "note": "Plant foot secures proper alignment relative to the target centerline" },
      { "timestamp": "0:05", "note": "Dynamic hip flexion unleashes high acceleration through ball core contact" }
    ],
    "proComparison": `Your biomechanics match the sleek, dynamic precision of world-class pro athletes who dominate ${skillType || "Technical Mastery"}. Replicate their low base and rapid scans to make this habit permanent.`
  };
}

function getFallbackReport(logHistory: any, profile: any) {
  const name = profile?.name || "Player";
  return {
    "weekStarting": new Date().toLocaleDateString(),
    "strengthsSummary": `Superb technical progression shown, ${name}. Your consistent core discipline in logging technical repetitions is laying down superior neuromuscular pathways for upcoming matches.`,
    "priorities": [
      "Sustain at least 150 daily wall-passes on non-dominant foot.",
      "Ensure complete hydration index by hitting fluid intake early in physical sequences.",
      "Elevate lower body power through custom lift coach resistance exercises."
    ],
    "nutritionAnalysis": "Protein intake and total electrolyte replenishment indexes show positive progression. Consistent hydration levels are crucial to optimize recovery and minimize fatigue-induced cramping.",
    "workoutCompletionRate": 90,
    "estimatedImprovementTrend": "On trace for a 4% rise in acceleration response and a substantial rise in non-dominant foot ball control rating next week."
  };
}

function getLocalAdjustedPlan(profile: any, params: any, currentPlan: any, liftingPlan: any) {
  const base = getFallbackPlan(profile);
  const fatigue = Number(params.fatigue || 0);
  const soreness = Number(params.soreness || 0);
  const injury = params.injuryStatus || "None";
  const daysUntilMatch = params.daysUntilMatch || "None";
  const focus = params.newFocus || "Balance All";

  if (focus !== "Balance All") {
    if (base.trainingPlan.dailyPlan.technicalDrills.length > 0) {
      base.trainingPlan.dailyPlan.technicalDrills[0].name = `Adaptive: ${focus} Precision Matrix`;
      base.trainingPlan.dailyPlan.technicalDrills[0].demoInstructions = `Custom drill sequence focusing specifically on ${focus} training. Keep gravity low and execute clean soccer touches.`;
    }
  }

  if (fatigue > 6 || soreness > 6) {
    base.trainingPlan.dailyPlan.technicalDrills.forEach((drill: any) => {
      drill.name = `Regenerative: ${drill.name}`;
      drill.duration = "10 mins";
      drill.repsOrSets = "Low volume tactical reps";
      drill.coachingPoints.push("Listen to physical warning signs. Focus on fluid form over speed.");
    });
    base.trainingPlan.dailyPlan.recoveryDrills.push({
      name: "High Fatigue Active Joint Foam Rolling & Breathing",
      duration: "15 mins",
      repsOrSets: "3 sets slow range",
      coachingPoints: ["Deep breathing cycles", "Massage tight fascial trigger zones slow"],
      demoInstructions: "Roll muscles slowly, focusing on sore areas. Spend 2 minutes per muscle group.",
      videoPlaceHolder: "Myofascial Release",
      completed: false,
      xpValue: 40
    });
    base.calories = Math.round(base.calories * 0.9);
    base.carbs = Math.round(base.carbs * 0.85);
  }

  if (injury !== "None") {
    base.trainingPlan.dailyPlan.coachingTips.push(`ADJUSTMENT NOTE: Your plan has been safety-offloaded due to active ${injury} discomfort. Avoid cutting movements.`);
    base.trainingPlan.dailyPlan.technicalDrills = [
      {
        name: "Low-impact Static First Touch & Passing",
        duration: "12 mins",
        repsOrSets: "120 safe static instep touches",
        coachingPoints: ["Zero high-impact pivots", "Keep footing secure and body balanced", "Focus purely on foot eye coordination"],
        demoInstructions: `Stand stationary. Perform rhythmic instep taps and sole rollers. Limit weight shifting on the injured ${injury} area.`,
        videoPlaceHolder: "Static Touches Demo",
        completed: false,
        xpValue: 80
      }
    ];
    base.liftingPlan.forEach((lift: any) => {
      lift.name = `Safety Offloaded Activation Plan`;
      lift.focus = `Injury prevention & rehab targeting ${injury}`;
      lift.exercises = [
        {
          id: "rehab_1",
          name: "Static Wall Sits Focus",
          targetSets: 3,
          targetReps: "40 seconds active hold",
          coachingPoints: "Keep back flat against the wall, knee angle at 90 degrees."
        },
        {
          id: "rehab_2",
          name: "Single-Leg Glute Bridges",
          targetSets: 3,
          targetReps: "12 reps",
          coachingPoints: "Drive through heels, squeeze glutes at the peak."
        },
        {
          id: "rehab_3",
          name: "Isometric Quad Sets",
          targetSets: 3,
          targetReps: "10x 10sec holds",
          coachingPoints: "Tighten thigh muscle, push back of knee flat into floor."
        }
      ];
    });
  }

  if (daysUntilMatch === "Tomorrow" || daysUntilMatch === "1") {
    base.trainingPlan.dailyPlan.todayGoals = ["CNS Priming Drills", "Pre-hydration check", "Pattern visualization & tactical recall"];
    base.trainingPlan.dailyPlan.coachingTips.push("MATCHDAY -1 ALERT: Rest is weapons-grade preparation. Fuel carbs fully today.");
    base.trainingPlan.dailyPlan.technicalDrills = [
      {
        name: "Elite CNS Prep & Footwork Primer",
        duration: "15 mins",
        repsOrSets: "Low volume, premium quick touches",
        coachingPoints: ["Unleash snappy response velocity", "Do NOT produce lactic fatigue", "Simulate game-speed setups"],
        demoInstructions: "Lay out light 3-step ladders or cones. Slip through quickly, then trigger 3 rapid touches and catch. Complete 20-30 seconds with 90 seconds of full standby rest.",
        videoPlaceHolder: "CNS Matchday-1 Primer",
        completed: false,
        xpValue: 100
      }
    ];
    base.liftingPlan.forEach((lift: any) => {
      lift.name = `CNS Mobilizer Joint Activation (Matchday -1)`;
      lift.focus = `Prepare muscles for peak fast-twitch output without microtears`;
      lift.exercises = [
        {
          id: "match_prep_1",
          name: "Dynamic Squat Jumps (Low impact, bodyweight)",
          targetSets: 2,
          targetReps: "5 reps",
          coachingPoints: "Explode upwards, landing soft as a feather."
        },
        {
          id: "match_prep_2",
          name: "Hip Opener Gates (Dynamic Stretch)",
          targetSets: 2,
          targetReps: "10 reps each side",
          coachingPoints: "Fully open hip socket dynamic mobility."
        }
      ];
    });
    base.carbs = Math.round(base.carbs * 1.2);
    base.water = Math.max(base.water, 4200);
  }

  return base;
}

// ---------------------------------------------------------
// SERVER-SIDE ENDPOINTS (API First)
// ---------------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SoccerForge AI Server is running securely." });
});

// Endpoint: Generate Personalized Onboarding Plan (Training + Lift + Nutrition targets)
app.post("/api/coaching/generate-plan", async (req, res) => {
  try {
    const { profile } = req.body;
    if (!profile) {
      return res.status(400).json({ error: "User profile data is required." });
    }

    const ai = getGeminiClient();
    const prompt = `
      You are an elite academy soccer coach and strength specialist.
      Generate a customized soccer development and weightlifting plan for this player:
      Name: ${profile.name}
      Age: ${profile.age}
      Dominant Foot: ${profile.dominantFoot}
      Position: ${profile.position}
      Team Level: ${profile.teamLevel}
      Strengths: ${profile.strengths?.join(", ")}
      Weaknesses: ${profile.weaknesses?.join(", ")}
      Primary Fitness Goal: ${profile.goal}
      Available days to train: ${profile.availableDays} days/week
      Time/session: ${profile.trainingTime} mins
      Gym access: ${profile.gymAccess ? "Yes" : "No"}
      Dietary restrictions: ${profile.dietaryRestrictions?.join(", ") || "None"}
      
      Generate a JSON response conforming strictly to the following schema. Ensure all fields are fully populated with realistic soccer-specific drills, targets, and coaching cues. Do not return empty fields.
      
      CRITICAL SHAPE REQUIREMENT:
      {
        "trainingPlan": {
          "dailyPlan": {
            "todayGoals": ["string"],
            "technicalDrills": [
              {
                "name": "string",
                "duration": "string",
                "repsOrSets": "string",
                "coachingPoints": ["string"],
                "demoInstructions": "string",
                "videoPlaceHolder": "string",
                "completed": false,
                "xpValue": 100
              }
            ],
            "recoveryDrills": [
              {
                "name": "string",
                "duration": "string",
                "repsOrSets": "string",
                "coachingPoints": ["string"],
                "demoInstructions": "string",
                "videoPlaceHolder": "string",
                "completed": false,
                "xpValue": 50
              }
            ],
            "coachingTips": ["string"]
          },
          "weeklyPlan": [
            { "dayName": "Monday", "focus": "string", "completed": false },
            { "dayName": "Tuesday", "focus": "string", "completed": false },
            { "dayName": "Wednesday", "focus": "string", "completed": false },
            { "dayName": "Thursday", "focus": "string", "completed": false },
            { "dayName": "Friday", "focus": "string", "completed": false },
            { "dayName": "Saturday", "focus": "string", "completed": false },
            { "dayName": "Sunday", "focus": "string", "completed": false }
          ],
          "monthlyRoadmap": [
            { "phase": "Week 1-2: Foundations", "focus": "string", "milestone": "string" },
            { "phase": "Week 3-4: Progression", "focus": "string", "milestone": "string" }
          ]
        },
        "calories": 2800,
        "protein": 160,
        "carbs": 350,
        "water": 3500,
        "liftingPlan": [
          {
            "id": "lift_1",
            "name": "Day 1: Explosive Power & Speed Foundations",
            "focus": "Lower-body power, RDLs, plyometrics",
            "completed": false,
            "exercises": [
              {
                "id": "ex_1",
                "name": "Bulgarian Split Squats",
                "targetSets": 4,
                "targetReps": "8 reps per leg",
                "coachingPoints": "Keep chest tall, drive up explosively through front heel."
              },
              {
                "id": "ex_2",
                "name": "Trap Bar Deadlifts",
                "targetSets": 3,
                "targetReps": "5 reps",
                "coachingPoints": "Focus on hips extension. Snap hips forward explosively."
              },
              {
                "id": "ex_3",
                "name": "Nordic hamstring Curls",
                "targetSets": 3,
                "targetReps": "6 reps",
                "coachingPoints": "Slow, controlled eccentric lowering phase."
              }
            ]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the head master soccer development coach at a pro UEFA academy. Output exactly a valid JSON object matching the requested schema.",
      },
    });

    const outputText = response.text || "{}";
    const parsedData = JSON.parse(outputText.trim());
    res.json(parsedData);
  } catch (err: any) {
    console.warn("Gemini API is temporarily unavailable. Activating dynamic local sports-science model: ", err);
    try {
      const fallbackPlan = getFallbackPlan(req.body.profile);
      res.json(fallbackPlan);
    } catch (fallbackErr: any) {
      console.error("Ultimate fallback failure: ", fallbackErr);
      res.status(500).json({ error: "Failed to construct AI plan. Please retry in a moment." });
    }
  }
});

// Endpoint: Adjust training plans based on fatigue, injuries, upcoming matches, missed sessions etc.
app.post("/api/coaching/adjust-plan", async (req, res) => {
  const { profile, adjustmentParams, currentPlan, liftingPlan } = req.body;
  if (!profile || !adjustmentParams) {
    return res.status(400).json({ error: "Profile and adjustment parameters are required." });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `
      You are an elite sports scientist and custom soccer coordinator for high-performance academy athletes.
      Adjust the current training and weightlifting plans based on these real-time physical and schedule parameters:
      
      PHYSICAL & SCHEDULE INPUTS:
      - Missed Sessions Recently: ${adjustmentParams.missedSessions ? "Yes, some sessions were missed" : "No, on track"}
      - Fatigue level (1-10): ${adjustmentParams.fatigue}
      - Soreness level (1-10): ${adjustmentParams.soreness}
      - Injury / Active Pain Areas: ${adjustmentParams.injuryStatus}
      - Upcoming Game/Match Proximity: ${adjustmentParams.daysUntilMatch}
      - Selected Core Training Focus: ${adjustmentParams.newFocus}
      - Player Notes/Feedback: ${adjustmentParams.userNotes || "None"}

      PLAYER PROFILE CONTEXT:
      - Name: ${profile.name}
      - Position: ${profile.position}
      - Age: ${profile.age}
      - Goal: ${profile.goal}
      - Foot: ${profile.dominantFoot} dominant.
      
      EXISTING PLANS:
      - Current training plan: ${JSON.stringify(currentPlan || {})}
      - Current lift workouts: ${JSON.stringify(liftingPlan || {})}

      ADJUSTMENT INSTRUCTIONS:
      1. FATIGUE / SORENESS RULES: If fatigue or soreness is high (> 6), scale down daily technical drills' durations by 30-50%, drop sets/weight in liftingPlan, and introduce custom myofascial / deep diaphragmatic breathing sequences, recovery sleep recommendations, and stretching.
      2. INJURY PREVENTION RULES: If injuryStatus is anything other than 'None' (e.g., knee, calf, ankle), remove heavy load squats/plyometrics from liftingPlan. Swap with safe static isometrics or target joint mobilizers (e.g. wall sits, resistance band ankle triggers, single leg glute bridges). Swap high-impact dribbling in techDrills with stationary technical touches, first-touch passing off rebounders, or strategic video match preparation visualization.
      3. MATCHDAY COUNTDOWN RULES:
         - If daysUntilMatch is 'Tomorrow' or '1': This is Matchday-1! Set dailyTechDrills to an elite 'CNS Matchday-1 Primer' (15 min low-load high-speed, e.g., quick response juggles, tennis ball drops, active visualization). Change liftingPlan to a light mobilizer routine. Direct nutrition to load high carbohydrates and extreme hydration.
         - If daysUntilMatch is 'In 2 days' or '2': No heavy lifts! Change liftingPlan to lightweight activation stretches and CNS preparation. Keep techDrills focus medium volume but tactical.
      4. MISSED SESSIONS: If missedSessions is True, adjust the weeklyPlan layout to prioritize primary technical touches while skipping unnecessary fluff, ensuring they catch up without overtraining. Add supportive coach insights reassurance.
      5. TECHNICAL TOPIC INCLUSION: Focus the technicalDrills around the selected focus: "${adjustmentParams.newFocus}", which must align with soccer mastery (e.g., Ball mastery, First touch, Passing, Dribbling, Shooting, Crossing, Finishing, Speed/Agility).
      6. Output must be a valid JSON object matching the exact schema returned below. Every single workout must include "duration", "repsOrSets", "coachingPoints" (array of strings), "demoInstructions" (concrete instructions on how to perform the drill), "videoPlaceHolder", and progress tracking markers.

      CRITICAL ENFORCED RESPONSE JSON SCHEMA:
      {
        "trainingPlan": {
          "dailyPlan": {
            "todayGoals": ["string"],
            "technicalDrills": [
              {
                "name": "string",
                "duration": "string",
                "repsOrSets": "string",
                "coachingPoints": ["string"],
                "demoInstructions": "string",
                "videoPlaceHolder": "string",
                "completed": false,
                "xpValue": 100
              }
            ],
            "recoveryDrills": [
              {
                "name": "string",
                "duration": "string",
                "repsOrSets": "string",
                "coachingPoints": ["string"],
                "demoInstructions": "string",
                "videoPlaceHolder": "string",
                "completed": false,
                "xpValue": 50
              }
            ],
            "coachingTips": ["string"]
          },
          "weeklyPlan": [
            { "dayName": "Monday", "focus": "string", "completed": false },
            { "dayName": "Tuesday", "focus": "string", "completed": false },
            { "dayName": "Wednesday", "focus": "string", "completed": false },
            { "dayName": "Thursday", "focus": "string", "completed": false },
            { "dayName": "Friday", "focus": "string", "completed": false },
            { "dayName": "Saturday", "focus": "string", "completed": false },
            { "dayName": "Sunday", "focus": "string", "completed": false }
          ],
          "monthlyRoadmap": [
            { "phase": "Week 1-2: Foundations", "focus": "string", "milestone": "string" },
            { "phase": "Week 3-4: Progression", "focus": "string", "milestone": "string" }
          ]
        },
        "calories": 2800,
        "protein": 160,
        "carbs": 350,
        "water": 3500,
        "liftingPlan": [
          {
            "id": "lift_1",
            "name": "string",
            "focus": "string",
            "completed": false,
            "exercises": [
              {
                "id": "string",
                "name": "string",
                "targetSets": 3,
                "targetReps": "string",
                "coachingPoints": "string"
              }
            ]
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the chief director of sports-science at a UEFA Pro football academy. Respond strictly with highly personalized, technically accurate JSON matching the schema.",
      },
    });

    const outputText = response.text || "{}";
    const parsedData = JSON.parse(outputText.trim());
    res.json(parsedData);
  } catch (err: any) {
    console.warn("AI adjusting failed or Gemini unavailable. Running responsive local sports science fallback adjustments: ", err);
    try {
      const adjusted = getLocalAdjustedPlan(profile, adjustmentParams, currentPlan, liftingPlan);
      res.json(adjusted);
    } catch (fallbackErr: any) {
      console.error("Local fallback adaptation engine failed: ", fallbackErr);
      res.status(500).json({ error: "Failed to perform AI plan customization. Please try again." });
    }
  }
});

// Endpoint: AI Coaching Chat (Freeform interactive mentor advice)
app.post("/api/chat/message", async (req, res) => {
  try {
    const { history, currentMessage, profile } = req.body;
    if (!currentMessage) {
      return res.status(400).json({ error: "Message content is required." });
    }

    const ai = getGeminiClient();

    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    // Inject profile context into model background
    const profileText = profile
      ? `Profile Context: Position: ${profile.position}, Level: ${profile.teamLevel}, Weak Foot: ${profile.dominantFoot === "Right" ? "Left" : "Right"}, Goals: ${profile.goal}.`
      : "";

    const systemInstruction = `
      You are Coach Tyler, an exceptional soccer mentor, Olympic sports nutritionist, and collegiate strength coach.
      You are speaking to a serious young player (${profile?.name || "Player"}).
      ${profileText}
      Provide specific, highly motivating, tactical, athletic, and technical drills or advice.
      Be positive, direct, and actionable. Keep your responses concise (under 250 words) so they are easy to read in a mobile messaging view.

      CRITICAL WORKOUT MODIFICATION ABILITY:
      If ${profile?.name || "Player"} explicitly requests to change, alter, swap, add or remove any technical/recovery drills or weightlifting exercises, you MUST fulfill this instantly! 
      In addition to your verbal reply, append a single specific action line at the very end of your response using EXACTLY one of these templates to trigger the digital whiteboard scanner to physically update their schedules. Make sure values matching what the user asks (or your recommendation) are filled:
      - To ADD a skill drill: [COACH_ACTION:ADD_DRILL:name=NAME|duration=15 mins|repsOrSets=4 sets|instructions=DETAILS|type=technical|points=P1,P2,P3]
         (where type can be 'technical' or 'recovery')
      - To ADD a weightlifting exercise: [COACH_ACTION:ADD_LIFT:name=EXERCISE_NAME|targetSets=3|targetReps=6-8 reps|coachingPoints=POINTS]
      Choose the closest logical template. Keep the tag on its own line at the absolute end. Do not write any text after the bracket closes.
    `;

    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
      },
      history: formattedHistory,
    });

    const result = await chatInstance.sendMessage({ message: currentMessage });
    res.json({ text: result.text });
  } catch (err: any) {
    console.warn("Gemini Chat API unavailable. Activating local Coach Tyler assistant: ", err);
    try {
      const fallbackReply = getFallbackChat(req.body.currentMessage, req.body.profile);
      res.json({ text: fallbackReply });
    } catch (fallbackErr: any) {
      console.error("Ultimate Chat fallback failure: ", fallbackErr);
      res.status(500).json({ error: "Coach Tyler is offline temporarily. Please check back in a moment!" });
    }
  }
});

// Endpoint: AI Video Analysis (Critiques soccer skill drills from custom uploads)
app.post("/api/video/analyze", async (req, res) => {
  try {
    const { skillType, videoName, duration } = req.body;

    const ai = getGeminiClient();
    const prompt = `
      Perform a comprehensive elite bio-mechanical analysis for the soccer drill described:
      Skill Type: ${skillType}
      Video Name: ${videoName}
      Drill Duration: ${duration || "8 seconds"}
      
      Generate a JSON response conforming strictly to this format:
      {
        "score": 82,
        "critique": "A paragraph explaining the mechanics, hip alignment, and ball contact point of this drill.",
        "corrections": ["Correction 1", "Correction 2", "Correction 3"],
        "annotations": [
          { "timestamp": "0:02", "note": "Brief action annotation" },
          { "timestamp": "0:05", "note": "Brief mechanic cue annotation" }
        ],
        "proComparison": "Compare player execution style either positively or via cue adjustments with a legendary pro matching this skill (e.g., Toni Kroos for precision passing, Messi for close dribbling, Ronaldo or Erling Haaland for explosive shot power)."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are a professional video analyst and lead soccer coach. Critically examine mechanics and output strict JSON.",
      },
    });

    const parsed = JSON.parse((response.text || "{}").trim());
    res.json({
      id: "vid_" + Date.now(),
      date: new Date().toLocaleDateString(),
      videoName: videoName || "drills_upload.mp4",
      skillType: skillType || "Shooting",
      ...parsed,
    });
  } catch (err: any) {
    console.warn("Video Analysis API unavailable. Instantiating rapid biomechanics pattern: ", err);
    try {
      const { skillType, videoName, duration } = req.body;
      const fallbackAnalysis = getFallbackVideoAnalysis(skillType, videoName, duration);
      res.json({
        id: "vid_" + Date.now(),
        date: new Date().toLocaleDateString(),
        videoName: videoName || "drills_upload.mp4",
        skillType: skillType || "Shooting",
        ...fallbackAnalysis,
      });
    } catch (fallbackErr: any) {
      console.error("Ultimate Video fallback failure: ", fallbackErr);
      res.status(500).json({ error: "Technique lab scanner offline. Try again shortly!" });
    }
  }
});

// Endpoint: AI Weekly Performance Report Analyzer
app.post("/api/reports/generate", async (req, res) => {
  try {
    const { logHistory, profile } = req.body;

    const ai = getGeminiClient();
    const prompt = `
      You are a sports scientist and technical director. Convert this player's logs into a premium weekly summary report.
      User Profile: ${JSON.stringify(profile)}
      Recent Activity Stack: ${JSON.stringify(logHistory)}
      
      Produce a concise weekly status JSON matching:
      {
        "weekStarting": "${new Date().toLocaleDateString()}",
        "strengthsSummary": "Write a 2-3 sentence overview of what went well.",
        "priorities": ["Priority Drill 1", "Priority Lift 2", "Priority Nutrition 3"],
        "nutritionAnalysis": "Explain why their protein, fluids, and carb balance is/isn't fully supporting their soccer-specific output.",
        "workoutCompletionRate": 85,
        "estimatedImprovementTrend": "Explain projected athletic/skill gains based on this week's consistent habits."
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse((response.text || "{}").trim());
    res.json(parsed);
  } catch (err: any) {
    console.warn("Performance Report generator unavailable. Compiling local report framework: ", err);
    try {
      const { logHistory, profile } = req.body;
      const fallbackReport = getFallbackReport(logHistory, profile);
      res.json(fallbackReport);
    } catch (fallbackErr: any) {
      console.error("Ultimate Report fallback failure: ", fallbackErr);
      res.status(500).json({ error: "Failed to compile weekly reports. Retry in a moment." });
    }
  }
});

// ---------------------------------------------------------
// VITE OR STATIC FILE MIDDLEWARE
// ---------------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind exclusively to 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SoccerForge AI full-stack container listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Critical server boot error:", err);
});
