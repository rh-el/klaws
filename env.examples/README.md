# Environment Variable Templates

This directory contains template files for environment variables for each environment.

## Setup Instructions

1. **Development Environment**
   ```bash
   cp env.examples/env.dev .env.dev
   ```

2. **Production Environment**
   ```bash
   cp env.examples/env.prod .env.prod
   # IMPORTANT: Edit .env.prod and update all passwords and secrets!
   ```

3. **Test Environment**
   ```bash
   cp env.examples/env.test .env.test
   ```

## Security Notes

- **NEVER** commit `.env.dev`, `.env.prod`, or `.env.test` files to version control
- These files are already included in `.gitignore`
- For production, use strong, randomly generated passwords
- Consider using a secrets management service (AWS Secrets Manager, HashiCorp Vault, etc.)

## Environment Variables Explained

### Database Configuration
- `DATABASE_URL`: Full PostgreSQL connection string
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

### Application Configuration
- `ENVIRONMENT`: Current environment (development/production/test)
- `TESTING`: Flag for test mode (test environment only)

### Additional Production Variables (Optional)
- `SECRET_KEY`: Application secret key for signing tokens
- `JWT_SECRET`: Secret for JWT token generation
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins

