# Resume ATS Analysis Tool

This project utilizes Google Generative AI (Gemini-pro model) to evaluate resumes against specific job descriptions. The tool assesses the match percentage, identifies missing keywords, and provides a profile summary to help optimize resumes for Applicant Tracking Systems (ATS). 

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** (v14 or higher)
- **Google Generative AI API key** (replace `API-KEY` in the code)
- **PDF.js Library** for extracting text from PDFs

## Setup and Installation

1. **Clone the repository**

2. **Install dependencies**:
   Install `pdfjs-dist` to use PDF.js:
   ```bash
   npm install pdfjs-dist
   ```

3. **Environment setup**:
   Set your Google Generative AI API key as an environment variable.

4. **Import Google Generative AI and PDF.js**:
   Ensure `pdf.worker.min.js` is loaded by including the following in your HTML file:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js"></script>
   ```

## Usage

1. **Load the HTML form**:
   - Open html file in your browser, which contains the form for job description input and file upload.

2. **Fill in details**:
   - Enter the job description and upload the resume PDF.
   - Click **Analyze Resume**.

3. **AI Response**:
   - After processing, the AI response will display:
     - **JD Match Percentage**: The resume match with the job description.
     - **Missing Keywords**: Key terms missing from the resume.
     - **Profile Summary**: Summary feedback on resume content.

### Example Input and Output

- **Input**:
  - **Job Description**: Text area for the job description.
  - **Resume**: PDF upload.

- **Output**:
  - **JD Match**: `%`
  - **Missing Keywords**: List of keywords
  - **Profile Summary**: AI-generated feedback

## Code Structure

- **HTML Elements**:
  - Form with fields for job description, file input, and submit button.
  - Display elements for match percentage, missing keywords, and profile summary.

- **JavaScript Functions**:
  - `extractTextFromPDF()`: Extracts text from a PDF and sends it to the AI model.
  - `aiBot()`: Sends prompt to the Google Generative AI and returns the structured AI response.
  - `analyzeForm()`: Handles form submission.
  - `showSelectedFile()`: Displays selected file name.

## Dependencies

- `pdfjs-dist`: For PDF extraction.
- Google Generative AI API: Provides the `Gemini-pro` model for content generation.
