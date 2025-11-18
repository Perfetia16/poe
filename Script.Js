 
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

document.addEventListener("DOMContentLoaded", () => {
    highlightActiveLink();
    setupContactPage();
    setupEnquiryPage();
    setupBookSearch();
});

 
function highlightActiveLink() {
    const path = location.pathname.split("/").pop();

    $$("nav a").forEach(a => {
        if(a.getAttribute("href") === path){
            a.classList.add("active");
        }
    });
}

 
function setupBookSearch(){
    const searchInput = $("#bookSearch");
    const books = $$(".book");

    if(!searchInput || books.length === 0) return;

    searchInput.addEventListener("input", () => {
        const q = searchInput.value.toLowerCase();

        books.forEach(book => {
            const title = book.querySelector("h3").textContent.toLowerCase();
            const show = title.includes(q);
            book.style.display = show ? "" : "none";
        });
    });
}

 
function setupContactPage(){
    const form = $("#contact-form");
    const result = $("#contact-result");

    if(!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = $("#name").value.trim();
        const email = $("#email").value.trim();
        const message = $("#message").value.trim();

        result.style.display = "block";
        result.textContent = `Thank you ${name}! Your message has been sent successfully.`;

        form.reset();
        setTimeout(() => result.style.display = "none", 5000);
    });
}

 
function setupEnquiryPage(){
    const type = $("#type");
    const serviceOptions = $("#service-options");
    const volunteerOptions = $("#volunteer-options");
    const form = $("#enquiry-form");
    const result = $("#result");
    const clearBtn = $("#clear-btn");

    if(!form) return;

     
    type.addEventListener("change", () => {
        serviceOptions.style.display = (type.value === "service") ? "block" : "none";
        volunteerOptions.style.display = (type.value === "volunteer") ? "block" : "none";
    });

    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = $("#name").value;
        const purpose = $("#type").value;

        result.style.display = "block";
        result.innerHTML = `
            <strong>Thank you ${name}!</strong><br>
            Your enquiry about <em>${purpose}</em> has been received.
        `;

        form.reset();
        serviceOptions.style.display = "none";
        volunteerOptions.style.display = "none";
    });

     
    clearBtn.addEventListener("click", () => {
        form.reset();
        result.style.display = "none";
        serviceOptions.style.display = "none";
        volunteerOptions.style.display = "none";
    });
}
