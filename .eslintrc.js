module.exports = {
    parser:"@babel/eslint-parser",
    extends:[
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:import/recommended"
    ],
    plugins:["react","react-hooks","jsx-a11y","import"],

    parserOptions: {
        ecmaVersion:6,
        sourceType:'module',
        ecmaFeatures:{
            jsx:true,
        }
    },
    env:{es6:true,browser:true,node:true},

    rules: {
        "semi":0,
        "react/display-name":0,
        "import/no-unresolved":0
    }
}