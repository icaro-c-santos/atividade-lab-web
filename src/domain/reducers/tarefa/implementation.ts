import { Actor, AllActions, Remove, Search, Toggle, Write, Add, TarefaActionsEnum, TarefasState } from "./types";

export const makeInitialTarefaState = (): TarefasState => {
  const storedTarefas = localStorage.getItem("listTask");
  const tarefas = storedTarefas ? JSON.parse(storedTarefas) : [];

  return {
    tarefas: tarefas,
    error: "",
    name: "",
    search: "",
  };
};

export const saveStateToLocalStorage = (state: TarefasState) => {
  localStorage.setItem("listTask", JSON.stringify(state.tarefas));
};

export const removeTaskLocalStorage = (taskId: string) => {
  let data = localStorage.getItem("listTask");
  let list: any[] = [];

  if (data != null) {
    list = JSON.parse(data);
    list = list.filter((task) => task.id !== taskId);
  }

  localStorage.setItem("listTask", JSON.stringify(list));
};



export const removeTask: Actor<Remove> = (state, action) => {
  const task = state.tarefas.filter((tarefa) => tarefa.id !== action.payload.id);
  if (task.length >= 1) {
    removeTaskLocalStorage(task[0].id);
  }

  const newState = {
    ...state,
    tarefas: task,
  };

  saveStateToLocalStorage(newState);

  return newState;
};
export const addTaskLocalStorage = (newData: any) => {
  let data = localStorage.getItem("listTask");
  let list: any[] = [];

  if (data != null) {
    list = JSON.parse(data);
  }

  const isTaskAlreadyAdded = list.some((task) => task.id === newData.id);
  if (isTaskAlreadyAdded) {
    return;
  }

  list.push(newData);

  localStorage.setItem("listTask", JSON.stringify(list));
};

export const toggleTask: Actor<Toggle> = (state, action) => {
  const newState = {
    ...state,
    tarefas: state.tarefas.map((t) =>
      t.id === action.payload.id ? { ...t, done: !t.done } : t
    ),
  };

  saveStateToLocalStorage(newState);

  return newState;
};

export const writeTask: Actor<Write> = (state, { payload }) => {
  const hasTaskAlready = state.tarefas.some((t) => t.name === payload.name);

  if (hasTaskAlready) {
    const newState = {
      ...state,
      name: payload.name,
      error: "Nome da tarefa já existe",
    };

    saveStateToLocalStorage(newState);

    return newState;
  }

  const newState = {
    ...state,
    error: "",
    name: payload.name,
  };

  saveStateToLocalStorage(newState);

  return newState;
};

export const addTask: Actor<Add> = (state) => {
  if (state.name === "") {
    return {
      ...state,
      error: "Nome da tarefa não pode ser vazio",
    };
  }
  if (state.error) {
    return state;
  }
  let limiteDate = new Date();
  limiteDate.setDate(limiteDate.getDate() -1);

  const data = {
    id: (state.tarefas.length + 1).toString(),
    name: state.name,
    done: false,
    createdAt: new Date(),
    limiteDate: limiteDate,
  };

  addTaskLocalStorage(data);

  const newState = {
    ...state,
    tarefas: [...state.tarefas, data],
    error: "",
    name: "",
  };
  

  saveStateToLocalStorage(newState);

  return newState;
};

export const searchTask: Actor<Search> = (state, action) => {
  const newState = {
    ...state,
    search: action.payload.search,
  };

  saveStateToLocalStorage(newState);

  return newState;
};

export const tarefaReducer = (
  state: TarefasState = makeInitialTarefaState(),
  action: AllActions
): TarefasState => {
  switch (action.type) {
    case TarefaActionsEnum.add:
      return addTask(state, action);

    case TarefaActionsEnum.remove:
      return removeTask(state, action);

    case TarefaActionsEnum.toggle:
      return toggleTask(state, action);

    case TarefaActionsEnum.write:
      return writeTask(state, action);

    case TarefaActionsEnum.search:
      return searchTask(state, action);

    default:
      return state;
  }
};