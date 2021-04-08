import { SET_NODE, NodeDTO } from '../actions/nodeActions'
export type WSDoraData = {
  locale: string
  location: string
  network: string
  type: string
  height: number
  last_seen: number
  peers: number
  stateheight: number
  status: string
  version: string
  reliability: number
  plugins: {
    name: string
    version: string
    interfaces: string[]
  }[]
  lastblocktime: number
  laststatetime: number
  availability: number
  url: string
}

export type State = Map<string, WSDoraData>

const INITIAL_STATE: State = new Map<string, WSDoraData>()

export type SORT_OPTION =
  | 'endpoint'
  | 'type'
  | 'isItUp'
  | 'reliability'
  | 'stateHeight'
  | 'blockHeight'
  | 'version'
  | 'peers'

export const SerializeState = (
  state: State,
  orderBy?: SORT_OPTION,
  asc?: boolean,
): WSDoraData[] => {
  const serializedData: WSDoraData[] = []
  Array.from(state.entries()).forEach(([_, data]) => {
    serializedData.push(data)
  })
  return orderBy ? orderNodes(orderBy, serializedData) : serializedData
}

const orderNodes = (field: SORT_OPTION, nodes: WSDoraData[]) => {
  switch (field) {
    case 'blockHeight':
      return nodes.sort((node1, node2) => {
        return node1.height > node2.height
          ? -1
          : node2.height > node1.height
          ? 1
          : 0
      })
    case 'reliability':
      return nodes.sort((node1, node2) => {
        return node1.reliability > node2.reliability
          ? -1
          : node2.reliability > node1.reliability
          ? 1
          : 0
      })
    // case 'isItUp':
    //   return nodes.sort((node1, node2) => {
    //     // return node1.status > node2.status
    //     //   ? -1
    //     //   : node2.status > node1.status
    //     //   ? 1
    //     //   : 0
    //   })
    case 'stateHeight':
      return nodes.sort((node1, node2) => {
        return node1.stateheight > node2.stateheight
          ? -1
          : node2.stateheight > node1.stateheight
          ? 1
          : 0
      })
    case 'version':
      return nodes.sort((node1, node2) => {
        return node1.version > node2.version
          ? -1
          : node2.version > node1.version
          ? 1
          : 0
      })
    case 'peers':
      return nodes.sort((node1, node2) => {
        return node1.peers > node2.peers
          ? -1
          : node2.peers > node1.peers
          ? 1
          : 0
      })
    default:
      return nodes
  }
}

export default (state: State = INITIAL_STATE, action: NodeDTO): State => {
  switch (action.type) {
    case SET_NODE:
      const newState = new Map<string, WSDoraData>(state)
      newState.set(action.data.url, action.data)
      return newState
    default:
      return state
  }
}
