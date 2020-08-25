import { combineReducers } from 'redux';

import { reduce as CustomMonitorCallButtonState } from './CustomMonitorCallButtonState';

// Register your redux store under a unique namespace
export const namespace = 'monitorCall';

// Combine the reducers
export default combineReducers({
  customMonitorCallButton: CustomMonitorCallButtonState
});
