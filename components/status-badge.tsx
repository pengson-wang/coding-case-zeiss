import React, { useMemo } from 'react'
import { Status } from 'states/machine'
import Badge from 'react-bootstrap/Badge';

export default function StatusBadge({status}: {status?: Status}) {
  const bg = useMemo(() => {
    switch(status) {
      case 'idle': return 'secondary'
      case 'running': return 'success'
      case 'finished': return 'info'
      case 'errored': return 'danger'
      default: return 'warning'
    }
  }, [status])
  return  <Badge pill bg={bg}>
          {status}
      </Badge>
}