module.exports = ({env}) => ({
    plugins: [
        require('rucksack-css'),
        env === 'production' ?
        [
            require('postcss-sort-media-queries'),
            require('autoprefixer')({
                overrideBrowserslist: "last 4 versions"
            })
        ]
                             :
        false,
    ]
})
