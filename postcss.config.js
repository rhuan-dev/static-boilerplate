module.exports = ({env}) => ({
    plugins: [
        require('rucksack-css'),
        env === 'production' ?
        [
            require('postcss-combine-media-query'),
            require('autoprefixer')({
                overrideBrowserslist: "last 4 versions"
            })
        ]
                             :
        false,
    ]
})
