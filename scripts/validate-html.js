const fs = require('fs')
const path = require('path')
const glob = require('glob')
const chalk = require('chalk')
const { validate } = require('html-validator')

// Configuration
const BUILD_DIR = path.join(__dirname, '../.next/server/pages')
const HTML_PATTERN = '**/*.html'

async function validateHtml(filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8')

    const options = {
      data: html,
      format: 'text',
    }

    const result = await validate(options)

    if (result.includes('Error:') || result.includes('Warning:')) {
      console.log(chalk.red(`\n[VALIDATION FAILED] ${filePath}`))
      console.log(chalk.yellow(result))
      return false
    } else {
      console.log(chalk.green(`[VALID] ${filePath}`))
      return true
    }
  } catch (error) {
    console.log(chalk.red(`\n[ERROR] Failed to validate ${filePath}`))
    console.log(chalk.red(error.message))
    return false
  }
}

async function main() {
  console.log(chalk.blue('🔍 Starting HTML validation...'))

  const htmlFiles = glob.sync(HTML_PATTERN, { cwd: BUILD_DIR, absolute: true })

  if (htmlFiles.length === 0) {
    console.log(chalk.yellow('No HTML files found. Did you build your project?'))
    return
  }

  console.log(chalk.blue(`Found ${htmlFiles.length} HTML files to validate.`))

  let validCount = 0
  let invalidCount = 0

  for (const file of htmlFiles) {
    const isValid = await validateHtml(file)
    if (isValid) {
      validCount++
    } else {
      invalidCount++
    }
  }

  console.log(chalk.blue('\n===== Validation Summary ====='))
  console.log(chalk.green(`✓ Valid: ${validCount}`))
  console.log(chalk.red(`✗ Invalid: ${invalidCount}`))

  if (invalidCount > 0) {
    console.log(chalk.yellow('\nSome HTML files have validation errors.'))
    console.log(chalk.yellow('Fix the listed errors and rebuild your project.'))
    process.exit(1)
  } else {
    console.log(chalk.green('\nAll HTML files are valid! 🎉'))
  }
}

main().catch((error) => {
  console.error(chalk.red('Validation failed with an error:'))
  console.error(error)
  process.exit(1)
})
