import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserById = createAsyncThunk(
    'pizza/fetchByIdStatus', async (params) => {
        const {sortBy,order,category ,search} = params
        const {data} = await axios.get(`https://629f6e868b939d3dc297b635.mockapi.io/pizzas?category?${category} &sortBy=${sortBy}&order=${order}&search=${search}`);
      return data
    }
  )
  const initialState = {
    items: [], 
    status: 'loading',
 };
 
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state,action) {
        state.items = action.payload

    },
  },
  extraReducers: {
    [fetchUserById.pending]: (state) => {
        state.status = 'loading'
       } ,
    [fetchUserById.fulfilled]: (state,action) => {
    state.items = action.payload
     state.status = 'success'
    } ,
    [fetchUserById.rejected]: (state,action) => {
        state.items = []
        state.status = 'error'
       } ,

  }

})


export const {setItems} = pizzaSlice.actions

export default pizzaSlice.reducer;