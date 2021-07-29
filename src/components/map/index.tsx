import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useTheme } from "../../hooks/useTheme";
import './index.scss'

type TypeProps = {
    clickLocation: Function;
    setLoading: Function;
}

export function Map(props: TypeProps) {
    const [position, setPosition] = useState({lat: 0, lng: 0})
    const { themeContext } = useTheme()
    
    function LocationMarker() {
        const map = useMapEvents({
          click(e) {
            props.setLoading(true)
            props.clickLocation(e.latlng)
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            
          },
        })
        return position === null ? null : (
          <Marker position={position}>
            <Popup minWidth={100}>{`lat: ${position.lat}, long: ${position.lng}`}</Popup>
          </Marker>
        )
    }

    function displayDarkMap() {
      return (
        <MapContainer center={[-17, -49]} zoom={4} scrollWheelZoom={true} className={'border-dark'} >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url= 'https://api.mapbox.com/styles/v1/joaonanzer/ckrfo2ggb47vd18nwhsv0v046/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9hb25hbnplciIsImEiOiJja2JzNnRiY2owMG9jMnJvMjl4c3V5dWY2In0.zZDu4xmaRH6rgvJDvP1lzw'
            />
            <LocationMarker />
        </MapContainer>

      )
    }

    function displayLightMap() {
      return (
        <MapContainer center={[-17, -49]} zoom={4} scrollWheelZoom={true} className={'border-light'}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url= 'https://api.mapbox.com/styles/v1/joaonanzer/ckrgffivg4ed217tqe7myfrr9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9hb25hbnplciIsImEiOiJja2JzNnRiY2owMG9jMnJvMjl4c3V5dWY2In0.zZDu4xmaRH6rgvJDvP1lzw'
          />
        <LocationMarker />
      </MapContainer>

      )
    }
    return (
        <>
            <div className="map">
              {
                themeContext === 'dark' && displayDarkMap()
              }
              {
                themeContext === 'light' && displayLightMap()
              }
            </div>
        </>
    )
}