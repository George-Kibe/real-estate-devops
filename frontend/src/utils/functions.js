import axios from 'axios'

export const callAIPrompt = async ({location, searchTerm}) => {
    console.log("Location: ", location, "Search Term: ", searchTerm)
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini', // Adjust the model if necessary
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: `List for me 10 different ${searchTerm} in ${location}. Include details such as phonenumber, address, email and website for any reference. Let it be in the form of standard json. The json keys should be title(will be its name), phone_numner, email, price, address, website. Should be diffenrent from the last`
            }
          ]
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });
        // Extract the response text
        const responseText = response.data.choices[0].message.content;

        // Find the part of the response that contains the JSON
        const jsonStart = responseText.indexOf('['); // Find the start of the JSON array
        const jsonEnd = responseText.lastIndexOf(']') + 1; // Find the end of the JSON array

        if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonString = responseText.slice(jsonStart, jsonEnd);
            // Extract the JSON part
            const parsedData = JSON.parse(jsonString); // Parse the JSON string
            return parsedData;
        } else {
            console.error('Could not find valid JSON in the response');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  }
