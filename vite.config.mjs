import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
        // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },

    server: {
        // needed for codesandbox, which can be under hosted under any hostname,
        // https://github.com/vitejs/vite/security/advisories/GHSA-vg6x-rcgg-rjx6
        allowedHosts: true,
    },

    test: {
        browser: {
            enabled: true,
            provider: 'playwright',
            instances: [
                {browser: 'chromium'},
            ],
        },
    },
})
