/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./node_modules/flowbite/**/*.js", "./views/*.{ejs,html,js,css}"],
    theme: {
        extend: {},
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("flowbite/plugin"),
    ],
};
