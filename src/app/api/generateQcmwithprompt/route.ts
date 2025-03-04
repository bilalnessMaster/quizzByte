import { Client } from "@/lib/openai";
import { NextResponse } from "next/server";
 // Assure-toi d'importer correctement ton client OpenAI

 const cleanJsonResponse = (response: string) => {
    // Remove Markdown code block syntax (e.g., ```json)
    return response.replace(/```json/g, '').replace(/```/g, '').trim();
};
export async function POST(req : Request) {
  try {
    const { topic } = await req.json();

    if (!topic) {
      return NextResponse.json({ success: false, message: "Le sujet est requis." }, { status: 400 });
    }

    const prompt = `
    Je suis un enseignant et je souhaite obtenir des QCM sur le sujet suivant :
    Sujet : ${topic}

    Instructions :
    1. Retourne uniquement le tableau d'objets QCM au format JSON.
    2. N'inclus aucun texte ou explication supplémentaire.
    3. Assure-toi que le tableau suit la même structure que l'objet fourni.
    4. Mélange l'ordre des réponses dans chaque question.
    5. Le champ "type" peut être soit "radio" (une seule bonne réponse) soit "checkbox" (plusieurs bonnes réponses).

    Format de sortie attendu :
    [
      {
        "type": "",
        "question": "Texte de la question ici",
        "answers": [
          { "answer": "Option 1", "right": true },
          { "answer": "Option 2", "right": false },
          { "answer": "Option 3", "right": false },
          { "answer": "Option 4", "right": false }
        ],
        "category": "Catégorie ici",
        "language": "Langue ici",
        "level": "Niveau de difficulté ici",
        "tags": ["tag1", "tag2"]
      }
    ]
  `;

    const completion = await Client.chat.completions.create({
      model: "o1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const qcms = cleanJsonResponse(completion?.choices[0]?.message?.content);

    return NextResponse.json({ status: 200, qcms: JSON.parse(qcms) });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la génération du QCM :", error);
    if (error.response?.status === 429) {
      return NextResponse.json(
        { success: false, message: "Limite de requêtes dépassée. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    return NextResponse.json({ success: false, message: "Erreur interne du serveur." }, { status: 500 });
  }
}
