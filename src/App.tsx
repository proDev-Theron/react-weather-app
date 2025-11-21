import { useState } from 'react'
import './App.css'
import Container from './components/custom_components/container'
import { SearchInput } from './components/custom_components/searchInput'
import WeatherCard from './components/custom_components/weatherCard'
import type { WeatherData } from './type'

function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState<WeatherData & { forecast?: any[] }>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchValue(e.target.value)
  }

  const getForecast = async (city: string) => {
    const url = import.meta.env.VITE_WEATHER_APP_BASE_URL
    const appId = import.meta.env.VITE_OPENWEATHERMAP_APIKEY

    const response = await fetch(
      `${url}/forecast?q=${city}&appid=${appId}&units=metric`
    )
    const data = await response.json()

    // Convert API result (3-hr intervals) into 1 record per day
    const daily = data.list.reduce((acc: any[], curr: any) => {
      const day = new Date(curr.dt * 1000).toLocaleDateString("en", {
        weekday: "short",
      })

      // Only push first entry per day
      if (!acc.find((d) => d.day === day)) {
        acc.push({
          day,
          temp: Math.round(curr.main.temp),
          icon: curr.weather[0].icon,
        })
      }
      return acc
    }, [])

    return daily.slice(0, 5)
  }

  const handleWeather = async () => {
    try {
      setLoading(true)

      const url = import.meta.env.VITE_WEATHER_APP_BASE_URL
      const appId = import.meta.env.VITE_OPENWEATHERMAP_APIKEY

      // CURRENT WEATHER
      const res = await fetch(
        `${url}/weather?q=${searchValue}&appid=${appId}&units=metric`
      )
      const weather = await res.json()

      // FORECAST
      const forecastData = await getForecast(searchValue)

      // Merge into one object for UI
      setSearchResult({ ...weather, forecast: forecastData })

    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen h-screen p-6 flex justify-center items-center">
      <Container>
        <SearchInput
          searchValue={searchValue}
          onClick={handleWeather}
          onChange={handleSearchCity}
          placeholder="Search"
        />

        {loading ? (
          <p className="mt-6 text-center">Getting weather data...</p>
        ) : (
          <div className="mt-6 flex justify-center">
            {searchResult ? (
              <WeatherCard
                city={searchResult.name}
                unit="C"
                temperature={searchResult.main.temp}
                description={searchResult.weather[0].description}
                icon={searchResult.weather[0].icon}
                forecast={searchResult.forecast} // now dynamic
              />
            ) : (
              <>please search place</>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}

export default App
