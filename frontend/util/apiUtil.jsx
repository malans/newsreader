var ApiActions = require('../actions/apiActions.jsx');
//currentUser returned by ajax requests should probably use Jbuilder
var ApiUtil = {
  createUser: function(newUser) {
    $.ajax({
      method: 'POST',
      url: 'api/users',
      data: {user: newUser},
      success: function(initialData) {
        debugger;
        window.CURRENT_USER_ID = initialData.id;
        ApiActions.receiveCurrentUser(initialData);
      }
    });
  },

  signinUser: function(user) {
    $.ajax({
      method: 'POST',
      url: 'api/session',
      data: {session: user},
      success: function(initialData) {
        window.CURRENT_USER_ID = initialData.id;
        ApiActions.receiveCurrentUser(initialData);
      }
    });
  },

  signOutUser: function() {
    $.ajax({
      method: 'DELETE',
      url: 'api/session',
      success: function() {
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
    $.ajax({
      method: 'GET',
      url: 'api/feedsources',
      success: function(feedSources) {
        ApiActions.receiveFeedSources(feedSources);
      }
    });
  },

  fetchFeedItems: function(feedSourceId, page) {
    $.ajax({
      method: 'GET',
      url:  'api/feeds/' + feedSourceId,
      data: {page: page},
      success: function(feedsData) {
        ApiActions.receiveFeeds(feedsData, feedSourceId);
      }
    });
  },

  createFeedSource: function(newFeedSource) {
    $.ajax({
      method: 'POST',
      url: 'api/feedsources',
      data: {feedSource: newFeedSource},
      success: function(createdFeedSource) {
        ApiActions.receiveCreatedFeedSource(createdFeedSource);
      }
    });
  },

  loadInitialData: function() {
    $.ajax({
      method: 'GET',
      url: 'api/initialData',
      success: function(initialData) {
        ApiActions.receiveInitialData(initialData);
      }
    });
  },

  saveFeedForLater: function(feedId) {
    $.ajax({
      method: 'PATCH',
      url: 'api/saveForLater/' + feedId,
    });
  },

  fetchSavedForLater: function() {
    $.ajax({
      method: 'GET',
      url: 'api/savedForLater',
      success: function(savedForLaterFeeds) {
        ApiActions.receiveSavedForLaterFeeds(savedForLaterFeeds);
      }
    });
  },

  setUnreadToFalse: function(feedId) {
    $.ajax({
      method: 'PATCH',
      url: 'api/setUnreadToFalse/' + feedId,
    });
  },

  signInToFacebook: function() {
    
  }
};

module.exports = ApiUtil;
