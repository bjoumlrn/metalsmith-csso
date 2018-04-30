# metalsmith-csso

[![Build Status](https://travis-ci.org/bjoumlrn/metalsmith-csso.svg?branch=master)](https://travis-ci.org/bjoumlrn/metalsmith-csso)

CSSO, CSS Optimizer plugin for Metalsmith

## New in 1.x

- Updated to CSSO version 3.5.0
- Updated to Metalsmith version 2.3.0
- No longer an async plugin
- Changed testing framework to [tape](https://github.com/substack/tape)
- Refactored tests to use temp directory for output to avoid flaky tests
- Rudimentary support for source maps

### Restructuring

To block CSSO from optimizing the structure of your CSS use the option `restructure: false` (default: true).

### Source maps

Added rudimentary support for the CSSO option `sourceMap: true` (default: false) to generate corresponding source map files for each CSS file.


> [CSSO (CSS Optimizer)](https://github.com/afelix/csso) is a CSS minimizer unlike others. In addition to usual minification techniques it can perform structural optimization of CSS files, resulting in smaller file size compared to other minifiers.
