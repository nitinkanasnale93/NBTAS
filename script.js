// ================= MAP LOCATIONS =================
const MAP_LOCATIONS = {
    "MG Road": "https://www.google.com/maps?q=MG+Road+Bangalore&output=embed",
    "Brigade Road": "https://www.google.com/maps?q=Brigade+Road+Bangalore&output=embed",
    "Koramangala": "https://www.google.com/maps?q=Koramangala+Bangalore&output=embed",
    "Indiranagar": "https://www.google.com/maps?q=Indiranagar+Bangalore&output=embed",
    "Whitefield": "https://www.google.com/maps?q=Whitefield+Bangalore&output=embed"
};

// ================= MAP UPDATE FUNCTION =================
function updateMap(location, mapFrame) {
    if (MAP_LOCATIONS[location]) {
        mapFrame.src = MAP_LOCATIONS[location];
    }
}

// ================= BUTTON CLICK EVENT =================
document.getElementById("checkStatusBtn").addEventListener("click", function () {

    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;

    const trafficStatus = document.getElementById("trafficStatus");
    const trafficResult = document.getElementById("trafficResult");
    const suggestion = document.getElementById("suggestion");
    const mapFrame = document.getElementById("mapFrame");

    // ---------- Validation ----------
    if (location === "" || time === "") {
        trafficStatus.textContent = "";
        trafficResult.textContent = "Please select both location and time.";
        suggestion.textContent = "";
        trafficStatus.classList.remove("heavy", "moderate", "free");
        return;
    }

    let status = "";
    let reason = "";
    let advice = "";

    // ---------- Traffic Logic ----------
    if (
        (time === "Morning" || time === "Evening") &&
        (location === "MG Road" || location === "Brigade Road" || location === "Whitefield")
    ) {
        status = "Heavy Traffic";
        reason = "Peak hour rush and high vehicle density.";
        advice = "Avoid travel now. Prefer Metro or try after some time.";
    }
    else if (time === "Afternoon") {
        status = "Moderate Traffic";
        reason = "Normal traffic movement with occasional congestion.";
        advice = "You can travel, but expect minor delays.";
    }
    else {
        status = "Free Flow";
        reason = "Low traffic volume at this time.";
        advice = "Good time to travel.";
    }

    // ---------- Update UI ----------
    trafficStatus.textContent = status;
    trafficResult.textContent = reason;
    suggestion.textContent = advice;

    // ---------- Color Logic ----------
    trafficStatus.classList.remove("heavy", "moderate", "free");

    if (status === "Heavy Traffic") {
        trafficStatus.classList.add("heavy");
    }
    else if (status === "Moderate Traffic") {
        trafficStatus.classList.add("moderate");
    }
    else {
        trafficStatus.classList.add("free");
    }

    // ---------- Update Map (CORRECT WAY) ----------
    updateMap(location, mapFrame);

});

// 1. Data Object: Specific tips for different scenarios
const trafficData = {
    "MG Road": {
        "Morning": ["Heavy pedestrian crossing near Metro.", "Parking is scarce, use public transport."],
        "Evening": ["High congestion due to shoppers.", "Expect 20+ mins delay at Brigade Road junction."]
    },
    "Whitefield": {
        "Morning": ["Severe IT corridor rush.", "Check for roadwork near Hope Farm."],
        "Evening": ["Heavy outflow towards KR Puram.", "Consider staying back until 8 PM to avoid peak."]
    },
    "General": [
        "Use Namma Metro to save at least 30 minutes.",
        "Keep an umbrella ready; Bangalore weather is unpredictable.",
        "Check Google Maps for sudden road diversions."
    ]
};

// 2. Function to update tips
function updateTips(location, time) {
    const tipsContainer = document.getElementById("travelTips");
    tipsContainer.innerHTML = ""; // Clear old tips

    // Determine which tips to show
    let specificTips = [];
    if (trafficData[location] && trafficData[location][time]) {
        specificTips = trafficData[location][time];
    } else {
        specificTips = trafficData["General"]; // Fallback tips
    }

    // Add tips to the UI
    specificTips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsContainer.appendChild(li);
    });
}

// 3. Event Listener for the button
document.getElementById("checkStatusBtn").addEventListener("click", () => {
    const location = document.getElementById("location").value;
    const time = document.getElementById("time").value;

    if (!location || !time) {
        alert("Please select both location and time!");
        return;
    }

    // Update the Tips Card
    updateTips(location, time);

    // Update the Status Card (Visual Feedback)
    const resultText = document.getElementById("trafficResult");
    resultText.innerHTML = `Showing traffic for <b>${location}</b> during <b>${time}</b>.`;
});

// Load general tips by default on page load
window.onload = () => updateTips("General");