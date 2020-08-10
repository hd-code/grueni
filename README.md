# Grüni-App

Dies ist das Repository für die Grüni AR-App.

## Überblick

Die komplette App besteht aus mehreren Komponenten:
- Raspberry Pi - liefert die Sensor-Daten aus dem Anzuchtkasten über UDP
- Backend - node.js express App
  - empfängt, verarbeitet und speichert die Sensor-Daten vom Raspberry Pi
  - speichert und verwaltet Daten zu den Pflanzen sowie einen Pflanzenkatalog
  - liefert das Frontend an anfragende Clients aus
  - stellt eine REST-API für das Frontend zur Verfügung mittels dem die Daten abgerufen werden können
- Frontend - HTML Seite mit Vue.js, AFrame und AR.js

## Installation

### Backend und Frontend

Benötigte Software: Node (>= v12) und NPM (>= v6).

```sh
# Git Repo clonen
git clone https://github.com/hd-code/grueni-app.git

# ins Verzeichnis wechseln
cd grueni-app

# NPM-Abhängigkeiten installieren
npm install
```

### Raspberry Pi

Benötigte Software: Python (>= v2.5) => wenn nur lokal mit Zufallszahlen verwendet

Für die echten Sensor-Daten werden natürlich die entsprechenden Sensoren und weitere Software-Bibliotheken benötigt. Diese finden sich in der Dokumentation.

## Usage

### Backend

```sh
# Server starten
npm start
```

Auf der Konsole wird nun die URL angezeigt, auf der das Frontend im Webbrowser abgerufen werden kann.
Zusätzlich wird auch ein QR-Code mit der URL generiert, der einfach mit der Kamera gescannt werden kann.

Der Server wird standardmäßig auf Port `8080` gestartet. Wenn ein anderer Port verwendet werden soll, kann dieser mittels Environment-Variable gesetzt werden:

```sh
PORT=<custom_port> npm start
```

### Frontend

Wenn der Backend-Server läuft, kann die Webseite in jedem modernen Webbrowser aufgerufen werden.

Um die AR-Funktionalitäten nutzen zu können, wird zur Zeit ein selbstsigniertes SSL-Zertifikat vom Server verwendet. Daher erscheint im Browser eine Warnung, wenn die Seite geöffnet wird. Man wird gefragt, ob man der Seite vertraut und sie trotzdem aufrufen möchte. Dies kann ohne Probleme bejaht werden ;-)

Außerdem muss der Seite Zugriff auf die Kamera und die Bewegungssensoren des Gerätes gestattet werden.

#### VR-Modus

Manchmal ist es einfacher die App in VR zu starten. Dazu sind zwei Modifizierungen nötig. Die folgende Zeile in `frontend/index.html` muss auskommentiert werden:

```html
  <!-- comment in when AR-mode should be used -->
  <script src="https://raw.githack.com/AR-js-org/AR.js/3.1.0/aframe/build/aframe-ar.js"></script>
```

Außerdem muss in `frontend/assets/main.js` die Variable `appData.arMode` auf `false` gesetzt werden.

```ts
const appData = {
    arMode: true, // set to true to enable ar mode
    // ...
```

### Raspberry Pi

Das Raspberry Pi Skript kann auch auf dem gleichen Rechner wie das Backend gestartet werden. Aber vorsicht: das Skript liefert dann keine echten Messwerte, sondern nur Zufallszahlen, die stark umher springen.

```sh
# für die lokale Entwicklung:
#    mit dem Argument `mock` wird die Zufallsgenerator-Version des Skriptes gestartet
python raspi/main.py mock

# für Python ab Version 3:
python3 raspi/main.py mock
```

Für echte Sensor-Daten muss natürlich der echte Raspberry Pi mit den angeschlossenen Sensoren und den zusätzlichen Software Bibliotheken verwendet werden. Da lautet der Befehl dann:

```sh
# mittels der Environment-Variable `ADDR` muss dem Skript die Netzwerkadresse
# des Backends mitgeteilt werden, ansonsten kommen die Daten nicht an!
ADDR=<network_address_backend> python3 main.py
```

Backend und Raspberry Pi kommunizieren miteinander über den Port `4200`. Sollte dieser belegt sein, können beide Komponenten mittels Environment-Variable auf einen anderen Port gesetzt werden:

```sh
# anderer Port für den Raspberry Pi
PORT=<custom_port> ADDR=<network_address_backend> python3 main.py

# Backend muss auch auf den geänderten Port hören
RASPI_PORT=<raspberry_port> npm start
```

## SSL

Der Zugriff auf geräteinterne Funktionen wird von den meisten Endgeräten nur gestattet, wenn die Webseite eine SSL-Verschlüsselung bietet. Daher ist ein selbstsigniertes SSL-Zertfikat erstellt worden. Es liegt im Ordner `ssl`.

Sollte das Zertifikat abgelaufen sein, kann mit `npm run make:ssl` ein neues erstellt werden. Während der Erstellung werden mehrere Daten abgefragt, bitte einigermaßen sinnvoll beantworten ;-)

## Ordnerstruktur

- `backend` enthält den Code für das node.js Backend. Es ist komplett in TypeScript implementiert
- `data` enthält JSON Dateien, die als persistenter Speicher für die Daten agiert. Die Dateien werden vom Backend geladen, verwaltet und ausgeliefert
- `frontend` enthält alle Dateien, die an die Clients ausgliefert werden. Alle Dateien im `assets` können von den Clients abgerufen werden.
- `raspi` enthält die Python Skripte für den Raspberry Pi.
- `ssl` enthält die SSL-Zertifikate für gesicherte Verbindungen zum Server
- `unused` enthält Dateien, die während der Entwicklung entstanden, aber verworfen worden sind. Sie dienen jedoch gelegentlich als Referenz