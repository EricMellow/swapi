const cleanedPeople = peopleAPI.results.map(person => {
  return { name: person.name, homeworld: person.homeworld, species: person.species[0], population: "number" }
})

const cleanedPlanets = planets.results.map(planet => {
  return { name: planet.name, terrain: planet.terrain, population: planet.population, climate: planet.climate, residents: "cleaned population.residents.name" }
})

const crawls = films.results.map(film => film.opening_crawl)

const cleanedShips = starships.results.map(ship => {
  return { name: ship.name, model: ship.model, hyperdriveRating: ship.hyperdrive_rating, numOfPassengers: ship.passengers, }
})

const cleanedVehicles = vehicles.results.map(vehicle => {
  return { name: vehicle.name, model: vehicle.model, vehicleClass: vehicle.vehicle_class, numOfPassengers: vehicle.passengers }
})