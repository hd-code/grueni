# Grüni-App

Dies ist der Web-Server, der die "Grüni" AR-App ausliefert.

In `docs/` ist die Spezifikation der REST-API für den Raspi.

## Hinweise für Jetzt

- Eine Anfrage an den Server liefert direkt die index.html aus
- zusätzliche Assets können in den Assets-Ordner gelegt werden und entsprechen im HTML eingebunden werden (Bsp: `<img src="assets/test.jpg">`)
- das Einbinden von lokalen Dateien funktioniert aus Sicherheitsgründen nur über den Assets-Ordner
- Das aktuelle Beispiel ist "Basic-Cube" von https://stemkoski.github.io/AR-Examples/
- Der Marker ist `hiro.png`. Einfach den Marker auf dem Bildschirm anzeigen und dann mit dem Handy abscannen, es müsste nun ein halb-transparenter Würfel über dem Marker erscheinen

## Installation

Benötigte Software: Node (>= v12) und NPM (>= v6)

```sh
# Git Repo clonen
git clone https://github.com/hd-code/grueni-app.git

# ins Verzeichnis wechseln
cd grueni-app

# NPM-Abhängigkeiten installieren
npm install

# Server starten
npm start
```

## Usage

Mit `npm start` wird der Webserver auf dem Port 8080 gestartet. Um einen anderen Port zu verwenden, stattdessen `PORT=<custom-port> npm start` ausführen.

In der Kommandozeile wird nun die Adresse angezeigt, unter welcher der Webserver erreichbar ist.

## SSL

Der Zugriff auf geräteinterne Funktionen wird von den meisten Endgeräten nur gestattet, wenn die Webseite eine SSL-Verschlüsselung bietet. Daher ist ein selbstsigniertes SSL-Zertfikat erstellt worden. Es liegt im Ordner `ssl/`.

Sollte das Zertifikat abgelaufen sein, kann mit `npm run make:ssl` ein neues erstellt werden. Während der Erstellung werden mehrere Daten abgefragt, bitte einigermaßen sinnvoll beantworten ;-)