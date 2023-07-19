import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'

const Map = () => {

    const customIcon = new Icon({ iconUrl: require('../../assets/images/location.png'), iconSize: [38, 38] })

    return (
        <div className='map'>
            <MapContainer center={[12.6026423, -8.0169295]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[12.6026423, -8.0169295]} icon={customIcon} >
                    <Popup>
                        <div onClick={() => alert(5)}>
                            Ok d'accord
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map