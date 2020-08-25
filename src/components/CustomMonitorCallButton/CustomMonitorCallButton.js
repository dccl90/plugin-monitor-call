import React, { Component } from 'react';
import { 
  withTaskContext,
  IconButton,
  Actions
} from '@twilio/flex-ui';

class CustomMonitorCallButton extends Component {

render() {
 const { task } = this.props;
 console.log("$$$", this.props)
 return (
  <div className="Twilio-TaskDetailsPanel-Buttons css-jsx9vv">
    <IconButton
                 className="Twilio-SupervisorTaskOverviewActions-MonitorButton"
                 icon={
                    this.props.isMonitoringCall === true
                        ? "MonitorOffLarge"
                        : "MonitorBoldLarge"
                }
                 onClick={() => {
                    if( !this.props.isMonitoringCall ) { 
                      this.props.monitorCall();
                      Actions.invokeAction("MonitorCall", { task: task })
                    } else {
                      this.props.stopMonitoringCall();
                      Actions.invokeAction("StopMonitoringCall", { task: task })
                    }
                 }}
             />
  </div>
  );
 }
}



export default withTaskContext(CustomMonitorCallButton); 