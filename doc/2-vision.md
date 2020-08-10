# Die Vision {#vision}

Der Weg durch die Projektfindungsphase führt nun also zur Anwendung "Grüni". Grüni ist ein universelles Hilfstool für Pflanzen, welches im Haus oder Garten Einsatz findet. Sie beherrscht sehr umfangreiche Analysen, Simulationen und Funktionalitäten rund um das Gärtnern. Dabei ist die Größe des Topfes, Beetes oder Gartens sowie die Auswahl der Geräte, auf denen die App funktioniert, komplett variabel und frei. Es kommen sehr ausgefeilte Arten der holografischen Visualisierung zum Einsatz, bis hin zu einem personifizierten Gartengehilfen – PLANT-E. Wobei PLANT-E selbst keine Arbeiten verrichten kann, sondern als holografischer Assistent den Nutzer vor allem durch Prozesse (Eintopfen, Umtopfen etc.) führt oder Erinnerungen gibt.

## Geplante Eigenschaften und Features der Zukunftsvision

- Geräteunabhängigkeit  
→ App läuft auf stationären Geräten (z.B. Echo-Dots), mobilen Endgeräten (z.B. Smartphone, Tablet)  

- Geräteübergreifend  
→ Messungen von einem Gerät (steht bei den Pflanzen)  
→ Mitteilung des Nutzers über ein anderes Gerät (welches ihm gerade am nächsten ist)  

- Nutzung in verschiedensten Umgebungen  
→ sowie innerhalb als auch außerhalb des Hauses  
→ ein paar Töpfe / ein Beet/ ein ganzer Garten 

- Analyse der Umgebung via Scan  
→ geeignete Orte für die Pflanzen finden anhand ihrer Art und deren Bedürfnissen

- Beetplanung / Simulation des Pflanzenwachstums innerhalb einer gegebenen Umgebung  
→ holografische Visualisierung von Pflanzen an entsprechenden Stellen inklusive Simulation wie sich die Pflanze dort entwickeln würde

- Pflanzenerkennung  
→ Klassifizierung von Pflanzen und Samen via Scan 

- Bereitstellung von Informationen zur Pflanze

- Bestimmung des Zustands der Pflanze  
→ Alter, Bewässerung, Bodenzustand, Lichtverhältnisse, Reifegrad der Früchte usw.

- Visualisierung dieser Zustandsinformationen (z.B. mit einer Gieß- bzw. Bewässerungsanzeige)  
→ holografisch, symbolisch, auditiv

- Erinnerungsfunktion z.B. ans Gießen, Umtopfen, Rausstellen (z.B. in Form von PLANT-E)

- Vorschläge und Produktempfehlungen  
→ entsprechend der aktuellen Bedürfnisse der Pflanzen werden die benötigten Tools und Komponenten direkt zur Bestellung angeboten

- der Lehrmeister **PLANT-E**  
→ Personifizierung des Computers für den Menschen  
→ Tipps Erinnerungen und Co. werden dem Nutzer über PLANT-E mitgeteilt

- Fingerabdruck-Scan  
→ zum Autorisieren von Transaktionen

- Gestenerkennung  
→ Greifen (zum Auswählen), leichtes Nicken, Rahmen für einen Schnappschuss setzen

- Community-Komponente / Sharing-Funktion  
→ Möglichkeit die eigenen Pflanzen mit den Freunden zu teilen, fotobasiert

## Videovorbereitungen

### Drehbuch

(kurze Beschreibung der Entwicklung plus Verweis Anhang)

Produkt Grundidee Vision - was soll dargestellt werden? 
--> Zielgruppe Jonas (startet mit keinerlei Grundwissen, kommt zufällig an Gärtner-Material und wird daraufhin auf die Anwendung gestoßen)
Darstellung über PLANT-E, der dabei wie ein virtueller Lehrer ist, der das Gärtnern in deinem spezifischen Beet beibringen soll
zum einen soll eine Beratung stattfinden, d.h. virtuelle Simulation der Pflanzen auf dem Beet
Anschließend dann Anweisungen wie alles umgesetzt wird
Dramaturgisch: Entwicklung findet gleichermaßen zwischen Mensch und App statt

Verweis ältere Versionen: https://drive.google.com/drive/folders/1toOwAzorJRI8cY0EzBIM56n-LDfFUXsK

### Interaktionsgestaltung und UI-Design

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
![Fingerabdruck-Scan](img/UI/Badansicht.jpg)

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

Mit unseren Erfahrungen aus vorherigen Videoprojekten war klar, dass eine gute Vorbereitung beim Dreh selber viele Unklarheiten und damit Zeit ersparen. Verschiedene Anweisungen für den Dreh wurden bereits bei der Erstellung des Drehbuches notiert, zum Schluss aber getrennt in einem genauen Ablaufplan für den Dreh zusammengetragen. Dieser befindet sich im [Anhang](##Drehplan).

Ebenso wichtig war, vor allem aus platz- und lichttechnischen Gründen, vorausgehende Aufnahmetests am Drehort und daraufhin die Erstellung eines Storyboards. Auch dieses befindet sich im [Anhang](##Storyboard).

In einer weiteren Version des Drehbuchs[^drehverweise] sind Verweise der verschiedenen Kameraeinstellungen in Bezug auf die chronologische Handlung sowie auf gekennzeichnete Abschnitte des Drehplans zu finden. Diese Verweise sind für den späteren Schnitt nötig gewesen aufgrund der Tatsache, dass in manchen Szenen mehr Kameraeinstellungen als zur Verfügung stehende Kameras geplant waren. 

[^drehverweise]: vgl. Link: https://drive.google.com/drive/folders/1toOwAzorJRI8cY0EzBIM56n-LDfFUXsK

## Der Dreh

Der Drehtag war der 21.05.2020. Nach gründlich getroffenen Vorbereitungen waren bereits nach ca. 6 Stunden alle Szenen aufgenommen und der Dreh damit abgeschlossen.

| Akteure am Drehtag | Funktion | 
|--------|--------|
| Christian Weniger | Hauptdarsteller in der Rolle des Christians |
| Hannes Dröse | Tonaufnahme / Sprecher für die Rollen von PLANT-E und Alexa |
| Robert Ackermann | Motion / UI Vision |
| Dennis Krischal | Kamera / Storyboard |
| Livia Schumm | Setdesign / Drehplan |

## Nachbearbeitung des Videomaterials

### Schnitt und Ton

Der hauptsächliche Zeitaufwand dabei ist definitiv in das Sortieren und Zusammenfügen von Bild- und Tonaufnahmen geflossen, sprich den Rohschnitt. Für die Stimmen von PLANT-E und Alexa wurde der Ton gesondert aufgenommen, nachträglich verzerrt und anschließend dem Video hinzugefügt. 

Verwendet wurde das Schnittprogramm **Final Cut Pro**. 

Weitere Arbeitsschritte umfassten:
- den Feinschnitt
- Anpassung der Belichtung (die Lichtverhältnisse am Drehort waren suboptimal, was sich in der Qualität der Bildaufnahmen zeigte)
- das Erstellen einer Fotosequenz
- die Unterlegung mit Musik 
- Zoom- und Übergangs-Effekte für die Schlusssequenz in der Kartenansicht
- Erstellen des Abspanns mit Credits und Quellen  

**Verwendete Musik:**  
Gianmara Testa - Gli Amanti di Roma  
Adana Twins - Nobis

**Verwendete Schrift:**  
Amatic SC

Das Zwischenergebnis des Videos ohne animierte Komponenten findet sich unter dem Link https://drive.google.com/drive/folders/1iqPfL00Kh-QehQd0OGzR-3Inb1JzLeHX.

### Animation

Die Animation von PLANT-E und 3D-Objekten in Blender. Relation zum Video über Einfügen als Hintergrundebene, Exportieren als png-Sequenzen.

PLANT-E (Quelle angeben! Urheberrechte siehe Video-Abspann)

Aufzählung aller Animationen

### After Effects

Einfügen der Animationen in den Realfilmanteil, holografische Effekte erschaffen, evtl. Screenshots(?), Schriften, Oberflächen, Bilder einfügen, Verdeckungen, Schluss-Sequenz mithilfe von Markern

Design, Farben, Schriften

## Fazit zum Ergebnis-Video

vgl. mit geplante Features

### Aufgetretene Herausforderungen und der Umgang damit

**Die Herausforderung der Prioritätenlegung:**  
Bei der Entwicklung des Drehbuches stellte sich vor allem die Frage inwieweit sich in einem kurzen Zeitrahmen eine schöne Geschichte erzählen lässt bei der eine Produktvision mit ihren Features deutlich vermittelt wird? Gerade der der Grad an Interaktion zwischen Mensch und Maschine stand immer wieder im Fokus und führte zu wiederholt nötigen Absprachen und mehrmaligen Überarbeitungen des Drehbuches.[^protokoll1] 

**?? ?? ??**  
Die Interaktionsgestaltung wurde zwar bereits vor dem Dreh bei der Erstellung von Storyboard und Drehplan kommuniziert, visuell skizziert allerdings erst hinterher. Teilweise musste dann mit Bildausschnitten gearbeitet werden, die man noch optimieren hätte können.

**Auch gute Vorbereitung schafft neue Herausforderungen:**  
Storyboard und Drehplan ermöglichten zwar den reibungslosen Dreh, dabei wurden jedoch die Kameras fast durchgängig laufen gelassen. Dies geschah der Einfachheit halber da Platzmangel herrschte und die Kameras teilweise schlecht zugängig waren, was für den Moment eine sinnvolle Entscheidung war. Im Nachhinein wurde daraus im Schnitt jedoch ein enormer Mehraufwand, da eine große Menge an Videomaterial gesichtet und aussortiert werden musste, schon alleine für den Rohschnitt.

**Koordination der Arbeitsschritte in der Videonachbearbeitung:**  
Aus technischen Gründen war die Reihenfolge von Schnitt, Animation und After Effects größtenteils nur nacheinander möglich. Es konnte also nur teilweise parallel am Video gearbeitet werden und so wurden immer wieder unterschiedliche Teile des Teams ausgebremst, was den Zeitrahmen wiederum schwierig abschätzen und planen ließ. Gerade der letzte Schritt, das Zusammenfügen von Komponenten aus Realfilm und Animation war abhängig von der Fertigstellung dieser vorausgehenden Komponenten und wurde im Umfang unterschätzt.  
In diesem Projektabschnitt waren Absprachen und Koordination also eine besondere Herausforderung, konnten aber dank regelmäßiger Meetings sowie der sorgfältigen Protokollierung von Entscheidungsprozessen in Asana gut gemeistert werden.

**Rendern:**


[^protokoll1]: vgl. Asana-Protokolle KW19 (https://app.asana.com/0/1172859492234369/1174005793106255) bis KW21 (https://app.asana.com/0/1172859492234369/1176239239126747)

### Ausblick und Auswertung

Folgende Aspekte am Video sind im Endeffekt ausbaufähig geblieben:
- in größerem Zeitrahmen Darstellung weiterer (evtl. aller) Features
- Genauigkeit bei den Verdeckungen
- weitere Soundeffekte (z.B. beim Erscheinen und Verschwinden von PLANT-E)
- in der Schlusssequenz des Videos ist außerdem die Schnitt-Taktung auf die Musik noch optimierbar

Insgesamt befinden wir das Ergebnis-Video jedoch als zufriedenstellend. Wie bei den meisten gestalterischen Projekten mussten die anfänglichen Vorstellungen in der Praxis aufgrund damit verbundener Zeitaufwände auf das Wesentliche beschränkt werden. Unser Anspruch dabei war dennoch zu einem insgesamt abgerundeten Ergebnis zu kommen, das für den Betrachter sowohl ansprechend als auch verständlich ist, was uns glücklicherweise gelungen ist. 
