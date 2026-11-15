// Product Catalog Data
const productsData = [
    {
        id: 1,
        name: "Floral Summer Shirt",
        price: 220,
        tags: ["new", "blue", "summer"],
        mostWanted: true,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Summer Green Tee",
        price: 260,
        tags: ["new", "green", "beach"],
        mostWanted: true,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Party Floral Shirt",
        price: 399,
        tags: ["old", "red", "party"],
        mostWanted: true,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Beach Linen White",
        price: 399,
        tags: ["old", "white", "beach"],
        mostWanted: true,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Urban Street Jacket",
        price: 579,
        tags: ["old", "white", "beach"],
        mostWanted: true,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Crimson Party Blazer",
        price: 579,
        tags: ["old", "red", "party"],
        mostWanted: false,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Breezy Resort Shirt",
        price: 399,
        tags: ["old", "red", "party"],
        mostWanted: false,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Classic Denim Overshirt",
        price: 579,
        tags: ["old", "blue", "summer"],
        mostWanted: false,
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Minimalist White Shirt",
        price: 220,
        tags: ["new", "white", "summer"],
        mostWanted: false,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Top Offer Bar Close
    const offerBar = document.getElementById("offer-bar");
    const offerClose = document.getElementById("offer-close");
    if (offerClose) {
        offerClose.addEventListener("click", () => {
            offerBar.style.display = "none";
        });
    }

    // 2. Mobile Side Navbar Toggle
    const sideNavbar = document.getElementById("side-navbar");
    const sideActivate = document.getElementById("side-navbar-activate");
    const sideClose = document.getElementById("side-navbar-close");

    if (sideActivate && sideNavbar && sideClose) {
        sideActivate.addEventListener("click", () => {
            sideNavbar.classList.add("open");
        });

        sideClose.addEventListener("click", () => {
            sideNavbar.classList.remove("open");
        });
    }

    // 3. Collections Elements & Filtering Logic
    const collectionsGrid = document.getElementById("collections-grid");
    const searchInput = document.getElementById("product-search");
    const checkboxes = document.querySelectorAll('input[name="tags"]');

    function renderCollections() {
        if (!collectionsGrid) return;

        const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

        const occasionTags = ["summer", "party", "beach"];
        const colorTags = ["red", "blue", "white", "green"];
        const arrivalTags = ["new", "old"];

        const checkedValues = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        const selectedOccasions = checkedValues.filter(v => occasionTags.includes(v));
        const selectedColors = checkedValues.filter(v => colorTags.includes(v));
        const selectedArrivals = checkedValues.filter(v => arrivalTags.includes(v));

        const filtered = productsData.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(query) ||
                                  product.tags.some(tag => tag.includes(query));

            const matchesOccasion = selectedOccasions.length === 0 ||
                                    selectedOccasions.some(tag => product.tags.includes(tag));

            const matchesColor = selectedColors.length === 0 ||
                                 selectedColors.some(tag => product.tags.includes(tag));

            const matchesArrival = selectedArrivals.length === 0 ||
                                   selectedArrivals.some(tag => product.tags.includes(tag));

            return matchesSearch && matchesOccasion && matchesColor && matchesArrival;
        });

        collectionsGrid.innerHTML = "";

        if (filtered.length === 0) {
            collectionsGrid.innerHTML = "<p>No products match your search or selected filters.</p>";
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
            `;
            collectionsGrid.appendChild(card);
        });
    }

    // 4. Page Navigation (Views Switching)
    const views = {
        home: document.getElementById("home-view"),
        collections: document.getElementById("collections-view"),
        contact: document.getElementById("contact-view")
    };

    function switchPage(pageName, scrollTargetId = null, preselectFilter = null) {
        Object.keys(views).forEach(key => {
            if (views[key]) {
                views[key].classList.toggle("hidden", key !== pageName);
            }
        });

        document.querySelectorAll(".navbar-links a, .side-navbar-links a").forEach(link => {
            const isMatch = link.dataset.page === pageName &&
                            !link.dataset.scroll &&
                            (link.dataset.filter || null) === preselectFilter;
            link.classList.toggle("active", isMatch);
        });

        if (pageName === "collections") {
            checkboxes.forEach(cb => {
                cb.checked = preselectFilter ? cb.value === preselectFilter : false;
            });
            if (searchInput) searchInput.value = "";
            renderCollections();
        }

        if (sideNavbar) {
            sideNavbar.classList.remove("open");
        }

        if (scrollTargetId) {
            setTimeout(() => {
                const el = document.getElementById(scrollTargetId);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 50);
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    document.querySelectorAll("[data-page]").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            switchPage(
                trigger.dataset.page,
                trigger.dataset.scroll || null,
                trigger.dataset.filter || null
            );
        });
    });

    // 5. Hero Image Slider Controls
    const sliderImages = document.getElementById("slider-images");
    const leftBtn = document.getElementById("slider-left-activate");
    const rightBtn = document.getElementById("slider-right-activate");

    if (sliderImages && leftBtn && rightBtn) {
        const totalSlides = sliderImages.children.length;
        let currentSlide = 0;

        function updateSlider() {
            sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        rightBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });

        leftBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }

    // 6. Render Most Wanted & Wishlist Toggles
    const mostWantedContainer = document.getElementById("most-wanted-list");
    if (mostWantedContainer) {
        const mostWantedItems = productsData.filter(item => item.mostWanted);

        mostWantedItems.forEach(item => {
            const card = document.createElement("div");
            card.className = "most-wanted-container";
            card.innerHTML = `
                <img class="product-img" src="${item.image}" alt="${item.name}">
                <p class="sale-overlay">sale</p>
                <div class="like-button" title="Add to Wishlist">
                    <i class="fa-regular fa-heart"></i>
                </div>
            `;

            const heartBtn = card.querySelector(".like-button");
            const heartIcon = heartBtn.querySelector("i");
            heartBtn.addEventListener("click", () => {
                heartBtn.classList.toggle("liked");
                heartIcon.classList.toggle("fa-regular");
                heartIcon.classList.toggle("fa-solid");
            });

            mostWantedContainer.appendChild(card);
        });
    }

    // 7. Enable Horizontal Scrolling (Mouse Wheel & Click-and-Drag)
    const horizontalContainers = document.querySelectorAll(".new-arrival, .most-wanted");

    horizontalContainers.forEach(container => {
        // Vertical mouse wheel to horizontal scroll
        container.addEventListener("wheel", (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        // Click-and-drag panning
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener("mousedown", (e) => {
            isDown = true;
            container.style.cursor = "grabbing";
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener("mouseleave", () => {
            isDown = false;
            container.style.cursor = "grab";
        });

        container.addEventListener("mouseup", () => {
            isDown = false;
            container.style.cursor = "grab";
        });

        container.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });

    // 8. Attach Filter & Search Listeners
    if (searchInput) {
        searchInput.addEventListener("input", renderCollections);
    }
    checkboxes.forEach(cb => cb.addEventListener("change", renderCollections));
    renderCollections();

    // 9. Newsletter & Contact Form Submissions
    const newsletterForm = document.getElementById("newsletter-form");
    const newsletterMsg = document.getElementById("newsletter-msg");
    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            newsletterMsg.textContent = "Thanks for subscribing! Check your inbox for your 20% OFF code.";
            newsletterForm.reset();
        });
    }

    const contactForm = document.getElementById("contact-form");
    const contactMsg = document.getElementById("contact-msg");
    if (contactForm && contactMsg) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            contactMsg.textContent = "Message sent! Our team will get back to you within 24 hours.";
            contactForm.reset();
        });
    }
});