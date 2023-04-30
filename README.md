# csv-visualizer
csv-visualizer, a simple full-stack web app that accepts csv exports and renders beautiful visualizations through Grafana

## stack
- Frontend - Astro 
- API(for uploading CSV) - Go, Gin
- BaaS(authentication and storage) - Firebase authntication and Firestore
- Visualization tool - Grafana (Open Source version)
- Containerization - Docker
- Testing - Jest

## visualize a file

### upload file

![image](https://user-images.githubusercontent.com/83641627/235371065-dd4b70db-8435-486b-8e20-c9c5e14e48ec.png)

- click on 'Upload'
- browse through your computer to choose a csv file
- click on 'Submit'
- click anywhere outside the modal to close it
- click om 'Visualize' and tadaa..your csv file visualized through a grafana panel, in a tabular format

![image](https://user-images.githubusercontent.com/83641627/235371155-ee82eb54-bb2d-43f9-808d-adb0ffc4a590.png)

### share panel 
- click on the "clone" icon, above the panel, this will copy the panel link to clipboard

### register
- click on the "Sign-In" button (in the header)

![image](https://user-images.githubusercontent.com/83641627/235371398-3d4769ce-a566-4bb3-8117-7b50c009cf2b.png)

- click on 'New here? Sign Up'

![image](https://user-images.githubusercontent.com/83641627/235371262-4e0e21b7-680e-47e3-bdc1-c4eaba460dbc.png)

- enter creds and click on 'Sign Up'
- creating an account will automatically log you in
- a table containing previously saved files (if any) will be rendered 

![image](https://user-images.githubusercontent.com/83641627/235370948-dd1322e3-f421-4815-b98f-7a189158d762.png)


## save, share and delete panels
- click on 'Save', the file details will appear in the user-specific table
- hovering a record will display the "delete" and "clone" icons
  - click on "clone" icon, this will copy the panel link to clipboard
  - click on "delete" icon, to delete a panel record from the database 


## the "how"  
- user selectes a file and clicks on 'submit' 
  > CSV file is uploaded to the backend server via a rest API\
  > the server, satically hosts this file
- user clicks on 'Visualize' button and the following requests are made, 
  > POST request via data source API to create a new data source for the uploaded file\
  > GET request via Dashboard API to fetch the existing panels\
  > POST request via Dashboard API to add a new panel to the existing array of panels\
  > (used an nginx proxy to get around the CORS error faced while making calls directly to the grafana server)\

- user clicks on 'Save' 
  > documents are fetched from firestore and the container is populated
- user clicks on trash can
  > document is deleted from the firestore collection specific to the user
