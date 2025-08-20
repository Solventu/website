const currentYear = new Date().getFullYear();
const seasonSelect = document.getElementById("seasonSelect");
const championshipResults = document.getElementById("championshipResults");

// Populate year dropdown
for (let year = 1950; year <= currentYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year === currentYear) option.selected = true;
    seasonSelect.appendChild(option);
}

// Fetch full championship standings for a given year
async function fetchChampionship(year) {
    championshipResults.innerHTML = `<p>Loading championship...</p>`;
    try {
        const url = `https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`;
        const response = await fetch(url);
        const data = await response.json();

        const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;

        if (!standings || standings.length === 0) {
            championshipResults.innerHTML = "<p>No data available for this season.</p>";
            return;
        }

        // Build the table
        const table = document.createElement("table");
        table.className = "w-full border-collapse rounded-2xl shadow-2xl overflow-hidden text-base md:text-lg";

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr class="bg-red-600 text-white">
                <th class="border px-4 py-3 font-bold">Position</th>
                <th class="border px-4 py-3 font-bold">Driver</th>
                <th class="border px-4 py-3 font-bold">Team</th>
                <th class="border px-4 py-3 font-bold">Points</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        standings.forEach((driver, idx) => {
            const rowClass = idx % 2 === 0 ? "bg-white" : "bg-gray-50";
            const row = document.createElement("tr");
            row.className = `${rowClass} hover:bg-red-100 transition`;
            row.innerHTML = `
                <td class="border px-4 py-2 text-center font-bold">${driver.position}</td>
                <td class="border px-4 py-2">${driver.Driver.givenName} ${driver.Driver.familyName}</td>
                <td class="border px-4 py-2">${driver.Constructors[0].name}</td>
                <td class="border px-4 py-2 text-center">${driver.points}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        championshipResults.innerHTML = "";
        championshipResults.appendChild(table);

    } catch (error) {
        console.error(error);
        championshipResults.innerHTML = "<p>Error loading championship data. Please try again later.</p>";
    }
}

// Load current year by default
fetchChampionship(currentYear);

// Update table when user selects a different year
seasonSelect.addEventListener("change", (e) => {
    fetchChampionship(e.target.value);
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
