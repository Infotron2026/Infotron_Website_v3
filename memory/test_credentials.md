# Infotron Solutions — Test Credentials

## Admin (Jobs management)

- Admin URL: `/admin/login`
- Email: `admin@infotronsolutions.com`
- Password: `Infotron@2026!Admin`

Rotate credentials by regenerating the bcrypt hash and updating `backend/.env`:

```bash
cd /app/backend && python3 -c "
import bcrypt
print(bcrypt.hashpw(b'NEW_PASSWORD', bcrypt.gensalt()).decode())
"
```

Then update `ADMIN_PASSWORD_HASH` in `backend/.env` and restart the backend.
