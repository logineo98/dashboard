import React from 'react'
import { PAGE_COMPONENT_TYPE } from '../../../utils/types'
import AdminActionFiltre from './action_filtre_component/AdminActionFiltre'
import NewsInformationActionFiltre from './action_filtre_component/NewsInformationActionFiltre'
import ClientActionFIltre from './action_filtre_component/ClientActionFIltre'
import TownActionFiltre from './action_filtre_component/TownActionFiltre'
import DevisActionFiltre from './action_filtre_component/DevisActionFiltre'
import FacturePostPayAndPrePayActionFiltre from './action_filtre_component/FacturePostPayAndPrePayActionFiltre'

const ActionFiltre: PAGE_COMPONENT_TYPE = ({ title, nbSelectedRow, ElementSelected, setEmptyRowSelected, setElementSelected }) => {

    return (
        title === 'admin' ?
            <AdminActionFiltre nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
            title === 'client' ?
                <ClientActionFIltre nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                title === 'news' ?
                    <NewsInformationActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                    title === 'information' ?
                        <NewsInformationActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                        title === 'town' ?
                            <TownActionFiltre nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                            title === 'devis' ?
                                <DevisActionFiltre nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                                title === 'post_pay' ?
                                    <FacturePostPayAndPrePayActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                                    title === 'pre_pay' ?
                                        <FacturePostPayAndPrePayActionFiltre title={title} nbSelectedRow={nbSelectedRow} ElementSelected={ElementSelected} setEmptyRowSelected={setEmptyRowSelected} setElementSelected={setElementSelected} /> :
                                        <></>
    )
}

export default ActionFiltre