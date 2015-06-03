index: website.html
	cp website.html index.html

website.html: website.org
	./org2html

serve: index
	python -m SimpleHTTPServer


publish: index
	rsync -L -avuz ./ soton:public_html --exclude '.hg'
