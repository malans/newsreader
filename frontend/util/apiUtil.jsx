var ApiActions = require('../actions/apiActions.jsx');
//currentUser returned by ajax requests should probably use Jbuilder
var ApiUtil = {
  createUser: function(newUser) {
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: {user: newUser},
      success: function(currentUser) {
        ApiActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signinUser: function(user) {
    $.ajax({
      method: 'POST',
      url: 'api/session',
      data: {session: user},
      success: function(currentUser) {
        window.CURRENT_USER_ID = currentUser.id;
        ApiActions.receiveCurrentUser(currentUser);
      }
    });
  },

  signOutUser: function() {
    debugger;
    $.ajax({
      method: 'DELETE',
      url: 'api/session',
      success: function() {
        debugger;
        window.CURRENT_USER_ID = -1;
        ApiActions.signOutUser();
      }
    });
  },

  fetchCurrentUser: function() {
    $.ajax({
      method: 'GET',
      url: 'api/current_user',
      success: function(currentUser) {
        if (currentUser === {}) {
          currentUser = undefined;
        }
        ApiActions.receiveCurrentUser(currentUser);
      }
    });
  },

  fetchUserFeedSources: function() {
    debugger;
    $.ajax({
      method: 'GET',
      url: 'api/feedsources',
      success: function(feedSources) {
        ApiActions.receiveFeedSources(feedSources);
      }
    });
  },

  fetchFeedItems: function(feedSourceId) {
    $.ajax({
      method: 'GET',
      url:  'api/feeds/' + feedSourceId,
      success: function(feeds) {
        ApiActions.receiveFeeds(feeds, feedSourceId);
      }
    });
  }
};

module.exports = ApiUtil;
