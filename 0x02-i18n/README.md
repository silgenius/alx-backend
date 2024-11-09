# ALX SE Project - 0x02-i18n

This is the second project in the ALX Software Engineering program focusing on **internationalization (i18n)**. The goal of this project is to internationalize a simple web application using **Flask** and **Babel**, enabling the application to support multiple languages.

## Project Description

The objective of this project is to demonstrate how to internationalize a simple Flask web application. You will use **Flask** for the web framework and **Babel** for handling translations and locales, which will allow the application to support multiple languages (e.g., English and French).

## Requirements

- **Python 3**: Ensure you have Python 3.6 or higher installed.
- **Flask**: A micro web framework for Python.
- **Babel**: A library for internationalization and localization support in Flask applications.
- **Jinja2**: Templating engine used in Flask.

## Tasks

1. **Set up a Flask application**:
   - Set up a simple Flask web application.
   - Install Flask and Babel as dependencies.

2. **Configure Babel for Internationalization (i18n)**:
   - Use Flask-Babel to manage translations in different languages (e.g., English and French).
   - Store translations in separate `.po` files for each supported language.

3. **Create Routes with Translations**:
   - Implement routes in your Flask app that display content in different languages.
   - Use dynamic handling to display content based on the selected language.

4. **User Locale Management**:
   - Detect user locale either from the browser settings or through query parameters and serve content in the appropriate language.

5. **Testing**:
   - Ensure that your application can switch between languages and display the correct translations for each route.
   - Test with different languages (e.g., `en`, `fr`, `es`) to verify internationalization functionality.
