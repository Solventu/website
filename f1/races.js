const currentYear = new Date().getFullYear();
const seasonSelect = document.getElementById("seasonSelect");
const raceSelect = document.getElementById("raceSelect");
const raceResults = document.getElementById("raceResults");

let autoRefreshIntervalId = null;

// Populate year dropdown
for (let year = 1950; year <= currentYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year === currentYear) option.selected = true;
    seasonSelect.appendChild(option);
}

// Fetch races for a given year
async function fetchRaces(year) {
    raceSelect.innerHTML = "<option>Select Race</option>";
    raceResults.innerHTML = "";
    stopAutoRefresh();

    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`);
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        if (!races || races.length === 0) {
            raceSelect.innerHTML = "<option>No races found</option>";
            return;
        }

        races.forEach(race => {
            const option = document.createElement("option");
            option.value = race.round;
            option.textContent = `${race.raceName} - ${race.date}`;
            raceSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
        raceSelect.innerHTML = "<option>Error loading races</option>";
    }
}

// Fetch race results in table style
async function fetchRace(year, round) {
    raceResults.innerHTML = `<p>Loading results...</p>`;
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`);
        const data = await response.json();
        const results = data.MRData.RaceTable.Races[0]?.Results;

        if (!results || results.length === 0) {
            raceResults.innerHTML = "<p>No results available for this race.</p>";
            return;
        }

        // Build table
        const table = document.createElement("table");
        table.className = "w-full border-collapse rounded-2xl shadow-2xl overflow-hidden text-base md:text-lg";
        table.style.marginTop = "1rem";

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr class="bg-red-600 text-white">
                <th class="border px-4 py-3 font-bold">Position</th>
                <th class="border px-4 py-3 font-bold">Driver</th>
                <th class="border px-4 py-3 font-bold">Car</th>
                <th class="border px-4 py-3 font-bold">Gap</th>
                <th class="border px-4 py-3 font-bold">Qualifying</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        results.forEach((result, idx) => {
            const rowClass = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
            const driverName = `${result.Driver.givenName} ${result.Driver.familyName}`;
            const car = result.Constructor.name;
            const position = result.position;
            const gap = result.Time ? result.Time.time : result.status;
            const row = document.createElement("tr");
            row.className = `${rowClass} hover:bg-red-100 transition`;
            row.innerHTML = `
                <td class="border px-4 py-2 text-center font-bold">${position}</td>
                <td class="border px-4 py-2">${driverName}</td>
                <td class="border px-4 py-2">${car}</td>
                <td class="border px-4 py-2 text-center">${gap}</td>
                <td class="border px-4 py-2 text-center">
                    <button class="qual-btn bg-red-600 text-white px-3 py-1 rounded-full font-bold shadow hover:bg-red-700 transition">View</button>
                    <div id="qualifying-${result.Driver.driverId}" style="margin-top:0.3rem;"></div>
                </td>
            `;
            tbody.appendChild(row);

            // Qualifying button
            const qualBtn = row.querySelector(".qual-btn");
            qualBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                fetchQualifying(year, round, result.Driver.driverId);
            });
        });

        table.appendChild(tbody);
        raceResults.innerHTML = "";
        raceResults.appendChild(table);

    } catch (error) {
        raceResults.innerHTML = "<p>Error loading race results.</p>";
        console.error(error);
    }
}

// Fetch qualifying times
async function fetchQualifying(year, round, driverId) {
    const qualContainer = document.getElementById(`qualifying-${driverId}`);
    qualContainer.innerHTML = `<p>Loading qualifying times...</p>`;
    try {
        const response = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`);
        const data = await response.json();
        const races = data.MRData.RaceTable.Races;

        if (!races[0]?.QualifyingResults) {
            qualContainer.innerHTML = "No qualifying data available.";
            return;
        }

        const driverQual = races[0].QualifyingResults.find(q => q.Driver.driverId === driverId);
        if (driverQual) {
            qualContainer.innerHTML = `
                Q1: ${driverQual.Q1 || "N/A"}<br>
                Q2: ${driverQual.Q2 || "N/A"}<br>
                Q3: ${driverQual.Q3 || "N/A"}
            `;
        } else {
            qualContainer.innerHTML = "No qualifying data available for this driver.";
        }
    } catch (error) {
        qualContainer.innerHTML = `<p>Error loading qualifying times.</p>`;
        console.error(error);
    }
}

// Auto-refresh helpers
function startAutoRefresh(year, round) {
    if (autoRefreshIntervalId) clearInterval(autoRefreshIntervalId);
    autoRefreshIntervalId = setInterval(() => {
        fetchRace(year, round);
    }, 30000); // refresh every 30 seconds
}

function stopAutoRefresh() {
    if (autoRefreshIntervalId) {
        clearInterval(autoRefreshIntervalId);
        autoRefreshIntervalId = null;
    }
}

// Load current year by default
fetchRaces(currentYear);

// Event listeners
seasonSelect.addEventListener("change", (e) => {
    fetchRaces(e.target.value);
    stopAutoRefresh();
});

raceSelect.addEventListener("change", (e) => {
    const year = seasonSelect.value;
    const round = e.target.value;
    fetchRace(year, round);
    startAutoRefresh(year, round);
});

window.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (window.firebase && window.firebase.auth) {
        window.firebase.auth().signOut().then(() => {
          window.location.href = 'register.html';
        }).catch((error) => {
          alert('Logout failed: ' + error.message);
        });
      } else {
        window.location.href = 'register.html';
      }
    });
  }
});
