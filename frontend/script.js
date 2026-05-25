const API_URL = "http://localhost:5000/api/products";

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const statusMessage = document.getElementById("statusMessage");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");

let editingProductId = null;

function setStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
}

function resetForm() {
  editingProductId = null;
  productForm.reset();
  submitButton.textContent = "Add Product";
  cancelEditButton.classList.add("hidden");
}

function startEdit(product) {
  editingProductId = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  submitButton.textContent = "Update Product";
  cancelEditButton.classList.remove("hidden");
  setStatus(`Editing ${product.name}`, "info");
}

async function handleResponse(response, fallbackMessage) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || fallbackMessage);
  }

  return data;
}

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const products = await handleResponse(response, "Unable to load products");

    productList.innerHTML = "";

    if (!products.length) {
      productList.innerHTML = "<p class=\"empty-state\">No products available yet.</p>";
      return;
    }

    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
        <div>
          <h3>${product.name}</h3>
          <p>Price: ₦${product.price}</p>
        </div>
        <div class="card-actions">
          <button class="edit-btn" onclick='editProduct(${JSON.stringify(product)})'>
            Edit
          </button>
          <button class="delete-btn" onclick="deleteProduct(${product.id})">
            Delete
          </button>
        </div>
      `;

      productList.appendChild(productCard);
    });
  } catch (error) {
    setStatus(error.message, "error");
  }
}

productForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const price = priceInput.value;

  const requestOptions = {
    method: editingProductId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, price })
  };

  const requestUrl = editingProductId ? `${API_URL}/${editingProductId}` : API_URL;

  try {
    const response = await fetch(requestUrl, requestOptions);
    const result = await handleResponse(
      response,
      editingProductId ? "Unable to update product" : "Unable to add product"
    );

    setStatus(result.message, "success");
    resetForm();
    await fetchProducts();
  } catch (error) {
    setStatus(error.message, "error");
  }
});

async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    const result = await handleResponse(response, "Unable to delete product");

    setStatus(result.message, "success");
    if (editingProductId === id) {
      resetForm();
    }
    await fetchProducts();
  } catch (error) {
    setStatus(error.message, "error");
  }
}

function editProduct(product) {
  startEdit(product);
}

cancelEditButton.addEventListener("click", function () {
  resetForm();
  setStatus("Edit cancelled", "info");
});

window.deleteProduct = deleteProduct;
window.editProduct = editProduct;

fetchProducts();