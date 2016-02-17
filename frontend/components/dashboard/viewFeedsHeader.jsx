var React = require('react');
var FeedItemStore = require('../../stores/feedItemStore');
var FeedSourceStore = require('../../stores/feedSourceStore');
var classNames = require('classnames');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var ViewFeedsHeader = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {search: ""};
  },

  // componentDidMount: function() {
  //   this.feedStoreListener = FeedSourceStore.addListener(this.handleReceivedFeedSources);
  // },
  //
  // componentWillUnmount: function() {
  //   this.feedStoreListener.remove();
  // },

  render: function() {
    var iconClasses = classNames({
      "fa": true,
      "categoryIcon": true,
      "fa-angle-down": true,
      "verticalCenter": true
    });

    var headerClasses = classNames({
      "viewFeedsHeader": true,
      "scrollView": this.props.scrollView
    });

    return (
      <div className="viewFeedsHeaderContainer">
        <div className={headerClasses}>
          <div id="viewFeedsHeaderTitle">{this.props.displayedFeedSource === undefined ?
                                         null :
                                         this.props.displayedFeedSource.title}
          </div>

          <ul className="viewFeedsHeaderNav">
            <li className="fa fa-check categoryIcon verticalCenter"></li>
            <li className="fa fa-refresh categoryIcon verticalCenter"></li>
            <li className="fa fa-cog categoryIcon verticalCenter"></li>
            <div className="inputIcon">
              <span className="fa fa-search verticalCenter"></span>
              <input type="text" name="search" id="search" placeholder="Search" valueLink={this.linkState('search')} />
            </div>
          </ul>

        </div>
        <div className="viewFeedsHeaderSubTitle">
          {FeedItemStore.unreadCount(this.props.displayedFeedSource === undefined ?
                                     null :
                                     this.props.displayedFeedSource.id)}
          {" unread articles"}
        </div>
      </div>
    );
  }
});



module.exports = ViewFeedsHeader;
