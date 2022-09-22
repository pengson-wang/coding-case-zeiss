import fetch from 'node-fetch'
import MachineList from 'components/machine-list'
import {Machine } from 'states/machine'

interface Props {
  machines: Machine[]
}

const Home = ({machines}: Props) => {
  return (
    <div css={`padding: 8px 16px;`}>
      <MachineList machines={machines}/>
    </div>
  )
}

export async function getStaticProps(context: any) {
  const resp = await fetch('http://codingcase.zeiss.services/api/v1/machines').then(r => r.json())
  const machines = (resp as {data: Machine[]}).data
  return {
    props: {
      machines
    }, // will be passed to the page component as props
  }
}

export default Home
