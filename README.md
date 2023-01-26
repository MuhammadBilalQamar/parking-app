# Parking App
Parking app development repository

## Setup 

1. Create ssh key by following the steps mentioned https://help.github.com/en/articles/connecting-to-github-with-ssh .
2. Run following in your home directory `git clone git@github.com:MuhammadBilalQamar/parking-app.git` to clone the project and all child repositories.
3. In the root directory run `yarn run dev-client-install` this will install all neccessary dependencies for client side.
4. In the root directory run `yarn run dev-server-install` this will install all neccessary dependencies for server side. **Please Avoid parallel installation**.
5. Now In order to run client and server concurrently you need to install concurrently package. run `npm i -D concurrently`.
6. After that make sure in both client and server directories we will have proper .env files(**Note:-** for now I forecefully pushed the .env files in the repo but obiviously we can make it private in future). 
7. Run `yarn run dev` that will run both server and client concurrently.
   - [ ] http://localhost:3000/  (Client)
   - [ ] http://localhost:5000/  (Server)

## Api Document
1. You can find the api document in root directory (file name is **apisDocs.txt**)

## Editor setup
Setup Visual Studio Code, and add following extensions

#### bierner.markdown-preview-github-styles
Markdown Preview with Github style - Helps preivew md files in VS Code https://marketplace.visualstudio.com/items?itemName=bierner.markdown-preview-github-styles

#### dbaeumer.vscode-eslint
VSCode ESlint extension - To ensure consistent code styling
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

#### EditorConfig.EditorConfig
EditorConfig (https://editorconfig.org/) helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs. 

#### GitHub.vscode-pull-request-github
For reviewing pull requests inside VSCode - Makes the Pull request workflow clean https://github.com/Microsoft/vscode-pull-request-github


#### humao.rest-client
Test REST APIs from VSCode - Save requests and responses and quickly try APIs
https://marketplace.visualstudio.com/items?itemName=humao.rest-client


#### PeterJausovec.vscode-docker
Docker support for vscode
https://code.visualstudio.com/docs/azure/docker


#### streetsidesoftware.code-spell-checker
Spell checking inside code and comments
https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

## Screenshots

![image](https://user-images.githubusercontent.com/42898923/214874043-5ed49ad8-04da-497f-bac7-362dfcead12e.png)

![image](https://user-images.githubusercontent.com/42898923/214873807-acea119e-9aae-45d0-bde3-9f704ba0174c.png)

![image](https://user-images.githubusercontent.com/42898923/214873913-e63ca5ba-2d66-4466-9652-e23d603a61b7.png)

![image](https://user-images.githubusercontent.com/42898923/214873972-73efeb53-8451-44dd-8926-e298a1b6c07c.png)



