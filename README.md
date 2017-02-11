# 500px Coding Challenge

You can access this web app at http://percyteng.me:7000
Name: Percy Teng
Github: https://github.com/percyteng
Portfolio: http://percyteng.me
Linkedin: https://ca.linkedin.com/in/percy-teng

# Tech stacks:
For this coding challenge, I used React.js as front-end framework and used Node.js for server-side coding.

I started this project with a react.js starter kit made by myself. However, I have removed some features that are not used in this web app such as redux and react-router.

There are a lot of existing react libraries that would make this app incredibly easy but I decided not to use most of them since I assume that was not the point of this challenge.

# Design Mindset:
The core UI design style is simplicity, especially for photo apps like this, users would apparently like to focus more on the beautiful photo contents instead of my UI. (Inspired by beautiful 500px UI)

However, I did try to add some animation and render delay to make it more fun and smooth.
The main component is called homePage.js under <b>components</b> directory.

# Fetching API
I have registered my developer status on 500px and I gained the corresponding SDK key.
I was able to access /photos api for obtaining popular photos by copying 500px.js into my own app directory and import them through html so I can use the _500px function directly in my javascript file. On top of that, I added a little bit error handling code so users can be notified just in case anything wrong happens.

# UI Layout
For the regular mode, I decide to put three images in a row. Here comes my first issue. Most images have different sizes and they would look really messy if I just give them a 33% width due to their different height. I have tried to analyze 500px UI layout and it seems like all the photos are re-arranged according to their size so images with different size can be grouped perfectly together to fill out a row. I thought of a solution by using Greedy Algorithm to achieve that behaviour but it has a high complexity which is probably not the best idea.

Later on, I decided to have every image scale to fill the given size by setting the image div's backgroundSize to 'cover'. This way, I can achieve a relatively asthetically pleasing vision with low complexity. Of course, stretching the image would also cause some parts of the image invisible to users. I solved this issue by allowing user to click on the image for a zoomed in view with the image's original size displayed on a modal.

Hovering over images will provide the neccessary details of the image to users. (title and publisher's name) I achieved that by dynamically changed caption div's opacity while users have mouse over the image view.

# Styling.
In-line styling in React.js is very useful due to the benefits of JSX. I was able to dynamically change the components style with ease. However, <b>I still wrote a seperate css file for specific html component styling such as img tag.</b>

# Infinite scroll.
Between pagination and infinite scroll, I decided to go with infinite scroll just because it looks more modern and it is more effortless for users to use the app. Very easy to implement, just push the next page into the array of currently displayed images and it looks awesome.
