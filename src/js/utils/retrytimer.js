import AppActions from '../actions/app-actions';
import store from '../reducers';
import { preformatWithRequestID } from '../helpers';

var timerArr = {};

export function setRetryTimer(err, service, msg, timeLeft) {
  // check if logged in and if service not already retrying
  if (!timerArr[service] && (store.getState().users.byId[store.getState().users.currentUser] || {}).hasOwnProperty('email')) {
    var remaining = timeLeft - 1000;
    timerArr[service] = setInterval(() => {
      remaining -= 1000;
      remaining > 0 ? AppActions.setSnackbar(preformatWithRequestID(err.res, `${msg} Retrying in ${remaining / 1000} seconds`)) : clearRetryTimer(service);
    }, 1000);
  }
}

export function clearRetryTimer(service) {
  if (timerArr[service]) {
    clearInterval(timerArr[service]);
    delete timerArr[service];
    AppActions.setSnackbar('');
  }
}

export function clearAllRetryTimers() {
  for (var service in timerArr) {
    clearRetryTimer(service);
  }
  AppActions.setSnackbar('');
}
