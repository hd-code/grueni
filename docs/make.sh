# go to docker file
docker run --rm -it -v "$PWD":/data pandoc bash

# markdown to latex
pandoc *.md -o text.tex

# latex to pdf
pdflatex -interaction nonstopmode vorlage

# remove tmp files
rm *.aux *.log *.out

# one-liner
pandoc *.md -o text.tex; \
pdflatex -interaction nonstopmode vorlage; \
rm *.aux *.log *.out