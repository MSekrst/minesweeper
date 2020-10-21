import { CellStatus, VisibleCellStatus } from '../../model/Game'

export interface CellInfo {
  visibleStatus: VisibleCellStatus
  status: CellStatus
  extra?: number
}
