#!/usr/bin/env python3
import subprocess

sql = """
CREATE DATABASE IF NOT EXISTS whmcs_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'whmcs_user'@'localhost' IDENTIFIED BY 'WhmcsDB2026@!';
GRANT ALL PRIVILEGES ON whmcs_db.* TO 'whmcs_user'@'localhost';
FLUSH PRIVILEGES;
"""

result = subprocess.run(
    ['mysql', '-u', 'root', '-p6xqBcu0rSmXCMs', '-e', sql],
    capture_output=True, text=True
)
if result.returncode == 0:
    print("WHMCS database and user created successfully!")
    print("DB: whmcs_db")
    print("User: whmcs_user@localhost")
    print("Pass: WhmcsDB2026@!")
else:
    print(f"Error: {result.stderr}")
