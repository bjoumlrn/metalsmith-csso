/* eslint-env node */

const minimatch = require( 'minimatch' );
const csso = require( 'csso' );

function plugin( opts = {} ) {
	return ( files, metalsmith, done ) => {
		if ( opts.minimizeStructure ) {
			return done(
				new Error( 'CSSO option minimizeStructure is deprecated. Use restructure instead.' )
			);
		}
		Object.keys( files )
			.filter( minimatch.filter( '*.css', { 'matchBase': true } ) )
			.forEach( ( file ) => {
				opts.filename = file;
				const output = csso.minify( files[file].contents.toString(), opts );
				files[file].contents = Buffer.from( `${output.css}\n`, 'utf8' );
				if ( opts.sourceMap ) {
					files[`${file}.map`] = {
						'contents': Buffer.from(
							output.map.toString(), 'utf8'
						),
						'mode': '0644'
					};
				}
			} );
		return done( null );
	};
}

module.exports = plugin;

