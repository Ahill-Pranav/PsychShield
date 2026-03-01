// generator.js
let ATTACK_LIBRARY = {};

async function initGenerator() {
    const res = await fetch('data/attack-library.json');
    ATTACK_LIBRARY = await res.json();
}

function generateAttackSimulations(profile, userContext) {
    const top2 = profile.ranked.slice(0, 2);
    const simulations = [];

    top2.forEach(({ trigger }) => {
        const scenarios = ATTACK_LIBRARY.attacks[trigger];
        if (scenarios && scenarios.length > 0) {
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            const personalized = {
                ...scenario,
                message: scenario.template
                    .replace(/{name}/g, userContext.name || "Student")
                    .replace(/{college}/g, userContext.college || "your college")
                    .replace(/{dept}/g, userContext.dept || "your department"),
            };
            simulations.push(personalized);
        }
    });

    const tertiary = profile.ranked[2];
    if (tertiary && ATTACK_LIBRARY.attacks[tertiary.trigger]) {
        const extra = ATTACK_LIBRARY.attacks[tertiary.trigger][0];
        simulations.push({
            ...extra,
            message: extra.template
                .replace(/{name}/g, userContext.name || "Student")
                .replace(/{college}/g, userContext.college || "your college")
                .replace(/{dept}/g, userContext.dept || "your department")
        });
    }

    return simulations;
}

async function enhanceWithAI(baseMessage, userContext) {
    try {
        const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js");
        env.allowLocalModels = false;

        // Using flan-t5-small as per original request
        const generator = await pipeline("text2text-generation", "Xenova/flan-t5-small");

        const prompt = `Rewrite this scam message to sound more realistic. Make it feel personal and urgent. Keep it under 100 words. Original: ${baseMessage}`;

        const result = await generator(prompt, { max_new_tokens: 150 });
        return result[0].generated_text || baseMessage;
    } catch (e) {
        console.warn("AI enhancement failed, falling back to template:", e);
        return baseMessage; // always fall back gracefully
    }
}

window.initGenerator = initGenerator;
window.generateAttackSimulations = generateAttackSimulations;
window.enhanceWithAI = enhanceWithAI;
