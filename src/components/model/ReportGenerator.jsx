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

export const generateReport = async (imagePath1, prompt1, imagePath2, prompt2) => {
  try {
    // Convert both images to base64
    const imageData1 = await fileToBase64(imagePath1);
    const imageData2 = await fileToBase64(imagePath2);
    
    // Prepare the file parts for API calls
    const filePart1 = {
      inlineData: {
        data: imageData1,
        mimeType: "image/png", // Adjust MIME type as needed
      },
    };
    
    const filePart2 = {
      inlineData: {
        data: imageData2,
        mimeType: "image/png", // Adjust MIME type as needed
      },
    };

    // Generate content for the first image and prompt (ignoring response)
    await model.generateContent([filePart1, { text: prompt1 }]);

    // Generate content for the second image and prompt
    const result = await model.generateContent([filePart2, { text: prompt2 }]);

    // Return the text of the second response
    const text = await result.response.text();
    return text;

  } catch (error) {
    console.error('Error generating report:', error);
    return null; // Return null in case of error
  }
};
