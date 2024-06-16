 document.addEventListener("DOMContentLoaded", function() {
      const planetsContainer = document.getElementById("planets");

      fetch("https://swapi.dev/api/planets/?format=json")
        .then(response => response.json())
        .then(data => {
          const planets = data.results;

          planets.forEach(planet => {
            const planetCard = document.createElement("div");
            planetCard.classList.add("card");
            planetCard.innerHTML = `
              <div class="planet-info">
                <h2>${planet.name}</h2>
                <div class="planet-image">
                  <div class="shiny-outline"></div> <!-- Shiny outline -->
                  <img src="images/${planet.name.toLowerCase()}.png" alt="${planet.name}" />
                </div>
                <div class="planet-details">
                  <p><strong>Climate:</strong> ${planet.climate}</p>
                  <p><strong>Population:</strong> ${planet.population}</p>
                  <p><strong>Terrain:</strong> ${planet.terrain}</p>
                  <h3>Notable Residents:</h3>
                  <ul class="residents-list" id="residents-${planet.name.replace(/\s/g, "-")}"></ul>
                </div>
              </div>
            `;
            planetsContainer.appendChild(planetCard);

            planet.residents.forEach(residentUrl => {
              fetch(residentUrl)
                .then(response => response.json())
                .then(resident => {
                  const residentList = document.getElementById(`residents-${planet.name.replace(/\s/g, "-")}`);
                  const residentItem = document.createElement("li");
                  residentItem.classList.add("resident");
                  residentItem.innerHTML = `
                    <strong>Name:</strong> ${resident.name}, 
                    <strong>Height:</strong> ${resident.height}, 
                    <strong>Mass:</strong> ${resident.mass}, 
                    <strong>Gender:</strong> ${resident.gender}
                  `;
                  residentList.appendChild(residentItem);
                });
            });

            // Add hover event listener
            planetCard.addEventListener('mouseover', () => {
              const planetDetails = planetCard.querySelector('.planet-details');
              planetDetails.style.display = 'block';
            });

            planetCard.addEventListener('mouseout', () => {
              const planetDetails = planetCard.querySelector('.planet-details');
              planetDetails.style.display = 'none';
            });
          });
        })
        .catch(error => console.log("Error fetching data:", error));
    });
