import React from 'react'
import { AiOutlineFilter } from 'react-icons/ai'

const FilterExportImport = () => {
    return (
        <div className='filter_import_export_nb_element'>
            <div className="filter_import_export_container">
                <button className='filter_container'>
                    <AiOutlineFilter className='filter_icon' />
                </button>

                <div className='import_export_container'>
                    <button className='exporter'>Exporter</button>
                    <button className='importer'>Importer</button>
                </div>
            </div>

            <span className='nb_elements'>5 éléments</span>
        </div>
    )
}

export default FilterExportImport