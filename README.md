# csv-visualizer
csv-visualizer, a simple full-stack web app that accepts csv exports and renders beautiful visualizations through Grafana

## stack
- Frontend - Astro 
- File upload API - Go, Gin
- BaaS(authentication and storage) - Firebase
- Visualization tool - Grafana (Open Source version)
- Containerization - Docker

## How to use it ? <p>(to be replaced with a user flow diagram soon enough 😌)</p>

### visualize a csv file
![image](https://user-images.githubusercontent.com/83641627/229304559-c613d4c9-f3ba-417d-9482-c67d9894ead3.png)

- click on 'Upload'
![image](https://user-images.githubusercontent.com/83641627/229304690-80f7d3ec-5baa-4ca3-a833-811e0be9db69.png)
- browse through your computer to choose a csv file
- click on 'Submit'
- click anywhere outside the modal window to close it
- click om 'Visualize'
![image](https://user-images.githubusercontent.com/83641627/229304744-2dd5f610-f8bb-494d-b9f9-8dabda5bf290.png)
- and get your csv file visualized through a grafana panel, in a tabular format

### new to csv-visualizer ?
![image](https://user-images.githubusercontent.com/83641627/229306423-b5e41858-09d6-41df-9aa3-b090d004e07b.png)

- click on 'Sign Up'
![image](https://user-images.githubusercontent.com/83641627/229306437-64e615ae-e402-4b6d-98b2-6eacc86e1c03.png)

- enter creds and click on 'Submit'
- creating an account will automatically log you in
- a table containing previously saved files (if any) will be rendered 
![image](https://user-images.githubusercontent.com/83641627/229306565-af99ebb5-b3bc-4a6c-932d-ff931863790a.png)


## wanna save generated links and share with others ?
- after visualizing, click on 'Save'
- link will appear along with file-specific information, copy it and share with anyone you like
- to delete a link, click on the trash can 
![image](https://user-images.githubusercontent.com/83641627/229306634-41ab4716-278a-4fb5-b017-55228c5b0645.png)

## how visualization works 
- user selectes a file and clicks on 'submit' 
  > CSV file is uploaded to the backend server via a rest API\
  > the server, satically hosts this file
- user clicks on 'Visualize' button and the following requests are made, 
  > POST request via data source API to create a new data source for the uploaded file\
  > GET request via Dashboard API to fetch the existing panels\
  > POST request via Dashboard API to add a new panel to the existing array of panels\
- (I have used an nginx proxy to get around the CORS error faced while making calls directly to the grafana server)
- user clicks on 'Save' 
  > documents are fetched from firestore and the container is populated
- user clicks on trash can
  > document is deleted from the firestore collection specific to the user
