
type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};



const taskList: Array<Task>= [
    {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        completed: false
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        completed: true
    }
];


export default taskList;