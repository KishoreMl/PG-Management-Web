import React from "react";
import { Avatar } from "../Avatar/Avatar";
import './RoomsTable.scss';

export class RoomsTable extends React.Component{
    render()
    {
        return (
            <div className="table-container">
                <table>
                    <tr>
                        <th>Room No</th>
                        <th>Type</th>
                        <th>Guests</th>
                        <th>Rent</th>
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
                                    {room.capacity-room.guests.length>0?<Avatar />:null}
                                </div>
                            </td>
                            <td>{room.rent}</td>
                            <td>500</td>
                        </tr>
                        
                    )}
                </table>
            </div>
        )
    }
}