import uuid
import hashlib
import subprocess

# New password
new_password = 'Admin2026Secure!'

# Generate hash
salt = uuid.uuid4().hex
h = hashlib.sha256(salt.encode() + new_password.encode()).hexdigest()
new_hash = h + ':' + salt

# Update database
sql = f"UPDATE cyberpanel.loginSystem_administrator SET password='{new_hash}' WHERE userName='admin';"
result = subprocess.run(
    ['mysql', '-u', 'root', '-p6xqBcu0rSmXCMs', '-e', sql],
    capture_output=True, text=True
)
if result.returncode == 0:
    print(f"Password updated successfully!")
    print(f"New password: {new_password}")
else:
    print(f"Error: {result.stderr}")
