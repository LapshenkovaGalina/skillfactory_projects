const initialState : number = 0;

export type actionType = {
    type: "INC" | "SET",
    payload?: number
}
export type reducerType = (state: number, action: actionType) => number;

export function createSkillux(reducer: reducerType) {
    const initialState : number = 0;
    let counter: number = initialState;
    const subscriptions = new Map<string, () => void>();
    
    return {
        getState: () => counter,
        dispatch: (action: actionType) => {
            counter = reducer(counter, action);
            subscriptions.forEach((callback) => callback())
        },
        subscribe:  (key: string, callback: () => void) => subscriptions.set(key, callback),
        unsubscribe: (key: string) => (subscriptions.delete(key), undefined)
    }
}

export function reducer(state = initialState, action: actionType): number {
    switch (action.type) {
        case 'INC': {
            return state + 1;
        }
        case 'SET': {
            if(action.payload){
                   return action.payload; 
                }
            else {
                return state;
            }
        }
        default: {
            return state;
        }
    }
}