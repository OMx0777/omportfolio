import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// 1. CREDENTIALS
const API_KEY = "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"; 
const BASE_URL = "https://openrouter.ai/api/v1";

// 2. UPDATED MODEL LIST (Currently Active Free Models)
const MODELS = [
  "mistralai/mistral-7b-instruct:free",   // Most reliable free model
  "huggingfaceh4/zephyr-7b-beta:free",    // Very fast, usually available
  "meta-llama/llama-3.2-1b-instruct:free", // New lightweight model (less traffic)
  "google/gemini-2.0-flash-exp:free",     // Smartest, but keeps hitting rate limits (use as backup)
  "openchat/openchat-7:free"              // Another solid backup
];

// 3. YOUR RESUME DATA (Updated with Resume PDF Content)
const DATA_RESUME = `
About Om Sathe:
- Role: AI/ML Engineer & Full Stack Developer
- Education: Bachelor of Science in Computer Science, Indira College of Commerce and Science, Pune (2023-2026). Grade: A+ (CGPA: 8.64/10)
- Contact: +91 8767657297 | omsathe0777@gmail.com | Pune, Maharashtra
- GitHub: https://github.com/OMx0777
- Portfolio: Work Samples Portfolio

Experience:
1. AI/ML Engineer Intern at BluOrigin Media (Dec 2025 - Present)
   - Developing and deploying AI/ML models to optimize digital marketing performance, focusing on lead scoring and campaign performance prediction using supervised and unsupervised learning.
   - Engineering data pipelines for structured and unstructured datasets via Exploratory Data Analysis (EDA) and feature engineering to automate analytical tasks.
   - Collaborating with cross-functional teams to translate technical insights into actionable business recommendations using Python and data visualization tools.

2. Python & Web Developer Intern at Alfido IT Services (July 2025 - Oct 2025)
   - Gained hands-on experience in dynamic web application development and managed end-to-end deployment lifecycles, deploying over 7 iterative updates.
   - Eliminated 100% of third-party API operational costs by developing an open-source optimization solution.

Projects:
- Agrarian Distress & Suicide Risk Predictor: Designed a predictive model using Python, XGBoost, and Scikit-learn to analyze socioeconomic and climate data, identifying key risk factors for farmer distress with a 92% F1-Score.
- AI-Powered Pothole Detection & Reporting System: Engineered a real-time computer vision system using YOLOv5 and OpenCV to detect road hazards with 95% mAP. Implemented a geo-tagging module and automated email alerts to the Road & Transport Department.
- LogicGuard (ML-Augmented Neurosymbolic Framework): Engineered a hybrid architecture integrating GPT-4 with LTLf to enforce SOP adherence. Implemented a runtime enforcement layer using DFA and MONA to eliminate "Logic Drift," achieving a 93% reliability rate and 53.3% reduction in logic-based vulnerabilities.
- Offline Code Generation App: A full-stack developer tool using self-finetuned DeepSeek LLM for privacy.
- Real-Time Emotion Tracker: Computer vision project using Torch/OpenCV that recommends music based on live emotion.
- Credit Card Fraud Detector: Achieved 90-95% accuracy using Random Forest and XGBoost.

Research & Publications:
- Published Paper: "Machine Learning-Augmented Neurosymbolic AgenticOps Framework for Runtime Verification and Enforcement of Standard Operating Procedures" in the International Journal of Innovation Science.

Skills:
- Languages: Python (Advanced), Java, C, C++, SQL, TypeScript, JavaScript.
- AI/ML: GenAI, TensorFlow, PyTorch, OpenCV, YOLO, LLMs, RAG Pipelines.
- Web: Next.js, React, Node.js, PHP, Tailwind, HTML.
- Data: Pandas, NumPy, Scikit-learn, Matplotlib.
- Hardware: Arduino, Raspberry Pi, ESP32, IoT.
- Tools: AWS, Git, Linux (Arch Linux enthusiast), VS Code, Neo-vim, Docker.

Achievements & Awards:
- 1st Place: Intercollege Hackathon.
- Community Volunteer: Lichess (World's top 2 chess organization).
- Leadership: Vice President of Rotaract Club of IC (2023-2025) and Best Board of Director Award.
- Sports: Pune District Wrestling Champion (Gold Medal) and District Level Chess Silver Medal.

Certifications:
- IBM - Developing AI Application using Python and Flask.
- Cloud Computing With Amazon Web Services.
- Web Development Full Course.
`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const client = new OpenAI({
      apiKey: API_KEY,
      baseURL: BASE_URL,
      defaultHeaders: {
        "HTTP-Referer": "https://omsathe-portfolio.com", 
        "X-Title": "Om Portfolio",
      }
    });

    const conversation = [
      {
        role: 'system',
        content: `You are Omi, a helpful AI assistant for Om Sathe's portfolio. 
        Answer questions strictly based on the resume below.
        Keep answers concise (under 3 sentences) and professional but friendly.
        
        Resume:
        ${DATA_RESUME}`
      },
      ...messages 
    ];

    // --- ROBUST RETRY LOOP ---
    let lastError = null;

    for (const model of MODELS) {
      try {
        console.log(`Attempting with model: ${model}`);
        
        const response = await client.chat.completions.create({
          model: model,
          messages: conversation,
          max_tokens: 150, 
        });

        // If we get here, it worked! Return immediately.
        return NextResponse.json({
          message: response.choices[0].message.content
        });

      } catch (error) {
        // Log the failure but continue to the next model
        console.warn(`Model ${model} failed with ${error.status || 'unknown error'}. Switching...`);
        lastError = error;
      }
    }

    // If ALL models fail
    console.error("All free models failed.");
    return NextResponse.json(
      { error: "AI is currently busy. Please try again in a moment." },
      { status: 503 } // 503 = Service Unavailable
    );

  } catch (error) {
    console.error("Critical Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}