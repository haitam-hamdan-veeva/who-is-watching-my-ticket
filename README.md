# Who Is Watching My Ticket
Tampermonkey script to display avatar-less Zendesk agents' names.
## Demo
![demo](https://github.com/haitam-hamdan-veeva/who-is-watching-my-ticket/blob/main/images/demo.gif)
## How to install
1. Install Tampermonkey from: https://www.tampermonkey.net/
2. Create a new script:  
![create new script](https://github.com/haitam-hamdan-veeva/who-is-watching-my-ticket/blob/main/images/create_new_script.png)
3. Press CTRL + A and delete everything
4. Copy and paste the script, then click on File > Save:
![copy and save](https://github.com/haitam-hamdan-veeva/who-is-watching-my-ticket/blob/main/images/copy_and_save.png)
5. Ensure that the script is toggled ON:  
![enable script](https://github.com/haitam-hamdan-veeva/who-is-watching-my-ticket/blob/main/images/enable_script.png)
6. Navigate to your Zendesk ticket and refresh the page
## TODO
- [ ] Fix viewers with a middle name are not displaying fully
- [ ] Fix a bug where the name flicker from up to down on load (default positioning should be under the avatar)
- [x] Enhance the flexbox containers to support readability
- [ ] Enhance the main function call to support [MutationObserver()](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe)
