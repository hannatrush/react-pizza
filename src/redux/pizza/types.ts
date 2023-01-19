export type Pizza = {
    id:number;
    title: string;
    price: number;
    imageUrl: string;
    sizes:number[];
    types: number[];
}

export type SearchPizzaParams = {
    order:string; 
    sortBy:string; 
    category:string; 
    search:string; 
    pageCount:string;
}

export interface PizzaSliceState {
    items: Pizza[];
    status: 'loading' | 'success' | 'error';
 }