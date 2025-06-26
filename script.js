let scenario = {
    question: "",
    choices: []
};

const toneKeywords = {
    positive: ["gain", "succeed", "improve", "win", "opportunity", "grow", "reward", "build", "learn", "achieve","happy"],
    negative: ["fail", "lose", "miss", "regret", "waste", "decline", "setback", "struggle","sad","not enough","stressed"],
    risky: ["might", "maybe", "chance", "gamble", "uncertain", "try", "bold", "could", "risk"],
};

function detectTone(text) {
    const lowerText = text.toLowerCase();
    for (const word of toneKeywords.negative) {
        if (lowerText.includes(word)) return "tone-negative";
    }
    for (const word of toneKeywords.risky) {
        if (lowerText.includes(word)) return "tone-risky";
    }
    for (const word of toneKeywords.positive) {
        if (lowerText.includes(word)) return "tone-positive";
    }
    return "tone-neutral";
}

function startscenario() {
    const mainQuestion = document.getElementById('main-question').value;
    const scenarioBuilder = document.getElementById('scenario-builder');
    const scenarioTitle = document.getElementById('scenario-title');

    if (mainQuestion.trim() !== "") {
        scenarioTitle.textContent = mainQuestion;
        scenarioBuilder.classList.remove('hidden');
        scenario.question = mainQuestion;  // Optional: store in scenario object
    } else {
        alert("Please enter a 'What if' question.");
    }
}

// Make sure this function name matches your HTML onclick="addchoice()"
function addchoice() {
    const choice = document.getElementById("choice-input").value.trim();
    const outcome = document.getElementById("outcome-input").value.trim();

    if (!choice || !outcome) {
        return alert("Please enter both choice and outcome");
    }

    const tone = detectTone(outcome);
    scenario.choices.push({ choice, outcome, tone });
    renderTree();

    document.getElementById("choice-input").value = "";
    document.getElementById("outcome-input").value = "";
}

function renderTree() {
    const ul = document.getElementById("scenario-tree");
    ul.innerHTML = "";

    scenario.choices.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = item.tone;

        const emoji = {
            "tone-negative": "😔",
            "tone-risky": "🤔",
            "tone-positive": "😊",
            "tone-neutral": "⚖️"
        }[item.tone];

        li.innerHTML = `${emoji} ${item.choice} → ${item.outcome}`;
        ul.appendChild(li);
    });
}

function saveScenario() {
    localStorage.setItem("choice_canvas_scenario", JSON.stringify(scenario));
    alert("Scenario saved to local storage!");
}
