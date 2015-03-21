var assertDir = require( 'assert-dir-equal' )
var csso = require( '../' )
var Metalsmith = require( 'metalsmith' )

describe( 'metalsmith-csso', function() {

    it( 'should minimize redundant structure', function( done ) {
        Metalsmith( 'test/fixtures/basic' )
            .use( csso() )
            .build( function( err ) {
                if ( err ) return done( err )
                assertDir( 'test/fixtures/basic/expected', 'test/fixtures/basic/build' )
                return done( null )
            } );
    } );

    it( 'should accept the option to disable structure minimization', function( done ) {
        Metalsmith( 'test/fixtures/structured' )
            .use( csso( {
                minimizeStructure: false
            } ) )
            .build( function( err ) {
                if ( err ) return done( err )
                assertDir( 'test/fixtures/structured/expected', 'test/fixtures/structured/build' )
                return done( null )
            } );
    } );

} );
