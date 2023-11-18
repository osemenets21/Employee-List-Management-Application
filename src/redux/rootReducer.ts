export function rootReducer(state: any, action: any) {
    if (action.type === 'INC') {
        return state + 1;
    } else if (action.type === 'DEC') {
        return state - 1
    }

    return state;
}