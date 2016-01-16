var React = require('react');
var FeedItemStore = require('../stores/feedItemStore');

var FeedItem = React.createClass({
  getInitialState: function() {
    return {display: false};
  },

  showFeed: function() {
    this.setState({display: true});
  },

  render: function() {
    var title = this.props.feed.title;
    var content = this.state.display === true ? this.props.feed.content : null;
    var summary = this.props.feed.summary;
    return (
      <div>
        <div className="feedTitle" onClick={this.showFeed}>
          <span>{title}</span> <span className="summary">{summary}</span> 
        </div>
        <div className="displayed-feed">
          {content}
        </div>
      </div>
    );
  }
});

module.exports = FeedItem;
