import React from 'react';
import { Company } from '../../types/types';
import CompanyCard from '../CompanyCard/CompanyCard';

type CompaniesProps = {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  selectedCompany: Company | null;
}

const Companies: React.FC<CompaniesProps> = ({ companies, onSelectCompany, selectedCompany }) => {
  return (
    <div>
      <ul>
        {companies.map(company => (
          <CompanyCard company={company} key={company.id} onSelectCompany={onSelectCompany} isSelected={selectedCompany?.id === company.id} />
        ))}
      </ul>
    </div>
  );
}

export default Companies;
