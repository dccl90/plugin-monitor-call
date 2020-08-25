const ACTION_MONITOR_CALL = 'CUSTOM_MONITOR_CALL';
const ACTION_STOP_MONITORING_CALL = 'CUSTOM_STOP_MONITORING_CALL'

const initialState = {
  isMonitoringCall: false,
};

export class Actions {
  static monitorCall = () => ({ type: ACTION_MONITOR_CALL });
  static stopMonitoringCall = () => ({ type: ACTION_STOP_MONITORING_CALL })
}

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_MONITOR_CALL: {
      return {
        ...state,
        isMonitoringCall: true,
      };
    }
    case ACTION_STOP_MONITORING_CALL: {
      return {
        ...state,
        isMonitoringCall: false,
      };
    }

    default:
      return state;
  }
}
