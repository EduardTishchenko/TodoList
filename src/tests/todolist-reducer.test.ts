import {TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";





let todolistId1: string
let todolistId2: string
let startState:Array<TodolistDomainType> = []
beforeEach(()=> {
    todolistId1 = v1()

    startState = [
        {id:todolistId1,title:"what to learn",filter:'all',entityStatus:'idle',addedDate:'',order:0},
        {id:todolistId1,title:"what bay",filter:'all',entityStatus:'idle',addedDate:'',order:0}
    ]
})