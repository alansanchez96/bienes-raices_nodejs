import path from 'path';

export default {
    mode: 'development',
    entry: {
        map: './resources/js/map.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}