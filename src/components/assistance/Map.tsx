import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import { PAGE_COMPONENT_TYPE } from '../../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../redux/store'
import { getAssistance } from '../../redux/actions/assistance.actions'

const Map: PAGE_COMPONENT_TYPE = ({ displayDiscussion, setDisplayDiscussion }) => {

    const { allAssistances } = useSelector((state: RootReducerType) => state.assistance)
    const dispatch = useDispatch<any>()

    const customIcon = new Icon({ iconUrl: require('../../assets/images/location.png'), iconSize: [38, 38] })

    return (
        <div className={displayDiscussion ? 'map display' : 'map'}>
            <MapContainer center={[12.6026423, -8.0169295]} zoom={13} scrollWheelZoom={false}>
                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {allAssistances?.map((assistance: any) => (
                    <Marker key={assistance?.id} position={[assistance?.latitude, assistance?.longitude]} icon={customIcon} >
                        <Popup>
                            <div style={{ cursor: 'pointer' }} onClick={() => { setDisplayDiscussion && setDisplayDiscussion(true); dispatch(getAssistance(assistance?.id)) }}>
                                <span> {assistance?.customer?.name} </span> <br />
                                <span> {assistance?.counter} </span>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map