import './index.scss'
import raining from '../../assets/raining.svg'
import sunny from '../../assets/sunny.svg'
import cloudy from '../../assets/cloudy.svg'
import { getCityInfos } from '../../service/openweather'
import { useState } from 'react'
import { Map } from '../map'
import { useTheme } from '../../hooks/useTheme'
type TypeDataInfo = {
    cityName: string | undefined,
    temperature: number | null,
    weather: {
        description: string | undefined
    }

}
export function MainDisplay() {
    let [loading, setLoading] = useState<boolean>(true)
    let [cityInfo, setCityInfo] = useState<TypeDataInfo[]>([])
    let {themeContext} = useTheme()

    function getCityInfo(latLng: string) {       
        getCityInfos(latLng).then((res: any) => {   
            setLoading(false)
            let dataInfo:TypeDataInfo[] = [
                {cityName: undefined, temperature: null, weather: {description: undefined}}
            ];
            dataInfo[0].cityName = res.data.data[0].city_name 
            dataInfo[0].temperature = res.data.data[0].app_temp
            dataInfo[0].weather.description = res.data.data[0].weather.description
            setCityInfo(dataInfo)
        })
    
    }
    function renderIcon() {
        if (cityInfo[0].weather.description === 'Céu limpo') {
            return (
                <>
                  <img src={sunny} alt="" />
                </>
            )
        }
        else if ( ['Nublado', 'Nuvens dispersas', undefined].includes(cityInfo[0].weather.description)) {
            return (
                <>
                    <img src={cloudy} alt="" />
                </>
            )
        }
        else if(['Chuva', 'chuva', 'Chuva fraca', 'Chuva forte', undefined].includes(cityInfo[0].weather.description)) {
            return (
                <>
                    <img src={raining} alt="" />
                </>
            )
        }
    }
    function displayInfo() {
        return (
            <div>
                <div className="weather">
                    {cityInfo[0] !== undefined ? renderIcon() : ''}
                <div style={themeContext === 'dark' ? {} : {color: '#b5b0b1'}}>
                    {cityInfo[0] !== undefined ? cityInfo[0].temperature  + '°': ''}
                    <p>
                    {cityInfo[0] !== undefined ? cityInfo[0].weather.description : ''}
                    </p>
                </div>
                </div>
                <div className="city" style={themeContext === 'dark' ? {} : {color: '#b5b0b1'}}>
                {cityInfo[0] !== undefined ? cityInfo[0].cityName : ''}  
                </div>
            </div>
        )
    }
    function displaySkeleton(){
        return (
            <>
                <div className="skeleton">
                    <div className="item">
                        <div className="icon-skl"></div>
                        <div className="two-lines">
                            <div className="line-skl"></div>
                            <div className="line-skl"></div>
                        </div>
                    </div>
                    <div className="item">
                    <div className="two-lines">
                            <div className="line-skl"></div>
                            <div className="line-skl"></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='main'>
                <div className="informations">
                    <div className="info-container">
                        <div className={`background  ${themeContext === 'dark' ? 'border-dark' : 'border-light'}`} style={themeContext === 'dark' ? {backgroundColor:`#081217`} : {backgroundColor: `#e6f9f8`}}>
                        {cityInfo[0] !== undefined && loading === false ? displayInfo() : displaySkeleton()}
                        </div>
                    </div>
                    
                </div>
                <Map clickLocation={getCityInfo} setLoading={setLoading}></Map>
            </div>
        </>

    )
}