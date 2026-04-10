# NSNX Website Transition & Maintenance Guide

## 1. Architecture & Technology Stack
The NSNX website is a static site built using raw HTML, CSS, and plain JavaScript. It does not use a backend, framework, or CMS (like WordPress).

* **Styles:** Custom CSS mixed with a modified HTML5 UP template.
* **Icons:** FontAwesome 6 (loaded via CDN).
* **Interactivity:** Lightweight Vanilla JS & jQuery (for the template's responsive sidebar).

---

## 2. File Structure
The project directory contains the following core components:

### HTML Pages (`*.html`)
* **Entry Point (`index.html`):** The required entry point for GitHub Pages. Its sole purpose is to automatically redirect visitors to the actual homepage (`home.html`).
* **Core Webpages:** The primary content pages of the website. 
  * `home.html`, `about_us.html`, `events.html`, `courses.html`, `studyplan.html`, `labs_list.html`, `companies_campuses.html`, `student_alumni.html`, `commissions.html`, `hoodies_merch.html`, `general.html`.
* **Utility Files:** HTML5 UP template utilities and elements.
  * `elements.html`, `generic.html`.

### Directories
* **`assets/`**: Contains the template's CSS stylesheets, JavaScript files (for sidebar toggling and template logic), web fonts, and Sass files. 
* **`images/`**: All photos, logos, event banners, and graphical assets must be placed here.

### Documentation & Resources
* **`README.md`**: The main repository documentation and project overview.
* **`transition.md`**: This maintenance and transition guide.
* **`LICENSE`**: Creative Commons Attribution 3.0 Unported (required by the HTML5 UP base template).
* **`SV_NEURO-X_MA.pdf`**: Downloadable master's study plan or related document.
* **`web_plan.pptx`**: Internal presentation or planning document for the website.

---

## 3. How to Update Common Content

Overall, the website is very easy to maintain. Most of the time, you don't need to write new code from scratch, simply look at what has already been built and copy/paste/modify the existing sections to maintain a consistent look and feel.

### A. The Navigation Menu (Sidebar)
> ⚠️ **Important:** Because this is a static site without a templating engine (like PHP or React), the sidebar code is duplicated in every single HTML file. If you add a new webpage, you must add it to the `<nav id="menu">`, and then copy and paste that updated `<nav>` block into `home.html`, `events.html`, `about_us.html`, `courses.html`, etc.

### B. Events Management
Managing events requires updating multiple locations depending on whether the event is upcoming or has already passed:

* **Upcoming Events:** Add the new event details (image and Google Form link) to the `<header class="major">` section in `events.html`. You must also update the mini-post in the sidebar of `home.html` to point to this new event.
* **Passed Events:** Once an event is over, remove it from the upcoming sections and add it to the **Past Events Slider** in `events.html`. 
    * Add a `<div class="past-events-slide">` block inside the `<div id="pastEventsSlider">` container.
    * The JavaScript will automatically detect the number of slides and rotate them every 10 seconds.
    * The first slide must always have the class `active`.

### C. General Content Updates
Update the other core pages based on what happens throughout the academic year:

* **Hoodies & Merch (`hoodies_merch.html`):** Update the Google Form links, drop dates, and color swatches (using CSS `background-color` hex codes) when a new hoodie drop occurs.
* **Labs (`labs_list.html`):** Add new rows to the `<tbody>` when new labs open or professors change using the structure `<tr><td><a href="...">Lab Name</a></td><td>Prof Name</td></tr>`.
* **Companies (`companies_campuses.html`):** Add new companies to the `<div class="featured-companies-grid">` by including the logo image, description, and a "Learn More" link.

---

## 4. CSS Styling
**You only need to know about `assets/css/main.css` for styling.** All custom style changes and overrides for the template were made in this specific file. If you need to format new sections, tweak visuals, or check existing custom classes, refer to this file.

---

## 5. Visualization & Deployment

### Local Development
To visualize your changes locally before deploying, it is recommended to use the **Live Server (v5.7.10 by Ritwick Dey)** extension in VS Code. However, because this is a standard static site, you are free to use whatever local server or browser preview tool you prefer.

### Deployment
Deployment is entirely automated. The website is hosted via GitHub Pages and will automatically deploy as soon as you **commit and push** your new changes to the repository's main branch.

---

## 6. Support & Contact

If you are taking over the maintenance of this website and run into any issues that are not covered in this guide, feel free to reach out to me:

* **Telegram:** @matthieubeylard