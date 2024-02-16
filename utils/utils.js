'use server';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
//-------------------------Communicate with the AI-----------------------------

/* Basic Set up  */

// This function generates a response based on a conversation array
// export const generateChatResponse = async (conversation) => {
//     try {
//         // Call OpenAI's chat API to generate a response
//         const response = await openai.chat.completions.create({
//             messages: conversation,
//             model: 'gpt-3.5-turbo',
//             temperature: 0
//         });

//         // Retrieve the generated message from the response
//         const generatedMessage = response.choices[0].message['content'];

//         // Return the generated response
//         return generatedMessage;
//     } catch (error) {
//         // Handle errors and return an error message
//         console.error('Error generating chat response:', error);
//         return 'An error occurred';
//     }
// };

/* More complex set up */
export const generateChatResponse = async (conversation) => {

    // Extract user's latest input
    const latestUserInput = conversation[conversation.length - 1]?.content || '';

    // Check if the latest user input is related to books
    const isBookRelatedQuestion = checkIfBookRelated(latestUserInput);

    try {
        // Only proceed with generating a response if it's a book-related question
        if (isBookRelatedQuestion) {
            // Make sure openai is properly initialized with your API key
            const response = await openai.chat.completions.create({
                messages: conversation,
                model: 'gpt-3.5-turbo',
                temperature: 0
            });

            // Check the correct property to retrieve the message
            const generatedMessage = response.choices[0].message['content'];

            return generatedMessage;
        } else {
            return 'I specialize in answering book-related questions. Please ask me about books! Using these key words: book, novel, author, reading, literature, manga, magazines';
        }
    } catch (error) {
        console.error('Error generating chat response:', error);
        return 'An error occurred';
    }
};
const checkIfBookRelated = (text) => {
    // List of keywords related to books
    const bookKeywords = ['book', 'novel', 'author', 'reading', 'literature', 'manga', 'magazines'];

    // Check if any of the keywords is present in the text
    return bookKeywords.some(keyword => text.toLowerCase().includes(keyword));
};

