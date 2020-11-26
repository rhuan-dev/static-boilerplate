module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
            overrideBrowserslist: "last 4 versions"
        })
    ]
};
