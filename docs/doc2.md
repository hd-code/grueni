# Die Vision {#vision}
Der Weg durch die Projektfindungsphase führt nun also zur Anwendung "Grüni". Grüni ist ein universelles Hilfstool für Pflanzen, welches im Haus oder Garten Einsatz findet. Sie beherrscht sehr umfangreiche Analysen, Simulationen und Funktionalitäten rund um das Gärtnern. Dabei ist die Größe des Topfes, Beetes oder Gartens sowie die Auswahl der Geräte, auf denen die App funktioniert, komplett variabel und frei. Es kommen sehr ausgefeilte Arten der holografischen Visualisierung zum Einsatz, bis hin zu einem personifizierten Gartengehilfen – PLANT-E. Wobei PLANT-E selbst keine Arbeiten verrichten kann, sondern als holografischer Assistent den Nutzer vor allem durch Prozesse (Eintopfen, Umtopfen etc.) führt oder Erinnerungen gibt.

### Geplante Features für die Zukunftsvision
Geräteunabhängig => App läuft auf stationären Geräten (z.B. Echo-Dots), mobilen Endgeräten (z.B. Smartphone, Tablet)
Geräteübergreifend => Messungen von einem Gerät (steht bei den Pflanzen), Mitteilung des Nutzers über ein anderes Gerät (welches ihm gerade am nächsten ist)
Nutzung in verschiedensten “Räumen” => drin/draußen, ein paar Töpfe/Beet/ganzer Garten
Analyse der Umgebung => geeignete Orte für die Pflanzen finden
Simulation des Pflanzenwachstums innerhalb einer gegebenen Umgebung
Beetplanung => Visualisierung von Pflanzen an entsprechenden Stellen (holografisch) inklusive Simulation wie sich die Pflanze dort entwickeln würden
Pflanzenerkennung => Klassifizierung von Pflanzen und Samen
Bereitstellung von Informationen zur Pflanze
Bestimmung des Zustands der Pflanze => Alter, Bewässerung, Bodenzustand, Lichtverhältnisse, Reifegrad der Früchte usw.
Visualisierung dieser Zustandsinformationen (z.B. mit einer Gieß- bzw. Bewässerungsanzeige) => holografisch, symbolisch, auditiv
Erinnerungsfunktion z.B. ans Gießen, Umtopfen, Rausstellen (z.B. in Form von PLANT-E)
Vorschläge und Produktempfehlungen => zu den Bedürfnissen der Pflanzen werden die benötigten Tools und Komponenten gleich zur Bestellung angeboten
der “Lehrmeister” PLANT-E => Personifizierung des Computers für den Menschen, Tipps Erinnerungen und co. werden über PLANT-E dem Nutzer mitgeteilt.
Fingerabdruck-Scan => zum Autorisieren von Transaktionen
Gestenerkennung => Greifen (zum Auswählen), leichtes Nicken, Rahmen für einen Schnappschuss setzen
Sharing-Funktion => Möglichkeit die eigenen Pflanzen mit den Freunden zu teilen, fotobasiert

---
## Videovorbereitungen

### Drehbuch
(kurze Beschreibung der Entwicklung plus Verweis Anhang)
Produkt Grundidee Vision - was soll dargestellt werden? 
--> Zielgruppe Jonas (startet mit keinerlei Grundwissen, kommt zufällig an Gärtner-Material und wird daraufhin auf die Anwendung gestoßen)
Darstellung über PLANT-E, der dabei wie ein virtueller Lehrer ist, der das Gärtnern in deinem spezifischen Beet beibringen soll
zum einen soll eine Beratung stattfinden, d.h. virtuelle Simulation der Pflanzen auf dem Beet
Anschließend dann Anweisungen wie alles umgesetzt wird
Dramaturgisch: Entwicklung findet gleichermaßen zwischen Mensch und App statt


### Interaktionsgestaltung und UI-Design
https://docs.google.com/document/d/1U0tyraiAKUoylB5gmYOqaIDQtpblvdMzh02Rflr4A3w/edit#

Bei der Entwicklung des Drehbuches wurde bereits schnell deutlich, dass die Interaktionsgestaltung im Fokus der Handlung stehen sollte. Wie die Features der Vision in der Interaktion aussehen, zeigt sich in den folgenden Designentwurf-Skizzen (Stand 26.05.2020) zur Umsetzung in den Szenen:
#### Szene 2
- Verarbeitung von Sprachbefehlen
- Scannen des Raums, Identifizierung der Gegenstände → Erkennung von Anzuchtkasten und Samen:
![UI Raumscan 1](img/UI/Raumscan1.png)
![UI Raumscan 2](img/UI/Raumscan2.png)
![UI Raumscan 3](img/UI/Raumscan3.png)
→ Stil-Inspiration: https://www.youtube.com/watch?v=3HbkcRAQhew

- Visualisierung der Pflanzen:
![Pflanzenvisualisierung Frontalansicht](img/UI/Pflanzenvisualisierung_frontal.png)
![Pflanzenvisualisierung Variante 1](img/UI/Pflanzenvisualisierung.png)
![Pflanzenvisualisierung Variante 2](img/UI/Pflanzenvisualisierung_mitNamen.png)

- Gestenerkennung → “Greifen” der Pflanzen, um mehr Informationen zu erhalten
![Gestenerkennung - Greifen](img/UI/Greifen.png)

- Anzeige weiterer Informationen über die Pflanzen
![Steckbrief Variante 1](img/UI/Steckbriefanzeige.png)
![Steckbrief Variante 2](img/UI/Steckbriefanzeige_verschVarianten.png)

- Analyse des Raumes und Erkennen eines guten Standortes für den Anzuchtkasten 
![UI Raumscan 4](img/UI/Raumscan4.png)

- Gestenerkennung → Unsicherheit Christians wird erkannt und Hilfe angeboten

#### Szene 3
- Visualisierung des personifizierten Helfers → PLANT-E
- Führen durch einen Ablauf (Eintopfen) mit Hilfe von PLANT-E
- dabei wird der Fortschritt vom System erkannt und PLANT-E gibt dazu entsprechendes Feedback
- Gießanzeige → zusätzliche Visualisierung zur Unterstützung, die unabhängig von PLANT-E ist 

#### Szene 4
- Erinnerungsfunktion → in dem Fall zum Umtopfen
- Analyse der benötigten Utensilien und Angebot, dieselbigen zu bestellen
- Fingerabdruck-Scanner zur Autorisierung der Bestellung
![Fingerabdruck-Scan](img/UI/Badansicht.png)

#### Szene 5
- Führen durch einen Ablauf (Umtopfen) → wird nur in Grundzügen gezeigt, da das bereits vorgekommen ist
- Sharing-Funktion → Fotografieren und Teilen mit den Freunden

#### Szene 6
- Analyse des Pflanzenzustands (Reifegrad der Früchte) → Feedback und Handlungsempfehlung wird mit Hilfe von PLANT-E dem Nutzer mitgeteilt
- Beetplanung → wird angedeutet mit den vielen neuen Töpfen auf dem Balkon   
Anmerkung: konnte aus Platzmangelgründen am Drehort nicht umgesetzt werden
- Sharing-Funktion → Funktion wird wieder aufgegriffen für die Endansicht
- zeigt den Einsatz der App in verschiedenen Garten-, Beetgrößen und Szenarien
- im Endeffekt nicht direkt dargestellt ist die mögliche Erweiterung auf automatisierte Versorgungssysteme (z.B. Bewässerung), durch die Karten-Endansicht wird aber angedeutet, dass es im Allgemeinen noch weitere Nutzungsmöglichkeiten gibt



### Storyboard und Drehplan

---
## Der Dreh
Datum, Ablauf, Akteure

---
## Nachbearbeitung des Videomaterials

### Schnitt
FinalCut Programm, Musik, 
### Animation
PLANT-E (Quelle angeben! Urheberrechte siehe Video-Abspann)
### After Effects

---
## Fazit zum Ergebnis-Video
vgl. mit geplante Features

### Aufgetretene Schwierigkeiten
- Prioritätenlegung beim Drehbuch: inwieweit lässt sich in kurzer Zeit eine schöne Geschichte erzählen bei der eine Produktvision mit ihren Features deutlich vermittelt wird? Mehrmalige Absprachen und Überarbeitungen des Drehbuches führten von Version 1 (Anhang) zu Version X (Anhang) --> Asana Protokolle (Grad Interaktionsgestaltung)
- Interaktionsgestaltung wurde zwar bereits vor dem Dreh bei der Erstellung von Storyboard und Drehplan kommuniziert, skizziert allerdings erst hinterher. Teilweise musste dann mit Bildausschnitten gearbeitet werden, die man noch optimieren hätte können.
- Storyboard und Drehplan ermöglichten reibungslosen Dreh, dabei wurden jedoch die Kameras fast durchgängig laufen gelassen. Dies geschah der Einfachheit halber da Platzmangel herrschte und die Kameras teilweise schlecht zugängig waren, was für den Moment eine sinnvolle Entscheidung war. Im Nachhinein wurde daraus im Schnitt jedoch ein Batzen Arbeit für den Batz, da eine große Menge an Videomaterial gesichtet und aussortiert werden musste schon alleine für den Rohschnitt.
- Aus technischen Gründen: Reihenfolge Schnitt, Animation, After Effects nur nacheinander möglich, man konnte nur teilweise parallel an dem Video arbeiten
- 

### Verbesserungsmöglichkeiten
- Verdeckungen
- Taktung am Ende des Videos
- Soundeffekte ausbauen (z.B. Erscheinen und Verschwinden von PLANT-E)

#### Was beinhaltet die Vision, was den Video-Rahmen gesprengt hätte?


