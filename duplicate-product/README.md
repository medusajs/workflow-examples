# Duplicate Product Workflow

This example demostrates how to implement a workflow that duplicates a product.

## How to use

A new widget has been added to the product details page in the admin UI. The widget is located in top right corner of the page, and is a round button with a tool icon. Clicking the button will reveal a dropdown menu with a single option, "Duplicate Product".

<img width="1354" alt="Screenshot 2023-11-22 at 19 15 05" src="https://github.com/medusajs/workflow-examples/assets/45367945/2ca401c1-1b25-4b23-8b48-20d4ce5187f1">

Clicking the option will open a drawer with a form. The form allows the user to specify a new name for the duplicated product, as well as selecting which attributes to copy from the original product. The form also allows the user to specify whether the duplicated product should be published immediately, or be created in draft state.

<img width="1354" alt="Screenshot 2023-11-22 at 19 13 12" src="https://github.com/medusajs/workflow-examples/assets/45367945/444ac392-7e7c-4867-bda3-a346cbce84bb">

Once the form is submitted, the workflow will be triggered. The user will be notified of the success or failure of the workflow through a toast notification. On success, the user will be redirected to the details page of the duplicated product.

## How it works

The workflow is triggered through a custom endpoint, which is called from a admin Widget on the product details page.

The workflow consist of the following steps:

### Steps

1. The original product is retrieved from the database.
2. A new product is created with the attributes of the original product that have been specified in the admin Widget, as well as the new name and handle. The compensation handler ensures that the new product is deleted if the workflow fails.
3. The original product's variants are duplicated and assigned to the new product. The compensation handler ensures that the new product's variants are deleted if the workflow fails.
4. (Requires InventoryModule) Invetory items are generated and attached to the new product's variants. The compensation handler ensures that the new product's variants' inventory items are deleted if the workflow fails.
5. The new product is retrieved with admin pricing and returned to user.
