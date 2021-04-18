import React from 'react';
import { Room } from '../../types/types';
import RoomCard from '../RoomCard/RoomCard';

type RoomsProps = {
  rooms: Room[];
  companyID: string;
}

const Rooms: React.FC<RoomsProps> = ({ rooms, companyID }) => {
  return (
    <div>
      {rooms.map(room => (
        // TODO this list could be rendered using a virtual list in order to improve its performance
        <RoomCard room={room} key={room.id} companyID={companyID} />
      ))}
    </div>
  );
}

export default Rooms;
