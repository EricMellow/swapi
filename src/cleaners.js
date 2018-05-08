export const peopleCleaner = (people) => {
  const characters = people.results.map(person => {
    return { 
      name: person.name, 
      homeworld: person.homeworld, 
      species: person.species[0], 
      population: person.homeworld 
    };
  });
  return characters;
};

export const planetsCleaner = (planets) => {
  const homeworlds = planets.results.map(planet => {
    return { 
      name: planet.name, 
      terrain: planet.terrain, 
      population: planet.population, 
      climate: planet.climate, 
      residents: planet.residents 
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
  const starships = ships.results.map(ship => {
    return { 
      name: ship.name, 
      model: ship.model, 
      hyperdriveRating: ship.hyperdrive_rating, 
      numOfPassengers: ship.passengers 
    };
  });
  return starships;
};

export const vehiclesCleaner = (vehicles) => {
  const wheels = vehicles.results.map(vehicle => {
    return { 
      name: vehicle.name, 
      model: vehicle.model, 
      vehicleClass: vehicle.vehicle_class, 
      numOfPassengers: vehicle.passengers 
    };
  });
  return wheels;
};

export default { peopleCleaner, planetsCleaner, filmsCleaner, shipsCleaner, vehiclesCleaner };