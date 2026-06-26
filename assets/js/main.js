/*
    Editorial by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var $window = $(window),
        $head = $('head'),
        $body = $('body');

    // Breakpoints
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ],
        'xlarge-to-max':    '(min-width: 1681px)',
        'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
    });

    // Stops animations/transitions until the page has loaded
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Stops animations/transitions while resizing
    var resizeTimeout;
    $window.on('resize', function() {
        $body.addClass('is-resizing');
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            $body.removeClass('is-resizing');
        }, 100);
    });

    // Fixes for Object fit images
    if (!browser.canUse('object-fit') || browser.name == 'safari') {
        $('.image.object').each(function() {
            var $this = $(this),
                $img = $this.children('img');
            $img.css('opacity', '0');
            $this
                .css('background-image', 'url("' + $img.attr('src') + '")')
                .css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
                .css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');
        });
    }

    // Sidebar
    var $sidebar = $('#sidebar'),
        $sidebar_inner = $sidebar.children('.inner');

    breakpoints.on('<=large', function() { $sidebar.addClass('inactive'); });
    breakpoints.on('>large', function() { $sidebar.removeClass('inactive'); });

    if (browser.os == 'android' && browser.name == 'chrome')
        $('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>').appendTo($head);

    $('<a href="#sidebar" class="toggle">Toggle</a>')
        .appendTo($sidebar)
        .on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $sidebar.toggleClass('inactive');
        });

    $sidebar.on('click', 'a', function(event) {
        if (breakpoints.active('>large')) return;
        var $a = $(this), href = $a.attr('href'), target = $a.attr('target');
        event.preventDefault();
        event.stopPropagation();
        if (!href || href == '#' || href == '') return;
        $sidebar.addClass('inactive');
        setTimeout(function() {
            if (target == '_blank') window.open(href);
            else window.location.href = href;
        }, 500);
    });

    $sidebar.on('click touchend touchstart touchmove', function(event) {
        if (breakpoints.active('>large')) return;
        event.stopPropagation();
    });

    $body.on('click touchend', function(event) {
        if (breakpoints.active('>large')) return;
        $sidebar.addClass('inactive');
    });

    // Sidebar Scroll lock.
    $window.on('load.sidebar-lock', function() {
        var sh, wh, st;
        if ($window.scrollTop() == 1) $window.scrollTop(0);

        $window.on('scroll.sidebar-lock', function() {
            var x, y;
            if (breakpoints.active('<=large')) {
                $sidebar_inner.data('locked', 0).css('position', '').css('top', '');
                return;
            }
            x = Math.max(sh - wh, 0);
            y = Math.max(0, $window.scrollTop() - x);

            if ($sidebar_inner.data('locked') == 1) {
                if (y <= 0) $sidebar_inner.data('locked', 0).css('position', '').css('top', '');
                else $sidebar_inner.css('top', -1 * x);
            } else {
                if (y > 0) $sidebar_inner.data('locked', 1).css('position', 'fixed').css('top', -1 * x);
            }
        }).on('resize.sidebar-lock', function() {
            wh = $window.height();
            sh = $sidebar_inner.outerHeight() + 30;
            $window.trigger('scroll.sidebar-lock');
        }).trigger('resize.sidebar-lock');
    });

    // Menu
    var $menu = $('#menu'),
        $menu_openers = $menu.children('ul').find('.opener');

    $menu_openers.each(function() {
        var $this = $(this);
        $this.on('click', function(event) {
            event.preventDefault();
            $menu_openers.not($this).removeClass('active');
            $this.toggleClass('active');
            $window.triggerHandler('resize.sidebar-lock');
        });
    });

    // Custom search engine
    const sitePages = [
		{ url: "home.html", title: "Home", keywords: "welcome nsnx neuro-x introduction epfl" },
		{ url: "about_us.html", title: "About Us", keywords: "epfl details committee official documents mission vision what nsnx" },
		{ url: "studyplan.html", title: "Study Plan", keywords: "epfl courses credits masters bachelors schedule thesis" },
		{ url: "courses.html", title: "Courses", keywords: "epfl field neuroscience ai engineering subjects curriculum" },
		{ url: "general.html", title: "General Information", keywords: "epfl program resources study plans handbook" },
		{ url: "student_alumni.html", title: "For Students & Alumni", keywords: "epfl students alumni graduates community network career profession job" },
		{ url: "labs_list.html", title: "Neuro-X Labs List", keywords: "epfl research laboratories science professors projects semester" },
		{ url: "companies_campuses.html", title: "Companies & Campuses", keywords: "epfl industry collaborations jobs internships campus geneva lausanne sion fribourg" },
		{ url: "commissions.html", title: "Commissions", keywords: "events conferences interviews team buildings social media sponsoring delegates drive website hoodies" },
		{ url: "events.html", title: "Events", keywords: "partnership association calendar upcoming activities meal tombola party" },
		{ url: "hoodies_merch.html", title: "Hoodies & Merch", keywords: "epfl clothing apparel shop buy sweater merch color colour" },
		{ url: "https://neuro-x.epfl.ch/en/all-news/", title: "News & Newsletter", keywords: "epfl updates information bulletin articles latest news" }
	];

    // Expose function globally so HTML inline events (onkeyup) can access it
    window.executeSearch = function() {
        const query = document.getElementById('query').value.toLowerCase().trim();
        const resultsContainer = document.getElementById('search-results');
        
        resultsContainer.innerHTML = ''; 

        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Safety check added to prevent crashes if a keyword is missing
        const matches = sitePages.filter(page => 
            (page.title || "").toLowerCase().includes(query) || 
            (page.keywords || "").toLowerCase().includes(query)
        );

        resultsContainer.style.display = 'block';

        if (matches.length > 0) {
            matches.forEach(page => {
                const listItem = document.createElement('li');
                listItem.style.padding = "8px 12px";
                listItem.style.borderBottom = "1px solid rgba(128, 128, 128, 0.2)";
				listItem.innerHTML = `<a href="${page.url}" style="border-bottom: none; display: block; font-weight: bold; color: #444444;">${page.title}</a>`;
                resultsContainer.appendChild(listItem);
            });
        } else {
            resultsContainer.innerHTML = '<li style="padding: 8px 12px; color: #888;">No results found.</li>';
        }
    };

})(jQuery);