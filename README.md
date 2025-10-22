# JAVA + Flowable 

This is a <b>Flowable + Java</b> demo project with sample code to demonstrate my knowledge and skills.  

Simple structure of Bank 🏦 (UML schema)

<p align="left">
    <img src="./src/main/resources/mystatic/schemas/schema2.png" />
</p>

<p align="left">
    <img src="./src/main/resources/mystatic/images/1000000296.png" width="170" />
    <img src="./src/main/resources/mystatic/images/1000000295.png" width="170" />
    <!--img src="./src/main/resources/mystatic/images/1000000169.png" width="170" /-->
    <img src="./src/main/resources/mystatic/images/1000000170.png" width="170" />
    <img src="./src/main/resources/mystatic/images/1000000161.jpg" width="170" />
</p> 

## Description 
This simple demo project demonstrates how I work with Flowable (dependencies on Maven + Flowable-UI from docker-compose.yml). 
This is the monolithic project on Java (with Spring Security and login via username/password and the Thymeleaf template engine) 
and with a REST API (accessible via JWT). 

For work with Flowable I created simple CRM with several Entities and html pages with CRUD functionality to manage them.
After that, I started working with Flowable and creating different BPMN process (like application for user, example: 
'Job application', 'Leave application', etc.). I came up with the forms myself and figured out how they could be 
added to the CRM.

I want to extend the project with multiple BPMN, CMMN, and DML processes, as well as their combinations, to demonstrate my expertise in working with them.
In the future, I’d like to expand the project with new entities, possibly up to an ERP system.

I enjoy working with it.

Below you can see a few screenshots from the project. 

## Screens

### CRM
<p align="left">
    /login (by login and password)
    <img src="./src/main/resources/mystatic/images/screen4.png" />
    Page with BPNM, CMMN processes  
    <img src="./src/main/resources/mystatic/images/screen7.jpeg" />
    Page with Departments 
    <img src="./src/main/resources/mystatic/images/screen8.jpeg" />
</p>

### Flowable UI 
Flowable UI from docker-compose.yml 

<p align="left">
    Flowable UI
    <img src="./src/main/resources/mystatic/images/screen5.png" />
    Add BPMN process
    <img src="./src/main/resources/mystatic/images/screen6.png" />
    BPMN process
    <img src="./src/main/resources/mystatic/images/screen9.png" />
</p>

### REST API 
accessible via JWT
<p align="left">
    /api/auth/login (send login and password)
    <img src="./src/main/resources/mystatic/images/screen1.png" />
    /api/v1/clients 
    <img src="./src/main/resources/mystatic/images/screen2.png" />
    /api/v1/clients (jwt token expired)
    <img src="./src/main/resources/mystatic/images/screen3.png" /> 
</p>
