import instance from 'utils/instance'
import { actions as appActions } from './app'
import { message as Msg } from 'antd'
import { 
    addContract,
    editContract,
    deleteContract,
    getContractPage,
    getUserContract,
    getContractDetail,
    getCompanyContract,
} from 'utils/api'