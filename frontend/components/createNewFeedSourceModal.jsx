var React = require('react');
var NewFeedSourceFormModal = require('./NewFeedSourceFormModal');

var CreateNewFeedSource = React.createClass({
  render: function() {

    return (
      this.props.modalOpen === false ? null : <NewFeedSourceFormModal modalOpen={this.props.modalOpen}
    closeModal={this.props.closeModal}/>
    );

  }
});
module.exports = CreateNewFeedSource;
