import React from 'react';
import { Company } from '../../types/types';
import CompanyCard from '../CompanyCard/CompanyCard';
import RoomCard from '../RoomCard/RoomCard';

type CompanyDashboardProps = {
  company: Company;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ company }) => {
  return (
    <div>
      <CompanyCard company={company} key={company.id} isSelected={true}/>
      {company.rooms.map(room => (
        <RoomCard companyID={company.id} room={room} key={room.id} isCompany={true} />
      ))}
    </div>
  );
}

export default CompanyDashboard;
