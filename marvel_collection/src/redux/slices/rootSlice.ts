import { createSlice } from '@reduxjs/toolkit';

interface CharacterState {
    name: string,
    description: string,
    series: string,
    powers: string,
    comics_appeared_in: number,
    first_appeared_in: string,
    year_introduced: number
}


const initialState: CharacterState = {
    name: 'Spider-Man',
    description: '',
    series: '',
    powers: '',
    comics_appeared_in: 0,
    first_appeared_in: '',
    year_introduced: 0,
}


const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseName: (state, action) => { state.name = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        chooseSeries: (state, action) => { state.series = action.payload },
        choosePowers: (state, action) => { state.powers = action.payload },
        chooseComics: (state, action) => { state.comics_appeared_in = action.payload },
        chooseFirst: (state, action) => { state.first_appeared_in = action.payload },
        chooseYear: (state, action) => { state.year_introduced = action.payload },
    }
})



export const reducer = rootSlice.reducer;
export const {
    chooseName,
    chooseDescription,
    chooseSeries,
    choosePowers,
    chooseComics,
    chooseFirst,
    chooseYear,
} = rootSlice.actions;