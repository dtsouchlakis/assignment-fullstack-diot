import dayjs from "dayjs";

export async function fetchCoordinates(cityName: string): Promise<any> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
  );
  const data = await response.json();

  if (data && data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } else {
    throw new Error(`Could not fetch coordinates for city: ${cityName}`);
  }
}

export async function fetchActivityHistory(
  filter: string,
  input: string
): Promise<any> {
  try {
    const response = await fetch(
      `http://127.0.0.1:9080/climatix/activities/?${filter}=${input}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function checkServer(): Promise<any> {
  try {
    const response = await fetch(`http://127.0.0.1:9080/climatix/info`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return error;
  }
}

export async function fetchCategories(): Promise<any> {
  try {
    const response = await fetch("http://127.0.0.1:9080/climatix/categories");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function sendActivity(
  amountInput: string,
  dateInput: string,
  typeInput: string
): Promise<any> {
  try {
    console.log(amountInput, dateInput, typeInput);

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

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchSavings(): Promise<any> {
  try {
    const response = await fetch(`http://127.0.0.1:9080/climatix/savings`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function fetchChartData(): Promise<any> {
  try {
    const response = await fetch(`http://127.0.0.1:9080/climatix/data`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    let newActivities = [...data.activities];
    return newActivities;
  } catch (error) {
    console.error(error);
    return error;
  }
}
