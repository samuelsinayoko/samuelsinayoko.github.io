# Intro

This is the source for my website <https://samuelsinayoko.github.io/> that includes
-   Contact details, social networks and tweeter feed;
-   Research: my current and past projects;
-   Publications: from <publications.html> generated from JabRef based a BibTex file;
-   About-me: some infos about education and personnal infos;

The website is generated using Org Mode (v 8.2.10) from source file <website.md> with the BigBlow template from <https://github.com/fniessen/org-html-themes>.

# Publishing and Serving

## Bitbucket

Keep website under version control at <http://bitbucket.org/sinayoko/website>

## Generating the website and publishing

### Using Babel

    (find-file "website.org")
    (org-html-export-to-html)

### Using Make

See <Makefile>.
-   `make index` Generate index.html from website.html
-   `make serve` Start HTTP server (for testing)
-   `make publish` Publish website on Southampton server with rsync & ssh
-   `make website.html` Generate the website from the Org file website.org
