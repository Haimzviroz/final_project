
export const geocodeApi = async (address: string) => {
    const response = await fetch(
        `https://geocode.maps.co/search?q=${address}&api_key=6769266f0b322500360713bln76df76`
    );
    const data = await response.json();
    return data;
};

