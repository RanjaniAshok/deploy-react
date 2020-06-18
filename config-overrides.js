const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
       fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
           style: true,
        }),
       addLessLoader({
         javascriptEnabled: true,
         modifyVars: { '@layout-body-background': '#fff', 
        '@layout-header-background':'#fff',
        '@layout-footer-padding':'15px 50px',
        '@layout-header-padding': '0px 0px',
        
 },
         
       }),
     );