'use strict';

require('./index.scss');

// -----------------------------------------------------------------------------------------------
// React + Other Modules
// -----------------------------------------------------------------------------------------------

var React = require('react');
var Parse = require('parse');

// -----------------------------------------------------------------------------------------------
// Index
// -----------------------------------------------------------------------------------------------

var Index = React.createClass({
    render: function () {
        return (
            <main className='index'>
                <h2>Index</h2>
            </main>
        );
    }
});

module.exports = Index;
