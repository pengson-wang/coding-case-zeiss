import React, { useMemo } from 'react'
import { filter, map } from 'rxjs/operators'
import { useObservable  } from 'rxjs-hooks'
import { Machine, machineStatus$ } from '../states/machine'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MACHINE_IMAGE } from 'constants/machine'
import StatusBadge from './status-badge'


interface Props {
  machine: Machine,
  onViewDetails: () => void
}

export default function MachineCard({machine, onViewDetails}: Props) {
  const status = useObservable(() =>
    machineStatus$.pipe(
      filter((s) => s.machine_id === machine.id),
      map((s) => s.status),
    ),
  )
  return (
    <Card style={{ width: '18rem' }} data-id={machine.id}>
      <Card.Img
        variant="top"
        src={MACHINE_IMAGE[machine.machine_type]}
        alt={machine.machine_type}
        css={`
          max-width: 100%;
          padding: 0 8px;
          max-height: 189px;
        `}
      />
      <Card.Body>
        <Card.Title>
          <>
            {machine.machine_type.charAt(0).toUpperCase() + machine.machine_type.substring(1)}{' '}
            <StatusBadge status={status || machine.status} />
          </>
        </Card.Title>
        <Card.Text>
          {`Some quick example text to build on the card title and make up the bulk of the card's
          content.`}
        </Card.Text>
        <Button variant="primary" onClick={onViewDetails}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  )
}