// -----------------------------------------------
// Modernizr Configuration:
// -----------------------------------------------
module.exports = {
    filename: 'modernizr.js',
    minify: true,
    options: ['setClasses', 'prefixed'],
    'feature-detects': [
        'css/backgroundsize',
        'css/backgroundsizecover',
        'css/borderradius',
        'storage/localstorage',
        'storage/sessionstorage',
        'storage/websqldatabase',
        'css/opacity',
        'input',
        'inputtypes',
        'elem/picture',
        'css/supports',
        'css/transitions',
        'css/flexbox',
        'css/flexboxlegacy',
        'css/transforms3d',
        'css/transforms',
        'css/backgroundcliptext'
    ]
};
