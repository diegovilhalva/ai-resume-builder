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

export async function generateWorkExperience(
    input: GenerateWorkExperienceInput,
): Promise<WorkExperience> {
    const { description } = generateWorkExperienceSchema.parse(input);

    const prompt = `
    You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
    Your response must adhere to the following structure:

    Job title: <job title>
    Company: <company name>
    Start date: <format: YYYY-MM-DD> (optional)
    End date: <format: YYYY-MM-DD> (optional)
    Description: <an optimized description in bullet format>

    Please provide a work experience entry from this description:
    ${description}
  `;

    try {
        const response = await model.generateContent([prompt]);

        const aiResponse = response.response?.text()

        if (!aiResponse) {
            throw new Error("AI response is empty.");
        }

        const parsedResponse = parseWorkExperience(aiResponse);

        return parsedResponse;
    } catch (error) {
        console.error("Error generating work experience:", error);
        throw error;
    }
}

function parseWorkExperience(text: string): WorkExperience {
    const match = text.match(
      /Job title: (.*)\nCompany: (.*)\nStart date: (\d{4}-\d{2}-\d{2})?\nEnd date: (\d{4}-\d{2}-\d{2})?\nDescription: ([\s\S]*)/
    );
  
    if (!match) {
      throw new Error("Failed to parse AI response");
    }
  
    const [, position, company, startDate, endDate, description] = match;
  
    return {
      position: position?.trim() || undefined,
      company: company?.trim() || undefined,
      startDate: startDate?.trim() || undefined,
      endDate: endDate?.trim() || undefined,
      description: description?.trim() || undefined,
    };
  }
  
  
