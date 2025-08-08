import {createTheme} from '@mui/material/styles';

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#08b1d7',
            dark: '#055262',
        },
        secondary: {
            light: '#d8eed4',
            main: '#bbe1b4',
            dark: '#002634',
        },
        background: {
            paper: '#001f29',
            default: '#001820',
        },
        text: {
            primary: '#e8e8e8',
            secondary: '#acc9c5',
        },
        action: {
            hoverOpacity: 0.2,
        },
    },
});

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0599b2',
            dark: '#033944',
        },
        secondary: {
            light: '#d8eed4',
            main: '#37936c',
            dark: '#002634',
        },
        background: {
            paper: '#f5f5f5',
            default: '#bfe5e5',
        },
        text: {
            primary: '#001f29',
            secondary: '#001820',
        },
        action: {
            hoverOpacity: 0.2,
        },
    },
});
