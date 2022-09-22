import React, { useState, useMemo, useEffect } from 'react'
import { useObservable } from 'rxjs-hooks'
import { filter, map } from 'rxjs/operators'
import Offcanvas from 'react-bootstrap/Offcanvas'
import ListGroup from 'react-bootstrap/ListGroup'
import { MACHINE_IMAGE } from 'constants/machine'
import StatusBadge from './status-badge'
import dayjs from 'dayjs'
import { Machine, machineStatus$, Event } from '../states/machine'

export default function Detail({
  show,
  machine,
  onHide,
}: {
  machine: Machine
  show: boolean
  onHide: () => void
}) {
  const status = useObservable(() =>
    machineStatus$.pipe(
      filter((s) => s.machine_id === machine?.id),
      map((s) => s.status),
    ),
  )
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const asyncCall = async () => {
      const resp = await fetch(
        `http://codingcase.zeiss.services/api/v1/machines/${machine!.id}`,
      ).then((r) => r.json())
      const m = resp.data as Machine
      if (m.id === machine.id && m.events) {
        setEvents(m.events)
      }
    }
    if (machine) {
      asyncCall()
    }
  }, [machine])

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div>
            <span
              css={`
                margin-right: 8px;
              `}
            >
              {machine.machine_type.charAt(0).toUpperCase() + machine.machine_type.substring(1)}
            </span>
            <StatusBadge status={status || machine.status} />
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          css={`
            width: 100%;
            padding: 8px;
            border: 1px solid #dddddd;
          `}
        >
          <img
            src={MACHINE_IMAGE[machine.machine_type]}
            alt={machine.machine_type}
            css={`
              max-width: 100%;
              padding: 0 8px;
              max-height: 189px;
            `}
          />
        </div>
        <br />
        Installed at <strong>{dayjs(machine.install_date).format('DD/MM/YYYY')}</strong>
        <br />
        Last maintenaced at <strong>{dayjs(machine.last_maintenance).format('DD/MM/YYYY')}</strong>,
        <br />
        Floor at <strong>{machine.floor}</strong>
        <br />
        <h2>Events:</h2>
        <ListGroup>
          {events.map((e) => (
            <ListGroup.Item key={e.timestamp}>
              <StatusBadge status={e.status} />
              {e.timestamp}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
