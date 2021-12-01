
index.js is the node express server
src and public is the react app

to run locally
1. make sure nodejs and npm is installed
2. run 'npm install' in the directory - this installes all dependencies
3. run 'npm run build' - this builds the site for production
4. run 'npm run start'- this starts the server at port 80
5. goto localhost in the browser

This project uses firebase firestore to load the products, you can replace that part of the code with static details or reach out on how to setup a firebase project.
Go to src/firebase.js and add config details
