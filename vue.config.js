module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':"@/views"
            }
        },

        // devServer: {
        //     overlay: {
        //         warnings: false,
        //         errors: false
        //     }
        // },
        // lintOnSave: process.env.NODE_ENV !== 'production'
    },

    lintOnSave: false
}
