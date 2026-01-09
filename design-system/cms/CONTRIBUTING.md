# Contributing to VibeUp CMS

First off, thank you for considering contributing to VibeUp CMS! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Make your changes** - ensure code quality and consistency
3. **Test your changes** - make sure everything works
4. **Update documentation** if needed
5. **Create a Pull Request** with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/cms.git
cd cms

# Install dependencies
npm install

# Create .env.local
cp env.example .env.local
# Add your GEMINI_API_KEY

# Start development server
npm run dev
```

## Code Style

- Use **TypeScript** for type safety
- Follow **React best practices**
- Use **Tailwind CSS** for styling
- Keep components **small and focused**
- Write **clear, descriptive variable names**
- Add **comments for complex logic**

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new AI prompt templates
fix: Resolve image generation timeout issue
docs: Update installation instructions
style: Improve dashboard card styling
refactor: Simplify storage API
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers!

---

Thank you for contributing! 🚀

