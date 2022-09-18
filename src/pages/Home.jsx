import qs from 'qs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Catagories from '../components/Catagories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock/index';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/Slice/filterSlice';
import { fetchUserById } from '../redux/Slice/pizzaSlice';


function Home({searchValue,setSearchValue}) {
  const isMount = React.useRef(false)
  const isSearch = React.useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {items,status} = useSelector((state) => state.pizza)
  const {categoryId,sort,currentPage} = useSelector((state) => state.filter)

  

const onChangeCount = (number) => {
  dispatch(setCurrentPage(number))
}


 const onChangeCategory = React.useCallback((idx) =>  {
   dispatch(setCategoryId(idx))
 },[])
 const fetchPizzas  =  async () => {
  const sortBy = sort.sortProperty.replace('-', '')
  const category =  categoryId > 0 ? `category=${categoryId}`: '' ;
  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : ``;



  dispatch(fetchUserById({
    sortBy,
    order,
    category,
    search,
  }))

 }

 React.useEffect(() => {
   if(window.location.search){
     const params = qs.parse(window.location.search.substring(1))

     const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

     dispatch(
      setFilters({
        ...params,
        sort
      }),
     );
     isSearch.current = true
   }
 },[])
 

  React.useEffect(()=> {
      fetchPizzas()
  },[categoryId,sort.sortProperty,searchValue ])

  React.useEffect (() => {
    if(isMount.current){
   const queryString = qs.stringify({
     sortProperty: sort.sortProperty,
     categoryId,
     currentPage,
     
   })
   navigate(`?${queryString}`)
  }
   isMount.current = true
  },[categoryId,sort.sortProperty,currentPage])
  const pizzas =  items
  .filter((obj) => {
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true;
    }
    return false
  })
  .map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  return (
    <>
    <div className="content__top">
           <Catagories value={categoryId} onClickCategory={(i) => onChangeCategory(i)}/>
           <Sort />  
          </div>
          <h2 className='content__title'>Все пиццы</h2>
       
          {status === 'error' ? (
             <div className="content__error-info">
             <h2>Произошла ошибка 😕</h2>
             <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
           </div>
            ) : (
              <div className="content-items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
        
       <Pagination currentPage={currentPage} onChangePage={onChangeCount}/>
    </>
  )
}

export default Home