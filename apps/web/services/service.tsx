export async function fetchCoordinates(cityName: string): Promise<any> {
  // We can use the Geocoding API to get the latitude and longitude or have coordinates
  // implemented on our api. Depending on our needs we can change our geocoding api
  // Another example is nominatim with a limit of 1 request per second
  const response = await fetch(
    // `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`
    `https://geocode.maps.co/search?city=${cityName}&format=json`
  );
  const data = await response.json();

  return {
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
  };
}

export async function fetchActivityHistory(
  filter: string,
  input: string
): Promise<any> {
  const response = await fetch(
    `http://127.0.0.1:9080/climatix/activities/?${filter}=${input}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  return data;
}
export async function checkServer(): Promise<any> {
  const response = await fetch(`http://127.0.0.1:9080/climatix/info`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function fetchCategories(): Promise<any> {
  const response = await fetch("http://127.0.0.1:9080/climatix/categories");

  const data = await response.json();
  return data;
}

export async function sendActivity(
  amountInput: string,
  dateInput: string,
  typeInput: string
): Promise<any> {
  const response = await fetch(`http://127.0.0.1:9080/climatix/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: parseInt(amountInput),
      activityDate: dateInput,
      activityType: typeInput,
      emissions: { CO2: 0, CH4: 0, N2O: 0 },
    }),
  });
  const data = await response.json();
  return data;
}

export async function fetchSavings(): Promise<any> {
  const response = await fetch(`http://127.0.0.1:9080/climatix/savings`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
}

export async function fetchChartData(): Promise<any> {
  const response = await fetch(`http://127.0.0.1:9080/climatix/data`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  let newActivities = [...data.activities];
  return newActivities;
}
