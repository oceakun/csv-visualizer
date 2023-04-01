# csv-visualizer

## How to use it ?

### for one-time users 
![image](https://user-images.githubusercontent.com/83641627/229304559-c613d4c9-f3ba-417d-9482-c67d9894ead3.png)

- click on 'Upload'
![image](https://user-images.githubusercontent.com/83641627/229304690-80f7d3ec-5baa-4ca3-a833-811e0be9db69.png)
- browse through your computer to choose a csv file
- click on 'Submit'
- click anywhere outside the modal window to close it
- click om 'Visualize'
![image](https://user-images.githubusercontent.com/83641627/229304744-2dd5f610-f8bb-494d-b9f9-8dabda5bf290.png)
- and get your csv file visualized through a grafana panel, in a tabular format

## stack
- Frontend - Astro 
- File upload API - Go, Gin
- BaaS(authentication and storage) - Firebase
- Visualization tool - Grafana (Open Source version)

## how it works ?
- user selectes a file and clicks on 'submit' button 
> CSV file is uploaded to the backend server via a rest API 
> the server, satically hosts this file
- user clicks on 'Visualize' button and the following requests are made, 
> POST request via data source API to create a new data source for the uploaded file
> GET request via Dashboard API to fetch the existing panels 
> POST request via Dashboard API to add a new panel to the existing array of panels
(I have used a nginx proxy to get around the CORS error faced while making calls directly to the grafana server)
