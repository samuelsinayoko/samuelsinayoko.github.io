<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Intro</a></li>
<li><a href="#sec-2">2. Publishing and Serving</a>
<ul>
<li><a href="#sec-2-1">2.1. Bitbucket</a></li>
<li><a href="#sec-2-2">2.2. Generating the website and publishing</a>
<ul>
<li><a href="#sec-2-2-1">2.2.1. Using Babel</a></li>
<li><a href="#sec-2-2-2">2.2.2. Using Make</a></li>
</ul>
</li>
</ul>
</li>
</ul>
</div>
</div>

# Intro<a id="sec-1" name="sec-1"></a>

This is the source for my website <http://www.sinayoko.com> that includes
-   Contact details, social networks and tweeter feed;
-   Research: my current and past projects;
-   Publications: from <publications.html> generated from JabRef based a BibTex file;
-   About-me: some infos about education and personnal infos;

The website is generated using Org Mode (v 8.2.10) from source file <website.md> with the BigBlow template from <https://github.com/fniessen/org-html-themes>.

# Publishing and Serving<a id="sec-2" name="sec-2"></a>

## Bitbucket<a id="sec-2-1" name="sec-2-1"></a>

Keep website under version control at <http://bitbucket.org/sinayoko/website>

## Generating the website and publishing<a id="sec-2-2" name="sec-2-2"></a>

### Using Babel<a id="sec-2-2-1" name="sec-2-2-1"></a>

    (find-file "website.org")
    (org-html-export-to-html)

### Using Make<a id="sec-2-2-2" name="sec-2-2-2"></a>

See <Makefile>.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="left" />

<col  class="left" />
</colgroup>
<tbody>
<tr>
<td class="left">`make index`</td>
<td class="left">Generate index.html from website.html</td>
</tr>


<tr>
<td class="left">`make serve`</td>
<td class="left">Start HTTP server (for testing)</td>
</tr>


<tr>
<td class="left">`make publish`</td>
<td class="left">Publish website to server with rsync & ssh</td>
</tr>


<tr>
<td class="left">`make website.html`</td>
<td class="left">Generate the website from the Org file website.org</td>
</tr>
</tbody>
</table>
