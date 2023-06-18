import React, { FC } from 'react'

type strNum = string | number

const Loading: FC<{ padding?: strNum, h_w?: strNum, hide_text?: boolean }> = ({ padding, h_w, hide_text }) =>
(
    <div className='loading' style={{ padding: padding ? padding : 20 }}>
        <div className='container' style={{ height: h_w ? h_w : 70, width: h_w ? h_w : 70 }}></div>

        {!hide_text ? <div>Chargement en cours...</div> : <></>}
    </div>
)

export default Loading