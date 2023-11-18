export function createStore(rootReducer: any, initialState: any) {
    let state = rootReducer(initialState, { type: '__INIT__' });
    const subscribers: ((() => void)[]) = [];

    return {
        dispatch(action: any) {
            state = rootReducer(state, action);
            subscribers.forEach(sub => sub());
        },
        subscribe(callback: () => void) {
            subscribers.push(callback);
        },
        getState() {
            return state;
        }
    };
}
