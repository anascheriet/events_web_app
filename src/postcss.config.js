const tailwindcss = require("tailwindcss");

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './src/**/*.js',
        './public/index.html'
    ],
    css: ['./src/styles.css'],
    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
    plugins: [tailwindcss('./tailwind.config.js', require('autoprefixer')), purgecss]
}