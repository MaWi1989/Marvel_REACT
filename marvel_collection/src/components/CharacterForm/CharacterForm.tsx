import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseComics, chooseDescription, chooseFirst, chooseName, choosePowers, chooseSeries, chooseYear } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface CharacterFormProps {
    id?:string;
    data?:{}
}

interface CharacterState {
    name: string;
}

export const CharacterForm = (props:CharacterFormProps) => {

    const dispatch = useDispatch();
    let { characterData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<CharacterState>(state => state.name)
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseDescription(data.description))
            dispatch(chooseSeries(data.series))
            dispatch(choosePowers(data.powers))
            dispatch(chooseComics(data.comics_appeared_in))
            dispatch(chooseFirst(data.first_appeared_in))
            dispatch(chooseYear(data.year_introduced))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Character Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description"/>
                </div>
                <div>
                    <label htmlFor="series">Series</label>
                    <Input {...register('series')} name="series" placeholder="Series"/>
                </div>
                <div>
                    <label htmlFor="powers">Super Powers</label>
                    <Input {...register('powers')} name="powers" placeholder="Super Powers"/>
                </div>
                <div>
                    <label htmlFor="comics_appeared_in">Comics appeared in</label>
                    <Input {...register('comics_appeared_in')} name="comics_appeared_in" placeholder="Comics appeared in"/>
                </div>
                <div>
                    <label htmlFor="first_appeared_in">first appeared in</label>
                    <Input {...register('first_appeared_in')} name="first_appeared_in" placeholder="first appeared in"/>
                </div>
                <div>
                    <label htmlFor="year_introduced">Year Introduced</label>
                    <Input {...register('year_introduced')} name="year_introduced" placeholder="Year Introduced"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}