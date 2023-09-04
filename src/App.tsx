import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import getMap from "./function/getMap";

import "./App.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function SimpleMap() {
  const [coordenadas, setCoordenadas] = useState("");
  const [dadosMap, setDadosMap] = useState("");

  useEffect(() => {
    const fetchMapData = async () => {
      if (coordenadas) {
        try {
          const mapData = await getMap(coordenadas.lat, coordenadas.lng);
          setDadosMap(mapData);
          console.log(dadosMap);
        } catch (error) {
          console.log(error, "Erro ao carregar");
        }
      }
    };
    fetchMapData();
  }, [coordenadas]);

  const _onClick = ({ lat, lng, event }: any) => {
    setCoordenadas({ lat, lng });

    getMap(lat, lng);
  };

  const defaultProps = {
    center: {
      lat: -19.894455,
      lng: -43.947324,
    },
    zoom: 11,
  };

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          onClick={_onClick}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
      <div className="container">
        <h1>Informações</h1>
        {dadosMap ? (
          <>
            <h4>País: {dadosMap.sys.country}</h4>
            <h4>Cidade: {dadosMap.name}</h4>
            <h4>
              Velocidade do vento: {(dadosMap.wind.speed * 3.6).toFixed(2)} km/h
            </h4>
            <h4>Humidade do ar: {dadosMap.main.humidity}%</h4>
            <h4>
              Temperatura máxima {(dadosMap.main.temp_max - 273.15).toFixed(2)}
              graus celsius
            </h4>
            <h4>
              Temperatura mínima {(dadosMap.main.temp_min - 273.15).toFixed(2)}
              graus celsius
            </h4>
          </>
        ) : (
          <h4>Carregando informações...</h4>
        )}
      </div>
    </div>
  );
}

export default SimpleMap;
