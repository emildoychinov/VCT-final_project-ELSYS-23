# Image Fetcher
This is a final project for the VCT class @ELSYS7

#How to run?

```bash
  ./init_server.sh #this builds a docker image of the server and runs the kubernetes configuration
  ./drop_server.sh #this deletes the docker image of the server and drops the kubernetes configuration
```

#Usage 
 
![image](https://github.com/emildoychinov/VCT-final_project-ELSYS-23/assets/65024936/ab01609f-99cb-476c-a54b-685aabcab81b)
Enter a keyword and depth of choice and wait for the image to load

#Image load speed
Image loading is not instant as it is done via requests to an API. In order to make it partially faster, a log of every search made is kept in the database. 
Every single time a keyword and depth that have already been searched are entered, a load of a couple milliseconds is expected.

#Application configuration

In order to ensure high availability and elasticity, this is the following structure of the application :
![project-diagram](https://github.com/emildoychinov/VCT-final_project-ELSYS-23/assets/65024936/bcf4c854-0cbd-4b2f-b203-4c88d0d9cb4f)
