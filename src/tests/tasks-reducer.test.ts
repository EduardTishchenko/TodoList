import {
    addTaskAC,
    removeTaskAC, setTasksAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../features/TodolistsList/todolists-reducer";

//test('test', () => {
//    const a = 1
//   const b = 2
//   const c = 3

//    expect(a).toBe(1);
//    expect(b).toBe(2);
//wrong toBe
//    expect(c).toBe(2);
//})
let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'Js',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    }
})
test('correct tack should be deleted from correct array ', () => {
    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    //wrong toBe
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
})
test('correct tack should be added to correct array ', () => {
    const action = addTaskAC({
        task: {
            todoListId: 'todolistId2',
            title: 'juce',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exists',
            status: TaskStatuses.New

        }
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);

})
test('status of specified task should be changed ', () => {
    const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.Completed}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).not.toBe(TaskStatuses.New);


    //wrong toBe

})
test('title of specified task should be changed ', () => {
    const action = updateTaskAC({taskId: '2', model: {title: 'yogurt'}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][0].title).toBe('CSS');
    expect(endState['todolistId2'][1].title).toBe('yogurt');
    expect(endState['todolistId2'][2].title).toBe('tea');


    //wrong toBe

})
test('new array should be added when new todolist is added ', () => {
    const action = addTodolistAC({
        todolist: {
            id: '',
            title: 'new todolist',
            addedDate:"",
            order:0

        }
    })

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find((k => k != 'todolistId1' && k != 'todolistId2'))
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined()

    //wrong toBe
})

test('property with should be deleted ', () => {
    const action = removeTodolistAC({id:'todolistId2'})

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();



    //wrong toBe

})
test('empty arrays should be added when we set todolist  ', () => {
const action = setTodolistsAC({todolists:[
        {id:'1',title:'title1',order:0,addedDate:''},
        {id:'2',title:'title2',order:0,addedDate:''}
    ]})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(4);
    expect(endState['1']).not.toBeDefined();
    expect(endState['2']).not.toBeDefined();
    //wrong toBe

})
test('tasks should be added for todolist  ', () => {
    const action = setTasksAC({tasks:startState['todolistId1'],todolistId:'todolistId1'})
    const endState = tasksReducer(
        {'todolistId1':[],
        'todolistId2':[]}
        , action)



    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);

    //wrong toBe
})



