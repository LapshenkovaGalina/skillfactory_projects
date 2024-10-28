export type TGender = 'м' | 'ж' // тип пол может принимать только два этих значения

export interface IUser {
    name: string
    secondName: string
    gender: TGender
    age: number
    rank: number
 } //структура нашего пользователя
 
 export type TArrayOfUsers = IUser[] // массив пользователей