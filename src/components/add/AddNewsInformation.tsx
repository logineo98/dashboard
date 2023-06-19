import React, { useState } from 'react'
import { ADD_EDIT_NEWS_INFORMATION_TYPE, PAGE_COMPONENT_TYPE } from '../../utils/types'
import { FaUserCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { validation_news } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../../redux/actions/news.actions';
import { addInformation } from '../../redux/actions/information.actions';
import { RootReducerType } from '../../redux/store';
import Loading from '../loading/Loading';

const AddNewsInformation: PAGE_COMPONENT_TYPE = ({ title, seeAddNewsInformation, setSeeAddNewsInformation }) => {

    const data: ADD_EDIT_NEWS_INFORMATION_TYPE = { title: '', content: '', image: '' }
    const titre = title

    const [addNewsInformationData, setAddNewsInformationData] = useState(data)
    const [previewImg, setPreviewImg] = useState<string | File>('')
    const [err, setErr] = useState<ADD_EDIT_NEWS_INFORMATION_TYPE>()

    const { loadingNews } = useSelector((state: RootReducerType) => state.news)
    const { loadingInfo } = useSelector((state: RootReducerType) => state.information)
    const dispatch = useDispatch<any>()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { error, initialError } = validation_news(addNewsInformationData)

        if (error.content !== initialError.content || error.image !== initialError.image || error.title !== initialError.title) {
            setErr(error)
        } else {
            const { content, image, title } = addNewsInformationData
            setErr(initialError)

            const data = new FormData()

            data.append('title', title)
            data.append('content', content)
            if (image) data.append('image', image)

            if (titre === 'news') {
                dispatch(addNews(data as any, setAddNewsInformationData, setPreviewImg))
            } else {
                dispatch(addInformation(data as any, setAddNewsInformationData, setPreviewImg))
            }
        }
    }

    return (
        !seeAddNewsInformation ? <></> :
            <div className='add'>
                <div className='overlay'></div>

                <div className='add_container'>
                    <RxCross2 className='croix' onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setAddNewsInformationData(data); setErr(data) }} />

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
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setAddNewsInformationData({ ...addNewsInformationData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={addNewsInformationData.title} onChange={e => setAddNewsInformationData({ ...addNewsInformationData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={addNewsInformationData.content} onChange={e => setAddNewsInformationData({ ...addNewsInformationData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingNews ? true : false} style={{ cursor: loadingNews ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setPreviewImg(''); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
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
                                        <input type='file' accept='.jpg, .jpeg, .png' name='image' id='image' onChange={e => { setAddNewsInformationData({ ...addNewsInformationData, image: e.target.files ? e.target.files[0] : '' }); if (e.target.files && e.target.files.length !== 0) { setPreviewImg(URL.createObjectURL(e.target.files[0])); } else { setPreviewImg('') } }} />
                                    </label>
                                    {previewImg && <span className='abort' onClick={() => setPreviewImg('')}>Retirer</span>}
                                </div>
                            </div>

                            <div className='input_label_container'>
                                <label htmlFor='title'>Titre</label>
                                <input type='text' name='title' id='title' value={addNewsInformationData.title} onChange={e => setAddNewsInformationData({ ...addNewsInformationData, title: e.target.value })} />
                                {err?.title && <span className='error'> {err?.title} </span>}
                            </div>

                            <div className='textarea_label_container'>
                                <label htmlFor='content'>Contenu</label>
                                <textarea name='content' id='content' value={addNewsInformationData.content} onChange={e => setAddNewsInformationData({ ...addNewsInformationData, content: e.target.value })}></textarea>
                                {err?.content && <span className='error'> {err?.content} </span>}
                            </div>

                            <div className='save_abort'>
                                <button disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }}>Enregistrer</button>
                                <button type='reset' className='abort' disabled={loadingInfo ? true : false} style={{ cursor: loadingInfo ? 'not-allowed' : 'pointer' }} onClick={() => { setSeeAddNewsInformation && setSeeAddNewsInformation(false); setPreviewImg(''); setErr(data) }}>Annuler</button>
                            </div>
                        </form>
                    }

                </div>
            </div >
    )
}

export default AddNewsInformation