import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import CustomMonitorCallButtonContainer from './components/CustomMonitorCallButton/CustomMonitorCallButton.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'MonitorCallPlugin';

export default class MonitorCallPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    const runtimeDomain = 'YOUR_RUNTIME_DOMAIN'

    flex.Actions.replaceAction("MonitorCall", (payload, original) => {
      
      if(payload.task.attributes.direction !== "outbound" ) {
        return original(payload)
      }

      const workerIdentity = manager.workerClient.attributes.contact_uri;

      fetch(`https://${runtimeDomain}/monitor-call`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          body: `taskSid=${payload.task.taskSid}&workerIdentity=${workerIdentity}`
        })
        .then(response => {
          response.json()
          .then(data => {
           console.log("###", data)
          })
          .catch(err =>{
            console.error(err);
          })

        })
        .catch(err => {
          console.error(err);
        });


    });

     flex.Supervisor.TaskOverviewCanvas.Content.add(
         <CustomMonitorCallButtonContainer key="custom-button-container"  />,
         {
          if : props => props.task.status === "accepted" && props.task.attributes.direction === 'outbound'
         }
       )
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
