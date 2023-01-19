import React, { useEffect } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

import { useIsMount } from '../hooks';

import { setCategoryId, setPageCount, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';

import Categories from '../components/Categories';
import SortPopup, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/skeleton';
import Pagination from '../components/Pagination';

import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMount = useIsMount();
  
  const { items, status } = useSelector(selectPizzaData);
  const {categoryId, sort, pageCount, searchValue} = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((id:  number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setPageCount(page))
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue.length > 0 ? `&search=${searchValue}` : '';
    // const category = categoryId > 0 ? String(categoryId) : '';
    // const search = searchValue;

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      pageCount: String(pageCount)
    }));  

    window.scrollTo(0, 0);
  }

  useEffect( () => {
    getPizzas();
  },[categoryId, sort.sortProperty, searchValue, pageCount]);

  // useEffect(() => {
  //     if (isMount) {
  //       return;
  //     }
  //     const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       searchValue: params.search,
  //       categoryId: Number(params.category),
  //       pageCount: Number(params.pageCount),
  //       sort: sort || list[0]
  //     }));

  // }, [categoryId, sort.sortProperty, pageCount]);


  // useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     pageCount
  //   });

  //   navigate(`?${queryString}`);
  // }, [categoryId, sort.sortProperty, pageCount]);

 

  const pizzas = items.filter((obj: any) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }).map((obj: any) => (<PizzaBlock key = {obj.id} {...obj}/>));
  const skeletons = [...new Array(6)].map((_, index ) => <Skeleton key = {index}/>);

  return (
<div className='container'>
  <div className="content__top">
    <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
    <SortPopup value={sort}/>
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
