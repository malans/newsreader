var React = require('react');
var NavigationBar = require('./navigationBar');

var App = React.createClass({
  render: function() {
    return (
      <div>
      <NavigationBar/>
      <div className="main">
        {this.props.children}
      </div>
      </div>
    );
  }
});

module.exports = App;
