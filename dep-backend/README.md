This project has been tested on Arch Linux and Windows 11.

Setup Backend:

Optionally create new virtual environment by using `python3 -m pip venv .venv && source .venv/bin/activate`

1. Go to script.google.com and create a new script and copy content from `app-scripts/otp.gs` and deploy the script. Copy the url of deployed function.
2. Go to script.google.com and create a new script and copy content from `app-scripts/reminder.gs` and deploy the script. Copy the url of deployed function.
3. `git clone 'git@github.com:aman-1004/dep-backend.git'`
4. `cd dep-backend`
5. `pip install -r requirements.txt`
6. Create `env.py` file with format:
```
OTP_URL='[URL OBTAINED FOR T1]'
REMINDER_URL='[URL OBTAINED FOR T2]'
```
7. `python3 app.py`

Setup Frontend:

8. `git clone git@github.com:aman-1004/dep-frontend.git`
9. `cd dep-frontend`
10. `npm install`
11. Ensure the backend is running at port 5000. If not change port in `vite.config.js`
12. `npm run dev`
