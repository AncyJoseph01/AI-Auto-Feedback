# 🧠 Automated AI Feedback Generator

## Technologies: Python, LLaMA 3.1, Hugging Face Inference API, FastAPI, React

I developed an end-to-end AI-powered system that automatically generates and embeds personalized feedback into student submissions. The tool extracts question-answer pairs from documents and uses the LLaMA 3.1 large language model to produce concise, professional feedback comments for each response. This feedback is inserted directly as in-line comments within the Word file, eliminating the need for tutors to manually review each answer.

The backend was built with FastAPI, handling model prompts, logic, and token management. I integrated Hugging Face’s Inference API for scalable access to LLaMA, crafting context-aware prompts to maintain a supportive and consistent tone across all feedback. I also implemented logic to generate an overall feedback summary at the top of each document.

While the frontend was kept minimal (React), the project’s core complexity lay in automating LLM pipelines, document structure parsing, and building reusable prompt frameworks, reflecting my focus and ambition to grow as an AI Engineer.
