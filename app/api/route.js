import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// ERROR FIX: The DATA_RESUME constant was missing.
// I've added it back here.
const DATA_RESUME = `
Here is a corrected, elaborated, and more polished version of your profile.

I've focused on using stronger action verbs, clarifying the impact of your projects and leadership roles, and reorganizing your skills into clearer, industry-standard categories.

Om Sathe
Rihe, Mulashi, Pune, Maharashtra 412115 +91 8767657297 | omsathe0777@gmail.com | GitHub: OMx0777

Objective & Summary
Objective Seeking a challenging entry-level developer role where I can apply my advanced skills in Python, AI/ML, and problem-solving to build impactful solutions and contribute to a high-performing team.

Professional Summary A results-oriented and passionate Python Developer with a talent for translating complex problems into elegant, efficient code. Possesses a strong technical foundation in Artificial Intelligence, Machine Learning, and Web Development, amplified by proven leadership experience in managing large teams and executing strategic initiatives. Eager to secure an IT role that values high performance, innovation, and strategic direction.

Education
Indira College of Commerce and Science, Pune

Degree: Bachelor of Science in Computer Science

Expected Graduation: 2025

Grade: A+ (SGPA: 8.64/10.0)

Technical Skills
Programming Languages: Python (Advanced), C, C++, Java

AI & Machine Learning: Generative AI, Model Training & Evaluation, Computer Vision, NLP, TensorFlow, PyTorch, NumPy, Pandas

Web & Database: HTML, CSS, JavaScript, PHP, Flask, SQL, PostgreSQL

Tools & Platforms: Git, GitHub, AI Development Tools, Cloud Platforms

Python Developer Internship at Alfido IT services: I served as 
 key contributor, gaining essential practical experience in 
 core platform management and modernization. My primary responsibilities 
 included managing and updating the company's websites and applications,
  ensuring all digital content and functionality were current and met
   operational standards. I took a proactive role in implementing recent
    technologies, which involved researching, testing, and deploying modern
     solutions to enhance overall platform performance and user experience. 
     Crucially, I maintained a strict focus on code stability by executing
      rigorous debugging protocols and ensuring the creation and maintenance of comprehensive
       code documentation for all new features and updates,
 contributing directly to long-term project maintainability.

Project Portfolio
Credit Card Fraud Detector (ML) Engineered a high-accuracy machine learning model to detect and flag fraudulent credit card transactions. Leveraged advanced algorithms and data preprocessing techniques to achieve 90-95% accuracy, significantly enhancing financial security.

Farmer Suicide Predictor (ML / Predictive Analytics) Designed and trained a predictive model to analyze complex socioeconomic, agricultural, and climate data. The model identifies key risk factors contributing to farmer distress, providing a potential tool for proactive policy-making and early intervention.

Pothole Detector (Computer Vision) Built a real-time computer vision solution to automatically detect and localize potholes from image and video data. This project has direct applications in public safety, smart city development, and infrastructure maintenance.

Real-Time Emotion Detector (Computer Vision / ML) Developed an application using deep learning to analyze facial expressions from a live video feed. The system accurately categorizes and tracks human emotions in real-time, with potential uses in user experience (UX) research and interactive applications.

Offline Coding Tools (Generative AI) Developed a suite of offline-first development and coding utility tools by locally integrating the DeepSeek model. This enhances developer productivity by enabling AI-powered coding assistance without requiring an internet connection.

Unemployment Predictor (ML / Predictive Analytics) Constructed a predictive analytics model to forecast unemployment trends. The project involved time-series analysis of historical economic, demographic, and policy data to provide actionable insights for economists and policymakers.

AI Voice Assistant (Python / NLP) Engineered a conversational AI assistant from scratch using Python. The project integrates Natural Language Processing (NLP) with speech recognition and text-to-speech (TTS) libraries to create a functional, voice-controlled user interface.

URL Shortener Service (Python / Flask / SQL) Designed, developed, and deployed a robust, high-availability URL shortening service. Built with a Python/Flask backend and an SQL database, the application efficiently manages, shortens, and resolves custom links.

Experience & Leadership
Rotaract Club of Indira College | Pune

Vice President (July 2025 to Present)

Direct and execute strategic operations for a 96-member service organization, providing oversight for four primary committees.

Lead and mentor a diverse team, aligning club activities with long-term service and professional development goals.

Board of Director & Team Leader (Previous Role)

Served as a key member of the Board of Directors, contributing to club governance and strategic planning.

Successfully led a team of 90+ members in organizing and executing large-scale charity and community service events.

Key Achievement: Played an integral role in generating over ₹1 Lakh (100,000+) in funding for charitable causes and club operations.

Narendra Wrestling Club | Pune

Assistant Coach (2021 – 2023)

Co-developed training programs and mentored athletes, focusing on technique, discipline, and sportsmanship.

Additional Leadership Roles

Class Representative (3 Years)

Wrestling Coach (2 Years)

Modeling Team Coordinator (2 Years)

Achievements & Certifications
Awards & Achievements

Best Board of Director Award (Rotaract Club)

Gold Medal: Pune District Wrestling

Silver Medal: District Level Chess

Competitive Athlete: State-level Professional Wrestler & District-level Chess Player

Certifications

IBM: Developing AI Applications using Python and Flask (Grade: 83%)

Edureka: Web Development Full Course

Be10x: AI Tools Workshop

TTUA: Cyber Security
`;

export async function POST(req) {

  // Read the new, clear variables
  const baseURL = process.env.OPENROUTER_BASE_URL;
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL;

  // Validate the new variables
  if (!baseURL || !apiKey || !model) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_BASE_URL, OPENROUTER_API_KEY, or OPENROUTER_MODEL environment variables." },
      { status: 500 }
    );
  }

  // Initialize the client for OpenRouter
  const client = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
  });

  try {
    const { messages } = await req.json();

    messages.unshift({
      role: 'system',
      content: `You are Omi, answering only questions based on the resume provided.
Resume:
${DATA_RESUME}

Help users learn more about Om from his resume.`
    });

    const response = await client.chat.completions.create({
      model: model, // This will use 'deepseek/deepseek-chat' from your .env
      messages: messages,
      max_tokens: 128,
    });

    return NextResponse.json({
      message: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred." },
      { status: 500 }
    );
  }
}