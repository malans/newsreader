
var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var FeedItemStore = require('../../stores/feedItemStore');
var ApiActions = require('../../actions/apiActions');

var FeedSourceItem = React.createClass({
  getInitialState: function() {
    return {clicked: false, unreadCount: 0};
  },

  componentWillMount: function() {
    FeedItemStore.addListener(this.handleReceivedFeeds);
  },

  componentDidMount: function() {
    if (FeedItemStore.loadedInitialData) {
      this.handleReceivedFeeds();
    }
  },

  handleReceivedFeeds: function() {
    this.setState({unreadCount: FeedItemStore.unreadCount(this.props.feedSource.id)});
  },

  handleClick: function() {
    if (this.state.clicked === false) {
      ApiUtil.fetchFeedItems(this.props.feedSource.id);
      this.setState({clicked: true});
    } else {
      ApiActions.changeDisplayedFeeds(this.props.feedSource.id);
    }
  },

  render: function() {
    var title = this.props.feedSource.title;
    var faviconURL = "http://www.google.com/s2/favicons?domain=" + this.props.feedSource.url;
    return (
      <li className="feedSourceItem" onClick={this.handleClick}>
        <span className="verticalCenter"><img src={faviconURL} /></span>
        <span className="feedSourceItemTitle">{title}</span>
        <span className="feedSourceItemCount">{this.state.unreadCount}</span>
      </li>
    );
  }
});

module.exports = FeedSourceItem;
