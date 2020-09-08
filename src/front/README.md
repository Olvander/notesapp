Simple Full Stack notes app created with React.js, Spring Boot and H2.<br/> 
I made this to test if I can create a Full Stack app with a properly working REST api.

## Table of contents
* [General info](#general-info)
* [Screenshot](#screenshot)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)

## General info
This project is a simple notes app.<br/>
User can add, remove and edit notes in the H2 database.<br/>
The data is persistently stored into a database file<br/>
but may be removed using the Remove button.

## Screenshot



## Technologies
The project has been created with:
* React.js
* Java Spring Boot
* H2 embedded database
	
## Setup
To run this project, just run the attached jar file in command prompt:

java -jar notesapp-v1.0.jar

Then open a browser and type:
http://localhost:8080

The H2 database can be found at:
http://localhost:8080/h2-console

## Features

- Add notes
- Edit notes
- Remove notes
- View them truncated in the sidebar
- View them as whole texts in the center of the screen
- In command line, do REST api calls with e.g. curl

## Status

The project status is complete.