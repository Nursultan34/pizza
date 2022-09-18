import React from 'react'

import s from './NotFoundBlock.module.scss'

function NotFoundBlock() {
  return (
    <div className={s.root}>
        <h1>
            Ничего не найдено
        </h1>
        <p className={s.description}>К сожалению данная страница отсутвует в нашем интернет-магазине</p>
    </div>
  )
}

export default NotFoundBlock