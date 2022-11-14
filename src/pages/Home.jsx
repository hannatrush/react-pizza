import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setPageCount } from '../redux/slices/filterSlice';
import Categories from '../scss/components/Categories';
import Sort from '../scss/components/Sort';
import PizzaBlock from '../scss/components/PizzaBlock';
import Skeleton from '../scss/components/PizzaBlock/skeleton';
import Pagination from '../scss/components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const {categoryId, sort, pageCount} = useSelector(state => state.filter);

    const {searchValue} = React.useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
      dispatch(setPageCount(number))
    };
  
   useEffect( () => {
    setIsLoading(true); 

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    axios.get(`https://6304d33c761a3bce77f07e90.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `)
      .then(({data}) => {
        if (data) {
          setItems(data);
        setIsLoading(false);
        }
        
      })

    window.scrollTo(0, 0);
  },[categoryId, sort.sortProperty, searchValue, pageCount]);
  
  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }).map((obj) => <PizzaBlock key = {obj.id} {...obj}/>);
  const skeletons = [...new Array(6)].map((_, index ) => <Skeleton key = {index}/>);

  return (
<div className='container'>
  <div className="content__top">
    <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
    <Sort />
  </div>
  <h2 className="content__title">All pizzas</h2>
  <div className="content__items">
    { isLoading ? skeletons : pizzas }
  </div>
  <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
</div>
  )
}

export default Home;
