export default function mobileMenu() {
  document.querySelector(".hamburger-icon").addEventListener("click", () => {
    document.querySelector(".mobile-menu-container").style.left = "0";
  });
}
