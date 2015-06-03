index: website.html
	mv website.html index.html

serve: index.html
	python -m SimpleHTTPServer

publish: index.html
	rsync -L -avuz ./ soton:public_html --exclude '.hg'
