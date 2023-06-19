import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../../redux/store'
import { ADD_EDIT_NEWS_INFORMATION_TYPE, PAGE_COMPONENT_TYPE } from '../../../../utils/types'
import { toast } from 'react-toastify'
import { RxCross2 } from 'react-icons/rx'
import { FaUserCircle } from 'react-icons/fa'
import { api_img } from '../../../../redux/constants'
import { deleteNews, editNews } from '../../../../redux/actions/news.actions'
import { validation_news } from '../../../../utils/validation'
import { deleteInformation, editInformation } from '../../../../redux/actions/information.actions'
import { displayDate } from '../../../../utils/functions'
import Loading from '../../../loading/Loading'

const NewActionFitre: PAGE_COMPONENT_TYPE = ({ title, nbSelectedRow, ElementSelected, setEmptyRowSelected, setElementSelected }) => {
    const titre = title
    const data: ADD_EDIT_NEWS_INFORMATION_TYPE = { id: '', title: '', content: '', image: '' }

    const [chooseAction, setChooseAction] = useState('')
    const [seeModalDisplayEditDelete, setSeeModalDisplayEditDelete] = useState(false)
    const [editNewsInformationData, setEditNewsInformationData] = useState(data)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<ADD_EDIT_NEWS_INFORMATION_TYPE>()

    const { allNews, loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { allInformations, loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const dispatch = useDispatch<any>()

    const handleChooseAction = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (chooseAction) {
            setEmptyRowSelected && setEmptyRowSelected(false)
            if (chooseAction === 'afficher') {
                setSeeModalDisplayEditDelete(true)
                if (title === 'news') {
                    allNews?.forEach((news_information: any) => {
                        if (ElementSelected && ElementSelected.length === 1 && news_information?.id === ElementSelected[0].id) ElementSelected[0] = news_information
                    })
                } else {
                    allInformations?.forEach((news_information: any) => {
                        if (ElementSelected && ElementSelected.length === 1 && news_information?.id === ElementSelected[0].id) ElementSelected[0] = news_information
                    })
                }
            } else if (chooseAction === 'modifier') {
                setSeeModalDisplayEditDelete(true)
                if (title === 'news') {
                    allNews?.forEach((news_information: any) => {
                        if (ElementSelected && ElementSelected.length === 1 && news_information?.id === ElementSelected[0].id) ElementSelected[0] = news_information
                    })
                } else {
                    allInformations?.forEach((news_information: any) => {
                        if (ElementSelected && ElementSelected.length === 1 && news_information?.id === ElementSelected[0].id) ElementSelected[0] = news_information
                    })
                }
            } else if (chooseAction === 'supprimer') {
                if (ElementSelected) {
                    if (ElementSelected.length !== 0)
                        setSeeModalDisplayEditDelete(true)
                    else {
                        if (title === 'news') toast.warn('Veuillez selectionner une actualité')
                        else toast.warn('Veuillez selectionner une information')
                    }
                }
            }
        } else {
            setEmptyRowSelected && setEmptyRowSelected(false)
            toast.warn('Veuillez selectionner une action à effectuer')
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_news(editNewsInformationData)

        if (error.content !== initialError.content || error.image !== initialError.image || error.title !== initialError.title) {
            setErr(error)
        } else {
            const { content, image, title, id } = editNewsInformationData
            setErr(initialError)

            const data = new FormData()

            data.append('title', title)
            data.append('content', content)
            if (image) data.append('image', image)

            if (titre === 'news') {
                id && dispatch(editNews(id, data, setSeeModalDisplayEditDelete))
            } else {
                id && dispatch(editInformation(id, data, setSeeModalDisplayEditDelete))
            }
        }
    }

    useEffect(() => {
        localStorage.setItem('choose_action', '')
    }, [])

    useEffect(() => {
        ElementSelected && setEditNewsInformationData({ id: ElementSelected[0]?.id, title: ElementSelected[0]?.title, content: ElementSelected[0]?.content, image: ElementSelected[0]?.image })
    }, [chooseAction, ElementSelected])

    return (
        <div className='action_filtre'>
            {seeModalDisplayEditDelete &&
                <div className='display_edit_delete_modal'>
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

                        {chooseAction && chooseAction === 'afficher' &&
                            ElementSelected?.map((news_information, i) => (
                                <div key={i} className='display_information news_information'>
                                    <div className='container'>
                                        {news_information.image &&
                                            <div className='information_container'>
                                                <span className='title'>Image mise en avant de l'{title === 'news' ? 'actualité' : 'information'}</span>
                                                <div className='value img_container'>
                                                    <img src={`${api_img}/${news_information.image}`} alt={title === 'news' ? 'image_actualité' : 'image_information'} />
                                                </div>
                                            </div>
                                        }

                                        <div className='information_container'>
                                            <span className='title'>Titre</span>
                                            <span className='value'> {news_information.title} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Contenu</span>
                                            <span className='value content'> {news_information.content} </span>
                                        </div>

                                        <div className='information_container'>
                                            <span className='title'>Date de dernière modification</span>
                                            <span className='value'> {displayDate(news_information.updatedAt)} </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                        {chooseAction && chooseAction === 'modifier' &&
                            ElementSelected?.map((news_information, i) => (
                                title === 'news' ?
                                    <form key={i} onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <div className='file_label_container'>
                                            <label>Image mise en avant de l'actualité</label>
                                            {previewImg ?
                                                <label htmlFor='image' className='preview_img_container'>
                                                    <img src={previewImg as string} alt='image_actualité' />
                                                </label> : editNewsInformationData.image &&
                                                <label htmlFor='image' className='img_container'>
                                                    <img src={`${api_img}/${news_information.image}`} alt='image_actualité' />
                                                </label>
                                            }
                                            {err?.image && <span className='error'> {err?.image as string} </span>}
                                            <div className='choose_abort_container'>
                                                <label htmlFor='image' className='choose_image'>Choisir une image
                                                    <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setEditNewsInformationData({ ...editNewsInformationData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                                </label>
                                                {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                                {!previewImg && editNewsInformationData.image && <span className='abort' onClick={() => { setEditNewsInformationData({ ...editNewsInformationData, image: '' }) }}>Retirer</span>}
                                            </div>
                                        </div>

                                        <div className='input_label_container'>
                                            <label htmlFor='title'>Titre</label>
                                            <input type='text' name='title' id='title' value={editNewsInformationData.title} onChange={e => setEditNewsInformationData({ ...editNewsInformationData, title: e.target.value })} />
                                            {err?.title && <span className='error'> {err?.title} </span>}
                                        </div>

                                        <div className='textarea_label_container'>
                                            <label htmlFor='content'>Contenu</label>
                                            <textarea name='content' id='content' value={editNewsInformationData.content} onChange={e => setEditNewsInformationData({ ...editNewsInformationData, content: e.target.value })}></textarea>
                                            {err?.content && <span className='error'> {err?.content} </span>}
                                        </div>

                                        <div className='save_abort'>
                                            <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                            <button type='reset' className='abort' disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false); setPreviewImg(''); setErr(data); }}>Annuler</button>
                                        </div>
                                    </form>
                                    :
                                    <form key={i} onSubmit={handleSubmit} encType='multipart/form-data'>
                                        <div className='file_label_container'>
                                            <label>Image mise en avant de l'information</label>
                                            {previewImg ?
                                                <label htmlFor='image' className='preview_img_container'>
                                                    <img src={previewImg as string} alt='image_information' />
                                                </label> : editNewsInformationData.image &&
                                                <label htmlFor='image' className='img_container'>
                                                    <img src={`${api_img}/${news_information.image}`} alt='image_information' />
                                                </label>
                                            }
                                            {err?.image && <span className='error'> {err?.image as string} </span>}
                                            <div className='choose_abort_container'>
                                                <label htmlFor='image' className='choose_image'>Choisir une image
                                                    <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setEditNewsInformationData({ ...editNewsInformationData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                                </label>
                                                {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                                {!previewImg && editNewsInformationData.image && <span className='abort' onClick={() => { setEditNewsInformationData({ ...editNewsInformationData, image: '' }) }}>Retirer</span>}
                                            </div>
                                        </div>

                                        <div className='input_label_container'>
                                            <label htmlFor='title'>Titre</label>
                                            <input type='text' name='title' id='title' value={editNewsInformationData.title} onChange={e => setEditNewsInformationData({ ...editNewsInformationData, title: e.target.value })} />
                                            {err?.title && <span className='error'> {err?.title} </span>}
                                        </div>

                                        <div className='textarea_label_container'>
                                            <label htmlFor='content'>Contenu</label>
                                            <textarea name='content' id='content' value={editNewsInformationData.content} onChange={e => setEditNewsInformationData({ ...editNewsInformationData, content: e.target.value })}></textarea>
                                            {err?.content && <span className='error'> {err?.content} </span>}
                                        </div>

                                        <div className='save_abort'>
                                            <button disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                            <button type='reset' className='abort' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeModalDisplayEditDelete(false); setPreviewImg(''); setErr(data); }}>Annuler</button>
                                        </div>
                                    </form>
                            ))
                        }

                        {chooseAction && chooseAction === 'supprimer' &&
                            ElementSelected?.map((news_information, i) => (
                                title === 'news' ?
                                    <div key={i} className='delete'>
                                        <div className='container'>
                                            <p> Voulez-vous vraiment supprimer cette actualité ? </p>

                                            <div className='yes_or_no_container'>
                                                <span className='yes' onClick={() => { dispatch(deleteNews(news_information.id, setSeeModalDisplayEditDelete, setEmptyRowSelected)); if (allNews.length === 1) { setChooseAction(''); localStorage.setItem('choose_action', '') } setElementSelected && setElementSelected([]); }}>OUI</span>
                                                <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div key={i} className='delete'>
                                        <div className='container'>
                                            <p> Voulez-vous vraiment supprimer cette  information ? </p>

                                            <div className='yes_or_no_container'>
                                                <span className='yes' onClick={() => { dispatch(deleteInformation(news_information.id, setSeeModalDisplayEditDelete, setEmptyRowSelected)); if (allInformations.length === 1) { setChooseAction(''); localStorage.setItem('choose_action', '') } setElementSelected && setElementSelected([]); }}>OUI</span>
                                                <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                            </div>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>
                </div>
            }

            <div className='form_filtre'>
                {nbSelectedRow && nbSelectedRow <= 1 ?
                    <form className='action' onSubmit={handleChooseAction}>
                        <select name='action' id='action' value={(localStorage.getItem('choose_action') && localStorage.getItem('choose_action')) as string} onChange={e => { setChooseAction(e.target.value); localStorage.setItem('choose_action', e.target.value) }}>
                            <option value=''>Chosir une action</option>
                            <option value='afficher'>Afficher</option>
                            <option value='modifier'>Modifier</option>
                            <option value='supprimer'>Supprimer</option>
                        </select>
                        <button>Appliquer</button>
                    </form> :
                    <form className='action' onSubmit={e => { e.preventDefault(); title === 'news' ? toast.warn('Veuillez selectionner au plus une seule actualité') : toast.warn('Veuillez selectionner au plus une seule information') }}>
                        <select name='action' id='action'>
                            <option value=''>Veuillez selectionner au plus une seule {title === 'news' ? 'actualité' : 'information'}</option>
                        </select>
                        <button>Appliquer</button>
                    </form>
                }
            </div>

            <span className='nb_elements'>{title === 'news' ? allNews.length : allInformations.length} éléments</span>
        </div>
    )
}

export default NewActionFitre