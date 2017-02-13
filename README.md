# 500px Coding Challenge

It is a fun challenge and I really enjoyed it!
This app should be both web and mobile friendly!
Access the demo at http://percyteng.me:8000

Note:
This repository has two contributors and they are both my accounts. I think I accidently made a commit in my other github account when it was public, sorry about that!

# Features:
I have completed all the required features plus some additional ones
Required Features:
1. Using 500px api to access popular pictures on 500px and display them in a image grid that
2. implemented infinite scrolling when users scroll to the bottom
3. basic information of the image gets displayed when users hover over them

Additional Features:
1. When users click on the image, they will get a large image modal containing the original size of the image together with detailed description as well as image publisher's profile picture and name
2. A little fun functionality. Any visitors can tap on the heart icon on the top to give a support to this page. The amount of support are stored in a mongodb database.

# Tech stacks:
For this coding challenge, I used React.js as front-end framework, Node.js for server-side coding and MongoDB for storing the amount of supports I get.

I started this project with a react.js starter kit made by myself previously. However, I have removed some features that are not used in this web app such as redux and react-router.

There are a lot of existing react libraries that would make this app incredibly easy but I decided not to use most of them since I assume that was not the point of this challenge. I did however, used some of them to demonstrate my capability of using existing libraries.

# Structures:
The ./index.js file in the root directory creates a node.js web server then direct to ./public/index.html

./src/index.js is the starting file which does nothing but points to the main component ./src/homePage.js

./src/fullScreenImage.js contains the code for the full screen sized images when users click on individual image on the photo grid.

./public/styles.css is the style file

# Design Mindset:
The core UI design style is simplicity, especially for photo apps like this, users would apparently like to focus more on the beautiful photo contents instead of my UI. (Inspired by beautiful 500px UI)

However, I did try to add some animation and render delay to make it more fun and smooth.

# Fetching API
I have registered my developer status on 500px and I gained the corresponding SDK key.
I was able to access /photos api for obtaining popular photos by copying 500px.js into my own app directory (./public/500px.js) and import them through html so I can use the _500px function directly in my javascript file. On top of that, I added a little bit error handling code so users can be notified just in case anything wrong happens.

# UI Layout
I decide to put three images in a row. Here comes my first issue. Most images have different sizes and they would look really messy if I just give them a width of 1/3 of the screen due to their different heights. I have tried to analyze 500px official site UI layout and it seems like all the photos are re-arranged according to their size so images with different size can be grouped perfectly together to fill out a row. I thought of a solution by using Greedy Algorithm to achieve that behaviour but it has a high complexity which is probably not the best idea.

Later on, I decided to have every image scale to fill the given size by setting the image div's backgroundSize to 'cover'. This way, I can achieve a asthetically pleasing vision with low complexity. Of course, stretching the image would also cause some parts of the image invisible to users. I solved this issue by allowing user to click on the image for a zoomed in view with the image's original size displayed on a modal.

Hovering over images will provide the neccessary details of the image to users. (title and publisher's name) I achieved that by dynamically changed caption div's opacity while users have mouse over the image view.

# Styling.
I included most of my styles in a seperate css file. I also implemented some in-line styling in React.js as it is very useful due to the benefits of JSX. I was able to dynamically change the components style with ease.

# Infinite scroll.
Between pagination and infinite scroll, I decided to go with infinite scroll just because it looks more modern and it is more effortless for users to use the app. I implemented this by calling 500px api and pushing the next page into the array of currently displayed images and it looks awesome.


# Installation
1. `git clone https://github.com/percyteng/500px-coding-challenge.git`
2. `npm install`
3. `npm start`
After the installation, it might not work because I have my mongodb credentials stored in environment variables.

# My information
1. Name: Percy Teng
2. Github: https://github.com/percyteng
3. Portfolio: http://percyteng.me
4. Linkedin: https://ca.linkedin.com/in/percy-teng

