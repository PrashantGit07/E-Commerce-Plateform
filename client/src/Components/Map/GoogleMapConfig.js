import React from 'react'
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api"
const GoogleMapConfig = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.GOOGLE_MAP_API
    })

    if (!isLoaded) {
        <p>Loading....</p>
    }
    return (
        <div>

        </div>
    )
}

export default GoogleMapConfig
