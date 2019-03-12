module.exports = {
    // "presets": [
    //     // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
    //     ["env", {
    //         "modules": false,
    //         "targets": {
    //             "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
    //         }
    //     }],
    //     // 下面这个是不同阶段出现的es语法，包含不同的转码插件
    //     "stage-2"
    // ],
    // // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    // "plugins": ["transform-runtime"],

    presets: [
        '@vue/app'
    ]
}