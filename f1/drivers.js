const driversContainer = document.getElementById("driversContainer");

// Full list of F1 World Champions with bios
const champions = [
  { name: "Michael Schumacher", championships: 7, years: [1994, 1995, 2000, 2001, 2002, 2003, 2004], bio: "German legend, widely regarded as one of the greatest drivers ever, who dominated with Benetton and Ferrari.", image: "images/drivers/michael_schumacher.jpg" },
  { name: "Lewis Hamilton", championships: 7, years: [2008, 2014, 2015, 2017, 2018, 2019, 2020], bio: "British superstar who defined the hybrid era with Mercedes and became a cultural icon for diversity in motorsport.", image: "images/drivers/lewis_hamilton.jpg" },
  { name: "Juan Manuel Fangio", championships: 5, years: [1951, 1954, 1955, 1956, 1957], bio: "Argentinian legend who set the early gold standard in F1 with 5 titles in the 1950s.", image: "images/drivers/fangio.jpg" },
  { name: "Alain Prost", championships: 4, years: [1985, 1986, 1989, 1993], bio: "French driver nicknamed 'The Professor' for his strategic and calculated driving style.", image: "images/drivers/alain.jpg" },
  { name: "Max Verstappen", championships: 4, years: [2021, 2022, 2023, 2024], bio: "Dutch prodigy who ushered in a new era of dominance with Red Bull.", image: "images/drivers/verstappen.avif" },
  { name: "Sebastian Vettel", championships: 4, years: [2010, 2011, 2012, 2013], bio: "German driver who dominated the early 2010s with Red Bull and became one of F1’s modern greats.", image: "images/drivers/vettel.jpg" },
  { name: "Jack Brabham", championships: 3, years: [1959, 1960, 1966], bio: "Australian pioneer and the only driver to win a title in a car of his own construction.", image: "images/drivers/brabham.jpeg" },
  { name: "Nelson Piquet", championships: 3, years: [1981, 1983, 1987], bio: "Brazilian driver known for his tactical racing and fierce rivalries in the 1980s.", image: "images/drivers/piquet.jpg" },
  { name: "Niki Lauda", championships: 3, years: [1975, 1977, 1984], bio: "Austrian legend famous for his comeback after a near-fatal crash in 1976.", image: "images/drivers/lauda.webp" },
  { name: "Emerson Fittipaldi", championships: 2, years: [1972, 1974], bio: "Brazilian driver who became the youngest champion of his time and later took IndyCar by storm.", image: "images/drivers/fittipaldi.webp" },
  { name: "Mika Häkkinen", championships: 2, years: [1998, 1999], bio: "Finnish 'Flying Finn' and fierce rival of Michael Schumacher in the late 1990s.", image: "images/drivers/hakkinen.jpg" },
  { name: "Fernando Alonso", championships: 2, years: [2005, 2006], bio: "Spanish driver who ended Schumacher’s dominance and is known for his longevity and skill.", image: "images/drivers/alonso.jpg" },
  { name: "Graham Hill", championships: 2, years: [1962, 1968], bio: "The only driver to win the Triple Crown of Motorsport: F1, Indy 500, and Le Mans.", image: "images/drivers/hill.jpg" },
    { name: "Alberto Ascari", championships: 2, years: [1952, 1953], bio: "Italy’s first F1 superstar, who dominated the early 1950s with Ferrari.", image: "images/drivers/ascari.avif" },
  { name: "Jim Clark", championships: 2, years: [1963, 1965], bio: "Scottish driver remembered as one of the most naturally gifted talents in F1 history.", image: "images/drivers/clark.jpg" },
  { name: "Damon Hill", championships: 1, years: [1996], bio: "British driver and son of Graham Hill, who won his title with Williams.", image: "images/drivers/damon_hill.jpg" },
  { name: "Keke Rosberg", championships: 1, years: [1982], bio: "Finnish driver known for his aggressive style and father of 2016 champion Nico Rosberg.", image: "images/drivers/keke_rosberg.jpg" },
  { name: "Jenson Button", championships: 1, years: [2009], bio: "British driver who clinched his only title with Brawn GP in their fairytale season.", image: "images/drivers/button.jpg" },
  { name: "Kimi Räikkönen", championships: 1, years: [2007], bio: "Finnish 'Iceman' known for his cool personality and title win with Ferrari.", image: "images/drivers/raikonnen.jpg" },
  { name: "James Hunt", championships: 1, years: [1976], bio: "Charismatic British driver and 1976 champion, immortalized in the film 'Rush'.", image: "images/drivers/hunt.jpg" },
  { name: "Mike Hawthorn", championships: 1, years: [1958], bio: "Britain’s first F1 world champion, remembered for his style and flair.", image: "images/drivers/hawtorn.webp" },
  { name: "Phil Hill", championships: 1, years: [1961], bio: "First American-born F1 champion, winning with Ferrari in 1961.", image: "images/drivers/phil_hill.avif" },
  { name: "John Surtees", championships: 1, years: [1964], bio: "The only man to win world championships on both two wheels and four.", image: "images/drivers/surtess.jpg" },
  { name: "Mario Andretti", championships: 1, years: [1978], bio: "Italian-American legend and one of the most versatile drivers in motorsport history.", image: "images/drivers/andretti.jpg" },
  { name: "Jacques Villeneuve", championships: 1, years: [1997], bio: "Canadian driver who won in only his second F1 season, son of Gilles Villeneuve.", image: "images/drivers/villenueve.avif" },
  { name: "Nigel Mansell", championships: 1, years: [1992], bio: "British driver known for his aggressive style and spectacular title-winning season.", image: "images/drivers/mansell.jpg" },
  { name: "Alan Jones", championships: 1, years: [1980], bio: "Australian driver who gave Williams their first world championship.", image: "images/drivers/alan_jones.avif" },
  { name: "Denny Hulme", championships: 1, years: [1967], bio: "The 'Bear' from New Zealand, known for his no-nonsense driving style.", image: "images/drivers/denny_hulme.jpg" },
  { name: "Jochen Rindt", championships: 1, years: [1970], bio: "The only posthumous F1 champion, remembered for his raw speed.", image: "images/drivers/rindt.jpg" },

];

function normalizeId(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

function generateTable() {
  // Center the table and make it responsive
  driversContainer.innerHTML = "";
  driversContainer.className = "flex justify-center items-center w-full animate-fade-in";

  const wrapper = document.createElement("div");
  wrapper.className = "w-full max-w-5xl overflow-x-auto";

  let table = document.createElement("table");
  table.className = "min-w-full border-collapse rounded-2xl shadow-2xl overflow-hidden text-base md:text-xl";

  table.innerHTML = `
    <thead>
      <tr class="bg-red-600 text-white text-left">
        <th class="border px-4 md:px-10 py-3 font-bold">#</th>
        <th class="border px-4 md:px-10 py-3 font-bold">Photo</th>
        <th class="border px-4 md:px-10 py-3 font-bold">Driver</th>
        <th class="border px-4 md:px-10 py-3 font-bold">Titles</th>
        <th class="border px-4 md:px-10 py-3 font-bold">Years Won</th>
      </tr>
    </thead>
    <tbody>
      ${champions.map((d, i) => `
        <tr class="${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-100 transition" style="cursor:pointer;" onclick="openDriverPage('${normalizeId(d.name)}')">
          <td class="border px-4 md:px-10 py-2 text-center font-bold">${i + 1}</td>
          <td class="border px-4 md:px-10 py-2 text-center">
            <img src="${d.image || 'https://via.placeholder.com/64x64?text=No+Image'}" alt="${d.name}" class="w-12 h-12 md:w-20 md:h-20 object-cover rounded-full mx-auto border-2 border-red-400 shadow" />
          </td>
          <td class="border px-4 md:px-10 py-2 font-semibold">${d.name}</td>
          <td class="border px-4 md:px-10 py-2 text-center">${d.championships}</td>
          <td class="border px-4 md:px-10 py-2">${d.years.join(", ")}</td>
        </tr>
      `).join("")}
    </tbody>
  `;

  wrapper.appendChild(table);
  driversContainer.appendChild(wrapper);
}

function openDriverPage(driverId) {
  window.location.href = `driver.html?id=${encodeURIComponent(driverId)}`;
}

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

generateTable();
