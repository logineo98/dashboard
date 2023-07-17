import React, { FC, useEffect, useState } from 'react'
import { ADD_EDIT_NEWS_INFORMATION_TYPE, COLUMN_DATA_TABLE_TYPE } from '../../../utils/types'
import { RxCross2 } from 'react-icons/rx'
import Loading from '../../loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../redux/store'
import { FaUserCircle } from 'react-icons/fa'
import { validation_news } from '../../../utils/validation'
import { deleteNews, editNews } from '../../../redux/actions/news.actions'
import { deleteInformation, editInformation } from '../../../redux/actions/information.actions'
import { api_img } from '../../../redux/constants'
import { displayDate } from '../../../utils/functions'

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

    const [editNewsInformationData, setEditNewsInformationData] = useState(data)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<ADD_EDIT_NEWS_INFORMATION_TYPE>()

    const { loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const dispatch = useDispatch<any>()

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
            if (image) {
                if (typeof image === 'string') data.append('url', image)
                else data.append('image', image)
            }

            if (titre === 'news') {
                id && dispatch(editNews(id, data, setSeeModalDisplayEditDelete))
            } else {
                id && dispatch(editInformation(id, data, setSeeModalDisplayEditDelete))
            }
        }
    }

    useEffect(() => {
        setEditNewsInformationData({ id: row ? row.id : '', title: row ? row.title : '', content: row ? row.content : '', image: row ? row.image : '' })
    }, [row])

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
                                    </label> : editNewsInformationData.image &&
                                    <label htmlFor='image' className='img_container'>
                                        <img src={`${api_img}/${row?.image}`} alt='image_actualité' />
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
                    }

                    {type === 'modifier' && title === 'information' &&
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='file_label_container'>
                                <label>Image mise en avant de l'actualité</label>
                                {previewImg ?
                                    <label htmlFor='image' className='preview_img_container'>
                                        <img src={previewImg as string} alt='image_actualité' />
                                    </label> : editNewsInformationData.image &&
                                    <label htmlFor='image' className='img_container'>
                                        <img src={`${api_img}/${row?.image}`} alt='image_actualité' />
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
                    }

                    {type === 'supprimer' && title === 'news' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette actualité ? </p>

                                <div className='yes_or_no_container'>
                                    <span className='yes' onClick={() => { dispatch(deleteNews(row?.id, setSeeModalDisplayEditDelete)) }}>OUI</span>
                                    <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'supprimer' && title === 'information' &&
                        <div className='delete'>
                            <div className='container'>
                                <p> Voulez-vous vraiment supprimer cette  information ? </p>

                                <div className='yes_or_no_container'>
                                    <span className='yes' onClick={() => { dispatch(deleteInformation(row?.id, setSeeModalDisplayEditDelete)) }}>OUI</span>
                                    <span className='no' onClick={() => setSeeModalDisplayEditDelete(false)}>NON</span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div> : <></>
    )
}

export default NewsInformationModal