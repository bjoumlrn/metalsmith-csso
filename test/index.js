/* eslint-env mocha */
/* eslint-disable no-sync */

const tap = require( 'tape' );
const fs = require( 'fs' );
const path = require( 'path' );
const os = require( 'os' );
const csso = require( '../' );
const Metalsmith = require( 'metalsmith' );

function createTestDirectory( template ) {
	const dir = fs.mkdtempSync( path.join(
		os.tmpdir(), 'metalsmith-csso-' )
	);
	fs.mkdirSync( path.join( dir, 'src' ) );
	fs.copyFileSync(
		path.join( template, 'src', 'style.css' ),
		path.join( dir, 'src', 'style.css' )
	);
	return dir;
}

tap.test( 'should minimize redundant structure', ( t ) => {
	const dir = createTestDirectory( 'test/fixtures/basic' );
	Metalsmith( dir )
		.use( csso() )
		.build( ( err ) => {
			t.equal( err, null, 'no error occured' );
			t.equal(
				fs.readFileSync( path.join( dir, 'build', 'style.css' ), 'utf8' ),
				fs.readFileSync( 'test/fixtures/basic/expected/style.css', 'utf8' ),
				'output matches expected output'
			);
		} );
	t.end();
} );

tap.test( 'should accept the option to disable structure minimization', ( t ) => {
	const dir = createTestDirectory( 'test/fixtures/structured' );
	Metalsmith( dir )
		.use( csso( { 'restructure': false } ) )
		.build( ( err ) => {
			t.equal( err, null, 'no error occured' );
			t.equal(
				fs.readFileSync( path.join( dir, 'build', 'style.css' ), 'utf8' ),
				fs.readFileSync( 'test/fixtures/structured/expected/style.css', 'utf8' ),
				'output matches expected output'
			);
		} );
	t.end();
} );

tap.test( 'should generate source maps when asked to', ( t ) => {
	const dir = createTestDirectory( 'test/fixtures/sourcemap' );
	Metalsmith( dir )
		.use( csso( { 'sourceMap': true } ) )
		.build( ( err ) => {
			t.equal( err, null, 'no error occured' );
			t.equal(
				fs.readFileSync( path.join( dir, 'build', 'style.css' ), 'utf8' ),
				fs.readFileSync( 'test/fixtures/sourcemap/expected/style.css', 'utf8' ),
				'output matches expected output'
			);
			const source_map_content = fs.readFileSync( path.join( dir, 'build', 'style.css.map' ), 'utf8' );
			t.equal( /sourcesContent/.test( source_map_content ), true, 'looks like a source map' );
		} );
	t.end();
} );

tap.test( 'should fail fast when deprecated option is used', ( t ) => {
	const dir = createTestDirectory( 'test/fixtures/basic' );
	Metalsmith( dir )
		.use( csso( { 'minimizeStructure': true } ) )
		.build( ( err ) => {
			t.equal( err instanceof Error, true, 'an error occured' );
		} );
	t.end();
} );

