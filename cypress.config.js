const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pos.com.my/send/ratecalculator', // Set base URL if applicable
    supportFile: false, // Disable support file if causing issues
  }
})
