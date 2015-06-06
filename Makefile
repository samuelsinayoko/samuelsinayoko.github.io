index: website.html
	cp website.html index.html

website.html: website.org publications.html org2html
	./org2html

serve: index
	python -m SimpleHTTPServer


publish: index
	rsync -L -avuz ./ soton:public_html --exclude '.hg'

biblio:
	# Update publications and bib file
	mkdir -p data
	rsync -avhP ~/dbox/publications/ data/
	# Generate publications.html
	jabref -n -o $(CURDIR)/publications.html,orgblock $(CURDIR)/data/sinayoko.bib
