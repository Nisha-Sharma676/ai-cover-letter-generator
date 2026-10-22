# AI Cover Letter Generator

## Project Overview

A web application that generates professional cover letters using the candidate's name, job role, target company, and key skills. It uses the Google Gemini API to generate personalized cover letters based on the details provided by the user.

## Technologies Used

- **HTML:** Creates the input form and output section.
- **CSS:** Provides styling and responsive design.
- **JavaScript:** Handles form submission, API requests, loading states, and displaying results.
- **Node.js:** Runs the backend server.
- **Express.js:** Handles HTTP requests and serves the frontend files.
- **Google Gemini API:** Generates professional cover letters using AI.
- **Clipboard API:** Allows users to copy the generated cover letter.

## Prompt Template

Write a professional cover letter using only the details provided below.

Candidate Name: [Candidate Name]

Job Role: [Job Role]

Target Company: [Target Company]

Key Skills: [Key Skills]

Instructions:
- Start with "Dear Hiring Manager,"
- Write 2–3 concise, well-organized paragraphs.
- Explain the candidate's interest in the role and how the listed skills are relevant.
- Do not invent qualifications, experience, achievements, or personal information.
- Do not include contact details, addresses, headings, or placeholders.
- End with "Sincerely," followed by the candidate's name.
- Return only the cover letter, with blank lines between paragraphs.

## Current Implementation

The frontend collects the candidate's details and sends them to the Express backend through a POST request to `/generate`. The backend validates the input and sends a prompt to the Google Gemini API. The generated cover letter is returned to the frontend and displayed to the user. A Copy to Clipboard feature allows the user to copy the generated text.

The Gemini API key is stored in the `.env` file and accessed by the backend through environment variables.

## Testing

- Tested all form input fields.
- Tested form submission and input validation.
- Tested AI-generated cover letter output.
- Tested the Copy to Clipboard feature.
- Checked loading and success messages.
- Checked error handling for failed generation requests.
- Verified that the API key is not included in frontend JavaScript or committed to the repository.

## Security

The Gemini API key is stored in the local `.env` file. The `.env` file and `node_modules` directory are excluded from Git using `.gitignore`. Users must provide their own API key to run the project locally.
