import { WORK_RATE_PER_HOUR } from '@/constants';
import axios from 'axios'
import moment from 'moment';

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const callAIPrompt = async (location, searchTerm) => {
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

export const generateAISummary = async (text) => {
  console.log("Text: ", text)
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
          content: `Rephrase and correct all grammar errors in this text: ${text}. Write it better and make it look like human`
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const responseText = response.data.choices[0].message.content;
    return responseText;
  } catch (error) {
    console.error('Error:', error);
  }
}

export const getTimeDiffInHrs = (start_time, end_time) => {
  const start = moment(start_time, "HH:mm:ss");
  const end = moment(end_time, "HH:mm:ss");
  const duration = moment.duration(end.diff(start));
  const hours = duration.asHours();
  return hours.toFixed(2);
}

export const generateReportBilling = async(report) => {
  const worked_hours = getTimeDiffInHrs(report.start_time, report.end_time)
  const body = {
    service_date_start: moment(report.created_at).format("YYYY-MM-DD"),
    service_date_end: moment(report.updated_at).format("YYYY-MM-DD"),
    client_name: report.client_name,
    client_id: report.client_id,
    housing_coordinator_name: report.staff_name || "Not Captured",
    housing_coordinator_id: report.staff_id,
    claim_amount: (worked_hours * WORK_RATE_PER_HOUR).toFixed(2),
    bill_status: "Scheduled",
    scheduled_hours: 23.5,
    worked_hours,
    billed_hours: 30,
    log_status: "Not Confirmed",
    pro_code: "H2015",
    modifier: "U8",
    payor: "MA"
  }
  console.log("Body: ", body)
  try {
    const reponse = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/billings/`, body)
    if (reponse.status === 201) {
      // update report status to billed
      const data = {isBilled: true}
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/reports/${report.pkid}/`, data)
      return reponse.data
    }
  } catch (error) {
    console.log(error.message)
    return null
  }
}