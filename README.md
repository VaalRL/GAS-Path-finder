# Google Drive File Path Finder

This is a Google Apps Script project that helps users quickly find the full path of a file or folder in Google Drive.

## Features

- Accepts shared links of Google Drive files or folders
- Displays the full path of the file or folder
- Provides the path with Markdown links for easy copying and sharing
- Shows detailed information about the file or folder, including type, MIME type (for files), and parent folder information

## How to Use

1. Deploy this project as a Google Apps Script Web Application
2. Open the deployed Web App URL
3. Paste the shared link of a Google Drive file or folder into the input box
4. Click the "Obtain file information" button
5. View the results, including the full path and detailed information

## Project Structure

- `code.gs`: Google Apps Script file containing all backend logic
- `index.html`: HTML file for the frontend user interface

## Main Functions

- doGet(): Sets up the HTML output for the Web Application
- processFileUrl(fileUrl): Processes the input file URL and returns file information
- extractFileId(url): Extracts the file ID from the URL for further processing
- getItemPathAndFolderUrls(itemId): Retrieves the full path and related information for a file or folder

## Notes

- Users must have access permissions to the target file or folder to ensure the application functions correctly
- This application needs to run in the Google Apps Script environment
- Ensure appropriate access settings are configured when deploying

## License

This project is licensed under the MIT License. See the LICENSE file for details.


