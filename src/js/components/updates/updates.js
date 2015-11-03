var React = require('react');
var AppStore = require('../../stores/app-store');
var AppActions = require('../../actions/app-actions');

var Recent = require('./recentupdates.js');
var Schedule = require('./schedule.js');
var EventLog = require('./eventlog.js');
var ScheduleForm = require('./scheduleform.js');
var Report = require('./report.js');
var ScheduleButton = require('./schedulebutton.js');

var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var Dialog = mui.Dialog;
var FlatButton = mui.FlatButton;
var RaisedButton = mui.RaisedButton;

var styles = {
  tabs: {
    backgroundColor: "#fff",
    color: "#414141",
    borderBottom: "1px solid #e0e0e0",
  },
  inkbar: {
    backgroundColor: "#679BA5",
  }
};

var tabs = {
  updates: '0',
  schedule: '1',
  events: '2'
}

function getState() {
  return {
    recent: AppStore.getRecentUpdates(new Date().getTime()),
    progress: AppStore.getProgressUpdates(new Date().getTime()),
    schedule: AppStore.getScheduledUpdates(new Date().getTime()),
    events: AppStore.getEventLog(),
    images: AppStore.getSoftwareRepo(),
    groups: AppStore.getGroups(),
    dialogTitle: "Schedule an update",
    scheduleForm: true,
    contentClass: "largeDialog", 
    invalid: true
  }
}

var Updates = React.createClass({
  getInitialState: function() {
    return getState()
  },
  componentWillMount: function() {
    AppStore.changeListener(this._onChange);
      if (this.props.params) {
        this.setState({tabIndex: tabs[this.props.params.tab]});
      } else {
        this.setState({tabIndex:"0"});
      }
  },
  _onChange: function() {
    this.setState(getState());
  },
  dialogDismiss: function(ref) {
    this.refs[ref].dismiss();
    this.replaceState(this.getInitialState());
  },
  dialogOpen: function(dialog) {
    if (dialog === 'schedule') {
      this.setState({
        dialogTitle: "Schedule an update",
        scheduleForm: true,
        contentClass: null
      });
    }
    if (dialog === 'report') {
      this.setState({
        scheduleForm: false,
        dialogTitle: "Update results",
        contentClass: "largeDialog"
      })
    }
    if (!this.refs['dialog'].isOpen()) {
      this.refs['dialog'].show();
    }
  },
  _changeTab: function(value, e, tab) {
    this.setState({tabIndex: value});
  },
  _onScheduleSubmit: function() {
    var newUpdate = {
      id: this.state.id,
      group: this.state.group,
      model: this.state.model,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      image: this.state.image
    }
    AppActions.saveSchedule(newUpdate, this.state.disabled);
    this.dialogDismiss('dialog');
  },
  _updateParams: function(val, attr) {
    // updating params from child schedule form
    var tmp = {};
    tmp[attr] = val;
    this.setState(tmp);
  },
  _showReport: function (report) {
     this.setState({scheduleForm: false, showReport:report});
     this.dialogOpen("report");
  },
  _scheduleUpdate: function (update) {
    var image = '';
    var group = '';
    var start_time = null;
    var end_time = null;
    var id = null;
    if (update) {
      if (update.id) {
        id = update.id;
      }
      if (update.software_version) {
        image = AppStore.getSoftwareImage('name', update.software_version);
      }
      if (update.group) {
        group = AppStore.getSingleGroup('name', update.group);
      }
      if (update.start_time) {
        start_time = update.start_time;
      }
      if (update.end_time) {
        end_time = update.end_time;
      }
    }
    this.setState({scheduleForm:true, imageVal:image, id:id, start_time:start_time, end_time:end_time, image:image, group:group, groupVal:group});
    this.dialogOpen("schedule");
  },
  _scheduleRemove: function(id) {
    AppActions.removeUpdate(id);
  },
  render: function() {
    var scheduleActions =  [
      <div style={{marginRight:"10", display:"inline-block"}}>
        <FlatButton
          label="Cancel"
          onClick={this.dialogDismiss.bind(null, 'dialog')} />
      </div>,
      <RaisedButton
        label="Schedule update"
        primary={true}
        onClick={this._onScheduleSubmit}
        ref="save" />
    ];
    var reportActions = [
      { text: 'Close' }
    ];
    var dialogContent = '';

    if (this.state.scheduleForm) {
      dialogContent = (    
        <ScheduleForm updateSchedule={this._updateParams} id={this.state.id} images={this.state.software} image={this.state.image} imageVal={this.state.image} groups={this.state.groups} groupVal={this.state.group} start={this.state.start_time} end={this.state.end_time} />
      )
    } else {
      dialogContent = (
        <Report retryUpdate={this._scheduleUpdate} update={this.state.showReport} />
      )
    }
    return (
      <div>
        <div>
          <Tabs
            style={{position:"relative"}}
            tabItemContainerStyle={{width:"33%"}}
            inkBarStyle={styles.inkbar}
            value={this.state.tabIndex}
            onChange={this._changeTab}>
            <Tab
            style={styles.tabs}
            label={"Latest"}
            value="0"
            className="tabClass">
              <div className="tabContainer">
                <Recent recent={this.state.recent} progress={this.state.progress} showReport={this._showReport} />
                <div style={{marginTop:"45"}}>
                  <ScheduleButton secondary={true} openDialog={this.dialogOpen} />
                </div>
              </div>
            </Tab>

            <Tab
            style={styles.tabs}
            label={"Schedule"}
            value="1">
              <div className="tabContainer">
                <Schedule edit={this._scheduleUpdate} schedule={this.state.schedule} remove={this._scheduleRemove} />
                <div style={{marginTop:"45"}}>
                  <ScheduleButton style={{marginTop:"45"}} secondary={true}  openDialog={this.dialogOpen} />
                </div>
              </div>
            </Tab>

            <Tab
            style={styles.tabs}
            label={"Event log"}
            value="2">
              <div className="tabContainer">
                <EventLog events={this.state.events} />
              </div>
            </Tab>
          </Tabs>
        </div>
      
        <Dialog
          ref="dialog"
          title={this.state.dialogTitle}
          actions={this.state.scheduleForm ? scheduleActions : reportActions}
          autoDetectWindowHeight={true} autoScrollBodyContent={true}
          contentClassName={this.state.contentClass}
          bodyStyle={{paddingTop:"0"}}
          >
          {dialogContent}
        </Dialog>
      </div>
    );
  }
});

module.exports = Updates;