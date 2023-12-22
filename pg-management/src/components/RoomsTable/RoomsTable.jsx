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
                    {this.props.rooms.map((room) => {
                        <tr>
                            <td>{room.number}</td>
                            <td>{room.type}</td>
                            <td>{room.rent}</td>
                        </tr>
                    })}
                    <tr>
                        <td>106</td>
                        <td>AC</td>
                        <td>
                            <div className="avatar-container">
                                <Avatar name="Raman Babu" />
                                <Avatar name="Kishore ML" />
                                <Avatar name="Ashwin R" />
                            </div>
                        </td>
                        <td>6500</td>
                        <td>500</td>
                    </tr>
                </table>
            </div>
        )
    }
}