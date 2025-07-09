// services/cvService.js
import axios from "axios";

export async function generateCV(formData) {
    const API_URL = import.meta.env.VITE_API_URL;
    try {
        const res = await axios.post(`${API_URL}/api/cv/generate`, formData, {
            withCredentials: true,
        });
        return res.data.html;
    } catch (err) {
        console.error("CV generation error:", err);
        throw err;
    }
}
export const regenerateSection = async (section, originalHtml, instruction) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await axios.post(
        `${API_URL}/api/cv/regenerate`,
        { section, cv: originalHtml, instruction },
        { withCredentials: true }
    );
    return res.data.html;
};