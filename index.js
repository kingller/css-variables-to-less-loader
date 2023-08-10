const fs = require('fs');
const lessToJs = require('less-vars-to-js');

module.exports = async function (source) {
    const callback = this.async();

    const lessVarFilePath = this.query.varFile; // 通过options传入的Less变量文件路径

    try {
        if (!source || !/var\(--(.*?)\)/.test(source)) {
            callback(null, source);
            return;
        }

        // 读取Less变量文件内容
        const lessVarContent = fs.readFileSync(lessVarFilePath, 'utf-8');

        // 获取所有导入的变量
        const importedVariables = lessToJs(lessVarContent);

        // 替换CSS中的变量
        const cssWithLessVariables = source.replace(/var\(--(.*?)\)/g, (_, variableName) => {
            const lessVarName = `@${variableName.trim()}`;
            return importedVariables[lessVarName] ? lessVarName : _;
        });
        callback(
            null,
            `@import '${lessVarFilePath}';\n${cssWithLessVariables}`
        );
    } catch (error) {
        callback(error);
    }
};
