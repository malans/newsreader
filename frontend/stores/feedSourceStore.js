var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var FeedSourceStore = new Store(AppDispatcher);
var FeedSourceConstants = require('../constants/feedSourceConstants');

var _feedSources = {};  // keys will be categories, values will be feed sources

var populate_feedSources = function(feedSources) {
  FeedSourceStore.getUniqueCategories(feedSources).forEach(function(category, idx_cat) {
    _feedSources[category] = [];
    feedSources.forEach(function(feedSource, idx_fs) {
      if (feedSource.category === category) {
        _feedSources[category].push(feedSource);
      }
    });
  });
};

var addCreatedFeedSourceTo_feedSources = function(createdFeedSource) {
  var category = createdFeedSource.category;
  if (_feedSources[category] === undefined) {
    _feedSources[category] = [];
  }
  _feedSources[category].push(createdFeedSource);
};

FeedSourceStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FeedSourceConstants.RECEIVED_FEED_SOURCES:
      populate_feedSources(payload.feedSources);
      FeedSourceStore.__emitChange();
      break;
    case FeedSourceConstants.RECEIVED_CREATED_FEED_SOURCE:
      addCreatedFeedSourceTo_feedSources(payload.createdFeedSource);
      FeedSourceStore.__emitChange();
      break;
  }
};

FeedSourceStore.all = function() {
  return _feedSources;
};

FeedSourceStore.getUniqueCategories = function(feedSources) {
  var unique = [];

  feedSources.forEach(function(feedSource, idx) {
    if (unique.indexOf(feedSource.category) === -1) {
      unique.push(feedSource.category);
    }
  });

  return unique;
};

module.exports = FeedSourceStore;
