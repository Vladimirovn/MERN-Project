import React, { useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const message = useMessage()
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({email: '', password: ''})

    useEffect( () => {
        message(error)
    }, [error, message])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value}) 
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
        } catch (e){}
    } 

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Добро Пожаловать</h1>
                <div className="card blue darken-3">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Email" id="email" type="text" name="email" className="myInput" onChange={changeHandler}/>
                                <label htmlFor="email">Введите Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Password" id="password" type="password" name="password" className="myInput" onChange={changeHandler}/>
                                <label htmlFor="password">Введите Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" style={{marginRight: 10}} disabled={loading}>Вход</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Региcтрация</button>
                    </div>
                </div>            
            </div>   
        </div>
    )
}