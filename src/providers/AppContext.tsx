import React, { useEffect, useState } from 'react';
import { useStorage } from '../components/hooks/useStorage';
import APIService from '../services/APIService';
import { Company, Schedule, User } from '../types/types';

const initialValue: any = {}
const AppContext = React.createContext(initialValue)

export const AppProvider: React.FC = ({ children }) => {
  const [user, setUser] = useStorage<User | undefined | null>('user', undefined);
  const [companies, setCompanies] = useState<Company[]>([]);

  // TODO
  // Schedules could be initialized with a backend service
  const [schedules, setSchedules] = useStorage<Schedule[]>('schedules', []);

  const handleLoadCompanies = async () => {
    const result = await APIService.getCompanies();
    setCompanies(result);
  }

  const handleUpdateUser = (newUser: User) => {
    setUser(newUser)
  }

  useEffect(() => {
    if (user === undefined) {
      setUser(null);
    }
  }, [user, setUser])

  const handleUpdateSchedules = (companyID: string, roomID: string, datetimes: Date[]) => {
    if (user == null) return;

    // TODO
    // Schedules could be sync with a backed in this point

    const record = schedules.find(o => o.companyID === companyID);
    let newSchedules: Schedule[] = [...schedules];
    if (record != null) {
      const timeRecord = record.times.find(o => o.roomID === roomID && o.user === user.name);
      if (timeRecord != null) {
        timeRecord.datetimes = datetimes;
      } else {
        record.times.push({
          datetimes,
          roomID,
          user: user.name
        });
      }
    } else {
      newSchedules = [...newSchedules, {
        companyID,
        times: [
          {
            datetimes,
            roomID,
            user: user.name
          }
        ]
      }]
    }
    setSchedules(newSchedules)
  }

  return (
    <AppContext.Provider value={{
      user,
      companies: companies,
      loadCompanies: handleLoadCompanies,
      updateUser: handleUpdateUser,
      updateSchedules: handleUpdateSchedules,
      schedules
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
