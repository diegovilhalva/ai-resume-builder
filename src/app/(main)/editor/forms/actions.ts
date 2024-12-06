"use server";

import model from "@/lib/gemini";
import {
    GenerateSummaryInput,
    generateSummarySchema,
    GenerateWorkExperienceInput,
    generateWorkExperienceSchema,
    WorkExperience,
} from "@/lib/validation";


export async function generateSummary(input: GenerateSummaryInput) {
    // TODO: Block for non-premium users

    const { jobTitle, workExperiences, educations, skills } = generateSummarySchema.parse(input);

    const prompt = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.

    Here is the data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
            ?.map(
                (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
            )
            .join("\n\n")}

    Education:
    ${educations
            ?.map(
                (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
            )
            .join("\n\n")}

    Skills:
    ${skills || "N/A"}
  `;

    console.log("Prompt sent to Gemini:", prompt);

    try {
        const response = await model.generateContent([prompt]);

        const aiResponse = response.response?.text()

        if (!aiResponse) {
            throw new Error("Failed to generate AI response");
        }

        console.log("Generated Summary:", aiResponse);

        return aiResponse
    } catch (error) {
        console.error("Error generating resume summary:", error);
        throw error;
    }
}
function parseWorkExperience(text: string): WorkExperience {
    const match = text.match(
        /Job title:\s*(.*?)\s*Company:\s*(.*?)\s*Start date:\s*(.*?)?\s*End date:\s*(.*?)?\s*Description:\s*([\s\S]*)/i
    );


    if (!match) {
        console.error("Failed to parse AI response:", text);
        throw new Error("Failed to parse AI response");
    }

    const [, position, company, startDate, endDate, description] = match;

    const descriptionLines = description.split("\n").map(line => line.trim()).filter(line => line);
    return {
        position: position?.trim() || undefined,
        company: company?.trim() || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        description: descriptionLines.join("\n"),
    };

}


export async function generateWorkExperience(
    input: GenerateWorkExperienceInput,
): Promise<WorkExperience> {
    const { description } = generateWorkExperienceSchema.parse(input);

    const prompt = `
        You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
        Your response **must strictly adhere** to the following structure. Ensure no additional text or variations:

        Job title: <job title>
        Company: <company name>
        Start date: <format: YYYY-MM-DD> (optional, use "N/A" if not provided)
        End date: <format: YYYY-MM-DD> (optional, use "Present" if ongoing)
        Description:
        - <description in bullet format>
        - <continue bullet points as necessary>

    Please provide a work experience entry from this description:
    ${description}
  `;
    console.log("Prompt:", prompt);

    try {
        const response = await model.generateContent([prompt]);

        const aiResponse = response.response?.text()

        if (!aiResponse) {
            throw new Error("AI response is empty.");
        }
        console.log("AI Response:", aiResponse);


        const parsedResponse = parseWorkExperience(aiResponse);

        return parsedResponse;
    } catch (error) {
        console.error("Error generating work experience:", error);
        throw error;
    }
}




