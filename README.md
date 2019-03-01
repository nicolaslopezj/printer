# Sodlab Printer App

## Introduction

App developed to act as a bridge between the Sodlab ERP web app and printers connected to the end user PC.

Use cases:
+ Receipt printing using POS printers
+ Silent (automatic) printing of documents

## Features:
* "Configuration" Section (select printer name, input server port, test selected configuration)
* Light/Dark mode
* Minimize/Close window to icon tray and restore from it
* Start on system boot
* AutoUpdate (Look for updates on app start, download them and restart the app automatically)

## Todo:
* Update to latest version of electron-react-boilerplate
* Document the available endpoints
* Add LICENSE
* Add code certificate (sign code)

### Additional notes:

> This project is a fork of https://github.com/chentsulin/electron-react-boilerplate.
> Refer to this project repo for additional information about its usage

Special characters to use in the node-thermal-printer epsonConfig file:
		é: 130,
		á: 160,
		í: 161,
		ó: 162,
		ú: 163,
		ñ: 164,
		'°': 186

## Development mode

To run the app in development, you need to have installed:
* NodeJs
* Yarn
* The drivers of the printer you are going to use. (The drivers for the EPSON T20ii can be found in the Sodlab GDrive)

### Package installation

This project uses a two package.json configuration. One in the root of the project and another one inside the app folder. Packages that depend on native dependencies or need to be compiled must be installed inside the "app" folder. Normal packages should be installed in the root folder.

1. Install the packages in the root folder first using "yarn"
2. Then install the packages in the app folder using "yarn"

!!IMPORTANT: The node-thermal-printer and printer depencies may need some other software to work, it is recommended you check the repos for each package if you have any problem installing them.

### Running in dev mode

```
yarn dev
```

## Deployments

There are two ways to distribute this app. Generate the executable file on your PC and distribute it manually or automatically upload it AWS S3 and manage its version so it updates itself automatically when a new release is published.

### Create a local executable

From the root folder, run:
```
yarn package
```

### To upload the artifact to AWS S3

Pre requisites: Have installed the aws cli and have created a profile with the necessary permissions to upload files to S3. In this case we are going to assume that profile is named "sodlab"

From the root folder:
```
AWS_PROFILE=sodlab yarn release
```


