import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/Slice/filterSlice';



export const list = [
  { name: 'популярности (DESC)', sortProperty: 'rating'  },
  { name: 'популярности (ASC)', sortProperty: '-rating'  },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title'  },
]

function Sort({value,onChangeSort}){
  const sortRef = React.useRef()
  const dispatch = useDispatch()
    const sort = useSelector((state) => state.filter.sort)
    const [openPopup,setOpenPopup] = React.useState(false)

    
   
    const onClickLisItem = (obj) => {
      dispatch(setSort(obj))
       setOpenPopup(false)
    }

    React.useEffect(() => {
     const handletoogle =  (event) => {
       if(!event.path.includes(sortRef.current)) {
         setOpenPopup(false)
       }
     }
     document.body.addEventListener('click', handletoogle )
     return() => document.body.removeEventListener('click', handletoogle)
    },[])
    


  return (
    <div ref={sortRef} className="sort">
    <div className="sort__label">
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
          fill="#2C2C2C"
        />
      </svg>
      <b>Сортировка по:</b>
      <span onClick={() => setOpenPopup(!openPopup)}>{sort.name}</span>
    </div>
    {openPopup && (
        <div className="sort__popup">
      <ul>
          {list.map((obj , i) => (
            <li key={i} onClick={() => onClickLisItem(obj) } className={sort.sortProperty === obj.sortProperty ? 'active':''}>{obj.name}</li>
          ))}
        
      </ul>
    </div>
    )}
    
  </div>
  )
}

export default Sort