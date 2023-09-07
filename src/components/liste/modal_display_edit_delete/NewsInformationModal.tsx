import React, { FC, useEffect, useState } from 'react'
import { ADD_EDIT_NEWS_INFORMATION_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { RxCross2 } from 'react-icons/rx'
import Loading from '../../loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { FaUserCircle } from 'react-icons/fa'
import { validation_news_information } from '../../../utils/validation'
import { deleteNews, editNews } from '../../../redux/actions/news.actions'
import { deleteInformation, editInformation } from '../../../redux/actions/information.actions'
import { api_img } from '../../../redux/constants'
import { displayDate } from '../../../utils/functions'
import Select, { MultiValue } from 'react-select'
import { getAllTowns } from '../../../redux/actions/town.actions'
import { getAllCommunes } from '../../../redux/actions/commune.actions'
import { getAllQuarters } from '../../../redux/actions/quarter.actions'

type NEWS_INFORMATION_MODAL_TYPE = {
    type: string,
    row: COLUMN_DATA_TABLE_TYPE,
    seeModalDisplayEditDelete: boolean,
    setSeeModalDisplayEditDelete: React.Dispatch<React.SetStateAction<boolean>>,
    title: string
}

const NewsInformationModal: FC<NEWS_INFORMATION_MODAL_TYPE> = ({ row, seeModalDisplayEditDelete, setSeeModalDisplayEditDelete, title, type }) => {
    const titre = title
    const data: ADD_EDIT_NEWS_INFORMATION_TYPE = { id: '', title: '', content: '', image: '' }
    const dataInfo: ADD_EDIT_NEWS_INFORMATION_TYPE = { id: '', title: '', content: '', image: '', type: '', diffusionItems: [] }

    const [editNewsData, setEditNewsData] = useState(data)
    const [editInfoData, setEditInfoData] = useState(dataInfo)
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

        const { error, initialError } = title === 'news' ? validation_news_information(false, editNewsData) : validation_news_information(true, editInfoData)

        if (error.type !== initialError.type || error.content !== initialError.content || error.image !== initialError.image || error.title !== initialError.title || error.diffusionItems !== initialError.diffusionItems) {
            setErr(error)
        } else {
            setErr(initialError)

            if (titre === 'news') {
                const { content, image, title, id } = editNewsData

                const data = new FormData()

                data.append('title', title)
                data.append('content', content)
                if (image) {
                    if (typeof image === 'string') data.append('url', image)
                    else data.append('image', image)
                }

                id && dispatch(editNews(id, data, setSeeModalDisplayEditDelete))
            } else {
                console.log('first')
                const { content, image, title, type, diffusionItems, id } = editInfoData

                const data = new FormData()

                data.append('title', title)
                data.append('content', content)
                if (image) {
                    if (typeof image === 'string') data.append('url', image)
                    else data.append('image', image)
                }
                data.append('type', type as string)

                if (type === 'Tout le monde') data.append('diffusionItems', JSON.stringify(diffusionItems))
                else data.append('diffusionItems', JSON.stringify((diffusionItems as MultiValue<{ value: string, label: string }>)?.map((el) => ({ id: el?.value, name: el?.label }))))

                id && dispatch(editInformation(id, data, setSeeModalDisplayEditDelete))
            }
        }
    }

    useEffect(() => {
        if (title === 'news') {
            setEditNewsData({ id: row ? row.id : '', title: row ? row.title : '', content: row ? row.content : '', image: row ? row.image : '' })
        } else if (title === 'information') {
            setEditInfoData({ id: row ? row.id : '', title: row ? row.title : '', content: row ? row.content : '', image: row ? row.image : '', type: row ? row.type : '', diffusionItems: row ? (row.diffusions)?.map(zone => ({ value: zone.id, label: zone.name })) : '' })
        }
    }, [row])

    useEffect(() => {
        if (typeCible) {
            if (typeCible === 'Ville') { dispatch(getAllTowns()); setEditInfoData({ ...editInfoData, diffusionItems: [] }); }
            else if (typeCible === 'Commune') { dispatch(getAllCommunes()); setEditInfoData({ ...editInfoData, diffusionItems: [] }); }
            else if (typeCible === 'Quartier') { dispatch(getAllQuarters()); setEditInfoData({ ...editInfoData, diffusionItems: [] }); }
            else if (typeCible === 'Tout le monde') { setEditInfoData({ ...editInfoData, diffusionItems: [{ id: 'Somagep_News', name: 'Tout le monde' }] }) }

        } else { setEditInfoData({ ...editInfoData, diffusionItems: [] }) }
    }, [dispatch, typeCible])

    return (
        seeModalDisplayEditDelete ?
            <div className='modal'>
                <div className='overlay'></div>

                <div className='display_edit_delete_modal_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeModalDisplayEditDelete(false); setPreviewImg(''); setErr(data) }} />

                    <div className='loading_container'>
                        {(loadingInfo || loadingNews) && <Loading h_w={40} hide_text mg='0px' padding='0px' />}
                    </div>

                    <div className='icon_name'>
                        <div className='icon_name_container'>
                            <FaUserCircle className='icon' />
                            <p> {title === 'news' ? 'ACTUALITÉ' : 'INFORMATION'} </p>
                        </div>
                    </div>

                    {type === 'afficher' &&
                        <div className='display_information news_information'>
                            <div className='container'>
                                {row?.image &&
                                    <div className='information_container'>
                                        <span className='title'>Image mise en avant de l'{title === 'news' ? 'actualité' : 'information'}</span>
                                        <div className='value img_container'>
                                            <img src={`${api_img}/${row?.image}`} alt={title === 'news' ? 'image_actualité' : 'image_information'} />
                                        </div>
                                    </div>
                                }

                                <div className='information_container'>
                                    <span className='title'>Titre</span>
                                    <span className='value'> {row?.title} </span>
                                </div>

                                <div className='information_container'>
                                    <span className='title'>Contenu</span>
                                    <span className='value content'> {row?.content} </span>
                                </div>

                                {title === 'information' &&
                                    <>
                                        <div className='information_container'>
                                            <span className='title'>Type de diffusion</span>
                                            <span className='value'> {row?.type} </span>
                                        </div>

                                        {row?.type !== 'Tout le monde' &&
                                            <div className='information_container'>
                                                <span className='title'>Zone de diffusion</span>
                                                <span className='value'> {row?.diffusions?.map((zone, i) => <span key={i}> {zone?.name}, </span>)} </span>
                                            </div>
                                        }
                                    </>
                                }

                                <div className='information_container'>
                                    <span className='title'>Date de dernière modification</span>
                                    <span className='value'> {displayDate(row?.updatedAt)} </span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'modifier' && title === 'news' &&
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='file_label_container'>
                                <label>Image mise en avant de l'actualité</label>
                                {previewImg ?
                                    <label htmlFor='image' className='preview_img_container'>
                                        <img src={previewImg as string} alt='image_actualité' />
                                    </label> : editNewsData.image &&
                                    <label htmlFor='image' className='img_container'>
                                        <img src={`${api_img}/${row?.image}`} alt='image_actualité' />
                                    </label>
                                }
                                {err?.image && <span className='error'> {err?.image as string} </span>}
                                <div className='choose_abort_container'>
                                    <label htmlFor='image' className='choose_image'>Choisir une image
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setEditNewsData({ ...editNewsData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                    {!previewImg && editNewsData.image && <span className='abort' onClick={() => { setEditNewsData({ ...editNewsData, image: '' }) }}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={editNewsData.title} onChange={e => setEditNewsData({ ...editNewsData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={editNewsData.content} onChange={e => setEditNewsData({ ...editNewsData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false); setPreviewImg(''); setErr(data); }}>Annuler</button>
                            </div>
                        </form>
                    }

                    {type === 'modifier' && title === 'information' &&
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='select_label_container'>
                                <label htmlFor='type'>Cible</label>

                                <select name='type' id='type' value={editInfoData?.type} onChange={e => { setTypeCible(e.target.value); setEditInfoData({ ...editInfoData, type: e.target.value }) }}>
                                    <option value=''>Veuillez sélectionner la cible</option>
                                    <option value='Tout le monde'>Tout le monde</option>
                                    <option value='Ville'>Ville</option>
                                    <option value='Commune'>Commune</option>
                                    <option value='Quartier'>Quartier</option>
                                </select>

                                {err?.type && <span className='error'> {err?.type} </span>}
                            </div>

                            <div className='label_select_multiple_container'>
                                {editInfoData?.type === 'Ville' &&
                                    <>
                                        <label >Ville</label>

                                        {loadingTown ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allTowns?.map((town: { id: string, name: string }) => ({ value: town?.id, label: town?.name })))}
                                                onChange={el => { setEditInfoData({ ...editInfoData, diffusionItems: el }) }}
                                                value={editInfoData?.diffusionItems}
                                                isMulti
                                                placeholder='Veuillez sélectionner la(es) villes'
                                                className='select_multiple'
                                                noOptionsMessage={() => (<span>Aucune autre option</span>)}
                                            />
                                        }
                                        {err?.diffusionItems && <span className='error'> {err?.diffusionItems as string} </span>}
                                    </>
                                }

                                {editInfoData?.type === 'Commune' &&
                                    <>
                                        <label >Commune</label>

                                        {loadingCommune ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allCommunes?.map((commune: { id: string, name: string }) => ({ value: commune?.id, label: commune?.name })))}
                                                onChange={el => { setEditInfoData({ ...editInfoData, diffusionItems: el }) }}
                                                value={editInfoData?.diffusionItems}
                                                isMulti
                                                placeholder='Veuillez sélectionner la(es) communes'
                                                className='select_multiple'
                                                noOptionsMessage={() => (<span>Aucune autre option</span>)}
                                            />
                                        }
                                        {err?.diffusionItems && <span className='error'> {err?.diffusionItems as string} </span>}
                                    </>
                                }

                                {editInfoData?.type === 'Quartier' &&
                                    <>
                                        <label >Quartier</label>

                                        {loadingQuarter ? <Loading hide_text padding='0px' mg='0px' h_w={30} /> :
                                            <Select
                                                options={(allQuaters?.map((commune: { id: string, name: string }) => ({ value: commune?.id, label: commune?.name })))}
                                                onChange={el => { setEditInfoData({ ...editInfoData, diffusionItems: el }) }}
                                                value={editInfoData?.diffusionItems}
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
                                <label>Image mise en avant de l'information</label>
                                {previewImg ?
                                    <label htmlFor='image' className='preview_img_container'>
                                        <img src={previewImg as string} alt='image_information' />
                                    </label> : editInfoData.image &&
                                    <label htmlFor='image' className='img_container'>
                                        <img src={`${api_img}/${row?.image}`} alt='image_information' />
                                    </label>
                                }
                                {err?.image && <span className='error'> {err?.image as string} </span>}
                                <div className='choose_abort_container'>
                                    <label htmlFor='image' className='choose_image'>Choisir une image
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setEditInfoData({ ...editInfoData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                    {!previewImg && editInfoData.image && <span className='abort' onClick={() => { setEditInfoData({ ...editInfoData, image: '' }) }}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={editInfoData.title} onChange={e => setEditInfoData({ ...editInfoData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={editInfoData.content} onChange={e => setEditInfoData({ ...editInfoData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false); setPreviewImg(''); setErr(data); }}>Annuler</button>
                            </div>
                        </form>
                    }

                    {type === 'supprimer' && title === 'news' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette actualité ? </p>

                                <div className='yes_or_no_container'>
                                    <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} className='yes' onClick={() => { dispatch(deleteNews(row?.id, setSeeModalDisplayEditDelete)) }}>OUI</button>
                                    <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'supprimer' && title === 'information' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette  information ? </p>

                                <div className='yes_or_no_container'>
                                    <button className='yes' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => { dispatch(deleteInformation(row?.id, setSeeModalDisplayEditDelete)) }}>OUI</button>
                                    <button className='no' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => setSeeModalDisplayEditDelete(false)}>NON</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default NewsInformationModal