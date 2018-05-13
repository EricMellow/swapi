export const peopleCleaner = (people) => {
  const characters = people.results.map((person, index) => {
    return { 
      id: person.name + index,
      name: person.name, 
      homeworld: person.homeworld, 
      species: person.species[0], 
      population: 0,
      type: 'person'
    };
  });
  return characters;
};

export const planetsCleaner = (planets) => {
  const homeworlds = planets.results.map((planet, index) => {
    return { 
      id: planet.name + index,
      name: planet.name, 
      terrain: planet.terrain, 
      population: planet.population, 
      climate: planet.climate, 
      residents: planet.residents,
      type: 'planet'
    };
  });
  return homeworlds;
};

export const filmsCleaner = (films) => {
  const crawls = films.results.map(film => {
    return {
      title: film.title,
      episode: film.episode_id,
      crawl: film.opening_crawl,
      release: film.release_date
    };
  });
  return crawls;
};

export const shipsCleaner = (ships) => {
  const starships = ships.results.map((ship, index) => {
    return { 
      id: ship.name + index,
      name: ship.name, 
      model: ship.model, 
      hyperdriveRating: ship.hyperdrive_rating, 
      numOfPassengers: ship.passengers,
      type: 'ship'
    };
  });
  return starships;
};

export const vehiclesCleaner = (vehicles) => {
  const wheels = vehicles.results.map((vehicle, index) => {
    return { 
      id: vehicle.name + index,
      name: vehicle.name, 
      model: vehicle.model, 
      vehicleClass: vehicle.vehicle_class, 
      numOfPassengers: vehicle.passengers,
      type: 'vehicle'
    };
  });
  return wheels;
};

export default { peopleCleaner, planetsCleaner, filmsCleaner, shipsCleaner, vehiclesCleaner };