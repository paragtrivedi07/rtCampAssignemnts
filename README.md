**Prerequisites**
Before running the automation scripts, ensure you have the following:

**1. System Requirements**
Operating System: Windows/Mac/Linux
RAM: Minimum 4GB (8GB recommended)
**2. Software Requirements**
Node.js: Version >=16.0.0
Download Node.js
Visual Studio Code: Latest version
Download Visual Studio Code
**3. Required Dependencies**
Playwright: Version >=1.37.0
Install via npm install playwright
**Browsers:**
Chromium, Firefox, WebKit (automatically installed with Playwright)
To ensure browsers are up-to-date: npx playwright install
**4. Additional Tools**
Git: Version >=2.0.0 (for cloning and managing the repository)
Download Git
Video Player: To view recorded videos (e.g., VLC Player).


**Setup Instructions**
Clone the Repository:

git clone <repository_url>
cd <repository_directory>

**Install Dependencies:**
npm install

**Verify Browsers Installation:**
npx playwright install

**Running the Test**
Run the test with video recording enabled (non-headless mode):
npx playwright test rtCamp.spec.js --headed --video=on

--headed: Ensures the browser runs in non-headless mode.
--video=on: Records the test execution.

**Test File Details**
File Name: rtCamp.spec.js
Purpose: Automates Assignment 2 scenarios.
Prerequisites: Review Assignment 1 Document for detailed test case design and implementation background.

**Video Recording**
The test run with video recording is available at the following link:

Assignment 2 Video




