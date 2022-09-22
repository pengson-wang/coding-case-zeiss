import { ReplaySubject, of, from, combineLatest, interval } from "rxjs"
import { map, catchError, filter } from "rxjs/operators"
import { webSocket } from 'rxjs/webSocket';

const _machine = {
"id": "c21f082e-625e-49ac-80c5-e0d46bf50258",
"status": "idle",
"machine_type": "microscope",
"longitude": 48.09610228912977,
"latitude": 11.52376716586951,
"last_maintenance": "2017-04-01T17:00:00.000000Z",
"install_date": "2015-04-15",
"floor": 5
}

export type Status = 'idle' | 'running' | 'finished' | 'errored'
export type MachineType = 'microscope' | 'measurement'

export interface Event {
  timestamp: string
  status: Status
}

export type Machine = typeof  _machine & {
  status: Status,
  machine_type: MachineType
  events?: Event[]
}

interface MachineStatusMsg {
  machine_id: string
  id: string
  timestamp: string
  status: Status
}


//! failed to connect to the websocket, use mock instead
// export const machineStatus$ = webSocket<MachineStatusMsg>('ws://codingcase.zeiss.services').pipe(catchError(val => of(null)))

const selections: Status[] = ['idle', 'running', 'finished', 'errored']

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// mock the websocket
export const machineStatus$ = interval(4000).pipe(map(() => {
  return {
    machine_id: '95d9b02f-3347-4c0c-a8a0-6e6e525121d5',
    id: `${Math.random()}`.substring(2),
    timestamp: new Date().toLocaleDateString(),
    status: selections[randomIntFromInterval(0, 3)] ?? 'idle',
  }
}))

