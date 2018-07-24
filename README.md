<style>
	#img-main-page {
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: 40%;
	}

	#title {
		color: #222;
		display:block;
		width: 100%;
		text-align: center;
		font-size: 36px;
	}

	#sub-title {
		color: #333;
		display:block;
		width: 100%;
		text-align: center;
		font-size: 26px;
	}

	#error-report {
		font-size: 100%;
		font-weight: bold;
		background: #525D76;
		color: white;
		text-decoration: none;
		padding: 5px;
		margin-right: 2px;
		margin-left: 2px;
		margin-bottom: 0;
	}

	.log {
		margin-top: 0;
	}

	.el_method {
		pointer-events: none;
	}
</style>

<span id="title">Development Tools</span>

<br>

<img id="img-main-page" src="http://ums.zookini.nl/Cms_Data/Contents/UMSDB/Media/images/Icons/Tools-Development.png"
alt="main image"/>

<br><br><br><br>

**Gemaakt door:** Joris Willems<br>
**Studentnummer:** 349672<br>
**Datum:** 10-6-2018<br>

# Inhoudsopgave

1. [Build systemen](#build-systemen)
	1. [Gradle integratie](#gradle)
	2. [Verschillen tussen Java build systemen](#differences-systems)
	3. [npm](#npm)
	4. [Webpack](#webpack)
2. [Code analyse tools](#code-analyse-tools)
	1. [Checkstyle](#checkstyle)
	2. [FindBugs](#findbugs)
	3. [JaCoCo](#jacoco)
3. [Continuous integration](#integration)
	1. [Jenkings](#jenkings)
4. [DTAP](#dtap)

---

# 1. Build systemen <a name="build-systemen"></a>

Build systemen zijn gereedschappen die gebruikt worden voor afhankelijkheden beheer en om projecten te kunnen builden,
runnen, testen, beheren, etc. De reden waarom build systemen zoals Gradle/Maven worden gebruikt zal duidelijk worden door
te kijken hoe projecten handmatig gebuild, gerund en beheerd moeten worden. Een Java compiler kan direct vanaf de
command line bestanden compileren en runnen. Om een bestand te compileren kan het volgende commando vanaf de
command line worden gebruikt:

```sh
javac MyFirstApplication.java
```

Op dit moment wordt het bestand gecompileerd naar een binary en krijgt het een .class extensie. Op
dit moment bestaan er twee bestanden de .java file en het .class bestand. Het .java bestand wordt gebruikt voor ontwikkeling en het
.class bestand wordt gebruikt om het project te runnen. Om het project te runnen moet het volgende commando ingetypt worden
vanaf de command line:

```sh
java MyFirstApplication.class
```

Voor ontwikkeling is het beter om de binaries en ontwikkelings bestanden te scheiden. De binaries zijn voor de
ontwikkelaar uiteindelijk niet van belang. Daarvoor worden er vaak door IDEs of build systemen twee folders aangemaakt
bij het creëren van een nieuw project: out en src. Src (of app) wordt gebruikt voor de ontwikkeling, de out wordt gebruikt
voor de binaries. De volgende commando kan vanuit de command line worden uitgevoerd om de output naar een andere
directory te schrijven.

```sh
javac -d ../out/ MyFirstApplication.java 
```

Een project met deze complexiteit heeft op dit moment nog niet (duidelijk) zichtbaar voordeel van een build system zoals
Gradle, Ant of Maven. Op het moment dat externe bibliotheken moeten worden toegevoegd of er een testomgeving moet worden
ingericht beginnen build systemen noodzakelijk te worden. Om bijvoorbeeld handmatig externe bibliotheken toe te voegen
moet er eerst een directory aangemaakt worden die de .jar bestanden gaan bevatten. Er zijn bibliotheken die weer
afhankelijkheden hebben naar andere bibliotheken en ook weer afhankelijk zijn van een bepaalde versie van deze bibliotheek.
Om handmatig bij te houden welke versies voor welke libraries nodig zijn wordt snel onduidelijk en gevoelig voor
ontwikkelaarsfouten. Verder wil je als ontwikkelaar niet handmatig bijhouden of er nieuwere versies van deze bibliotheken
beschikbaar zijn om te updaten. Om een project met bibliotheken te compileren moet het classpath van deze bibliotheken
worden toegevoegd aan het commando.

```sh
javac -classpath ".:/home/path/mail.jar:/home/path/servlet.jar:" MyJavaFile.java
```

Build systemen helpen de ontwikkelaar met compileren en het bijhouden van externe bibliotheken en plugins. Elk project
heeft er baat bij om gebruik te maken van build systemen aangezien deze geen nadelig invloed hebben. Build systemen
regelen veel werk die anders handmatig moet worden uitgevoerd. Verder is er een complete centralisatie van beheer van
het project. Aanpassingen aan bibliotheken, taken of tests kunnen allemaal via dit punt geregeld worden. 

## 1.1 Gradle integratie <a name="gradle"></a>

Om te kijken hoe build systemen over het algemeen werken onderzoeken we als voorbeeld Gradle, een build systeem die
veelal wordt gebruikt in Java projecten en standaard is geintegreerd bij Android projecten. Gradle geeft een goed beeld
hoe build systemen werken en wat de mogelijkheden zijn. Om Gradle te integreren moet eerst Gradle geinstalleerd worden.
Wanneer Gradle is geinstalleerd kan er een Java project worden opgezet via het volgende shell commando:

```sh
gradle init --type java-application
```

Dit commando zal de volgende bestanden en folders aanmaken. 

```sh
.
|-- (1) build.gradle
|-- gradle
|   `-- wrapper
|       |-- (2) gradle-wrapper.jar
|       `-- (3) gradle-wrapper.properties
|-- (4) gradlew
|-- (5) gradlew.bat
|-- (6) settings.gradle
`-- src
|-- main
|   `-- java
|       `-- App.java
`-- test
`-- java
`-- AppTest.java
```

1. Project configuratie script om de taken, plugins, afhankelijkheden, etc, te configureren voor het project. 
2. Wrapper uitvoerbaar .jar bestand. De wrapper is een script die automatisch de juiste gradle versie installeert en
gebruikt. Voordeel hiervan is dat iedereen die aan dit project werkt dezelfde wrapper versie gebruikt, hierdoor
verminder je inconsistenties tussen ontwikkelaars.
3. Wrapper configuratie bestand voor Gradle.
4. Gradle wrapper script for Unix-based systemen.
5. Gradle wrapper script for windows.
6. Een configuratie bestand die aangeeft welke projecten mee moeten worden genomen in de build. 

In het build.gradle bestand zal de eerste regel aangeven om wat voor type project het dient te gaan. Om aan te geven dat
het een Java project betreft gebruiken we de Java plugin:

```gradle
apply plugin: 'java' 
```

Op dit moment kan het project gebuild worden, door een van de volgende commando's: 

```sh
gradle build
```
Het project zal gebouwd worden d.m.v. de Gradle versie die geinstalleerd is op de machine. Om het project te builden via
de wrapper op een UNIX machine moet de volgende commando worden gebruikt:

```sh 
./gradlew build 
```

Het project zal gebouwd worden d.m.v. de Gradle versie die staat aangegeven in het wrapper configuratie bestand. Wanneer
deze nog niet lokaal geinstalleerd is, zal deze gedownload en geinstalleerd worden. Een aantal tasks die belangrijk voor
de code kwaliteit zijn: 
* gradle check: start taken van tools die de code analyseren zoals Checkstyle en PMD.
* gradle test: start taken van tools die de code testen zoals JUnit of andere test frameworks.

JUnit zal in Gradle een HTML bestand genereren die aangeeft hoeveel tests succesvol zijn, hoeveel gefaald zijn en welke
zijn genegeerd. Een ontwikkelaar kan door de bestanden klikken die gefaald zijn en krijgt daarbij de feedback te zien
van deze tests.

Met Gradle kunnen er makkelijk taken worden gemaakt, in hoofdstuk [2.3](#jacoco) zal een voorbeeld van een Gradle taak
te zien zijn. 

## 1.2 Verschillen tussen Java build systemen <a name="differences-systems"></a>

Er zijn veel verschillende soorten build systemen, build systemen zijn toegespitst op specifieke programeertalen. Gradle
kan bijvoorbeeld overweg met Java, C++ en Kotlin, maar Maven werkt niet met C++ projecten. De web applicaties maken vaak
gebruik van build systemen zoals npm of Yarn. npm wordt verder toegelicht in het volgende hoofdstuk. Build systemen voor
Java zijn verschillend en hebben verschillende voordelen en nadelen. Er zijn een aantal build systemen die
voornamelijk worden gebruikt voor Java: 
* Ant
* Maven 
* Buildr
* Gradle

Ant is een wat verouderde build systeem en wordt niet veel meer gebruikt. Ant dependency management gebeurd via Ivy, een
aparte tool die je toevoegd aan het Ant project. 

Maven is de opvolger van Ant en ontwikkeld door Apache. Maven werkt met XML configuratie bestanden en heeft net als
Gradle dependency management.  

Gradle is speciaal ontwikkeld om goed met meerdere projecten te kunnen werken. De syntax van Gradle is compacter dan van
Maven. Hieronder een voorbeeld van een Maven configuratie bestand (pom.xml):

```maven 
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
<modelVersion>4.0.0</modelVersion>
<groupId>com.programming.mitra</groupId>
<artifactId>java-build-tools</artifactId>
<packaging>jar</packaging>
<version>1.0</version>
<dependencies>
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.11</version>
</dependency>
</dependencies>
<build>
<plugins>
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-checkstyle-plugin</artifactId>
<version>2.12.1</version>
<executions>
<execution>
<configuration>
<configLocation>config/checkstyle/checkstyle.xml</configLocation>
<consoleOutput>true</consoleOutput>
<failsOnError>true</failsOnError>
</configuration>
<goals>
<goal>check</goal>
</goals>
</execution>
</executions>
</plugin>
<plugin>
<groupId>org.codehaus.mojo</groupId>
<artifactId>findbugs-maven-plugin</artifactId>
<version>2.5.4</version>
<executions>
<execution>
<goals>
<goal>check</goal>
</goals>
</execution>
</executions>
</plugin>
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-pmd-plugin</artifactId>
<version>3.1</version>
<executions>
<execution>
<goals>
<goal>check</goal>
</goals>
</execution>
</executions>
</plugin>
</plugins>
</build>
</project>
```

Hierboven zijn een aantal plugins toegevoegd:
* Checkstyle
* Findbugs
* PMD

Maven configuratie bestanden groeien snel, met het nieuwere Gradle kan een vergelijkbaar bestand als volgt worden
opgezet:

```gradle
apply plugin:'java'
apply plugin:'checkstyle'
apply plugin:'findbugs'
apply plugin:'pmd'

version ='1.0'

repositories {
	mavenCentral()
}

dependencies {
	testCompile group:'junit', name:'junit', version:'4.11'
}
```

In het dependencies blok worden de afhankelijkheden aangegeven. Testcompile geeft aan dat deze bibliotheek alleen wordt
gecompileerd mits het gaat om een test build. Het blok repositories geeft aan waar deze bibliotheken van gedownload 
kan worden. Deze bibliotheken worden gedownload van de maven central repository (https://search.maven.org). Een andere
bekende repository die veel gebruikt word is jcenter (https://bintray.com/bintray/jcenter).  

Gradle presteert over het algemeen beter qua snelheid, dit heeft ook temaken met incrementele builds waar Gradle
gebruik van maakt. Dit houdt in dat builds gecached worden en over tijd sneller gecompileerd worden, dit is niet het
geval is bij Maven.

Verschillende ontwikkelaars die Maven gebruiken (of gebruikte) klagen over complexiteit van het POM.xml(configuratie) bestand naarmate
het project groeit.

(bron: https://stackoverflow.com/questions/1306579/buildr-gradle-or-wait-for-maven-3)

## 1.3 npm <a name="npm"></a>

npm (**N**ode **P**ackage **M**anager) is een package manager. npm is net zoals Gradle een command line tool.
Bibliotheken kunnen worden toegevoegd, verwijderd en worden opgewaardeerd. npm kan met het volgende commando aan het
project toegevoegd worden:

```sh
npm init
```

Npm zal een bij het initialiseren een aantal standaard vragen stellen m.b.t. de auteur, git repository, kern woorden,
etc. Wanneer deze vragen zijn beantwoord wordt er een package.json bestand aangemaakt. Dit bestand fungeert ongeveer
hetzelfde als de build.gradle voor Gradle. Hieronder een voorbeeld van een relatief eenvoudig package.json bestand:

```json
{
	"name": "webpack-demo",
	"version": "1.0.0",
	"description": "",
	"private": true,
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"keywords": [],
	"author": "",
	"license": "ISC",
	"devDependencies": {
		"webpack": "^4.12.0",
		"webpack-cli": "^3.0.8"
	},
	"dependencies": {
		"lodash": "^4.17.10"
	}
}
```

npm heeft de mogelijkheid om de scope van een pakket te bepalen, zo kunnen bijvoorbeeld de
volgende vlaggen worden meegegeven bij het installeren van een pakket: 
* npm install --save-dev webpack (installeert het pakket als een development dependency en wordt niet meegenomen in een build)
* npm install --global webpack (installeert het pakket globaal op de machine en zal dus niet binnen het project opgeslagen
		worden)
* npm install --save webpack (installeert het pakket en voegt deze dependency toe aan het package.json bestand)
* npm install webpack (installeert het pakket tijdelijk maar zal bij een volgende install niet meer worden meegenomen)

Bedrijven die zich met web applicaties bezig houden maken vaak gebruik van gedeelde (interne)bibliotheken. Vaak worden
deze bibliotheken als private npm packages gedistribueerd. Dit heeft als voordeel dat projecten die deze bibliotheken
gebruiken makkelijk via npm een specifieke versie van deze bibliotheek kunnen gebruiken. Oudere projecten gebruiken vaak
oudere versies van bibliotheken om breakages te voorkomen.

npm heeft de mogelijkheid om scripts te definieeren, dit kunnen unit tests zijn maar ook zelf gedefinieerde scripts. npm
start is de standaard script functie om het project te starten. `npm start` zal in dit geval een alias zijn voor `node
server.js`. Een eigen toegevoegde script zoals browser kan gestart worden door het commando: `npm run browser`.

Alle paketten kunnen aan de hand van package.json:
* Geinstalleerd worden door het commando: npm install.
* Opgewaardeerd worden door het commando: npm update.

Bij een van deze commando's zal er een folder "node_modules" in dezelfde folder als de package.json worden aangemaakt,
deze folder bevat alle geinstalleerde pakketten uitgezonderd van globale pakketten.

## 1.4 Webpack <a name="webpack"></a>

Webpack is een tool om JavaScript bestanden te kunnen bundelen. Bundelen wil zeggen dat de JavaScript code van het
project zo compact mogelijk wordt samengevoegd. Het bundelen van JavaScript bestanden heeft
meerdere voordelen:
* Prestaties verbeteren.
* Minify (Ruimte besparen).
* Uglify (code slechter leesbaar maken voor de buitenwereld).

Webpack kan via npm geinstalleerd worden als een development dependency, webpack kan gebruikt worden d.m.v. NPX (Node
		package runner). NPX is een tool van npm om binaries te kunnen runnen. Om webpack te start moet het volgende commando
uitgevoerd worden `npx webpack`. Deze zal de source code bundelen en een bestand main.js genereren in de
dist(distribution) folder. 

Voor complexere projecten is het handig om gebruik te maken van een configuratie bestand om meer aanpassingen te kunnen
maken en deze niet steeds als parameters te hoeven opgeven op de command line. Webpack maakt gebruik van een
webpack.config.js bestand.

```javascript
const path = require('path');

module.exports = {
entry: './src/index.js',
   output: {
filename: 'main.js',
	  path: path.resolve(__dirname, 'dist')
   }
};
```

De entry is het JavaScript bestand die gebruikt wordt om de applicatie te starten. Het output blok gaat over de
configuratie van de bundle, (welke locatie dient dit bestand naartoe geschreven te worden, hoe moet dit bestand
		genoemd worden, etc.). Het commando 'npx webpack' zal dit bestand automatisch herkennen. In de development wereld worden
deze commando's vaak als npm scripts toegevoegd in de package.json om de commando's voor andere ontwikkelaars zo
duidelijk mogelijk te maken.

(bron: https://webpack.js.org/guides/output-management/)

```gradle
...
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
		"build": "webpack"
},
...
```

Op dit moment zal het commando: 'npm run build' gelijk zijn aan npx webpack. Voordeel hiervan is dat ontwikkelaars
gelijk in de package.json kunnen zien hoe ze een project kunnen builden. Als een ontwikkelaar nooit eerdere met webpack
heeft gewerkt zal hij/zij niet direct kunnen afleiden dat het `npx webpack` commando zal moeten worden uitgevoerd om een
nieuwe build te genereren. In het scripts blok hoeft npx niet ervoor te staan, dat zal npm automatisch herkennen. 

# 2. Code analyse tools  <a name="code-analyse-tools"></a>

Er zijn verschillende tools beschikbaar om de code kwaliteit te kunnen analyseren. Drie tools worden verder in dit hoofdstuk toegelicht:
* **Checkstyle:** een tool die wordt gebruikt om te kunnen vaststellen of bepaalde code conventies worden nageleeft.
* **FindBugs:** herkennen van veel voorkomende bugs in code, probeert ook bugs te herkennen die niet door de compiler worden
afgevangen
* **JaCoCo:** het berekenen van hoeveel (procent) van de code wordt afgedekt door unit tests.

## 2.1 Checkstyle <a name="checkstyle"></a>

Checkstyle is een plugin die gebruikt wordt om de code consistentie/kwaliteit te verbeteren. Checkstyle kijkt of de code
conventies worden nageleeft. Er zijn verschillende code conventies mogelijk, sommige development teams prefereren om de
accolade ({) op de bovenste regel te hanteren i.p.v. op de volgende regel. Deze regels
worden vastgelegd binnen een xml bestand. 

```xml
<module name="LineLength">
<property name="max" value="100"/>
<property name="ignorePattern" value="^package.*|^import.*|a href|href|http://|https://|ftp://"/>
</module>
```

Hierboven een afspraak voor bijvoorbeeld lengte van een regel. Er mogen maximaal 100 karakters op een regel staan, tenzij het een
package, import of link betreft. Er zijn verschillende speciale karakters hierboven te zien, deze karakters hebben een
bepaalde betekenis:
* | : of mogelijkheden (of package of import of ...)
* \* : kan alle karakters of nummers bevatten (import org.junit...)

Er zijn een aantal Checkstyle configuratie bestanden die veel gebruikt worden door developers, denk hierbij aan de Checkstyle
rules van Google of Sun. Checkstyle kan door Gradle worden toegevoegd als plugin. Om Checkstyle te runnen via de
command line moet het volgende commando worden gebruikt:

```sh
gradle check
```

Door het uitvoeren van dit commando zal een HTML bestand worden gegenereerd binnen de build/reports folder. Dit HTML
bestand zal weergeven waar de regels zijn over treden. Voorbeeld van foutmeldingen van een Checkstyle run die Sun
rules gebruikt:

<h3 id="error-report">File /home/norlock/Projects/developmentTools/MyFirstApplication/src/main/java/MyFirstApplication.java</h3>
<table class="log" width="100%" cellspacing="2" cellpadding="5" border="0">
<tbody><tr>
<th>Error Description</th><th>Line</th>
</tr>
<tr class="a">
<td>Missing package-info.java file.</td><td>0</td>
</tr>
<tr class="b">
<td>Missing a Javadoc comment.</td><td>1</td>
</tr>
<tr class="a">
<td>Utility classes should not have a public or default constructor.</td><td>1</td>
</tr>
<tr class="b">
<td>Missing a Javadoc comment.</td><td>3</td>
</tr>
<tr class="a">
<td>Parameter args should be final.</td><td>3</td>
</tr>
<tr class="b">
<td>File contains tab characters (this is the first instance).</td><td>4</td>
</tr>
<tr class="a">
<td>Line is longer than 80 characters (found 98).</td><td>12</td>
</tr>
<tr class="b">
<td>First sentence should end with a period.</td><td>15</td>
</tr>
<tr class="a">
<td>Line is longer than 80 characters (found 90).</td><td>16</td>
</tr>
<tr class="b">
<td>Line is longer than 80 characters (found 89).</td><td>21</td>
</tr>
<tr class="a">
<td>Parameter argument1 should be final.</td><td>21</td>
</tr>
<tr class="b">
<td>Parameter argument2 should be final.</td><td>21</td>
</tr>
<tr class="a">
<td>Line is longer than 80 characters (found 85).</td><td>26</td>
</tr>
<tr class="b">
<td>Parameter argument should be final.</td><td>31</td>
</tr>
</tbody></table>

Hierin wordt het bijvoorbeel duidelijk dat er variabelen zijn die niet final zijn, maar dat de afspraak is dat deze dat wel zijn.

Vaak hebben IDEs specifieke Checkstyle plugins, voor bijvoorbeeld Intellij IDEA of Eclipse. Checkstyle is
afhankelijk van een checkrun. Wanneer deze is gedraaid zal de plugin de bestanden aangeven met fouten. Deze fouten
kunnen bijvoorbeeld zijn dat er gebruik wordt gemaakt van tabs i.p.v. spaties, of dat de indentatie verkeerd is. Bij
de IDEA plugin ziet een foutmelding er als volgt uit en wordt deze in een dialoog venster weergegeven i.p.v. een HTML
bestand:

```
Line contains a tab character. (15:1) [FileTabCharacterCheck]
```

Development teams kunnen verschillende eisen stellen over hoe streng ze willen dat Checkstyle is. Checkstyle kan er
standaard voor zorgen de het project wel of niet gebuild kan worden als checkstyle fouten heeft gedetecteerd  

## 2.2 FindBugs <a name="findbugs"></a>

FindBugs is een tool die gebruikt wordt om veel voorkomende bugs te herkennen. Findbugs support geen Java versies boven
1.8 in tegenstelling tot SpotBugs en moet de spirituele opvolger van FindBugs worden. Aangezien SpotBugs nog in
ontwikkeling is wordt Findbugs onderzocht. FindBugs kan via Gradle of IDEs zoals Intellij IDEA worden geintegreerd als
plugin. FindBugs is afhankelijk van gecompileerde code dus zal altijd pas werken nadat Gradle het project gebuild heeft.

Via Gradle kan FindBugs net als Checkstyle worden gestart door het volgende commando:

```sh
gradle check
```

In de code kan bijvoorbeeld de volgende Bug zijn geschreven die niet door de compiler of IDE wordt herkend:

```java
private static String notTrimmed = " This string won't be trimmed ";

public static void congratulateUser() {
	notTrimmed.trim();
	...	
}
```

Op dit moment zal de code werken omdat de ontwikkelaar geen _foute_ code heeft geschreven. FindBugs herkent dit wel als
een bug, de gebruiker roept de methode trim() aan die een getrimde string teruggeeft, maar deze waarde vervolgens niet
gebruikt. FindBugs geeft de details van de bug weer zoals in het voorbeeld hieronder te zien is.

>The return value of this method should be checked. One common cause of this warning is to invoke a method on an immutable object, thinking that it updates the object. For example, in the following code fragment,
>```
	>	String dateString = getHeaderField(name);
>	dateString.trim();
>```
>the programmer seems to be thinking that the trim() method will update the String referenced by dateString. But since Strings are immutable, the trim() function returns a new String value, which is being ignored here. The code should be corrected to:
>```
>   String dateString = getHeaderField(name);
>   dateString = dateString.trim();
>```

FindBugs heeft verschillende niveaus gradaties van code controlleren, zo kan er streng of meer vrij gecontroleerd worden op bugs. Ook is er een optie om de Gradle wel of niet te laten compileren mochten er fouten zijn gedetecteerd door FindBugs. 

## 2.3 JaCoCo <a name="jacoco"></a>

JaCoCo is een tool die gebruikt wordt om te bepalen hoeveel procent van de code is afgedekt door unit tests. JaCoCo kan
toegevoegd worden aan gradle:

```gradle 
apply plugin: "jacoco"
```

JaCoCo is afhankelijk van `gradle test` om een report te kunnen schrijven. Het is met JaCoCo net als bij FindBugs en
Checkstyle mogelijk om een eenvoudige HTML pagina te genereren om de resultaten te visualiseren, door de volgende taak
toe te voegen aan het build.gradle bestand:

```
jacocoTestReport {
	reports {
		xml.enabled false
			csv.enabled false
			html.destination file("$buildDir/reports/jacoco/main")
	}
}
```

Nadat `gradle test` is uitgevoerd kan er een test rapport gemaakt worden door JaCoCo. JaCoCo berekend hoeveel procent
van de code is afgedekt door unit tests. Vervolgens kan er door classes geklikt om te kijken naar de coverage per class.
Hieronder is een voorbeeld te zien van het resultaat van JaCoCo.

<table class="coverage" id="coveragetable" cellspacing="0"><thead><tr><td class="sortable" id="a"
onclick="toggleSort(this)">Element</td><td class="down sortable bar" id="b" onclick="toggleSort(this)">Missed
Instructions</td><td class="sortable ctr2" id="c" onclick="toggleSort(this)">Cov.</td><td class="sortable bar" id="d"
onclick="toggleSort(this)">Missed Branches</td><td class="sortable ctr2" id="e" onclick="toggleSort(this)">Cov.</td><td
class="sortable ctr1" id="f" onclick="toggleSort(this)">Missed</td><td class="sortable ctr2" id="g"
onclick="toggleSort(this)">Cxty</td><td class="sortable ctr1" id="h" onclick="toggleSort(this)">Missed</td><td
class="sortable ctr2" id="i" onclick="toggleSort(this)">Lines</td><td class="sortable ctr1" id="j"
onclick="toggleSort(this)">Missed</td><td class="sortable ctr2" id="k"
onclick="toggleSort(this)">Methods</td></tr></thead><tfoot><tr><td>Total</td><td class="bar">17 of 24</td><td
class="ctr2">29%</td><td class="bar">0 of 0</td><td class="ctr2">n/a</td><td class="ctr1">4</td><td
class="ctr2">6</td><td class="ctr1">8</td><td class="ctr2">10</td><td class="ctr1">4</td><td
class="ctr2">6</td></tr></tfoot><tbody><tr><td id="a0"><a href="#"
class="el_method">congratulateUser()</a></td><td class="bar" id="b0"><img src="../jacoco-resources/redbar.gif" title="7"
alt="7" width="120" height="10"></td><td class="ctr2" id="c2">0%</td><td class="bar" id="d0"></td><td class="ctr2"
id="e0">n/a</td><td class="ctr1" id="f0">1</td><td class="ctr2" id="g0">1</td><td class="ctr1" id="h0">3</td><td
class="ctr2" id="i0">3</td><td class="ctr1" id="j0">1</td><td class="ctr2" id="k0">1</td></tr><tr><td id="a1"><a
href="#" class="el_method">main(String[])</a></td><td class="bar" id="b1"><img
src="../jacoco-resources/redbar.gif" title="5" alt="5" width="85" height="10"></td><td class="ctr2" id="c3">0%</td><td
class="bar" id="d1"></td><td class="ctr2" id="e1">n/a</td><td class="ctr1" id="f1">1</td><td class="ctr2"
id="g1">1</td><td class="ctr1" id="h1">3</td><td class="ctr2" id="i1">3</td><td class="ctr1" id="j1">1</td><td
class="ctr2" id="k1">1</td></tr><tr><td id="a2"><a href="#"
class="el_method">MyFirstApplication()</a></td><td class="bar" id="b2"><img src="../jacoco-resources/redbar.gif"
title="3" alt="3" width="51" height="10"></td><td class="ctr2" id="c4">0%</td><td class="bar" id="d2"></td><td
class="ctr2" id="e2">n/a</td><td class="ctr1" id="f2">1</td><td class="ctr2" id="g2">1</td><td class="ctr1"
id="h2">1</td><td class="ctr2" id="i2">1</td><td class="ctr1" id="j2">1</td><td class="ctr2" id="k2">1</td></tr><tr><td
id="a5"><a href="#" class="el_method">unusedMethodWithArguments(int, double)</a></td><td
class="bar" id="b3"><img src="../jacoco-resources/redbar.gif" title="2" alt="2" width="34" height="10"></td><td
class="ctr2" id="c5">0%</td><td class="bar" id="d3"></td><td class="ctr2" id="e3">n/a</td><td class="ctr1"
id="f3">1</td><td class="ctr2" id="g3">1</td><td class="ctr1" id="h3">1</td><td class="ctr2" id="i3">1</td><td
class="ctr1" id="j3">1</td><td class="ctr2" id="k3">1</td></tr><tr><td id="a3"><a
href="#" class="el_method">someDifficultCalculation(int)</a></td><td class="bar"
id="b4"><img src="../jacoco-resources/greenbar.gif" title="4" alt="4" width="68" height="10"></td><td class="ctr2"
id="c0">100%</td><td class="bar" id="d4"></td><td class="ctr2" id="e4">n/a</td><td class="ctr1" id="f4">0</td><td
class="ctr2" id="g4">1</td><td class="ctr1" id="h4">0</td><td class="ctr2" id="i4">1</td><td class="ctr1"
id="j4">0</td><td class="ctr2" id="k4">1</td></tr><tr><td id="a4"><a href="#"
class="el_method">static {...}</a></td><td class="bar" id="b5"><img src="../jacoco-resources/greenbar.gif" title="3"
alt="3" width="51" height="10"></td><td class="ctr2" id="c1">100%</td><td class="bar" id="d5"></td><td class="ctr2"
id="e5">n/a</td><td class="ctr1" id="f5">0</td><td class="ctr2" id="g5">1</td><td class="ctr1" id="h5">0</td><td
class="ctr2" id="i5">1</td><td class="ctr1" id="j5">0</td><td class="ctr2" id="k5">1</td></tr></tbody></table>

Uit dit voorbeeld wordt duidelijk dat er verschillende instructies worden gemist. Een instructie kan bijvoorbeeld zijn:
`int i = 0;`, Uiteindelijk zijn 17 van de 24 instructies niet getest. In het testrapport is het ook mogelijk om te
kijken welke instructies gemist worden door op een methode hierboven te klikken zoals `congratulateUser();`, die in
dit voorbeeld hierboven zijn uitgeschakeld. Dit zou het klasse bestand openen en met rood/groene kleuren markeren welke
instructies wel of niet getest worden.

Deze tools zijn belangrijk omdat het schrijven van goede tests belangrijk zijn voor de code kwaliteit. Uiteindelijk
willen de developers een houvast hebben om te bepalen of hun unit tests aan een bepaalde kwaliteit voldoen. Via Gradle
kunnen deze taken worden aangepast naar eigen voorkeuren. Zo kunnen er ook XML of CSV bestanden gegenereerd worden die
met eigen tools kunnen worden geanalyseerd. 

# 3. Continuous Integration <a name="ci"></a>

Continuous integration is een ontwikkelingsproces waarbij ontwikkelaars vaak code integreren naar een gedeelde
repository. Elke integratie zal door een automatische wasstraat van development tools en tests gaan. Dit zorgt ervoor
dat code aan een bepaalde minimum norm moet voldoen om geaccepteerd te worden. Zo kan bijvoorbeeld een vereiste zijn dat
code dat niet gebuild kan worden automatisch niet wordt geaccepteerd door de master en development branch. 

![Continuous process](./resources/ciProcess.png)

De stappen worden volgens een chronologisch patroon doorlopen, het is bijvoorbeeld niet van belang om uitgebreide tests
uit te voeren als de code al niet gecompileerd kan worden. Er zijn tools die helpen om dit process automatisch te
hanteren. In dit hoofdstuk zal Jenkins als continuous integration tool verder worden onderzocht.

## 3.1 Jenkins <a name="jenkins"></a>

Jenkins is een continuous integration tool dat op een server draait en afhankelijk is van een versiebeheer systeem zoals
Git of SVN. Jenkins kan gedownload worden als een war bestand een binary voor Java, of als een prepackaged
binary (voor bijvoorbeeld Ubuntu). Vervolgens kan deze war via de java-cli gestart worden met commando: `java -jar
jenkins.war --httpPort=8090`. De keuze voor de HTTP port is aan de ontwikkelaar zelf. 

De ontwikkelaar kan naar `http://localhost:8090` browsen om de setup wizard van Jenkins te doorlopen. Wanneer de
installatie is voltooid zal de gebruiker doorverwezen worden naar een portaal. Binnen dit portaal kunnen alle
instellingen voor jenkins geconfigureerd worden. 

<img src="./resources/Integrate-In-Jenkins.png" alt="Jenkins process" style="width:200px;"/>

![Jenkins process](./resources/Integrate-In-Jenkins.png)

Het concept van tools en taken die automatisch doorlopen worden, wordt ook wel een _continuous delivery pipeline_
genoemd. Deze pipeline wordt gedefinieerd door een configuratie bestand(Jenkinsfile). Via een plugin is het ook mogelijk
om Jenkins direct met Gradle te verbinden, Jenkins zal opzoek gaan naar de gradle wrapper en deze vervolgens
gebruiken om commando's uit te voeren zoals bijvoorbeeld /gradlew build --scan.

Resultaten worden via de e-mail verstuurd, toegevoegd als Slack bots, of kunnen opgezocht worden via het portaal. Reden
dat e-mails vaak gebruikt worden is dat niet elke build per se gecontroleerd hoeft te worden tenzij er crashes
plaatsvinden. Via e-mails kunnen developers snel geinformeerd worden en kunnen deze ook buiten
kantoortijden snel gealarmeerd worden wanneer er problemen plaatsvinden.

De kracht van Jenkins is de eenvoud in het toevoegen van plugins, zo kunnen tools als FindBugs en Checkstyle makkelijk
toegevoegd worden. Zo kan met bijvoorbeeld een android plugin een simulator worden opgestart bij elke nieuwe build. 

# 4. DTAP <a name="dtap"></a>



# Bronnen

https://codeship.com/continuous-integration-essentials
https://stackoverflow.com/questions/1306579/buildr-gradle-or-wait-for-maven-3

