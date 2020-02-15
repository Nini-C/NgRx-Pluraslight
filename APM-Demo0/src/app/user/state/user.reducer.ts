import { User } from '../user';

/* ngrx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

// strongly typing state: interface
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

// set initialize state
const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

// build selector: define feature function
const getUserFeatureState = createFeatureSelector<UserState>('users');
// general function: composed feature function and projector function
export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

// initialize state
export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
