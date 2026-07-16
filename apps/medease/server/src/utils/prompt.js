import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0,
    maxRetries: 2,
});

const result = {
    "Summary": "The patient has been diagnosed with Malaria. The expected recovery time is not specified. Follow-up is scheduled for 04-09-2023. The patient has been prescribed TAB. ABCIXIMAB, 1 tablet at night for 8 days. The total dosage is 8 tablets. The patient has also been prescribed TAB. VOMILAST, 1 tablet for 8 days. The total dosage is 16 tablets. The patient has been advised to take bed rest, not eat outside food, and eat easy to digest food like boiled rice with daal. The prescribing doctor is Dr. Akshara Za from SMS hospital.",
    "Disease": "Malaria",
    "Diagnosis": "Malaria",
    "Recovery": {
        "ExpectedTime": "Not specified",
        "Progress": "Follow-up scheduled for 04-09-2023"
    },
    "Tests": [],
    "Medications": [
        {
            "Name": "TAB. ABCIXIMAB",
            "Dosage": "1 tablet",
            "Frequency": {
                "Morning": 0,
                "Afternoon": 0,
                "Night": 1
            },
            "Duration": "8 Days",
            "TotalDosage": "8 tablets"
        },
        {
            "Name": "TAB. VOMILAST",
            "Dosage": "1 tablet",
            "Frequency": {
                "Morning": 1,
                "Afternoon": 0,
                "Night": 1
            },
            "Duration": "8 Days",
            "TotalDosage": "16 tablets"
        },
    ],
    "Doctor and Clinic": {
        "Doctor": "Dr. Akshara Za",
        "Clinic": "SMS hospital"
    },
    "Advice": [
        "TAKE BED REST",
        "DO NOT EAT OUTSIDE FOOD",
        "EAT EASY TO DIGEST FOOD LIKE BOILED RICE WITH DAAL"
    ],
    "Follow-up": "04-09-2023"
}

export async function generateDynamicPrompt(text) {
    const prescriptionPromptTemplate = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a medical assistant. Please generate a concise, structured summary based on the prescription details provided.Focus on the following:Disease: The condition being treated.Diagnosis: Key details about the diagnosis.Recovery: Expected recovery time and progress.Tests: Any tests required or prescribed.Medications:List each medication with its name, dosage per meal (assigned based on total dosage), frequency, and duration.For dosage, format as follows:If the total dosage is 3 times per day: breakfast, lunch, and dinner.If the total dosage is 2 times per day: breakfast and dinner.If the total dosage is 1 time per day: assign according to prescription details.Any special instructions should be included.Doctor and Clinic: Name of the prescribing doctor and the clinic.Advice: Any important advice or instructions from the doctor.Follow-up: Provide the follow-up date or next steps for the patient.provide a structured summary based on the prescription details provided and in json format as specified in the given example ${result}.`
        ],
        ["human", "{text}"]
    ]);

    const chain = prescriptionPromptTemplate.pipe(llm);
    const response = await chain.invoke({ text });
    let responseText = response.content;
    responseText = responseText.replace(/```json|```/g, '').trim();

    const parsedData = JSON.parse(responseText);

    return parsedData;
}

export async function generateSummary(text) {
    const summary = ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a medical assistant. Please generate a concise, summary based on the prescription details provided.provide a response in string format only.`
        ],
        ["human", "{text}"]
    ]);
    const chain = summary.pipe(llm);
    const response = await chain.invoke({ text });
    let responseText = response.content;
    const parsedData = responseText.trim();
    return parsedData;
}