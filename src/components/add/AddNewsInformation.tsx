import React, { useEffect, useState } from 'react'
import { ADD_EDIT_NEWS_INFORMATION_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { FaUserCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { validation_news_information } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../../redux/actions/news.actions';
import { addInformation } from '../../redux/actions/information.actions';
import { RootReducerType } from '../../redux/store';
import Loading from '../loading/Loading';
import Select, { MultiValue } from 'react-select'
import { getAllTowns } from '../../redux/actions/town.actions';
import { getAllCommunes } from '../../redux/actions/commune.actions';
import { getAllQuarters } from '../../redux/actions/quarter.actions';

const AddNewsInformation: PAGE_COMPONENT_TYPE = ({ title, seeAddNewsInformation, setSeeAddNewsInformation }) => {

    const data: ADD_EDIT_NEWS_INFORMATION_TYPE = { title: '', content: '', image: '' }
    const dataInfo: ADD_EDIT_NEWS_INFORMATION_TYPE = { title: '', content: '', image: '', type: '', diffusionItems: [] }
    const titre = title

    const [addNewsData, setAddNewsData] = useState(data)
    const [addInformationData, setAddInformationData] = useState(dataInfo)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<ADD_EDIT_NEWS_INFORMATION_TYPE>()
    const [typeCible, setTypeCible] = useState('')

    const { loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const { loadingTown, allTowns } = useSelector((state: RootReducerType) => state.town)
    const { loadingCommune, allCommunes } = useSelector((state: RootReducerType) => state.commune)
    const { loadingQuarter, allQuaters } = useSelector((state: RootReducerType) => state.quarter)

    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = title === 'news' ? validation_news_information(false, addNewsData) : validation_news_information(true, addInformationData)

        if (error.type !== initialError.type || error.content !== initialError.content || error.image !== initialError.image || error.title !== initialError.title || error.type !== initialError.type || error.diffusionItems !== initialError.diffusionItems) {
            setErr(error)
        } else {
            setErr(initialError)

            if (titre === 'news') {
                const { content, image, title } = addNewsData

                const data = new FormData()

                data.append('title', title)
                data.append('content', content)
                if (image) data.append('image', image)
                dispatch(addNews(data, setAddNewsData, setPreviewImg))
            } else {
                const { content, image, title, type, diffusionItems } = addInformationData

                const data = new FormData()

                data.append('title', title)
                data.append('content', content)
                if (image) data.append('image', image)
                data.append('type', type as string)

                if (type === 'Tout le monde') data.append('diffusionItems', JSON.stringify(diffusionItems))
                else data.append('diffusionItems', JSON.stringify((diffusionItems as MultiValue<{ value: string, label: string }>).map((el) => ({ id: el?.value, name: el?.label }))))

                dispatch(addInformation(data, setAddInformationData, setPreviewImg))
            }
        }
    }

    useEffect(() => {
        if (typeCible) {
            if (typeCible === 'Ville') { dispatch(getAllTowns()); setAddInformationData({ ...addInformationData, diffusionItems: [] }) }
            else if (typeCible === 'Commune') { dispatch(getAllCommunes()); setAddInformationData({ ...addInformationData, diffusionItems: [] }) }
            else if (typeCible === 'Quartier') { dispatch(getAllQuarters()); setAddInformationData({ ...addInformationData, diffusionItems: [] }) }
            else if (typeCible === 'Tout le monde') { setAddInformationData({ ...addInformationData, diffusionItems: [{ id: 'Somagep_News', name: 'Tout le monde' }] }) }

        } else { setAddInformationData({ ...addInformationData, diffusionItems: [] }) }
    }, [dispatch, typeCible])

    return (
        !seeAddNewsInformation ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setAddNewsData(data); setAddInformationData(dataInfo); setErr(data) }} />

                    <div className='loading_container'>
                        {(loadingInfo || loadingNews) && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p> {title === 'news' ? 'ACTUALITÉ' : 'INFORMATION'} </p>
                        </div>
                    </div>

                    {title === 'news' ?
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='file_label_container'>
                                <label>Image mise en avant de l'actualité </label>
                                {previewImg &&
                                    <label htmlFor='image' className='preview_img_container'>
                                        <img src={previewImg as string} alt='image_actualité' />
                                    </label>
                                }
                                {err?.image && <span className='error'> {err?.image as string} </span>}
                                <div className='choose_abort_container'>
                                    <label htmlFor='image' className='choose_image'>Choisir une image
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setAddNewsData({ ...addNewsData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={addNewsData.title} onChange={e => setAddNewsData({ ...addNewsData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={addNewsData.content} onChange={e => setAddNewsData({ ...addNewsData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setPreviewImg(''); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>

                            <div className='select_label_container'>
                                <label htmlFor='type'>Cible</label>

                                <select name='type' id='type' value={addInformationData.type} onChange={e => { setTypeCible(e.target.value); setAddInformationData({ ...addInformationData, type: e.target.value }) }}>
                                    <option value=''>Veuillez sélectionner la cible</option>
                                    <option value='Tout le monde'>Tout le monde</option>
                                    <option value='Ville'>Ville</option>
                                    <option value='Commune'>Commune</option>
                                    <option value='Quartier'>Quartier</option>
                                </select>

                                {err?.type && <span className='error'> {err?.type} </span>}
                            </div>

                            <div className='label_select_multiple_container'>
                                {addInformationData.type === 'Ville' &&
                                    <>
                                        <label >Ville</label>
                                        {loadingTown ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allTowns?.map((town: { id: string, name: string }) => ({ value: town?.id, label: town?.name })))}
                                                onChange={el => { setAddInformationData({ ...addInformationData, diffusionItems: el }) }}
                                                isMulti
                                                value={addInformationData.diffusionItems}
                                                placeholder='Veuillez sélectionner la(es) villes'
                                                className='select_multiple'
                                                noOptionsMessage={() => (<span>Aucune autre option</span>)}
                                            />
                                        }
                                        {err?.diffusionItems && <span className='error'> {err?.diffusionItems as string} </span>}
                                    </>
                                }

                                {addInformationData.type === 'Commune' &&
                                    <>
                                        <label >Commune</label>

                                        {loadingCommune ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allCommunes?.map((commune: { id: string, name: string }) => ({ value: commune?.id, label: commune?.name })))}
                                                onChange={el => { setAddInformationData({ ...addInformationData, diffusionItems: el }) }}
                                                isMulti
                                                placeholder='Veuillez sélectionner la(es) communes'
                                                className='select_multiple'
                                                noOptionsMessage={() => (<span>Aucune autre option</span>)}
                                            />
                                        }
                                        {err?.diffusionItems && <span className='error'> {err?.diffusionItems as string} </span>}
                                    </>
                                }

                                {addInformationData.type === 'Quartier' &&
                                    <>
                                        <label >Quartier</label>

                                        {loadingQuarter ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allQuaters?.map((commune: { id: string, name: string }) => ({ value: commune?.id, label: commune?.name })))}
                                                onChange={el => { setAddInformationData({ ...addInformationData, diffusionItems: el }) }}
                                                isMulti
                                                placeholder='Veuillez sélectionner le(es) quartiers'
                                                className='select_multiple'
                                                noOptionsMessage={() => (<span>Aucune autre option</span>)}
                                            />
                                        }
                                        {err?.diffusionItems && <span className='error'> {err?.diffusionItems as string} </span>}
                                    </>
                                }
                            </div>

                            <div className='file_label_container'>
                                <label>Image mise en avant de l'information </label>
                                {previewImg &&
                                    <label htmlFor='image' className='preview_img_container'>
                                        <img src={previewImg as string} alt='image_information' />
                                    </label>
                                }
                                {err?.image && <span className='error'> {err?.image as string} </span>}
                                <div className='choose_abort_container'>
                                    <label htmlFor='image' className='choose_image'>Choisir une image
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setAddInformationData({ ...addInformationData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={addInformationData.title} onChange={e => setAddInformationData({ ...addInformationData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={addInformationData.content} onChange={e => setAddInformationData({ ...addInformationData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setPreviewImg(''); setAddNewsData(data); setAddInformationData(dataInfo); setErr(dataInfo) }}>Annuler</button>
                            </div>
                        </form>
                    }

                </div>
            </div >
    )
}

export default AddNewsInformation