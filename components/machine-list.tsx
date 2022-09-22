import React, { useState, useCallback } from 'react'
import MachineCard from './machine-card'
import { Machine } from '../states/machine'
import MachineDetail from './machine-detail'

interface Props {
  machines: Machine[]
}


export default function MachineList({machines}: Props) {
  const [current, setCurrent] = useState<Machine>(machines[0])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const onHideDetail = useCallback(() => setShowDetail(false), [])

  return (
    <section>
      <header>
        <h1>Total {machines.length} machine(s)</h1>
      </header>
      <main
        css={`
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        `}
      >
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onViewDetails={() => {
              setShowDetail(true)
              setCurrent(machine)
            }}
          />
        ))}
      </main>
      <MachineDetail show={showDetail} machine={current} onHide={onHideDetail} />
    </section>
  )
}