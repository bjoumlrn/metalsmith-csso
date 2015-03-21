var minimatch = require( 'minimatch' );

function plugin( opts ) {
    var opts = opts || {};
    var csso = require( 'csso' );
    return function( files, metalsmith, done ) {
        var styles = Object.keys( files ).filter( minimatch.filter( "*.css", {
            matchBase: true
        } ) );
        setImmediate( done );
        styles.forEach( function( file, index, arr ) {
            files[ file ].contents = new Buffer( csso.justDoIt( files[ file ].contents.toString(), opts.minimizeStructure === false ) + '\n' );
        } );
    }
}

module.exports = plugin;
