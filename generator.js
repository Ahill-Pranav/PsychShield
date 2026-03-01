let ATTACK_LIBRARY = null;

async function initGenerator() {
    try {
        const res = await fetch('data/attack-library.json');
        if (!res.ok) throw new Error("Could not fetch attacks");
        ATTACK_LIBRARY = await res.json();
    } catch (e) {
        console.error("Failed to load attack library", e);
    }
}
window.initGenerator = initGenerator;

function generateAttackSimulations(profile, userContext) {
    if (!ATTACK_LIBRARY || !ATTACK_LIBRARY.attacks) return [];

    const top2 = profile.ranked.slice(0, 2);
    const simulations = [];

    top2.forEach(({ trigger }) => {
        let scenarios = ATTACK_LIBRARY.attacks[trigger] || [];
        if (scenarios.length === 0) return;

        // Pick scenario randomly
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        // Personalize with user context
        const personalized = {
            ...scenario,
            message: scenario.template
                .replace(/{name}/g, userContext.name || "Student")
                .replace(/{college}/g, userContext.college || "your college")
                .replace(/{dept}/g, userContext.dept || "your department"),
        };

        simulations.push(personalized);
    });

    // Always add one from a different trigger for breadth if score > 30
    const tertiary = profile.ranked[2];
    if (tertiary && tertiary.score > 30) {
        let scenarios = ATTACK_LIBRARY.attacks[tertiary.trigger] || [];
        if (scenarios.length > 0) {
            const extra = scenarios[0];
            simulations.push({
                ...extra,
                message: extra.template
                    .replace(/{name}/g, userContext.name || "Student")
                    .replace(/{college}/g, userContext.college || "your college")
                    .replace(/{dept}/g, userContext.dept || "your department")
            });
        }
    }

    return simulations;
}
window.generateAttackSimulations = generateAttackSimulations;

async function enhanceWithAI(baseMessage, userContext) {
    try {
        const { pipeline } = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js");
        const generator = await pipeline("text2text-generation", "Xenova/flan-t5-small");

        const prompt = `Rewrite this scam message to sound more realistic. Make it feel personal and urgent. Keep it under 100 words. Original: ${baseMessage}`;

        const result = await generator(prompt, { max_length: 150 });
        return result[0].generated_text || baseMessage;
    } catch (e) {
        console.error("Transformers AI setup failed or blocked:", e);
        return baseMessage; // always fall back gracefully
    }
}
window.enhanceWithAI = enhanceWithAI;
