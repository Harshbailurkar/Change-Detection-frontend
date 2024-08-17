import { GoogleGenerativeAI } from "@google/generative-ai";
import { Buffer } from "buffer";  // Ensure you have buffer library available in your project

const genAI = new GoogleGenerativeAI('AIzaSyCmGpKvVhXAOS8Uyl7Q5V9TxL88coZT1Mo');

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Choose your model here
});

// Convert file to base64 data
const fileToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fetch(filePath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        resolve(base64);
      })
      .catch(error => reject(error));
  });
};

export const generateReport = async (imagePath, prompt) => {
  try {
    const imageData = await fileToBase64(imagePath);
    
    // Prepare the file part for API call
    const filePart = {
      inlineData: {
        data: imageData,
        mimeType: "image/png", // Adjust MIME type as needed
      },
    };

    // Generate content based on image and prompt
    const result = await model.generateContent([filePart, { text: prompt }]);

    // Handle the response (text-based content)
    const text = await result.response.text();
    console.log(text);

    // Display the report or handle as needed
    // For example, you could display it in a new tab
    window.open(URL.createObjectURL(new Blob([text], { type: 'text/plain' })), '_blank');
  } catch (error) {
    console.error('Error generating report:', error);
  }
};
