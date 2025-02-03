---
title: "How to create a Shopify Video Slider with add to cart button"
description: "This is a shopify tutorial on how to create a video slider with an add-to-cart button."
date: 2025-02-01
tldr: "This tutorial explains how to create a Shopify video slider with an add-to-cart button. It covers the steps to set up a video slider on your Shopify store, including choosing a theme or app that supports video sliders, uploading videos, and configuring the add-to-cart button."
draft: false
toc: true
---

## Video with add to cart feature

{{< codebox >}}
{%- style -%}
.section-{{ section.id }}-padding {
padding-top: {{ section.settings.padding_top }}px;
padding-bottom: {{ section.settings.padding_bottom }}px;
}
.video-slider .testimonial**image {
height: 500px;
max-width: 27rem;
}
.video-slider testimonials-component {
--block-width: 300px !important;
}
.video-slider .testimonial**image {
background: none;
}
.video-slider video {
height: 100% !important;
border-radius: 15px;
}
.video-slider .testimonial**image.media-wrapper {
margin-right: 0;
}
.video-slider .video-slider-list:before,
.video-slider .video-slider-list:after {
width: 0%;
}
.video-slider-item {
margin-left: 10px;
margin-right: 10px;
}
.video-slider-list {
overflow-y: hidden;
-webkit-overflow-scrolling: touch;
scrollbar-width: auto;
-webkit-overflow-scrolling: auto;
scrollbar-color: #cccccc #ffffff;
scrollbar-width: thin;
padding-bottom: 10px;
}
.video-slider-list::-webkit-scrollbar-track {
background: white;
}
.video-slider-list::-webkit-scrollbar-thumb {
background: lightgray;
border: 4px solid transparent;
border-radius: 10px;
background-clip: padding-box;
}
.video-slider:hover .video-slider-list::-webkit-scrollbar-thumb {
background: gray;
}
.video-slider-list::-webkit-scrollbar-thumb:hover {
background: black !important;
}
.video-slider-list {
position: static;
display: flex;
}
@media only screen and (max-width: 800px) {
.video-slider .testimonial**image {
margin-left: 0;
}
.video-slider .video-slider-list {
width: 100%;
}
}
.product-card-wrapper {
margin-top: 1rem;
text-align: center;
}
.product-card {
padding: 1rem;
border-radius: 8px;
background: #ffffff;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-title {
margin-bottom: 0.5rem;
font-size: 1.1rem;
}
.product-price {
margin-bottom: 1rem;
}
.custom-add-button {
width: 100%;
padding: 0.8rem;
border: none;
border-radius: {{ section.settings.button_radius }}px;
background: {{ section.settings.button_background }};
color: {{ section.settings.button_text_color }};
cursor: pointer;
transition: opacity 0.3s ease;
font-size: {{ section.settings.button_font_size }}px;
}
.custom-add-button:hover {
opacity: 0.8;
background: {{ section.settings.button_background_hover }};
}
.custom-add-button:disabled {
background: #cccccc;
cursor: not-allowed;
}
.product-form {
margin: 0;
padding: 0;
}
.product-form .form {
margin: 0;
padding: 0;
}
{%- endstyle -%}

<div class="video-slider section-{{ section.id }}-padding">
  <div class="testimonials page-width">
    {%- if section.settings.title != blank -%}
      <h2 class="title inline-richtext {{ section.settings.heading_size }}{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %} {{ section.settings.heading_alignment }}">
        {{ section.settings.title }}
      </h2>
    {%- endif -%}

    {%- assign block_count = section.blocks.size -%}
    {%- if block_count > 0 -%}
      <svg class="visually-hidden">
        <defs>
          <clipPath id="testimonial-clip-path" clipPathUnits="objectBoundingBox"><path d="M0.11,0.09 C0.014,0.174,-0.003,0.398,0,0.499 C-0.003,0.618,0.015,0.849,0.125,0.919 C0.235,0.989,0.413,0.997,0.504,0.999 C0.604,0.999,0.719,0.999,0.869,0.924 C0.974,0.849,0.994,0.704,0.999,0.499 C1,0.295,0.984,0.155,0.879,0.075 C0.796,0.011,0.593,-0.003,0.504,0 C0.413,-0.005,0.206,0.006,0.11,0.09"></path></clipPath>
        </defs>
      </svg>
      <testimonials-component data-slider="{% if block_count > 1 %}true{% else %}false{% endif %}" data-autorotate="{{ section.settings.autorotate }}" data-autorotate-speed="{{ section.settings.autorotate_speed | times: 1000 }}" style="--block-count: {{ block_count | minus: 1 }};">
        <div class="testimonial__list-wrapper">
          <div class="video-slider-list" id="Testimonials-{{ section.id }}">
            {%- for block in section.blocks -%}
              <div class="video-slider-item{% if section.blocks.first == true or block_count == 1 %} is-selected{% endif %}" {{ block.shopify_attributes }}>
                <div class="testimonial__image media-wrapper media-wrapper--small">
                  {%- if block.settings.video != blank -%}
                    {{ block.settings.video | video_tag:
                      image_size: "3840px",
                      autoplay: true,
                      loop: true,
                      controls: false,
                      muted: true,
                      playsinline: true
                    }}
                  {%- else -%}
                    <div class="media media--square">
                      {{ 'image' | placeholder_svg_tag: 'placeholder' }}
                    </div>
                  {%- endif -%}
                </div>

                <!-- Add product card below video -->
                {%- if block.settings.product != blank -%}
                  <div class="product-card-wrapper">
                    <div class="product-card">
                      <h3 class="product-title">{{ block.settings.product.title }}</h3>
                      <div class="product-price">
                        {%- render 'price', product: block.settings.product -%}
                      </div>
                      {%- form 'product', block.settings.product, id: 'product-form-{{ block.settings.product.id }}', class: 'form' -%}
                        <input type="hidden" name="id" value="{{ block.settings.product.selected_or_first_available_variant.id }}">
                        <button
                          type="submit"
                          name="add"
                          class="custom-add-button"
                          {% if block.settings.product.selected_or_first_available_variant.available == false %}disabled{% endif %}
                        >
                          {%- if block.settings.product.selected_or_first_available_variant.available -%}
                            {{ section.settings.button_text }}
                          {%- else -%}
                            {{ 'products.product.sold_out' | t }}
                          {%- endif -%}
                        </button>
                      {%- endform -%}
                    </div>
                  </div>
                {%- endif -%}
              </div>
            {%- endfor -%}
          </div>
        </div>
      </testimonials-component>
    {%- endif -%}

  </div>
</div>
{% schema %}
{
  "name": "Videos slider",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "inline_richtext",
      "id": "title",
      "default": "Video slider",
      "label": "Videos title"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        {
          "value": "h2",
          "label": "H1"
        },
        {
          "value": "h1",
          "label": "H2"
        },
        {
          "value": "h0",
          "label": "H3"
        }
      ],
      "default": "h1",
      "label": "Heading size"
    },
    {
      "type": "select",
      "id": "heading_alignment",
      "label": "Heading alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        },
        {
          "value": "right",
          "label": "Right"
        }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "heading_tag",
      "options": [
        {
          "value": "h1",
          "label": "H1"
        },
        {
          "value": "h2",
          "label": "H2"
        },
        {
          "value": "h3",
          "label": "H3"
        },
        {
          "value": "h4",
          "label": "H4"
        },
        {
          "value": "h5",
          "label": "H5"
        },
        {
          "value": "h6",
          "label": "H6"
        },
        {
          "value": "div",
          "label": "H7"
        },
        {
          "value": "span",
          "label": "H8"
        },
        {
          "value": "p",
          "label": "Normal"
        }
      ],
      "default": "h2",
      "label": "H2",
      "info": "Headings"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom",
      "default": 36
    },
    {
      "type": "header",
      "content": "Button Settings"
    },
    {
      "type": "color",
      "id": "button_background",
      "label": "Button Background Color",
      "default": "#1a1a1a"
    },
    {
      "type": "color",
      "id": "button_background_hover",
      "label": "Button Hover Background Color",
      "default": "#333333"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Button Text Color",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "button_radius",
      "min": 0,
      "max": 40,
      "step": 1,
      "unit": "px",
      "label": "Button Border Radius",
      "default": 4
    },
    {
      "type": "range",
      "id": "button_font_size",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "label": "Button Font Size",
      "default": 16
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Text",
      "default": "Add to Cart"
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "video",
      "settings": [
        {
          "type": "video",
          "id": "video",
          "label": "Video link"
        },
        {
          "type": "product",
          "id": "product",
          "label": "Product",
          "info": "Select the product to display below the video"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Videos slider",
      "blocks": [
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        }
      ]
    }
  ],
  "disabled_on": {
    "groups": ["header", "footer", "custom.overlay"]
  }
}
{% endschema %}
{{< /codebox >}}

## Video with add to cart overlay

{{< codebox >}}
{%- style -%}
.section-{{ section.id }}-padding {
padding-top: {{ section.settings.padding_top }}px;
padding-bottom: {{ section.settings.padding_bottom }}px;
}
.video-slider .testimonial**image {
height: 500px;
max-width: 27rem;
}
.video-slider testimonials-component {
--block-width: 300px !important;
}
.video-slider .testimonial**image {
background: none;
}
.video-slider video {
height: 100% !important;
border-radius: 15px;
}
.video-slider .testimonial**image.media-wrapper {
margin-right: 0;
}
.video-slider .video-slider-list:before,
.video-slider .video-slider-list:after {
width: 0%;
}
.video-slider-item {
margin-left: 10px;
margin-right: 10px;
}
.video-slider-list {
overflow-y: hidden;
-webkit-overflow-scrolling: touch;
scrollbar-width: auto;
-webkit-overflow-scrolling: auto;
scrollbar-color: #cccccc #ffffff;
scrollbar-width: thin;
padding-bottom: 10px;
}
.video-slider-list::-webkit-scrollbar-track {
background: white;
}
.video-slider-list::-webkit-scrollbar-thumb {
background: lightgray;
border: 4px solid transparent;
border-radius: 10px;
background-clip: padding-box;
}
.video-slider:hover .video-slider-list::-webkit-scrollbar-thumb {
background: gray;
}
.video-slider-list::-webkit-scrollbar-thumb:hover {
background: black !important;
}
.video-slider-list {
position: static;
display: flex;
}
@media only screen and (max-width: 800px) {
.video-slider .testimonial**image {
margin-left: 0;
}
.video-slider .video-slider-list {
width: 100%;
}
}
.product-card-wrapper {
margin-top: 1rem;
text-align: center;
}
.product-card {
padding: 1rem;
border-radius: 8px;
background: #ffffff;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-title {
margin-bottom: 0.5rem;
font-size: 1.1rem;
}
.product-price {
margin-bottom: 1rem;
}
.button--full-width {
width: 100%;
padding: 0.8rem;
border: none;
border-radius: 4px;
background: #1a1a1a;
color: #ffffff;
cursor: pointer;
transition: background 0.3s ease;
}
.button--full-width:hover {
background: #333333;
}
.button--full-width:disabled {
background: #cccccc;
cursor: not-allowed;
}
.custom-add-button {
width: 100%;
padding: 0.8rem;
border: none;
border-radius: {{ section.settings.button_radius }}px;
background: {{ section.settings.button_background }}{{ section.settings.button_opacity }};
color: {{ section.settings.button_text_color }};
cursor: pointer;
transition: all 0.3s ease;
font-size: {{ section.settings.button_font_size }}px;
backdrop-filter: blur(5px);
}
.custom-add-button:hover {
background: {{ section.settings.button_background_hover }}{{ section.settings.button_hover_opacity }};
}
.custom-add-button:disabled {
background: rgba(204, 204, 204, 0.8);
cursor: not-allowed;
}
/_ Remove product-form default styles _/
.product-form {
margin: 0;
padding: 0;
}
.product-form .form {
margin: 0;
padding: 0;
}
.testimonial\_\_image {
position: relative;
}
.product-overlay {
position: absolute;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
width: 80%;
z-index: 2;
}
{%- endstyle -%}

  <div class="video-slider section-{{ section.id }}-padding">
    <div class="testimonials page-width">
      {%- if section.settings.title != blank -%}
        <h2 class="title inline-richtext {{ section.settings.heading_size }}{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %} {{ section.settings.heading_alignment }}">
          {{ section.settings.title }}
        </h2>
      {%- endif -%}
  
      {%- assign block_count = section.blocks.size -%}
      {%- if block_count > 0 -%}
        <svg class="visually-hidden">
          <defs>
            <clipPath id="testimonial-clip-path" clipPathUnits="objectBoundingBox"><path d="M0.11,0.09 C0.014,0.174,-0.003,0.398,0,0.499 C-0.003,0.618,0.015,0.849,0.125,0.919 C0.235,0.989,0.413,0.997,0.504,0.999 C0.604,0.999,0.719,0.999,0.869,0.924 C0.974,0.849,0.994,0.704,0.999,0.499 C1,0.295,0.984,0.155,0.879,0.075 C0.796,0.011,0.593,-0.003,0.504,0 C0.413,-0.005,0.206,0.006,0.11,0.09"></path></clipPath>
          </defs>
        </svg>
        <testimonials-component data-slider="{% if block_count > 1 %}true{% else %}false{% endif %}" data-autorotate="{{ section.settings.autorotate }}" data-autorotate-speed="{{ section.settings.autorotate_speed | times: 1000 }}" style="--block-count: {{ block_count | minus: 1 }};">
          <div class="testimonial__list-wrapper">
            <div class="video-slider-list" id="Testimonials-{{ section.id }}">
              {%- for block in section.blocks -%}
                <div class="video-slider-item{% if section.blocks.first == true or block_count == 1 %} is-selected{% endif %}" {{ block.shopify_attributes }}>
                  <div class="testimonial__image media-wrapper media-wrapper--small">
                    {%- if block.settings.video != blank -%}
                      {{ block.settings.video | video_tag:
                        image_size: "3840px",
                        autoplay: true,
                        loop: true,
                        controls: false,
                        muted: true,
                        playsinline: true
                      }}
                    {%- else -%}
                      <div class="media media--square">
                        {{ 'image' | placeholder_svg_tag: 'placeholder' }}
                      </div>
                    {%- endif -%}
                    
                    <!-- Add product card as overlay -->
                    {%- if block.settings.product != blank -%}
                      <div class="product-overlay">
                        {%- form 'product', block.settings.product, id: 'product-form-{{ block.settings.product.id }}', class: 'form' -%}
                          <input type="hidden" name="id" value="{{ block.settings.product.selected_or_first_available_variant.id }}">
                          <button
                            type="submit"
                            name="add"
                            class="custom-add-button"
                            {% if block.settings.product.selected_or_first_available_variant.available == false %}disabled{% endif %}
                          >
                            {%- if block.settings.product.selected_or_first_available_variant.available -%}
                              {{ section.settings.button_text }}
                            {%- else -%}
                              {{ 'products.product.sold_out' | t }}
                            {%- endif -%}
                          </button>
                        {%- endform -%}
                      </div>
                    {%- endif -%}
                  </div>
                </div>
              {%- endfor -%}
            </div>
          </div>
        </testimonials-component>
      {%- endif -%}
    </div>
  </div>
  
  {% schema %}
  {
    "name": "Videos slider",
    "tag": "section",
    "class": "section",
    "settings": [
      {
        "type": "inline_richtext",
        "id": "title",
        "default": "Video slider",
        "label": "Videos title"
      },
      {
        "type": "select",
        "id": "heading_size",
        "options": [
          {
            "value": "h2",
            "label": "H1"
          },
          {
            "value": "h1",
            "label": "H2"
          },
          {
            "value": "h0",
            "label": "H3"
          }
        ],
        "default": "h1",
        "label": "Heading size"
      },
      {
        "type": "select",
        "id": "heading_alignment",
        "label": "Heading alignment",
        "options": [
          {
            "value": "left",
            "label": "Left"
          },
          {
            "value": "center",
            "label": "Center"
          },
          {
            "value": "right",
            "label": "Right"
          }
        ],
        "default": "center"
      },
      {
        "type": "select",
        "id": "heading_tag",
        "options": [
          {
            "value": "h1",
            "label": "H1"
          },
          {
            "value": "h2",
            "label": "H2"
          },
          {
            "value": "h3",
            "label": "H3"
          },
          {
            "value": "h4",
            "label": "H4"
          },
          {
            "value": "h5",
            "label": "H5"
          },
          {
            "value": "h6",
            "label": "H6"
          },
          {
            "value": "div",
            "label": "H7"
          },
          {
            "value": "span",
            "label": "H8"
          },
          {
            "value": "p",
            "label": "Normal"
          }
        ],
        "default": "h2",
        "label": "H2",
        "info": "Headings"
      },
      {
        "type": "header",
        "content": "Spacing"
      },
      {
        "type": "range",
        "id": "padding_top",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Padding top",
        "default": 36
      },
      {
        "type": "range",
        "id": "padding_bottom",
        "min": 0,
        "max": 100,
        "step": 4,
        "unit": "px",
        "label": "Padding bottom",
        "default": 36
      },
      {
        "type": "header",
        "content": "Button Settings"
      },
      {
        "type": "color",
        "id": "button_background",
        "label": "Button Background Color",
        "default": "#1a1a1a"
      },
      {
        "type": "select",
        "id": "button_opacity",
        "label": "Button Opacity",
        "options": [
          {
            "value": "99",
            "label": "100%"
          },
          {
            "value": "BF",
            "label": "75%"
          },
          {
            "value": "80",
            "label": "50%"
          },
          {
            "value": "40",
            "label": "25%"
          }
        ],
        "default": "80"
      },
      {
        "type": "select",
        "id": "button_hover_opacity",
        "label": "Button Hover Opacity",
        "options": [
          {
            "value": "99",
            "label": "100%"
          },
          {
            "value": "BF",
            "label": "75%"
          },
          {
            "value": "80",
            "label": "50%"
          },
          {
            "value": "40",
            "label": "25%"
          }
        ],
        "default": "BF"
      },
      {
        "type": "color",
        "id": "button_background_hover",
        "label": "Button Hover Background Color",
        "default": "#333333"
      },
      {
        "type": "color",
        "id": "button_text_color",
        "label": "Button Text Color",
        "default": "#ffffff"
      },
      {
        "type": "range",
        "id": "button_radius",
        "min": 0,
        "max": 40,
        "step": 1,
        "unit": "px",
        "label": "Button Border Radius",
        "default": 4
      },
      {
        "type": "range",
        "id": "button_font_size",
        "min": 12,
        "max": 24,
        "step": 1,
        "unit": "px",
        "label": "Button Font Size",
        "default": 16
      },
      {
        "type": "text",
        "id": "button_text",
        "label": "Button Text",
        "default": "Add to Cart"
      }
    ],
    "blocks": [
      {
        "type": "testimonial",
        "name": "video",
        "settings": [
          {
            "type": "video",
            "id": "video",
            "label": "Video link"
          },
          {
            "type": "product",
            "id": "product",
            "label": "Product",
            "info": "Select the product to display below the video"
          }
        ]
      }
    ],
    "presets": [
      {
        "name": "Videos slider",
        "blocks": [
          {
            "type": "testimonial"
          },
          {
            "type": "testimonial"
          },
          {
            "type": "testimonial"
          },
          {
            "type": "testimonial"
          },
          {
            "type": "testimonial"
          }
        ]
      }
    ],
    "disabled_on": {
      "groups": ["header", "footer", "custom.overlay"]
    }
  }
  {% endschema %}
{{< /codebox >}}

## Video Slider with play and volume buttons add to cart

{{< codebox >}}
{%- style -%}
.section-{{ section.id }}-padding {
padding-top: {{ section.settings.padding_top }}px;
padding-bottom: {{ section.settings.padding_bottom }}px;
}
.video-slider .testimonial**image {
height: 500px;
max-width: 27rem;
}
.video-slider testimonials-component {
--block-width: 300px !important;
}
.video-slider .testimonial**image {
background: none;
}
.video-slider video {
height: 100% !important;
border-radius: 15px;
}
.video-slider .testimonial**image.media-wrapper {
margin-right: 0;
}
.video-slider .video-slider-list:before,
.video-slider .video-slider-list:after {
width: 0%;
}
.video-slider-item {
margin-left: 10px;
margin-right: 10px;
}
.video-slider-list {
overflow-y: hidden;
-webkit-overflow-scrolling: touch;
scrollbar-width: auto;
-webkit-overflow-scrolling: auto;
scrollbar-color: #cccccc #ffffff;
scrollbar-width: thin;
padding-bottom: 10px;
}
.video-slider-list::-webkit-scrollbar-track {
background: white;
}
.video-slider-list::-webkit-scrollbar-thumb {
background: lightgray;
border: 4px solid transparent;
border-radius: 10px;
background-clip: padding-box;
}
.video-slider:hover .video-slider-list::-webkit-scrollbar-thumb {
background: gray;
}
.video-slider-list::-webkit-scrollbar-thumb:hover {
background: black !important;
}
.video-slider-list {
position: static;
display: flex;
}
@media only screen and (max-width: 800px) {
.video-slider .testimonial**image {
margin-left: 0;
}
.video-slider .video-slider-list {
width: 100%;
}
}
.product-card-wrapper {
margin-top: 1rem;
text-align: center;
}
.product-card {
padding: 1rem;
border-radius: 8px;
background: #ffffff;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.product-title {
margin-bottom: 0.5rem;
font-size: 1.1rem;
}
.product-price {
margin-bottom: 1rem;
}
.product-overlay {
position: absolute;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
width: 80%;
z-index: 2;
}
.custom-add-button {
width: 100%;
padding: 0.8rem;
border: none;
border-radius: {{ section.settings.button_radius }}px;
background: {{ section.settings.button_background }};
color: {{ section.settings.button_text_color }};
cursor: pointer;
transition: opacity 0.3s ease;
font-size: {{ section.settings.button_font_size }}px;
}
.custom-add-button:hover {
opacity: 0.8;
background: {{ section.settings.button_background_hover }};
}
.custom-add-button:disabled {
background: #cccccc;
cursor: not-allowed;
}
.product-form {
margin: 0;
padding: 0;
}
.product-form .form {
margin: 0;
padding: 0;
}
.video-container {
position: relative;
width: 100%;
height: 100%;
}
{%- endstyle -%}

<div class="video-slider section-{{ section.id }}-padding">
  <div class="testimonials page-width">
    {%- if section.settings.title != blank -%}
      <h2 class="title inline-richtext {{ section.settings.heading_size }}{% if settings.animations_reveal_on_scroll %} scroll-trigger animate--slide-in{% endif %} {{ section.settings.heading_alignment }}">
        {{ section.settings.title }}
      </h2>
    {%- endif -%}

    {%- assign block_count = section.blocks.size -%}
    {%- if block_count > 0 -%}
      <svg class="visually-hidden">
        <defs>
          <clipPath id="testimonial-clip-path" clipPathUnits="objectBoundingBox"><path d="M0.11,0.09 C0.014,0.174,-0.003,0.398,0,0.499 C-0.003,0.618,0.015,0.849,0.125,0.919 C0.235,0.989,0.413,0.997,0.504,0.999 C0.604,0.999,0.719,0.999,0.869,0.924 C0.974,0.849,0.994,0.704,0.999,0.499 C1,0.295,0.984,0.155,0.879,0.075 C0.796,0.011,0.593,-0.003,0.504,0 C0.413,-0.005,0.206,0.006,0.11,0.09"></path></clipPath>
        </defs>
      </svg>
      <testimonials-component data-slider="{% if block_count > 1 %}true{% else %}false{% endif %}" data-autorotate="{{ section.settings.autorotate }}" data-autorotate-speed="{{ section.settings.autorotate_speed | times: 1000 }}" style="--block-count: {{ block_count | minus: 1 }};">
        <div class="testimonial__list-wrapper">
          <div class="video-slider-list" id="Testimonials-{{ section.id }}">
            {%- for block in section.blocks -%}
              <div class="video-slider-item{% if section.blocks.first == true or block_count == 1 %} is-selected{% endif %}" {{ block.shopify_attributes }}>
                <div class="testimonial__image media-wrapper media-wrapper--small">
                  {%- if block.settings.video != blank -%}
                    <video-player class="video-container">
                      {{ block.settings.video | video_tag:
                        image_size: "3840px",
                        autoplay: false,
                        loop: true,
                        controls: true,
                        muted: false,
                        playsinline: true,
                        class: "video-player"
                      }}
                    </video-player>
                  {%- else -%}
                    <div class="media media--square">
                      {{ 'image' | placeholder_svg_tag: 'placeholder' }}
                    </div>
                  {%- endif -%}
                </div>

                <!-- Add product card below video -->
                {%- if block.settings.product != blank -%}
                  <div class="product-card-wrapper">
                    <div class="product-card">
                      <h3 class="product-title">{{ block.settings.product.title }}</h3>
                      <div class="product-price">
                        {%- render 'price', product: block.settings.product -%}
                      </div>
                      {%- form 'product', block.settings.product, id: 'product-form-{{ block.settings.product.id }}', class: 'form' -%}
                        <input type="hidden" name="id" value="{{ block.settings.product.selected_or_first_available_variant.id }}">
                        <button
                          type="submit"
                          name="add"
                          class="custom-add-button"
                          {% if block.settings.product.selected_or_first_available_variant.available == false %}disabled{% endif %}
                        >
                          {%- if block.settings.product.selected_or_first_available_variant.available -%}
                            {{ section.settings.button_text }}
                          {%- else -%}
                            {{ 'products.product.sold_out' | t }}
                          {%- endif -%}
                        </button>
                      {%- endform -%}
                    </div>
                  </div>
                {%- endif -%}
              </div>
            {%- endfor -%}
          </div>
        </div>
      </testimonials-component>
    {%- endif -%}

  </div>
</div>
{% schema %}
{
  "name": "Videos slider",
  "tag": "section",
  "class": "section",
  "settings": [
    {
      "type": "inline_richtext",
      "id": "title",
      "default": "Video slider",
      "label": "Videos title"
    },
    {
      "type": "select",
      "id": "heading_size",
      "options": [
        {
          "value": "h2",
          "label": "H1"
        },
        {
          "value": "h1",
          "label": "H2"
        },
        {
          "value": "h0",
          "label": "H3"
        }
      ],
      "default": "h1",
      "label": "Heading size"
    },
    {
      "type": "select",
      "id": "heading_alignment",
      "label": "Heading alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        },
        {
          "value": "right",
          "label": "Right"
        }
      ],
      "default": "center"
    },
    {
      "type": "select",
      "id": "heading_tag",
      "options": [
        {
          "value": "h1",
          "label": "H1"
        },
        {
          "value": "h2",
          "label": "H2"
        },
        {
          "value": "h3",
          "label": "H3"
        },
        {
          "value": "h4",
          "label": "H4"
        },
        {
          "value": "h5",
          "label": "H5"
        },
        {
          "value": "h6",
          "label": "H6"
        },
        {
          "value": "div",
          "label": "H7"
        },
        {
          "value": "span",
          "label": "H8"
        },
        {
          "value": "p",
          "label": "Normal"
        }
      ],
      "default": "h2",
      "label": "H2",
      "info": "Headings"
    },
    {
      "type": "header",
      "content": "Spacing"
    },
    {
      "type": "range",
      "id": "padding_top",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding top",
      "default": 36
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "min": 0,
      "max": 100,
      "step": 4,
      "unit": "px",
      "label": "Padding bottom",
      "default": 36
    },
    {
      "type": "header",
      "content": "Button Settings"
    },
    {
      "type": "color",
      "id": "button_background",
      "label": "Button Background Color",
      "default": "#1a1a1a"
    },
    {
      "type": "color",
      "id": "button_background_hover",
      "label": "Button Hover Background Color",
      "default": "#333333"
    },
    {
      "type": "color",
      "id": "button_text_color",
      "label": "Button Text Color",
      "default": "#ffffff"
    },
    {
      "type": "range",
      "id": "button_radius",
      "min": 0,
      "max": 40,
      "step": 1,
      "unit": "px",
      "label": "Button Border Radius",
      "default": 4
    },
    {
      "type": "range",
      "id": "button_font_size",
      "min": 12,
      "max": 24,
      "step": 1,
      "unit": "px",
      "label": "Button Font Size",
      "default": 16
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button Text",
      "default": "Add to Cart"
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "video",
      "settings": [
        {
          "type": "video",
          "id": "video",
          "label": "Video link"
        },
        {
          "type": "product",
          "id": "product",
          "label": "Product",
          "info": "Select the product to display below the video"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Videos slider",
      "blocks": [
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        },
        {
          "type": "testimonial"
        }
      ]
    }
  ],
  "disabled_on": {
    "groups": ["header", "footer", "custom.overlay"]
  }
}
{% endschema %}
{{< /codebox >}}
