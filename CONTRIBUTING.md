# Contributing to SocialAI

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to SocialAI. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

### Reporting Bugs
* **Check the Issues:** See if the bug has already been reported.
* **Be Specific:** Include details about your environment (OS, Python version, Browser).
* **Provide Steps to Reproduce:** A clear set of steps helps us fix the bug faster.

### Suggesting Enhancements
* **Explain the Value:** Why would this feature be useful to users?
* **Describe the Behavior:** How should the new feature work?

### Pull Requests
1. **Fork the repo** and create your branch from `main`.
2. **Install dependencies:** `pip install -r requirements.txt`.
3. **Follow the code style:** We use standard Python (PEP 8) and clean JavaScript practices.
4. **Test your changes:** Ensure the Flask server starts and the frontend interacts correctly with the backend by running `python app.py`.
5. **Update documentation:** If you added a new feature or changed an API, update the `README.md`.

## Development Setup

1. Follow the installation steps in the [README.md](README.md).
2. Copy `.env.example` to `.env` and set your API keys.
3. Place your `firebase-adminsdk.json` in the project root and keep it private.
4. Run the app in debug mode: `python app.py`.

## Style Guidelines

* **Python:** PEP 8. Use meaningful variable names and docstrings for functions.
* **JavaScript:** Use ES6 modules and avoid global variables where possible.
* **CSS:** Use Tailwind classes in HTML, and keep custom CSS in `style.css` minimal and well-commented.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.
