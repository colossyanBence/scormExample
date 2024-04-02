# SCORM test app

SCORM 2004 V4 API

Example app with library usage and all the available data model. GET button log to console. SET triggers call with the input field value.
Creates a single html as build output.

# Create export for LMS
- $ npm run build
- copy imsmanifest.xml to dist folder
- create a zip file from the manifest and the index.html file
- upload zip to LMS
