import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType,
    updateTaskAC
} from "../features/TodolistsList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

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
beforeEach(()=>{
    startState = {
        'todolistId1': [
            {id:'1', title:'CSS',status: TaskStatuses.New,todoListId:'todolistId1',description:'',startDate:'',
            deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
            {id:'2', title:'Js',status: TaskStatuses.New,todoListId:'todolistId1',description:'',startDate:'',
                deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
            {id:'3', title:'React',status: TaskStatuses.New,todoListId:'todolistId1',description:'',startDate:'',
                deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
        ],
        'todolistId2' : [
            {id:'1', title:'bread',status: TaskStatuses.New,todoListId:'todolistId2',description:'',startDate:'',
                deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
            {id:'2', title:'milk',status: TaskStatuses.New,todoListId:'todolistId2',description:'',startDate:'',
                deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
            {id:'3', title:'tea',status: TaskStatuses.New,todoListId:'todolistId2',description:'',startDate:'',
                deadline:'',addedDate:'',order:0,priority: TaskPriorities.Low
            },
        ]
    }
})
test('correct tack should be deleted from correct array ', () => {
    const action = removeTaskAC({taskId: '2', todolistId:'todolistId2'})

    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    //wrong toBe
    expect(endState['todolistId2'].every(t => t.id !='2')).toBeTruthy();
})
test('correct tack should be added to correct array ', () => {
    const action = addTaskAC({
        task:{
           todoListId: 'todolistId2',
            title:'juce',
            addedDate:'',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exists',
            status: TaskStatuses.New

        }})

    const endState = tasksReducer(startState,action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);

})
test('correct tack should be deleted from correct array ', () => {
    const action = updateTaskAC({taskId: '2',model:{status:TaskStatuses.Completed}, todolistId:'todolistId2'})

    const endState = tasksReducer(startState,action)

    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).not.toBe(TaskStatuses.New);

    //wrong toBe

})