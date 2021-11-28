import {
    TOGGLE_EXTRA_NAV_OPTIONS, SAVING
} from '../actions/types';

export const initState = {
    showExtraNavOptns: false,
    saving: false
};

export default function globalReducer(state = initState, action) {
    switch (action.type) {
        case TOGGLE_EXTRA_NAV_OPTIONS:
            return {
                ...state,
                showExtraNavOptns: action.payload
            }
        case SAVING:
            return {
                ...state,
                saving: action.payload
            }
        default:
            return state;
    }
}