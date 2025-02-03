---
title: "How to Create Bundles in Shopify Without APP "
description: "This is a shopify tutorial on how to make a bundle Without APP."
date: 2025-02-01
tldr: "This tutorial is on how to create product bundles on Shopify without using an app. Key steps include creating custom product options, setting bundle prices, and organizing products to appear as a bundle on your store."
draft: false
toc: true
---

## Create a snippet called bulk-add-to-cart-buttons

{{< codebox >}}
{% comment %}
Liquid Variables
{% endcomment %}

{% liquid
assign block_title_text = block.settings.block-title-text
assign block_title_color = block.settings.block-title-color
assign block_divider_color = block.settings.block-divider-color
assign button_border_radius = block.settings.button-border-radius | append: 'px'

    assign btn_one_qty = block.settings.bulk-btn-one-qty
    assign btn_one_text = block.settings.bulk-btn-one-text
    assign btn_one_text_color = block.settings.bulk-btn-one-txt-color
    assign btn_one_bg_color = block.settings.bulk-btn-one-bg-color

    assign btn_two_qty = block.settings.bulk-btn-two-qty
    assign btn_two_text = block.settings.bulk-btn-two-text
    assign btn_two_text_color = block.settings.bulk-btn-two-txt-color
    assign btn_two_bg_color = block.settings.bulk-btn-two-bg-color

    assign btn_three_qty = block.settings.bulk-btn-three-qty
    assign btn_three_text = block.settings.bulk-btn-three-text
    assign btn_three_text_color = block.settings.bulk-btn-three-txt-color
    assign btn_three_bg_color = block.settings.bulk-btn-three-bg-color

    assign badge_front_color = block.settings.badge-front-color
    assign badge_back_color = block.settings.badge-back-color

    assign radio_border_color = block.settings.radio-border-color
    assign radio_dot_color = block.settings.radio-dot-color

%}

<template id = "main-content">
    <style>
        .bulk_btn {
            width: 100%;
            background-color: var(--button-background-color, #FFFFFF) !important;
            border: 1px solid var(--button-border-color, #D89693);
            margin-bottom: 16px;
            font-family: 'Poppins', sans-serif;
            font-size: 1rem;
            padding: 8px 24px;
            cursor: pointer;
            border-radius: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            max-width: 857px;
            position: relative;
            overflow: visible;
        }

        .bulk_btn:hover {
            background-color: var(--button-hover-color, #f5f5f5) !important;
            border-color: var(--button-border-hover-color, #c78683);
        }

        .option-left {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .radio-circle {
            width: 24px;
            height: 24px;
            border: 2px solid var(--radio-border-color, #000);
            border-radius: 50%;
            position: relative;
        }

        .radio-circle::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            background-color: var(--radio-dot-color, #000);
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        /* Show inner circle on hover AND when selected */
        .bulk_btn:hover .radio-circle::after,
        .bulk_btn.selected .radio-circle::after {
            opacity: 1;
        }

        .option-info {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .option-title {
            font-size: 19px;
            font-weight: 700;
            letter-spacing: -0.4px;
        }

        .option-save {
            font-size: 14px;
        }

        .option-price {
            text-align: right;
        }

        .price-new {
            font-size: 20px;
        }

        .price-old {
            font-size: 14px;
            text-decoration: line-through;
        }

        .error--hidden {
            display: none !important;
        }

        .popular-badge {
            position: absolute;
            right: -40px;
            top: -33px;
            transform: rotate(2.8deg);
            z-index: 2;
        }

        .badge-container {
            width: 108px;
            height: 50px;
            position: relative;
        }

        .badge-ellipse {
            position: absolute;
            width: 108px;
            height: 47px;
            border-radius: 50%;
        }

        .badge-ellipse-back {
            background: var(--badge-back-color, #A86A69);
            top: 3px;
        }

        .badge-ellipse-front {
            background: var(--badge-front-color, #F09896);
            top: 0;
        }

        .badge-text {
            position: relative;
            z-index: 2;
            color: #fff;
            text-align: center;
            padding-top: 4px;
        }

        .badge-most {
            font-size: 12px;
            font-weight: 700;
        }

        .badge-popular {
            font-size: 16px;
            font-weight: 700;
        }
    </style>
    <div style = "display: inline-flex; justify-content: center; align-items: center;" class="bulk-add__error-message-wrapper error--hidden" role="alert">
    <svg
        style = "margin-right: 5px"
        aria-hidden="true"
        focusable="false"
        class="icon icon-error"
        viewBox="0 0 13 13"
        height = "11"
        width = "11"
    >
        <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"/>
        <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"/>
        <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"/>
        <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
    </svg>
    <span style = "font-size: 12px;" class="bulk-add__error-message">You can't add more of this product to the cart</span>
    </div>
    <button class="bulk_btn button">
        <div class="popular-badge">
            <div class="badge-container">
                <div class="badge-ellipse badge-ellipse-back"></div>
                <div class="badge-ellipse badge-ellipse-front"></div>
                <div class="badge-text">
                    <div class="badge-most">Most</div>
                    <div class="badge-popular">Popular</div>
                </div>
            </div>
        </div>
        <div class="option-left">
            <div class="radio-circle"></div>
            <div class="option-info">
                <div class="option-title"><slot name="btn_text"></slot></div>
                <div class="option-save">You Save 40%</div>
            </div>
        </div>
        <div class="option-price">
            <div class="price-new">$62.44</div>
            <div class="price-old">$105.00</div>
        </div>
    </button>

</template>

<script>

//Store current inventory from liquid inside of Javascript Object
const inventoryObj = {}
{% for v in product.variants %}
    inventoryObj[{{ v.id }}] = {{ v.inventory_quantity }}
{% endfor %}

class BulkAddToCart extends HTMLElement {
  constructor() {
    super();

    //Set up the Shadow DOM in the Web Component
    const shadow = this.attachShadow({ mode: 'closed' })
    this.shadowDom = shadow

    const template = document.getElementById('main-content').content.cloneNode(true)
    shadow.append( template );
  }

  static get observedAttributes() { 
    return [
        'product-id', 
        'quantity-to-add', 
        'show-badge',
        'button-background-color',
        'button-border-color',
        'button-hover-color',
        'button-border-hover-color',
        'radio-border-color',
        'radio-dot-color',
        'badge-front-color',
        'badge-back-color'
    ]; 
  }

  bulkAddToCart(variantId, quantity){
    const requestUrl = window.Shopify.routes.root + 'cart/add.js'
    const cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
    const productData = {
        items: [
            {
                'id': variantId,
                'quantity': quantity
            }
        ],
        sections: cart.getSectionsToRender().map((section) => section.id),
        sections_url: window.location.pathname
    }


    fetch(requestUrl, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(productData)
    })
      .then((response) => response.json())
      .then(data => {
        //Store HTML from Section Rendering API into variables

        const sections = data.sections

        //New HTML to update Current DOM with
        const cartIconBubble = new DOMParser().parseFromString(sections["cart-icon-bubble"], 'text/html')
        const cartNotificationButton = new DOMParser().parseFromString(sections["cart-notification-button"],'text/html')
        const cartNotificationProduct = new DOMParser().parseFromString(sections["cart-notification-product"],'text/html')

        console.log("Cart Notification Product Before",cartNotificationProduct)

        //Update Oringinal DOM
        document.querySelector("#cart-icon-bubble").innerHTML = cartIconBubble.querySelector("#shopify-section-cart-icon-bubble").innerHTML

        document.querySelector("#cart-notification-button").innerHTML = cartNotificationButton.querySelector("#shopify-section-cart-notification-button").innerHTML

        

        console.log("Cart Notification Product After", document.querySelector("#cart-notification-product"))


        const found = this.findProductElementByVariantId(cartNotificationProduct, variantId)
        console.log("The current variant", variantId)
        console.log("What did I find?", found)
        document.querySelector("#cart-notification-product").innerHTML = found.innerHTML


        //Show Cart Notification
        cart.open()

      })
      .catch(err => {
        console.error(`There was an issue bulk adding to cart \n\n Error Message: ${err}`)
        const errorMsg = this.shadowDom.querySelector(".bulk-add__error-message-wrapper")
        errorMsg.classList.toggle("error--hidden")
      })
  }

  //Use this section for the refactor
  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  findProductElementByVariantId(htmlString, variantId) {

    const parentElement = htmlString.getElementById('shopify-section-cart-notification-product');

    if (!parentElement) {
        return null; // Parent element not found
    }

    // Check if there's only one child element
    if (parentElement.children.length === 1) {
        return parentElement.children[0];
    }

    // Search for child element with matching variant ID
    for (const child of parentElement.children) {
        const childIdParts = child.id.split(':');
        if (childIdParts.length > 1 && childIdParts[0].includes(variantId)) {
        return child;
        }
    }

    return null; // No matching child element found
  }

  setButtonState(){
    if(!this.amountInStock || !this.productId) return

    const variantStockCount = this.amountInStock[this.productId]
    const enoughToAddToCart = variantStockCount >= this.quantity ? true : false

    const bulkBtn = this.shadowDom.querySelector(".bulk_btn")

    if(!enoughToAddToCart){
        console.log("Render Out of Stock State")

        bulkBtn.style.opacity = "0.5"
        bulkBtn.style.cursor = "not-allowed"
        bulkBtn.style.pointerEvents = "none"
        return
    }

    bulkBtn.style.opacity = "1"
    bulkBtn.style.cursor = "pointer"
    bulkBtn.style.pointerEvents = "auto"
   
  }

  
  connectedCallback() {
    console.log("BulkAddToCart has connected")

    //get attributes and assign them to component variables
    const product_id = this.getAttribute("product-id")
    const quantity = this.getAttribute("quantity-to-add")
    const btn_bg_color = this.getAttribute("bg-color")

    this.productId = product_id ? product_id : null
    this.quantity = quantity ? quantity: null
    this.amountInStock = inventoryObj ? inventoryObj : null

    //Set Button State
    this.setButtonState()

    //Set up Button Event Listeners
    const bulkBtn = this.shadowDom.querySelector(".bulk_btn")
    bulkBtn.style.backgroundColor = btn_bg_color

    bulkBtn.addEventListener("click", () => {
        this.bulkAddToCart(this.productId, this.quantity)
    })

    // Handle badge visibility
    const showBadge = this.getAttribute('show-badge');
    const badge = this.shadowDom.querySelector('.popular-badge');
    if (badge) {
        badge.style.display = showBadge === 'true' ? 'block' : 'none';
    }

    // Set badge colors
    const badgeFrontColor = this.getAttribute('badge-front-color');
    const badgeBackColor = this.getAttribute('badge-back-color');
    
    if (badgeFrontColor) {
        this.shadowDom.host.style.setProperty('--badge-front-color', badgeFrontColor);
    }
    if (badgeBackColor) {
        this.shadowDom.host.style.setProperty('--badge-back-color', badgeBackColor);
    }

    // Set button colors
    const bgColor = this.getAttribute('button-background-color');
    const borderColor = this.getAttribute('button-border-color');
    const hoverColor = this.getAttribute('button-hover-color');
    const borderHoverColor = this.getAttribute('button-border-hover-color');
    
    if (bgColor) {
        this.shadowDom.host.style.setProperty('--button-background-color', bgColor);
    }
    if (borderColor) {
        this.shadowDom.host.style.setProperty('--button-border-color', borderColor);
    }
    if (hoverColor) {
        this.shadowDom.host.style.setProperty('--button-hover-color', hoverColor);
    }
    if (borderHoverColor) {
        this.shadowDom.host.style.setProperty('--button-border-hover-color', borderHoverColor);
    }

    // Add these lines to set radio button colors
    const radioBorderColor = this.getAttribute('radio-border-color');
    const radioDotColor = this.getAttribute('radio-dot-color');
    
    if (radioBorderColor) {
        this.shadowDom.host.style.setProperty('--radio-border-color', radioBorderColor);
    }
    if (radioDotColor) {
        this.shadowDom.host.style.setProperty('--radio-dot-color', radioDotColor);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'product-id') {
        this.productId = newValue;
        this.setButtonState()
    } else if (name === 'badge-front-color') {
        this.shadowDom.host.style.setProperty('--badge-front-color', newValue);
    } else if (name === 'badge-back-color') {
        this.shadowDom.host.style.setProperty('--badge-back-color', newValue);
    } else if (name === 'button-background-color') {
        this.shadowDom.host.style.setProperty('--button-background-color', newValue);
    } else if (name === 'button-border-color') {
        this.shadowDom.host.style.setProperty('--button-border-color', newValue);
    } else if (name === 'button-hover-color') {
        this.shadowDom.host.style.setProperty('--button-hover-color', newValue);
    } else if (name === 'button-border-hover-color') {
        this.shadowDom.host.style.setProperty('--button-border-hover-color', newValue);
    } else if (name === 'radio-border-color') {
        this.shadowDom.host.style.setProperty('--radio-border-color', newValue);
    } else if (name === 'radio-dot-color') {
        this.shadowDom.host.style.setProperty('--radio-dot-color', newValue);
    }
  }
}

customElements.define('bulk-add-to-cart', BulkAddToCart);

const target = document.querySelector(".product.grid")
const config = {
   childList: true,
   subtree: true
 };

 const observer = new MutationObserver(() => {

    const bulkAddComponents = Array.from(document.querySelectorAll("bulk-add-to-cart"))
    const currentUrl = window.location.href
    const hasQueryParam = currentUrl.includes("?variant=")
    


    if(!bulkAddComponents || bulkAddComponents.length < 1) return
    if(!hasQueryParam) return

    const getVariantIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('variant');
    }

    // const indexOfParam = currentUrl.lastIndexOf("?variant=")
    const productVariantId = getVariantIdFromUrl()

    bulkAddComponents.forEach( component => {
        component.setAttribute("product-id", productVariantId)
    })
 })
 observer.observe(target, config)
</script>

{% comment %} General Styles for Block {% endcomment %}

<style>
    :root {
        --block-title-color: {{ block_title_color | default: '#000' }};
        --block-divider-color: {{ block_divider_color | default: 'rgba(0, 0, 0, 0.12)' }};
    }

    .bundle-title {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 8px;
        margin-bottom: 10px;
        color: var(--block-title-color);
        font-size: var(--block-title-font-size, 14px);
        font-weight: var(--block-title-font-weight, bold);
        font-style: var(--block-title-font-style, normal);
    }

    .bundle-title::before,
    .bundle-title::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: var(--block-divider-color);
    }
</style>

<div class="content-container">
    {% if block_title_text %}
        <p class="bundle-title">{{ block_title_text }}</p>
    {% endif %}

    {% if btn_one_text and btn_one_qty > 1 %}
        <div>
            <bulk-add-to-cart
                product-id="{{ product.selected_or_first_available_variant.id }}"
                quantity-to-add="{{ btn_one_qty }}"
                show-badge="false"
                button-background-color="{{ block.settings.btn-one-background-color }}"
                button-border-color="{{ block.settings.btn-one-border-color }}"
                button-hover-color="{{ block.settings.btn-one-hover-color }}"
                button-border-hover-color="{{ block.settings.btn-one-border-hover-color }}"
                radio-border-color="{{ radio_border_color }}"
                radio-dot-color="{{ radio_dot_color }}">
                <span style="color: {{ btn_one_text_color }};" slot="btn_text">{{ btn_one_text }}</span>
            </bulk-add-to-cart>
        </div>
    {% endif %}

    {% if btn_two_text and btn_two_qty > 1 %}
        <div>
            <bulk-add-to-cart
                product-id="{{ product.selected_or_first_available_variant.id }}"
                quantity-to-add="{{ btn_two_qty }}"
                show-badge="true"
                button-background-color="{{ block.settings.btn-two-background-color }}"
                button-border-color="{{ block.settings.btn-two-border-color }}"
                button-hover-color="{{ block.settings.btn-two-hover-color }}"
                button-border-hover-color="{{ block.settings.btn-two-border-hover-color }}"
                radio-border-color="{{ radio_border_color }}"
                radio-dot-color="{{ radio_dot_color }}"
                badge-front-color="{{ badge_front_color }}"
                badge-back-color="{{ badge_back_color }}">
                <span style="color: {{ btn_two_text_color }};" slot="btn_text">{{ btn_two_text }}</span>
            </bulk-add-to-cart>
        </div>
    {% endif %}
    {% if btn_three_text and btn_three_qty > 1 %}
        <div>
            <bulk-add-to-cart
                product-id="{{ product.selected_or_first_available_variant.id }}"
                quantity-to-add="{{ btn_three_qty }}"
                show-badge="false"
                button-background-color="{{ block.settings.btn-three-background-color }}"
                button-border-color="{{ block.settings.btn-three-border-color }}"
                button-hover-color="{{ block.settings.btn-three-hover-color }}"
                button-border-hover-color="{{ block.settings.btn-three-border-hover-color }}"
                radio-border-color="{{ radio_border_color }}"
                radio-dot-color="{{ radio_dot_color }}">
                <span style="color: {{ btn_three_text_color }};" slot="btn_text">{{ btn_three_text }}</span>
            </bulk-add-to-cart>
        </div>
    {% endif %}

</div>

{{< /codebox >}}

## Go into your main-product.liquid file and look for the following code

{{< codebox >}}
{% comment %}Start of Bulk Add to Cart Component{% endcomment %}
{% when 'bulk-add-to-cart' %}  
{% render 'bulk-add-to-cart-buttons' block: block %}
{% comment %}End of Bulk Add to Cart Component{% endcomment %}
{{< /codebox >}}

## Add this code into your block settings

{{<codebox>}}
{
"type": "bulk-add-to-cart",
"name": "Bulk Add to Cart",
"limit": 1,
"settings": [
{
"type": "text",
"id": "block-title-text",
"default": "Bundle & Save",
"label": "Block Title Text"
},
{
"type": "color",
"id": "block-title-color",
"label": "Title Text Color",
"default": "#000000"
},
{
"type": "color",
"id": "block-divider-color",
"label": "Divider Line Color",
"default": "rgba(0, 0, 0, 0.12)"
},
{
"type": "header",
"content": "Bulk Button 1 Settings"
},
{
"type": "text",
"default": "Buy 2 at 10% Off",
"id": "bulk-btn-one-text",
"label": "Button Text"
},
{
"type": "color",
"id": "btn-one-background-color",
"label": "Button 1 Background Color",
"default": "#FFFFFF"
},
{
"type": "color",
"id": "btn-one-border-color",
"label": "Button 1 Border Color",
"default": "#D89693"
},
{
"type": "number",
"default": 2,
"id": "bulk-btn-one-qty",
"label": "Quantity To Add"
},
{
"type": "color",
"id": "bulk-btn-one-txt-color",
"label": "Button Text Color",
"default": "#121212"
},
{
"type": "color",
"id": "btn-one-hover-color",
"label": "Button 1 Hover Background",
"default": "#f5f5f5"
},
{
"type": "color",
"id": "btn-one-border-hover-color",
"label": "Button 1 Hover Border",
"default": "#c78683"
},
{
"type": "header",
"content": "Bulk Button 2 Settings"
},
{
"type": "text",
"default": "Buy 3 at 10% Off",
"id": "bulk-btn-two-text",
"label": "Button Text"
},
{
"type": "number",
"default": 3,
"id": "bulk-btn-two-qty",
"label": "Quantity To Add"
},
{
"type": "color",
"id": "bulk-btn-two-txt-color",
"label": "Button Text Color",
"default": "#121212"
},
{
"type": "color",
"id": "btn-two-background-color",
"label": "Button 2 Background Color",
"default": "#FFFFFF"
},
{
"type": "color",
"id": "btn-two-border-color",
"label": "Button 2 Border Color",
"default": "#D89693"
},
{
"type": "color",
"id": "btn-two-hover-color",
"label": "Button 2 Hover Background",
"default": "#f5f5f5"
},
{
"type": "color",
"id": "btn-two-border-hover-color",
"label": "Button 2 Hover Border",
"default": "#c78683"
},

        {
          "type": "header",
          "content": "Bulk Button 3 Settings"
        },
        {
          "type": "text",
          "default": "Buy 4 at 10% Off",
          "id": "bulk-btn-three-text",
          "label": "Button Text"
        },
        {
          "type": "number",
          "default": 4,
          "id": "bulk-btn-three-qty",
          "label": "Quantity To Add"
        },
        {
          "type": "color",
          "id": "bulk-btn-three-txt-color",
          "label": "Button Text Color",
          "default": "#121212"
        },
        {
                    "type": "color",
                    "id": "btn-three-background-color",
                    "label": "Button 3 Background Color",
                    "default": "#FFFFFF"
                },
                {
                    "type": "color",
                    "id": "btn-three-border-color",
                    "label": "Button 3 Border Color",
                    "default": "#D89693"
                },
                {
                    "type": "color",
                    "id": "btn-three-hover-color",
                    "label": "Button 3 Hover Background",
                    "default": "#f5f5f5"
                },
                {
                    "type": "color",
                    "id": "btn-three-border-hover-color",
                    "label": "Button 3 Hover Border",
                    "default": "#c78683"
                },

        {
                    "type": "header",
                    "content": "Badge Settings"
                },
                {
                    "type": "color",
                    "id": "badge-front-color",
                    "label": "Badge Front Color",
                    "default": "#F09896"
                },
                {
                    "type": "color",
                    "id": "badge-back-color",
                    "label": "Badge Back Color",
                    "default": "#A86A69"
                },





                {
      "type": "header",
      "content": "Radio Button Colors"
    },
    {
      "type": "color",
      "id": "radio-border-color",
      "label": "Radio Button Border Color",
      "default": "#000000"
    },
    {
      "type": "color",
      "id": "radio-dot-color",
      "label": "Radio Button Dot Color",
      "default": "#000000"
    },

{
"type": "range",
"id": "button-border-radius",
"min": 0,
"max": 40,
"step": 1,
"unit": "px",
"label": "Button Border Radius",
"default": 24
}
]
},

{{< /codebox >}}
