# Der Prototyp {#prototyp}

## Konzeption

###      idee ? grundlage ? anforderungen

aufgriff auf video
app nur für kasten
zeigt daten zu den pflanzen an => allgemein, Gießanzeige
anweisungen von plante
universell: Webanwendung

nicht möglich:
notifications - keine App, nur web
hologramme
scanning des raumes
erkennen von samen und pflanzen

### Design

## Architektur

Aus diesen Anforderungen ist eine Architektur entstanden, die aus drei Kernkomponenten besteht:

- dem Sensorenhandling über einen Raspberry Pi,
- der Datenverwaltung und Auslieferung der Webseite über einen Backend-Server und
- die eigentliche Webseite, die von den Clients aufgerufen wird.

Zur Übersicht ist ebenfalls ein Diagramm erstellt worden, welches die Komponenten und ihr Zusammenspiel verdeutlicht.

![Grafik der Architektur]()

Die Sensordaten werden stetig gemessen und vom Raspberry Pi über UDP-Pakete an das Backend gesendet. UDP ist ein verbindungsloses Protokoll. Es werden lediglich Zieladresse und -port angegeben und schon wird das Datenpaket versendet. Es findet keine Empfangsbestätigung statt. Die Pakete sind immer kleine abgeschlossene Einheiten. Die Idee ist, dass die Sensordaten in einem langen konstanten Datenstrom ausgeliefert werden, egal ob jemand diese Daten entgegennimmt oder nicht. Die Vorstellung eines Radiosenders ist ein geeigneter Vergleich. Der Vorteil dieses Vorgehens ist, dass stetig und sehr schnell Daten zur Verfügung stehen mit geringstem Overhead.

Der Backend-Server ist das Bindeglied für alle Komponenten. Er nimmt den UDP-Datenstrom des Raspberry Pis entgegen und verarbeitet diese Daten. Zum Einen werden sie für die Erfassung eines historischen Verlaufes gespeichert. Zum Anderen können die Daten vom Frontend nun abgerufen werden. Das Backend liefert immer die aktuellensten erhaltenen Daten aus. Bricht der Datenstrom vom Raspberry Pi ab, sind immer noch die zuletzt empfangenen Daten abrufbar.

Zusätzlich liefert das Backend auch die Frontend-Webseite mit allen zugehörigen Dateien aus. Darüber hinaus stellt das Backend eine REST-API zur Verfügung, die vom Frontend genutzt werden kann, um Daten abzurufen und zu senden. Die Speicherung von zusätzlichen Daten, z.B. ob ein Topf bepflanzt ist und wie lange schon, wird ebenfalls im Backend gespeichert und verwaltet. Das Backend liefert auch einen Pflanzenkatalog mit den unterstützen Pflanzenarten aus.

Das Frontend ist eine Webseite, die in jedem modernen Browser aufgerufen werden kann. Da es sich um eine AR-Anwendung handelt, benötigt der Client zwingend eine Kamera im Gerät. Die Anwendung ist nur in der Lage Informationen rund um den Kasten anzuzeigen. Zur Erkennung des Kastens ist dort ein Marker angebracht dazu – später mehr.

## Umsetzung

### Raspberry Pi

Der Raspberry Pi soll mittels Sensoren verschiedene Daten zu dem Anzuchtkasten messen und per UDP-Pakete an das Backend senden.

#### Datenformat

Die gesendeten UDP-Pakete sollen alle Messdaten im JSON-Format enthalten. Hier die Spezifikation der zu sendenden Daten:

```jsonc
{
    "timestamp": 1594639596, // unix timestamp
    "airHumidity": 42,       // in Prozent, ganzzahlig
    "light": 123,            // in lux, ganzzahlig
    "temperature": 24,       // in Grad, ganzzahlig
    "pots": [                // die verschiedenen Töpfe von links nach rechts
        {
            "soilHumidity": 73, // in Prozent, ganzzahlig
            // "size": 8,       // Höhe der Pflanze in cm – ist nicht umgesetzt worden
        }
    ],
}
```

Luftfeuchtigkeit, Helligkeit und Temperatur werden für den gesamten Kasten erfasst. Die Bodenfeuchtigkeit wird für jeden Topf einzeln gemessen und ausgeliefert. Da der Gruppe nur ein Sensor für die Bodenfeuchtigkeit zur Verfügung gestellt worden ist, kann der Prototyp nur einen Topf bedienen.

Die Analyse der Wuchshöhe ist im Verlaufe des Projektes ausgeklammert worden, da keine geeignete Kamera zur Verfügung gestanden hat. Außerdem ist die Analyse von Kamerabildern ein recht aufwendiges Verfahren, was den Rahmen des Projektes gesprengt hätte.

#### Verwendete Sensoren

Zum Verarbeiten der Sensordaten wird ein Raspberry Pi 4 benutzt, da dieser der Projekt-Gruppe bereits zur Verfügung gestanden hat. Für die Sensoren ist daher die Auswahl etwas begrenzt gewesen.

| Funktion | Verwendete Komponente | Kommentar | 
|----------|-----------------------|-----------|
| Lichtmessung | Lichtsensor „BH1750“ | wandelt bereits auf der Platine die Analogsignale in Digitalsignale |
| Temperaturmessung und Luftfeuchtigkeit | Sensor „DHT22“ | wandelt ebenso bereits die Signale, sodass diese ohne zusätzliche Bauteile vom Raspberry Pi gelesen werden können |
| Bodenfeuchtigkeitsmessung | „Capacitive Stil Moisture Sensor v2.0“ | wurde von Hardwareexperten der FH empfohlen und liefert unter den Feuchtigkeitssensoren die präzisesten Daten |
| Signalverarbeitung des Feuchtigkeitssensors | Analog-Digital Wandler „MCP3008“ | wurde ebenso gewählt aufgrund der Empfehlung führender Hardwareexperten der FH |

#### Schaltplan

#### Software

Software Bibliotheken....

Die Software auf dem Raspberry Pi ist als Python-Skript erstellt worden. Es liest die Sensordaten und versendet sie als UDP-Paket an den Server.

Es gibt einen Mock-Modus in dem das Skript keine Sensordaten, sondern Zufallswerte generiert und ausgibt. Das Skript kann dadurch auch auf einem beliebigen Gerät gestartet werden, liefert dann aber natürlich nur die Zufallswerte.

### Backend

Das Backend ist ein Node.js-Server, der in TypeScript implementiert worden ist. Er empfängt zum einen die UDP-Pakete vom Raspberry Pi über einen entsprechenden Socket. Zum Anderen stellt er einen Express.js Server zur Verfügung, der sowohl das Frontend inklusive aller benötigten Dateien ausliefert als auch eine REST-API für das Frontend zur Verfügung stellt.

Es speichert die Daten vom Raspberry Pi in regelmäßigen Abständen in einer Historie und speichert auch Daten, die vom Frontend kommen. Zum Beispiel in welchem Topf sich welche Pflanze befindet und wie lange die dort schon eingetopft ist usw.

Außerdem liegt ein Katalog mit den unterstützten Pflanzenarten im Backend vor. Dieser wird verwendet, um die Pflanzendaten anzureichern.

Die Daten werden in JSON-Dateien gespeichert, die beim Start des Servers geladen werden. Ändern sich die Daten, so werden die Änderungen auch in die JSON-Dateien geschrieben. Die Verwendung von einem Datenbanken-System ist für den Prototypen zu aufwendig gewesen.

### Frontend

Das Frontend besteht aus einer Webseite, die von der Funktion her eine SPA (Single-Page-Application) ist. Zum Einsatz kommt das Webframework **Vue.js**[^vue] sowie die Technologien **AFrame**[^aframe] und **AR.js**[^arjs].

**Vue.js**[^vue] ist ein schlankes Frontend-Framework, welches mit recht simplen HTML-Attributen, einem Komponenten- und Vorlagensystem das erstellen von interaktiven Webseiten vereinfacht. Es kann einfach auf die HTML-Struktur draufgesetzt werden und ist recht leichtgewichtig.

**AFrame**[^aframe] ist ein Wrapper für Three.js, mittels dem 3D-Modelle in eine Szene gesetzt und gerendert werden können. AFrame stellt dabei HTML-Tags zur Verfügung, die 3D-Elemente repräsentieren und entsprechend gerendert werden. Der Mechanismus erfolgt so, dass ein `<a-scene>`-Tag im HTML-Markup gesetzt werden muss. Diese `<a-scene>` wird dann in ein HTML-Canvas-Element umgewandelt und die 3D-Elemente (`<a-entity>`) innerhalb der `<a-scene>` werden in die Szene gesetzt und auf den Canvas gemalt. Mit diesem System lassen sich VR-Anwendungen im Webbrowser darstellen.

**AR.js**[^arjs] ist nun eine Erweiterung für AFrame. Der zugrundeliegende Mechanismus bleibt gleich, allerdings wird der Hintergrund des Canvas mit dem Bild der geräteinternen Kamera gefüllt. Zusätzlich kann ein sog. Marker definiert werden (siehe Bild). Der Marker wird vom Kamerabild erkannt und dient als Referenzpunkt. Die Position des Markers markiert den Ursprungspunkt der Szene (Punkt 0,0,0). Die Breite des Markers gibt die Breite von einer Einheit in AR.js an. Nun können 3D-Elemente relativ zum Marker platziert werden.

![Bild des Hiro-Markers von AR.js](img/hiro.png)

AR.js funktioniert so, dass die Elemente nur zu sehen sind, wenn auch der Marker zu sehen ist, zu dem die Elemente ja relativ liegen. Er dient als Referenz- und Ankerpunkt der Szene. Der Einfachheit halber ist der Standard-Marker von AR.js verwendet worden.

[^vue]: Link: <https://vuejs.org>
[^aframe]: Link: <https://aframe.io>
[^arjs]: Link: <https://ar-js-org.github.io/AR.js-Docs/>

## Ergebnisse und Herausforderungen

Die Umsetzung des Raspberry Pi, der Sensoren und des Backends hat sehr gut funktioniert. Die Daten werden richtig ausgeliefert, im Backend gespeichert und ausgegeben. Lediglich die Geschwindigkeit der Sensoren ist nicht optimal. Diese brauchen im Schnitt etwas unter einer Sekunde, um die Messdaten zu erheben und zu versenden. Dies ist für sehr interaktive Use-Cases wie zum Beispiel der Gießanzeige zwar unpraktisch, für den Prototypen ist es aber ausreichend. Hier können in Zukunft Optimierungen vorgenommen werden, etwa mit besserer Hardware.

Bezüglich des Backends fehlen natürlich reale, über einen längeren Zeitraum erhobene Daten. Wären diese vorhanden, könnten sich noch neue Erkenntnisse gewinnen und zum Beispiel eine sehr umfangreiche Historie mit vielen Optionen und Ansichten erzeugen lassen. Für einen Protoypen sind die vorhandenen Daten aber ausreichend.

Sehr ernüchternd ist hingegen das Frontend ausgefallen. Die anfängliche Euphorie über die AR-Technik im Browser ist sehr schnell verflogen, weil sich sehr bald gravierende Schwierigkeiten ergeben haben. Der Projektfortschritt ist dadurch so stark behindert worden, dass nur ein Bruchteil der geplanten Funktionalität überhaupt umgesetzt werden konnte.

Ein großes Problem, welches immernoch nicht abschließend gelöst werden konnte, ist das Anklicken von Elementen in AR.js. Es hat sehr lange gedauert, bis es überhaupt möglich gewesen ist, auf Klicks zu reagieren. Das hängt damit zusammen, dass Klicks in der Szene über einen Raycaster umgesetzt werden. Dieser Raycaster ist in der Standard-Konfiguration zu langsam. Da im AR-Modus die Szene ständig verschoben wird, aufgrund des wackelnden Markers durch die wackelige Hand des Nutzers, muss der Raycaster sehr schnell immer wieder nach Kollisionen checken, ansonsten werden niemals irgendwelche Klicks erkannt. Diese Erkenntnis zu gewinnen und das Problem zu lösen, hat alleine 2 Wochen in Anspruch genommen.

Damit nicht genug funktionieren Klicks im AR-Modus nur in der Mitte des Bildschirms einigermaßen zuverlässig. Weiter am Rand funktionieren sie so gut wie gar nicht. Die genaue Ursache ist bis heute nicht geklärt worden. Durch das Wackeln werden zusätzlich manchmal Element angeklickt, die man gar nicht klicken wollte. Insgesamt ist das Interagieren mit der AR-Anwendung sehr mühselig und ist alles andere als intuitiv und ausgereift.

Auch die Erkennung des Markers in AR.js funktioniert nur unter guten Lichtverhältnissen und freie Sicht der Kamera auf den Marker. Wird der Marker verloren, so verschwinden einfach alle 3D-Elemente. Dies stellt keine schöne User Experience dar und ist gerade für die Entwicklung sehr anstrengend.

Deswegen ist während der Entwicklung der AR-Modus meistens ausgeschaltet gewesen. Die App wurde hauptsächlich im VR-Modus entwickelt, da hier nichts wackelt und die Entwickler besser testen können, was sie eigentlich tun. Daher funktioniert die Anwendung im VR-Modus recht gut, im AR-Modus eher weniger.

Auch im Design sind die Möglichkeiten von AFrame und AR.js sehr beschränkt. So ist es nicht möglich zum Beispiel die Ecken von einem Button abzurunden. Das komplette Design hat eigentlich auf "Kapseln" basiert. Da sich dies nicht realisieren lassen hat, sind überall langgezogene Kreise und Kugeln zum Einsatz gekommen. Das Erstellen oder Verändern von eigenen Geometrien und Meshes ist schwerlich möglich, da AFrame dafür keinen Editor oder Oberfläche bietet, wie man es z.B. von Unity kennt.

Das gravierendste Problem ist das nicht vorhandene Logging von Fehlern in AFrame und AR.js. Fehler in der Syntax werden nicht angezeigt und auch beim Auftreten von Fehlern während des Aufrufens der Seite, gibt es so gut wie keine Logs oder Hinweise. Die Entwickler tappen die ganze Zeit im Dunkeln und können sich nur durch kleine Änderungen und stetiges Ausprobieren im Browser langsam voranbewegen. Gibt die Dokumentation von AFrame wenigstens noch einen guten Überblick, so ist sie für AR.js viel zu lückenhaft, um damit ordentlich arbeiten zu können. Insgesamt ist die Entwicklung mit diesen Technologien sehr zäh gewesen und hat alles andere als zufriedenstellende Ergebnisse produziert.

Das Projekt ist auch durch die Vielzahl an unterschiedlichen Komponenten sehr komplex gewesen. Dieses Zusammenspiel hat sich aber durch Mocking und Fake-Daten recht elegant lösen lassen. Trotzdem hat das beschwerliche Arbeiten im Frontend dazu geführt, dass viele Funktionalitäten zwar theoretisch über Raspberry Pi und Backend zur Verfügung stehen, diese aber im Frontend nicht umgesetzt werden konnten. Tatsächlich sind die Sensoren und das Backend dem Frontend weit voraus. Dies ist für das Projektteam besonders frustrierend, da ja theoretisch mehr funktioniert, aber das Frontend nicht in der Lage ist, das darzustellen.











Wie bereits bei der ersten Ideenfindung von [Anforderungen und Features](#features1) festgestellt, weichen Umfang und technische Umsetzung des Prototypen von der Visionsidee Grüni vor allem in 3 Punkten ab:

1. **Nutzungsräume, bzw. örtliche Begrenzung**
   Während die Vision den möglichen Einsatz der Anwendung in verschiedenen Umgebungen beinhaltet, ist der Prototyp eine Anwendung allein auf den Anzuchtkasten ausgelegt, der aus dem Visionsvideo aufgegriffen wird. 
2. **Darstellung und User Interface**  
   Holografische Projektionen sind zurzeit natürlich nicht umsetzbar. Darum interagiert der User auf der Oberfläche eines mobilen Gerätes über eine Web-AR-Anwendung. 
3. **Gewinnung von Analysedaten**  
   Scan-Technologien mit dem Smartphone funktionieren bereits über Bilderkennung. Diese benötigen allerdings eine große Menge an Vergleichs-Daten und können Pflanzen nur anhand ihres Aussehens beurteilen. Im Prototyp-Kasten sind also zusätzlich Sensoren installiert, da das mobile Gerät nicht direkt als Scanner genutzt wird und nur zur Darstellung dient.  

Zeitlich betrachtet dient der Prototyp also der Pflanzenanzucht vom keimen lassen der Samen bis zu dem Zeitpunkt, an dem die Pflanze dem Kasten entwachsen ist. Anschließend soll er für die betreffende Pflanze zwar noch als Ratgeber über allgemeine Informationen dienen, die Analyse über konkrete Messdaten entfällt allerdings.

## Recherche und erste Tests

### Sensoren

Zum Speichern und Verarbeiten der Sensordaten wird ein Raspberry Pi 4 benutzt, da dieser der Projekt-Gruppe bereits zur Verfügung stand. Bei den Sensoren war daher die Auswahl eher begrenzt. 

| Funktion | Verwendete Komponente | Kommentar | 
|----------|-----------------------|-----------|
| Lichtmessung | Lichtsensor „BH1750“ | wandelt bereits auf der Platine die Analogsignale in Digitalsignale |
| Temperaturmessung  | Sensor „DHT22“ | wandelt ebenso bereits die Signale, sodass diese ohne zusätzliche Bauteile vom Raspberry Pi gelesen werden können |
| Bodenfeuchtigkeitsmessung | „Capacitive Stil Moisture Sensor v2.0“ | wurde von Hardwareexperten der FH empfohlen und liefert unter den Feuchtigkeitssensoren die präzisesten Daten |
| Signalverarbeitung des Feuchtigkeitssensors | Analog-Digital Wandler „MCP3008“ | wurde ebenso gewählt aufgrund der Empfehlung führender Hardwareexperten der FH |

### AR

Marker: ![Marker](img/Marker.jpeg)



## Konzeption

Die Konzeption des Designs für den Prototypen richtet sich nach der Darstellung im Visionsvideo und auch dort gezeigte, inhaltliche Features und Aspekte werden aufgegriffen. Geplante Abläufe sowie eine Design-Visualisierung für die Anwendung werden in folgender Grafik dargestellt:
![Grafik - Ablauf und Visualisierung](img/AblaufVisualisierung_kompr.jpg)
Alternativ: pdf in Anhang + Verweis darauf

**Anmerkung zur rot hinterlegten Notiz "Alternative Gestaltungsmöglichkeit":**   
Vgl. Grafik oben → anstatt eine Menü-Option "Notifications" anzulegen den User direkt zum nötigen Handlungsvorgang weiterleiten (Umtopfen/Gießen).

### Allgemeine Elemente des UI

- Menüoptionen / Messdaten  
→ in der Grafik türkis dargestellte Buttons  
→ sind an Kasten oder Topf angeheftet  
→ durch Antippen dieser Buttons navigiert der User durch das Menü oder ruft weitere Informationen auf

- Pop-Up Textfelder  
→ in der Grafik transparent weiße Textfelder  
→ sind am Bildschirm angeheftet  
→ dienen der Anzeige größerer Textinhalte oder Diagramme, sind scrollbar  

- Wichtige Notifications  
→ in der Grafik rot dargestellte Symbole  
→ sind an den jeweiligen Topf angeheftet  
→ erscheinen falls nötiger Handlungsbedarf besteht (z.B. Erde für die Pflanze zu trocken)  
→ sollen durch Antippen direkt zu betreffender Pop-Up Nachricht führen und in betreffende Menü-Option navigieren  

- PLANT-E und Pop-Up Nachrichten  
→ in der Grafik als Sprechblasen erkennbar  
→ dient für Aufforderungen an den User (Eingabeaufforderungen, Führen durch Abläufe)


### Logistischer Aufbau
Die Messdaten der Sensoren werden unterschieden in **übergreifende** und **spezifische** Messdaten. Luftfeuchtigkeit, Belichtung und Temperatur gelten für alle Pflanzen im Kasten gleich, darum werden sie auch in der Darstellung an den Kasten angehängt und direkt im Startmenü angezeigt. Lediglich die Bodenfeuchtigkeit gilt spezifisch für jeden Topf einzeln, der User muss diesen Topf also zunächst im Startmenü auswählen um sich dessen gesamte Daten unter der Menüoption "Standortdaten" anzeigen zu lassen.

Außerdem unterschieden werden muss zwischen einem leeren und einem bepflanzten Topf. Je nachdem wie diese Zustandseigenschaft des Topfes belegt ist, ergeben sich bei der Auswahl dessen nämlich auch weitere zu unterscheidende Menü- und Aktivitäts-Optionen. Diese lassen sich der Ablauf-Grafik entnehmen.


## Umsetzung


### ???
### Architektur
https://drive.google.com/drive/folders/1axUoBa-6V8m4xlXnIqG_9iJej61XTZWL


Zum Testen und Nutzen der Sensoren wurde ein kleines Python Script geschrieben, das sowohl die Sensoren anspricht als auch deren Daten im Json-Format speichert. 

**Anmerkung zur Abgrenzung zwischen dem Gruppenprojekt "Grüni" und dem IT-Praxisprojekt von Dennis Krischal:**  
Die Projekte überschneiden sich in genau einem Punkt, da es sich angeboten hat für beide die gleiche Hardware zum Auslesen der Sensoren zu benutzen.

vlg. mit Grafik zur [Richtung des Prototyps](###features1) und [Konzeption](##)

Verweis zum Git Repository (+ Installationshinweise?)

### ???

### Video (?)



## Fazit zum Prototypen

### Aufgetretene Herausforderungen und der Umgang damit

### Ausblick und Auswertung

# Schlusswort zu Organisation, Team und Modul

Grüni begleitete unser Team auf sehr konstante Art und Weise durch dieses Semester. Die Projektidee war schnell entwickelt und das gesamte Team konnte sich für den Themenbereich eines Gardening-Projekts begeistern, was sehr förderlich war um stetig daran weiterzuarbeiten. Auch Organisation, Absprache und Aufgabenverteilung funktionierten sehr gut. Dies war tatsächlich zum großen Teil den wöchentlich stattfindenden Modulveranstaltungen zu verdanken und möglicherweise auch dem Rahmen des (Corona geschuldeten) Online-Semesters. Die durchgeführten Webex-Meetings wurden anschließend direkt intern weitergeführt und waren stets erstaunlich produktiv. Über Google Drive Documents und ähnliche Tools waren gemeinsames Brainstorming, Festhalten von Ideen, Arbeiten an Dokumenten und Anforderungen konzentriert umsetzbar.  

Als Projektmanagement-Tool wurde Asana verwendet:
![Asana Screenshot](img/asana.JPG)
Unter dem Link https://app.asana.com/0/1172859492234369/board lässt sich die Projektentwicklung nochmals im Detail nachvollziehen. Dort finden sich unter anderem sämtliche, geführte Protokolle unter dem Punkt Wochenberichte wieder, inklusive der Aufgabenverteilung im Team. Erstellte, ausgetauschte Dokumente und Dateien sind in den jeweiligen Aufgaben verlinkt und finden sich gesammelt im Google Drive Projekt-Ordner unter dem Link https://drive.google.com/drive/folders/10xpkQQMSEUjZaZLw7HL2MjYE71AiZr6m?usp=sharing wieder.

Der Arbeitsaufwand für ein 8CP-Modul war selbstverständlich nicht in ein paar Tagen zu bewältigen, zumal die Aufgabenstellung dieses Moduls viele verschiedene Komponenten aufweisen konnte: Die Entwicklung einer Produktidee, die Beschäftigung mit grafischen Nutzeroberflächen, Video-Dreh und -Bearbeitung, Animation in Blender und zu guter Letzt das Entwickeln und Programmieren einer Anwendung.  
Vorteilhaft war der Umstand, dass die meisten der gestalterischen Aufgaben-Aspekte nicht völlig neu für uns waren sondern einzeln bereits in vergangenen Modulen behandelt wurden und wir so aus bereits gesammelten Erfahrungen schöpfen konnten. Die Kombination aus so vielen Aufgaben stellte allerdings einen erhöhten Organisationsanspruch dar und auch klassische Zeitfresser, wie z.B.Überlastungen beim Rendern, ließen sich wieder nicht gänzlich vermeiden. 
Aber auch neue Erfahrungen wurden in diesem Projekt gesammelt, wie die Kombinierung von Real- und Animationsfilm mithilfe von After Effects oder auch das Arbeiten mit AR.js in Verbindung mit Hardware-Sensoren.

???????? mag sich Hannes hier vielleicht noch ein wenig auskotzen ?

???????? und/oder hier vielleicht Robs noch ein herzerwärmendes Ende finden ?
