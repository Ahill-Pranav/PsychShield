function renderRadar(normalized) {
    const ctx = document.getElementById("radar-chart");
    if (!ctx) return;

    new Chart(ctx.getContext("2d"), {
        type: "radar",
        data: {
            labels: ["Authority", "Urgency", "Scarcity", "Social Proof", "Reciprocity", "Liking"],
            datasets: [{
                label: "Your Vulnerability",
                data: [
                    normalized.authority || 0,
                    normalized.urgency || 0,
                    normalized.scarcity || 0,
                    normalized.social_proof || 0,
                    normalized.reciprocity || 0,
                    normalized.liking || 0
                ],
                backgroundColor: "rgba(220,38,38,0.15)",
                borderColor: "rgba(220,38,38,0.8)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(220,38,38,1)",
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0, max: 100,
                    ticks: { stepSize: 25, display: false },
                    pointLabels: { font: { size: 12, family: "Inter", weight: 600 }, color: '#111827' },
                    grid: { color: "#E5E7EB" },
                    angleLines: { color: "#E5E7EB" }
                }
            },
            plugins: { legend: { display: false } },
            animation: { duration: 1200, easing: "easeInOutQuart" }
        }
    });
}

window.renderRadar = renderRadar;
