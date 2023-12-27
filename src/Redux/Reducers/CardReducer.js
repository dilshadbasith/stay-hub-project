import { createSlice } from "@reduxjs/toolkit";
import {list} from '../../Components/Assets/CardsLists'

export const CardSlice=createSlice({
    name:"Cardslice",
    initialState:[...list],
    reducer:{
        AddCard:(state,action)=>{
            if (action.payload){
                state.push(action.payload)
            }else{
                return state
            }
        }
    }
})

export const {AddCard}=CardSlice.actions
export default CardSlice.reducer