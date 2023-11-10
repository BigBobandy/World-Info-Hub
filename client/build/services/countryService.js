export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://back-end-production-1ccf.up.railway.app/api/countries"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};
