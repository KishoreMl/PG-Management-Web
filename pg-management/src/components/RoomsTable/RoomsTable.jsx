import React from "react";
import { Avatar } from "../Avatar/Avatar";
import './RoomsTable.scss';

export class RoomsTable extends React.Component{
    getAvailableBeds(difference) {
        let availableBeds = [];
        for (let i = 0; i < difference; i++)
        {
            availableBeds.push('Available');
        }
        return availableBeds;
    }
    render()
    {
        return (
            <div className="table-container">
                <table>
                    <tr className="fixed">
                        <th>Room No</th>
                        <th>Type</th>
                        <th>Guests</th>
                        <th>Rent</th>
                        <th>EB Reading Past </th>
                        <th>EB Reading Current </th>
                        <th>Eb Bill</th>
                    </tr>
                    {this.props.rooms.map((room) => 
                            <tr>
                                <td>{room.number}</td>
                                <td>{room.type}</td>
                                <td>
                                    <div className="avatar-container">
                                        {room.guests.map((guest) => 
                                            <Avatar
                                                guest={guest}
                                                onGuestSelect={(guestId) => this.props.onGuestSelect(guestId)}  
                                            />
                                    )}  
                                    {this.getAvailableBeds(room.capacity - room.guests.length).map(() =>
                                        <Avatar />
                                    )}
                                        
                                    </div>
                                </td>
                                <td>{room.rent}</td>
                                <td>6410</td>
                                <td>6600</td>
                                <td>500</td>
                            </tr>
                    )}
                </table>
            </div>
        )
    }
}