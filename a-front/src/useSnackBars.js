import { useContext } from 'react'

import { SnackBarContext } from './SnackBarProvider'

const useSnackBars = () => useContext(SnackBarContext)

export default useSnackBars