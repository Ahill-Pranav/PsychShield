const TRIGGERS = ["authority","urgency","scarcity","social_proof","reciprocity","liking"];

function calculateProfile(answers) {
  // answers = [{ trigger: "urgency", weight: 3 }, ...]
  const raw = Object.fromEntries(TRIGGERS.map(t => [t, 0]));

  answers.forEach(a => {
    if (a.trigger !== "none" && raw[a.trigger] !== undefined) {
      raw[a.trigger] += a.weight;
    }
  });

  // Normalize to 0-100
  // Each trigger appears as a primary (weight 3) at least once or twice, and secondary (weight 2)
  // Let's set a logical max for normalizing. In our dataset, a trigger can get max ~6 points if answered consistently.
  // Actually, to make the graph look good, we normalize around 6 points = 100%
  const maxPossible = 6; 
  const normalized = {};
  TRIGGERS.forEach(t => {
    let score = Math.round((raw[t] / maxPossible) * 100);
    normalized[t] = Math.min(100, Math.max(0, score));
  });

  // Sort by vulnerability — highest first
  const ranked = TRIGGERS
    .map(t => ({ trigger: t, score: normalized[t] }))
    .sort((a, b) => b.score - a.score);

  // Overall Resilience is inverse of top 2 vulnerabilities
  const top2Avg = Math.round(ranked.slice(0,2).reduce((s, r) => s + r.score, 0) / 2);
  const overallResilience = 100 - top2Avg;

  return { normalized, ranked, overallResilience };
}

window.calculateProfile = calculateProfile;
