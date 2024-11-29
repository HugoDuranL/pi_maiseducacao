import { extendTheme } from 'native-base'

export const TEMAS = extendTheme({
    colors: {
        gray: {
            300: '#8D8D99'
        },
        green: {
            500: '#9FE2BF',
            800: '#008080'
        },
        white: '#fff',
        black: '#000'
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24
    }
})