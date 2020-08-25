import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/CustomMonitorCallButtonState';
import CustomMonitorCallButton from './CustomMonitorCallButton';

const mapStateToProps = (state) => ({

    isMonitoringCall: state.monitorCall.customMonitorCallButton.isMonitoringCall
})

const mapDispatchToProps = (dispatch) => ({
  monitorCall: bindActionCreators( Actions.monitorCall, dispatch ),
  stopMonitoringCall: bindActionCreators( Actions.stopMonitoringCall, dispatch ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomMonitorCallButton);
