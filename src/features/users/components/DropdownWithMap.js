import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import styles from '../views/SingleUserPage.module.css'

export const DropdownWithMap = ({ user, setMap }) => {

    return (
        <div className={styles.dropdown_address_content}>
                                <div>
                                    zipcode: {user.address.zipcode}
                                </div>
                                <div id={styles.map}>
                                    <MapContainer whenCreated={setMap} center={[/*user.address.geo.lat, user.address.geo.lng*/43.316872, 21.894501]} zoom={13} scrollWheelZoom={true}>
                                        <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                        <Marker position={[/*user.address.geo.lat, user.address.geo.lng*/43.316872, 21.894501]}>
                                            <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>
    )
}