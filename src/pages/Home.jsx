import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setPageCount, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../scss/components/Categories';
import Sort, { list } from '../scss/components/Sort';
import PizzaBlock from '../scss/components/PizzaBlock';
import Skeleton from '../scss/components/PizzaBlock/skeleton';
import Pagination from '../scss/components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  
  const { items, status } = useSelector(selectPizzaData);
  const {categoryId, sort, pageCount, searchValue} = useSelector(selectFilter);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setPageCount(number))
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue > 0 ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      pageCount
    }));  

    window.scrollTo(0, 0);
  }

  useEffect( () => {
    getPizzas();
  },[categoryId, sort.sortProperty, searchValue, pageCount]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      pageCount
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, pageCount]);

  useEffect(() => {
    if (isMounted) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({...params, sort}));
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount]);

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }).map((obj) => (<PizzaBlock key = {obj.id} {...obj}/>));
  const skeletons = [...new Array(6)].map((_, index ) => <Skeleton key = {index}/>);

  return (
<div className='container'>
  <div className="content__top">
    <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
    <Sort value={sort}/>
  </div>
  <h2 className="content__title">All pizzas</h2>
  {
    status === 'error' ? <div className='content__error-info'>
      <h2>Error</h2>
      <p>Something went wrong. Try again later.</p>
    </div> : (<div className="content__items">
      { status === 'loading' ? skeletons : pizzas }
    </div>
  )}
  <Pagination pageCount={pageCount} onChangePage={onChangePage}/>
</div>
  )
}

export default Home;
