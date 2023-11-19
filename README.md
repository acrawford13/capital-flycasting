# Grav theme for Capital Fly Casting site


### To build theme

```
npm install
npm run build:export
```
All content should be output to `export` folder

### To test with Grav site

This is a theme only and doesn't contain the site content or Grav setup. You will need to install Grav to use this theme.

To make a new Grav project to test this theme:
- Install Grav https://github.com/getgrav/grav
- Install php with Homebrew
- Run server:
```
php -S localhost:9000 system/router.php
``````

- Create a new folder in that project `/user/themes/capitalflycasting`, and copy everything from the `export` folder into it
- Download `user/config/system.yaml` from Capital Flycasting site (this is important for the theme, and for some old configuration that makes the theme work)
- Download some page content from Capital Flycasting site
- You should see the site as expected

#### Install admin
- In your Grav project, run `bin/gpm install admin`

---

Made with <3 by Andrea for Capital Fly Casting
