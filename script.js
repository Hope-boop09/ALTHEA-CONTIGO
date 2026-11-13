
// ======================================
// ALTHEA CONTIGO - FUNCIONES
// ======================================

// MENÚ PARA CELULARES
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú" : "Abrir menú"
        );
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// ANIMACIONES AL DESPLAZARSE
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// ======================================
// MAPA INTERACTIVO
// ======================================

const institutions = [
    {
        name: "Hospital Civil de Madero",
        address: "Servando Canales #1900 Norte, colonia Hidalgo",
        city: "Ciudad Madero, Tamaulipas",
        phone: "833 215 7258",
        hours: "Consultar directamente con la institución",
        latitude: 22.2539869,
        longitude: -97.8234249
    },
    {
        name: "DIF Ciudad Madero - Procuraduría de Protección",
        address: "Calle Armando Barba s/n, colonia Heriberto Kehoe",
        city: "Ciudad Madero, Tamaulipas",
        phone: "833 194 0596",
        hours: "Consultar directamente con la institución",
        latitude: 22.2452237,
        longitude: -97.8438561
    },
    {
        name: "Procuraduría de Protección de Niñas, Niños y Adolescentes",
        address: "Ciudad Madero, Tamaulipas",
        city: "Ciudad Madero, Tamaulipas",
        phone: "Consultar directamente",
        hours: "Consultar directamente con la institución",
        latitude: 22.2899644,
        longitude: -97.8387874
    }
];

// Crear mapa
const mapElement = document.getElementById("map");

if (mapElement && typeof L !== "undefined") {
    const map = L.map("map").setView([22.25, -97.85], 12);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }
    ).addTo(map);

    const institutionList = document.getElementById("institutionList");

    function loadInstitutions() {
        if (!institutionList) return;

        institutionList.replaceChildren();

        institutions.forEach((institution) => {
            const marker = L.marker([
                institution.latitude,
                institution.longitude
            ]).addTo(map);

            const popup = document.createElement("div");

            const title = document.createElement("strong");
            title.textContent = institution.name;

            const address = document.createElement("p");
            address.textContent = institution.address;

            const city = document.createElement("p");
            city.textContent = institution.city;

            popup.append(title, address, city);

            if (institution.phone) {
                const phone = document.createElement("p");
                phone.textContent = "Teléfono: " + institution.phone;
                popup.appendChild(phone);
            }

            if (institution.hours) {
                const hours = document.createElement("p");
                hours.textContent = "Horario: " + institution.hours;
                popup.appendChild(hours);
            }

            marker.bindPopup(popup);

            const item = document.createElement("div");
            item.className = "institution-item";

            const name = document.createElement("strong");
            name.textContent = institution.name;

            const location = document.createElement("span");
            location.textContent = institution.city;

            const button = document.createElement("button");
            button.textContent = "Ver ubicación →";

            button.addEventListener("click", () => {
                map.flyTo(
                    [institution.latitude, institution.longitude],
                    16
                );
                marker.openPopup();
            });

            item.append(name, location, button);
            institutionList.appendChild(item);
        });
    }

    loadInstitutions();
}

// ======================================
// FIN
// ======================================


// ======================================
// FIN
// ======================================
