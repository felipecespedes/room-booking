import React, { useContext, useEffect, useState } from 'react';
import ScheduleSelector from 'react-schedule-selector'
import dayjs from 'dayjs';
import AppContext from '../../providers/AppContext';
import { Room, Schedule } from '../../types/types';

type RoomCardProps = {
  room: Room;
  companyID: string;
  isCompany?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = React.memo(({ room, companyID, isCompany }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [selection, setSelection] = useState<Date[]>([])
  const { schedules, updateSchedules, user } = useContext(AppContext)
  const [notAvailbleTimes, setNotAvailableTimes] = useState<Set<string>>(new Set())

  const handleScheduleChanged = (newSchedule: Date[]) => {
    const datetimes = newSchedule.slice(-1);
    if (datetimes.length && !validateAvailability(datetimes[0])) {
      return;
    }
    setSelection(datetimes);
  }

  const validateAvailability = (datetime: Date): boolean => {
    const time = dayjs(datetime).format('H');
    if (notAvailbleTimes.has(time)) {
      return false
    }

    return true
  }

  const getBookedUser = (datetime: Date): string => {
    const companyRecord: Schedule = schedules.find((o: Schedule) => o.companyID === companyID);
    if (companyRecord) {
      const strDatetime = dayjs(datetime).format('H');
      const timeRecord = companyRecord.times.find(o => {
        const strTimes = o.datetimes.map(o => dayjs(o).format('H'));
        return o.roomID === room.id && strTimes.includes(strDatetime);
      });

      return timeRecord ? timeRecord.user : '';
    }

    return '';
  }

  useEffect(() => {

    // TODO
    // This could be simplified if a backend service returns an array of not available time slots for the selected company

    const companyRecord: Schedule = schedules.find((o: Schedule) => o.companyID === companyID);
    if (companyRecord) {
      const timeRecord = companyRecord.times.find(o => o.roomID === room.id && o.user === user.name);
      if (!isInitialized) {
        setIsInitialized(true);
        if (timeRecord != null) {
          setSelection(timeRecord.datetimes)
        }
        const newNotAvailableTimes: Set<string> = new Set();
        companyRecord.times.forEach(time => {
          if (time.roomID === room.id && time.user !== user.name && time.datetimes.length) {
            const hour = dayjs(time.datetimes[0]).format('H');
            newNotAvailableTimes.add(hour)
          }
        })
        setNotAvailableTimes(newNotAvailableTimes);
      }
    } else {
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules])

  useEffect(() => {
    if (isInitialized) {
      updateSchedules(companyID, room.id, selection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection])

  return (
    <div className="mt-10 border p-4 rounded-lg max-w-4xl mx-auto">
      <h3 className="text-xl">{room.name}</h3>
      <ScheduleSelector
        selection={selection}
        numDays={1}
        minTime={9}
        maxTime={18}
        hourlyChunks={1}
        startDate={new Date('2021-12-02')} // TODO this date can be retrieved dynamically
        onChange={!isCompany ? handleScheduleChanged : () => null}
        rowGap="10px"
        renderDateLabel={() => <span>&nbsp;</span>}
        renderTimeLabel={(time: Date) => {
          const hour = dayjs(time).format('ha');
          return <span className="flex items-center text-sm text-gray-600 mr-2">{hour}</span>
        }}
        renderDateCell={(datetime: Date, selected: boolean, refSetter: any) => {

          // TODO
          // This could be its own component

          const isAvailable = validateAvailability(datetime);
          const bookedUser = !isAvailable ? getBookedUser(datetime) : null;
          if (isCompany) {
            return (
              <div
                className={`${!isAvailable ? 'bg-blue-300' : ''} h-10 border rounded px-2 flex items-center`}
                ref={refSetter}>
                {!isAvailable && (
                  <span className="text-sm text-gray-600">Booked by {bookedUser}</span>
                )}
              </div>
            )
          }
          return (
            <div
              className={`hover:bg-gray-50 ${selected ? 'bg-green-400 hover:bg-green-300' : ''} ${!isAvailable ? 'bg-red-300 hover:bg-red-300' : 'cursor-pointer'} h-10 border rounded px-2 flex items-center`}
              ref={refSetter}>
              {!isAvailable && (
                <span className="text-sm text-gray-600">Not available</span>
              )}
              {selected && (
                <span className="text-sm text-gray-600">You have booked this time slot</span>
              )}
            </div>
          )
        }}
      />
    </div>
  );
})

RoomCard.defaultProps = {
  isCompany: false
}

export default RoomCard;
