---
title: "How to create a Circle Menu Collection in Shopify Without APP"
description: "This is a shopify tutorial on How to create a Circle Menu Collection in Shopify Without APP."
date: 2025-02-01
tldr: "This tutorial teaches you how to create a circle menu collection in Shopify without using an app. It provides step-by-step instructions on customizing your Shopify theme to add a circular menu, including modifying the code and styling it with CSS."
draft: false
toc: true
---

## Create a section called circle-menu.liquid

{{< codebox >}}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
{{ 'circle-menu.css' | asset_url | stylesheet_tag }}

<div class="circle-menu-section" style="
  background-color:{{ section.settings.section_background }}; 
  background-image: {{ section.settings.section_background_gradient }};
  --title-color: {{ section.settings.title_color }};
  --tag-color: {{ section.settings.tag_color }};
  --border-color: {{ section.settings.border_color }};
  --tag-background: {{ section.settings.tag_background }};
  --tag-background-gradient: {{ section.settings.tag_background_gradient | default: 'none' }};
">
  <div class="circle-menu-section-settings">
    <div class="circle-menu-slider swiper preview">
      <div class="swiper-wrapper">
        {% for block in section.blocks %}
          <div class="swiper-slide circle-menu-item" {{ block.shopify_attributes }}>
            {% if block.settings.collection %}
              <a href="{{ block.settings.collection.url }}">
            {% endif %}
              <div class="circle-menu-image">
                {% if block.settings.image %}
                  {{ block.settings.image | image_url: width: 400 | image_tag:
                    loading: section.settings.lazy_load | default: 'lazy',
                    widths: '165, 360, 535, 750, 1070, 1500'
                  }}
                {% endif %}
              </div>
              {% if block.settings.tag != blank %}
                <p class="circle-menu-tag" style="background-color:{{ section.settings.tag_background }}; background-image: {{ section.settings.tag_background_gradient }};">{{ block.settings.tag }}</p>
              {% endif %}
              {% if block.settings.title != blank %}
                <p class="circle-menu-title">{{ block.settings.title }}</p>
              {% endif %}
            {% if block.settings.collection %}
              </a>
            {% endif %}
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
  function circleMenu() {
    document.querySelector('.circle-menu-slider').classList.remove('preview')
    new Swiper('.circle-menu-slider', {
      spaceBetween: {{ section.settings.gap }},
      slidesPerView: 'auto',
      breakpoints: {
        320: {
          slidesPerView: {{ section.settings.mobile_visible_items }},
          spaceBetween: {{ section.settings.gap_mobile }}
        },
        768: {
          slidesPerView: {{ section.settings.desktop_visible_items }},
          spaceBetween: {{ section.settings.gap }}
        }
      }
    });
  }


  document.addEventListener('DOMContentLoaded', circleMenu);

  if (Shopify.designMode) {
     document.addEventListener('shopify:section:unload', circleMenu);
     document.addEventListener('shopify:section:load', circleMenu);
  }
</script>

{% schema %}
{
"name": "Circle Menu",
"settings": [
{
"type": "header",
"content": "Layout Settings"
},
{
"type": "range",
"id": "max_width",
"label": "Max Container Width",
"min": 800,
"max": 1800,
"step": 50,
"default": 1200,
"unit": "px"
},
{
"type": "range",
"id": "image_size",
"label": "Image Size (Desktop)",
"min": 80,
"max": 300,
"step": 10,
"default": 150
},
{
"type": "range",
"id": "mobile_image_size",
"label": "Image Size (Mobile)",
"min": 60,
"max": 200,
"step": 10,
"default": 100
},
{
"type": "header",
"content": "Slider Settings"
},
{
"type": "range",
"id": "desktop_visible_items",
"label": "Slides to show",
"min": 2,
"max": 10,
"step": 1,
"default": 5
},
{
"type": "range",
"id": "mobile_visible_items",
"label": "Slides to show - mobile",
"min": 1,
"max": 5,
"step": 1,
"default": 2
},
{
"type": "range",
"id": "gap",
"label": "Gap",
"min": 0,
"max": 80,
"step": 1,
"unit": "px",
"default": 24
},
{
"type": "range",
"id": "gap_mobile",
"label": "Gap - mobile",
"min": 0,
"max": 50,
"step": 1,
"unit": "px",
"default": 16
},
{
"type": "header",
"content": "Item Settings"
},
{
"type": "range",
"id": "border_thickness",
"label": "Border thickness",
"min": 0,
"max": 10,
"step": 1,
"unit": "px",
"default": 0
},
{
"type": "header",
"content": "Tag Settings"
},
{
"type": "checkbox",
"id": "tag_custom_font",
"label": "Use custom font",
"default": false
},
{
"type": "font_picker",
"id": "tag_font",
"label": "Font family",
"default": "helvetica_n4"
},
{
"type": "range",
"id": "tag_font_size",
"label": "Font size",
"min": 0,
"max": 48,
"step": 1,
"unit": "px",
"default": 14
},
{
"type": "range",
"id": "tag_font_size_mobile",
"label": "Font size - mobile",
"min": 0,
"max": 48,
"step": 1,
"unit": "px",
"default": 12
},
{
"type": "range",
"id": "tag_line_height",
"label": "Line height",
"min": 50,
"max": 200,
"step": 5,
"unit": "%",
"default": 120
},
{
"type": "range",
"id": "tag_padding_vertical",
"label": "Padding vertical",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"default": 4
},
{
"type": "range",
"id": "tag_padding_vertical_mobile",
"label": "Padding vertical - mobile",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"default": 4
},
{
"type": "range",
"id": "tag_padding_horizontal",
"label": "Padding horizontal",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"default": 12
},
{
"type": "range",
"id": "tag_padding_horizontal_mobile",
"label": "Padding horizontal - mobile",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"default": 8
},
{
"type": "range",
"id": "tag_roundness",
"label": "Roundness",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"default": 20
},
{
"type": "checkbox",
"id": "tag_bottom_position",
"label": "Bottom position",
"default": true
},
{
"type": "header",
"content": "Title Settings"
},
{
"type": "checkbox",
"id": "title_custom_font",
"label": "Use custom font",
"default": false
},
{
"type": "font_picker",
"id": "title_font",
"label": "Font family",
"default": "helvetica_n4"
},
{
"type": "range",
"id": "title_font_size",
"label": "Font size",
"min": 0,
"max": 48,
"step": 1,
"unit": "px",
"default": 16
},
{
"type": "range",
"id": "title_font_size_mobile",
"label": "Font size - mobile",
"min": 0,
"max": 48,
"step": 1,
"unit": "px",
"default": 14
},
{
"type": "range",
"id": "title_line_height",
"label": "Line height",
"min": 50,
"max": 200,
"step": 5,
"unit": "%",
"default": 120
},
{
"type": "header",
"content": "Colors"
},
{
"type": "color",
"id": "title_color",
"label": "Title color",
"default": "#ffffff"
},
{
"type": "color",
"id": "tag_color",
"label": "Tag color",
"default": "#000000"
},
{
"type": "color",
"id": "border_color",
"label": "Border color",
"default": "#ffffff"
},
{
"type": "color",
"id": "tag_background",
"label": "Tag background color",
"default": "#ffffff"
},
{
"type": "color_background",
"id": "tag_background_gradient",
"label": "Tag background gradient",
"default": "linear-gradient(125deg, #be8c3c, #d3b15f 14%, #faf0a0 36%, #ffffb0 43%, #faf0a0 53%, #d3b15f 73%, #be8c3c 84%, #b17b32 90%, #a4692a)"
},
{
"type": "header",
"content": "Section Colors"
},
{
"type": "color",
"id": "section_background",
"label": "Section background color",
"default": "#212121"
},
{
"type": "color",
"id": "section_border_color",
"label": "Section border color",
"default": "#000000"
},
{
"type": "header",
"content": "Section Settings"
},
{
"type": "checkbox",
"id": "full_width",
"label": "Full width",
"default": false
},
{
"type": "range",
"id": "section_content_width",
"label": "Section content width",
"min": 0,
"max": 400,
"step": 4,
"unit": "rem",
"default": 80
},
{
"type": "range",
"id": "section_border_thickness",
"label": "Border thickness",
"min": 0,
"max": 50,
"step": 1,
"unit": "px",
"default": 0
},
{
"type": "range",
"id": "section_roundness",
"label": "Section roundness",
"min": 0,
"max": 100,
"step": 1,
"unit": "px",
"default": 0
},
{
"type": "checkbox",
"id": "lazy_load",
"label": "Lazy load",
"default": true
},
{
"type": "header",
"content": "Section Margin"
},
{
"type": "range",
"id": "margin_top",
"label": "Margin top",
"min": 0,
"max": 100,
"step": 1,
"unit": "px",
"default": 0
},
{
"type": "range",
"id": "margin_bottom",
"label": "Margin bottom",
"min": 0,
"max": 100,
"step": 1,
"unit": "px",
"default": 0
},
{
"type": "range",
"id": "margin_sides",
"label": "Margin sides",
"min": 0,
"max": 30,
"step": 0.5,
"unit": "rem",
"default": 0
},
{
"type": "range",
"id": "margin_sides_mobile",
"label": "Margin sides mobile",
"min": 0,
"max": 15,
"step": 0.5,
"unit": "rem",
"default": 0
},
{
"type": "header",
"content": "Section Padding"
},
{
"type": "range",
"id": "padding_top",
"label": "Padding top",
"min": 0,
"max": 100,
"step": 1,
"unit": "px",
"default": 40
},
{
"type": "range",
"id": "padding_bottom",
"label": "Padding bottom",
"min": 0,
"max": 100,
"step": 1,
"unit": "px",
"default": 40
},
{
"type": "range",
"id": "padding_sides",
"label": "Padding sides",
"min": 0,
"max": 30,
"step": 0.5,
"unit": "rem",
"default": 2
},
{
"type": "range",
"id": "padding_sides_mobile",
"label": "Padding sides mobile",
"min": 0,
"max": 15,
"step": 0.5,
"unit": "rem",
"default": 1
}
],
"blocks": [
{
"type": "menu_item",
"name": "Menu Item",
"settings": [
{
"type": "image_picker",
"id": "image",
"label": "Image"
},
{
"type": "text",
"id": "tag",
"label": "Item Tag",
"default": "Best Seller"
},
{
"type": "text",
"id": "title",
"label": "Item Title",
"default": "Category Name"
},
{
"type": "collection",
"id": "collection",
"label": "Collection Link"
}
]
}
],
"presets": [
{
"name": "Circle Menu",
"category": "Navigation",
"blocks": [
{
"type": "menu_item"
},
{
"type": "menu_item"
},
{
"type": "menu_item"
},
{
"type": "menu_item"
},
{
"type": "menu_item"
}
]
}
]
}
{% endschema %}

{{< /codebox >}}

## Create circle-menu.css

go to assets and create this file

{{< codebox >}}
@font-face {
font-family: "Josefin Sans";
font-style: normal;
font-weight: 100 700;
font-display: swap;
src: url(https://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjRbMZhKSbpUVzEEQ.woff)
format("woff");
unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

.circle-menu-section {
border-top: solid #000000 0px;
border-bottom: solid #000000 0px;
margin-top: 0px;
margin-bottom: 0px;
margin-left: 0rem;
margin-right: 0rem;
border-radius: 0px;
overflow: hidden;
}

.circle-menu-section-settings {
margin: 0 auto;
padding-top: 27px;
padding-bottom: 27px;
padding-left: 1.5rem;
padding-right: 1.5rem;
}

.circle-menu-slider {
margin-left: -1.5rem !important;
margin-right: -1.5rem !important;
padding-left: 1.5rem !important;
padding-right: 1.5rem !important;
}

.circle-menu-item {
padding-top: 5px;
box-sizing: border-box !important;
text-decoration: none;
text-align: center;
position: relative;
}

.circle-menu-image {
width: 100%;
height: 100%;
border-radius: 50%;
overflow: hidden;
border: 3px solid var(--border-color);
padding: 4px;
aspect-ratio: 1 / 1;
box-sizing: border-box;
position: relative;
}

.circle-menu-image img,
.circle-menu-image svg {
display: block;
border-radius: 50%;
width: calc(100% - 8px);
height: calc(100% - 8px);
object-fit: cover;
margin: 0;
aspect-ratio: 1 / 1;
position: absolute;
top: 4px;
left: 4px;
}

.circle-menu-image svg {
background-color: #a0a0a0;
}

.circle-menu-details {
text-align: center;
}

.circle-menu-tag {
position: absolute;
left: 50%;
transform: translateX(-50%);
z-index: 10;
margin: 0;
font-size: 10px;
line-height: 150%;
padding: 2px 10px;
border-radius: 4px;
color: var(--tag-color);
background-color: var(--tag-background);
background-image: var(--tag-background-gradient, none);
text-transform: unset;
word-wrap: break-word;
display: inline-block;
width: 100%;
max-width: max-content;
}

.circle-menu-title {
margin: 0;
display: block;
text-transform: unset;
word-wrap: break-word;
font-size: 10px;
line-height: 150%;
color: var(--title-color);
}

@media (min-width: 1024px) {
.circle-menu-section {
margin-top: 0px;
margin-bottom: 0px;
margin-left: 0rem;
margin-right: 0rem;
border-radius: 0px;
}

.circle-menu-section-settings {
padding: 0 5rem;
padding-top: 36px;
padding-bottom: 36px;
padding-left: 5rem;
padding-right: 5rem;
}

.circle-menu-slider {
margin-left: 0px !important;
margin-right: 0px !important;
padding-left: 0px !important;
padding-right: 0px !important;
}

.circle-menu-tag {
font-size: 16px;
}

.circle-menu-title {
font-size: 14px;
}

.circle-menu-tag {
font-size: 16px;
padding: 2px 16px;
}
}

.circle-menu-section-settings {
max-width: 120rem;
}

.circle-menu-tag {
top: 0;
}

.circle-menu-title {
margin-top: 4px;
}

@media (min-width: 1024px) {
.circle-menu-title {
margin-top: 4px;
}
}

.circle-menu-slider.preview .swiper-wrapper {
display: flex;
align-items: center;
justify-content: space-between;
overflow: hidden;
}

.circle-menu-slider.preview .circle-menu-item {
width: 100%;
}

.circle-menu-slider.preview .circle-menu-item:not(:first-child) {
margin-left: 16px;
}

@media (min-width: 1024px) {
.circle-menu-slider.preview .circle-menu-item:not(:first-child) {
margin-left: 24px;
}

.circle-menu-slider.preview .circle-menu-item {
width: calc(100% / 5 - (24px \* 4));
}
}

.circle-menu-item a {
text-decoration: none;
color: inherit;
display: block;
}

{{< /codebox >}}
