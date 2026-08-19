export async function fetchMockData() {
  const response = await fetch("http://localhost:8000/mock-data");
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}
