import { GoogleGenerativeAI } from '@google/generative-ai';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("API-KEY");

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
// Specify the location of the worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';
let cleanedText;
// Function to clean up extracted text
function cleanText(text) {
    // Remove line breaks and extra spaces
    text = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    // Remove special characters
    text = text.replace(/[^\w\s]/gi, '');
    return text;
}
async function aiBot(text,jd){   
var input_prompt=`
Hey Act Like a skilled or very experience ATS(Application Tracking System)
with a deep understanding of tech field,software engineering,data science ,data analyst
and big data engineer. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide 
best assistance for improving thr resumes. Assign the percentage Matching based 
on Jd and the missing keywords with high accuracy
resume:`+text+`
description:`+jd+`

I want the response as string having the structure given below
JD Match : %,
MissingKeywords : [],
Profile Summary : 
`
    const result = await model.generateContent(input_prompt);
    const response = await result.response;
    const text1 = response.text();
    return text1;
}
// Function to extract text from PDF
async function extractTextFromPDF(file,jd) {
    var jd1=jd;
    var reader = new FileReader();
    reader.onload = async function(event) {
        var typedarray = new Uint8Array(event.target.result);
        
        // Load PDF file
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        const totalPages = pdf.numPages;
        var extractedText = '';

        // Iterate over all pages
        for (var pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            // Extract text content
            const textContent = await page.getTextContent();
            var textItems = textContent.items;
            for (var i = 0; i < textItems.length; i++) {
                extractedText += textItems[i].str + ' ';
            }
        }
        // Display extracted and cleaned text
        cleanedText = cleanText(extractedText);
        // Update UI with AI response
        const aiResponse = await aiBot(cleanedText,jd1);
        const resultContainer = document.getElementById('result');
    resultContainer.classList.remove('hidden');

    // Parse AI response
    const matchPercentage = aiResponse.match(/JD Match : (\d+)%/)[1];
    const missingKeywords = JSON.parse(aiResponse.match(/MissingKeywords : (\[.*?\])/)[1]);
    const profileSummary = aiResponse.match(/Profile Summary : (.*)/)[1];

    // Update HTML elements with AI response
    document.getElementById('match-percentage').textContent = `JD Match: ${matchPercentage}%`;
    document.getElementById('missing-keywords').textContent = `Missing Keywords: ${missingKeywords.join(', ')}`;
    document.getElementById('profile-summary').textContent = `Profile Summary: ${profileSummary}`;
    };
    reader.readAsArrayBuffer(file);
}

// Function to handle form submission
async function analyzeForm(evt) {
    evt.preventDefault();
    const jobDescription = document.getElementById('job-description').value.trim();
    const resume = document.getElementById('resume').files[0];

    if (jobDescription === '' || !resume) {
        alert('Please fill in all fields.');
        return false;
    }
    await extractTextFromPDF(resume,jobDescription);
    // Show selected file
    showSelectedFile(document.getElementById('resume'));

    // Prevent form submission
    return false;
}


// Function to display selected file name
function showSelectedFile(event) {
    const fileName = event.target.files[0].name;
    document.getElementById('file-path').textContent = `Selected file: ${fileName}`;
}

// Attach event listeners when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Attach submit event listener to the form
    document.getElementById('ats-form').addEventListener('submit', analyzeForm);

    // Attach change event listener to the file input
    document.getElementById('resume').addEventListener('change', showSelectedFile);
});