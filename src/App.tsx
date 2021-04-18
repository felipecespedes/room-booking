import React, { useContext, useEffect, useState } from 'react';
import Companies from './components/Companies/Companies';
import CompanyDashboard from './components/CompanyDashboard/CompanyDashboard';
import Login from './components/Login/Login'
import Rooms from './components/Rooms/Rooms'
import AppContext from './providers/AppContext';
import { Company } from './types/types';

function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { companies, loadCompanies, user, updateUser } = useContext(AppContext);

  const handleCompanySelected = (company: Company) => {
    setSelectedCompany(company);
  }

  useEffect(() => {
    if (user) {
      loadCompanies()
    }
  }, [user, loadCompanies])

  useEffect(() => {
    if (user?.isCompany) {
      const company: Company = companies.find((o: Company) => o.id === user.name);
      setSelectedCompany(company);
    }
  }, [user, companies]);

  if (user === undefined) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="pb-10 px-4">
      <h1 className="text-4xl text-center mb-10 mt-2">Cola Day</h1>
      <div className="container mx-auto">
        {user == null ? (
          <Login afterLogin={() => setSelectedCompany(null)} />
        ) : (
          <>
            <div className="flex justify-end items-center mb-4">
              <img className="h-6 w-6 bg-white" src="https://cdn.onlinewebfonts.com/svg/img_181369.png" alt="avatar" loading="lazy" />
              <span className="text-lg mr-6 ml-2">{user.name}</span>
              <button
                className="float-right bg-yellow-300 rounded p-2 hover:bg-yellow-400"
                onClick={() => updateUser(null)}
              >
                Log out
              </button>
            </div>
            {user.isCompany ? (
              selectedCompany && (
                <CompanyDashboard company={selectedCompany} />
              )
            ) : (
              <>
                <Companies companies={companies} onSelectCompany={handleCompanySelected} selectedCompany={selectedCompany} />
                {selectedCompany != null ? (
                  <>
                    <div className="mt-2 flex flex-col items-end">
                      <p className="text-sm text-gray-600">Click on the desired time slot to book a meeting room</p>
                      <p className="text-sm text-gray-600">Click on your previously selected time slot to cancel a reservation</p>
                    </div>
                    <Rooms rooms={selectedCompany.rooms} companyID={selectedCompany.id} />
                  </>
                ) : (
                  <span className="text-sm text-gray-600 mt-4 block">Please select a company to start</span>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
