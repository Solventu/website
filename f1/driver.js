const urlParams = new URLSearchParams(window.location.search);
const driverId = urlParams.get("id");

function normalizeId(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

const champions = [
  { name: "Michael Schumacher", championships: 7, years: [1994,1995,2000,2001,2002,2003,2004], bio: "German racing legend, considered one of the greatest drivers in F1 history." },
  { name: "Lewis Hamilton", championships: 7, years: [2008,2014,2015,2017,2018,2019,2020], bio: "British driver known for dominance in the turbo-hybrid era and activism off-track." },
  { name: "Juan Manuel Fangio", championships: 5, years: [1951,1954,1955,1956,1957], bio: "Argentinian driver who set the early benchmark for greatness in Formula 1." },
  { name: "Alain Prost", championships: 4, years: [1985,1986,1989,1993], bio: "French driver nicknamed 'The Professor' for his strategic racing style." },
  { name: "Sebastian Vettel", championships: 4, years: [2010,2011,2012,2013], bio: "German driver who dominated with Red Bull in the early 2010s." },
  { name: "Max Verstappen", championships: 3, years: [2021,2022,2023], bio: "Dutch driver, known for his aggressive style and Red Bull dominance." },
  // ... more bios
];

const driver = champions.find(d => normalizeId(d.name) === driverId);

if (driver) {
  document.querySelector("section").innerHTML = `
    <div class="flex flex-col items-center justify-center">
      <div class="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center animate-fade-in">
        <img src="images/drivers/${normalizeId(driver.name).toLowerCase()}.jpg" alt="${driver.name}" class="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-red-600 shadow-lg transition-transform duration-300 hover:scale-105" onerror="this.src='https://via.placeholder.com/160x160?text=No+Image'" />
        <h1 class="text-4xl md:text-5xl font-extrabold text-red-600 mb-2 drop-shadow-lg">${driver.name}</h1>
        <div class="flex justify-center gap-6 mb-4">
          <div class="bg-red-100 rounded-xl px-4 py-2 shadow text-lg font-bold text-red-700">🏆 ${driver.championships} Titles</div>
          <div class="bg-gray-100 rounded-xl px-4 py-2 shadow text-lg font-bold text-gray-700">Years: <span class="text-black">${driver.years.join(", ")}</span></div>
        </div>
        <p class="text-gray-700 text-lg leading-relaxed mb-8">${driver.bio}</p>
        <button onclick="window.location.href='drivers.html'" class="bg-red-600 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-black hover:text-red-600 transition">← Back to Champions</button>
      </div>
    </div>
  `;
} else {
  document.querySelector("section").innerHTML =
    "<p class='text-center text-xl text-red-600'>Driver not found.</p>";
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
