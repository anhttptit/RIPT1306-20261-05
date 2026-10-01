import { OrderStatus } from "./types.js";
import type { ID, Product, CartItem } from "./types.js";
import { Cart, formatPrice } from "./cart.js";

const json = `[
  { "id": 1,     "name": "Áo thun",      "price": 150000, "category": "ao" },
  { "id": 2,     "name": "Quần jean",    "price": 420000, "category": "quan", "discount": 15 },
  { "id": "SP3", "name": "Mũ lưỡi trai", "price": 120000, "category": "phukien" }
]`;

const products: Product[] = JSON.parse(json);
const cart = new Cart();

const productList = document.querySelector<HTMLUListElement>("#products");
const cartList = document.querySelector<HTMLUListElement>("#cart");
const totalEL = document.getElementById("total");
const msgEL = document.getElementById("msg");

function renderProducts(): void {
  if (!productList) return;

  products.forEach((p) => {
    const li = document.createElement("li");

    li.textContent = `${p.name} - ${formatPrice(p.price)} - ${p.category} ${p.discount ? `- Giảm ${p.discount}%` : ""}`;

    const addbtn = document.createElement("button");

    addbtn.textContent = "Thêm";

    addbtn.addEventListener("click", () => {
      cart.add(p);
      renderCart();
    });

    li.appendChild(addbtn);
    productList.appendChild(li);
  });
}

function renderCart(): void {
  if (!cartList) return;

  cartList.innerHTML = "";

  cart.getItems().forEach(([p, qty]) => {
    const li = document.createElement("li");

    li.textContent = `${p.name} - ${formatPrice(p.price)} x ${qty}`;

    const removeBtn = document.createElement("button");

    removeBtn.textContent = "Xóa";

    removeBtn.addEventListener("click", () => {
      cart.remove(p.id);
      renderCart();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  if (totalEL) {
    totalEL.textContent = formatPrice(cart.getTotal());
  }
}

document.getElementById("btn-pay")?.addEventListener("click", () => {
  const paid = cart.getCheckout();

  if (msgEL) {
    msgEL.textContent =
      cart.status === OrderStatus.Paid
        ? `Thanh toán thành công: ${formatPrice(paid)}`
        : "Giỏ hàng trống!";
  }
});

renderProducts();
renderCart();
