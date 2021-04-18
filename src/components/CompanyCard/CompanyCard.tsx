import React from 'react';
import { Company } from '../../types/types';

type CompanyCardProps = {
  company: Company;
  onSelectCompany?: (company: Company) => void;
  isSelected?: boolean;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onSelectCompany, isSelected }) => {
  return (
    <button
      className={`w-60 rounded-xl mr-4 mb-4 p-6 outline-none focus:outline-none ${isSelected ? 'border-green-600 border-2 cursor-default' : 'border'}`}
      onClick={onSelectCompany?.bind(this, company)}
    >
      <img src={company.image} alt={company.name} className="h-16 w-full object-contain" />
      <h4 className="text-2xl">{company.name}</h4>
      <p>Available rooms: {company.rooms.length}</p>
    </button>
  );
}

export default CompanyCard;
