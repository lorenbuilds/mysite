---
title: "How to change the header logo when scrolling -  Shopify"
description: "This is a shopify tutorial on How to change the header logo when scrolling -  Shopify."
date: 2025-02-01
tldr: "This tutorial teaches you how to change the header logo when scrolling -  Shopify."
draft: false
toc: true
---

## Create a new file named header-scroll.js

{{< codebox >}}
class LogoScroll {
constructor() {
this.init();
}

init() {
// Wait for DOM to be ready
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", () => this.setup());
} else {
this.setup();
}
}

setup() {
this.header = document.querySelector(".header\_\_heading-logo");
this.headerWrapper = document.querySelector(".header-wrapper");

    if (this.header) {
      this.defaultLogoSrc = this.header.src;
      this.scrolledLogoSrc = this.header.dataset.scrollLogo;

      console.log("Default Logo:", this.defaultLogoSrc);
      console.log("Scrolled Logo:", this.scrolledLogoSrc);

      if (this.scrolledLogoSrc) {
        // Remove sticky type and add always-sticky class
        if (this.headerWrapper) {
          this.headerWrapper.removeAttribute("data-sticky-type");
          this.headerWrapper.classList.add("always-sticky");
        }

        // Add scroll event listener
        window.addEventListener("scroll", () => this.handleScroll());

        // Check initial scroll position
        this.handleScroll();
        console.log("Scroll listener added");
      } else {
        console.log("No scrolled logo source found");
      }
    } else {
      console.log("Logo element not found");
    }

}

handleScroll() {
console.log("Scroll position:", window.scrollY);

    if (window.scrollY > 30) {
      console.log("Switching to scrolled logo");
      if (this.header) {
        this.header.src = this.scrolledLogoSrc;
        this.header.classList.add("scrolled");
      }
      if (this.headerWrapper) {
        this.headerWrapper.classList.add("scrolled");
      }
    } else {
      console.log("Switching to default logo");
      if (this.header) {
        this.header.src = this.defaultLogoSrc;
        this.header.classList.remove("scrolled");
      }
      if (this.headerWrapper) {
        this.headerWrapper.classList.remove("scrolled");
      }
    }

}
}

// Initialize the logo scroll functionality
new LogoScroll();

{{< /codebox >}}

## Update theme.liquid

{{< codebox >}}

<script src="{{ 'header-scroll.js' | asset_url }}" defer="defer"></script>

{{< /codebox >}}

## Update header.liquid

{{< codebox >}}

    {%- if section.settings.logo != blank -%}
      <div class="header__heading-logo-wrapper">
        <img
          class="header__heading-logo"
          src="{{ section.settings.logo | image_url: width: section.settings.logo_width }}"
          data-scroll-logo="{{ section.settings.scroll_logo | image_url: width: section.settings.logo_width }}"
          alt="{{ section.settings.logo.alt | default: shop.name | escape }}"
          width="{{ section.settings.logo_width }}"
          height="{{ section.settings.logo.height | divided_by: section.settings.logo.aspect_ratio | round }}"
        >
      </div>

{{< /codebox >}}

## Add Settings to the theme

add code to line 631

{{< codebox >}}

{
"type": "image_picker",
"id": "scroll_logo",
"label": "Scrolled Logo"
},
{
"type": "image_picker",
"id": "logo",
"label": "Logo"
},

{{< /codebox >}}

## Add CSS Styles

- Open your base.css file in the Assets folder
- Add these styles:

{{< codebox >}}

.header {
width: 100%;
max-width: var(--page-width);
margin: 0 auto;
padding: 0 1.5rem;
}

.header-wrapper {
position: sticky;
top: 0;
z-index: 100;
background: var(--gradient-background);
transition: transform 0.3s ease-in-out;
}

.header\_\_heading-logo.scrolled {
opacity: 1;
}

.header\_\_heading-logo {
transition: all 0.3s ease-in-out;
width: auto;
height: auto;
max-width: 100%;
display: block;
}

.header\_\_heading-logo-wrapper {
display: block;
width: 100%;
}

.header-wrapper--hidden {
transform: none !important;
}

.header\_\_heading-logo {
transition: all 0.3s ease-in-out;
width: auto;
height: auto;
max-width: 100%;
display: block;
}

.header-wrapper.scrolled {
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-wrapper.always-sticky {
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 100;
background: var(--gradient-background);
transition: transform 0.3s ease-in-out;
transform: translateY(0) !important;
}

.header-wrapper.always-sticky {
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 100;
background: var(--gradient-background);
transition: transform 0.3s ease-in-out;
transform: translateY(0) !important;
}

body {
padding-top: var(--header-height, 80px);
}

.header\_\_heading-logo {
transition: all 0.3s ease-in-out;
width: auto;
height: auto;
max-width: 100%;
display: block;
}

.header\_\_heading-logo.scrolled {
opacity: 1;
}

.header\_\_heading-logo-wrapper {
display: block;
width: 100%;
}

/_ Add shadow when scrolled _/
.header-wrapper.scrolled {
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/_ Ensure the header takes full width _/
.header {
width: 100%;
max-width: var(--page-width);
margin: 0 auto;
padding: 0 1.5rem;
}

{{< /codebox >}}

## Add logos to the theme

- Add the logo to the theme
- Add the scroll logo to the theme
