## Noteful JSON Server

This is a project for education purposes created by Thinkful.

This is a json-server managed API meant for developing `noteful-client` projects.

Once started, this will run a local API server on `http://localhost:9000`.

If you navigate to the base URL there will be a HTML documentation page displayed.

There are two top level endpoints:

- /folders
- /notes

Both support GET, POST, PUT, PATCH and DELETE requests. For PUT, PATCH and DELETE requests you must supply the respective id in the endpoint's path.

For example:

- GET /notes
- GET /folders
- POST /notes
- POST /folders
- PATCH /notes/{note-id}/
- PATCH /folders/{folder-id}/
- DELETE /notes/{note-id}/
- DELETE /folders/{folder-id}/

To start the server, run `npm start`.

The database is initiated from the `db.js` file whenever the server is started. No data is persisted after the server has been shut down.
