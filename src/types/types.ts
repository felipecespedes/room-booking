export type User = {
  name: string
  isCompany: boolean
}

export type ScheduleTime = {
  roomID: string;
  user: string;
  datetimes: Date[];
}

export type Schedule = {
  companyID: string;
  times: ScheduleTime[];
}

export type Room = {
  id: string;
  name: string;
}

export type Company = {
  id: string;
  name: string;
  image?: string;
  rooms: Room[];
}
