
# Der Prototyp {#prototyp}
(Allgemeine Beschreibung: Kasten, Sensoren, App)
--
## Recherche und erste Tests
### Sensoren

Zum speichern und verarbeiten der Sensordaten, wird ein Raspberry Pi 4 benutzt, da dieser sich bereits im Besitz der Gruppe befand.
Bei den Sensoren war daher die Auswahl eher Begrenzt. 
	-Für die Lichtmessung wurde der Lichtsensor „BH1750“ gewählt da dieser bereits auf der Platine die Analogsignale in Digitalsignale wandelt.
	-Für die Temperaturmessung wurde der Sensor „DHT22“ gewählt da dieser so wie der Lichtsensor die Signale wandelt so das sie ohne zusätzliche Bauteile vom 	 Raspberry Pi gelesen werden können.
	-Für die Bodenfeuchtigkeitsmessung wurde der	„Capacitive Stil Moisture Sensor v2.0“ benutzt da dieser von Hardwareexperten der FH empfohlen wurde und unter den 	 Feuchtigkeitssensoren die präzisesten Daten liefert. 
	-Zudem benötigt man für die Signalverarbeitung des Feuchtigkeitssensors noch den Analog-Digital Wandler „MCP3008“. Auch dieser wurde gewählt da er von 	 führenden Hardwareexperten der FH empfohlen wurde. 
Zum testen und benutzen der Sensoren wurde ein kleines Python Script geschrieben, dass sowohl die die Sensoren anspricht als auch deren Daten als Json speichert. 


—————————————————————————————————————————————————————————————————————————————————————————

Das Medienprojekt und Praxis Projekt von Herrn Krischal überschneiden sich in einem Punkt, da es sich angeboten hat für beide Projekte die gleiche Hardware zum auslesen der Sensoren zu benutzen.
### AR

---
## Konzeption
### Ablauf und Visualisierung
https://drive.google.com/drive/folders/1b-I-Ynj_gnzshX2nmXE3F7P9P4ZDIKlV
### Architektur
https://drive.google.com/drive/folders/1axUoBa-6V8m4xlXnIqG_9iJej61XTZWL

Abgrenzung zum IT-Praxisprojekt Dennis

---
## Umsetzung
vlg. mit Grafik zur [Richtung des Prototyps](###features1)

Verweis zum Git Repository (+ Installationshinweise?)


### Video (?)

--
## Fazit zum Prototypen
### Aufgetretene Schwierigkeiten
### Verbesserungsmöglichkeiten

# Schlusswort
(Organisation im Team - Verweis auf Asana/Protokolle, Arbeitsaufteilung, Was konnten wir aus vergangenen Modulen mitnehmen und was haben wir Neues gelernt?)

# Anhang

Drehbuch, Drehplan