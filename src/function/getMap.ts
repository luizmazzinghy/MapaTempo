import api from "../data/api";

const getMap = async (lat: string, lng: string) => {
  console.log(lat, lng, "Passou");
  try {
    const response = await api.get("", {
      params: {
        lat: lat,
        lon: lng,
        appid: "17995d10978833deac2a0e900ef58a32",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar a API:", error);
    throw error;
  }
};

export default getMap;
