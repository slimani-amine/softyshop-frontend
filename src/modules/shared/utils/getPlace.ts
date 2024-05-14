async function getPlaceName(latitude: string, longitude: string) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        const placeName = data.display_name;
        return placeName;
      } else {
        console.error(`Error fetching data: ${response.statusText}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching data: `);
      return null;
    }
  }
export default getPlaceName